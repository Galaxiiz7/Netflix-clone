import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorite from "@/hooks/useFavorite";
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorite()
    const { data: CurrentUser, mutate } = useCurrentUser()

    const isFavorite = useMemo(() => {
        const list = CurrentUser?.favoriteIds || []
        return list.includes(movieId)
    }, [CurrentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response
        if (isFavorite) {
            response = await axios.delete('/api/favorite', { data: { movieId } })
        }
        else {
            response = await axios.post('/api/favorite', { movieId })
        }
        const updatedFavoriteIds = response?.data?.favoriteIds

        mutate({
            ...CurrentUser,
            favoriteIds: updatedFavoriteIds
        })
        mutateFavorites()
    }, [movieId, isFavorite, CurrentUser, mutate, mutateFavorites])
    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus
    return (
        <div
            onClick={toggleFavorites}
            className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-netrual-300
        ">
            <Icon className="text-white" size={25} />
        </div>
    )
}

export default FavoriteButton
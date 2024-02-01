import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorite from "@/hooks/useFavorite";

interface FavoriteButtonProps {
    movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    return (
        <div>

        </div>
    )
}

export default FavoriteButton
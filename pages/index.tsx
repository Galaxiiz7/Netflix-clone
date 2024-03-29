import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovieList'
import useFavorite from '@/hooks/useFavorite'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}


export default function Home() {
  const { data: movies = [] } = useMovieList()
  const { data: favorite = [] } = useFavorite()
  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorite} />
      </div>

    </>
  )
}

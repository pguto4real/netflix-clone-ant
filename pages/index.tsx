import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavourites from "@/hooks/useFavourites";
import useMovieList from "@/hooks/useMovieList";

import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";


export default function Home() {
  const { data:movies = [] } = useMovieList();
  const { data:favourites = [] } = useFavourites();

  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40 text-white">
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favourites}/>
      </div>
      {/* <h1 className="text-4xl text-green-500">Netflix clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout
      </button> */}
    </>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
     
    },
  };
}

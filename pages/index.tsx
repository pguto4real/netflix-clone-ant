import BillBoard from "@/components/BillBoard";
import InfoModal from "@/components/InfoModal";

import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";

import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRecoilValue } from "recoil";


export default function Home() {
  const { data:movies = [] } = useMovieList();
  const { data:favourites = [] } = useFavourites();
const {data } = useCurrentUser()
  const {isOpen,closeModal} = useInfoModal()
  console.log(isOpen)

  return (
    <>
    {
      isOpen && <InfoModal onClose={closeModal}/>
    }
    
      <Navbar currentUser = {data}/>
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

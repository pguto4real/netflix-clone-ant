import { useRouter } from 'next/router';
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
interface FavouriteButtonProps {
    movieId: string;
  }
  const PlayButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
    const router = useRouter()
  return (
    <button
    onClick={()=>router.push(`/watch/${movieId}`)}
    className="banner__button bg-white text-black hover:bg-neutral-300">
    <BsFillPlayFill className="mr-1" size={25} /> Play
  </button>
  )
}

export default PlayButton
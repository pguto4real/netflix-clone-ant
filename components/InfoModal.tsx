import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './PlayButton';
import FavouriteButton from './FavouriteButton';
interface infoModalProps {
   visible?:boolean;
   onClose:any
}
const InfoModal: React.FC<infoModalProps> = ({ visible,onClose }) => {

  const {movie} = useInfoModal()
console.log(movie)
  let videoUrl = ''

  if (movie?.videos) {

    const index = movie.videos.results.findIndex(
        (element: Element) => element?.type === "Trailer" || 
        "Opening Credits" ||
         "Featurette" ||
         "Clip"
    );

   videoUrl = movie.videos?.results[index]?.key

}

const handleRuntime=(runtime:any)=>{
  if (runtime) {
      let newRuntime = "";
      if (runtime > 60) {
        newRuntime += Math.floor(runtime / 60) + "h ";
      }

      if (runtime % 60 < 60) {
        newRuntime += (runtime % 60) + "m";
      }

      // {runtime > 60 && Math.floor(runtime/60)+"h "+Math.floor(runtime%60) }
      return newRuntime;
    }
}
  const handleClose = () => {

    setTimeout(() => {
      onClose()
    }, 300);
  };



  return (
    <div
    className={`z-50 transition duration-300 bg-black bg-opacity-80 flex
    justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0`}
    >
      <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>

        <div className={`
        
scale-100
          transform
          duration-300 relative flex-auto bg-zinc-900 drop-shadow-md
          `}>
<div className='relative h-96'>
<iframe
        className="iframe-modal"
        src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&controls=0&mute=1&loop=1&rel=0&enablejsapi=1&playlist=${videoUrl}`}
        title="YouTube video player"
      ></iframe>
      <div onClick={handleClose} className='cursor-pointer
      absolute top-3 right-3 h-10 w-10 rounded-full
      bg-black bg-opacity-70 flex items-center justify-center'>

        <AiOutlineClose className='text-white'/>
      </div>
      <div className='absolute bottom-[10%] left-10'>
        <p
        className='
                  text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold
                  mb-8
        '
        >{movie?.original_title !== "default"
          ? movie?.original_title
          : movie?.original_name !== "default"
          ? movie?.original_name
          : movie?.title}</p>
        <div className='
            flex flex-row gap-4 items-center
        '>
<PlayButton movieId={movie?.id}/>
<FavouriteButton movieId={movie?.id}/>

        </div>
      </div>
</div>
<div className='px-12 py-8'>

  <p className='text-green-400 font-semibold text-lg'>New</p>
  <p className='text-white text-lg'>{handleRuntime(movie.runtime)}</p>
  <p className='text-white text-lg'>{movie.genres.map((genre) => genre.name).join(", ")}</p>
  <p className='text-white text-lg'>{movie?.description !== "default"
            ? movie?.description.slice(0, 150)
            : movie?.overview.slice(0, 150)}
          {movie?.description !== "default"
            ? movie?.description.length > 150 && "..."
            : movie?.overview.length > 150 && "..."}</p>


</div>
        </div>
      </div>
      </div>
  )
}

export default InfoModal
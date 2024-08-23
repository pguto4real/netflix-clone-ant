import useBillBoard from "@/hooks/useBillboard";
import { imageBaseUrl } from "@/constant/movie";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
export default function BillBoard() {
  const [trailer, setTrailer] = useState("");

  const { data } = useBillBoard();
  return (
    <div className="text-white relative w-full h-[56.25vw]">
      <iframe
        className="iframe"
        src={`https://www.youtube.com/embed/${data?.videoUrl}?autoplay=1&controls=0&mute=1&loop=1&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=${data?.videoUrl}`}
        title="YouTube video player"
      ></iframe>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="text-white 
        text-xl 
        md:text-5xl
         h-full
          w-[50%]
           lg:text-6xl 
           font-bold 
           drop-shadow-xl
           "
        >
          {data?.original_title !== "default"
            ? data?.original_title
            : data?.original_name !== "default"
              ? data?.original_name
              : data?.title}
        </p>
        <p
          className="
        text-white 
        text-[8px]
         md:text-lg 
         mt-3 
         md:mt-8
          w-[90%] 
          md:w-[80%]
           lg:w-[50%]
           drop-shadow-xl
           "
        >
          {data?.description !== "default"
            ? data?.description.slice(0, 150)
            : data?.overview.slice(0, 150)}
          {data?.description !== "default"
            ? data?.description.length > 150 && "..."
            : data?.overview.length > 150 && "..."}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button className="banner__button bg-white text-black">
            <FaPlay className="mr-1" /> Play
          </button>
          <button
            className="banner__button bg-[gray]/70 text-white"
            onClick={() => {
              // setCurrentMovie(movie);
              // setShowModal(true);
            }}
          >
            <BsInfoCircle className="mr-1 " />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

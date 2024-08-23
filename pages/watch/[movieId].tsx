import useMovie from "@/hooks/useMovie";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useSWR from "swr";

const Watch = () => {
  const router = useRouter();

  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  let videoUrl = ''
  if (data?.videos) {

    const index = data.videos.results.findIndex(
        (element: any) => element?.type === "Trailer" || 
        "Opening Credits" ||
         "Featurette" ||
         "Clip"
    );

   videoUrl = data.videos?.results[index]?.key

}
 
  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="fixed w-full p-4 z-10
    flex  flex-row items-center gap-8 bg-black bg-opacity-70
    "
      >
        <AiOutlineArrowLeft className="text-white cursor-pointer" size={40}  
        onClick={()=>router.push('/')}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span>Watching: </span>
          {data?.original_title !== "default"
            ? data?.original_title
            : data?.original_name !== "default"
            ? data?.original_name
            : data?.title}
        </p>
      </nav>
      <iframe
        className="iframe-watch"
        src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&controls=1&mute=1&loop=1&rel=0&enablejsapi=1&playlist=${videoUrl}`}
        title="YouTube video player"
      ></iframe>
      {/* <video
      className="h-full w-full"
      autoPlay
      controls
        src={`https://www.youtube.com/watch?v=${videoUrl}`}
      ></video> */}
    </div>
  );
};

export default Watch;

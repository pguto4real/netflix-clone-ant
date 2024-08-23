import fetcher from "@/lib/fetcher"
import { Movie } from "@prisma/client";
import useSWR from "swr"
import { create } from "zustand";

export interface ModalStoreInterface {
    movie?: any
    isOpen: boolean;
    openModal: (movie: string) =>void;
    closeModal: () => void
}
const useInfoModal = create<ModalStoreInterface>((set)=>({
    movie: undefined,
    isOpen: false,
    openModal:(movie)=>set({isOpen:true,movie}),
    closeModal: () => set({isOpen:false,movie:undefined})

}))

export default useInfoModal
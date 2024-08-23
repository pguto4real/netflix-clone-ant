import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb'
import { skip } from "node:test";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        await serverAuth(req)

        const movieCount = await prismadb.movie.count()
        const randomIndex = Math.floor(Math.random() * movieCount)


        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })
        const data = (randomMovies[0])

        if (data?.videos) {

            const index = data.videos.results.findIndex(
                (element: Element) => element?.type === "Trailer" || 
                "Opening Credits" ||
                 "Featurette" ||
                 "Clip"
            );

            randomMovies[0].videoUrl = data.videos?.results[index]?.key

        }

        return res.status(200).json(randomMovies[0])
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
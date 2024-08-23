import bcrypt from 'bcrypt'

import prismadb from '@/lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { id, backdrop_path, original_title, genres,
            origin_country,
            original_language,
            overview,
            popularity,
            poster_path,
            media_type,
            release_date,
            first_air_date,
            runtime,
            title,
            videos,
            name,
            description,
            videoUrl,
            original_name,
            vote_average,
            vote_count } = req.body
        console.log('data',req.body)
        const existingMovie = await prismadb.movie.findFirst({
            where: {
                movie_id:id
            }
        })
        // console.log(existingMovie)
        if (!existingMovie) {

            console.log('i got here')
            const movie = await prismadb.movie.create({
                data: {
                    movie_id: id,
                    backdrop_path, 
                    original_title, 
                    genres,
                    origin_country,
                    original_language,
                    overview,
                    popularity,
                    poster_path,
                    media_type,
                    release_date,
                    first_air_date,
                    runtime,
                    title,
                    videos,
                    name,
                    videoUrl,
                    original_name,
                    vote_average,
                    vote_count,
                    description
                }
            })
            return res.status(200).json(movie)
        }
        else
        {
            return res.status(422).json({ error: "Movie Already Created " })
        }
        



        // 
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}

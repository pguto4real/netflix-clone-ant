import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { movieId,currentUser } = req.body
           
        const existingMovie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!existingMovie) {

            throw new Error("Invalid ID");
            
        }
        if (req.method === 'POST') {
        
            const user = await prismadb.user.update({
                where: {
                   email:currentUser.email || '',
                },
                data:{
                    favouriteIds:{
                        push:movieId
                    }
                }
            })
            return res.status(200).json(user)
        }
        if (req.method === 'DELETE') {

            const updatedFavouriteIds = without(currentUser.favouriteIds,movieId)
            
            const user = await prismadb.user.update({
                where: {
                   email:currentUser.email || '',
                },
                data:{
                    favouriteIds:updatedFavouriteIds
                }
            })
            return res.status(200).json(user)
        }
        return res.status(405).end()
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}
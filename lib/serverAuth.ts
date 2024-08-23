import { NextApiRequest } from "next";

import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb'


const serverAuth = async (req:NextApiRequest) => {
    const session = await getSession({req})
    console.log(session?.user?.email)
    if(!session?.user?.email)
    {
        console.log('i got here2')
        throw new Error('Not Signed inn')
    }
console.log('i got here1')
    const currentUser = await prismadb.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!currentUser)
       {
        console.log('i got here4')
        throw new Error('Not Signed in')
    }

    return {currentUser}
}

export default serverAuth
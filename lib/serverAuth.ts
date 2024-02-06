import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb'

const serverAuth = async (req: NextApiRequest) => {
    const body = req.body
    req.body = ''
    const session = await getSession({ req })
    req.body = body
    if (!session?.user?.email) {
        throw new Error('Not signed in')
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    })
    if (!currentUser) {

        throw new Error('Not signed in')
    }

    return { currentUser }
}

export default serverAuth;
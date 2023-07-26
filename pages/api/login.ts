import prisma from "@/prisma/client";
import {NextApiRequest,NextApiResponse} from "next"
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method ==="POST") {
        try {
            const user = await prisma.user.findUnique({
                where:{email:req.body.email}
            })
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
            
        }
    }
}
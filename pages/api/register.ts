import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, password, labname, email } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, password: hashedPassword, email, labname },
      });
      if (user) res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

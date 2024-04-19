import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, imageUrl } = req.body;
  const result = await prisma.interface.create({
    data: {
    authorId: auth().userId!,
      query: content,
      imageUrl: imageUrl,
    },
  });
  return res.status(201).json(result);
}

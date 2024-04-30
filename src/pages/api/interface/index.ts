import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create a new post
  const { title, content, code } = req.body;

  // Get the current user
  const { userId } = auth();

  // Check if the user is logged in
  if (!userId) {
    // Return a 401 if the user is not authorized
    return res.status(401).json({ error: "Not authorized" });
  }

  // Create a new post
  const result = await prisma.interface.create({
    data: {
      authorId: userId,
      query: content,
      code: code,
    },
  });
  // Return the created post
  return res.status(201).json(result);
}


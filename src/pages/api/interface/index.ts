import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Create a new post
    const { userId, query, code } = req.body;

    // Check if the user is logged in
    if (!userId) {
    // Return a 401 if the user is not authorized
        return res.status(401).json({ error: "Not authorized" });
    }

    // Create a new post
    const result = await prisma.interface.create({
        data: {
            authorId: userId,
            query: query,
            code: code,
        },
    });
    // Return the created post
    return res.status(201).json(result);
}


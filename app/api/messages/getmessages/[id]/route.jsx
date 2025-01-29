import prisma from "@/prisma/prismaclient";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const { id } = await params; // Extract the dynamic route parameter `id`
    const parsedId = parseInt(id, 10); // Convert id to an integer

    if (isNaN(parsedId)) {
      return NextResponse.json(
        { msg: "Invalid ID provided" },
        { status: 400 }
      );
    }

    // Fetch the message from the database
    const messages = await prisma.messages.findFirst({
      where: {
        id: parsedId,
      },
    });

    if (messages) {
      return NextResponse.json(
         messages ,
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { msg: "No messages found" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "Something went wrong" },
      { status: 500 }
    );
  }
};

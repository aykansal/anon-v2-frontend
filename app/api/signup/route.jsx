import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import uuid4 from 'uuid4';

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const { name, email, picture } = await req.json();
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return NextResponse.json({
        msg: 'user already exists',
        user: existingUser,
      });
    }
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        picture: picture,
        uid: uuid4(),
        token: 50000,
      },
    });

    console.log('this is the id of the newly generated user', user);
    return NextResponse.json({ msg: 'user signed up ', user: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

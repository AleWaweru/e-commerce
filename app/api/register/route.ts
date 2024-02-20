// api/register.ts

import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      accounts: {
        create: {
          type: "email",
          provider: "email",
          providerAccountId: email,
        },
      },
    },
    include: {
      accounts: true,
    },
  });

  return NextResponse.json(user);
}

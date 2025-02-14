import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your_secret_key";
const uploadDir = path.join(process.cwd(), "public/image");

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const Tel_no = formData.get("Tel_no");
    const role = formData.get("role");
    const description = formData.get("description");
    const youtubeURL = formData.get("youtubeURL");
    const facebookURL = formData.get("facebookURL");
    const instagramURL = formData.get("instagramURL");
    const file = formData.get("imageProfile");

    if (!name || !email || !password || !Tel_no || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageProfile = null;

    if (file && typeof file === "object") {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      imageProfile = `/image/${fileName}`;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        Tel_no,
        role: role.toUpperCase(),
        imageProfile,
        description,
        youtubeURL,
        facebookURL,
        instagramURL,
      },
    });

    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}

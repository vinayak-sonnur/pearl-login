import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "../users";

export async function POST(req) {
  const { email, password } = await req.json();

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "User already exists" },
      { status: 400 }
    );
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  console.log("New User Registered:");
  console.log("Email:", email);
  console.log("Encrypted Password:", hashedPassword);

  return NextResponse.json({
    success: true,
    message: "Signup successful",
  });
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "../users";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 }
    );
  }

  console.log("User Logged In:");
  console.log("Email:", email);
  console.log("Encrypted Password:", user.password);

  return NextResponse.json({
    success: true,
    token: "securetoken123",
  });
}

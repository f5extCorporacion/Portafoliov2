import { db, auth } from "@/firebasedata";
import { sendPasswordResetEmail } from "firebase/auth";

import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { email } = await req.json();
  console.log(email);
}

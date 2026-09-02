"use server"

import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { setSession } from "@/lib/auth"

export async function registerAction(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    console.error("User already exists")
    return
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      role: "ADOPTER"
    }
  })

  // Create session
  await setSession(user.id, user.role, user.firstName || "", user.lastName || "")

  // Redirect to browse
  redirect("/browse")
}

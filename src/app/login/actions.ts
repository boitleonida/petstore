"use server"

import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { setSession } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Fetch the user
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !user.passwordHash) {
    // In a real app, you'd return an error state. For simplicity we'll just throw or return
    console.error("Invalid credentials")
    return
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    console.error("Invalid credentials")
    return
  }

  // Create session
  await setSession(user.id, user.role, user.firstName || "", user.lastName || "")

  // Redirect based on role
  if (user.role === "ADMIN") {
    redirect("/admin/dashboard")
  } else if (user.role === "BREEDER") {
    redirect("/breeders")
  } else {
    redirect("/")
  }
}

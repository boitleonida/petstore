"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export async function approveBreederApp(formData: FormData) {
  const appId = formData.get("appId") as string

  // Fetch the application
  const app = await prisma.breederApplication.findUnique({
    where: { id: appId }
  })

  if (!app) return

  // Create a new User with role BREEDER
  // (In a real app, this might send an invite email so they can set a password. For now, we'll just create the user record)
  
  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { email: app.email }
  })

  if (!user) {
    await prisma.user.create({
      data: {
        email: app.email,
        firstName: app.firstName,
        lastName: app.lastName,
        phone: app.phone,
        role: "BREEDER"
      }
    })
  } else {
    // If they exist (maybe they were an adopter), upgrade them
    await prisma.user.update({
      where: { email: app.email },
      data: { role: "BREEDER" }
    })
  }

  // Update application status
  await prisma.breederApplication.update({
    where: { id: appId },
    data: { status: "APPROVED" }
  })

  revalidatePath("/admin/breeder-apps")
}

export async function rejectBreederApp(formData: FormData) {
  const appId = formData.get("appId") as string

  await prisma.breederApplication.update({
    where: { id: appId },
    data: { status: "REJECTED" }
  })

  revalidatePath("/admin/breeder-apps")
}

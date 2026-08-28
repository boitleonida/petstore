"use server"

import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export async function submitBreederApplication(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const kennelName = formData.get("kennelName") as string
  const websiteUrl = formData.get("websiteUrl") as string | null
  const facilityType = formData.get("facilityType") as string
  const usdaLicense = formData.get("usdaLicense") as string | null
  const healthPractices = formData.get("healthPractices") as string

  // Insert the application into the database
  await prisma.breederApplication.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      kennelName,
      websiteUrl,
      facilityType,
      usdaLicense,
      healthPractices,
      status: "PENDING"
    }
  })

  // Redirect to success page
  redirect("/breeders/apply/success")
}

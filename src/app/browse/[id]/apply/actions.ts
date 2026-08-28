"use server"

import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export async function submitApplication(formData: FormData) {
  const petId = formData.get("petId") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  
  const housing = formData.get("housing") as string
  const yard = formData.get("yard") as string
  const experience = formData.get("experience") as string
  const transport = formData.get("transport") as string

  // Note: Since we haven't built user authentication yet, we'll create a dummy "Adopter" user 
  // on the fly, or update them if they exist, so we can link the application to a user.
  
  let adopter = await prisma.user.findUnique({
    where: { email }
  })

  if (!adopter) {
    adopter = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        role: "ADOPTER"
      }
    })
  }

  // Combine the questionnaire answers into a JSON object
  const homeQuestionnaire = {
    housing,
    yard,
    experience,
    transportPreference: transport
  }

  // Create the application in the database
  await prisma.adoptionApplication.create({
    data: {
      petId,
      adopterId: adopter.id,
      status: "PENDING",
      homeQuestionnaire
    }
  })

  // Redirect to the success page
  redirect(`/browse/${petId}/apply/success`)
}

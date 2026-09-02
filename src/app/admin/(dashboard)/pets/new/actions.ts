"use server"

import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export async function addPetAction(formData: FormData) {
  const name = formData.get("name") as string
  const species = formData.get("species") as string
  const breed = formData.get("breed") as string
  const price = parseFloat(formData.get("price") as string)
  const ageMonths = parseInt(formData.get("ageMonths") as string, 10)
  const weightLbs = parseFloat(formData.get("weightLbs") as string)
  const temperament = formData.get("temperament") as string
  const description = formData.get("description") as string
  const breederId = formData.get("breederId") as string
  const photoUrl = formData.get("photoUrl") as string
  const isLocalOnly = formData.get("isLocalOnly") === "true"

  await prisma.pet.create({
    data: {
      name,
      species,
      breed,
      price,
      ageMonths,
      weightLbs,
      temperament,
      description,
      isLocalOnly,
      breederId,
      mediaGallery: photoUrl ? [photoUrl] : [],
      healthBadges: ["Vet Checked"] // default for now
    }
  })

  redirect("/admin/pets")
}

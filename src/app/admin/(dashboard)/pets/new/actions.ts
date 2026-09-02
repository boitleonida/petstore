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
  const photoFile = formData.get("photo") as File
  const isLocalOnly = formData.get("isLocalOnly") === "true"

  let mediaGallery: string[] = []

  if (photoFile && photoFile.size > 0) {
    // We will upload to the Supabase 'pets' bucket
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    // Preferably use service_role key to bypass RLS for uploads from the server
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    
    // We can't import createClient directly at the top if we don't have it, so we import it here
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const fileExt = photoFile.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`
    
    const arrayBuffer = await photoFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const { data, error } = await supabase.storage
      .from('pets')
      .upload(filePath, buffer, {
        contentType: photoFile.type || 'image/jpeg',
      })
      
    if (error) {
      console.error("Error uploading image:", error)
      // Fallback to base64 if bucket upload fails (e.g. missing RLS policies)
      const base64 = buffer.toString('base64')
      mediaGallery.push(`data:${photoFile.type || 'image/jpeg'};base64,${base64}`)
    } else {
      const { data: publicUrlData } = supabase.storage.from('pets').getPublicUrl(filePath)
      mediaGallery.push(publicUrlData.publicUrl)
    }
  }

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
      mediaGallery,
      healthBadges: ["Vet Checked"] // default for now
    }
  })

  redirect("/admin/pets")
}

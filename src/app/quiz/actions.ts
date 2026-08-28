"use server"

import prisma from "@/lib/prisma"

export async function findMatches(answers: Record<string, string>) {
  // Fetch all available pets
  const allPets = await prisma.pet.findMany({
    where: {
      // In a real app, you might filter out adopted pets here
    }
  })

  // Simple scoring algorithm
  const scoredPets = allPets.map(pet => {
    let score = 0;
    
    // 1. Housing (Apartment vs House vs Acreage)
    if (answers.housing === 'apartment') {
      if (pet.weightLbs < 15 && pet.species !== 'Dog') score += 10;
      if (pet.breed === 'French Bulldog' || pet.breed === 'Persian') score += 20; // Perfect for apartments
      if (pet.breed === 'Golden Retriever' || pet.breed === 'Labradoodle') score -= 20; // Bad for apartments
    } else if (answers.housing === 'acreage') {
      if (pet.species === 'Dog' && pet.weightLbs > 10) score += 20;
    }

    // 2. Activity Level
    if (answers.activity === 'couch') {
      if (pet.breed === 'French Bulldog' || pet.breed === 'Persian') score += 20;
    } else if (answers.activity === 'hiking') {
      if (pet.breed === 'Golden Retriever' || pet.breed === 'Labradoodle') score += 20;
    }

    // 3. Allergies
    if (answers.allergies === 'yes') {
      if (pet.breed === 'Labradoodle' || pet.species === 'Bird') score += 50; // Heavily weight hypoallergenic
      else score -= 50; // Penalize non-hypoallergenic
    }

    // 4. Vibe
    if (answers.vibe === 'independent') {
      if (pet.species === 'Cat') score += 20;
    } else if (answers.vibe === 'loyal') {
      if (pet.species === 'Dog') score += 20;
    } else if (answers.vibe === 'smart') {
      if (pet.species === 'Bird' || pet.breed === 'Labradoodle') score += 20;
    }

    return { ...pet, matchScore: score }
  })

  // Sort by highest score and return top 3 matches
  scoredPets.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0))
  
  return scoredPets.slice(0, 3)
}

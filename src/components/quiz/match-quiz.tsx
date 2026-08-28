"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Home, Building2, Trees, Sofa, PersonStanding, MountainSnow, Clock, Briefcase, Laptop, Wind, Shield, Brain, HeartHandshake, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { findMatches } from "@/app/quiz/actions"

const questions = [
  {
    id: "housing",
    title: "Where will your new best friend live?",
    options: [
      { id: "apartment", label: "Apartment / Condo", icon: Building2 },
      { id: "house", label: "House with a Yard", icon: Home },
      { id: "acreage", label: "Farm / Acreage", icon: Trees },
    ]
  },
  {
    id: "activity",
    title: "What's your ideal weekend vibe?",
    options: [
      { id: "couch", label: "Couch Potato", icon: Sofa },
      { id: "walks", label: "Daily Walks", icon: PersonStanding },
      { id: "hiking", label: "Hiking & Adventures", icon: MountainSnow },
    ]
  },
  {
    id: "time",
    title: "How often is someone home during the day?",
    options: [
      { id: "gone", label: "Mostly Gone", icon: Briefcase },
      { id: "hybrid", label: "Hybrid / Part-Time", icon: Clock },
      { id: "wfh", label: "Work From Home", icon: Laptop },
    ]
  },
  {
    id: "allergies",
    title: "Does anyone in your household have pet allergies?",
    options: [
      { id: "yes", label: "Yes, we need hypoallergenic", icon: Shield },
      { id: "no", label: "No allergies here", icon: Wind },
    ]
  },
  {
    id: "vibe",
    title: "What kind of personality are you looking for?",
    options: [
      { id: "independent", label: "Independent & Sweet", icon: Brain },
      { id: "loyal", label: "Loyal & Goofy", icon: Smile },
      { id: "smart", label: "Highly Intelligent", icon: HeartHandshake },
    ]
  }
]

export function MatchQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [matches, setMatches] = useState<any[] | null>(null)

  const handleSelect = async (optionId: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: optionId }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      // Quiz finished!
      setIsSubmitting(true)
      try {
        const results = await findMatches(newAnswers)
        setMatches(results)
      } catch (e) {
        console.error(e)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Render Results
  if (matches) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="w-full max-w-4xl mx-auto space-y-8 text-center"
      >
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-4">We Found Your Perfect Match!</h2>
          <p className="text-xl text-muted-foreground">Based on your lifestyle, we think you'll love these companions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {matches.map((pet, idx) => (
            <motion.div 
              key={pet.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-background rounded-3xl border overflow-hidden shadow-md"
            >
              <div className="relative h-48 w-full">
                {pet.mediaGallery[0] && (
                  <Image src={pet.mediaGallery[0]} alt={pet.name} fill className="object-cover" />
                )}
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                  {idx === 0 ? "98% Match" : idx === 1 ? "92% Match" : "85% Match"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl">{pet.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pet.breed}</p>
                <Button className="w-full rounded-full" render={<Link href={`/browse/${pet.id}`} />}>
                  Meet {pet.name}
                </Button>
              </div>
            </motion.div>
          ))}
          {matches.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-background rounded-3xl border border-dashed">
              <p className="text-lg text-muted-foreground">We couldn't find a perfect match right now, but check back soon!</p>
              <Button className="mt-4 rounded-full" variant="outline" render={<Link href="/browse" />}>
                Browse All Pets
              </Button>
            </div>
          )}
        </div>
        
        <div className="pt-8">
          <Button variant="ghost" onClick={() => {
            setMatches(null)
            setCurrentQuestion(0)
            setAnswers({})
          }}>
            Retake Quiz
          </Button>
        </div>
      </motion.div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion) / questions.length) * 100

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-2xl font-bold tracking-tight">Analyzing your answers...</h3>
              <p className="text-muted-foreground">Finding the perfect companions in our database.</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center mb-12">
                {question.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {question.options.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className="group relative flex flex-col items-center justify-center p-8 bg-background border-2 border-border rounded-3xl hover:border-primary hover:shadow-lg transition-all text-center aspect-square md:aspect-auto md:h-64"
                    >
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-bold text-lg">{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

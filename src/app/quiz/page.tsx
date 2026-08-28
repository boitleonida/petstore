import { MatchQuiz } from "@/components/quiz/match-quiz"

export const dynamic = "force-dynamic"

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center py-24 px-4 overflow-hidden relative">
      
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

      <div className="w-full max-w-4xl mx-auto">
        <MatchQuiz />
      </div>

    </div>
  )
}

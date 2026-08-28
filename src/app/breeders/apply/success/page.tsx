import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BreederApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center py-24 px-4">
      
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Application Submitted!</h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Thank you for applying to join the Texas Pet Hub network. Our compliance team will review your application and get back to you within 48 hours.
        </p>

        <div className="bg-background rounded-3xl border p-8 max-w-lg mx-auto text-left shadow-sm mt-8">
          <h3 className="font-bold text-lg mb-4">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
              <div>
                <p className="font-medium">Initial Review</p>
                <p className="text-sm text-muted-foreground">We verify your kennel name, health testing protocols, and online presence.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
              <div>
                <p className="font-medium">Onboarding Call</p>
                <p className="text-sm text-muted-foreground">If approved, we will schedule a quick 15-minute call to walk you through the Breeder Dashboard.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">3</div>
              <div>
                <p className="font-medium">Start Listing Pets</p>
                <p className="text-sm text-muted-foreground">You will get full access to list your available pets to our verified buyer network!</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="pt-8 flex flex-col items-center">
          <Button variant="ghost" className="rounded-full h-12" render={<Link href="/" />}>
            Return to Homepage
          </Button>
        </div>

      </div>
    </div>
  )
}

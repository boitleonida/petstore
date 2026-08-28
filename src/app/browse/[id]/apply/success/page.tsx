import Link from "next/link"
import { CheckCircle2, ChevronRight, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApplicationSuccessPage() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center py-24 px-4">
      
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Application Received!</h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Thank you for applying to adopt through Texas Pet Hub. The breeder has been notified and will review your application within 24-48 hours.
        </p>

        <div className="bg-background rounded-3xl border p-8 max-w-lg mx-auto text-left shadow-sm">
          <h3 className="font-bold text-lg mb-4">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
              <div>
                <p className="font-medium">Breeder Review</p>
                <p className="text-sm text-muted-foreground">The breeder will review your housing info and pet experience.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
              <div>
                <p className="font-medium">Escrow Payment</p>
                <p className="text-sm text-muted-foreground">Once approved, you'll be invited to place your deposit in our secure escrow system.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">3</div>
              <div>
                <p className="font-medium">Bring Them Home</p>
                <p className="text-sm text-muted-foreground">Schedule your pickup or track your pet's flight nanny journey.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="pt-4 space-y-4 flex flex-col items-center">
          <Button size="lg" className="rounded-full w-full max-w-md h-14 text-lg" render={<Link href="/browse" />}>
            Continue Browsing <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="ghost" className="rounded-full" render={<Link href="/" />}>
            Return to Home
          </Button>
        </div>

      </div>
    </div>
  )
}

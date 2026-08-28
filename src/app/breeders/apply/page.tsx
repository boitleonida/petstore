import Link from "next/link"
import { CheckCircle2, ShieldCheck, TrendingUp, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { submitBreederApplication } from "./actions"

export const dynamic = "force-dynamic"

export default function BreederApplyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 py-24 relative overflow-hidden border-b">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl -z-10 rounded-full"></div>
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6">
            <ShieldCheck className="w-4 h-4" /> For Premium Breeders
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Grow your breeding program with Texas Pet Hub.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop dealing with scammers and tire-kickers. Join our curated network of premium breeders to access verified buyers, secure escrow payments, and seamless transport logistics.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Verified Buyers Only</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" /> $0 Upfront Fees</span>
            <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-green-500" /> We Handle Transport</span>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Apply to Join the Network</h2>
          <p className="text-muted-foreground">Tell us about your breeding program. We review all applications within 48 hours.</p>
        </div>

        <form action={submitBreederApplication} className="space-y-8">
          
          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-bold border-b pb-4">1. Personal Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required placeholder="Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-bold border-b pb-4">2. Program Information</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="kennelName">Kennel / Cattery Name</Label>
                  <Input id="kennelName" name="kennelName" required placeholder="Texas Star Retrievers" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Website or Social Media Link (Optional)</Label>
                  <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://instagram.com/..." />
                </div>
                
                <div className="space-y-2">
                  <Label>Facility Type</Label>
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <label className="flex items-center gap-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
                      <input type="radio" name="facilityType" value="home" className="w-4 h-4" defaultChecked />
                      <span>Home-based Breeder</span>
                    </label>
                    <label className="flex items-center gap-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-1">
                      <input type="radio" name="facilityType" value="commercial" className="w-4 h-4" />
                      <span>Commercial Facility</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usdaLicense">USDA License Number (if applicable)</Label>
                  <Input id="usdaLicense" name="usdaLicense" placeholder="Leave blank if not applicable" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-bold border-b pb-4">3. Health & Ethical Practices</h3>
              
              <div className="space-y-2">
                <Label htmlFor="healthPractices">Describe your health testing and vaccination protocols</Label>
                <textarea 
                  id="healthPractices" 
                  name="healthPractices" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  required 
                  placeholder="E.g., All parents are OFA tested. Puppies receive first rounds of DHPP at 6 weeks..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full h-14 text-lg rounded-full">
              Submit Application
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              By submitting this application, you agree to our Breeder Code of Ethics.
            </p>
          </div>

        </form>
      </section>
    </div>
  )
}

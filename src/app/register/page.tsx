import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, ShieldCheck } from "lucide-react"
import { registerAction } from "./actions"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tight text-primary mb-8">
        <PawPrint className="w-8 h-8" />
        <span>Texas Pet Hub</span>
      </Link>

      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join Texas Pet Hub to adopt your dream pet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={registerAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button className="w-full h-11 text-base font-medium" type="submit">
              Sign Up
            </Button>
          </form>

          <div className="mt-8 text-center border-t pt-6">
            <p className="text-sm text-muted-foreground mb-4">Are you a premium breeder?</p>
            <Button variant="outline" className="w-full h-11" render={<Link href="/breeders/apply" />}>
              <ShieldCheck className="w-4 h-4 mr-2" /> Apply as a Breeder
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}

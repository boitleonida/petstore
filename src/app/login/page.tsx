import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint } from "lucide-react"
import { loginAction } from "./actions"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tight text-primary mb-8">
        <PawPrint className="w-8 h-8" />
        <span>Texas Pet Hub</span>
      </Link>

      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button className="w-full h-11 text-base font-medium" type="submit">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/register" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}

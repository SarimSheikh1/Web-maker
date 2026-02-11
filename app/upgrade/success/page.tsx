'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UpgradeSuccessPage() {
  const [plan, setPlan] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const selectedPlan = localStorage.getItem('selectedPlan')
    if (selectedPlan) {
      setPlan(JSON.parse(selectedPlan))
    } else {
      // Redirect if no plan selected
      router.push('/pricing')
    }
  }, [router])

  if (!plan) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl text-green-900">
            Welcome to {plan.name}! 🎉
          </CardTitle>
          <CardDescription className="text-lg">
            Your upgrade was successful. You now have access to all premium features!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Your New Plan Benefits:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">
                  Create up to {plan.websites === 999 ? 'unlimited' : plan.websites} websites
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">All 18+ animations</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">All 12 themes</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">Premium templates</span>
              </div>
              {plan.id !== 'starter' && (
                <>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">Advanced analytics</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Ready to start building?</h3>
            <p className="text-gray-600">
              Head to your dashboard to create new websites and explore all the premium features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/demo">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Zap className="w-5 h-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/editor/demo">
                <Button size="lg" variant="outline">
                  Try the Editor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Demo Note */}
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              💡 <strong>Demo Note:</strong> This is a demonstration of the upgrade flow. 
              In the real application, payment processing would be integrated here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
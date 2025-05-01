import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">CareerGuide AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your ideal career path based on your unique skills, interests, and preferences
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Career Assessment</CardTitle>
              <CardDescription>
                Answer 5 simple questions to discover career paths that match your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/placeholder.svg?height=200&width=350"
                alt="Career Assessment Illustration"
                className="rounded-md w-full h-48 object-cover mb-4"
              />
              <p className="text-gray-600">
                Our AI-powered assessment analyzes your responses to suggest careers that align with your strengths and
                preferences.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/assessment" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">Take Assessment</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Career Chatbot</CardTitle>
              <CardDescription>Get personalized career advice from our AI career counselor</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/placeholder.svg?height=200&width=350"
                alt="Career Chatbot Illustration"
                className="rounded-md w-full h-48 object-cover mb-4"
              />
              <p className="text-gray-600">
                Ask questions about career paths, skills development, education requirements, and more.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/chat" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Chat Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Why Choose CareerGuide AI?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">Tailored recommendations based on your unique profile</p>
            </div>
            <div className="p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">Advanced algorithms to match your skills with career opportunities</p>
            </div>
            <div className="p-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Real-Time Support</h3>
              <p className="text-gray-600">Get answers to your career questions instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

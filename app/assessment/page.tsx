"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Define the assessment questions and options
const questions = [
  {
    id: 1,
    question: "What are your primary interests?",
    options: [
      { id: "tech", label: "Technology and computers" },
      { id: "creative", label: "Creative arts and design" },
      { id: "business", label: "Business and entrepreneurship" },
      { id: "science", label: "Science and research" },
      { id: "social", label: "Helping and teaching others" },
      { id: "health", label: "Health and wellness" },
    ],
  },
  {
    id: 2,
    question: "Which skills do you possess or enjoy developing?",
    options: [
      { id: "analytical", label: "Analytical thinking and problem-solving" },
      { id: "communication", label: "Communication and interpersonal skills" },
      { id: "technical", label: "Technical and programming skills" },
      { id: "creative", label: "Creative thinking and design" },
      { id: "leadership", label: "Leadership and management" },
      { id: "detail", label: "Attention to detail and organization" },
    ],
  },
  {
    id: 3,
    question: "What type of work environment do you prefer?",
    options: [
      { id: "office", label: "Traditional office setting" },
      { id: "remote", label: "Remote or work from home" },
      { id: "outdoor", label: "Outdoors or field work" },
      { id: "travel", label: "Involves travel or changing locations" },
      { id: "collaborative", label: "Highly collaborative team environment" },
      { id: "independent", label: "Independent work with autonomy" },
    ],
  },
  {
    id: 4,
    question: "What level of education have you completed or plan to complete?",
    options: [
      { id: "highschool", label: "High school" },
      { id: "diploma", label: "Diploma or certificate" },
      { id: "bachelor", label: "Bachelor's degree" },
      { id: "master", label: "Master's degree" },
      { id: "phd", label: "PhD or doctorate" },
      { id: "self", label: "Self-taught or alternative education" },
    ],
  },
  {
    id: 5,
    question: "What values are most important to you in a career?",
    options: [
      { id: "salary", label: "High income potential" },
      { id: "worklife", label: "Work-life balance" },
      { id: "impact", label: "Making a positive impact" },
      { id: "growth", label: "Growth and learning opportunities" },
      { id: "stability", label: "Job security and stability" },
      { id: "recognition", label: "Recognition and prestige" },
    ],
  },
]

export default function Assessment() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  })

  const handleOptionToggle = (questionId: number, optionId: string) => {
    setSelectedOptions((prev) => {
      const currentSelections = [...(prev[questionId] || [])]

      if (currentSelections.includes(optionId)) {
        return {
          ...prev,
          [questionId]: currentSelections.filter((id) => id !== optionId),
        }
      } else {
        return {
          ...prev,
          [questionId]: [...currentSelections, optionId],
        }
      }
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Store results and navigate to results page
      localStorage.setItem("assessmentResults", JSON.stringify(selectedOptions))
      router.push("/assessment/results")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Career Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
            <Progress value={progress} className="h-2 mt-2" />
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-medium mb-6">{question.question}</h3>
            <div className="space-y-4">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions[question.id]?.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(question.id, option.id)}
                  />
                  <Label htmlFor={option.id} className="text-base cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700"
              disabled={selectedOptions[question.id]?.length === 0}
            >
              {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

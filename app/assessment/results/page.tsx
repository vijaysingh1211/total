"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Career paths with descriptions and salary ranges in INR
const careerPaths = {
  tech: [
    {
      title: "Software Developer",
      description: "Design, develop, and maintain software applications and systems.",
      skills: ["Problem-solving", "Programming", "Logical thinking"],
      education: "Bachelor's in Computer Science or related field",
      salaryRange: "₹5,00,000 - ₹25,00,000 per annum",
      growth: "High demand across industries",
    },
    {
      title: "Data Scientist",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      skills: ["Statistical analysis", "Machine learning", "Programming"],
      education: "Master's or PhD in Statistics, Computer Science, or related field",
      salaryRange: "₹8,00,000 - ₹20,00,000 per annum",
      growth: "Rapidly growing field with high demand",
    },
    {
      title: "UX/UI Designer",
      description: "Create user-friendly interfaces and experiences for digital products.",
      skills: ["Design thinking", "User research", "Visual design"],
      education: "Bachelor's in Design, HCI, or related field",
      salaryRange: "₹6,00,000 - ₹18,00,000 per annum",
      growth: "Growing demand as digital products expand",
    },
  ],
  business: [
    {
      title: "Management Consultant",
      description: "Help organizations improve performance and efficiency.",
      skills: ["Problem-solving", "Analysis", "Communication"],
      education: "MBA or related business degree",
      salaryRange: "₹10,00,000 - ₹30,00,000 per annum",
      growth: "Stable demand across industries",
    },
    {
      title: "Financial Analyst",
      description: "Evaluate financial data and make recommendations for businesses.",
      skills: ["Financial modeling", "Analysis", "Attention to detail"],
      education: "Bachelor's or Master's in Finance, Economics, or related field",
      salaryRange: "₹6,00,000 - ₹20,00,000 per annum",
      growth: "Consistent demand in financial sector",
    },
    {
      title: "Digital Marketing Specialist",
      description: "Develop and implement marketing strategies for digital platforms.",
      skills: ["Marketing", "Analytics", "Creativity"],
      education: "Bachelor's in Marketing, Communications, or related field",
      salaryRange: "₹4,50,000 - ₹15,00,000 per annum",
      growth: "High growth with increasing digital presence",
    },
  ],
  creative: [
    {
      title: "Graphic Designer",
      description: "Create visual concepts to communicate ideas that inspire and inform consumers.",
      skills: ["Visual design", "Creativity", "Software proficiency"],
      education: "Bachelor's in Design or related field",
      salaryRange: "₹3,50,000 - ₹12,00,000 per annum",
      growth: "Steady demand across industries",
    },
    {
      title: "Content Creator",
      description: "Develop engaging content for various platforms and audiences.",
      skills: ["Writing", "Creativity", "Communication"],
      education: "Bachelor's in Communications, English, or related field",
      salaryRange: "₹4,00,000 - ₹15,00,000 per annum",
      growth: "Growing demand with digital content expansion",
    },
    {
      title: "Film/Video Producer",
      description: "Oversee the production of films, TV shows, or digital video content.",
      skills: ["Project management", "Creativity", "Technical knowledge"],
      education: "Bachelor's in Film, Media, or related field",
      salaryRange: "₹5,00,000 - ₹25,00,000 per annum",
      growth: "Increasing demand with streaming platforms",
    },
  ],
  health: [
    {
      title: "Healthcare Administrator",
      description: "Manage healthcare facilities, services, and staff.",
      skills: ["Management", "Communication", "Organization"],
      education: "Bachelor's or Master's in Healthcare Administration or related field",
      salaryRange: "₹7,00,000 - ₹20,00,000 per annum",
      growth: "Stable growth in healthcare sector",
    },
    {
      title: "Clinical Psychologist",
      description: "Diagnose and treat mental, emotional, and behavioral disorders.",
      skills: ["Empathy", "Analysis", "Communication"],
      education: "PhD in Psychology",
      salaryRange: "₹6,00,000 - ₹15,00,000 per annum",
      growth: "Increasing demand with mental health awareness",
    },
    {
      title: "Nutritionist",
      description: "Advise clients on healthy eating habits and nutrition plans.",
      skills: ["Nutrition knowledge", "Communication", "Problem-solving"],
      education: "Bachelor's or Master's in Nutrition or related field",
      salaryRange: "₹4,00,000 - ₹12,00,000 per annum",
      growth: "Growing demand with health consciousness",
    },
  ],
  science: [
    {
      title: "Research Scientist",
      description: "Conduct research to advance knowledge in a specific field.",
      skills: ["Research", "Analysis", "Critical thinking"],
      education: "PhD in relevant scientific field",
      salaryRange: "₹6,00,000 - ₹20,00,000 per annum",
      growth: "Varies by field, strong in biotech and environmental science",
    },
    {
      title: "Environmental Scientist",
      description: "Study environmental problems and develop solutions.",
      skills: ["Research", "Analysis", "Problem-solving"],
      education: "Bachelor's or Master's in Environmental Science or related field",
      salaryRange: "₹5,00,000 - ₹15,00,000 per annum",
      growth: "Growing with environmental concerns",
    },
    {
      title: "Biomedical Engineer",
      description: "Develop devices and procedures that solve medical and health-related problems.",
      skills: ["Engineering", "Problem-solving", "Medical knowledge"],
      education: "Bachelor's or Master's in Biomedical Engineering",
      salaryRange: "₹6,00,000 - ₹18,00,000 per annum",
      growth: "Strong growth in healthcare technology",
    },
  ],
  social: [
    {
      title: "Social Worker",
      description: "Help people solve and cope with problems in their everyday lives.",
      skills: ["Empathy", "Communication", "Problem-solving"],
      education: "Bachelor's or Master's in Social Work",
      salaryRange: "₹3,50,000 - ₹10,00,000 per annum",
      growth: "Steady demand in social services",
    },
    {
      title: "Teacher/Educator",
      description: "Instruct students and help them learn and develop skills.",
      skills: ["Communication", "Patience", "Subject expertise"],
      education: "Bachelor's in Education or subject area, teaching certification",
      salaryRange: "₹3,00,000 - ₹12,00,000 per annum",
      growth: "Consistent demand in education sector",
    },
    {
      title: "HR Specialist",
      description: "Recruit, screen, interview, and place workers in organizations.",
      skills: ["Communication", "Organization", "Interpersonal skills"],
      education: "Bachelor's in HR, Business, or related field",
      salaryRange: "₹4,50,000 - ₹15,00,000 per annum",
      growth: "Stable demand across industries",
    },
  ],
}

// Simple algorithm to match user selections to career categories
const matchCareerPaths = (selections: Record<number, string[]>) => {
  const categoryScores: Record<string, number> = {
    tech: 0,
    business: 0,
    creative: 0,
    health: 0,
    science: 0,
    social: 0,
  }

  // Question 1: Interests
  if (selections[1].includes("tech")) categoryScores.tech += 2
  if (selections[1].includes("creative")) categoryScores.creative += 2
  if (selections[1].includes("business")) categoryScores.business += 2
  if (selections[1].includes("science")) categoryScores.science += 2
  if (selections[1].includes("social")) categoryScores.social += 2
  if (selections[1].includes("health")) categoryScores.health += 2

  // Question 2: Skills
  if (selections[2].includes("analytical")) {
    categoryScores.tech += 1
    categoryScores.science += 1
    categoryScores.business += 1
  }
  if (selections[2].includes("communication")) {
    categoryScores.social += 1
    categoryScores.business += 1
  }
  if (selections[2].includes("technical")) {
    categoryScores.tech += 1
    categoryScores.science += 1
  }
  if (selections[2].includes("creative")) {
    categoryScores.creative += 1
  }
  if (selections[2].includes("leadership")) {
    categoryScores.business += 1
    categoryScores.social += 1
  }
  if (selections[2].includes("detail")) {
    categoryScores.health += 1
    categoryScores.science += 1
  }

  // Question 3: Work environment
  if (selections[3].includes("office") || selections[3].includes("remote")) {
    categoryScores.tech += 0.5
    categoryScores.business += 0.5
  }
  if (selections[3].includes("outdoor")) {
    categoryScores.science += 0.5
  }
  if (selections[3].includes("collaborative")) {
    categoryScores.social += 0.5
    categoryScores.creative += 0.5
  }

  // Question 4: Education
  if (selections[4].includes("phd") || selections[4].includes("master")) {
    categoryScores.science += 0.5
  }

  // Question 5: Values
  if (selections[5].includes("impact")) {
    categoryScores.social += 0.5
    categoryScores.health += 0.5
  }
  if (selections[5].includes("salary")) {
    categoryScores.tech += 0.5
    categoryScores.business += 0.5
  }

  // Sort categories by score and return top 3
  return Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category)
}

export default function Results() {
  const [recommendedPaths, setRecommendedPaths] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get assessment results from localStorage
    const resultsString = localStorage.getItem("assessmentResults")
    if (resultsString) {
      const results = JSON.parse(resultsString)
      const matchedPaths = matchCareerPaths(results)
      setRecommendedPaths(matchedPaths)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Analyzing your responses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-green-700">Your Career Path Recommendations</CardTitle>
            <CardDescription className="text-lg">
              Based on your responses, we've identified these career paths that might be a good fit for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={recommendedPaths[0]} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                {recommendedPaths.map((path) => (
                  <TabsTrigger key={path} value={path} className="text-base capitalize">
                    {path}
                  </TabsTrigger>
                ))}
              </TabsList>

              {recommendedPaths.map((path) => (
                <TabsContent key={path} value={path}>
                  <div className="space-y-8">
                    {careerPaths[path as keyof typeof careerPaths].map((career, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                          <CardTitle className="text-xl text-green-700">{career.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <p className="mb-4 text-gray-700">{career.description}</p>

                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <h4 className="font-semibold text-green-600 mb-2">Key Skills</h4>
                              <ul className="list-disc pl-5 text-gray-700">
                                {career.skills.map((skill, i) => (
                                  <li key={i}>{skill}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-green-600 mb-2">Education</h4>
                              <p className="text-gray-700">{career.education}</p>

                              <h4 className="font-semibold text-green-600 mt-4 mb-2">Salary Range</h4>
                              <p className="text-gray-700">{career.salaryRange}</p>

                              <h4 className="font-semibold text-green-600 mt-4 mb-2">Growth Outlook</h4>
                              <p className="text-gray-700">{career.growth}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 flex-wrap">
            <Link href="/assessment">
              <Button variant="outline">Retake Assessment</Button>
            </Link>
            <Link href="/chat">
              <Button className="bg-green-600 hover:bg-green-700">Chat with Career Advisor</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

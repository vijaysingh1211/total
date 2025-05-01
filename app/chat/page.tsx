"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, MicOff } from "lucide-react"

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Career Counselor. How can I help with your career questions today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Speech Recognition setup
      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ""
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)
          setInput(finalTranscript || interimTranscript)

          // If we have a final transcript and it's not empty, send the message
          if (finalTranscript && !isTyping) {
            handleSendMessage(finalTranscript)
            setTranscript("")
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }
      }

      // Speech Synthesis setup
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [isTyping])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    // Speak the last assistant message
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === "assistant" && synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(lastMessage.content)
      synthRef.current.speak(utterance)
    }
  }, [messages])

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsListening(false)
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }
      setIsListening(true)
    }
  }

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: text }])

    // Clear input and show typing indicator
    setInput("")
    setTranscript("")
    setIsTyping(true)

    try {
      // Call the Next.js API route that communicates with the Python backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      // Add assistant response
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting to my knowledge base. Please try again later.",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-lg h-[80vh] flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Career Counselor Chat</CardTitle>
            <CardDescription>Ask questions about career paths, skills, education, or job market trends</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className={message.role === "assistant" ? "bg-green-100" : "bg-blue-100"}>
                        <AvatarFallback>{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-3 ${
                          message.role === "assistant" ? "bg-white border border-gray-200" : "bg-blue-600 text-white"
                        }`}
                      >
                        <p className="text-sm sm:text-base">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <Avatar className="bg-green-100">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 bg-white border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {transcript && !isTyping && (
                  <div className="flex justify-end">
                    <div className="flex items-start gap-3 max-w-[80%] flex-row-reverse">
                      <Avatar className="bg-blue-100">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-4 py-3 bg-blue-200 text-blue-800">
                        <p className="text-sm sm:text-base italic">{transcript}...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your career question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow"
              />
              <Button
                onClick={toggleListening}
                variant="outline"
                className={isListening ? "bg-red-100" : ""}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5 text-green-500" />}
              </Button>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700"
              >
                Send
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { TimelineChart } from "./timeline-chart"
import { WordCloud } from "./word-cloud"
import { Header } from "./header"
import { Footer } from "./footer"
import { SuggestedPrompts } from "./suggested-prompts"
import { fetchArtifacts, Artifact } from "@/utils/api"
import { parseYear } from "@/utils/dateUtils"
import { ArtifactCard } from "./artifact-card"
import ErrorBoundary from './error-boundary';

export default function MuseumExplorer() {
  const [artifacts, setArtifacts] = React.useState<Artifact[]>([])
  const [meta, setMeta] = React.useState<{ total: number; pages: number; currentPage: number } | null>(null)
  const [conversation, setConversation] = React.useState<string[]>([
    "Welcome to VAi! How can I assist you in exploring our museum's space-related artefact collection today?",
  ])
  const [userInput, setUserInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [currentQuery, setCurrentQuery] = React.useState("space")
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null)
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())

  const loadArtifacts = React.useCallback(async (query: string) => {
    try {
      setIsLoading(true)
      setError(null)
      console.log(`Fetching artifacts with query: ${query}`);
      const { records, meta } = await fetchArtifacts(1, 20, query)
      console.log('Fetched artifacts:', records);
      setArtifacts(records)
      setMeta(meta)
      setCurrentQuery(query)
    } catch (error) {
      console.error("Failed to load artifacts:", error)
      setError(`Failed to load artifacts: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadArtifacts(currentQuery)
  }, [loadArtifacts, currentQuery])

  React.useEffect(() => {
    console.log('Artifacts state updated:', artifacts);
  }, [artifacts]);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setConversation((prev) => [...prev, `User: ${userInput}`, `AI: Here's what I found about that...`])
      setUserInput("")
    }
  }

  const handlePromptSelect = (prompt: string) => {
    setUserInput(prompt)
    handleSendMessage()
  }

  const handleObjectTypeClick = (objectType: string) => {
    loadArtifacts(objectType)
    setSelectedYear(null)
  }

  const handleYearClick = (year: number) => {
    setSelectedYear(prevYear => prevYear === year ? null : year)
  }

  const handleItemSelect = (systemNumber: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(systemNumber)) {
        newSet.delete(systemNumber)
      } else {
        newSet.add(systemNumber)
      }
      return newSet
    })
  }

  const filteredArtifacts = React.useMemo(() => {
    if (selectedYear === null) return artifacts
    return artifacts.filter(artifact => {
      const year = parseYear(artifact._primaryDate)
      return year === selectedYear
    })
  }, [artifacts, selectedYear])

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />
      <main className="flex-1 bg-white text-black">
        <div className="container px-4 py-6 md:px-6 lg:px-8">
          <ErrorBoundary>
            <div className="grid gap-6 lg:grid-cols-[25%_1fr]">
              <div className="flex flex-col gap-6">
                <Card className="bg-gray-100 text-black">
                  <CardContent className="p-4">
                    <ScrollArea className="h-[300px] md:h-[400px]">
                      {conversation.map((message, index) => (
                        <div
                          key={index}
                          className={`mb-4 p-3 ${
                            message.startsWith("User:") 
                              ? "text-left mr-12" 
                              : "text-right ml-12"
                          }`}
                        >
                          {message}
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your question here..."
                      className="bg-white text-black border-gray-300"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="bg-gray-700 hover:bg-gray-600 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <SuggestedPrompts onSelectPrompt={handlePromptSelect} />
                </div>
              </div>
              <div className="space-y-6 w-full">
                {isLoading ? (
                  <p className="text-black">Loading visualizations...</p>
                ) : (
                  <>
                    <TimelineChart 
                      artifacts={artifacts} 
                      onYearClick={handleYearClick} 
                      selectedYear={selectedYear}
                      onReset={() => setSelectedYear(null)}
                    />
                    <WordCloud artifacts={filteredArtifacts} onObjectTypeClick={handleObjectTypeClick} />
                  </>
                )}
                {meta && (
                  <div className="text-sm text-gray-500 mt-4">
                    Showing page {meta.currentPage} of {meta.pages} (Total items: {meta.total})
                  </div>
                )}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {isLoading ? (
                    <p className="text-black">Loading artifacts...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : artifacts.length === 0 ? (
                    <p className="text-black">No artifacts found.</p>
                  ) : (
                    artifacts.map((artifact) => (
                      <ArtifactCard
                        key={artifact.systemNumber}
                        artifact={artifact}
                        isSelected={selectedItems.has(artifact.systemNumber)}
                        onSelect={handleItemSelect}
                        isGreyed={selectedYear !== null && parseYear(artifact._primaryDate) !== selectedYear}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  )
}


"use client"

import React from "react"
import { TagCloud } from "react-tagcloud"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Artifact } from "../utils/api"

interface WordCloudProps {
  artifacts: Artifact[];
  onObjectTypeClick: (objectType: string) => void;
}

interface WordCloudData {
  value: string;
  count: number;
}

export function WordCloud({ artifacts, onObjectTypeClick }: WordCloudProps) {
  const [wordCloudData, setWordCloudData] = React.useState<WordCloudData[]>([])

  React.useEffect(() => {
    const objectTypeCounts: { [key: string]: number } = {}
    
    artifacts.forEach(artifact => {
      if (artifact.objectType) {
        objectTypeCounts[artifact.objectType] = (objectTypeCounts[artifact.objectType] || 0) + 1
      }
    })

    const data: WordCloudData[] = Object.entries(objectTypeCounts)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30) // Limit to top 30 object types to keep the cloud manageable

    setWordCloudData(data)
  }, [artifacts])

  if (wordCloudData.length === 0) {
    return (
      <Card className="bg-gray-100 text-black">
        <CardContent className="p-4">
          <p>No word cloud data available. This could be due to missing object type information in the artifacts.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-100 text-black">
      <CardHeader>
        <CardTitle className="text-black">Object Types Word Cloud</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-36 flex items-center justify-center">
          <TagCloud
            minSize={12}
            maxSize={35}
            tags={wordCloudData}
            className="text-center cursor-pointer"
            onClick={(tag: WordCloudData) => onObjectTypeClick(tag.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}


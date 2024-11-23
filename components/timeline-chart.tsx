"use client"

import React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Artifact } from "../utils/api"
import { parseYear } from "../utils/dateUtils"

interface TimelineChartProps {
  artifacts: Artifact[];
  onYearClick: (year: number) => void;
  selectedYear: number | null;
  onReset: () => void;
}

interface TimelineData {
  year: number;
  count: number;
}

export function TimelineChart({ artifacts, onYearClick, selectedYear, onReset }: TimelineChartProps) {
  const [timelineData, setTimelineData] = React.useState<TimelineData[]>([])

  React.useEffect(() => {
    const yearCounts: { [key: number]: number } = {}
    
    artifacts.forEach(artifact => {
      const year = parseYear(artifact._primaryDate);
      if (year) {
        yearCounts[year] = (yearCounts[year] || 0) + 1
      }
    })

    const data: TimelineData[] = Object.entries(yearCounts)
      .map(([year, count]) => ({
        year: parseInt(year),
        count,
      }))
      .sort((a, b) => a.year - b.year)

    setTimelineData(data)
  }, [artifacts])

  if (timelineData.length === 0) {
    return (
      <Card className="bg-gray-100 text-black">
        <CardContent className="p-4">
          <p>No timeline data available. This could be due to missing date information in the artifacts.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-100 text-black">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-black">Artifact Timeline</CardTitle>
        {selectedYear !== null && (
          <Button onClick={onReset} variant="outline" size="sm">
            Reset Timeline
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timelineData}>
            <XAxis
              dataKey="year"
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#000000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
              labelStyle={{ color: '#000000' }}
              itemStyle={{ color: '#000000' }}
              formatter={(value, name, props) => [`${value} artifacts`, `Year: ${props.payload.year}`]}
            />
            <Bar dataKey="count" onClick={(data) => onYearClick(data.year)}>
              {timelineData.map((entry) => (
                <Cell
                  key={`cell-${entry.year}`}
                  cursor="pointer"
                  fill={selectedYear === entry.year ? `hsl(200, 100%, 50%)` : `hsl(200, 70%, 60%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


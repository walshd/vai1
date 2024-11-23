import { Button } from "@/components/ui/button"

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  const prompts = [
    "Tell me about ancient Egyptian artifacts",
    "What's the oldest item in the collection?",
    "Show me Renaissance paintings",
  ]

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-300">Suggested Prompts:</h3>
      <div className="flex flex-col gap-2">
        {prompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            className="justify-start bg-white text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-black border-gray-300"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  )
}


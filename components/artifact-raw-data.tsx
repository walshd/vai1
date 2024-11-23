import { DetailedArtifact } from '@/utils/api'

interface ArtifactRawDataProps {
  artifact: DetailedArtifact
}

export function ArtifactRawData({ artifact }: ArtifactRawDataProps) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Raw Artifact Data</h2>
      <pre className="bg-gray-700 p-4 rounded overflow-auto max-h-[80vh] text-sm">
        {JSON.stringify(artifact, null, 2)}
      </pre>
    </div>
  )
}


import { ArtifactDetail } from "@/components/artifact-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { DetailedArtifact } from "@/utils/api"

interface ArtifactPageProps {
  params: {
    id: string
  }
}

async function fetchArtifactById(id: string): Promise<DetailedArtifact> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/artifact/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch artifact');
  }
  return response.json();
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  let artifactData: DetailedArtifact;
  try {
    artifactData = await fetchArtifactById(params.id);
  } catch (error) {
    console.error('Error fetching artifact:', error);
    return (
      <div className="flex min-h-screen flex-col bg-gray-900">
        <Header />
        <main className="flex-1 bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>An error occurred while fetching the artifact. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!artifactData) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Header />
      <main className="flex-1 bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <ArtifactDetail artifact={artifactData} />
        </div>
      </main>
      <Footer />
    </div>
  )
}


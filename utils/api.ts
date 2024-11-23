export interface DetailedArtifact {
  systemNumber: string;
  title: string;
  objectType: string[];
  dateText: string;
  artistMakerName: string;
  placeOfOrigin: string;
  briefDescription: string;
  physicalDescription: string;
  categories: string[];
  materials: string[];
  techniques: string[];
  dimensions: string[];
  productionType: string;
  marks: string[];
  galleryLabel: string;
  objectHistory: string;
  historicalContext: string;
  subjectsDepicted: string[];
  bibliographicReferences: string[];
  accessionNumber: string;
  primaryImageId: string;
  additionalImageIds: string[];
}

export interface Artifact {
  systemNumber: string;
  _primaryTitle: string;
  _primaryDate: string;
  _primaryMaker: string | { name: string; association: string };
  location: string;
  onDisplay: boolean;
  _primaryImageId: string;
  objectType: string | string[];
}

interface ArtifactsResponse {
  records: Artifact[];
  meta: {
    total: number;
    pages: number;
    currentPage: number;
  };
}

export async function fetchArtifactById(systemNumber: string): Promise<DetailedArtifact | null> {
  try {
    const response = await fetch(`/api/artifact/${systemNumber}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as DetailedArtifact;
  } catch (error) {
    console.error('Error fetching artifact:', error);
    throw error;
  }
}

export async function fetchArtifacts(page: number, pageSize: number, query: string): Promise<ArtifactsResponse> {
  console.log(`Fetching artifacts: page=${page}, pageSize=${pageSize}, query=${query}`);
  const response = await fetch(`/api/artifacts?page=${page}&pageSize=${pageSize}&query=${query}`);
  const data = await response.json();

  if (!response.ok) {
    console.error('Fetch artifacts error:', data);
    throw new Error(data.error || `Failed to fetch artifacts: ${response.status} ${response.statusText}`);
  }

  console.log('Fetched artifacts data:', data);
  return data;
}


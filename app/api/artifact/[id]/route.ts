import { NextRequest, NextResponse } from 'next/server'

const API_OBJECT_URL = 'https://api.vam.ac.uk/v2/museumobject';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const response = await fetch(`${API_OBJECT_URL}/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.record) {
      console.error('No record found in API response:', data);
      return NextResponse.json({ error: 'No record found in API response' }, { status: 404 });
    }

    const artifact = {
      systemNumber: data.record.systemNumber || '',
      title: data.record.titles?.[0]?.title || 'Untitled',
      objectType: Array.isArray(data.record.objectType) ? data.record.objectType : [data.record.objectType || 'Unknown'],
      dateText: data.record.productionDates?.[0]?.date?.text || '',
      artistMakerName: data.record.artistMakerPerson?.[0]?.name?.text || 'Unknown Maker',
      placeOfOrigin: data.record.placeOfOrigin?.[0]?.text || '',
      briefDescription: data.record.briefDescription || '',
      physicalDescription: data.record.physicalDescription || '',
      categories: data.record.categories?.map((cat: any) => cat.text) || [],
      materials: data.record.materials?.map((mat: any) => mat.text) || [],
      techniques: data.record.techniques?.map((tech: any) => tech.text) || [],
      dimensions: data.record.dimensions?.map((dim: any) => dim.text) || [],
      productionType: data.record.productionType || '',
      marks: data.record.marks?.map((mark: any) => mark.text) || [],
      galleryLabel: data.record.labels?.[0]?.text || '',
      objectHistory: data.record.objectHistory || '',
      historicalContext: data.record.historicalContext || '',
      subjectsDepicted: data.record.subjectsDepicted?.map((subj: any) => subj.text) || [],
      bibliographicReferences: data.record.bibliographicReferences?.map((ref: any) => ref.text) || [],
      accessionNumber: data.record.accessionNumber || '',
      primaryImageId: data.record.primaryImageId || '',
      additionalImageIds: data.record.additionalImageIds || [],
    };

    return NextResponse.json(artifact);
  } catch (error) {
    console.error('Error fetching artifact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


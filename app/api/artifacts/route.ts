import { NextRequest, NextResponse } from 'next/server'

const API_SEARCH_URL = 'https://api.vam.ac.uk/v2/objects/search';

export async function GET(request: NextRequest) {
  console.log('Received request:', request.url);
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const page = searchParams.get('page') || '1'
  const pageSize = searchParams.get('pageSize') || '20'

  try {
    console.log(`Fetching artifacts from: ${API_SEARCH_URL}?q=${query}&page=${page}&page_size=${pageSize}`);
    const response = await fetch(`${API_SEARCH_URL}?q=${query}&page=${page}&page_size=${pageSize}`);
    
    if (!response.ok) {
      console.error(`API response not OK. Status: ${response.status}`);
      return NextResponse.json({ error: `API request failed with status ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    console.log('API response data:', JSON.stringify(data, null, 2));
    
    if (!data.records) {
      console.error('No records found in API response:', data);
      return NextResponse.json({ error: 'No records found in API response' }, { status: 404 });
    }

    const artifacts = data.records.map((record: any) => ({
      systemNumber: record.systemNumber,
      _primaryTitle: record.title,
      _primaryDate: record._primaryDate,
      _primaryMaker: record._primaryMaker,
      location: record.location,
      onDisplay: record.onDisplay,
      _primaryImageId: record._primaryImageId,
      objectType: record.objectType,
    }));

    console.log('Processed artifacts:', JSON.stringify(artifacts, null, 2));

    return NextResponse.json({ 
      records: artifacts,
      meta: {
        total: data.info.total,
        pages: data.info.pages,
        currentPage: data.info.page
      }
    });
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message, stack: error.stack }, { status: 500 });
  }
}


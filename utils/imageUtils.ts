export function getImageUrl(imageId: string | undefined, size: number = 800): string {
  if (!imageId || typeof imageId !== 'string') {
    return '/placeholder.svg?height=800&width=800';
  }
  return `https://media.vam.ac.uk/media/thira/collection_images/${imageId.slice(0, 6)}/${imageId}.jpg`;
}


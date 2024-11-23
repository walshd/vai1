"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DetailedArtifact } from "@/utils/api"
import { getImageUrl } from "@/utils/imageUtils"

export function ArtifactDetail({ artifact }: { artifact?: DetailedArtifact }) {
  if (!artifact) {
    return <div className="text-white">Loading...</div>;
  }

  const [selectedImage, setSelectedImage] = useState<string>(artifact.primaryImageId)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            asChild
          >
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Collection
            </Link>
          </Button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-800 relative">
              {imageError ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Image not available
                </div>
              ) : (
                <Image
                  src={getImageUrl(selectedImage)}
                  alt={artifact.title}
                  layout="fill"
                  objectFit="contain"
                  onError={handleImageError}
                />
              )}
            </div>
            {artifact.additionalImageIds && artifact.additionalImageIds.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {[artifact.primaryImageId, ...artifact.additionalImageIds].map((imageId) => (
                  <button
                    key={imageId}
                    onClick={() => {
                      setSelectedImage(imageId)
                      setImageError(false)
                    }}
                    className={`aspect-square overflow-hidden rounded-lg bg-gray-800 relative ${
                      selectedImage === imageId ? 'ring-2 ring-white' : ''
                    }`}
                  >
                    <Image
                      src={getImageUrl(imageId, 200)}
                      alt={`${artifact.title} - view ${imageId}`}
                      layout="fill"
                      objectFit="cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg?height=200&width=200';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-8 pr-6">
              <div>
                <h1 className="text-3xl font-bold">{artifact.title}</h1>
                <p className="mt-2 text-gray-400">{artifact.artistMakerName}</p>
              </div>

              <section>
                <h2 className="text-xl font-semibold">Object Details</h2>
                <Separator className="my-4 bg-gray-800" />
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-400">Accession Number</dt>
                    <dd>{artifact.accessionNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-400">Date</dt>
                    <dd>{artifact.dateText}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-400">Object Type</dt>
                    <dd>{artifact.objectType.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-400">Place of Origin</dt>
                    <dd>{artifact.placeOfOrigin}</dd>
                  </div>
                  {artifact.materials && artifact.materials.length > 0 && (
                    <div>
                      <dt className="text-sm text-gray-400">Materials</dt>
                      <dd className="flex flex-wrap gap-2">
                        {artifact.materials.map((material, index) => (
                          <Badge key={index} variant="secondary">
                            {material}
                          </Badge>
                        ))}
                      </dd>
                    </div>
                  )}
                  {artifact.techniques && artifact.techniques.length > 0 && (
                    <div>
                      <dt className="text-sm text-gray-400">Techniques</dt>
                      <dd className="flex flex-wrap gap-2">
                        {artifact.techniques.map((technique, index) => (
                          <Badge key={index} variant="secondary">
                            {technique}
                          </Badge>
                        ))}
                      </dd>
                    </div>
                  )}
                  {artifact.dimensions && artifact.dimensions.length > 0 && (
                    <div>
                      <dt className="text-sm text-gray-400">Dimensions</dt>
                      <dd>{artifact.dimensions.join(', ')}</dd>
                    </div>
                  )}
                </dl>
              </section>

              {artifact.briefDescription && (
                <section>
                  <h2 className="text-xl font-semibold">Brief Description</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <p className="text-gray-300">{artifact.briefDescription}</p>
                </section>
              )}

              {artifact.physicalDescription && (
                <section>
                  <h2 className="text-xl font-semibold">Physical Description</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <p className="text-gray-300">{artifact.physicalDescription}</p>
                </section>
              )}

              {artifact.galleryLabel && (
                <section>
                  <h2 className="text-xl font-semibold">Gallery Label</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <p className="text-gray-300">{artifact.galleryLabel}</p>
                </section>
              )}

              {artifact.objectHistory && (
                <section>
                  <h2 className="text-xl font-semibold">Object History</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <p className="text-gray-300">{artifact.objectHistory}</p>
                </section>
              )}

              {artifact.historicalContext && (
                <section>
                  <h2 className="text-xl font-semibold">Historical Context</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <p className="text-gray-300">{artifact.historicalContext}</p>
                </section>
              )}

              {artifact.categories && artifact.categories.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold">Categories</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <div className="flex flex-wrap gap-2">
                    {artifact.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {artifact.subjectsDepicted && artifact.subjectsDepicted.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold">Subjects Depicted</h2>
                  <Separator className="my-4 bg-gray-800" />
                  <div className="flex flex-wrap gap-2">
                    {artifact.subjectsDepicted.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}


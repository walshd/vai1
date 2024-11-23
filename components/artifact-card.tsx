import Image from "next/image"
import Link from "next/link"
import { MapPin } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Artifact } from "@/utils/api"
import { getImageUrl } from "@/utils/imageUtils"
import React from 'react';

interface ArtifactCardProps {
  artifact: Artifact;
  isSelected: boolean;
  onSelect: (systemNumber: string) => void;
  isGreyed?: boolean;
}

export function ArtifactCard({ artifact, isSelected, onSelect, isGreyed }: ArtifactCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const imageUrl = getImageUrl(artifact._primaryImageId);

  return (
    <Card 
      className={`group relative overflow-hidden ${isGreyed ? 'bg-gray-300 text-gray-600' : 'bg-black text-white'}`}
    >
      <CardContent className="p-0">
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(artifact.systemNumber)}
            className="bg-white border-gray-400"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <Link href={`/artifact/${artifact.systemNumber}`} className="block">
          <div className="aspect-[4/3] w-full relative">
            {!imageError ? (
              <Image
                src={imageUrl}
                alt={artifact._primaryTitle}
                width={400}
                height={300}
                className={`object-cover w-full h-full ${isGreyed ? 'grayscale' : ''}`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                Image not available
              </div>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="text-xl font-bold leading-tight">
              {artifact._primaryTitle}
            </h3>
            <p className="text-sm mt-1">
              {artifact._primaryDate}
            </p>
            <p className="text-base">
              Maker: {typeof artifact._primaryMaker === 'string' 
                ? artifact._primaryMaker 
                : artifact._primaryMaker?.name || 'Unknown maker'}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{artifact.location}</span>
            </div>
            {artifact.onDisplay && (
              <Badge variant="secondary" className={isGreyed ? "bg-gray-400" : "bg-white/10"}>
                On display
              </Badge>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}


"use client";

import { useMemo, useState } from "react";

export function useGallery(mainImageUrl?: string, fallback: string = "/default-image.jpg") {
    const initial = useMemo(() => (typeof mainImageUrl === "string" && mainImageUrl) ? mainImageUrl : fallback, [mainImageUrl, fallback]);
    const [selectedImage, setSelectedImage] = useState<string>(initial);
    return { selectedImage, setSelectedImage };
}



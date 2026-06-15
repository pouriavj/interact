import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://interactapp.ir",
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "weekly",
    },
  ];
}
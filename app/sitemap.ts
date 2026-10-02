import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getProperties } from "@/lib/services/properties";
import { getStories } from "@/lib/services/stories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const [properties, stories] = await Promise.all([
    getProperties(),
    getStories(),
  ]);

  const propertyUrls = properties.map((prop) => ({
    url: `${baseUrl}/property/${prop.slug}`,
    lastModified: new Date(prop.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const storyUrls = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: new Date(story.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...propertyUrls,
    ...storyUrls,
  ];
}

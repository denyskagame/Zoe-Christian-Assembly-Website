import type { MetadataRoute } from "next";

const ROUTES = [
  "/",
  "/about",
  "/about/our-story",
  "/about/what-we-believe",
  "/about/our-staff",
  "/beliefs",
  "/ministries",
  "/sermons",
  "/events",
  "/contact",
  "/donate",
  "/give",
  "/kids",
  "/youth",
  "/connect",
  "/prayer-request",
  "/share-testimony",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://zoechristian.ca";
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    // Homepage gets higher priority; everything else default.
    priority: path === "/" ? 1.0 : 0.7,
    changeFrequency: "weekly" as const,
  }));
}

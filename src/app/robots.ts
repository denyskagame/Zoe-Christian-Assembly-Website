import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://zoechristian.ca";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Studio is the admin panel — no need for search engines to index it.
        disallow: ["/studio/", "/studio"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

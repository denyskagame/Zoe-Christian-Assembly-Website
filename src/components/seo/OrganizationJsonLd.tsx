import type { SanitySiteSettings } from "@/sanity/types";

interface OrganizationJsonLdProps {
  settings: SanitySiteSettings | null;
  siteUrl: string;
}

/**
 * Emits a `<script type="application/ld+json">` describing the church as an
 * Organization for Google Knowledge Graph + rich results. Mounted on the
 * homepage and the contact page (per Feature 03 spec).
 */
export function OrganizationJsonLd({ settings, siteUrl }: OrganizationJsonLdProps) {
  const name = settings?.churchName ?? "Zoe Christian Assembly";
  const address = settings?.address;
  const phone = settings?.phone;
  const email = settings?.email;
  const socialUrls = (settings?.socialLinks ?? []).map((s) => s.url).filter(Boolean);

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Church",
    name,
    url: siteUrl,
  };

  if (address?.street) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.province,
      postalCode: address.postalCode,
      addressCountry: address.country ?? "Canada",
    };
  }
  if (phone) jsonLd.telephone = phone;
  if (email) jsonLd.email = email;
  if (socialUrls.length > 0) jsonLd.sameAs = socialUrls;

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is deterministic and HTML-escaped at script-tag
      // boundaries, but `</script>` inside string content can break us. We
      // protect against it by escaping the closing slash.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/<\//g, "<\\/"),
      }}
    />
  );
}

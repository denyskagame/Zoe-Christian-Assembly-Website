import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-zoe-navy mt-12 mb-6 font-serif text-4xl font-bold tracking-tight md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-zoe-navy mt-10 mb-4 font-serif text-3xl font-bold tracking-tight md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-zoe-navy mt-8 mb-3 font-serif text-2xl font-bold md:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-zoe-navy mt-6 mb-2 text-xl font-bold md:text-2xl">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-zoe-bronze text-zoe-navy/80 my-8 border-l-4 pl-6 text-lg italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-gray-700 md:text-lg">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-6 list-disc space-y-2 text-base leading-relaxed text-gray-700 md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-6 list-decimal space-y-2 text-base leading-relaxed text-gray-700 md:text-lg">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-zoe-navy font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zoe-bronze hover:text-zoe-navy underline underline-offset-4 transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-zoe-bronze hover:text-zoe-navy underline underline-offset-4 transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1600).url();
      const alt = (value.alt as string | undefined) ?? "";
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={alt}
            width={1600}
            height={1000}
            className="h-auto w-full rounded-2xl"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {alt && (
            <figcaption className="mt-2 text-center text-sm text-gray-500 italic">{alt}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] | undefined }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}

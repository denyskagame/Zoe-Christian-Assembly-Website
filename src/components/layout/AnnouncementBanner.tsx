"use client";

import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import type { SanityAnnouncement } from "@/sanity/types";

const DISMISSED_KEY_PREFIX = "zoe-announce-dismissed:";
const SERVER_SNAPSHOT = "__server__";

// External-store plumbing — lets `useSyncExternalStore` subscribe to manual
// notifications when the user dismisses a banner. Reading localStorage in a
// `useEffect` + `setState` would trip react-hooks/set-state-in-effect and lead
// to hydration mismatches; this is the React-recommended pattern instead.
const subscribers = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function notifyAll() {
  subscribers.forEach((cb) => cb());
}

function getSnapshot(): string {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  const ids: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key?.startsWith(DISMISSED_KEY_PREFIX)) {
      ids.push(key.slice(DISMISSED_KEY_PREFIX.length));
    }
  }
  return ids.sort().join(",");
}

function getServerSnapshot(): string {
  return SERVER_SNAPSHOT;
}

interface AnnouncementBannerProps {
  announcements: SanityAnnouncement[];
}

/**
 * Top-of-page banner showing the most recent active announcement. Each
 * announcement is independently dismissible — dismissal is keyed by `_id` and
 * persisted to localStorage, so the user only sees each announcement once.
 *
 * Renders nothing during SSR (we don't know the user's dismissal state yet);
 * hydration-safe via `useSyncExternalStore` with a distinct server snapshot.
 */
export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (snapshot === SERVER_SNAPSHOT) return null;
  if (!announcements || announcements.length === 0) return null;

  const dismissed = new Set(snapshot ? snapshot.split(",").filter(Boolean) : []);
  const announcement = announcements.find((a) => !dismissed.has(a._id));
  if (!announcement) return null;

  const handleDismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY_PREFIX + announcement._id, "1");
    notifyAll();
  };

  return (
    <div role="region" aria-label="Announcement" className="bg-zoe-bronze relative z-50 text-white">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2 sm:items-center sm:px-6 lg:px-8">
        <div className="flex-1 text-sm leading-snug">
          <span className="font-semibold">{announcement.title}</span>
          {announcement.body && <span className="ml-2 text-white/90">— {announcement.body}</span>}
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="hover:bg-zoe-navy/30 -mr-2 flex-shrink-0 rounded p-1 transition-colors focus:ring-2 focus:ring-white focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

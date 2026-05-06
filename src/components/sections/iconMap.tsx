import {
  BookOpen,
  Users,
  Globe,
  Heart,
  Cross,
  Bird,
  MessagesSquare,
  HandHelping,
  type LucideIcon,
} from "lucide-react";
import type { WelcomeValueIcon, RequestCardIcon } from "@/sanity/types";

const VALUE_ICONS: Record<WelcomeValueIcon, LucideIcon> = {
  book: BookOpen,
  users: Users,
  globe: Globe,
  heart: Heart,
  cross: Cross,
  // lucide-react does not ship a "dove" — Bird is the closest visual stand-in.
  dove: Bird,
};

const REQUEST_ICONS: Record<RequestCardIcon, LucideIcon> = {
  users: Users,
  // No "praying-hands" in lucide-react; HandHelping reads as the closest gesture.
  "praying-hands": HandHelping,
  chat: MessagesSquare,
  heart: Heart,
  book: BookOpen,
};

export function getValueIcon(name: WelcomeValueIcon | undefined): LucideIcon {
  return name ? (VALUE_ICONS[name] ?? BookOpen) : BookOpen;
}

export function getRequestIcon(name: RequestCardIcon | undefined): LucideIcon {
  return name ? (REQUEST_ICONS[name] ?? Users) : Users;
}

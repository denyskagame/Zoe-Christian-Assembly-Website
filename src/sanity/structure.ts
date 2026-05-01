import type { StructureResolver } from "sanity/structure";
import {
  HomeIcon,
  CogIcon,
  PlayIcon,
  CalendarIcon,
  BellIcon,
  HeartIcon,
  TagIcon,
  DocumentsIcon,
} from "@sanity/icons";

import StudioLanding from "./components/StudioLanding";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Welcome")
        .id("welcome")
        .icon(HomeIcon)
        .child(S.component(StudioLanding).title("Welcome").id("welcome")),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Site Settings")
        ),

      S.divider(),

      S.documentTypeListItem("sermon").title("Sermons").icon(PlayIcon),
      S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
      S.documentTypeListItem("announcement").title("Announcements").icon(BellIcon),
      S.documentTypeListItem("campaign").title("Giving Campaigns").icon(HeartIcon),
      S.documentTypeListItem("givingCategory").title("Giving Categories").icon(TagIcon),
      S.documentTypeListItem("page").title("Pages").icon(DocumentsIcon),
    ]);

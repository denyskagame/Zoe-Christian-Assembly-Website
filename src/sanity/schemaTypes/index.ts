import { type SchemaTypeDefinition } from "sanity";

import sermon from "./sermon";
import event from "./event";
import announcement from "./announcement";
import page from "./page";
import campaign from "./campaign";
import givingCategory from "./givingCategory";
import siteSettings from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, sermon, event, announcement, campaign, givingCategory, page],
};

import { type SchemaTypeDefinition } from "sanity";
import sermon from "./sermon";
import event from "./event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [sermon, event],
};

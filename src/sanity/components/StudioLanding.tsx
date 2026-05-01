import { Card, Stack, Text, Heading, Grid, Container, Box } from "@sanity/ui";
import { ComposeIcon, CalendarIcon, PlayIcon, BellIcon } from "@sanity/icons";
import type { ComponentType } from "react";
import { IntentLink } from "sanity/router";

interface QuickAction {
  title: string;
  description: string;
  icon: ComponentType;
  intent: "create" | "edit";
  params: Record<string, string>;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    title: "Add a sermon",
    description: "Post a new sermon, podcast, or teaching from YouTube.",
    icon: ComposeIcon,
    intent: "create",
    params: { type: "sermon", template: "sermon" },
  },
  {
    title: "Create an event",
    description: "Schedule a special service, prayer night, or youth event.",
    icon: CalendarIcon,
    intent: "create",
    params: { type: "event", template: "event" },
  },
  {
    title: "Update this Sunday's livestream",
    description: "Change the YouTube video ID on the live page.",
    icon: PlayIcon,
    intent: "edit",
    params: { id: "siteSettings", type: "siteSettings" },
  },
  {
    title: "Post an announcement",
    description: "Add a short notice that visitors see across the site.",
    icon: BellIcon,
    intent: "create",
    params: { type: "announcement", template: "announcement" },
  },
];

export function StudioLanding() {
  return (
    <Card height="fill" overflow="auto" tone="transparent">
      <Container width={2}>
        <Box padding={[3, 4, 5]}>
          <Stack space={5}>
            <Stack space={3}>
              <Heading as="h1" size={3}>
                Welcome to Zoe Studio
              </Heading>
              <Text muted>
                This is the church admin panel. Pick a quick action below, or use the sidebar to
                browse all content.
              </Text>
            </Stack>

            <Grid columns={[1, 1, 2]} gap={3}>
              {QUICK_ACTIONS.map((action) => (
                <IntentLink
                  key={action.title}
                  intent={action.intent}
                  params={action.params}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    padding={4}
                    radius={3}
                    shadow={1}
                    tone="default"
                    style={{ height: "100%", cursor: "pointer" }}
                  >
                    <Stack space={3}>
                      <Text size={3}>
                        <action.icon />
                      </Text>
                      <Stack space={2}>
                        <Heading as="h2" size={1}>
                          {action.title}
                        </Heading>
                        <Text size={1} muted>
                          {action.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Card>
                </IntentLink>
              ))}
            </Grid>
          </Stack>
        </Box>
      </Container>
    </Card>
  );
}

export default StudioLanding;

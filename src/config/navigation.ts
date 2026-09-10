export type PageStatus =
  "implemented" | "draft" | "experimental" | "conceptual" | "planned";

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  status: PageStatus;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: "Start here",
    items: [
      {
        id: "concept",
        label: "What is BYOAg?",
        href: "/concept",
        status: "draft",
      },
      {
        id: "how-it-works",
        label: "How it works",
        href: "/how-it-works",
        status: "draft",
      },
    ],
  },
  {
    label: "Understand",
    items: [
      {
        id: "architecture",
        label: "Architecture",
        href: "/architecture",
        status: "draft",
      },
      {
        id: "relationships",
        label: "Relationships",
        href: "/relationships",
        status: "draft",
      },
      {
        id: "trust",
        label: "Trust and security",
        href: "/trust",
        status: "draft",
      },
    ],
  },
  {
    label: "Protocol 0.1",
    items: [
      {
        id: "spec",
        label: "Protocol overview",
        href: "/spec",
        status: "draft",
      },
      {
        id: "connection",
        label: "Discovery and pairing",
        href: "/protocol/connection",
        status: "implemented",
      },
      {
        id: "engagements",
        label: "Registrations and engagements",
        href: "/protocol/engagements",
        status: "draft",
      },
      {
        id: "capabilities",
        label: "Permissions and capabilities",
        href: "/protocol/capabilities",
        status: "draft",
      },
      {
        id: "tools-and-skills",
        label: "MCP tools and skills",
        href: "/protocol/tools-and-skills",
        status: "draft",
      },
      {
        id: "teardown",
        label: "Revocation and teardown",
        href: "/protocol/teardown",
        status: "draft",
      },
    ],
  },
  {
    label: "Build",
    items: [
      {
        id: "plugin",
        label: "Agent Plugin",
        href: "/build/agent-plugin",
        status: "experimental",
      },
      {
        id: "platforms",
        label: "Platform implementation",
        href: "/build/platform",
        status: "draft",
      },
      {
        id: "conformance",
        label: "Schemas and conformance",
        href: "/build/conformance",
        status: "implemented",
      },
    ],
  },
  {
    label: "Explore",
    items: [
      {
        id: "patterns",
        label: "Experience patterns",
        href: "/patterns",
        status: "experimental",
      },
      {
        id: "examples",
        label: "Examples",
        href: "/examples",
        status: "conceptual",
      },
      { id: "glossary", label: "Glossary", href: "/glossary", status: "draft" },
      {
        id: "about",
        label: "Roadmap and project",
        href: "/about",
        status: "draft",
      },
    ],
  },
];

export const availableNavigationItems = navigationGroups.flatMap((group) =>
  group.items.filter((item): item is NavigationItem & { href: string } =>
    Boolean(item.href),
  ),
);

export function findNavigationItem(pageId: string): NavigationItem | undefined {
  return navigationGroups
    .flatMap((group) => group.items)
    .find((item) => item.id === pageId);
}

export function findNavigationGroup(
  pageId: string,
): NavigationGroup | undefined {
  return navigationGroups.find((group) =>
    group.items.some((item) => item.id === pageId),
  );
}

# Agent.md - Project Context & Guidelines

## Project Overview

**amiearth.com** - Personal blog and portfolio for Earth, a software developer from Chiang Rai, Thailand.

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

---

## Design System Reference

### Colors (Tailwind Config)
```javascript
colors: {
  bg: '#F7F5F0',
  'bg-secondary': '#EDEAE3',
  surface: '#FFFFFF',
  'text-primary': '#1A1714',
  'text-secondary': '#6B6560',
  'text-muted': '#A09A94',
  accent: '#2D5016',
  'accent-soft': '#E8F0E1',
  border: '#E2DDD7',
  'code-bg': '#1E1E1B',
}
```

### Typography
- **Headings**: font-['Playfair_Display'] (serif)
- **Body**: font-['Literata'] (serif)
- **Code**: font-mono

### Spacing
Use the spacing scale:
- xs: 4px (1)
- sm: 8px (2)
- md: 16px (4)
- lg: 24px (6)
- xl: 40px (10)
- 2xl: 64px (16)
- 3xl: 96px (24)

---

## Project Structure

```
app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
├── blog/
│   ├── page.tsx          # Blog list
│   └── [slug]/
│       └── page.tsx      # Blog post
├── projects/
│   └── page.tsx          # Projects page
├── about/
│   └── page.tsx          # About page
├── components/
│   ├── Nav.tsx           # Navigation
│   ├── Footer.tsx        # Footer
│   ├── PostCard.tsx      # Blog post card
│   ├── ProjectCard.tsx   # Project card
│   ├── CodeBlock.tsx     # Code block
│   └── ...
├── lib/
│   └── utils.ts          # Utilities
└── types/
    └── index.ts          # TypeScript types

design/
├── amiearth.com.pen      # Design file
└── images/
    └── image-1.png       # Logo asset

public/
└── ...                   # Static assets
```

---

## Coding Standards

### General
- Use **TypeScript** for all files
- Use **functional components** with explicit return types
- Prefer **named exports** for components
- Keep components **small and focused**

### Imports
- Keep imports at the **top of the file**
- Avoid inline/conditional imports
- Order: React → Next.js → Third-party → Local → Relative

### Styling
- Use **Tailwind CSS** for all styling
- Use **design tokens** from PRD (never hardcode colors)
- Prefer `className` utility (e.g., `cn()` from `clsx` + `tailwind-merge`)
- Use responsive prefixes: `md:`, `lg:`, `xl:`

### Components
```tsx
// Good
export function Nav(): JSX.Element {
  return (
    <nav className="h-16 border-b border-border">
      {/* ... */}
    </nav>
  );
}

// Avoid
const Nav = () => {  // Missing return type
  // ...
}
```

### File Naming
- Components: PascalCase (e.g., `Nav.tsx`, `PostCard.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: Next.js conventions (e.g., `page.tsx`, `layout.tsx`)

---

## Design-to-Code Workflow

1. Reference `design/amiearth.com.pen` for exact specs
2. Use Pencil MCP tools to inspect design details
3. Map design tokens to Tailwind classes
4. Build components in `app/components/`
5. Test responsive behavior

---

## Preferences

### Do
- Keep code simple and readable
- Use semantic HTML elements
- Add `alt` text for images
- Use proper heading hierarchy (h1 → h2 → h3)
- Optimize for accessibility (a11y)

### Don't
- Use inline styles
- Hardcode colors or spacing
- Create overly complex components
- Use `any` type in TypeScript
- Ignore mobile responsiveness

---

## Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm type-check
```

---

## Notes

- Earth is a Go/TypeScript backend developer
- Blog focuses on technical topics (performance, Go, TypeScript)
- Design is intentionally minimal and content-focused
- Warm, earthy aesthetic reflects the Chiang Rai location

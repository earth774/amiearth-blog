# Product Requirements Document (PRD)

## amiearth.com - Personal Blog & Portfolio

---

## 1. Overview

A personal blog and portfolio website for Earth, a software developer from Chiang Rai, Thailand. The site features a clean, minimalist design with warm, earthy tones and serif typography.

**Tech Stack**: Next.js + TypeScript + Tailwind CSS

---

## 2. Pages

### 2.1 Home `/`
- Hero section with welcome message
- Clean navigation
- Simple footer with copyright and social links

### 2.2 Blog List `/blog`
- List of blog posts
- Filter/sort functionality
- Post previews with titles and metadata

### 2.3 Blog Post `/blog/slug`
- Full article content
- Code blocks with syntax highlighting
- Drop-cap paragraphs
- Previous/next post navigation
- Author information

### 2.4 Projects `/project`
- Grid of project cards
- Project descriptions and links

### 2.5 About `/about`
- Personal photo with caption
- Biography sections
- Experience timeline
- Skills list
- Contact information (email, social links)

---

## 3. Design System

### 3.1 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `$bg` | `#F7F5F0` | Page background |
| `$bg-secondary` | `#EDEAE3` | Secondary backgrounds |
| `$surface` | `#FFFFFF` | Cards, elevated surfaces |
| `$text-primary` | `#1A1714` | Headings, primary text |
| `$text-secondary` | `#6B6560` | Body text, descriptions |
| `$text-muted` | `#A09A94` | Captions, hints, footer text |
| `$accent` | `#2D5016` | Links, highlights, CTAs |
| `$accent-soft` | `#E8F0E1` | Soft accent backgrounds |
| `$border` | `#E2DDD7` | Dividers, borders |
| `$code-bg` | `#1E1E1B` | Code block backgrounds |

### 3.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Logo | Playfair Display | 700 italic | 22px |
| H1 | Playfair Display | 700 | 42px |
| H2 | Playfair Display | 600 | 26px |
| Post Title | Playfair Display | 700 | 40px |
| Section Title | Playfair Display | 600 | 26px |
| Body | Literata | normal | 15-17px |
| Nav Links | Literata | normal | 15px |
| Caption | Literata | normal italic | 13px |
| Footer | Literata | normal | 13px |

**Line Heights**:
- Body text: 1.7-1.8
- Headings: 1.25

### 3.3 Spacing Scale

| Token | Value |
|-------|-------|
| `$spacing-xs` | 4px |
| `$spacing-sm` | 8px |
| `$spacing-md` | 16px |
| `$spacing-lg` | 24px |
| `$spacing-xl` | 40px |
| `$spacing-2xl` | 64px |
| `$spacing-3xl` | 96px |

### 3.4 Layout

- **Max width**: 1440px
- **Content max width**: 680px (reading area)
- **Nav/Footer padding**: 48px horizontal
- **Content padding**: 64px vertical, 360px horizontal (centered)

---

## 4. Components

### 4.1 Navigation (Nav)
- Height: 64px
- Layout: horizontal flex, space-between
- Left: Logo (text + icon)
- Right: Nav links (Blog, Projects, About)
- Border: 1px bottom border

### 4.2 Footer
- Height: 64px
- Layout: horizontal flex, space-between
- Left: Copyright text
- Right: Social links (RSS, Twitter, GitHub)
- Border: 1px top border

### 4.3 Project Card
- Grid layout
- Title and description
- Link to project

### 4.4 Blog Post Card
- Title
- Date/metadata
- Preview text
- Link to full post

### 4.5 Code Block
- Dark background (`$code-bg`)
- Monospace font
- Padding: 20px 24px
- Syntax highlighting

### 4.6 Timeline (About page)
- Vertical list
- Year markers
- Role/company information

### 4.7 Skill Tags
- Soft accent background
- Rounded corners
- Horizontal or vertical list

---

## 5. Responsive Breakpoints

- Desktop: 1440px (full layout)
- Tablet: ~1024px (reduced padding)
- Mobile: ~768px (stacked layout, hamburger menu)

---

## 6. Assets

### 6.1 Images
Location: `/design/images/`
- Logo image: `image-1.png`

### 6.2 Fonts
- Playfair Display (Google Fonts)
- Literata (Google Fonts)

---

## 7. Content

### 7.1 Personal Info
- Name: Earth
- Location: Chiang Rai, Thailand
- Role: Software Developer
- Experience: 6 years
- Technologies: Go, TypeScript

### 7.2 Social Links
- Email
- GitHub
- Twitter
- RSS

---

## 8. Features (Future)

- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Tag-based filtering
- [ ] Newsletter signup
- [ ] Comments (optional)

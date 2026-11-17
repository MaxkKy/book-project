# Graph Report - my-app  (2026-11-12)

## Corpus Check
- Corpus is ~5,951 words - fits in a single context window. You may not need a graph.

## Summary
- 231 nodes · 352 edges · 17 communities (11 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 104,977 input · 0 output

## Community Hubs (Navigation)
- Dev Tooling & Types
- Server Auth, Errors & Prisma
- Auth & Category UI
- Docker Postgres Stack
- Runtime Dependencies
- TypeScript Config
- Root Layout & Providers
- Book Form Management
- Next.js Docs & Agent Rules
- Main Feed & Book Posting
- npm Scripts
- Framework Logos
- File Icon
- Globe Icon
- No-Image Placeholder
- Window Icon

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useApiError()` - 12 edges
3. `useBookForm()` - 12 edges
4. `AppError` - 10 edges
5. `Main()` - 7 edges
6. `postgres` - 7 edges
7. `pgadmin` - 7 edges
8. `next` - 7 edges
9. `react` - 7 edges
10. `apiClinet` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Page()` --calls--> `Login()`  [EXTRACTED]
  app/(auth)/login/page.tsx → component/login/page.tsx
- `page()` --calls--> `Register()`  [EXTRACTED]
  app/(auth)/register/page.tsx → component/register/page.tsx
- `page()` --calls--> `Book()`  [EXTRACTED]
  app/(main)/book/page.tsx → component/book/page.tsx
- `page()` --calls--> `Main()`  [EXTRACTED]
  app/(main)/post/page.tsx → component/main/page.tsx
- `Book()` --calls--> `onDelete()`  [EXTRACTED]
  component/book/page.tsx → hooks/useBookform.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Next.js development workflow** — readme_dev_server, app_page, agents_generate_agent_files [INFERRED 0.75]
- **Next.js starter icon set** — public_file_icon, public_globe_icon, public_window_icon, public_next_logo, public_vercel_logo [INFERRED 0.85]

## Communities (17 total, 6 thin omitted)

### Community 0 - "Dev Tooling & Types"
Cohesion: 0.08
Nodes (35): eslintConfig, devDependencies, babel-plugin-react-compiler@1.0.0, eslint@^9, eslint-config-next@16.4.2, prisma@^7.10.1, tailwindcss@^4, @tailwindcss/turbopack@^4 (+27 more)

### Community 1 - "Server Auth, Errors & Prisma"
Cohesion: 0.08
Nodes (25): AppError, adapter, prisma, authExpress, handleAuth(), handleError(), storage, upload (+17 more)

### Community 2 - "Auth & Category UI"
Cohesion: 0.16
Nodes (13): Page(), page(), Category(), Login(), Register(), ERROR_MESSAGES, useApiError(), BookType (+5 more)

### Community 3 - "Docker Postgres Stack"
Cohesion: 0.08
Nodes (23): PGADMIN_DEFAULT_EMAIL, PGADMIN_DEFAULT_PASSWORD, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, container_name, depends_on, environment (+15 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, axios@^1.20.0, cloudinary@^2.11.0, cookie-parser@^1.4.7, cors@^2.8.6, multer@^2.5.0, multer-storage-cloudinary@^4.0.0, nodemon@^3.1.14 (+13 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "Root Layout & Providers"
Cohesion: 0.14
Nodes (12): geistMono, geistSans, metadata, RootLayout(), ToastProvider(), nextConfig, next@16.4.2, @radix-ui/themes@^3.3.0 (+4 more)

### Community 7 - "Book Form Management"
Cohesion: 0.22
Nodes (10): page(), Book(), useBookForm(), Complete(), fetchCategory(), onCategory(), onDelete(), onSubmit() (+2 more)

### Community 8 - "Next.js Docs & Agent Rules"
Cohesion: 0.18
Nodes (8): generate-agent-files.js, node_modules/next/dist/docs, Next.js Agent Rules, create-next-app, Development Server (npm run dev), next/font with Geist, Next.js, Vercel Platform Deployment

### Community 9 - "Main Feed & Book Posting"
Cohesion: 0.25
Nodes (6): page(), bookType, Main(), getImage(), react-number-format@^5.4.5, react-number-format

### Community 10 - "npm Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **10 isolated node(s):** `node_modules/next/dist/docs`, `create-next-app`, `next/font with Geist`, `Vercel Platform Deployment`, `File Document Icon` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 80 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Root Layout & Providers` to `Next.js Docs & Agent Rules`, `Dev Tooling & Types`, `Auth & Category UI`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `useBookForm()` (e.g. with `CancelClick()` and `CancelImageClick()`) actually correct?**
  _`useBookForm()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `node_modules/next/dist/docs`, `create-next-app`, `next/font with Geist` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dev Tooling & Types` be split into smaller, more focused modules?**
  _Cohesion score 0.07539118065433854 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Runtime Dependencies` to `Dev Tooling & Types`, `Server Auth, Errors & Prisma`, `Auth & Category UI`, `Root Layout & Providers`, `Main Feed & Book Posting`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Should `Server Auth, Errors & Prisma` be split into smaller, more focused modules?**
  _Cohesion score 0.07965860597439545 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Auth & Category UI` to `Dev Tooling & Types`, `Main Feed & Book Posting`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
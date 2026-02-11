# WebCraft Studio - Website Builder SaaS

A production-ready full-stack SaaS application for building websites with a drag-and-drop visual editor. Built with Next.js, TypeScript, Prisma, and modern web technologies.

## 🚀 Live Demo
- **Main App:** http://localhost:3000  
- **Portfolio:** http://localhost:8080/portfolio.html

## ✨ Features

- **Visual Editor**: Drag-and-drop block-based website builder
- **Multi-tenant**: Secure user isolation and project management
- **10 Block Types**: Navbar, Hero, Features, Gallery, Testimonials, FAQ, Pricing, Contact, Logos, Footer
- **7 Theme Presets**: Default, Dark, Minimal, Vibrant, Elegant, Modern, Warm
- **4 Templates**: Agency, Portfolio, Restaurant, SaaS Landing
- **Responsive Design**: Mobile-first approach with responsive previews
- **SEO Optimized**: Meta tags, Open Graph, and clean HTML output
- **Publishing System**: One-click publish/unpublish with versioning
- **Export Functionality**: Download static HTML/CSS/JS files
- **Form Handling**: Contact forms with submission management
- **Asset Management**: Image upload and media library
- **Authentication**: Email/password and OAuth (Google, GitHub)
- **Animations**: Text animations with reduced motion support

## 🚀 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI + shadcn/ui
- **Drag & Drop**: dnd-kit
- **Validation**: Zod (client & server)
- **Styling**: Tailwind CSS with CSS variables for theming

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sitecraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sitecraft"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed with demo data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - App: http://localhost:3000
   - Demo site: http://localhost:3000/site/demo-agency
   - Demo login: demo@sitecraft.com / demo123

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── editor/            # Visual editor
│   └── site/              # Published sites
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── dashboard/         # Dashboard components
│   ├── editor/            # Editor components
│   └── renderer/          # Published site renderers
├── lib/                   # Utilities and configurations
│   ├── types/             # TypeScript types and Zod schemas
│   └── templates/         # Website templates
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

## 🎨 Adding New Block Types

1. **Define the block schema** in `lib/types/blocks.ts`:
   ```typescript
   export const myBlockPropsSchema = z.object({
     title: z.string().default('My Block'),
     // ... other props
   })
   ```

2. **Add to the discriminated union**:
   ```typescript
   export const blockSchema = z.discriminatedUnion('type', [
     // ... existing blocks
     z.object({
       type: z.literal('myblock'),
       props: myBlockPropsSchema,
       // ...
     }),
   ])
   ```

3. **Create editor component** in `components/editor/blocks/`:
   ```typescript
   export function MyBlockBlock({ block }: MyBlockBlockProps) {
     // Editor rendering logic
   }
   ```

4. **Create published component** in `components/renderer/blocks/`:
   ```typescript
   export function PublishedMyBlockBlock({ block, theme }: Props) {
     // Published site rendering logic
   }
   ```

5. **Add to renderers**:
   - Update `components/editor/block-renderer.tsx`
   - Update `components/renderer/published-block-renderer.tsx`

6. **Add to sidebar** in `components/editor/editor-sidebar.tsx`

## 🎭 Theme System

Themes are defined in `lib/types/theme.ts` with the following structure:

```typescript
interface ThemeTokens {
  colors: {
    primary: string
    secondary: string
    background: string
    // ... more colors
  }
  typography: {
    fontFamily: string
    baseSize: number
    headingScale: number
  }
  radius: { sm: number; md: number; lg: number }
  shadow: { sm: string; md: string; lg: string }
  // ... more tokens
}
```

Add new themes to the `themePresets` object.

## 📝 Templates

Templates are JSON configurations in `lib/templates/index.ts`. Each template includes:

- Theme tokens
- Page structure
- Block configurations
- Content placeholders

## 🔒 Security Features

- **Authentication**: Secure user sessions with NextAuth.js
- **Authorization**: Row-level security with user isolation
- **Input Validation**: Zod schemas on client and server
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Rate Limiting**: Configurable rate limits for forms and API

## 📊 Database Schema

Key entities:
- **User**: Authentication and user data
- **Project**: Website projects with slug-based routing
- **Page**: Individual pages within projects
- **Block**: Content blocks with type-safe props
- **Theme**: Project-specific theme configurations
- **Asset**: File uploads and media management
- **FormSubmission**: Contact form submissions
- **PublishSnapshot**: Versioned published states

## 🚀 Deployment

1. **Database**: Set up PostgreSQL (Supabase, Railway, etc.)
2. **Environment**: Configure production environment variables
3. **Build**: `npm run build`
4. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## 📚 API Reference

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Publishing
- `POST /api/projects/[id]/publish` - Publish project
- `POST /api/projects/[id]/unpublish` - Unpublish project
- `POST /api/projects/[id]/export` - Export static files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Join our community discussions

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
# Canva Clone - Graphic Design Editor

A full-featured graphic design editor built with Next.js and Fabric.js, inspired by Canva. Create, edit, and design graphics with an intuitive drag-and-drop interface.

## Features

- **Canvas Editor**: Powerful fabric.js-based canvas with full object manipulation
- **Shape Tools**: Add rectangles, circles, triangles, polygons, and custom shapes
- **Text Editor**: Rich text editing with multiple fonts, sizes, styles, and alignment options
- **Image Upload**: Upload and manage images with AWS S3 integration
- **Layer Management**: Drag-and-drop layer reordering with visual hierarchy
- **Multi-page Support**: Create and manage multiple pages within a single project
- **Styling Controls**: 
  - Fill colors with color picker
  - Stroke colors, widths, and patterns (solid, dashed, dotted)
  - Font customization (family, size, weight, style)
  - Text decorations (underline, strikethrough)
- **Object Positioning**: Bring forward, send backward, and alignment tools
- **History Management**: Undo/redo functionality
- **Authentication**: Secure user authentication with Clerk
- **Database**: PostgreSQL with Drizzle ORM for data persistence

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Canvas Library**: Fabric.js 5.3
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Clerk
- **Database**: PostgreSQL (Neon) + Drizzle ORM
- **Storage**: AWS S3
- **State Management**: Zustand
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- AWS S3 bucket
- Clerk account

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AWS S3
S3_BUCKET=your_s3_bucket_name
S3_BUCKET_REGION=your_s3_region
S3_ACCESS_KEY=your_aws_access_key
S3_SECRET_ACCESS_KEY=your_aws_secret_key
NEXT_PUBLIC_S3_BUCKET=your_s3_bucket_name
NEXT_PUBLIC_S3_BUCKET_REGION=your_s3_region
```

## Installation

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   ├── api/             # API routes and server actions
│   │   ├── db/              # Database schema and utilities
│   │   └── editor/          # Editor page routes
│   ├── components/
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── features/
│   │   └── editor/
│   │       ├── canvasSelector/  # Page selection
│   │       ├── components/      # Core editor components
│   │       ├── header/          # Editor header
│   │       ├── hooks/           # Custom React hooks
│   │       ├── sidebar/         # Sidebar tools and menus
│   │       ├── stores/          # Zustand state management
│   │       └── toolbar/         # Top toolbar components
│   ├── lib/                 # Utility functions
│   └── utils/               # Helper utilities
├── migrations/              # Database migrations
└── public/                  # Static assets
```

## Key Components

### Editor
The main canvas editor component that initializes Fabric.js and manages the editing workspace.

### Sidebar
Tool palette with access to:
- Templates
- Shapes
- Text tools
- Image upload

### Toolbar
Context-sensitive toolbar showing relevant controls for selected objects:
- Color pickers
- Font controls
- Alignment tools
- Layer ordering

### Hooks
Custom hooks for editor functionality:
- `useEditor`: Core editor logic and canvas operations
- `useAutoResize`: Responsive canvas sizing
- `useKeyPress`: Keyboard shortcuts
- `useObjectEvents`: Canvas object event handling

## Database Schema

### Media Table
Stores uploaded media files with user associations:
- `id`: Primary key
- `user_id`: User identifier from Clerk
- `fileName`: Unique filename in S3

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Features in Detail

### Canvas Operations
- Add and manipulate shapes (rectangles, circles, triangles, polygons)
- Add and style text with rich formatting options
- Upload and position images
- Group and ungroup objects
- Copy, paste, and duplicate objects
- Delete selected objects

### Styling
- Fill colors with hex/RGB color picker
- Stroke customization (color, width, pattern)
- Font family selection
- Font size adjustment
- Text alignment (left, center, right)
- Font weight and style
- Text decorations

### Layer Management
- Visual layer panel with drag-and-drop reordering
- Bring to front / send to back
- Bring forward / send backward

### Multi-page Projects
- Create multiple pages in a single project
- Navigate between pages
- Page thumbnails for quick preview

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is for educational purposes.

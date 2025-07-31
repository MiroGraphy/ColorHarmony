# Resume and Cover Letter Generator Application

## Overview

This is a comprehensive multilingual resume and cover letter generator web application that creates professional documents using AI. The application features a multi-step form interface with full internationalization support, allowing users to input their information in their preferred language and generate culturally appropriate documents using OpenAI's GPT-4o with language-specific prompts and cultural context.

## User Preferences

Preferred communication style: Simple, everyday language.
Color scheme: Burgundy red, gold, and white as per user request ("Gebruik bordeaux rood, goud en wit").

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state, local React state for form data
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom burgundy red, gold, and white color scheme
- **Form Handling**: React Hook Form with Zod schema validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with structured endpoints
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **AI Integration**: OpenAI GPT-4o for document generation

### Development Setup
- **Monorepo Structure**: Single repository with client, server, and shared code
- **Hot Reloading**: Vite dev server integrated with Express in development
- **Type Safety**: Shared TypeScript schemas between frontend and backend

## Key Components

### Frontend Components
1. **Multi-Step Form Wizard**
   - BasicInfoForm: Personal details and contact information
   - ExperienceForm: Work history with dynamic add/remove functionality
   - EducationForm: Educational background management
   - SkillsForm: Technical, soft skills, and motivation (for cover letters)
   - ReviewForm: Final review and document generation

2. **Document Preview**: Live preview of the document as users fill out the form

3. **PDF Generation**: Client-side document download functionality

### Backend Services
1. **Document API**: CRUD operations for document management
2. **Enhanced AI Service**: Advanced multilingual integration with OpenAI GPT-4o featuring:
   - Language-specific cultural context and business norms
   - Culturally appropriate document structures for each language
   - Professional formality levels adapted to regional expectations
   - Authentic vocabulary and expressions for 35+ supported languages
3. **Storage Layer**: Abstracted storage interface with in-memory implementation

### Database Schema
- **Documents Table**: Stores document metadata, type, language, form data, and generated content
- **Work Experience Table**: Normalized work history entries
- **Education Table**: Educational background entries
- **Form Data**: JSON storage for flexible form data structure

## Data Flow

1. **Form Submission**: User completes multi-step form with validation at each step
2. **Data Validation**: Zod schemas validate data on both client and server
3. **AI Processing**: Form data is formatted into prompts for OpenAI API
4. **Content Generation**: OpenAI generates professional document content
5. **Storage**: Generated document and metadata stored in PostgreSQL
6. **Retrieval**: Documents can be retrieved, viewed, and downloaded

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **openai**: Official OpenAI API client
- **@radix-ui/***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: Uses Vite dev server with Express middleware
- **Production**: Serves static files from Express with built frontend
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **AI API**: OpenAI API key configuration required

### Key Features
- **Comprehensive Multilingual Support**: 35+ languages with native UI translations
- **Cultural Intelligence**: AI-powered document generation with cultural context for each language
- **Professional Localization**: Language-specific business document standards and formatting
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Radix UI components ensure WCAG compliance
- **Type Safety**: End-to-end TypeScript with shared schemas
- **Error Handling**: Comprehensive error boundaries and validation
- **Advanced Internationalization**: Complete UI translation system with language-specific country lists

## Supported Languages

The application supports 35+ languages with full UI translations and culturally appropriate AI document generation:

**European Languages**: English, Dutch, French, German, Spanish, Italian, Portuguese, Russian, Polish, Swedish, Norwegian, Danish, Finnish, Turkish, Czech, Hungarian, Romanian, Bulgarian, Croatian, Slovak, Slovenian, Estonian, Latvian, Lithuanian, Ukrainian

**Asian Languages**: Chinese (Simplified), Japanese, Korean, Hindi, Thai, Vietnamese, Indonesian, Malay

**Middle Eastern/African**: Arabic, Hebrew

**Additional**: Filipino/Tagalog

Each language includes:
- Complete UI translation with native expressions
- Cultural business context for professional documents
- Language-specific document formatting standards
- Appropriate formality levels and professional vocabulary

## GitHub Deployment Configuration

The application is now configured for multiple GitHub deployment options:

### 1. GitHub Pages (Frontend Only)
- Automatically deploys frontend to GitHub Pages
- Uses fallback document generation when OpenAI API is unavailable
- Perfect for demo and portfolio purposes
- URL: `https://[username].github.io/[repository-name]`

### 2. Docker Container (Full Stack)
- Builds Docker image and pushes to GitHub Container Registry
- Includes both frontend and backend with database support
- Suitable for deployment to any Docker-compatible hosting service
- Image: `ghcr.io/[username]/[repository-name]`

### 3. Manual Deployment
- Use included `deploy.sh` script for local/server deployment
- Includes Docker Compose configuration for database
- Environment variables configured via `.env` file

### GitHub Setup Instructions
1. Fork the repository to your GitHub account
2. Enable GitHub Actions in repository settings
3. Add `OPENAI_API_KEY` to repository secrets (Settings > Secrets and variables > Actions)
4. For GitHub Pages: Enable Pages in repository settings, select "GitHub Actions" as source
5. Push to main branch to trigger automatic deployment

### Required Environment Variables
- `OPENAI_API_KEY`: OpenAI API key for document generation
- `DATABASE_URL`: PostgreSQL connection (optional, uses in-memory storage as fallback)

## Recent Changes (January 2025)

- ✅ Implemented comprehensive internationalization system with 35+ language support
- ✅ Enhanced AI service with cultural intelligence and language-specific prompts
- ✅ Added language-specific business document standards and formatting guidelines
- ✅ Created complete UI translation system with native expressions for all supported languages
- ✅ Integrated cultural context into AI document generation for authentic professional communication
- ✅ Maintained burgundy red, gold, and white color scheme throughout multilingual interface
- ✅ **NEW**: Added GitHub deployment configuration with multiple deployment options
- ✅ **NEW**: Created Docker containerization for full-stack deployment
- ✅ **NEW**: Added health check endpoint and monitoring support
- ✅ **NEW**: Enhanced fallback system for reliable document generation

The application follows modern web development best practices with a clean separation of concerns, type safety throughout the stack, advanced internationalization capabilities, and a scalable architecture that can easily accommodate additional languages and cultural contexts. It is now fully configured for professional deployment on GitHub and other hosting platforms.
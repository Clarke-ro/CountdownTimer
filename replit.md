# Online Timer Application - replit.md

## Overview

This is a modern, single-page online timer application built with React and Express. The application provides four main timer functionalities: countdown timer, stopwatch, alarm clock, and world clock. It's designed to be fast, mobile-responsive, and optimized for high traffic with potential for ad monetization.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight React router)
- **State Management**: React hooks with TanStack Query for server state
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (active database integration)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement via Vite integration

### Database Schema
- Simple user table with id, username, and password fields
- Uses Drizzle ORM with Zod validation schemas
- PostgreSQL database actively connected and configured

## Key Components

### Timer Functionality
- **Countdown Timer**: User-configurable minutes with MM:SS display, audio notification
- **Stopwatch**: High-precision timing with HH:MM:SS.MS format (microseconds), start/pause/reset controls using requestAnimationFrame
- **Alarm Clock**: Set specific time alarms with 10 diverse sound options, immersive preview dialog, browser notifications
- **World Clock**: Display time across 12 major international time zones

### UI Components
- Responsive design using Tailwind CSS breakpoints
- shadcn/ui component library for consistent styling
- Mobile-first approach with touch-friendly controls
- Clean, modern interface with proper contrast and typography
- Sea blue gradient styled app name for branding

### Technical Features
- **Audio Notifications**: Advanced Web Audio API with 10 diverse alarm sounds including nature, zen, and musical patterns
- **Real-time Updates**: High-precision timing using performance.now() and requestAnimationFrame for microsecond accuracy
- **Background Execution**: Timers continue running when users switch tabs using Date.now() for accurate elapsed time tracking
- **Browser Compatibility**: Modern browser features with graceful fallbacks
- **Performance**: Optimized React components with proper cleanup

## Data Flow

1. **Client-Side State**: React hooks manage timer states and user interactions
2. **Custom Hooks**: Centralized timer logic in `useTimer`, `useWorldClock` hooks
3. **Component Communication**: Props and context for shared state
4. **Time Management**: JavaScript Date API with timezone handling
5. **Audio Integration**: Web Audio API for notifications and alerts

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js with TypeScript support
- Wouter for client-side routing

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives via shadcn/ui
- Lucide React for icons
- Inter font from Google Fonts

### Database and Validation
- Drizzle ORM with PostgreSQL adapter
- Zod for schema validation
- @neondatabase/serverless for database connectivity

### Development Tools
- Vite for build tooling
- ESBuild for server bundling
- TypeScript for type safety
- Replit-specific development plugins

## Deployment Strategy

### Development Environment
- Runs on Node.js 20 with PostgreSQL 16
- Hot reload via Vite development server
- Port 5000 with external port 80 mapping
- Parallel workflow execution in Replit

### Production Build
- Vite builds optimized client bundle
- ESBuild creates server bundle
- Static assets served from Express
- Autoscale deployment target configured

### Hosting Configuration
- Replit autoscale deployment
- Environment variable configuration for database
- Proper build and start scripts
- Git-based deployment workflow

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- June 26, 2025: Enhanced timer display with larger font sizes (8xl-9xl) for better visibility
- June 26, 2025: Completely redesigned alarm functionality with popup dialog interface for setting alarms
- June 26, 2025: Added advanced alarm features: hour/minute dropdowns, AM/PM selection, 5 sound options, repeat toggle, custom naming
- June 26, 2025: Implemented alarm alerts with popup notifications and browser notifications
- June 26, 2025: Added fullscreen mode for all timer components with large display and controls
- June 26, 2025: Redesigned world clock with top countries section displaying live time, followed by other cities list
- June 26, 2025: Enhanced alarm preview to show full continuous alarm experience (5-second demo) instead of single beep
- June 26, 2025: Implemented continuous alarm sounds that play until user manually stops them
- June 26, 2025: Added Google AdSense integration with three ad slots: top leaderboard, middle rectangle, bottom leaderboard
- June 26, 2025: Enhanced header navigation with more visible blue tabs and better contrast
- June 26, 2025: Improved footer layout with horizontal arrangement for better mobile responsiveness
- June 26, 2025: Integrated PostgreSQL database with Drizzle ORM, replacing in-memory storage with persistent database storage
- June 26, 2025: **MAJOR ENHANCEMENT** - Expanded alarm sounds library from 5 to 10 diverse options including nature sounds, zen bowl, rooster call, ocean waves, and piano melody
- June 26, 2025: **STOPWATCH PRECISION** - Added microsecond precision to stopwatch using performance.now() and requestAnimationFrame
- June 26, 2025: **ALARM PREVIEW DIALOG** - Created immersive 5-second alarm preview with visual countdown and proper sound patterns
- June 26, 2025: **GOOGLE ADSENSE COMPLETE** - Added AdSense account meta tag and properly configured ads.txt file serving
- June 26, 2025: **UI IMPROVEMENTS** - Removed dark mode, enhanced world clock with large time displays, styled app name with sea blue gradient, ensured timers continue in background tabs

## Changelog

Changelog:
- June 26, 2025. Initial setup and feature enhancements
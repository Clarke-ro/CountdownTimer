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
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage currently)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement via Vite integration

### Database Schema
- Simple user table with id, username, and password fields
- Uses Drizzle ORM with Zod validation schemas
- Currently implemented with in-memory storage, ready for PostgreSQL migration

## Key Components

### Timer Functionality
- **Countdown Timer**: User-configurable minutes with MM:SS display, audio notification
- **Stopwatch**: Precision timing with HH:MM:SS format, start/pause/reset controls
- **Alarm Clock**: Set specific time alarms with browser notification and audio alerts
- **World Clock**: Display time across 12 major international time zones

### UI Components
- Responsive design using Tailwind CSS breakpoints
- shadcn/ui component library for consistent styling
- Mobile-first approach with touch-friendly controls
- Clean, modern interface with proper contrast and typography

### Technical Features
- **Audio Notifications**: Web Audio API for timer completion sounds
- **Real-time Updates**: 1-second intervals for accurate time display
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

## Changelog

Changelog:
- June 26, 2025. Initial setup
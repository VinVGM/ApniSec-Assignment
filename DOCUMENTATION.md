# CYBER-GM Dashboard - System Documentation

## 1. System Overview

CYBER-GM Dashboard is a secure, role-based cybersecurity operations platform designed to track vulnerabilities, manage intelligence feeds, and facilitate team collaboration. It is built with a focus on **security**, **performance**, and **aesthetic excellence**.

## 2. Architecture & Design Patterns

The backend follows a strict **Object-Oriented Programming (OOP)** architecture to ensure modularity and maintainability.

### Layered Architecture
1.  **Handlers (`src/api/handlers`)**: The entry point for API requests. They handle request parsing, validation errors, and response formatting. All handlers inherit from a `BaseHandler` class.
2.  **Services (`src/services`)**: Contains the business logic. Services coordinate between repositories, validators, and external APIs (like Resend).
3.  **Repositories (`src/repositories`)**: The data access layer. Responsible for executing raw SQL queries via the `Database` singleton.
4.  **Validators (`src/validators`)**: Uses `zod` schemas to strictly validate all incoming data before it reaches the service layer.

### Key Classes
-   `BaseHandler`: Provides common utilities like standard error response formatting and rate limiting integration.
-   `Database`: A Singleton class wrapping `pg` pool for efficient database connections.

## 3. Core Features

### 3.1 Authentication & Security
-   **Method**: Custom JWT (JSON Web Token) implementation.
-   **Transport**: Secure, HTTP-Only Cookies (`token`).
-   **Security**:
    -   CSRF protection via SameSite cookie attributes.
    -   Passwords hashed using `bcryptjs`.
    -   Protected Routes via Next.js Middleware (`src/middleware.ts`).
    -   Automatic redirection for authenticated users away from Login/Register pages.

### 3.2 User Profile Management
-   **Features**: View credentials, update bio/location, and responsive profile header.
-   **Avatar**: Generates a fallback avatar based on the user's initials.
-   **Visuals**: "Gen-Z" User Interface with glassmorphism and neon accents.

### 3.3 Issue Tracking System (Vulnerability Management)
-   **CRUD**: Create, Read, Update, Delete vulnerabilities.
-   **Search & Filtering**: Real-time search by title or description. Sorts by Priority (Critical > High > Medium > Low).
-   **Ranked List**: Dashboard widget showing top priority threats.
-   **Details Modal**: Quick-view modal for issue details without leaving the dashboard context.

### 3.4 Team Intelligence Feed
-   **Features**: A social-feed style interface for team updates.
-   **Interactivity**: Users can post updates and "Like" posts.
-   **Optimistic UI**: Like counts update instantly on the client for a snappy feel.

### 3.5 Rate Limiting System
-   **Algorithm**: Token Bucket Algorithm.
-   **Implementation**: Custom `RateLimitService` singleton.
-   **Scope**: Limits requests per IP address.
-   **Limits**:
    -   *Auth*: 20 requests / 15 mins.
    -   *Issues/Posts*: Higher thresholds.
    -   *Duplicate Check*: Prevents identical identical payloads from being spammed.

### 3.6 Theme System
-   **Engine**: `next-themes`.
-   **Modes**: Light, Dark, and System.
-   **Landing Page**: Enforced "Always Dark" mode for cinematic effect.
-   **Dashboard**: User-togglable theme with persistent storage.

### 3.7 Email Notifications
-   **Provider**: Resend API.
-   **Triggers**:
    -   Welcome Email (on Registration).
    -   Security Alert (Login/Profile updates).
    -   Issue Created (Notification to team).
-   **Templates**: Custom HTML templates with "Hacker/Console" aesthetic.

### 3.8 Notification System (Custom Toast)
-   **Component**: `src/components/ui/custom-toast.tsx`
-   **Design**: Replaces standard browser alerts with a polished, animated UI.
-   **Animations**: Powered by **Framer Motion** for smooth slide-in/slide-out effects.
-   **Features**:
    -   **Position**: Fixed Bottom-Right.
    -   **Reverse Loading Bar**: A visual timer bar that shrinks to indicate auto-dismissal time.
    -   **Feedback**: Color-coded (Green/Red) system for Success and Error states.

### 3.9 Password Reset Flow
-   **Method**: Token-based verification via Email (Resend).
-   **Security**:
    -   Tokens are cryptographically random UUIDs.
    -   Tokens expire in 15 minutes.
    -   Tokens are invalidated immediately after use.
    -   API always returns 200 OK to prevent email enumeration.

## 4. API Reference

### Auth
-   `POST /api/auth/register`: Create new account.
-   `POST /api/auth/login`: Authenticate and set cookie.
-   `POST /api/auth/logout`: Clear session cookie.
-   `POST /api/auth/forgot-password`: Request reset link.
-   `POST /api/auth/reset-password`: Reset password with token.

### Users
-   `GET /api/users/profile`: Get current user details.
-   `PUT /api/users/profile`: Update user details.

### Issues
-   `GET /api/issues`: List all issues (search param `q`).
-   `POST /api/issues`: Report a new issue.
-   `PUT /api/issues`: Update an issue (requires ID).
-   `DELETE /api/issues`: Resolve/Delete an issue (requires ID).

### Posts
-   `GET /api/posts`: Get team feed.
-   `POST /api/posts`: Share an update.
-   `POST /api/posts/[id]/like`: Like a post.

## 5. Database Schema

### `users`
-   `id` (UUID, PK)
-   `email` (Unique)
-   `password_hash`
-   `full_name`, `role`, `sector`, `bio`
-   `created_at`
-   `reset_token` (Text, Nullable)
-   `reset_token_expires` (Timestamp, Nullable)

### `issues`
-   `id` (UUID, PK)
-   `title`, `description`
-   `status` (Open/Closed), `priority` (Critical/High/Medium/Low)
-   `type` (Vulnerability/Bug)
-   `created_by` (FK -> users)

### `posts`
-   `id` (UUID, PK)
-   `content`
-   `user_id` (FK -> users)
-   `created_at`

### `post_likes`
-   `id` (UUID, PK)
-   `post_id` (FK -> posts)
-   `user_id` (FK -> users)
-   Unique restraint on `(post_id, user_id)` to prevent double likes.

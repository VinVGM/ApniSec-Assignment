# Task List: ApniSec Assignment

## 1. Project Initialization
- [x] Initialize Next.js 15+ (App Router, TS, Tailwind)
- [x] Set up project structure for OOP Backend (Handlers, Services, Repositories, Validators)
- [x] Configure PostgreSQL (Supabase) connection
- [x] Install necessary dependencies (Resend, JWT, etc.)

## 2. Authentication System (Custom JWT)
- [x] Design Auth Service Class & Review Implementation Plan
- [x] Implement Auth Repository (Data Access)
- [x] Implement Auth Service (Business Logic)
- [x] Implement Auth Handler (API Routes)
- [x] Implement Auth Middleware
- [x] Build Frontend Auth Pages

## 3. User Profile Management
- [x] Implement DB Migration (add profile fields)
- [x] Implement UserService & UserHandler
- [x] Add Update method to UserRepository
- [x] Create Profile API Routes
- [x] Build Profile Frontend Page

## 4. Issue Management (API 2)
- [x] Create DB Migration (Issues table)
- [x] Implement IssueRepository
- [x] Implement IssueValidator
- [x] Implement IssueService
- [x] Implement IssueHandler & API Routes
- [x] Build Frontend Issue Dashboard
- [x] Implement Search in Backend (Repo/Service/Handler)
- [x] Add Search, Edit & Custom Delete Dialog to Issues Page
- [x] Add Ranked List & Global Search to Dashboard


## 6. Community Feed (Posts API)
- [x] DB Migration (Posts & Likes)
- [x] Post Repository & Model
- [x] Post Validator
- [x] Post Service
- [x] Post Handler & API Routes
- [x] Frontend: Feed Card in Dashboard
- [x] Like Button Implementation

## 7. Rate Limiting (Custom System)
- [ ] Design Rate Limiter Class
- [ ] Implement RateLimiter Service
- [ ] Apply to API routes

## 4. Email Integration (Resend)
- [x] Setup Resend API
- [x] Create Email Service Class
- [x] Implement email sending validation/notification

## 5. SEO Optimization
- [ ] Configure Metadata API
- [ ] Implement Sitemap & Robots.txt
- [ ] Optimize initial page load & semantic HTML

## 6. Verification & Final Polish
- [x] Refactor all Handlers to use BaseHandler (OOP Inheritance)
- [ ] Full system walk-through
- [ ] Code review for OOP strictness

## 8. Registration Flow Enhancement
- [x] Database Migration (Sector)
- [x] Backend Updates (User Model, Service, Validator)
- [x] Frontend Updates (Registration Form)

## 9. Landing Page
- [x] Design Hero Section
- [x] Build Services Grid (VAPT, Cloud, etc.)
- [x] Implement Navbar & Footer
- [x] Make UI Responsive

## 10. Rate Limiting System (OOP)
- [x] Create RateLimitService (Singleton, Token Bucket)
- [x] Integrate into BaseHandler
- [x] Implement Duplicate Request Prevention
- [x] Apply Limits to Auth, Issues, Posts, Profile

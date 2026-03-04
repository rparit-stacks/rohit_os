package com.rps.os_backned.project.service;

import com.rps.os_backned.project.model.ProjectDocument;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public final class ProjectMocks {

    private ProjectMocks() {
    }

    public static List<ProjectDocument> getMockProjects() {
        List<ProjectDocument> projects = new ArrayList<>();

        // Quout (Studio Sara)
        ProjectDocument quout = new ProjectDocument();
        quout.setId("quout-studio-sara");
        quout.setTitle("Quout (Studio Sara)");
        quout.setDescription("Full e-commerce platform for custom and digital products with a customer storefront, admin dashboard, mockup service, and separate quotation tool.");
        quout.setTechStack(Arrays.asList(
                "React",
                "TypeScript",
                "Vite",
                "Tailwind CSS",
                "Spring Boot",
                "PostgreSQL",
                "Node.js",
                "Express",
                "Cloudinary"
        ));
        quout.setGithub("https://github.com/rparit-stacks/sara-backend-ecom");
        quout.setDocker(null);
        quout.setDemo("https://studiosara.in/");
        quout.setBlog("https://www.studiosara.in/admin-sara");
        quout.setImage("/Studio-Sara-Custom-Prints-Embroidery-Design-Studio-Low-MOQ-Printing-02-03-2026_09_18_PM.png");
        quout.setDetailedDescription("Quout (Studio Sara) is an end-to-end e-commerce system for custom, digital, and physical products. It includes a storefront, admin dashboard, a dedicated mockup generation service, and a separate quotation tool. The frontend UI was designed with LLM assistance.");
        quout.setFeatures(Arrays.asList(
                "Customer storefront with product search, filters, cart, wishlist, and checkout",
                "Admin dashboard for product, category, order, user, and content management",
                "Custom product design tool with design library and mockup generation",
                "Digital product uploads with Cloudinary processing and secure ZIP downloads",
                "Payments via Stripe, Razorpay, and COD with partial COD support",
                "Shipping rules, ranges, slabs, and unit rate calculations",
                "CMS pages, blog, banners, testimonials, and marketing sections"
        ));
        quout.setTechnologies(Arrays.asList(
                "React 18",
                "TypeScript",
                "Vite",
                "Tailwind CSS",
                "shadcn-ui (Radix)",
                "React Router",
                "React Hook Form + Zod",
                "TanStack Query",
                "Framer Motion",
                "Spring Boot 3.5",
                "Java 21",
                "PostgreSQL",
                "Spring Data JPA",
                "Spring Security + JWT",
                "OAuth2",
                "Stripe",
                "Razorpay",
                "Node.js",
                "Express",
                "Sharp",
                "Cloudinary"
        ));
        quout.setKeyFeatures(Arrays.asList(
                "Multi-app architecture: storefront, admin dashboard, mockup service, quotation tool",
                "Custom product configuration with pricing slabs and design requests",
                "Secure digital product delivery with preview vs download files",
                "Comprehensive admin tooling: CMS, shipping, payments, coupons, and audit logs"
        ));
        ProjectDocument.ExtraLink designObserver = new ProjectDocument.ExtraLink();
        designObserver.setLabel("Design Observer Pro Repo");
        designObserver.setUrl("https://github.com/rparit-stacks/design-observer-pro");
        quout.setExtraLinks(List.of(designObserver));
        ProjectDocument.AdminCredentials quoutAdmin = new ProjectDocument.AdminCredentials();
        quoutAdmin.setEmail("admin@studiosara.com");
        quoutAdmin.setPassword("admin@sara");
        quoutAdmin.setNote("Password will expire when the project is handed over to the client.");
        quoutAdmin.setLoginUrl("https://www.studiosara.in/admin-sara");
        quout.setAdminCredentials(quoutAdmin);
        quout.setSkills(Arrays.asList(
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Spring Boot",
                "PostgreSQL",
                "Node.js",
                "Express",
                "Cloudinary",
                "Stripe",
                "Razorpay"
        ));
        quout.setPrimarySkill("Full-Stack");
        projects.add(quout);

        // Eventura
        ProjectDocument eventura = new ProjectDocument();
        eventura.setId("eventura");
        eventura.setTitle("Eventura");
        eventura.setDescription("Backend service inspired by BookMyShow, developed using Spring Boot and Spring Data JPA. Provides modular architecture for managing events, users, theaters, and bookings with efficient movie booking operations.");
        eventura.setTechStack(Arrays.asList("Spring Boot", "Spring Data JPA", "REST API", "Java", "MySQL", "Spring Security"));
        eventura.setGithub("https://github.com/rparit-stacks/Eventura");
        eventura.setDocker("https://hub.docker.com/r/rparit1934/eventure");
        eventura.setDemo(null);
        eventura.setBlog(null);
        eventura.setImage("/project_img/eventturs.png");
        eventura.setDetailedDescription("Eventura is a comprehensive movie ticket booking system built with Spring Boot. It provides a robust and scalable backend with a RESTful API to manage the entire lifecycle of booking movie tickets.");
        eventura.setFeatures(Arrays.asList(
                "Browsing available movies and filtering them by various criteria",
                "Viewing showtimes for a selected movie in different theaters",
                "Selecting seats for a particular show",
                "Making a booking and completing the payment",
                "Viewing booking history",
                "Canceling a booking"
        ));
        eventura.setTechnologies(Arrays.asList(
                "Java 21",
                "Spring Boot 3.5.6",
                "Spring Data JPA",
                "Spring Web",
                "Spring Security",
                "MySQL"
        ));
        eventura.setKeyFeatures(Arrays.asList(
                "RESTful API with DTOs for requests and responses",
                "Pagination for efficient data retrieval",
                "Modular architecture with clear separation of concerns",
                "Complete CRUD operations for all entities"
        ));
        eventura.setEntities(Arrays.asList(
                "Movies",
                "Theaters",
                "Screens",
                "Shows",
                "Seats",
                "Bookings",
                "Payments",
                "Users"
        ));
        eventura.setSkills(Arrays.asList(
                "Spring Boot",
                "Spring Data JPA",
                "REST API",
                "Java",
                "MySQL",
                "Spring Security"
        ));
        eventura.setPrimarySkill("Spring Boot");
        projects.add(eventura);

        // Gold Loan
        ProjectDocument goldLoan = new ProjectDocument();
        goldLoan.setId("gold-loan");
        goldLoan.setTitle("Gold Loan Backend");
        goldLoan.setDescription("Gold Loan Management System using Spring Boot and Spring Security with role-based access control. Designed layered service architecture ensuring separation of concerns and maintainability.");
        goldLoan.setTechStack(Arrays.asList("Spring Boot", "Spring Security", "REST API", "Java", "MySQL", "Spring Mail"));
        goldLoan.setGithub("https://github.com/rparit-stacks/goldloanApplication");
        goldLoan.setDemo(null);
        goldLoan.setBlog(null);
        goldLoan.setImage("/project_img/goldloan.jpg");
        goldLoan.setDetailedDescription("A comprehensive Spring Boot application for managing gold loan operations with RESTful API, role-based authentication, and automated email notifications.");
        goldLoan.setFeatures(Arrays.asList(
                "Full CRUD Operations for all entities",
                "Role-Based Access Control (ADMIN, MANAGER, OFFICER, AUDITOR)",
                "Service Layer Architecture with proper service-to-service communication",
                "Automatic Field Population (Application numbers, stages, createdBy, assignedTo)",
                "Email Notifications for user creation, branch creation, and loan application submission",
                "Automatic Calculations (Gold assessed value calculation)",
                "Swagger/OpenAPI Documentation",
                "Global Exception Handling"
        ));
        goldLoan.setTechnologies(Arrays.asList(
                "Java 17",
                "Spring Boot 3.5.7",
                "Spring Data JPA",
                "Spring Security",
                "Spring Web",
                "Spring Mail",
                "MySQL",
                "Swagger/OpenAPI"
        ));
        goldLoan.setKeyFeatures(Arrays.asList(
                "Proper layered architecture with service-to-service communication",
                "Automatic application number generation (APP-YYYYMMDD-XXXXX)",
                "Gold assessed value calculation: (Weight × Purity / 100) × MarketRate",
                "Email service for automated notifications"
        ));
        goldLoan.setEntities(Arrays.asList(
                "Users",
                "Customers",
                "Branches",
                "Loan Applications",
                "Documents",
                "Gold Details",
                "Loan Terms",
                "Audits",
                "Valuation Reports"
        ));
        goldLoan.setVideoTutorial("https://youtu.be/jstN7swtM1E");
        goldLoan.setSkills(Arrays.asList(
                "Spring Boot",
                "Spring Security",
                "REST API",
                "Java",
                "MySQL",
                "Microservices",
                "JWT"
        ));
        goldLoan.setPrimarySkill("Spring Security");
        projects.add(goldLoan);

        // FormFree
        ProjectDocument formFree = new ProjectDocument();
        formFree.setId("formfree");
        formFree.setTitle("FormFree");
        formFree.setDescription("Backend-only Spring Boot REST API for dynamic form submissions with unique project-based API keys. Designed layered architecture (Controller, Service, Repository, Database) for scalability and security.");
        formFree.setTechStack(Arrays.asList("Spring Boot", "REST API", "JWT", "Java", "Maven", "Gson"));
        formFree.setGithub("https://github.com/rparit-stacks/formFree");
        formFree.setDocker("https://hub.docker.com/r/rparit1934/formfree");
        formFree.setDemo(null);
        formFree.setBlog(null);
        formFree.setImage("/project_img/formFree.png");
        formFree.setDetailedDescription("FormFree is a Spring Boot-based REST API project designed to simplify the process of collecting and managing form submissions for different projects. It allows users to create projects, generate API keys, and submit form data dynamically using those keys.");
        formFree.setFeatures(Arrays.asList(
                "Project Creation with unique API key and endpoint",
                "Dynamic Form Submission (any form data as JSON)",
                "Submission Retrieval for analysis or review",
                "Health Check Endpoint for service verification"
        ));
        formFree.setTechnologies(Arrays.asList(
                "Java 17+",
                "Spring Boot",
                "Maven",
                "Gson (for JSON serialization)"
        ));
        formFree.setKeyFeatures(Arrays.asList(
                "Create projects and receive unique API keys",
                "Submit any form data (as JSON) to project-specific endpoints",
                "Retrieve all submissions for a given project",
                "Layered architecture: Controller, Service, Repository, Database"
        ));
        formFree.setEntities(Arrays.asList(
                "Projects",
                "Form Submissions"
        ));
        formFree.setApiEndpoints(Arrays.asList(
                "POST /api/create-project - Create a new project",
                "POST /api/form/submit/{apiKey} - Submit form data",
                "GET /api/form/result/{projectId} - Retrieve all submissions",
                "GET /api/health - Health check endpoint"
        ));
        formFree.setSkills(Arrays.asList(
                "Spring Boot",
                "REST API",
                "JWT",
                "Java",
                "Microservices"
        ));
        formFree.setPrimarySkill("REST API");
        projects.add(formFree);

        // ProjectAPIHub
        ProjectDocument projectApiHub = new ProjectDocument();
        projectApiHub.setId("project-api-hub");
        projectApiHub.setTitle("ProjectAPIHub");
        projectApiHub.setDescription("Comprehensive Spring Boot portfolio management system with role-based authentication. Provides RESTful APIs for managing profile, skills, projects, education, work experience, and website analytics with secure admin access control.");
        projectApiHub.setTechStack(Arrays.asList("Spring Boot", "Spring Security", "REST API", "Java", "MySQL", "Spring Data JPA"));
        projectApiHub.setGithub("https://github.com/rparit-stacks/portfolio-backend");
        projectApiHub.setDocker("https://hub.docker.com/r/rparit1934/portfolio");
        projectApiHub.setDemo(null);
        projectApiHub.setBlog(null);
        projectApiHub.setImage("/project_img/portfolio.png");
        projectApiHub.setDetailedDescription("ProjectAPIHub is a Spring Boot-based portfolio management system that provides comprehensive RESTful APIs for managing professional portfolios. It includes role-based access control, allowing administrators to manage their profile, skills, projects, education, work experience, and track website analytics. The system features secure authentication and authorization with Spring Security.");
        projectApiHub.setFeatures(Arrays.asList(
                "Role-Based Access Control (Admin-only endpoints for management)",
                "User Profile Management with detailed information",
                "Skills Management with categories and featured skills",
                "Projects Management with featured projects support",
                "Education and Work Experience tracking",
                "Contact Inquiry Management with status tracking",
                "Website Analytics and Visitor Tracking",
                "Public Portfolio API endpoints for frontend integration"
        ));
        projectApiHub.setTechnologies(Arrays.asList(
                "Java 21",
                "Spring Boot 3.5.7",
                "Spring Data JPA",
                "Spring Security",
                "Spring Web",
                "MySQL",
                "SpringDoc OpenAPI"
        ));
        projectApiHub.setKeyFeatures(Arrays.asList(
                "Comprehensive RESTful API with 50+ endpoints",
                "Role-based authentication and authorization",
                "Session-based authentication system",
                "Public and private API endpoints separation",
                "Swagger/OpenAPI documentation",
                "Layered architecture with proper separation of concerns"
        ));
        projectApiHub.setEntities(Arrays.asList(
                "Users",
                "Skills",
                "Projects",
                "Education",
                "Experience",
                "Contacts",
                "Analytics"
        ));
        projectApiHub.setApiEndpoints(Arrays.asList(
                "POST /api/auth/login - User authentication",
                "GET /api/portfolio/user/{userId} - Public profile",
                "GET /api/projects - Admin project management",
                "GET /api/skills - Admin skills management",
                "POST /api/contacts - Contact inquiry submission",
                "POST /api/analytics/track - Website visit tracking",
                "GET /api/analytics/summary - Analytics summary (Admin)"
        ));
        projectApiHub.setSkills(Arrays.asList(
                "Spring Boot",
                "Spring Security",
                "REST API",
                "Java",
                "MySQL",
                "Spring Data JPA",
                "Role Based Auth"
        ));
        projectApiHub.setPrimarySkill("Role Based Auth");
        projects.add(projectApiHub);

        // SmartSplit
        ProjectDocument smartSplit = new ProjectDocument();
        smartSplit.setId("smart-split");
        smartSplit.setTitle("SmartSplit");
        smartSplit.setDescription("Comprehensive expense splitting application with Spring Boot backend and TypeScript frontend. Enables users to create groups, split expenses, track balances, and settle debts with friends and family. Features OTP-based authentication, real-time balance calculations, and comprehensive analytics.");
        smartSplit.setTechStack(Arrays.asList("Spring Boot", "Spring Security", "REST API", "Java", "MySQL", "TypeScript", "Spring Data JPA"));
        smartSplit.setGithub("https://github.com/rparit-stacks/smart-split");
        smartSplit.setDocker(null);
        smartSplit.setDemo(null);
        smartSplit.setBlog(null);
        smartSplit.setImage("/project_img/smart-split.svg");
        smartSplit.setDetailedDescription("SmartSplit is a full-stack expense splitting application designed to simplify how friends and family split bills and track shared expenses. The backend is built with Spring Boot, providing a robust RESTful API with comprehensive authentication, group management, expense tracking, and settlement features. The system supports multiple split types (equal, exact amounts, percentages), automatic balance calculations, and detailed analytics for spending patterns.");
        smartSplit.setFeatures(Arrays.asList(
                "OTP-based Two-Factor Authentication (Email & Mobile)",
                "Group Management - Create and manage expense groups with friends",
                "Expense Splitting - Split expenses equally, by exact amounts, or percentages",
                "Balance Tracking - Automatic calculation of who owes whom",
                "Settlement Management - Record payments to settle debts",
                "Category Management - Categorize expenses (Food, Travel, Utilities, etc.)",
                "Activity Feed - Track all expenses and settlements in real-time",
                "Analytics Dashboard - Spending insights, trends, and category breakdowns",
                "Multi-group Support - Manage expenses across multiple groups",
                "Payment History - Complete settlement and payment tracking"
        ));
        smartSplit.setTechnologies(Arrays.asList(
                "Java 17+",
                "Spring Boot 3.x",
                "Spring Data JPA",
                "Spring Security",
                "Spring Web",
                "MySQL",
                "TypeScript",
                "RESTful API",
                "OTP Authentication"
        ));
        smartSplit.setKeyFeatures(Arrays.asList(
                "Comprehensive RESTful API with 137 planned endpoints (27 existing, 110 planned)",
                "OTP-based secure authentication with email and mobile verification",
                "Automatic balance calculation and recalculation on expense/settlement changes",
                "Multiple split types: Equal split, Exact amounts, Percentage-based",
                "Real-time balance tracking across all groups",
                "Transaction management with @Transactional for data consistency",
                "Layered architecture: Controller, Service, Repository, Database",
                "Comprehensive API documentation with Swagger/OpenAPI"
        ));
        smartSplit.setEntities(Arrays.asList(
                "Users",
                "Groups",
                "Group Members",
                "Expenses",
                "Expense Participants",
                "Settlements",
                "Categories",
                "Balances",
                "OTP Records",
                "Sessions"
        ));
        smartSplit.setApiEndpoints(Arrays.asList(
                "POST /api/auth/register - Register new user with OTP verification",
                "POST /api/auth/login - OTP-based login flow",
                "POST /api/auth/verify-login-otp - Complete authentication",
                "POST /api/groups - Create expense groups",
                "GET /api/groups/{id} - Get group details with members",
                "POST /api/groups/{id}/members - Add members to group",
                "POST /api/expenses - Create expense with split logic (CRITICAL - Planned)",
                "GET /api/expenses/{id} - Get expense details with participants",
                "POST /api/settlements - Record payment/settlement (CRITICAL - Planned)",
                "GET /api/users/{id}/balance-summary - Get user's balance overview",
                "GET /api/dashboard - Aggregated dashboard data (Planned)",
                "GET /api/analytics/spending-by-category - Category-wise analytics (Planned)"
        ));
        smartSplit.setSkills(Arrays.asList(
                "Spring Boot",
                "Spring Security",
                "REST API",
                "Java",
                "MySQL",
                "Spring Data JPA",
                "TypeScript",
                "OTP Authentication",
                "Balance Calculations",
                "Transaction Management"
        ));
        smartSplit.setPrimarySkill("Spring Boot");
        projects.add(smartSplit);

        return projects;
    }
}


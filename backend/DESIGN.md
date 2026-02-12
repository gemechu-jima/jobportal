# Job Portal System Design

## 1. High-Level Design (HLD) - System Architecture
This diagram represents the major components and how they interact at a macroscopic level.

```mermaid
graph TD
    Client[Frontend Client (React/Next.js)] -->|HTTP Request| API[API Gateway / Server (Express)]
    
    subgraph Backend_Services
        API --> Auth[Auth Service]
        API --> User[User Service]
        API --> Job[Job Service]
        API --> App[Application Service]
        App --> Notify[Notification Service]
    end

    subgraph Database_Layer
        Auth -->|Read/Write| DB[(PostgreSQL Database)]
        User -->|Read/Write| DB
        Job -->|Read/Write| DB
        App -->|Read/Write| DB
    end

    Notify -->|SMTP| Email[Email Provider]
    Notify -->|b| Telegram[Telegram API]
```

---

## 2. Low-Level Design (LLD) - "Smart Application Flow"
This detailed flowchart visualizes the logic inside `application.service.ts` when a user applies for a job. It shows the **Extraction**, **Matching**, and **Creation** steps perfectly.

```mermaid
sequenceDiagram
    participant User as Candidate (Frontend)
    participant API as API Controller
    participant Auth as User Table (Identity)
    participant App as Applicant Service
    participant DB as Database (Applicant Table)
    participant Job as Job Table
    participant Notify as Notification Service

    User->>API: POST /apply { job_id, name? }
    API->>App: applyToJob(data)
    
    rect rgb(240, 248, 255)
        note right of App: 1. Identity Verification
        App->>Auth: User.findByPk(user_id)
        Auth-->>App: Return User (official email/username)
    end

    rect rgb(255, 250, 240)
        note right of App: 2. Smart Profile Matching
        App->>DB: Find Applicant by user_id
        alt Profile Exists
            App->>DB: UPDATE Profile (Merge Request Data + System Email)
        else Profile Missing
            App->>DB: CREATE Profile (Use System Email + Request Name)
        end
    end

    rect rgb(240, 255, 240)
        note right of App: 3. Job Application
        App->>Job: Check Job Exists & Get Employer Email
        App->>DB: Create JobApplication Record
    end

    rect rgb(255, 240, 245)
        note right of App: 4. Notification Trigger
        App->>Notify: sendApplicationNotification()
        Notify-->>User: (Async) Email Sent to Employer
    end

    App-->>API: Return Success
    API-->>User: 201 Created
```

## 3. Database Schema Design (ERD)

```mermaid
erDiagram
    USERS ||--o{ JOBS : posts
    USERS ||--o| APPLICANTS : has_profile
    JOBS ||--o{ APPLICATIONS : receives
    APPLICANTS ||--o{ APPLICATIONS : submits

    USERS {
        int id PK
        string username
        string email
        string password
        enum role "admin, employer, candidate"
    }

    JOBS {
        int id PK
        string title
        string description
        int posted_by FK
        boolean is_active
    }

    APPLICANTS {
        int id PK
        int user_id FK
        string name
        string email "Official from User"
        string phone
        string cv_link
    }

    APPLICATIONS {
        int id PK
        int job_id FK
        int applicant_id FK
        enum status "new, reviewed, accepted"
    }
```

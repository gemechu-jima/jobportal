# Job Portal System Architecture & Logic Flow

This document details the complete flow of data and logic across the entire backend, explaining how **Auth, Users, Jobs, Notifications, and Applications** interact.

---

## 1. Authentication & User Creation Flow
**Actor**: Visitor (Candidate/Employer)
**Goal**: Create an account and get a session.

1.  **Frontend** sends `POST /auth/register` with `{ username, email, password, role }`.
2.  **Auth Service**:
    *   Hashes password with `bcrypt`.
    *   Creates record in **User Table**.
    *   Generates **JWT Access Token** & **Refresh Token**.
3.  **Result**: User is logged in.
    *   *Note: No Applicant profile exists yet. The user is just an "Account".*

---

## 2. Profile & Application Flow (The "Smart" Logic)
**Actor**: Candidate
**Goal**: Apple for a Job.

### A. The Setup (Optional but recommended)
The user *can* go to "My Profile" to set up their details first:
1.  **Frontend** sends `POST /applications/create-profile`.
2.  **Service**: `createApplicantProfile(userData)`
    *   **System Extraction**: Look up `User` table using `user_id`.
    *   **Data Merge**: 
        *   Take `email` from **User Table** (Official).
        *   Take `name` from Request OR fall back to `username`.
        *   Take `phone`, `cv_link` from Request.
    *   **DB Action**: Create or Update **Applicant Table**.

### B. The Application (The "Smart" Auto-Match)
The user clicks **"Apply Now"** on a Job:
1.  **Frontend** sends `POST /applications/apply` with `{ job_id, applied_from }`.
2.  **Service**: `applyToJob(data)`
    *   **Step 1**: Validates Job exists.
    *   **Step 2 (The Bridge)**: Calls `createApplicantProfile` internally.
        *   *Magic*: It automatically ensures an **Applicant Profile** exists for this user.
        *   *Magic*: If they didn't have one, it creates it using their **User** data (Email/Username).
    *   **Step 3**: Creates **JobApplication** record linking `job_id` + `applicant_id`.
    *   **Step 4 (Trigger)**: Calls `Notification Service`.

---

## 3. Notification Flow (The "Reactor")
**Trigger**: A successful Job Application.

1.  **Source**: `applyToJob` service detects success.
2.  **Action**: Calls `sendApplicationNotification(data)`.
3.  **Logic**:
    *   Fetches **Employer's Email** from the `Job` -> `User` relation.
    *   Prepares email content: *"Hello [Employer], [Candidate Name] just applied for [Job Title]"*.
4.  **Delivery**: Sends email via Email Service (Mock/Nodemailer).

---

## 4. Job Management Flow
**Actor**: Employer/Admin
**Goal**: Post a Job and get notified.

1.  **Frontend** sends `POST /jobs` with `{ title, description, ... }`.
2.  **Job Service**: Creates `Job` record linked to `User` (Employer).
3.  **Frontend** sends `POST /jobs/:id/publish` (Optional).
4.  **Notification Service**:
    *   sends **Telegram Notification** to a public channel: *"New Job Alert: [Job Title] at [Company]"*.

---

## 🔄 System-Wide Diagram

```text
[ USER (Candidate) ] 
       |
       v
[ AUTH MODULE ] ----> Creates [ USER RECORD ] (id, email, username)
       |
       v
[ APPLICATION MODULE ]
       |
    (Apply to Job)
       |
       +---> [ LOOKUP USER ] (Get official Email)
       |
       +---> [ CREATE/UPDATE APPLICANT ] (Link User <-> Applicant)
       |
       +---> [ CREATE APPLICATION ] (Link Job <-> Applicant)
                       |
                       v
            [ NOTIFICATION MODULE ]
                       |
                       +---> [ EMAIL EMPLOYER ] (Notify of new applicant)
                       |
                       +---> [ TELEGRAM BOT ] (If job is published)
```

## Key Design Principles Implemented
*   **Single Source of Truth**: Email always comes from `User` table.
*   **Lazy Creation**: Applicant profiles are created *just-in-time* when applying if they don't exist.
*   **Decoupled Notifications**: The Notification module doesn't know *about* applications logic; it just receives a "command" to send a message.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
/*Users are the central entity of the system. A user can have the role of candidate, employer, or admin. Employers create and manage Jobs, while candidates create an Applicant profile that stores job-related information (CV, phone, etc.) separate from their basic user account.

A JobApplication links an Applicant to a Job, creating a many-to-many relationship: one applicant can apply to many jobs, and one job can receive many applications. This table also stores application-specific details such as status, application date, and application source (website, Telegram, Facebook).

The Auth module is responsible only for authentication and authorization. After a user logs in (via email/password or Telegram), it generates a JWT token that identifies the user in subsequent requests. The token is used to verify the user's identity and role before allowing access to jobs, applications, or other protected resources.
*/

src/
│
├── api/
│   ├── axios.ts
│   ├── auth.api.ts
│   ├── user.api.ts
│   ├── job.api.ts
│   └── application.api.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   └── Pagination.tsx
│   │
│   ├── jobs/
│   ├── users/
│   ├── application/
│   └── ProtectedRoute.tsx
│
├── constants/
│   ├── routes.ts
│   ├── roles.ts
│   └── menu.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useJobs.ts
│   └── useUsers.ts
│
├── layouts/
│   ├── MainLayout.tsx
│   ├── AdminLayout.tsx
│   ├── EmployerLayout.tsx
│   └── CandidateLayout.tsx
│
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ForgotPassword.tsx
│   │
│   ├── home/
│   │   └── Home.tsx
│   │
│   ├── jobs/
│   │   ├── JobListing.tsx
│   │   └── JobDetail.tsx
│   │
│   ├── admin/
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   ├── Jobs.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   │
│   ├── employer/
│   │   ├── Dashboard.tsx
│   │   ├── CreateJob.tsx
│   │   ├── EditJob.tsx
│   │   ├── MyJobs.tsx
│   │   ├── JobApplications.tsx
│   │   ├── Application.tsx
│   │   └── CompanyProfile.tsx
│   │
│   └── candidate/
│       ├── Dashboard.tsx
│       ├── MyApplications.tsx
│       ├── SavedJobs.tsx
│       └── Profile.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── job.service.ts
│   └── application.service.ts
│
├── store/
│   ├── store.ts
│   ├── auth.slice.ts
│   ├── job.slice.ts
│   ├── user.slice.ts
│   └── application.slice.ts
│
├── types/
│   ├── auth.ts
│   ├── user.ts
│   ├── job.ts
│   └── application.ts
│
├── utils/
│   ├── helpers.ts
│   ├── validators.ts
│   └── formatters.ts
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
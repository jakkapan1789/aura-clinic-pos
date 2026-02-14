# Clinic POS v1 — Frontend (Next.js 14)

I used the Stack as specified below and deployed it on Vercel for testing.
https://aura-clinic-nbz40rc2x-jakkapan-pakeerats-projects.vercel.app/login

Tech Stack:
- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- JWT Authentication (HttpOnly cookie)

---

# Architecture Overview

## Multi-Tenant Safety Strategy

Tenant isolation is enforced primarily on the backend.
The frontend does NOT trust or send TenantId manually.

Flow:

1. User logs in
2. Backend returns JWT containing:
   - userId
   - role
   - tenantId
   - allowedBranchIds
3. JWT stored in HttpOnly cookie
4. All API requests include JWT automatically
5. Backend extracts TenantId from claims
6. Backend enforces tenant scoping via:
   - Global query filters
   - Policy-based authorization




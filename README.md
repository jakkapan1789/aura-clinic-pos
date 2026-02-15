# Clinic POS v1 — Frontend (Next.js 14)

I used the Stack as described below and deployed it on Vercel for testing.
This included duplicate phone number validation, API connection, and safe error returning.
https://aura-clinic-pos.vercel.app/login

and this is my AI Prompt.
https://github.com/jakkapan1789/aura-clinic-pos/blob/main/API_PROMPT.md

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




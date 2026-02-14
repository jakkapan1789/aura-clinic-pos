I used Chat GPT to define the requirements for creating better and then applied them to build the frontend on Loveable.

## prompt 
Build a frontend starter for Clinic POS v1. 

Requirements:
- Multi-tenant safe
- Tenant ID passed via header (X-Tenant-Id)
- Use Next.js 14+ (App Router)
- TypeScript
- Tailwind
- Axios or fetch wrapper
- Simple layout

Features:
- Login page (mock)
- Patient list page
- Create patient page
- Branch selector (UI only)
- Tenant context provider

Goals:
- Clean folder structure
- Avoid overengineering
- Prepare for real B2B usage

Generate:
1. Folder structure
2. TenantProvider
3. API client wrapper with automatic tenant header
4. Patients page
5. Create Patient form
6. State handling strategy
7. Explain design reasoning

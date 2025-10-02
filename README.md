
# OdontoPRO

**OdontoPRO** is a modern SaaS platform designed for dental clinics, providing a clean interface and essential features for managing professionals, patients, and appointments. Built with **Next.js**, **Prisma ORM**, and **NextAuth** for authentication, the project focuses on productivity, security, and scalability.

---

## Features

### Authentication & Users
- Login and registration via **OAuth** (currently GitHub).
- Session management with **NextAuth** and **SessionAuthProvider**.
- Database integration for persistent user storage.

### Dashboard
- Responsive layout with a **collapsible sidebar** and sub-route navigation.
- Modular structure ready for new management modules.
- Professionals showcase and future analytics components.

### Landing Page
- **Hero Component** highlighting the clinic or service.
- Professionals showcase section.
- Footer with contact information.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)  
- **Styling:** TailwindCSS + [Shadcn/ui](https://ui.shadcn.com/) components  
- **Authentication:** [NextAuth](https://next-auth.js.org/) with OAuth (GitHub)  
- **Database:** PostgreSQL/MySQL (via Prisma ORM)  
- **ORM:** [Prisma](https://www.prisma.io/)  
- **UI Components:** Radix UI (`@radix-ui/react-dialog`)  

---

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/odontopro.git
cd odontopro
````

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables (`.env.local`):

```
DATABASE_URL=...
GITHUB_ID=...
GITHUB_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

4. Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the application:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to access OdontoPRO.

---

## Next Steps

* Complete authentication for patients and professionals.
* Add appointment and dental schedule management.
* Create analytical dashboards with charts and reports.
* Integrate payments and notifications.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'feat: description'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

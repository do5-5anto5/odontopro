import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: null | boolean | string;
  image?: string;
  stripe_customer_id?: string;
  times: [];
  adress: ?string;
  phone?: string;
  status: boolean;
  createdAt: string,
  updatedAt: string
}

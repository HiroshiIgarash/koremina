import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const proxy = NextAuth(authConfig).auth;

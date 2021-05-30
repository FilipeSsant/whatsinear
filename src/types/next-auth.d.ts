import "next-auth";

interface UserProps {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  id: string;
  accessToken: string;
}
declare module "next-auth" {
  interface Session {
    user: UserProps;
  }

  interface User extends UserProps {}
}

declare module "next-auth/jwt" {
  interface JWT extends UserProps {}
}

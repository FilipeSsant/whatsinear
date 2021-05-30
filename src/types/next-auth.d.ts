import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      picture: string;
      sub: string;
      id: string;
      accessToken: string;
    };
  }
}

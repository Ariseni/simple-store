import "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    expires_on: number;
    picture: string;
    exp: number;
    iat: number;
    jti: string;
  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
}

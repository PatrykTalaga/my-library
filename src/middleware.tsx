import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token?.role);

    if (
      req.nextUrl.pathname.startsWith("/addBook") &&
      req.nextauth.token?.role != "Admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      //authorize if there is some kind of token
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/addBook"] };

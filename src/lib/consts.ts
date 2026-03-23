export const TAGLINE: string = "Researcher • Hacker • Leader";
export const OG_TITLE = "Jack Hogan";
export const OG_DESCRIPTION =
  "Working to create concise, creative solutions to the problems the world faces and having fun while doing so.";
export const IS_PROD = process.env.PUBLIC_VERCEL_ENV === "production";
export const IS_PREVIEW = process.env.PUBLIC_VERCEL_ENV === "preview";
export const SITE_URL = IS_PROD
  ? "https://jackhogan.me/"
  : IS_PREVIEW
    ? `https://${process.env.PUBLIC_VERCEL_BRANCH_URL}`
    : "http://localhost:4321/";
export const BLOG_NAME = "Jack Hogan's Blog";

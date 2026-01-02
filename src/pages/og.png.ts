import { TAGLINE } from "@lib/consts";
import { getOgImage } from "@lib/og";

export async function GET() {
  return getOgImage({
    title: "Jack Hogan",
    subtitle: TAGLINE.toUpperCase(),
    size: "big",
  });
}

import { ImageResponse } from "@vercel/og";
import ogBase from "@assets/ogbase.png?data-url";
import dmSans from "@assets/dm-sans-latin-400-normal.woff?arraybuffer";
import dmSerifDisplay from "@assets/dm-serif-display-latin-400-normal.woff?arraybuffer";

interface Props {
  size?: "big" | "small";
  title: string;
  subtitle: string;
}

export function getOgImage({ size = "small", subtitle, title }: Props) {
  const html = (
    <div
      tw="flex flex-col justify-end items-start w-[1200px] h-[630px] p-6"
      style={{ backgroundImage: `url(${ogBase})` }}
    >
      <h1 tw={`text-${size === "big" ? "9" : "8"}xl font-bold mb-2`}>
        {title}
      </h1>
      <p
        tw={`text-${size === "big" ? "6" : "5"}xl`}
        style={{ fontFamily: "DM Sans" }}
      >
        {subtitle}
      </p>
    </div>
  );

  return new ImageResponse(html, {
    fonts: [
      {
        name: "DM Serif Display",
        data: dmSerifDisplay,
      },
      {
        name: "DM Sans",
        data: dmSans,
      },
    ],
  });
}

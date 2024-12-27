import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Year",
  description: "Celebrate the new year with us",
};

const fontFamily = "Katex_Main"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <div className="relative h-full w-full" style={{ fontFamily: fontFamily }}><div className="absolute h-full w-full  bg-[radial-gradient(#686767_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        {children}
        </div>
      </body>
    </html>
  );
}

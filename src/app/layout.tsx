import "@/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'

import { GeistSans } from "geist/font/sans";
import { TopNav } from "./_components/topnav";

export const metadata = {
  title: "image-gallery",
  description: "...qwerty",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className={`font-sans flex flex-col gap-4`}>
          <TopNav/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


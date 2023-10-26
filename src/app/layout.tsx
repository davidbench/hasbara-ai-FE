import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { H } from "@highlight-run/node";
import { HighlightInit } from "@highlight-run/next/client";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SessionProvider } from "../contexts/SessionContext";
import { cn } from "@/lib/utils";

const nondev_env = process.env.NODE_ENV !== "development";

if (nondev_env) {
  H.init({ projectID: "jd4x3w7g" });
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hasbara.ai",
  description: "AI in the service of truth",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

//logger.info({ key: 'new_init' }, 'new init')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {nondev_env && (
        <HighlightInit
          projectId={"jd4x3w7g"}
          serviceName="hasbara-ai-client"
          tracingOrigins
          networkRecording={{
            enabled: true,
            recordHeadersAndBody: true,
            urlBlocklist: [],
          }}
        />
      )}
      <html lang="en">
        <body className={cn(inter.className, "bg-slate-50")}>
          {children}
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}

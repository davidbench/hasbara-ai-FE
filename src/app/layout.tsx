import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
//import { H } from "@highlight-run/node";
import { HighlightInit } from "@highlight-run/next/client";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { SessionProvider } from "../contexts/SessionContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const FE_ENV = process.env.FE_ENV || process.env.NEXT_PUBLIC_FE_ENV ||
  (function() {throw new Error("Missing env variable FE_ENV. Possible values: LOCAL, DEV, PROD")})()

const prod_env = FE_ENV == "PROD";

if (prod_env) {
  //H.init({ projectID: "jd4x3w7g" });
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
      {prod_env && (
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
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "bg-slate-50 dark:bg-slate-950")}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}

import Celebration from "@/components/Data-Table/Celebration/celebration";
import Loader from "@/components/Loader/page";
import Navbar from "@/components/Navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/components/wrapper/next-auth-provider";
import { ThemeProvider } from "@/components/wrapper/theme-provider";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./(bare)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Modern College",
  description: "Generated by Naresh Bhosale",
};

export default async function RootLayout({
  children,
  teacher,
}: {
  children: React.ReactNode;
  teacher: React.ReactNode;
}) {
  const user = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      data-theme="dark"
      className="dark"
      style={{ colorScheme: "dark" }}
    >
      <link rel="shortcut icon" href="biglogo.png" type="image/x-icon" />
      <body
        suppressHydrationWarning={true}
        className={cn(inter.className, "flex flex-col h-[100dvh] ")}
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Loader />
            <Navbar />
            <div className="mt-[90px] lg:[100px">
              <Celebration />
              {user !== null
                ? user?.user?.role === "Teacher" &&
                  user?.user?.academics !== null &&
                  user?.user?.personalInfo !== null
                  ? null
                  : teacher
                : ""}

              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

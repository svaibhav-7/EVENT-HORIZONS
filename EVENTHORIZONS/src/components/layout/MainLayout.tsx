
import React, { ReactNode, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useTheme();
  
  useEffect(() => {
    // Apply theme class to body
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

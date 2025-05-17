// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata = {
  title: "Velocity AI", 
  description: "Website Builder",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable}>
      <ConvexClientProvider >
        <Provider>
          {children}
          </Provider>
      </ConvexClientProvider >
      </body>
    </html>
  );host:3000
  
}

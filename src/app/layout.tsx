import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import Header from "./nav/header"; 
import PageTransition from './PageTransition';
import CustomCursor from './CustomCursor';
import IntroWrapper from './IntroWrapper';

export const metadata: Metadata = {
  title: "Identity Theft",
  description: "School Project regarding Identity Theft Prevention, by James Rafty Libago alias Mizumi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN */}
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntroWrapper>
          <CustomCursor />
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          
          <audio autoPlay loop className="hidden">
            <source src="https://cdn.pixabay.com/download/audio/2023/03/06/audio_2395079963.mp3?filename=glitchy-sci-fi-tech-background-141351.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </IntroWrapper>
      </body>
    </html>
  );
}
import type { Metadata } from 'next';
import './globals.scss';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { TimerProvider } from './context/TimerContext';

export const metadata: Metadata = {
  title: 'Trivia',
  description: 'Generated by create next app',
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <UserProvider>
            <TimerProvider>
              {children}
            </TimerProvider>
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}



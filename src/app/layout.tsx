import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'SeksUzivo',
  description: 'Pregledaj live Cam modele.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
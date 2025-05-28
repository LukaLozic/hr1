import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Seks uživo – Pogledaj gole djevojke, muškarce i parove na kamerama',
  description: 'Gledaj seksi djevojke, muškarce i parove uživo! Klikni, izaberi i uživaj u vrućim showovima. Gledaj seks uživo odmah!',
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
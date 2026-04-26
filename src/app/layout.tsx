import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Shop',
  description: 'E-commerce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        <AuthProvider>
          <Navbar />
          <main className="w-full pb-20 md:pb-8 pt-4 md:pt-6">
            <div className="w-full max-w-[1400px] mx-auto px-2 md:px-6">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
// apps/frontend/app/[locale]/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lilo Market - ბაზარი ლილოში',
  description: 'ლილოს ბაზრის ციფრული პლატფორმა',
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode,
  params: {locale: string}
}) {
  const messages = await getMessages()
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary-600">Lilo Market</div>
                  <nav className="hidden md:flex space-x-8">
                    <a href="/" className="text-gray-700 hover:text-primary-600">მთავარი</a>
                    <a href="/catalog" className="text-gray-700 hover:text-primary-600">კატალოგი</a>
                    <a href="/sellers" className="text-gray-700 hover:text-primary-600">გამყიდველები</a>
                    <a href="/about" className="text-gray-700 hover:text-primary-600">ჩვენ შესახებ</a>
                  </nav>
                  <div className="flex items-center space-x-4">
                    <a href="/auth/login" className="text-gray-700 hover:text-primary-600">შესვლა</a>
                    <a href="/auth/register" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">რეგისტრაცია</a>
                  </div>
                </div>
              </div>
            </header>
            <main>{children}</main>
            <footer className="bg-gray-800 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Lilo Market</h3>
                    <p className="text-gray-400">ლილოს ბაზრის ციფრული პლატფორმა თქვენთვის მაქსიმალური სიმარტივისა და სიმართლისთვის</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">სწრაფი ბმულები</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="/" className="hover:text-white">მთავარი</a></li>
                      <li><a href="/catalog" className="hover:text-white">კატალოგი</a></li>
                      <li><a href="/sellers" className="hover:text-white">გამყიდველები</a></li>
                      <li><a href="/about" className="hover:text-white">ჩვენ შესახებ</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">კონტაქტი</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>თბილისი, ლილოს ბაზარი</li>
                      <li>+995 32 123 4567</li>
                      <li>info@lilomarket.ge</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">ენები</h4>
                    <div className="flex space-x-2">
                      <a href="/ka" className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">ქართული</a>
                      <a href="/en" className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">English</a>
                      <a href="/ru" className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">Русский</a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2023 Lilo Market. ყველა უფლება დაცულია.</p>
                </div>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
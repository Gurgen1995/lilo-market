// apps/frontend/app/[locale]/page.tsx
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Home')
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ლილოს ბაზარის ციფრული პლატფორმა</h1>
          <p className="text-xl mb-8 opacity-90">აღმოაჩინეთ უახლოესი პავილიონები, შეუკვეთეთ პროდუქტები და მიიღეთ სწრაფად თქვენთვის სასურველ ადგილას</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/catalog" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">დაწყება</a>
            <a href="/sellers" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">გამყიდველებისთვის</a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">რატომ არის Lilo Market საუკეთესო არჩევანი?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">პავილიონების რუკა</h3>
            <p className="text-gray-600">იპოვეთ სასურველი პროდუქტები პავილიონების რუკის გამოყენებით და მიიღეთ სწრაფად</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">ონლაინ შეკვეთა</h3>
            <p className="text-gray-600">შეუკვეთეთ პროდუქტები პირდაპირ პლატფორმაზე და მიიღეთ სასურველ დროს</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">სპეციალური შეთავაზებები</h3>
            <p className="text-gray-600">მიიღეთ განსაკუთრებული ფასდაკლებები და აქციები თქვენი საყვარელი გამყიდველებისგან</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">პოპულარული კატეგორიები</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'ბოსტნეული', icon: '🍎' },
            { name: 'თევზი და ზღვის პროდუქტები', icon: '🐟' },
            { name: 'ნაყინი და რძის პროდუქტები', icon: '🧀' },
            { name: 'ფურნითული და საკონდიტრო', icon: '🍞' }
          ].map((category, index) => (
            <a key={index} href={`/catalog?category=${index}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl">
                {category.icon}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-center">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
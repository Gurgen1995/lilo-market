// apps/frontend/app/[locale]/catalog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Star } from 'lucide-react'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    building: '',
    rating: 0
  })
  
  useEffect(() => {
    // In a real app, this would be an API call
    const mockProducts = [
      {
        id: '1',
        title: 'ტომატი სველი',
        price: 2.50,
        discount: 0.2,
        rating: 4.5,
        image: 'https://placehold.co/300x300?text=ტომატი',
        seller: 'მაღაზია 1',
        pavilion: { building: 'A1', row: 'რიგი 1', spot: 'ადგილი 5' }
      },
      {
        id: '2',
        title: 'ბანანი ეკვადორული',
        price: 3.20,
        discount: 0,
        rating: 4.8,
        image: 'https://placehold.co/300x300?text=ბანანი',
        seller: 'მაღაზია 2',
        pavilion: { building: 'A2', row: 'რიგი 2', spot: 'ადგილი 3' }
      },
      {
        id: '3',
        title: 'ყველი სულგუნი',
        price: 8.75,
        discount: 0.15,
        rating: 4.2,
        image: 'https://placehold.co/300x300?text=ყველი',
        seller: 'მაღაზია 3',
        pavilion: { building: 'B1', row: 'რიგი 1', spot: 'ადგილი 7' }
      }
    ]
    setProducts(mockProducts)
  }, [])
  
  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">პროდუქტების კატალოგი</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Filter className="mr-2" /> ფილტრები
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ძებნა</label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="პროდუქტის ძებნა..."
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">კატეგორია</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">ყველა კატეგორია</option>
                  <option value="1">ბოსტნეული</option>
                  <option value="2">ფრინველი და ზღვის პროდუქტები</option>
                  <option value="3">ნაყინი და რძის პროდუქტები</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ფასი</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="მინ"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="მაქს"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">კორპუსი</label>
                <select
                  value={filters.building}
                  onChange={(e) => handleFilterChange('building', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">ყველა კორპუსი</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">რეიტინგი</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 cursor-pointer ${
                        star <= filters.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleFilterChange('rating', star)}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {filters.rating > 0 ? `${filters.rating}+ ვარსკვლავი` : 'ნებისმიერი'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" /> როგორ მივდივართ?
            </h2>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
              <span className="text-gray-500">ბაზრის რუკა</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              იპოვეთ უახლოესი პავილიონები რუკის გამოყენებით და მიიღეთ თქვენი შეკვეთა სწრაფად.
            </p>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              ნაპოვნია {products.length} პროდუქტი
            </p>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>სორტირება</option>
              <option>ფასის მიხედვით</option>
              <option>პოპულარობის მიხედვით</option>
              <option>რეიტინგის მიხედვით</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      -{Math.round(product.discount * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= product.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      {product.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">
                            ₾{(product.price * (1 - product.discount)).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₾{product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          ₾{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.pavilion.building}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    გამყიდველი: {product.seller}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                      დამატება კალათაში
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
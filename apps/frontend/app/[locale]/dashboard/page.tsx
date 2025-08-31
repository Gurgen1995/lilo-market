// apps/frontend/app/[locale]/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Store, 
  Settings, 
  Users, 
  Package, 
  BarChart3,
  LogOut
} from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const router = useRouter()
  
  const handleLogout = () => {
    // In a real app, this would be an API call
    router.push('/auth/login')
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary-600">Lilo Market</div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-primary-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                გასვლა
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-64 mb-6 md:mb-0 md:mr-8">
          <nav className="bg-white rounded-lg shadow p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-2 rounded-md ${
                    activeTab === 'overview' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  მიმოხილვა
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-2 rounded-md ${
                    activeTab === 'orders' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  შეკვეთები
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-4 py-2 rounded-md ${
                    activeTab === 'products' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  პროდუქტები
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center px-4 py-2 rounded-md ${
                    activeTab === 'analytics' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  ანალიტიკა
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 rounded-md ${
                    activeTab === 'settings' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  პარამეტრები
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">
              {activeTab === 'overview' && 'მიმოხილვა'}
              {activeTab === 'orders' && 'შეკვეთები'}
              {activeTab === 'products' && 'პროდუქტები'}
              {activeTab === 'analytics' && 'ანალიტიკა'}
              {activeTab === 'settings' && 'პარამეტრები'}
            </h1>
            
            {activeTab === 'overview' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-primary-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary-800 mb-2">შეკვეთები</h3>
                    <p className="text-3xl font-bold text-primary-600">24</p>
                    <p className="text-sm text-primary-700">ბოლო 30 დღეში</p>
                  </div>
                  <div className="bg-secondary-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-secondary-800 mb-2">გაყიდვები</h3>
                    <p className="text-3xl font-bold text-secondary-600">₾1,248</p>
                    <p className="text-sm text-secondary-700">ბოლო 30 დღეში</p>
                  </div>
                  <div className="bg-accent-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-accent-800 mb-2">პროდუქტები</h3>
                    <p className="text-3xl font-bold text-accent-600">18</p>
                    <p className="text-sm text-accent-700">აქტიური</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">ბოლო შეკვეთები</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <p className="font-medium">შეკვეთა #{1000 + item}</p>
                          <p className="text-sm text-gray-600">2 პროდუქტი</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₾{(Math.random() * 50 + 10).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">მიმდინარე</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <p>შეკვეთების გვერდი</p>
              </div>
            )}
            
            {activeTab === 'products' && (
              <div>
                <p>პროდუქტების გვერდი</p>
              </div>
            )}
            
            {activeTab === 'analytics' && (
              <div>
                <p>ანალიტიკის გვერდი</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <p>პარამეტრების გვერდი</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
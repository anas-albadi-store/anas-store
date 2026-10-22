import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  
  // جلب المنتجات المميزة من قاعدة البيانات
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('is_active', true)
    .limit(8)

  return (
    <main className="min-h-screen p-4 md:p-8 bg-brand-dark">
      {/* الهيدر */}
      <header className="flex justify-between items-center mb-12 border-b border-brand-red/20 pb-4">
        <h1 className="text-3xl font-bold text-brand-red">ANAS ALBADI</h1>
        <Link href="/login" className="bg-brand-red hover:bg-red-700 px-6 py-2 rounded-full font-bold text-white transition">
          تسجيل الدخول
        </Link>
      </header>

      {/* قسم البطل (Hero) */}
      <section className="bg-gradient-to-r from-brand-dark to-brand-card p-10 rounded-2xl border border-brand-red/30 mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">متجر أنس البادي</h2>
        <p className="text-brand-gray text-lg mb-6">أفضل المنتجات الرقمية، شدات ببجي، ألماس فري فاير، واشتراكات مميزة.</p>
      </section>

      {/* شبكة المنتجات */}
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
        <Star className="text-brand-red" /> المنتجات المميزة
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-brand-card border border-gray-800 rounded-xl p-4 hover:border-brand-red transition group">
            <div className="h-40 bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
              {/* في حال لم تكن هناك صورة، نضع صورة افتراضية */}
              <img 
                src={product.images?.[0] || 'https://via.placeholder.com/400x300/141414/ff0000?text=No+Image'} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition" 
              />
            </div>
            <h4 className="font-bold text-lg mb-2 text-white">{product.name}</h4>
            <p className="text-brand-gray text-sm mb-4">{product.categories?.name || 'قسم عام'}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-brand-red">{product.price} ر.ع</span>
              <button className="bg-brand-red/10 text-brand-red p-2 rounded-lg hover:bg-brand-red hover:text-white transition">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
        
        {/* في حال كانت قاعدة البيانات فارغة */}
        {!products?.length && (
          <div className="col-span-full text-center py-10 bg-brand-card rounded-xl border border-gray-800">
            <p className="text-brand-gray text-lg">لا توجد منتجات حالياً. قم بإضافتها من لوحة الإدارة.</p>
          </div>
        )}
      </div>
    </main>
  )
      }

// apps/backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  await prisma.user.create({
    data: {
      email: 'admin@lilo.local',
      password: adminPassword,
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User',
      isVerified: true,
    },
  });

  // Create categories
  const categories = [
    { name: 'ბოსტნეული', description: 'ბოსტნეული და ბოსტნეულის პროდუქტები' },
    { name: 'ფრინველი და ზღვის პროდუქტები', description: 'ფრინველი და ზღვის პროდუქტები' },
    { name: 'ნაყინი და რძის პროდუქტები', description: 'ნაყინი და რძის პროდუქტები' },
    { name: 'ფურნითული და საკონდიტრო', description: 'ფურნითული და საკონდიტრო პროდუქტები' },
    { name: 'ხორცი და ნაყოფი', description: 'ხორცი და ნაყოფის პროდუქტები' },
    { name: 'სასმელები', description: 'სასმელები და სანახავი სასმელები' },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.create({
      data: cat,
    });
    createdCategories.push(category);
  }

  // Create sellers
  const sellers = [];
  for (let i = 1; i <= 20; i++) {
    const sellerPassword = await bcrypt.hash(`Seller${i}Pass!`, 10);
    const user = await prisma.user.create({
      data: {
        email: `seller${i}@lilo.local`,
        password: sellerPassword,
        role: 'SELLER',
        firstName: `Seller ${i}`,
        lastName: 'User',
        isVerified: true,
      },
    });

    const seller = await prisma.seller.create({
      data: {
        userId: user.id,
        storeName: `მაღაზია ${i}`,
        description: `მაღაზიის აღწერა ${i}`,
        pavilion: {
          building: `A${Math.ceil(i / 5)}`,
          row: `რიგი ${Math.ceil(i / 2)}`,
          spot: `ადგილი ${i}`,
        },
        phone: `+995 32 123 45${i.toString().padStart(2, '0')}`,
        email: `info${i}@store.ge`,
        isActive: true,
      },
    });

    sellers.push(seller);
  }

  // Create products
  const productTitles = [
    'ტომატი', 'მსხალი', 'ბადრიჯანი', 'სტაფილო', 'კიტრი',
    'ვაშლი', 'ბანანი', 'აპელსინი', 'მანდარინი', 'კივი',
    'ქათმის ხორცი', 'ღორის ხორცი', 'ცხვარის ხორცი', 'თევზი', 'კრევეტი',
    'რძე', 'ყველი', 'აგური', 'მაწონი', 'კარაქი',
    'ნამცხვარი', 'პური', 'ქარქარი', 'ხაჭაპური', 'ლობიო',
    'წყალი', 'ლიმონათი', 'ჩაი', 'კაფე', 'სოკო'
  ];

  const products = [];
  for (let i = 1; i <= 100; i++) {
    const sellerIndex = Math.floor(Math.random() * sellers.length);
    const categoryIndex = Math.floor(Math.random() * createdCategories.length);
    
    const product = await prisma.product.create({
      data: {
        title: `${productTitles[Math.floor(Math.random() * productTitles.length)]} ${i}`,
        description: `პროდუქტის დაწვრილებითი აღწერა ${i}`,
        price: parseFloat((Math.random() * 50 + 1).toFixed(2)),
        discount: Math.random() > 0.7 ? parseFloat((Math.random() * 0.3).toFixed(2)) : 0,
        stock: Math.floor(Math.random() * 100) + 10,
        categoryId: createdCategories[categoryIndex].id,
        sellerId: sellers[sellerIndex].id,
        photos: [`https://placehold.co/300x300?text=Product+${i}`],
        tags: ['ახალი', 'პოპულარული', 'სეზონური'].slice(0, Math.floor(Math.random() * 3) + 1),
        pickup: true,
        delivery: Math.random() > 0.5,
      },
    });

    products.push(product);
  }

  // Create reviews
  for (let i = 1; i <= 50; i++) {
    const productIndex = Math.floor(Math.random() * products.length);
    const userIndex = Math.floor(Math.random() * 10) + 1; // Use first 10 users as buyers
    
    // Create buyer user if not exists
    let buyerUser;
    try {
      buyerUser = await prisma.user.findUnique({
        where: { email: `buyer${userIndex}@lilo.local` }
      });
    } catch {
      const buyerPassword = await bcrypt.hash(`Buyer${userIndex}Pass!`, 10);
      buyerUser = await prisma.user.create({
        data: {
          email: `buyer${userIndex}@lilo.local`,
          password: buyerPassword,
          role: 'BUYER',
          firstName: `Buyer ${userIndex}`,
          lastName: 'User',
          isVerified: true,
        },
      });
    }

    await prisma.review.create({
      data: {
        userId: buyerUser.id,
        productId: products[productIndex].id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `ძალიან კარგი პროდუქტი! რეკომენდირებულია ${i}`,
      },
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
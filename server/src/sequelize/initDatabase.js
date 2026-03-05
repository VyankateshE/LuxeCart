import sequelize, { Product } from './models.js';

const sampleProducts = [
  {
    name: 'Noir Leather Tote',
    description: 'Handcrafted leather tote with brushed gold hardware.',
    price: 349.0,
    category: 'Bags',
    image_url:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    stock: 30,
    rating: 4.8,
  },
  {
    name: 'Velvet Evening Dress',
    description: 'Silhouette evening dress designed for statement moments.',
    price: 529.0,
    category: 'Apparel',
    image_url:
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80',
    stock: 22,
    rating: 4.7,
  },
  {
    name: 'Auric Chronograph',
    description: 'Swiss movement timepiece with sapphire crystal.',
    price: 1199.0,
    category: 'Watches',
    image_url:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
    stock: 12,
    rating: 4.9,
  },
  {
    name: 'Cashmere Wrap',
    description: 'Italian cashmere wrap in soft beige and gold threads.',
    price: 289.0,
    category: 'Accessories',
    image_url:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    stock: 40,
    rating: 4.6,
  },
  {
    name: 'Signature Fragrance',
    description: 'Luxury eau de parfum with amber and rose notes.',
    price: 180.0,
    category: 'Beauty',
    image_url:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    stock: 75,
    rating: 4.5,
  },
  {
    name: 'Monogram Heels',
    description: 'Premium heels with metallic detailing and comfort footbed.',
    price: 420.0,
    category: 'Footwear',
    image_url:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
    stock: 20,
    rating: 4.7,
  },
  {
    name: 'Imperial Silk Shirt',
    description: 'Tailored silk shirt with polished pearl buttons.',
    price: 260.0,
    category: 'Apparel',
    image_url:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    stock: 35,
    rating: 4.6,
  },
  {
    name: 'Aurelia Sunglasses',
    description: 'Oversized acetate frame with gold-plated temples.',
    price: 210.0,
    category: 'Accessories',
    image_url:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    stock: 50,
    rating: 4.4,
  },
  {
    name: 'Midnight Blazer',
    description: 'Structured blazer in premium wool blend for evening styling.',
    price: 610.0,
    category: 'Apparel',
    image_url:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    stock: 18,
    rating: 4.8,
  },
  {
    name: 'Regal Loafers',
    description: 'Italian leather loafers finished with brushed metal detail.',
    price: 390.0,
    category: 'Footwear',
    image_url:
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=900&q=80',
    stock: 28,
    rating: 4.7,
  },
  {
    name: 'Signature Cuff Set',
    description: 'Minimal cuff set in plated gold with matte black accents.',
    price: 175.0,
    category: 'Jewelry',
    image_url:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
    stock: 60,
    rating: 4.5,
  },
  {
    name: 'Atelier Travel Case',
    description: 'Compact leather travel case crafted for premium essentials.',
    price: 240.0,
    category: 'Bags',
    image_url:
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=900&q=80',
    stock: 26,
    rating: 4.6,
  },
];

export const initializeDatabase = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  await Promise.all(
    sampleProducts.map((product) =>
      Product.findOrCreate({
        where: { name: product.name },
        defaults: product,
      }),
    ),
  );

  console.log('Sample products synchronized.');
};

export default initializeDatabase;

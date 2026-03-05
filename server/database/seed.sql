INSERT INTO products (name, description, price, category, image_url, stock, rating)
VALUES
('Noir Leather Tote', 'Handcrafted leather tote with brushed gold hardware.', 349.00, 'Bags', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80', 30, 4.8),
('Velvet Evening Dress', 'Silhouette evening dress designed for statement moments.', 529.00, 'Apparel', 'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80', 22, 4.7),
('Auric Chronograph', 'Swiss movement timepiece with sapphire crystal.', 1199.00, 'Watches', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80', 12, 4.9),
('Cashmere Wrap', 'Italian cashmere wrap in soft beige and gold threads.', 289.00, 'Accessories', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', 40, 4.6),
('Signature Fragrance', 'Luxury eau de parfum with amber and rose notes.', 180.00, 'Beauty', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80', 75, 4.5),
('Monogram Heels', 'Premium heels with metallic detailing and comfort footbed.', 420.00, 'Footwear', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80', 20, 4.7),
('Imperial Silk Shirt', 'Tailored silk shirt with polished pearl buttons.', 260.00, 'Apparel', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', 35, 4.6),
('Aurelia Sunglasses', 'Oversized acetate frame with gold-plated temples.', 210.00, 'Accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80', 50, 4.4),
('Midnight Blazer', 'Structured blazer in premium wool blend for evening styling.', 610.00, 'Apparel', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80', 18, 4.8),
('Regal Loafers', 'Italian leather loafers finished with brushed metal detail.', 390.00, 'Footwear', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=900&q=80', 28, 4.7),
('Signature Cuff Set', 'Minimal cuff set in plated gold with matte black accents.', 175.00, 'Jewelry', 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80', 60, 4.5),
('Atelier Travel Case', 'Compact leather travel case crafted for premium essentials.', 240.00, 'Bags', 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=900&q=80', 26, 4.6)
ON CONFLICT DO NOTHING;

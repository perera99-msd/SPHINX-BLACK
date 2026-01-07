export const mockProducts = Array(12).fill().map((_, i) => ({
  _id: (i + 1).toString(),
  name: `Premium Black Hoodie ${i + 1}`,
  slug: `premium-black-hoodie-${i + 1}`,
  description: "Crafted from the finest organic cotton, this piece represents the pinnacle of minimalist luxury. Features include reinforced stitching, a relaxed fit, and our signature gold-threaded embroidery.",
  price: 89.99,
  discountPrice: i % 3 === 0 ? 69.99 : null,
  images: [
    { url: i % 2 === 0 ? "/public/men.jpg" : "/public/ladies.jpg" },
    { url: "/public/hero2.jpg" }
  ],
  category: { name: i % 2 === 0 ? 'Men' : 'Women', _id: i % 2 === 0 ? 'cat1' : 'cat2' },
  stock: 15,
  averageRating: 4.5,
  reviews: [],
  featured: i < 4,
  newArrival: i > 8,
}));

export const mockOrders = [
  { _id: 'ORD-001', customer: 'Alex Chen', date: '2023-10-15', total: 299.00, status: 'Delivered', items: 3 },
  { _id: 'ORD-002', customer: 'Sarah Jones', date: '2023-10-16', total: 150.50, status: 'Processing', items: 1 },
  { _id: 'ORD-003', customer: 'Mike Ross', date: '2023-10-16', total: 850.00, status: 'Shipped', items: 5 },
];
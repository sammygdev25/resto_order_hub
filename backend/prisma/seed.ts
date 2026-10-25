import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // A seeded database is never seeded twice (the image runs this on every boot with SEED_DEMO=1).
  if ((await prisma.user.count()) > 0 && process.env.SEED_FORCE !== '1') {
    console.log('Seed skipped: the database already has users (SEED_FORCE=1 seeds anyway).');
    return;
  }

  // Create demo user
  // The demo password is this project's own (SEED_DEMO_PASSWORD in backend/.env, made at generation, never shipped):
  // no generated app shares a known password. Without it there are no demo accounts and no demo data.
  const demoPassword = process.env.SEED_DEMO_PASSWORD || '';
  if (!demoPassword) {
    console.warn('[seed] SEED_DEMO_PASSWORD is not set: no demo accounts and no demo data.');
    return;
  }
  const hashedPassword = await bcrypt.hash(demoPassword, 10);
  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: { isStaff: true },
    create: {
      isStaff: true,
      username: 'demo',
      email: 'demo@example.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
    },
  });

  // Create demo staff user (staff, the same demo password)
  await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      username: 'staff',
      email: 'staff@example.com',
      password: hashedPassword,
      firstName: 'Demo',
      lastName: 'Staff',
      isStaff: true,
    },
  });

  // Domain seed data
  try {
    await prisma.category.create({ data: { name: 'Appetizers', description: 'Small plates and starters to share before your main course arrives' } });
    await prisma.category.create({ data: { name: 'Soups & Salads', description: 'Fresh greens and warm broths made with seasonal ingredients' } });
    await prisma.category.create({ data: { name: 'Pasta', description: 'Handmade and dried pasta dishes tossed in house-made sauces' } });
    await prisma.category.create({ data: { name: 'Pizza', description: 'Wood-fired pizzas with classic and specialty topping combinations' } });
    await prisma.category.create({ data: { name: 'Burgers & Sandwiches', description: 'Griddled burgers and stacked sandwiches served with crispy fries' } });
    await prisma.category.create({ data: { name: 'Seafood', description: 'Ocean-fresh fish and shellfish grilled, seared, or fried to order' } });
    await prisma.category.create({ data: { name: 'Steaks & Grill', description: 'Prime cuts of beef and grilled meats cooked to your liking' } });
    await prisma.category.create({ data: { name: 'Desserts', description: 'Sweet endings including cakes, pastries, and frozen treats' } });
    await prisma.category.create({ data: { name: 'Beverages', description: 'Soft drinks, juices, coffee, and specialty mocktails' } });
    await prisma.category.create({ data: { name: 'Vegetarian & Vegan', description: 'Plant-based dishes crafted with bold flavors and fresh produce' } });
  } catch (e) { console.warn('[seed] Category skipped:', e); }
  try {
    await prisma.menuItem.create({ data: { name: 'Crispy Calamari', description: 'Lightly fried calamari rings served with spicy marinara dipping sauce', price: 19.99, categoryId: 1, imageUrl: '/img/menu_items/crispy-calamari.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Caesar Salad', description: 'Romaine lettuce tossed with parmesan, croutons, and creamy Caesar dressing', price: 29.99, categoryId: 2, imageUrl: '/img/menu_items/caesar-salad.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Truffle Mushroom Risotto Pasta', description: 'Creamy arborio pasta blend with wild mushrooms and shaved truffle', price: 39.99, categoryId: 3, imageUrl: '/img/menu_items/truffle-mushroom-risotto-pasta.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Margherita Pizza', description: 'Classic pizza topped with fresh mozzarella, basil, and san marzano tomatoes', price: 49.99, categoryId: 4, imageUrl: '/img/menu_items/margherita-pizza.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Classic Cheeseburger', description: 'Juicy beef patty with cheddar, lettuce, tomato, and house special sauce', price: 59.99, categoryId: 5, imageUrl: '/img/menu_items/classic-cheeseburger.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Grilled Salmon Fillet', description: 'Atlantic salmon grilled with lemon butter and served with asparagus', price: 69.99, categoryId: 6, imageUrl: '/img/menu_items/grilled-salmon-fillet.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Ribeye Steak', description: '12-ounce ribeye grilled to perfection with garlic herb butter', price: 79.99, categoryId: 7, imageUrl: '/img/menu_items/ribeye-steak.svg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream', price: 89.99, categoryId: 8, imageUrl: '/img/menu_items/chocolate-lava-cake.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Fresh Mango Lemonade', description: 'Refreshing blend of mango puree, fresh lemon juice, and sparkling water', price: 99.99, categoryId: 9, imageUrl: '/img/menu_items/fresh-mango-lemonade.jpg', isAvailable: true } });
    await prisma.menuItem.create({ data: { name: 'Grilled Vegetable Buddha Bowl', description: 'Quinoa bowl with grilled vegetables, chickpeas, and tahini dressing', price: 109.99, categoryId: 10, imageUrl: '/img/menu_items/grilled-vegetable-buddha-bowl.jpg', isAvailable: true } });
  } catch (e) { console.warn('[seed] MenuItem skipped:', e); }
  try {
    await prisma.order.create({ data: { userId: 1, totalAmount: 19.99, status: 'active', stripePaymentIntentId: '1' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 29.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 39.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 49.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 59.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 69.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 79.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 89.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 99.99, status: 'active', stripePaymentIntentId: '2' } });
    await prisma.order.create({ data: { userId: 2, totalAmount: 109.99, status: 'active', stripePaymentIntentId: '2' } });
  } catch (e) { console.warn('[seed] Order skipped:', e); }
  try {
    await prisma.orderItem.create({ data: { orderId: 1, menuItemId: 1, quantity: 10, price: 19.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 20, price: 29.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 30, price: 39.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 40, price: 49.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 50, price: 59.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 60, price: 69.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 70, price: 79.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 80, price: 89.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 90, price: 99.99 } });
    await prisma.orderItem.create({ data: { orderId: 2, menuItemId: 2, quantity: 100, price: 109.99 } });
  } catch (e) { console.warn('[seed] OrderItem skipped:', e); }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

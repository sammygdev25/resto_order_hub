import { useEffect, useState } from 'react';
import HomeHero from '../components/HomeHero';
import HomeFeatured from '../components/HomeFeatured';
import HomeCategories from '../components/HomeCategories';
import HomeAbout from '../components/HomeAbout';
import HomeCta from '../components/HomeCta';
import { useCart } from '../contexts/CartContext';
import { getMenuItemList, getCategoryList } from '../api';
import type { MenuItem, Category } from '../types';

export default function HomePage() {
  const { addItem } = useCart();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      try {
        const [menuItems, cats] = await Promise.all([
          getMenuItemList(),
          getCategoryList(),
        ]);
        if (!active) return;
        const available = menuItems.filter((item) => item.isAvailable !== false);
        setItems(available.slice(0, 8));
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const featuredImage = items.find((item) => item.imageUrl)?.imageUrl;

  function handleAddToCart(item: MenuItem) {
    addItem(item, 1);
  }

  return (
    <div className="ds-stack-lg">
      <HomeHero imageUrl={featuredImage} />
      <HomeFeatured items={items} loading={loading} onAddToCart={handleAddToCart} />
      <HomeCategories categories={categories} />
      <HomeAbout />
      <HomeCta />
    </div>
  );
}
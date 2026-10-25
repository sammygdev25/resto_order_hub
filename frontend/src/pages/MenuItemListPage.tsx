import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMenuItemList, getCategoryList } from '../api';
import { useCart } from '../contexts/CartContext';
import type { MenuItem, Category } from '../types';
import MenuItemListHeader from '../components/MenuItemListHeader';
import MenuItemListFilters from '../components/MenuItemListFilters';
import MenuItemListGrid from '../components/MenuItemListGrid';
import MenuItemListPagination from '../components/MenuItemListPagination';

const PAGE_SIZE = 9;

export default function MenuItemListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([getMenuItemList(), getCategoryList()])
      .then(([menuItems, cats]) => {
        if (!active) return;
        setItems(menuItems);
        setCategories(cats);
      })
      .catch((err) => console.error('[MenuItemListPage] Error:', err))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const param = searchParams.get('category') || '';
    setSelectedCategory(param);
  }, [searchParams]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      setSelectedCategory(value);
      setCurrentPage(1);
      if (value) {
        setSearchParams({ category: value });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setSortBy('name');
    setCurrentPage(1);
    setSelectedCategory('');
    setSearchParams({});
  }, [setSearchParams]);

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      addItem(item, 1);
    },
    [addItem]
  );

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => item.isAvailable);

    if (selectedCategory) {
      result = result.filter((item) => String(item.categoryId) === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
      );
    }

    const sorted = [...result];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-asc') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return sorted;
  }, [items, selectedCategory, searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  return (
    <div className="ds-stack-lg">
      <MenuItemListHeader resultCount={filteredItems.length} loading={loading} />
      <MenuItemListFilters
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <MenuItemListGrid
        items={pagedItems}
        loading={loading}
        onAddToCart={handleAddToCart}
        onClearFilters={handleClearFilters}
      />
      <MenuItemListPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
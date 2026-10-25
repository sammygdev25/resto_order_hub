import { Section } from '../components/ui';
import { Icon } from '../components/icons';
import type { Category } from '../types';

export interface MenuItemListFiltersProps {
  categories: Category[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function MenuItemListFilters({
  categories,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: MenuItemListFiltersProps) {
  return (
    <Section tight>
      <div className="ds-filters">
        <div className="ds-field">
          <label className="ds-label" htmlFor="menu-search">
            Search the menu
          </label>
          <div className="ds-cluster" style={{ position: 'relative' }}>
            <Icon name="search" size={18} />
            <input
              id="menu-search"
              className="input"
              type="text"
              placeholder="Search dishes, like margherita or tacos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="menu-category">
            Category
          </label>
          <select
            id="menu-category"
            className="input"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="menu-sort">
            Sort by
          </label>
          <select
            id="menu-sort"
            className="input"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>
    </Section>
  );
}
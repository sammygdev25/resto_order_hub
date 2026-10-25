import type { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

function CategoryTabs({ categories, activeCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="ds-cluster" role="tablist" aria-label="Menu categories">
      <button
        type="button"
        role="tab"
        aria-selected={activeCategory === null}
        onClick={() => onSelectCategory(null)}
        className="btn"
        style={{
          borderRadius: 'var(--radius-lg, 999px)',
          background: activeCategory === null ? 'var(--color-primary)' : 'var(--color-surface)',
          color: activeCategory === null ? '#fff' : 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
      >
        All Dishes
      </button>
      {categories.map((category) => {
        const isActive = activeCategory?.id === category.id;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(category)}
            className="btn"
            style={{
              borderRadius: 'var(--radius-lg, 999px)',
              background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
              color: isActive ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryTabs;
export { CategoryTabs };
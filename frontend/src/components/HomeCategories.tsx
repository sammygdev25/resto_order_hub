import { Section, Grid, Card, CardBody, CardTitle, CardMeta } from '../components/ui';
import { Icon } from '../components/icons';
import type { Category } from '../types';

interface HomeCategoriesProps {
  categories: Category[];
}

const CATEGORY_ICONS: Record<string, string> = {
  starters: 'sparkle',
  appetizers: 'sparkle',
  mains: 'package',
  entrees: 'package',
  desserts: 'heart',
  drinks: 'coffee',
  beverages: 'coffee',
  sides: 'grid',
  salads: 'leaf',
};

function iconFor(name: string) {
  const key = name.toLowerCase();
  for (const k of Object.keys(CATEGORY_ICONS)) {
    if (key.includes(k)) return CATEGORY_ICONS[k] as any;
  }
  return 'tag';
}

export default function HomeCategories({ categories }: HomeCategoriesProps) {
  if (!categories || categories.length === 0) {
    return (
      <Section
        eyebrow="How it works"
        title="From our kitchen to your table"
        subtitle="Three simple steps between browsing the menu and your first bite."
      >
        <Grid size="sm" cols={3}>
          <Card>
            <CardBody>
              <Icon name="search" size={28} />
              <CardTitle>Browse the menu</CardTitle>
              <CardMeta>Explore our dishes, made fresh daily with quality ingredients.</CardMeta>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Icon name="cart" size={28} />
              <CardTitle>Build your order</CardTitle>
              <CardMeta>Add your favorites to the cart and check out securely.</CardMeta>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Icon name="truck" size={28} />
              <CardTitle>Enjoy your meal</CardTitle>
              <CardMeta>We prepare and send your order out, piping hot.</CardMeta>
            </CardBody>
          </Card>
        </Grid>
      </Section>
    );
  }

  return (
    <Section
      eyebrow="Explore"
      title="Browse by category"
      subtitle="From sizzling starters to indulgent desserts, find exactly what you're craving."
    >
      <Grid size="sm" cols={3}>
        {categories.map((category) => (
          <Card key={category.id} to={`/menu-items?category=${category.id}`}>
            <CardBody>
              <Icon name={iconFor(category.name) as any} size={28} />
              <CardTitle>{category.name}</CardTitle>
              {category.description && <CardMeta>{category.description}</CardMeta>}
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Media, Price, Badge, SkeletonCards, EmptyState, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { MenuItem } from '../types';

interface MenuItemListGridProps {
  items: MenuItem[];
  loading: boolean;
  onAddToCart: (item: MenuItem) => void;
  onClearFilters?: () => void;
}

export default function MenuItemListGrid({ items, loading, onAddToCart, onClearFilters }: MenuItemListGridProps) {
  if (loading) {
    return (
      <Section title="Our Menu" tight>
        <SkeletonCards count={6} />
      </Section>
    );
  }

  if (items.length === 0) {
    return (
      <Section title="Our Menu" tight>
        <EmptyState
          icon="package"
          title="No dishes found"
          text="We couldn't find anything matching your search. Try a different category or clear your filters."
          action={
            onClearFilters ? (
              <Button variant="primary" onClick={onClearFilters}>
                Clear filters
              </Button>
            ) : undefined
          }
        />
      </Section>
    );
  }

  return (
    <Section title="Our Menu" subtitle="Fresh dishes made to order" tight>
      <Grid size="md" cols={3}>
        {items.map((item) => (
          <Card key={item.id}>
            <Media
              src={item.imageUrl}
              alt={item.name}
              ratio="wide"
              badge={!item.isAvailable ? 'Sold out' : undefined}
            />
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              {item.description && <CardMeta>{item.description}</CardMeta>}
              <CardFooter>
                <Price value={item.price} />
                {item.isAvailable ? (
                  <Button variant="primary" onClick={() => onAddToCart(item)}>
                    <Icon name="cart" size={16} /> Add to cart
                  </Button>
                ) : (
                  <Badge tone="neutral">Unavailable</Badge>
                )}
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
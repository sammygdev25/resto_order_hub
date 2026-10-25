import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Price, Media, Badge, Button, SkeletonCards, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';
import type { MenuItem } from '../types';

interface HomeFeaturedProps {
  items: MenuItem[];
  loading?: boolean;
  onAddToCart: (item: MenuItem) => void;
}

export default function HomeFeatured({ items, loading, onAddToCart }: HomeFeaturedProps) {
  return (
    <Section
      eyebrow="Crowd favorites"
      title="Featured dishes"
      subtitle="Hand-picked plates our kitchen is firing up most tonight"
    >
      {loading ? (
        <SkeletonCards count={8} />
      ) : items.length === 0 ? (
        <EmptyState
          icon="package"
          title="No featured dishes yet"
          text="Check back soon — our chefs are plating up something new."
          action={<Button to="/menu-items">Browse full menu</Button>}
        />
      ) : (
        <Grid size="lg" cols={4}>
          {items.slice(0, 8).map((item) => (
            <Card key={item.id} to="/menu-items">
              <Media
                src={item.imageUrl}
                alt={item.name}
                ratio="square"
                badge={!item.isAvailable ? 'Sold out' : undefined}
              />
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.description && (
                  <CardMeta>{item.description}</CardMeta>
                )}
                <CardFooter>
                  <Price value={item.price} />
                  {item.isAvailable ? (
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToCart(item);
                      }}
                    >
                      <Icon name="cart" size={16} /> Add
                    </Button>
                  ) : (
                    <Badge tone="neutral">Unavailable</Badge>
                  )}
                </CardFooter>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Section>
  );
}
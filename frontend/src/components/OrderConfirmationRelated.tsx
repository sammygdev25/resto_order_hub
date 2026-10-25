import { Section, Grid, Card, CardBody, CardTitle, CardMeta, CardFooter, Price, Media, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { MenuItem } from '../types';

interface OrderConfirmationRelatedProps {
  items: MenuItem[];
  onAddToCart?: (menuItem: MenuItem) => void;
}

export default function OrderConfirmationRelated({ items, onAddToCart }: OrderConfirmationRelatedProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const related = items.slice(0, 6);

  return (
    <Section
      eyebrow="You might also like"
      title="More from our menu"
      subtitle="A few dishes other guests often add to their order."
    >
      <Grid size="sm">
        {related.map((item) => (
          <Card key={item.id}>
            <Media src={item.imageUrl} alt={item.name} ratio="square" />
            <CardBody>
              <CardTitle>{item.name}</CardTitle>
              {item.description && <CardMeta>{item.description}</CardMeta>}
              <CardFooter>
                <Price value={item.price} />
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => onAddToCart?.(item)}
                  disabled={!item.isAvailable}
                >
                  <Icon name="plus" size={16} />
                  Add to order
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
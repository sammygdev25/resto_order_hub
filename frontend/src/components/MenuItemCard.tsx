import type { MenuItem } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Price, Media, Button, Badge } from './ui';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number) => void;
}

function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const unavailable = !item.isAvailable;

  return (
    <Card className="ds-card">
      <Media
        src={item.imageUrl ? item.imageUrl : ''}
        alt={item.name}
        ratio="wide"
        badge={unavailable ? 'Sold out' : item.category?.name}
      />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.description && <CardMeta>{item.description}</CardMeta>}
        <CardFooter>
          <Price value={item.price} />
          {unavailable ? (
            <Badge tone="neutral">Unavailable</Badge>
          ) : (
            <Button
              variant="primary"
              onClick={() => onAddToCart(item, 1)}
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </CardBody>
    </Card>
  );
}

export default MenuItemCard;
export { MenuItemCard };
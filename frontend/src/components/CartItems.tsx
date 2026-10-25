import { Section, Media, Button, EmptyState, Stack } from '../components/ui';
import { Icon } from '../components/icons';
import type { CartItem } from '../contexts/CartContext';

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (menuItemId: number, quantity: number) => void;
  onRemove: (menuItemId: number) => void;
}

export default function CartItems({ items, onUpdateQuantity, onRemove }: CartItemsProps) {
  if (items.length === 0) {
    return (
      <Section title="Your order" tight>
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          text="Looks like you haven't added anything from the menu yet."
          action={<Button to="/menu-items">Browse the menu</Button>}
        />
      </Section>
    );
  }

  return (
    <Section title="Your order" tight>
      <Stack gap="md">
        {items.map(({ menuItem, quantity }) => (
          <div key={menuItem.id} className="ds-card ds-between">
            <Stack gap="sm" align="center" className="ds-cluster">
              <Media
                src={menuItem.imageUrl}
                alt={menuItem.name}
                ratio="square"
                badge={!menuItem.isAvailable ? 'Unavailable' : undefined}
              />
              <Stack gap="xs">
                <span className="ds-card-title">{menuItem.name}</span>
                <span className="ds-card-meta">${Number(menuItem.price).toFixed(2)} each</span>
              </Stack>
            </Stack>

            <Stack gap="sm" align="center" className="ds-cluster">
              <Button
                variant="ghost"
                size="md"
                aria-label={`Decrease quantity of ${menuItem.name}`}
                onClick={() => onUpdateQuantity(menuItem.id, quantity - 1)}
              >
                <Icon name="minus" size={16} />
              </Button>
              <span className="ds-stat">{quantity}</span>
              <Button
                variant="ghost"
                size="md"
                aria-label={`Increase quantity of ${menuItem.name}`}
                onClick={() => onUpdateQuantity(menuItem.id, quantity + 1)}
              >
                <Icon name="plus" size={16} />
              </Button>
              <span className="ds-price">
                ${(Number(menuItem.price) * quantity).toFixed(2)}
              </span>
              <Button
                variant="danger"
                size="md"
                aria-label={`Remove ${menuItem.name} from cart`}
                onClick={() => onRemove(menuItem.id)}
              >
                <Icon name="trash" size={16} />
              </Button>
            </Stack>
          </div>
        ))}
      </Stack>
    </Section>
  );
}
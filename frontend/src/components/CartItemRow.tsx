import type { CartItem } from '../contexts/CartContext';
import { Media, Button } from './ui';
import { Icon } from './icons';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (menuItemId: number, quantity: number) => void;
  onRemove: (menuItemId: number) => void;
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const { menuItem, quantity } = item;
  const lineTotal = Number(menuItem.price) * quantity;

  return (
    <div className="ds-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
      <div style={{ width: '88px', flexShrink: 0 }}>
        <Media src={menuItem.imageUrl} alt={menuItem.name} ratio="square" />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 className="ds-card-title" style={{ marginBottom: '0.25rem' }}>{menuItem.name}</h3>
        <p className="ds-muted ds-small">${Number(menuItem.price).toFixed(2)} each</p>
      </div>

      <div className="ds-cluster" style={{ alignItems: 'center', gap: '0.5rem' }}>
        <Button
          variant="ghost"
          size="md"
          aria-label="Decrease quantity"
          onClick={() => onUpdateQuantity(menuItem.id, quantity - 1)}
        >
          <Icon name="minus" size={16} />
        </Button>
        <span style={{ minWidth: '1.5rem', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
        <Button
          variant="ghost"
          size="md"
          aria-label="Increase quantity"
          onClick={() => onUpdateQuantity(menuItem.id, quantity + 1)}
        >
          <Icon name="plus" size={16} />
        </Button>
      </div>

      <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 600, color: 'var(--color-primary)' }}>
        ${lineTotal.toFixed(2)}
      </div>

      <Button
        variant="ghost"
        size="md"
        aria-label={`Remove ${menuItem.name} from cart`}
        onClick={() => onRemove(menuItem.id)}
      >
        <Icon name="trash" size={16} />
      </Button>
    </div>
  );
}

export default CartItemRow;
export { CartItemRow };
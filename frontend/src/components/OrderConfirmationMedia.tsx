import { Section, Split, Media, Price, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface OrderConfirmationMediaProps {
  order: Order;
}

const STATUS_TONE: Record<string, 'neutral' | 'primary' | 'soft' | 'success' | 'danger'> = {
  pending: 'soft',
  paid: 'success',
  preparing: 'primary',
  completed: 'success',
  cancelled: 'danger',
};

export default function OrderConfirmationMedia({ order }: OrderConfirmationMediaProps) {
  const statusTone = STATUS_TONE[order.status] ?? 'neutral';
  const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <Section tight>
      <Split>
        <Media
          src=""
          alt={`Order #${order.id} confirmation`}
          ratio="wide"
          badge={
            <Badge tone="success">
              <Icon name="check" size={14} /> Order placed
            </Badge>
          }
        />
        <div className="ds-stack">
          <span className="ds-eyebrow">Thanks for your order</span>
          <h1 className="ds-card-title">Order #{order.id} is on its way to the kitchen</h1>
          <p className="ds-card-meta">
            <Icon name="package" size={16} /> {itemCount} item{itemCount === 1 ? '' : 's'}
            {' · '}
            <Icon name="clock" size={16} /> {new Date(order.createdAt).toLocaleString()}
          </p>
          <div className="ds-cluster">
            <Badge tone={statusTone}>{order.status}</Badge>
            <Price value={order.totalAmount} />
          </div>
          <div className="ds-form-actions">
            <Button to="/orders" variant="primary" size="lg">
              <Icon name="list" size={18} /> View order history
            </Button>
            <Button to="/menu-items" variant="ghost">
              <Icon name="arrow-right" size={16} /> Order more food
            </Button>
          </div>
        </div>
      </Split>
    </Section>
  );
}
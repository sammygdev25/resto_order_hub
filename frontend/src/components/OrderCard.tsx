import type { Order } from '../types';
import { Card, CardBody, CardTitle, CardMeta, CardFooter, Price, Badge } from './ui';
import { Icon } from './icons';

interface OrderCardProps {
  order: Order;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'completed':
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'danger';
    case 'preparing':
    case 'processing':
      return 'primary';
    default:
      return 'soft';
  }
}

export function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const placedOn = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <Card>
      <CardBody>
        <div className="ds-between">
          <CardTitle>Order #{order.id}</CardTitle>
          <Badge tone={statusTone(order.status)}>{order.status}</Badge>
        </div>
        <CardMeta>
          <Icon name="calendar" size={14} /> {placedOn}
          {itemCount > 0 && (
            <>
              {' '}
              &middot; {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </>
          )}
        </CardMeta>
        {order.items && order.items.length > 0 && (
          <ul className="ds-stack" style={{ marginTop: '0.5rem' }}>
            {order.items.map((item) => (
              <li key={item.id} className="ds-between ds-small ds-muted">
                <span>
                  {item.quantity}&times; {item.menuItem?.name ?? 'Menu item'}
                </span>
                <span>${Number(item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
      <CardFooter>
        <span className="ds-muted ds-small">
          <Icon name="credit-card" size={14} /> {order.stripePaymentIntentId ? 'Paid' : 'Awaiting payment'}
        </span>
        <Price value={Number(order.totalAmount)} />
      </CardFooter>
    </Card>
  );
}

export default OrderCard;
import { Section, Grid, Card, CardBody, Badge, Price } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface OrderConfirmationFactsProps {
  order: Order;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'paid':
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'danger';
    case 'pending':
      return 'primary';
    default:
      return 'neutral';
  }
}

export default function OrderConfirmationFacts({ order }: OrderConfirmationFactsProps) {
  return (
    <Section eyebrow="Order details" title={`Order #${order.id}`} tight>
      <Grid cols={2} size="sm">
        <Card>
          <CardBody>
            <Stack-like-header>
              <Icon name="package" size={18} />
              <strong>Status</strong>
            </Stack-like-header>
            <Badge tone={statusTone(order.status)}>{order.status}</Badge>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="ds-cluster">
              <Icon name="calendar" size={18} />
              <strong>Placed on</strong>
            </div>
            <p className="ds-muted">{formatDate(order.createdAt)}</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="ds-cluster">
              <Icon name="dollar" size={18} />
              <strong>Total</strong>
            </div>
            <Price value={order.totalAmount} />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="ds-cluster">
              <Icon name="credit-card" size={18} />
              <strong>Payment reference</strong>
            </div>
            <p className="ds-muted">
              {order.stripePaymentIntentId ? order.stripePaymentIntentId : 'Awaiting confirmation from Stripe'}
            </p>
          </CardBody>
        </Card>
      </Grid>

      {order.items && order.items.length > 0 && (
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.menuItem?.name ?? `Menu item #${item.menuItemId}`}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Price value={item.price} />
                  </td>
                  <td>
                    <Price value={item.price * item.quantity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
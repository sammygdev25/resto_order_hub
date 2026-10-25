import { Link } from 'react-router-dom';
import { Section, EmptyState, Badge, Button } from '../components/ui';
import { Icon } from '../components/icons';
import type { Order } from '../types';

interface OrderHistoryContentProps {
  orders: Order[];
  loading?: boolean;
}

function statusTone(status: string): 'neutral' | 'primary' | 'soft' | 'success' | 'danger' {
  switch (status) {
    case 'completed':
    case 'paid':
      return 'success';
    case 'cancelled':
    case 'failed':
      return 'danger';
    case 'pending':
      return 'soft';
    default:
      return 'neutral';
  }
}

export default function OrderHistoryContent({ orders, loading }: OrderHistoryContentProps) {
  if (loading) {
    return (
      <Section title="Your orders">
        <div className="ds-loading">
          <Icon name="refresh" size={20} />
          <span>Loading your order history...</span>
        </div>
      </Section>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Section title="Your orders">
        <EmptyState
          icon="package"
          title="No orders yet"
          text="Once you place an order from our menu, it will show up here with its status and total."
          action={
            <Button variant="primary" to="/menu-items">
              Browse the menu
            </Button>
          }
        />
      </Section>
    );
  }

  return (
    <Section title="Your orders">
      <div className="ds-table-wrap">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : '—'}
                </td>
                <td>{order.items?.length ?? 0} item{(order.items?.length ?? 0) === 1 ? '' : 's'}</td>
                <td>${Number(order.totalAmount ?? 0).toFixed(2)}</td>
                <td>
                  <Badge tone={statusTone(order.status)}>{order.status}</Badge>
                </td>
                <td>
                  <Link to={`/order-confirmation/${order.id}`} className="ds-btn-ghost">
                    View details
                    <Icon name="chevron-right" size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
import type { Order } from '../types';
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard';
import { EmptyState, Stack } from './ui';

interface OrderHistoryListProps {
  orders: Order[];
}

function OrderHistoryList({ orders }: OrderHistoryListProps) {
  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon="package"
        title="No orders yet"
        text="Once you place an order from our menu, it will show up here with its status and receipt."
        action={<Link to="/menu-items">Browse the menu</Link>}
      />
    );
  }

  return (
    <Stack gap="md">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Stack>
  );
}

export { OrderHistoryList };
export default OrderHistoryList;

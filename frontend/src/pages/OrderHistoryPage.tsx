import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrderList } from '../api';
import type { Order, User as ApiUser } from '../types';
import OrderHistoryHeader from '../components/OrderHistoryHeader';
import OrderHistoryContent from '../components/OrderHistoryContent';
import OrderHistoryDetails from '../components/OrderHistoryDetails';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOrderList();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

  const detailsUser: ApiUser | null = user
    ? {
        id: user.id,
        email: user.email,
        password: '',
        name: user.name ?? user.username,
        createdAt: '',
        updatedAt: '',
      }
    : null;

  return (
    <div className="ds-stack-lg">
      <OrderHistoryHeader userName={user?.name ?? undefined} userEmail={user?.email} />
      <OrderHistoryContent orders={orders} loading={loading} />
      <OrderHistoryDetails user={detailsUser} totalOrders={orders.length} totalSpent={totalSpent} />
    </div>
  );
}

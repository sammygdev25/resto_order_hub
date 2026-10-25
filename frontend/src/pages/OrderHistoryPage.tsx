import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getOrderList } from '../api';
import type { Order } from '../types';
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

  return (
    <div className="ds-stack-lg">
      <OrderHistoryHeader userName={user?.name} userEmail={user?.email} />
      <OrderHistoryContent orders={orders} loading={loading} />
      <OrderHistoryDetails user={user} totalOrders={orders.length} totalSpent={totalSpent} />
    </div>
  );
}
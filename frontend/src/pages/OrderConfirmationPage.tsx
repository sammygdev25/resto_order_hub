import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, getMenuItemList } from '../api';
import { useCart } from '../contexts/CartContext';
import type { Order, MenuItem } from '../types';
import OrderConfirmationMedia from '../components/OrderConfirmationMedia';
import OrderConfirmationFacts from '../components/OrderConfirmationFacts';
import OrderConfirmationRelated from '../components/OrderConfirmationRelated';
import { LoadingBlock, Alert } from '../components/ui';

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { addItem } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!orderId) return;
      setLoading(true);
      setError('');
      try {
        const fetchedOrder = await getOrder(Number(orderId));
        if (cancelled) return;
        setOrder(fetchedOrder);

        const firstItem = fetchedOrder.items?.[0];
        const categoryId = firstItem?.menuItem?.category?.id;
        const orderedIds = new Set((fetchedOrder.items ?? []).map((i) => i.menuItemId));

        const allMenuItems = await getMenuItemList();
        if (cancelled) return;

        let related = allMenuItems.filter((m) => !orderedIds.has(m.id));
        if (categoryId !== undefined) {
          const sameCategory = related.filter((m) => m.category?.id === categoryId);
          if (sameCategory.length > 0) {
            related = sameCategory;
          }
        }
        setRelatedItems(related.slice(0, 6));
      } catch (err) {
        console.error('Failed to load order confirmation', err);
        if (!cancelled) setError('We could not load this order. Please check your order history.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (loading) {
    return <LoadingBlock label="Loading your order confirmation..." />;
  }

  if (error || !order) {
    return (
      <div className="ds-container ds-section">
        <Alert tone="danger">{error || 'Order not found.'}</Alert>
      </div>
    );
  }

  return (
    <div className="ds-stack-lg">
      <OrderConfirmationMedia order={order} />
      <OrderConfirmationFacts order={order} />
      {relatedItems.length > 0 && (
        <OrderConfirmationRelated items={relatedItems} onAddToCart={(menuItem) => addItem(menuItem, 1)} />
      )}
    </div>
  );
}
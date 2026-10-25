import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CheckoutHeader from '../components/CheckoutHeader';
import CheckoutForm, { type CheckoutDetails } from '../components/CheckoutForm';
import CheckoutSummary from '../components/CheckoutSummary';
import { Alert } from '../components/ui';
import type { Order } from '../types';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (details?: CheckoutDetails) => {
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setError('');
    setIsProcessing(true);
    try {
      const payload = {
        totalAmount: total,
        items: items.map((item) => ({
          menuItemId: item.menuItem,
          quantity: item.quantity,
          price: item.menuItem?.price ?? 0,
        })),
        ...details,
      };
      const response = await api.post<Order>('/orders/', payload);
      const order = response.data;
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err: any) {
      setError(err?.message || 'Could not place your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="ds-stack-lg">
      <CheckoutHeader step="details" />
      {error && (
        <div className="ds-container">
          <Alert tone="danger">{error}</Alert>
        </div>
      )}
      {user && (
        <div className="ds-container ds-small ds-muted">
          Delivering to {user.name} ({user.email})
        </div>
      )}
      <div className="ds-grid ds-grid-sidebar ds-container">
        <CheckoutForm total={total} onSubmit={handleSubmit} isProcessing={isProcessing} />
        <CheckoutSummary
          items={items}
          total={total}
          onSubmit={() => handleSubmit()}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

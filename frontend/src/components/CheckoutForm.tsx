import { useState, FormEvent } from 'react';
import { Section, Alert, Button, Price } from '../components/ui';
import { Icon } from '../components/icons';

export interface CheckoutDetails {
  name: string;
  address: string;
  phone: string;
  notes: string;
}

interface CheckoutFormProps {
  total: number;
  onSubmit: (details: CheckoutDetails) => void | Promise<void>;
  isProcessing: boolean;
}

export default function CheckoutForm({ total, onSubmit, isProcessing }: CheckoutFormProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !phone.trim()) {
      setError('Please fill in your name, delivery address and phone number.');
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), address: address.trim(), phone: phone.trim(), notes: notes.trim() });
  };

  return (
    <Section eyebrow="Checkout" title="Delivery details" tight>
      <form className="ds-form" onSubmit={handleSubmit}>
        {error && <Alert tone="danger">{error}</Alert>}

        <div className="ds-field">
          <label className="ds-label" htmlFor="checkout-name">Full name</label>
          <input
            id="checkout-name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Who should we hand this order to?"
          />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="checkout-address">Delivery address</label>
          <input
            id="checkout-address"
            className="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, apartment, city"
          />
        </div>

        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label" htmlFor="checkout-phone">Phone number</label>
            <input
              id="checkout-phone"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="In case the rider needs you"
            />
          </div>
          <div className="ds-field">
            <label className="ds-label" htmlFor="checkout-notes">Delivery notes</label>
            <input
              id="checkout-notes"
              className="input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Gate code, allergies, extra napkins..."
            />
          </div>
        </div>

        <div className="ds-field">
          <span className="ds-label">Payment method</span>
          <div className="ds-cluster">
            <Badge />
          </div>
          <p className="ds-help">You'll securely enter your card details with Stripe on the next step.</p>
        </div>

        <div className="ds-form-actions ds-between">
          <span className="ds-muted">Order total</span>
          <Price value={total} />
        </div>

        <Button type="submit" variant="primary" size="lg" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Icon name="refresh" size={18} /> Placing your order...
            </>
          ) : (
            <>
              <Icon name="credit-card" size={18} /> Continue to payment
            </>
          )}
        </Button>
      </form>
    </Section>
  );
}

function Badge() {
  return (
    <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      <Icon name="credit-card" size={14} /> Card via Stripe
    </span>
  );
}
import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface CheckoutHeaderProps {
  step?: 'details' | 'payment';
}

export default function CheckoutHeader({ step = 'details' }: CheckoutHeaderProps) {
  return (
    <PageHeader
      eyebrow="Checkout"
      title="Review & pay for your order"
      subtitle="Confirm your items, then head to secure payment to send your order to the kitchen."
      actions={
        <div className="ds-cluster" aria-label="Checkout steps">
          <span className={`ds-badge-step ${step === 'details' ? 'is-active' : ''}`}>
            <Icon name="list" size={16} />
            Order details
          </span>
          <Icon name="chevron-right" size={16} />
          <span className={`ds-badge-step ${step === 'payment' ? 'is-active' : ''}`}>
            <Icon name="credit-card" size={16} />
            Payment
          </span>
        </div>
      }
    />
  );
}
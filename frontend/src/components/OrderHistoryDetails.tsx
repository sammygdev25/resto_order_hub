import { Section } from '../components/ui';
import { Icon } from '../components/icons';
import type { User } from '../types';

interface OrderHistoryDetailsProps {
  user: User | null;
  totalOrders: number;
  totalSpent: number;
}

export default function OrderHistoryDetails({ user, totalOrders, totalSpent }: OrderHistoryDetailsProps) {
  return (
    <Section eyebrow="Your account" title="Account details" narrow tight>
      <div className="ds-form">
        <div className="ds-form-row">
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="user" size={14} /> Name
            </span>
            <p>{user?.name || 'Guest diner'}</p>
          </div>
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="mail" size={14} /> Email
            </span>
            <p>{user?.email || '—'}</p>
          </div>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="package" size={14} /> Orders placed
            </span>
            <p>{totalOrders}</p>
          </div>
          <div className="ds-field">
            <span className="ds-label">
              <Icon name="dollar" size={14} /> Total spent
            </span>
            <p>${totalSpent.toFixed(2)}</p>
          </div>
        </div>
        <p className="ds-help">
          Questions about a past order from our kitchen? Reach out and we'll sort it out before your next visit.
        </p>
      </div>
    </Section>
  );
}
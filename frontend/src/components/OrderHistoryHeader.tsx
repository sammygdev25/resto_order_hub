import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface OrderHistoryHeaderProps {
  userName?: string;
  userEmail?: string;
}

export default function OrderHistoryHeader({ userName, userEmail }: OrderHistoryHeaderProps) {
  const displayName = userName || userEmail || 'there';

  return (
    <PageHeader
      eyebrow="Order history"
      title="Your orders"
      subtitle={
        <span className="ds-cluster">
          <Icon name="package" size={16} />
          Every order you've placed at our table, {displayName}, from first bite to latest delivery.
        </span>
      }
    />
  );
}
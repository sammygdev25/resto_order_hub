import { PageHeader } from '../components/ui';
import { Icon } from '../components/icons';

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  const subtitle =
    itemCount === 0
      ? 'Your cart is empty — add something tasty from the menu.'
      : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} ready for checkout.`;

  return (
    <PageHeader
      eyebrow="Your order"
      title={
        <span className="ds-cluster">
          <Icon name="cart" size={28} />
          Cart
        </span>
      }
      subtitle={subtitle}
    />
  );
}
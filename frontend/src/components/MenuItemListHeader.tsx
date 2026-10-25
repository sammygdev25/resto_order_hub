import { PageHeader } from '../components/ui';

interface MenuItemListHeaderProps {
  resultCount?: number;
  loading?: boolean;
}

export default function MenuItemListHeader({ resultCount, loading }: MenuItemListHeaderProps) {
  const subtitle =
    !loading && typeof resultCount === 'number'
      ? `${resultCount} ${resultCount === 1 ? 'dish' : 'dishes'} ready to order`
      : 'Fresh plates, made to order, delivered to your table or your door';

  return (
    <PageHeader
      eyebrow="Our Menu"
      title="Everything on the menu"
      subtitle={subtitle}
    />
  );
}
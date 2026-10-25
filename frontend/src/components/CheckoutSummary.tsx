import { Card, CardBody, CardTitle, Media, Price, Button, Stack } from '../components/ui';
import { Icon } from '../components/icons';
import type { CartItem } from '../contexts/CartContext.tsx';

interface CheckoutSummaryProps {
  items: CartItem[];
  total: number;
  onSubmit: () => void;
  isProcessing: boolean;
}

export default function CheckoutSummary({ items, total, onSubmit, isProcessing }: CheckoutSummaryProps) {
  const deliveryFee = items.length > 0 ? 3.99 : 0;
  const grandTotal = total + deliveryFee;

  return (
    <Card>
      <CardBody>
        <CardTitle>Order Summary</CardTitle>
        <Stack gap="sm">
          {items.length === 0 ? (
            <p className="ds-muted">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="ds-between" key={item.menuItem.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Media
                    src={item.menuItem?.imageUrl}
                    alt={item.menuItem?.name ?? 'Menu item'}
                    ratio="square"
                  />
                  <div>
                    <div>{item.menuItem?.name ?? 'Item'}</div>
                    <span className="ds-small ds-muted">Qty {item.quantity}</span>
                  </div>
                </div>
                <Price value={(item.menuItem?.price ?? 0) * item.quantity} />
              </div>
            ))
          )}
        </Stack>

        <div className="ds-card-footer">
          <Stack gap="xs">
            <div className="ds-between">
              <span className="ds-muted">Subtotal</span>
              <Price value={total} />
            </div>
            <div className="ds-between">
              <span className="ds-muted">Delivery Fee</span>
              <Price value={deliveryFee} />
            </div>
            <div className="ds-between">
              <strong>Total</strong>
              <Price value={grandTotal} />
            </div>
          </Stack>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          disabled={isProcessing || items.length === 0}
        >
          {isProcessing ? (
            <>
              <Icon name="refresh" size={16} /> Placing order...
            </>
          ) : (
            <>
              <Icon name="credit-card" size={16} /> Place Order
            </>
          )}
        </Button>
      </CardBody>
    </Card>
  );
}

import { Card, CardBody, Price, Button, Stack, Icon } from '../components/ui';

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onCheckout: () => void;
}

const DELIVERY_FEE = 3.99;

export default function CartSummary({ total, itemCount, onCheckout }: CartSummaryProps) {
  const hasItems = itemCount > 0;
  const deliveryFee = hasItems ? DELIVERY_FEE : 0;
  const grandTotal = total + deliveryFee;

  return (
    <Card>
      <CardBody>
        <Stack gap="md">
          <h3 className="ds-card-title">Order Summary</h3>

          <Stack gap="sm">
            <div className="ds-between">
              <span className="ds-muted">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
              <Price value={total} />
            </div>
            <div className="ds-between">
              <span className="ds-muted">Delivery fee</span>
              <Price value={deliveryFee} />
            </div>
          </Stack>

          <div className="ds-between">
            <span className="ds-card-title">Total</span>
            <Price value={grandTotal} />
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onCheckout}
            disabled={!hasItems}
          >
            <Icon name="credit-card" size={18} />
            Proceed to Checkout
          </Button>

          {!hasItems && (
            <p className="ds-small ds-muted">
              Add dishes from the menu to start your order.
            </p>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
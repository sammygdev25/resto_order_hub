import { useState } from 'react';
import type { CartItem } from '../contexts/CartContext';
import { Button, Price, EmptyState } from './ui';
import { Icon } from './icons';
import CartItemRow from './CartItemRow';

interface CartDrawerProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (menuItemId: number, quantity: number) => void;
  onRemove: (menuItemId: number) => void;
  onCheckout: () => void;
}

function CartDrawer({ items, total, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <button
        className="cart-drawer-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          borderRadius: '999px',
          background: 'var(--color-primary)',
          color: '#fff',
          border: 'none',
          width: '3.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          cursor: 'pointer',
        }}
      >
        <Icon name="cart" size={22} />
        {itemCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--color-accent)',
              color: '#15110f',
              fontSize: '0.7rem',
              fontWeight: 700,
              borderRadius: '999px',
              minWidth: '1.25rem',
              height: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 0.25rem',
            }}
          >
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: 'min(24rem, 100%)',
              background: 'var(--color-surface)',
              borderLeft: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem',
              overflowY: 'auto',
            }}
          >
            <div className="ds-between" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-heading, Poppins)' }}>Your order</h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <EmptyState
                icon="cart"
                title="Your cart is empty"
                text="Add something delicious from the menu to get started."
              />
            ) : (
              <div className="ds-stack" style={{ gap: '0.75rem', flex: 1 }}>
                {items.map((item) => (
                  <CartItemRow
                    key={item.menuItem.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '1rem', paddingTop: '1rem' }}>
                <div className="ds-between" style={{ marginBottom: '1rem' }}>
                  <span className="ds-muted">Total</span>
                  <Price value={total} />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setIsOpen(false);
                    onCheckout();
                  }}
                  style={{ width: '100%' }}
                >
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawer;
export { CartDrawer };
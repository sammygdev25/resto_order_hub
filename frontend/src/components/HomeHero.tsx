import { Hero, Button, Media } from '../components/ui';

interface HomeHeroProps {
  imageUrl?: string;
}

export default function HomeHero({ imageUrl = '/img/brand/hero.jpg' }: HomeHeroProps) {
  return (
    <Hero
      eyebrow="Fresh. Fast. Flavorful."
      title="Your favorite dishes, delivered to your table"
      text="Browse our categorized menu of chef-crafted meals, from sizzling starters to indulgent desserts. Order online in minutes and pay securely with Stripe — then track every order from your history."
      actions={
        <>
          <Button to="/menu-items" size="lg">
            View the Menu
          </Button>
          <Button to="/orders" variant="ghost" size="lg">
            Track an Order
          </Button>
        </>
      }
      media={imageUrl ? <Media src={imageUrl} alt="A table full of freshly prepared dishes" ratio="wide" /> : undefined}
    />
  );
}
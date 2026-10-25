import { Section, Button } from '../components/ui';
import { Icon } from '../components/icons';

interface HomeCtaProps {
  title?: string;
  text?: string;
}

export default function HomeCta({
  title = 'Hungry already?',
  text = 'Browse our full menu and get a hot meal delivered straight to your door.',
}: HomeCtaProps) {
  return (
    <Section tight>
      <div className="ds-hero ds-card-body" style={{ textAlign: 'center' }}>
        <h2 className="ds-card-title">{title}</h2>
        <p className="ds-lead">{text}</p>
        <div className="ds-cluster" style={{ justifyContent: 'center' }}>
          <Button to="/menu-items" variant="primary" size="lg">
            View the menu
            <Icon name="arrow-right" size={18} />
          </Button>
          <Button to="/register" variant="ghost" size="lg">
            Create an account
          </Button>
        </div>
      </div>
    </Section>
  );
}
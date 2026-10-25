import { Section, Split, Card, CardBody, CardTitle } from '../components/ui';
import { Icon } from '../components/icons';
import type { IconName } from '../components/icons';

interface ValuePoint {
  icon: IconName;
  title: string;
  text: string;
}

interface HomeAboutProps {
  title?: string;
  story?: string;
  values?: ValuePoint[];
}

const defaultValues: ValuePoint[] = [
  {
    icon: 'package',
    title: 'Scratch-made daily',
    text: 'Every dish on our menu is prepared fresh each morning by our kitchen team, never frozen, never rushed.',
  },
  {
    icon: 'truck',
    title: 'Fast to your door',
    text: 'From the moment you check out, your order is fired, packed and on its way while it is still hot.',
  },
  {
    icon: 'heart',
    title: 'Made with care',
    text: 'We pick our categories and plates the way we would feed our own family: simple, honest, generous.',
  },
];

export default function HomeAbout({
  title = 'Our story',
  story = "What started as a single kitchen window has grown into a full menu of favorites, organized by category and ready to order online. We built this ordering hub so you can browse our dishes, build your cart and check out securely, then track every order from checkout to your doorstep.",
  values = defaultValues,
}: HomeAboutProps) {
  return (
    <Section eyebrow="About us" title={title}>
      <Split>
        <div className="ds-stack">
          <p className="ds-lead">{story}</p>
          <p className="ds-muted">
            Whether you are craving something from our starters, mains or desserts categories, every item is
            listed with its price and availability so there are no surprises at checkout.
          </p>
        </div>
        <div className="ds-stack">
          {values.map((value) => (
            <Card key={value.title}>
              <CardBody>
                <Stack gap="sm" align="start">
                  <Icon name={value.icon} size={24} />
                  <CardTitle>{value.title}</CardTitle>
                  <p className="ds-muted">{value.text}</p>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </div>
      </Split>
    </Section>
  );
}

function Stack({ children, gap, align }: { children: React.ReactNode; gap?: 'xs' | 'sm' | 'md' | 'lg'; align?: string }) {
  return (
    <div className={`ds-stack ds-stack-${gap ?? 'md'}`} style={align ? { alignItems: align } : undefined}>
      {children}
    </div>
  );
}
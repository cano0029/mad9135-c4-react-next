import Link from 'next/link';
import AnimationIcon from '@mui/icons-material/Animation';

export default function NavBar() {
  return (
    <header>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          variant: 'containers.page',
          height: '100%',
        }}
      >
        <Link href="/">
          <a>
            <AnimationIcon />
            PodPile
          </a>
        </Link>
      </nav>
    </header>
  );
}

// /** @jsxImportSource theme-ui */
import Link from 'next/link';
import AnimationIcon from '@mui/icons-material/Animation';

// See: https://theme-ui.com/components

//alternate way of using the sx prop
// sx={(theme)=> { now you have the theme object }}

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

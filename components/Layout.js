import Footer from './Footer';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <div
      sx={{
        backgroundColor: `background`,
        color: `secondary`,
      }}
    >
      <NavBar />
      <div sx={{ variant: 'page' }}>{children}</div>
      <Footer />
    </div>
  );
}

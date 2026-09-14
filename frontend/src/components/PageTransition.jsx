import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function PageTransition() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const lenis = window.lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div key={pathname} className="page-enter">
      <Outlet />
    </div>
  );
}

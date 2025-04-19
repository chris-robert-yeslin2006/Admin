'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BodyOverflowController() {
  const pathname = usePathname();

  useEffect(() => {
    const shouldHideOverflow =
      pathname === '/organization' || pathname === '/organization/Statistics';

    if (shouldHideOverflow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [pathname]);

  return null;
}

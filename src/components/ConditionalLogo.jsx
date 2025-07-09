'use client';

import { usePathname } from 'next/navigation';
import LogoImage from '@/sections/LogoImg';

export default function ConditionalLogo() {
  const pathname = usePathname();
  const hideLogo = pathname?.startsWith('/product'); // or use === '/product' for exact match

  return !hideLogo ? <LogoImage /> : null;
}

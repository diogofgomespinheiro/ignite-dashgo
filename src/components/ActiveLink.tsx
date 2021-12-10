import { cloneElement, ReactElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const isExactMatch = asPath === rest.href || asPath === rest.as;
  const isPartialMatch =
    asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as));

  const isActive = shouldMatchExactHref ? isExactMatch : isPartialMatch;

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}

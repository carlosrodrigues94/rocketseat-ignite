import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  activeClassName: string;
  children: ReactElement;
}

export const ActiveLink = ({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : "";

  const anchorElement = cloneElement(children, { className });

  return <Link {...rest}>{anchorElement}</Link>;
};

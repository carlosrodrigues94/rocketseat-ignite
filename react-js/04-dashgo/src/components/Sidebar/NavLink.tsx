import React from "react";
import { Link as ChakraLink, Icon, Text, LinkProps } from "@chakra-ui/react";
import { IconBaseProps } from "react-icons/lib";
import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends LinkProps {
  icon: React.ElementType<IconBaseProps>;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, href, children, ...rest }) => {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        align="center"
        color="gray.100"
        py="1"
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
};

export { NavLink };

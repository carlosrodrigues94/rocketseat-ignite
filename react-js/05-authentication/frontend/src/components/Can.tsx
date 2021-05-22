import React from "react";
import { useCan } from "../hooks/useCan";

interface CanProps {
  permissions?: string[];
  roles?: [];
}

const Can: React.FC<CanProps> = ({
  children,
  permissions = [],
  roles = [],
}) => {
  const userCanSeeComponent = useCan({ permissions, roles });

  if (!userCanSeeComponent) return <></>;

  return <>{children}</>;
};

export { Can };

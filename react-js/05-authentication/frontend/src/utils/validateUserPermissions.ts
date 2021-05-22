type User = {
  permissions?: string[];
  roles?: string[];
};

type ValidateUserPermissionsProps = {
  user: User;
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions(props: ValidateUserPermissionsProps) {
  const { user, roles, permissions } = props;

  if (permissions.length) {
    const hasAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles.length) {
    const hasAllRoles = roles.some((role) => {
      return user.roles.includes(role);
    });

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}

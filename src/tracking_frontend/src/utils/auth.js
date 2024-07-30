export const checkAuth = (isAuthenticated, userRole, requiredRole) => {
  return isAuthenticated && userRole === requiredRole;
};

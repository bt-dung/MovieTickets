export const getRoutesByRole = (role, userRoutes, adminRoutes) => {
    if (role === "user_role") {
        return userRoutes;
    } else if (role === "manager_role" || role === "admin_role") {
        return adminRoutes;
    }
    return [];
};
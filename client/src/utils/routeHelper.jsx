export const getRoutesByRole = (user, userRoutes, adminRoutes) => {
    if (user?.role === "user_role") {
        return userRoutes;
    } else if (user?.role === "manager_role" || user?.role === "admin_role") {
        return adminRoutes;
    } else {
        return [];
    }
};
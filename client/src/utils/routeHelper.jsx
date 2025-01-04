export const getRoutesByRole = (user, userRoutes, adminRoutes) => {
    console.log("ádasda", user?.role);
    if (user?.role === "user_role") {
        return userRoutes;
    } else if (user?.role === "manager_role" || user?.role === "admin_role") {
        return adminRoutes;
    } else {
        return [];
    }
};
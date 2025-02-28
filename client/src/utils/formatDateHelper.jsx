export const FormatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export const formatDatetoString = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
        return "Invalid Date";
    }

    const date = new Date(dateString.replace(/\//g, '-'));

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric"
    }).toUpperCase();
};
export const formatHour = (start_time) => {
    const startTimeConfig = new Date(start_time).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
    return startTimeConfig;
};

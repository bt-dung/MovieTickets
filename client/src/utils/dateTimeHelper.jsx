export const getUpcomingDates = (numDays) => {
    return Array.from({ length: numDays }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return {
            id: `${year}-${month}-${day}`,
            name: `${year}-${month}-${day}`,
        };
    });
};


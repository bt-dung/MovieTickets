const FormatDate = {
    formatHour: (start_time) => {
        const startTimeConfig = new Date(start_time).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        return startTimeConfig;
    },
}

module.exports = FormatDate;
function getTimeRangesFromKey(key) {
    const now = new Date();
    let currentStart, currentEnd, previousStart, previousEnd;

    if (key === 'day') {
        currentStart = new Date(now.setHours(0, 0, 0, 0));
        currentEnd = new Date(now.setHours(23, 59, 59, 999));

        previousStart = new Date(currentStart);
        previousStart.setDate(previousStart.getDate() - 1);
        previousEnd = new Date(currentStart);
        previousEnd.setMilliseconds(-1);

    } else if (key === 'week') {
        const today = new Date();
        const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();

        currentStart = new Date(today);
        currentStart.setDate(currentStart.getDate() - dayOfWeek + 1);
        currentStart.setHours(0, 0, 0, 0);

        currentEnd = new Date(currentStart);
        currentEnd.setDate(currentEnd.getDate() + 6);
        currentEnd.setHours(23, 59, 59, 999);

        previousStart = new Date(currentStart);
        previousStart.setDate(previousStart.getDate() - 7);

        previousEnd = new Date(currentStart);
        previousEnd.setMilliseconds(-1);

    } else if (key === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();

        currentStart = new Date(year, month, 1);
        currentEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

        previousStart = new Date(year, month - 1, 1);
        previousEnd = new Date(year, month, 0, 23, 59, 59, 999);

    } else {
        throw new Error("Invalid key. Use 'day', 'week', or 'month'");
    }

    return { currentStart, currentEnd, previousStart, previousEnd };
}

module.exports = { getTimeRangesFromKey };
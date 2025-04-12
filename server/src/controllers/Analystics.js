const Invoices = require("../models/Invoices");
const User = require("../models/User");
const Tickets = require("../models/Tickets");
const { getTimeRangesFromKey } = require("../config/filterTime");
const AnalysticsController = {
    getUserAnalytics: async (req, res) => {
        try {
            const { key } = req.query;

            const { currentStart, currentEnd, previousStart, previousEnd } = getTimeRangesFromKey(key);

            const current = await User.analystUser(currentStart, currentEnd);
            const previous = await User.analystUser(previousStart, previousEnd);

            const change = current.totalUsers - previous.totalUsers;
            const percentage = previous.totalUsers === 0 ? 100 : (change / previous.totalUsers) * 100;

            return res.json({
                key,
                current: current.totalUsers,
                previous: previous.totalUsers,
                change,
                percentage: Math.round(percentage * 100) / 100,
                status: change === 0 ? 'no change' : change > 0 ? 'up' : 'down'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getRevenueAnalystInYear: async (req, res) => {
        const { theaterId } = req.query;
        try {
            const revenue = await Invoices.RevenueAnalystInYear(theaterId);
            return res.status(200).json({ status: "SUCCESS", data: revenue, message: 'Getting Revenue Analyst successfully' });
        } catch (error) {
            console.error("Error when get revenue analyst: ", error);
            return res.status(400).json({ status: "FAILED", message: error.message });
        }
    },
    getOrderAnalytics: async (req, res) => {
        try {
            const { key } = req.query;

            const { currentStart, currentEnd, previousStart, previousEnd } = getTimeRangesFromKey(key);

            const current = await Invoices.analystOrder(currentStart, currentEnd);
            const previous = await Invoices.analystOrder(previousStart, previousEnd);

            const change = current.totalOrders - previous.totalOrders;
            const percentage = previous.totalOrders === 0 ? 100 : (change / previous.totalOrders) * 100;

            return res.json({
                key,
                current: current.totalOrders,
                previous: previous.totalOrders,
                change,
                percentage: Math.round(percentage * 100) / 100,
                status: change === 0 ? 'no change' : change > 0 ? 'up' : 'down'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getRevenueAnalytics: async (req, res) => {
        try {
            const { key } = req.query;

            const { currentStart, currentEnd, previousStart, previousEnd } = getTimeRangesFromKey(key);

            const current = await Invoices.analystRevenues(currentStart, currentEnd);
            const previous = await Invoices.analystRevenues(previousStart, previousEnd);

            const change = current - previous;
            const percentage = previous === 0 ? 100 : (change / previous) * 100;

            return res.json({
                key,
                current: current,
                previous: previous,
                change,
                percentage: Math.round(percentage * 100) / 100,
                status: change === 0 ? 'no change' : change > 0 ? 'up' : 'down'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getTicketAnalytics: async (req, res) => {
        try {
            const { key } = req.query;

            const { currentStart, currentEnd, previousStart, previousEnd } = getTimeRangesFromKey(key);

            const current = await Invoices.analystTickets(currentStart, currentEnd);
            const previous = await Invoices.analystTickets(previousStart, previousEnd);

            const change = current - previous;
            const percentage = previous === 0 ? 100 : (change / previous) * 100;

            return res.json({
                key,
                current: current,
                previous: previous,
                change,
                percentage: Math.round(percentage * 100) / 100,
                status: change === 0 ? 'no change' : change > 0 ? 'up' : 'down'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getTheBestMovies: async (req, res) => {
        const { month } = req.query;
        try {
            const theBestMovies = await Tickets.theBestMoviesAnalystics(month);
            console.log(theBestMovies);
            return res.json(theBestMovies);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = AnalysticsController;
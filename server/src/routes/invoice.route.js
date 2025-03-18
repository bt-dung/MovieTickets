const express = require('express');
const router = express.Router();
const InvoiceController = require("../controllers/Invoice");

router.post("/createInvoice", InvoiceController.createInvoice)
    .get("/invoices/:theaterId/:dateTime", InvoiceController.getAllInvoicebyTheater)
    .get("/invoice/:id", InvoiceController.getInvoice)
    .get("/user/:userId/invoices", InvoiceController.getInvoiceByUser)
    .patch("/invoice/:id/update", InvoiceController.updateInvoice)
    .delete("/invoice/:id/delete", InvoiceController.deleteInvoice);

module.exports = router;
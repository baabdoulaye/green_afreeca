const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../controllers/contactController");

// La route sera /api/contact/ (le /api/contact sera défini dans server.js)
router.post("/", sendContactEmail);

module.exports = router;

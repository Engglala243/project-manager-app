const express = require("express")
const contactController = require("../controllers/contactController")

const router = express.Router()

// GET /api/contacts - Get all contacts (Admin only)
router.get("/", contactController.getAllContacts)

// GET /api/contacts/:id - Get contact by ID (Admin only)
router.get("/:id", contactController.getContactById)

// POST /api/contacts - Submit contact form
router.post("/", contactController.createContact)

// DELETE /api/contacts/:id - Delete contact (Admin only)
router.delete("/:id", contactController.deleteContact)

module.exports = router

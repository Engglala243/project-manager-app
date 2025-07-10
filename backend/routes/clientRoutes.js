const express = require("express")
const clientController = require("../controllers/clientController")

const router = express.Router()

// GET /api/clients - Get all clients
router.get("/", clientController.getAllClients)

// GET /api/clients/:id - Get client by ID
router.get("/:id", clientController.getClientById)

// POST /api/clients - Create new client
router.post("/", clientController.createClient)

// PUT /api/clients/:id - Update client
router.put("/:id", clientController.updateClient)

// DELETE /api/clients/:id - Delete client (soft delete)
router.delete("/:id", clientController.deleteClient)

module.exports = router

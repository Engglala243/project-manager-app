const express = require("express")
const subscriberController = require("../controllers/subscriberController")

const router = express.Router()

// GET /api/subscribers - Get all subscribers (Admin only)
router.get("/", subscriberController.getAllSubscribers)

// GET /api/subscribers/:id - Get subscriber by ID (Admin only)
router.get("/:id", subscriberController.getSubscriberById)

// POST /api/subscribers - Subscribe to newsletter
router.post("/", subscriberController.createSubscriber)

// POST /api/subscribers/unsubscribe - Unsubscribe from newsletter
router.post("/unsubscribe", subscriberController.unsubscribe)

// POST /api/subscribers/send-newsletter - Send newsletter (Admin only)
router.post("/send-newsletter", subscriberController.sendNewsletter)

// DELETE /api/subscribers/:id - Delete subscriber (Admin only)
router.delete("/:id", subscriberController.deleteSubscriber)

module.exports = router

const subscriberService = require("../services/subscriberService")
const emailService = require("../services/emailService")
const { createSubscriberSchema } = require("../validate_schema/subscriberSchema")

class SubscriberController {
  async createSubscriber(req, res) {
    try {
      const { error, value } = createSubscriberSchema.validate(req.body)
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        })
      }

      const subscriber = await subscriberService.createSubscriber(value)

      res.status(201).json({
        success: true,
        message: "Successfully subscribed to newsletter! Check your email for confirmation.",
        data: { email: subscriber.email },
      })
    } catch (error) {
      if (error.message.includes("already subscribed")) {
        return res.status(409).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getAllSubscribers(req, res) {
    try {
      const includeInactive = req.query.include_inactive === "true"
      const subscribers = await subscriberService.getAllSubscribers(includeInactive)

      res.status(200).json({
        success: true,
        message: "Subscribers fetched successfully",
        data: subscribers,
        count: subscribers.length,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getSubscriberById(req, res) {
    try {
      const { id } = req.params
      const subscriber = await subscriberService.getSubscriberById(id)

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: "Subscriber not found",
        })
      }

      res.status(200).json({
        success: true,
        message: "Subscriber fetched successfully",
        data: subscriber,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async unsubscribe(req, res) {
    try {
      const { email } = req.body

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        })
      }

      await subscriberService.unsubscribe(email)

      res.status(200).json({
        success: true,
        message: "Successfully unsubscribed from newsletter",
      })
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({
          success: false,
          message: "Email not found in our subscriber list",
        })
      }

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async deleteSubscriber(req, res) {
    try {
      const { id } = req.params
      await subscriberService.deleteSubscriber(id)

      res.status(200).json({
        success: true,
        message: "Subscriber deleted successfully",
      })
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }

      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async sendNewsletter(req, res) {
    try {
      const { subject, content } = req.body

      if (!subject || !content) {
        return res.status(400).json({
          success: false,
          message: "Subject and content are required",
        })
      }

      const subscribers = await subscriberService.getAllSubscribers()

      if (subscribers.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No active subscribers found",
        })
      }

      await emailService.sendNewsletterEmail(subscribers, subject, content)

      res.status(200).json({
        success: true,
        message: `Newsletter sent successfully to ${subscribers.length} subscribers`,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
}

module.exports = new SubscriberController()

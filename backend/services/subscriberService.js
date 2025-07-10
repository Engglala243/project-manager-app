const Subscriber = require("../models/Subscriber")
const emailService = require("./emailService")
const { Op } = require("sequelize")

class SubscriberService {
  async createSubscriber(subscriberData) {
    try {
      // Check if email already exists
      const existingSubscriber = await Subscriber.findOne({
        where: {
          email: subscriberData.email,
          is_deleted: false,
        },
      })

      if (existingSubscriber) {
        if (existingSubscriber.is_active) {
          throw new Error("Email is already subscribed to our newsletter")
        } else {
          // Reactivate existing subscriber
          await existingSubscriber.update({
            is_active: true,
            updated_by: "user",
          })
          await emailService.sendWelcomeEmail(existingSubscriber.email)
          return existingSubscriber
        }
      }

      const subscriber = await Subscriber.create(subscriberData)

      // Send welcome email
      await emailService.sendWelcomeEmail(subscriber.email)

      return subscriber
    } catch (error) {
      throw new Error(`Error creating subscriber: ${error.message}`)
    }
  }

  async getAllSubscribers(includeInactive = false) {
    try {
      const whereClause = { is_deleted: false }
      if (!includeInactive) {
        whereClause.is_active = true
      }

      const subscribers = await Subscriber.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
      })
      return subscribers
    } catch (error) {
      throw new Error(`Error fetching subscribers: ${error.message}`)
    }
  }

  async getSubscriberById(id) {
    try {
      const subscriber = await Subscriber.findOne({
        where: {
          id,
          is_deleted: false,
        },
      })
      return subscriber
    } catch (error) {
      throw new Error(`Error fetching subscriber: ${error.message}`)
    }
  }

  async unsubscribe(email) {
    try {
      const [updatedRowsCount] = await Subscriber.update(
        { is_active: false, updated_by: "user" },
        { where: { email, is_deleted: false } },
      )

      if (updatedRowsCount === 0) {
        throw new Error("Subscriber not found")
      }

      return true
    } catch (error) {
      throw new Error(`Error unsubscribing: ${error.message}`)
    }
  }

  async deleteSubscriber(id) {
    try {
      const [updatedRowsCount] = await Subscriber.update(
        { is_deleted: true, updated_by: "admin" },
        { where: { id, is_deleted: false } },
      )

      if (updatedRowsCount === 0) {
        throw new Error("Subscriber not found or already deleted")
      }

      return true
    } catch (error) {
      throw new Error(`Error deleting subscriber: ${error.message}`)
    }
  }
}

module.exports = new SubscriberService()

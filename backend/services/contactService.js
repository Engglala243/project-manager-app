const Contact = require("../models/Contact")
const emailService = require("./emailService")

class ContactService {
  async createContact(contactData) {
    try {
      const contact = await Contact.create(contactData)

      // Send notification email to admin
      await emailService.sendContactNotification(contact)

      return contact
    } catch (error) {
      throw new Error(`Error creating contact: ${error.message}`)
    }
  }

  async getAllContacts() {
    try {
      const contacts = await Contact.findAll({
        where: { is_deleted: false },
        order: [["created_at", "DESC"]],
      })
      return contacts
    } catch (error) {
      throw new Error(`Error fetching contacts: ${error.message}`)
    }
  }

  async getContactById(id) {
    try {
      const contact = await Contact.findOne({
        where: {
          id,
          is_deleted: false,
        },
      })
      return contact
    } catch (error) {
      throw new Error(`Error fetching contact: ${error.message}`)
    }
  }

  async deleteContact(id) {
    try {
      const [updatedRowsCount] = await Contact.update(
        { is_deleted: true, updated_by: "admin" },
        { where: { id, is_deleted: false } },
      )

      if (updatedRowsCount === 0) {
        throw new Error("Contact not found or already deleted")
      }

      return true
    } catch (error) {
      throw new Error(`Error deleting contact: ${error.message}`)
    }
  }
}

module.exports = new ContactService()

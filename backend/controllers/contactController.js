const contactService = require("../services/contactService")
const { createContactSchema } = require("../validate_schema/contactSchema")

class ContactController {
  async createContact(req, res) {
    try {
      const { error, value } = createContactSchema.validate(req.body)
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        })
      }

      const contact = await contactService.createContact(value)

      res.status(201).json({
        success: true,
        message: "Contact form submitted successfully. We will get back to you soon!",
        data: contact,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getAllContacts(req, res) {
    try {
      const contacts = await contactService.getAllContacts()

      res.status(200).json({
        success: true,
        message: "Contacts fetched successfully",
        data: contacts,
        count: contacts.length,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getContactById(req, res) {
    try {
      const { id } = req.params
      const contact = await contactService.getContactById(id)

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        })
      }

      res.status(200).json({
        success: true,
        message: "Contact fetched successfully",
        data: contact,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async deleteContact(req, res) {
    try {
      const { id } = req.params
      await contactService.deleteContact(id)

      res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
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
}

module.exports = new ContactController()

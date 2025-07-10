const clientService = require("../services/clientService")
const { createClientSchema, updateClientSchema } = require("../validate_schema/clientSchema")

class ClientController {
  async createClient(req, res) {
    try {
      const { error, value } = createClientSchema.validate(req.body)
      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        })
      }

      const client = await clientService.createClient(value)

      res.status(201).json({
        success: true,
        message: "Client created successfully",
        data: client,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getAllClients(req, res) {
    try {
      const includeInactive = req.query.include_inactive === "true"
      const clients = await clientService.getAllClients(includeInactive)

      res.status(200).json({
        success: true,
        message: "Clients fetched successfully",
        data: clients,
        count: clients.length,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async getClientById(req, res) {
    try {
      const { id } = req.params
      const client = await clientService.getClientById(id)

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        })
      }

      res.status(200).json({
        success: true,
        message: "Client fetched successfully",
        data: client,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params
      const { error, value } = updateClientSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        })
      }

      const client = await clientService.updateClient(id, value)

      res.status(200).json({
        success: true,
        message: "Client updated successfully",
        data: client,
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

  async deleteClient(req, res) {
    try {
      const { id } = req.params
      await clientService.deleteClient(id)

      res.status(200).json({
        success: true,
        message: "Client deleted successfully",
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

module.exports = new ClientController()

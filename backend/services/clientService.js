const Client = require("../models/Client")
const { Op } = require("sequelize")

class ClientService {
  async createClient(clientData) {
    try {
      const client = await Client.create(clientData)
      return client
    } catch (error) {
      throw new Error(`Error creating client: ${error.message}`)
    }
  }

  async getAllClients(includeInactive = false) {
    try {
      const whereClause = { is_deleted: false }
      if (!includeInactive) {
        whereClause.is_active = true
      }

      const clients = await Client.findAll({
        where: whereClause,
        order: [["created_at", "DESC"]],
      })
      return clients
    } catch (error) {
      throw new Error(`Error fetching clients: ${error.message}`)
    }
  }

  async getClientById(id) {
    try {
      const client = await Client.findOne({
        where: {
          id,
          is_deleted: false,
        },
      })
      return client
    } catch (error) {
      throw new Error(`Error fetching client: ${error.message}`)
    }
  }

  async updateClient(id, updateData) {
    try {
      const [updatedRowsCount] = await Client.update(updateData, {
        where: {
          id,
          is_deleted: false,
        },
      })

      if (updatedRowsCount === 0) {
        throw new Error("Client not found or already deleted")
      }

      return await this.getClientById(id)
    } catch (error) {
      throw new Error(`Error updating client: ${error.message}`)
    }
  }

  async deleteClient(id) {
    try {
      const [updatedRowsCount] = await Client.update(
        { is_deleted: true, updated_by: "admin" },
        { where: { id, is_deleted: false } },
      )

      if (updatedRowsCount === 0) {
        throw new Error("Client not found or already deleted")
      }

      return true
    } catch (error) {
      throw new Error(`Error deleting client: ${error.message}`)
    }
  }
}

module.exports = new ClientService()

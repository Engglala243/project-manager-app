const Joi = require("joi")

const createSubscriberSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
})

module.exports = {
  createSubscriberSchema,
}

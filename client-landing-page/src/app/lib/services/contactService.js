import api from "../axios";

export const contactService = {
  // Submit contact form
  submitContact: async (contactData) => {
    const payload = {
      full_name: contactData.fullName,
      email: contactData.email,
      phone: contactData.mobile,
      city: contactData.city,
    };
    return await api.post("/contacts", payload);
  },
};

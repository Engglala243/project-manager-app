const sequelize = require("../config/database")
const { Project, Client, Contact, Subscriber } = require("../models")

const seedData = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true })
    console.log("Database synced successfully")

    // Seed Projects
    const projects = await Project.bulkCreate([
      {
        name: "E-commerce Platform",
        description:
          "A comprehensive e-commerce solution built with React and Node.js, featuring user authentication, payment integration, inventory management, and admin dashboard.",
        image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
        created_by: "admin",
      },
      {
        name: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.",
        image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
        created_by: "admin",
      },
      {
        name: "Social Media Dashboard",
        description:
          "An analytics dashboard for social media management with data visualization, scheduling tools, and performance tracking across multiple platforms.",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
        created_by: "admin",
      },
      {
        name: "Learning Management System",
        description:
          "A complete LMS platform with course creation, student enrollment, progress tracking, and interactive learning modules.",
        image_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500",
        created_by: "admin",
      },
    ])

    // Seed Clients
    const clients = await Client.bulkCreate([
      {
        name: "Sarah Johnson",
        description:
          "Working with this team was exceptional. They delivered our project ahead of schedule and the quality exceeded our expectations. Their attention to detail and professional communication made the entire process smooth.",
        designation: "CEO, TechStart Inc.",
        image_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
        created_by: "admin",
      },
      {
        name: "Michael Chen",
        description:
          "The development team showed incredible expertise and creativity. They understood our vision perfectly and brought it to life with innovative solutions. Highly recommended for any web development project.",
        designation: "CTO, InnovateLab",
        image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
        created_by: "admin",
      },
      {
        name: "Emily Rodriguez",
        description:
          "Outstanding work! The team was responsive, professional, and delivered exactly what we needed. The project was completed on time and within budget. We will definitely work with them again.",
        designation: "Product Manager, Digital Solutions",
        image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
        created_by: "admin",
      },
      {
        name: "David Thompson",
        description:
          "Excellent collaboration and technical expertise. The team provided valuable insights and suggestions that improved our original concept. The final product exceeded our expectations in every way.",
        designation: "Founder, StartupHub",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
        created_by: "admin",
      },
    ])

    // Seed Sample Contacts
    const contacts = await Contact.bulkCreate([
      {
        full_name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1234567890",
        city: "New York",
        created_by: "user",
      },
      {
        full_name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        phone: "+1987654321",
        city: "Los Angeles",
        created_by: "user",
      },
    ])

    // Seed Sample Subscribers
    const subscribers = await Subscriber.bulkCreate([
      {
        email: "subscriber1@example.com",
        created_by: "user",
      },
      {
        email: "subscriber2@example.com",
        created_by: "user",
      },
      {
        email: "subscriber3@example.com",
        created_by: "user",
      },
    ])

    console.log("Sample data seeded successfully!")
    console.log(`Created ${projects.length} projects`)
    console.log(`Created ${clients.length} clients`)
    console.log(`Created ${contacts.length} contacts`)
    console.log(`Created ${subscribers.length} subscribers`)
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await sequelize.close()
  }
}

// Run the seed function
seedData()

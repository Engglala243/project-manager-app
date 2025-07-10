# FLIPR Backend API

A comprehensive Node.js/Express backend API for managing projects, clients, contacts, and newsletter subscribers. Built with modern technologies and best practices for scalability and maintainability.

## 🚀 Features

- **RESTful API** - Clean and intuitive API endpoints
- **Database Management** - MySQL with Sequelize ORM
- **Email Services** - Newsletter and contact form notifications
- **Input Validation** - Joi schema validation
- **Error Handling** - Comprehensive error handling middleware
- **CORS Support** - Cross-origin resource sharing enabled
- **Soft Deletes** - Data preservation with soft delete functionality
- **Database Seeding** - Sample data for development
- **Health Checks** - API health monitoring endpoint

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)
- **Git**

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=flipr_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DIALECT=mysql

   # Database Pool Configuration
   DB_POOL_MAX=5
   DB_POOL_MIN=0
   DB_POOL_IDLE=10000

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ADMIN_EMAIL=admin@yourcompany.com
   CONTACT_EMAIL=contact@yourcompany.com

   # Company Information
   COMPANY_NAME=FLIPR
   FRONTEND_URL=http://localhost:3000
   ```

4. **Set up the database**

   ```bash
   # Create database
   node scripts/create-database.js

   # Check database connection
   node scripts/check-database.js

   # Seed sample data (optional)
   node scripts/seedData.js
   ```

5. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🌐 API Endpoints

### Health Check

- **GET** `/api/health` - Check API health status

### Projects

- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects/:id` - Get project by ID
- **POST** `/api/projects` - Create new project
- **PUT** `/api/projects/:id` - Update project
- **DELETE** `/api/projects/:id` - Delete project (soft delete)

### Clients

- **GET** `/api/clients` - Get all clients
- **GET** `/api/clients/:id` - Get client by ID
- **POST** `/api/clients` - Create new client
- **PUT** `/api/clients/:id` - Update client
- **DELETE** `/api/clients/:id` - Delete client (soft delete)

### Contacts

- **GET** `/api/contacts` - Get all contacts (Admin)
- **GET** `/api/contacts/:id` - Get contact by ID (Admin)
- **POST** `/api/contacts` - Submit contact form
- **DELETE** `/api/contacts/:id` - Delete contact (Admin)

### Subscribers

- **GET** `/api/subscribers` - Get all subscribers (Admin)
- **GET** `/api/subscribers/:id` - Get subscriber by ID (Admin)
- **POST** `/api/subscribers` - Subscribe to newsletter
- **POST** `/api/subscribers/unsubscribe` - Unsubscribe from newsletter
- **POST** `/api/subscribers/send-newsletter` - Send newsletter (Admin)
- **DELETE** `/api/subscribers/:id` - Delete subscriber (Admin)

## 📊 API Usage Examples

### Create a Project

```bash
curl -X POST http://localhost:5000/api/projects \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My New Project",
    "description": "A detailed description of the project",
    "image_url": "https://example.com/image.jpg"
  }'
```

### Subscribe to Newsletter

```bash
curl -X POST http://localhost:5000/api/subscribers \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com"
  }'
```

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contacts \\
  -H "Content-Type: application/json" \\
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "city": "New York"
  }'
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/             # Route controllers
│   ├── clientController.js
│   ├── contactController.js
│   ├── projectController.js
│   └── subscriberController.js
├── middleware/              # Custom middleware
│   ├── corsHandler.js
│   ├── errorHandler.js
│   └── logger.js
├── models/                  # Sequelize models
│   ├── Client.js
│   ├── Contact.js
│   ├── Project.js
│   ├── Subscriber.js
│   └── index.js
├── routes/                  # API routes
│   ├── clientRoutes.js
│   ├── contactRoutes.js
│   ├── projectRoutes.js
│   └── subscriberRoutes.js
├── scripts/                 # Database scripts
│   ├── check-database.js
│   ├── create-database.js
│   └── seedData.js
├── services/                # Business logic
│   ├── clientService.js
│   ├── contactService.js
│   ├── emailService.js
│   ├── projectService.js
│   └── subscriberService.js
├── validate_schema/         # Joi validation schemas
│   ├── clientSchema.js
│   ├── contactSchema.js
│   ├── projectSchema.js
│   └── subscriberSchema.js
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── README.md               # Project documentation
└── server.js               # Main server file
```

## 🗄️ Database Schema

### Projects Table

- `id` (UUID, Primary Key)
- `name` (String, Required)
- `description` (Text, Required)
- `image_url` (String, Optional)
- `created_by` (String)
- `updated_by` (String)
- `is_active` (Boolean)
- `is_deleted` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Clients Table

- `id` (UUID, Primary Key)
- `name` (String, Required)
- `description` (Text, Required)
- `designation` (String, Required)
- `image_url` (String, Optional)
- `created_by` (String)
- `updated_by` (String)
- `is_active` (Boolean)
- `is_deleted` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Contacts Table

- `id` (UUID, Primary Key)
- `full_name` (String, Required)
- `email` (String, Required)
- `phone` (String, Required)
- `city` (String, Required)
- `created_by` (String)
- `updated_by` (String)
- `is_active` (Boolean)
- `is_deleted` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Subscribers Table

- `id` (UUID, Primary Key)
- `email` (String, Required, Unique)
- `created_by` (String)
- `updated_by` (String)
- `is_active` (Boolean)
- `is_deleted` (Boolean)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 🔧 Available Scripts

```bash
# Start the server in development mode
npm run dev

# Start the server in production mode
npm start

# Create database
npm run create-db

# Check database connection
npm run check-db

# Seed sample data
npm run seed

# Run tests (if configured)
npm test
```

## 📧 Email Configuration

The application uses Nodemailer for sending emails. Configure your email settings in the `.env` file:

1. **Gmail Setup**: Use App Passwords for Gmail SMTP
2. **Other Providers**: Update SMTP settings accordingly
3. **Email Templates**: Customize email templates in `services/emailService.js`

## 🚨 Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request
- **Not Found**: 404 Not Found
- **Duplicate Resources**: 409 Conflict
- **Server Errors**: 500 Internal Server Error
- **Database Errors**: Specific error messages

## 🔒 Security Features

- **Input Validation**: Joi schema validation
- **CORS Configuration**: Configurable cross-origin settings
- **SQL Injection Prevention**: Sequelize ORM protection
- **Error Information**: Limited error details in production

## 🚀 Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up email service credentials
4. Configure CORS for production domains

### Database Migration

```bash
# In production, run:
node scripts/create-database.js
# Database tables will be created automatically on first run
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Email: support@flipr.com
- Documentation: [API Docs](http://localhost:5000/api/health)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added email services and newsletter functionality
- **v1.2.0** - Enhanced error handling and validation

---

**Built with ❤️ by the FLIPR Team**

```

```

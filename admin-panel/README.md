# Admin Dashboard Panel

A comprehensive admin dashboard built with React for managing projects, clients, contact submissions, and newsletter subscribers. This application provides a clean, responsive interface for content management with real-time data handling.

## Features

### 📊 Dashboard Overview

- Statistics cards showing total projects, clients, contacts, and subscribers
- Recent activity feed
- Responsive design for all screen sizes

### 🗂️ Project Management

- Create, read, update, and delete projects
- Image upload support for project thumbnails
- Rich project descriptions
- Real-time project listing

### 👥 Client Management

- Complete client profile management
- Client testimonials and descriptions
- Profile image support
- Designation and role tracking

### 📧 Contact Form Management

- View all contact form submissions
- Search and filter contacts
- Contact details including name, email, phone, and city
- Delete unwanted submissions

### 📰 Newsletter Management

- Subscriber list management
- Email-based search functionality
- Subscriber status tracking (Active/Inactive)
- Bulk subscriber management

### 🎨 UI/UX Features

- Clean, modern interface with Tailwind CSS
- Toast notifications for user feedback
- Loading states and error handling
- Mobile-responsive sidebar navigation
- Smooth animations and transitions

## Tech Stack

- **Frontend Framework:** React 18
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** Heroicons
- **HTTP Client:** Axios
- **Build Tool:** Create React App
- **Routing:** Client-side routing with state management

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 14 or higher)
- npm or yarn package manager
- A backend API server running on `http://localhost:3003`

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd admin-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   \`\`\`env
   REACT_APP_API_BASE_URL=http://localhost:3003/api
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Requirements

This application expects a REST API server running on `http://localhost:3003` with the following endpoints:

### Projects API

- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Clients API

- `GET /api/clients` - Fetch all clients
- `POST /api/clients` - Create a new client
- `PUT /api/clients/:id` - Update a client
- `DELETE /api/clients/:id` - Delete a client

### Contacts API

- `GET /api/contacts` - Fetch all contact submissions
- `DELETE /api/contacts/:id` - Delete a contact submission

### Subscribers API

- `GET /api/subscribers` - Fetch all newsletter subscribers
- `DELETE /api/subscribers/:id` - Remove a subscriber

## Project Structure

\`\`\`
src/
├── components/
│ └── Layout/
│ ├── common/
│ │ ├── LoadingSpinner.jsx
│ │ ├── Toast.jsx
│ │ └── ToastContainer.jsx
│ ├── Layout.jsx
│ ├── Navbar.jsx
│ └── Sidebar.jsx
├── hooks/
│ └── useToast.js
├── pages/
│ ├── ContactSubmissions.jsx
│ ├── Dashboard.jsx
│ ├── ManageClients.jsx
│ ├── ManageProjects.jsx
│ └── NewsletterSubscribers.jsx
├── store/
│ ├── slices/
│ │ ├── clientsSlice.js
│ │ ├── contactsSlice.js
│ │ ├── projectsSlice.js
│ │ └── subscribersSlice.js
│ └── store.js
├── utils/
│ └── axios.js
├── App.js
├── App.css
└── index.js
\`\`\`

## Available Scripts

### Development

\`\`\`bash
npm start
\`\`\`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### Testing

\`\`\`bash
npm test
\`\`\`
Launches the test runner in interactive watch mode

### Production Build

\`\`\`bash
npm run build
\`\`\`
Builds the app for production to the `build` folder

### Code Analysis

\`\`\`bash
npm run eject
\`\`\`
**Note: This is a one-way operation!** Ejects from Create React App for full configuration control.

## Configuration

### API Configuration

The application uses Axios for API calls. Configure the base URL in `src/utils/axios.js`:

\`\`\`javascript
const api = axios.create({
baseURL: "http://localhost:3003/api",
timeout: 10000,
});
\`\`\`

### Authentication

The app includes token-based authentication setup. Tokens are stored in localStorage and automatically included in API requests.

### Error Handling

- Global error handling with toast notifications
- Network error detection and user feedback
- Loading states for all async operations

## Usage

### Navigation

- Use the sidebar to navigate between different sections
- Mobile users can access the sidebar via the hamburger menu
- The dashboard provides an overview of all data

### Managing Data

1. **Projects:** Add new projects with images and descriptions
2. **Clients:** Create client profiles with testimonials
3. **Contacts:** Review and manage contact form submissions
4. **Subscribers:** Monitor newsletter subscription list

### Search and Filter

- Use the search bars to quickly find specific records
- Filter functionality available on contact and subscriber pages

## Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Troubleshooting

### Common Issues

**API Connection Errors:**

- Ensure your backend server is running on port 3003
- Check CORS configuration on your backend
- Verify API endpoint URLs match your backend routes

**Build Failures:**

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors if using TypeScript
- Ensure all dependencies are compatible

**Styling Issues:**

- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes
- Ensure responsive breakpoints are correctly applied

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Create an issue in the repository
- Check the documentation for common solutions
- Review the troubleshooting section above

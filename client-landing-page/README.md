# Portfolio Website - Your Vision, Our Innovation

A modern, responsive portfolio website built with Next.js 15, Redux Toolkit, and Tailwind CSS. This application showcases projects, client testimonials, and provides contact and newsletter subscription functionality with both mock and real API support.

## 🚀 Features

- **Hero Section**: Eye-catching landing page with gradient backgrounds and smooth animations
- **Projects Showcase**: Dynamic project gallery with loading states, error handling, and fallback images
- **Client Testimonials**: Interactive client reviews with star ratings and profile images
- **Contact Form**: Multi-field contact form with real-time validation and submission handling
- **Newsletter Subscription**: Email subscription with success/error feedback and auto-clearing messages
- **Responsive Design**: Mobile-first approach optimized for all screen sizes
- **State Management**: Redux Toolkit for efficient and predictable state management
- **API Integration**: Flexible API client supporting both mock and real backend endpoints
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios with interceptors
- **Fonts**: Geist Sans & Geist Mono (optimized with next/font)
- **TypeScript**: Partial TypeScript support for store configuration
- **Icons**: Custom SVG animations and Lucide React icons

## 📁 Project Structure

```
app/
├── api/                 # Next.js API routes (mock endpoints)
│   └── projects/
│       └── route.ts
├── components/          # React components
│   ├── HeroSection.jsx
│   ├── ProjectsSection.jsx
│   ├── ClientsSection.jsx
│   ├── ContactSection.jsx
│   └── NewsletterSection.jsx
├── lib/                 # Application logic
│   ├── slices/          # Redux slices
│   │   ├── projectsSlice.js
│   │   ├── clientsSlice.js
│   │   ├── contactSlice.js
│   │   └── newsletterSlice.js
│   ├── services/        # API service layers
│   │   ├── projectsService.js
│   │   ├── clientsService.js
│   │   ├── contactService.js
│   │   └── newsletterService.js
│   ├── hooks/           # Custom Redux hooks
│   │   └── redux.js
│   ├── store.ts         # Redux store configuration
│   └── axios.js         # Axios configuration with interceptors
├── globals.css          # Global styles and Tailwind imports
├── layout.js           # Root layout with providers
├── page.js             # Home page composition
└── providers.js        # Redux provider wrapper
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd portfolio-website
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables (optional):**

```bash
# Create .env.local file for custom API configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3003/api
```

4. **Start the development server:**

```bash
npm run dev

```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 API Configuration

The application supports both **mock APIs** (for development) and **real backend APIs** (for production).

### Mock API (Default)

By default, the application uses built-in Next.js API routes that serve mock data:

- **Projects**: `/api/projects` - Returns sample project data
- **Clients**: Needs to be implemented (currently shows loading state)
- **Contact**: Needs to be implemented (form submission will fail)
- **Newsletter**: Needs to be implemented (subscription will fail)

### Real Backend API

To connect to a real backend, set the `NEXT_PUBLIC_API_BASE_URL` environment variable:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

#### Expected API Endpoints

**Projects API:**

- `GET /api/projects` - Fetch all projects
- `GET /api/projects/:id` - Fetch project by ID

**Response format:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Project Name",
      "description": "Project description",
      "image_url": "https://example.com/image.jpg",
      "is_active": true
    }
  ],
  "count": 1
}
```

**Clients API:**

- `GET /api/clients` - Fetch all client testimonials
- `GET /api/clients/:id` - Fetch client by ID

**Response format:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Client Name",
      "designation": "CEO, Company",
      "description": "Testimonial text",
      "image_url": "https://example.com/avatar.jpg",
      "is_active": true
    }
  ],
  "count": 1
}
```

**Contact API:**

- `POST /api/contacts` - Submit contact form

**Request format:**

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "city": "New York"
}
```

**Newsletter API:**

- `POST /api/subscribers` - Subscribe to newsletter
- `POST /api/subscribers/unsubscribe` - Unsubscribe

**Request format:**

```json
{
  "email": "user@example.com"
}
```

## 🎨 Styling & Design

The project uses **Tailwind CSS** with:

- **Custom Color Palette**: Avoids indigo/blue colors as specified
- **Responsive Design**: Mobile-first approach with breakpoint-specific styles
- **Custom Animations**: Smooth transitions and hover effects
- **Dark Mode Support**: CSS variables for theme switching
- **Custom Scrollbar**: Styled scrollbars for better UX
- **Loading States**: Skeleton loaders and spinner animations

### Key Design Features

- Gradient backgrounds with overlay effects
- Card-based layouts with hover animations
- Form validation with real-time feedback
- Image fallbacks for broken URLs
- Smooth scrolling and scroll indicators

## 🔄 State Management

The application uses **Redux Toolkit** with the following slices:

### Projects Slice

- Manages project data fetching and display
- Handles loading states and error messages
- Supports individual project selection

### Clients Slice

- Manages client testimonial data
- Handles loading and error states
- Supports client filtering and selection

### Contact Slice

- Manages contact form submission
- Handles form validation and success/error states
- Auto-clears messages after timeout

### Newsletter Slice

- Manages newsletter subscription
- Handles email validation and submission
- Provides success/error feedback

## 🧩 Components Overview

### HeroSection

- **Purpose**: Landing page with call-to-action
- **Features**: Gradient background, animated scroll indicator
- **Responsive**: Adapts text size and spacing for mobile

### ProjectsSection

- **Purpose**: Showcase portfolio projects
- **Features**: Grid layout, loading skeletons, error handling
- **Data**: Fetches from projects API with fallback images

### ClientsSection

- **Purpose**: Display client testimonials
- **Features**: Star ratings, profile images, active indicators
- **Layout**: Responsive card grid with hover effects

### ContactSection

- **Purpose**: Contact form for lead generation
- **Features**: Multi-field validation, loading states, success feedback
- **Validation**: Real-time form validation with error messages

### NewsletterSection

- **Purpose**: Email subscription for marketing
- **Features**: Email validation, submission handling, auto-clearing messages
- **Design**: Gradient background with centered form layout

## 🚀 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Development Workflow

1. **Component Development**: Create new components in `app/components/`
2. **State Management**: Add new slices in `app/lib/slices/`
3. **API Integration**: Create services in `app/lib/services/`
4. **Styling**: Use Tailwind classes with custom CSS when needed
5. **Testing**: Test components with different data states

### Code Style Guidelines

- Use functional components with React hooks
- Follow Redux Toolkit patterns for state management
- Implement proper error boundaries and loading states
- Use TypeScript for store configuration
- Follow responsive design principles
- Handle edge cases (empty data, network errors, etc.)

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: Set `NEXT_PUBLIC_API_BASE_URL` in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify**: Configure build settings for Next.js
- **AWS Amplify**: Use the Next.js build configuration
- **Railway**: Connect GitHub and deploy automatically
- **DigitalOcean App Platform**: Use Node.js buildpack

### Environment Variables for Production

```bash
# Required for production with real backend
NEXT_PUBLIC_API_BASE_URL=https://your-production-api.com/api

# Optional: Add analytics, monitoring, etc.
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🔧 Troubleshooting

### Common Issues

**Network Error in Projects Section:**

- Ensure `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Check if your backend API is running and accessible
- Verify CORS settings on your backend

**Images Not Loading:**

- Check image URLs in your API responses
- Ensure images are publicly accessible
- Verify CORS headers for external images

**Form Submissions Failing:**

- Check API endpoint URLs and request formats
- Verify backend is accepting POST requests
- Check network tab for detailed error messages

**Redux State Not Updating:**

- Ensure actions are dispatched correctly
- Check Redux DevTools for action flow
- Verify reducer logic in slices

### Development Tips

- Use Redux DevTools browser extension for debugging
- Check browser console for detailed error messages
- Use network tab to inspect API requests/responses
- Test with different screen sizes for responsive design

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the code style guidelines
4. **Test thoroughly**: Ensure all components work correctly
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes clearly

### Contribution Guidelines

- Follow existing code patterns and naming conventions
- Add proper error handling for new features
- Update documentation for significant changes
- Test responsive design on multiple screen sizes
- Ensure accessibility best practices

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- **Issues**: Create an issue in the GitHub repository
- **Documentation**: Check this README and inline code comments
- **Community**: Join discussions in the repository

## 🙏 Acknowledgments

- **Next.js Team**: For the incredible React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Redux Toolkit**: For simplified state management
- **Vercel**: For hosting and deployment platform
- **Open Source Community**: For the amazing tools and libraries

---

**Built with ❤️ using Next.js and modern web technologies**

```

```

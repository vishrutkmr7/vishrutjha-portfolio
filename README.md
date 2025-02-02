# Vishrut Jha's Portfolio Website

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=vishrutjha-portfolio)](https://vercel.com/vishrutkmr7s-projects/vishrutjha-portfolio)

Welcome to my portfolio website repository! Visit [vishrutjha.com](https://vishrutjha.com) to see it live. This modern, responsive portfolio showcases my projects, professional journey, and media appearances.

## 🚀 Features

- Modern, responsive design with dark mode support
- Dual AI integration:
  - Interactive AI assistant powered by Perplexity Sonar for portfolio inquiries
  - Streaming AI chat interface using Vercel AI SDK
- Project showcase with detailed cards and links
- Professional journey timeline with interactive elements
- Media appearances and publications section
- LeetCode statistics integration
- Dynamic charting and visualizations
- Smooth animations and transitions using Framer Motion
- Type animations for dynamic text
- SEO optimized with automatic sitemap generation
- Performance analytics and insights
- Fully accessible UI components
- Real-time chat interface with structured responses
- Smart context-aware conversations about professional experience
- Multi-step tool calls for enhanced AI interactions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 18.3
- **Package Manager**: [Bun](https://bun.sh/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [Shadcn UI](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: Radix UI primitives
- **AI Integration**:
  - [Vercel AI SDK](https://sdk.vercel.ai/) for streaming chat interface
  - Perplexity Sonar API for knowledge base
- **Charts**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion and react-type-animation
- **Icons**: Lucide React and React Icons
- **Code Quality**: ESLint, Prettier, Husky, lint-staged
- **Analytics**: Vercel Analytics and Speed Insights
- **Deployment**: [Vercel](https://vercel.com/)

## 🏃‍♂️ Running Locally

```bash
# Clone the repository
git clone https://github.com/vishrutkmr7/vishrutjha-portfolio.git

# Navigate to the directory
cd vishrutjha-portfolio

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your Perplexity API key and other AI configurations to .env.local

# Start the development server
bun dev
```

Visit `http://localhost:3000` to see the website.

## 🤖 AI Integration

The portfolio features a sophisticated dual AI system:

### Vercel AI SDK Integration

- Streaming chat interface with real-time responses
- Multi-step tool calls for complex interactions
- Structured data streaming alongside responses
- OpenTelemetry support for observability
- Custom request headers and body customization
- Enhanced error handling and validation

### Perplexity Sonar Assistant

- Provides accurate information about my professional background
- Answers questions about projects and experience
- Cites relevant sources for all information
- Maintains context-aware conversations
- Ensures responses are focused and relevant
- Provides structured, verifiable information

## 📦 Build and Deploy

```bash
# Create a production build
bun run build

# Start the production server
bun start
```

The website is automatically deployed to Vercel on every push to the main branch.

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Connect with Me

- Website: [vishrutjha.com](https://vishrutjha.com)
- GitHub: [@vishrutkmr7](https://github.com/vishrutkmr7)

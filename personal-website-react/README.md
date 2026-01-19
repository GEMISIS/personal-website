# Personal Website (React Version)

This is a modern React-based version of the personal website, migrated from vanilla JavaScript to Next.js with TypeScript and react-bootstrap.

## Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React Bootstrap** for UI components
- **Static Export** for deployment to S3, GitHub Pages, or similar
- **Configuration-driven** design using JSON files
- **GitHub API integration** for automatic project fetching
- **RSS feed integration** for blog posts
- **Google reCAPTCHA** for contact form protection
- **Formspree integration** for contact form handling

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Install dependencies:

```bash
cd personal-website-react
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

All configuration is done through JSON files in the `public/configs/` directory:

- `config.json` - Main site configuration (user info, social media, contact form settings)
- `projects.json` - Manual project listings and GitHub username for auto-fetching
- `experience.json` - Timeline events (education, career, achievements)
- `resumes.json` - Resume files and metadata

## Building for Production

### Static Export

Build the static site:

```bash
npm run build
```

This will generate static files in the `out/` directory, ready for deployment.

## Deployment

### AWS S3

1. Build the static site:

```bash
npm run build
```

2. Upload to S3:

```bash
aws s3 sync out/ s3://your-bucket-name --delete --acl public-read
```

3. Configure S3 bucket for static website hosting:
   - Index document: `index.html`
   - Error document: `404.html`

### GitHub Pages

1. Build the static site:

```bash
npm run build
```

2. Deploy the `out/` directory to your GitHub Pages branch.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with ConfigProvider
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects page
│   ├── experience/        # Experience page
│   ├── contact/           # Contact page
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── home/              # Home page components
│   ├── projects/          # Projects page components
│   ├── experience/        # Experience page components
│   └── contact/           # Contact page components
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── styles/                # CSS stylesheets
```

## Key Differences from Original

- **React Components** instead of vanilla DOM manipulation
- **TypeScript** for type safety
- **react-bootstrap** instead of jQuery + Bootstrap
- **Next.js App Router** for routing
- **Static export** for deployment
- **Custom hooks** for reusable logic
- **Context API** for global state management

## Technologies Used

- Next.js 15
- React 18
- TypeScript
- react-bootstrap
- Bootstrap 4
- Font Awesome 4.7

## License

Same as the original project.

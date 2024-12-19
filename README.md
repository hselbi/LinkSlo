# LinkSlo - URL Shortener

LinkSlo is a modern, feature-rich URL shortening service built with Next.js 13. Transform long URLs into clean, manageable links with optional emoji aliases, password protection, and click tracking.

![LinkSlo Screenshot](/public/og-image.png)

## 🚀 Features

- **URL Shortening**: Convert long URLs into concise, shareable links
- **Emoji URLs**: Create custom URLs using emoji combinations
- **Advanced Options**:
  - Password protection for sensitive links
  - Click limit tracking
  - Bot protection
  - Custom aliases
- **Modern UI**: Clean, responsive interface with dark mode support
- **Real-time Feedback**: Instant success/error notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons
- **HTTP Client**: Axios
- **Animation**: Framer Motion

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/hselbi/link-slo.git
cd link-slo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

No additional configuration is required as the service uses the public Spoo.me API. However, you can customize the UI by modifying the following files:

- `app/layout.tsx` - Main layout and metadata
- `components/url-shortener.tsx` - Core shortening functionality
- `lib/url-service.ts` - API integration
- `app/globals.css` - Global styles

## 📝 API Usage

The service integrates with the Spoo.me API. Available endpoints:

### Standard URL Shortening
```typescript
POST https://spoo.me/
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  url: string;          // Required
  alias?: string;       // Optional
  password?: string;    // Optional
  max-clicks?: number;  // Optional
  block-bots?: boolean; // Optional
}
```

### Emoji URL Shortening
```typescript
POST https://spoo.me/emoji/
Content-Type: application/x-www-form-urlencoded
Accept: application/json

{
  url: string;          // Required
  alias?: string;       // Optional (emoji sequence)
  password?: string;    // Optional
  max-clicks?: number;  // Optional
  block-bots?: boolean; // Optional
}
```

## 🌟 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spoo.me](https://spoo.me) for providing the URL shortening API
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com) for hosting

## 📱 Contact

- Website: [your-website.com](https://your-website.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

---

Made with ❤️ by [Your Name]
'use client';

export function Hero() {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6 relative">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gray-900/[0.03] transform -translate-x-20" />
            <div className="w-40 h-40 rounded-full bg-gray-900/[0.03] transform translate-x-20" />
          </div>
          <svg 
            viewBox="0 0 120 120" 
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="from-primary" />
                <stop offset="100%" className="to-primary/80" />
              </linearGradient>
            </defs>
            <path
              d="M20,60 A20,20 0 1,1 60,60 A20,20 0 1,0 100,60 A20,20 0 1,1 60,60 A20,20 0 1,0 20,60"
              stroke="url(#logo-gradient)"
              strokeWidth="6"
              fill="none"
              className="text-primary"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
        LinkSlo
      </h1>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Simple & Secure URL Shortener
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your long URLs into clean, manageable links in seconds.
          Professional-grade URL shortening for everyone.
        </p>
      </div>
    </div>
  );
}
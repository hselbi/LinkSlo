'use client';

import { CheckCircle2, Shield, Zap } from 'lucide-react';
import { FeatureCard } from '@/components/feature-card';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate shortened URLs instantly with our optimized infrastructure.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your links are safe with us. We use industry-standard security measures.',
  },
  {
    icon: CheckCircle2,
    title: 'Easy to Use',
    description: 'Simple, intuitive interface for quick URL shortening.',
  },
];

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}
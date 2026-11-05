declare module "@maxebina/max-ds" {
  import { ComponentProps, ReactNode } from "react";

  export interface NavbarProps {
    logo?: string;
    links?: { label: string; href: string }[];
    ctaText?: string;
    ctaHref?: string;
  }
  export const Navbar: (props: NavbarProps) => ReactNode;

  export interface HeroSectionProps {
    headline: ReactNode;
    subheadline?: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    ctaPrimaryHref?: string;
    ctaSecondaryHref?: string;
    headlineText?: string;
    logo?: ReactNode;
    logoText?: string;
    eyebrow?: ReactNode;
  }
  export const HeroSection: (props: HeroSectionProps) => ReactNode;

  export interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    align?: "center" | "left";
  }
  export const SectionHeader: (props: SectionHeaderProps) => ReactNode;

  export interface ServiceCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    badge?: string;
    ctaText?: string;
    href?: string;
  }
  export const ServiceCard: (props: ServiceCardProps) => ReactNode;

  export interface TestimonialCardProps {
    name: string;
    company: string;
    role: string;
    rating: number;
    testimonial: string;
  }
  export const TestimonialCard: (props: TestimonialCardProps) => ReactNode;

  export interface AnimatedCounterProps {
    end: number;
    suffix?: string;
    label: string;
    icon: ReactNode;
  }
  export const AnimatedCounter: (props: AnimatedCounterProps) => ReactNode;

  export interface FAQItem {
    question: string;
    answer: string;
  }
  export interface FAQProps {
    items: FAQItem[];
  }
  export const FAQ: (props: FAQProps) => ReactNode;

  export interface FooterLink {
    title: string;
    items: { label: string; href: string }[];
  }
  export interface FooterProps {
    logo?: string;
    links?: FooterLink[];
    social?: { platform: string; href: string; icon: ReactNode }[];
    copyright?: string;
    onLinkClick?: (label: string, href: string) => void;
  }
  export const Footer: (props: FooterProps) => ReactNode;

  export const WhatsAppFloat: () => ReactNode;
  export const ParticlesBackground: (props?: { className?: string }) => ReactNode;
}

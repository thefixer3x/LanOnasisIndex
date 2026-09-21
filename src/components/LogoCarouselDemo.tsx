"use client"

import { LogoCarousel } from './ui/logo-carousel'
import '../components/ui/logo-carousel.css'

// Financial Institution Partners
const financialPartners = [
  {
    src: "/logos/ecobank.png",
    alt: "Ecobank",
    href: "https://ecobank.com",
    fallback: "EB"
  },
  {
    src: "/logos/_missing.svg",
    alt: "First Bank Nigeria",
    href: "https://firstbanknigeria.com",
    fallback: "FBN"
  },
  {
    src: "/logos/standard-chartered.png",
    alt: "Standard Chartered",
    href: "https://standardchartered.com",
    fallback: "SC"
  },
  {
    src: "/logos/mtn.png",
    alt: "MTN Group",
    href: "https://mtn.com",
    fallback: "MTN"
  },
  {
    src: "/logos/_missing.svg",
    alt: "Access Bank",
    href: "https://accessbankplc.com",
    fallback: "AB"
  },
  {
    src: "/logos/safaricom.png",
    alt: "Safaricom",
    href: "https://safaricom.co.ke",
    fallback: "SF"
  },
  {
    src: "/logos/_missing.svg",
    alt: "Guaranty Trust Bank",
    href: "https://gtbank.com",
    fallback: "GTB"
  },
  {
    src: "/logos/absa.png",
    alt: "Absa Group",
    href: "https://absa.africa",
    fallback: "ABSA"
  }
];

// Technology Partners
const techPartners = [
  {
    src: "/logos/stripe.png",
    alt: "Stripe",
    href: "https://stripe.com",
    fallback: "ST"
  },
  {
    src: "/logos/paypal.svg",
    alt: "PayPal",
    href: "https://paypal.com",
    fallback: "PP"
  },
  {
    src: "/logos/openai.svg",
    alt: "OpenAI",
    href: "https://openai.com",
    fallback: "AI"
  },
  {
    src: "/logos/supabase.png",
    alt: "Supabase",
    href: "https://supabase.com",
    fallback: "SB"
  },
  {
    src: "/logos/github.png",
    alt: "GitHub",
    href: "https://github.com",
    fallback: "GH"
  },
  {
    src: "/logos/vercel.svg",
    alt: "Vercel",
    href: "https://vercel.com",
    fallback: "VC"
  },
  {
    src: "/logos/anthropic.png",
    alt: "Anthropic",
    href: "https://anthropic.com",
    fallback: "AN"
  },
  {
    src: "/logos/aws.png",
    alt: "Amazon AWS",
    href: "https://aws.amazon.com",
    fallback: "AWS"
  },
  {
    src: "/logos/azure.png",
    alt: "Microsoft Azure",
    href: "https://azure.microsoft.com",
    fallback: "AZ"
  },
  {
    src: "/logos/slack.png",
    alt: "Slack",
    href: "https://slack.com",
    fallback: "SL"
  },
  {
    src: "/logos/notion.svg",
    alt: "Notion",
    href: "https://notion.so",
    fallback: "NO"
  },
  {
    src: "/logos/figma.svg",
    alt: "Figma",
    href: "https://figma.com",
    fallback: "FG"
  }
];

export function LogoCarouselDemo() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powering innovation with leading financial institutions and technology companies across Africa and globally
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Financial Partners */}
          <div>
            <h3 className="text-2xl font-semibold text-white text-center mb-8">Financial Institutions</h3>
            <LogoCarousel 
              logos={financialPartners} 
              speed={30} 
              pauseOnHover={true}
            />
          </div>
          
          {/* Technology Partners */}
          <div>
            <h3 className="text-2xl font-semibold text-white text-center mb-8">Technology Partners</h3>
            <LogoCarousel 
              logos={techPartners} 
              speed={25} 
              pauseOnHover={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

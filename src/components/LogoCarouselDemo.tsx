"use client"

import { LogoCarousel } from './ui/logo-carousel'
import '../components/ui/logo-carousel.css'

// Financial Institution Partners
const financialPartners = [
  {
    src: "https://logo.clearbit.com/ecobank.com",
    alt: "Ecobank",
    href: "https://ecobank.com",
    fallback: "EB"
  },
  {
    src: "https://logo.clearbit.com/firstbanknigeria.com", 
    alt: "First Bank Nigeria",
    href: "https://firstbanknigeria.com",
    fallback: "FBN"
  },
  {
    src: "https://logo.clearbit.com/sc.com",
    alt: "Standard Chartered",
    href: "https://standardchartered.com",
    fallback: "SC"
  },
  {
    src: "https://logo.clearbit.com/mtn.com",
    alt: "MTN Group",
    href: "https://mtn.com",
    fallback: "MTN"
  },
  {
    src: "https://logo.clearbit.com/accessbankplc.com",
    alt: "Access Bank",
    href: "https://accessbankplc.com",
    fallback: "AB"
  },
  {
    src: "https://logo.clearbit.com/safaricom.co.ke",
    alt: "Safaricom",
    href: "https://safaricom.co.ke",
    fallback: "SF"
  },
  {
    src: "https://logo.clearbit.com/gtbank.com",
    alt: "Guaranty Trust Bank",
    href: "https://gtbank.com",
    fallback: "GTB"
  },
  {
    src: "https://logo.clearbit.com/absa.africa",
    alt: "Absa Group",
    href: "https://absa.africa",
    fallback: "ABSA"
  }
];

// Technology Partners
const techPartners = [
  {
    src: "https://logo.clearbit.com/stripe.com",
    alt: "Stripe",
    href: "https://stripe.com",
    fallback: "ST"
  },
  {
    src: "https://logo.clearbit.com/paypal.com",
    alt: "PayPal", 
    href: "https://paypal.com",
    fallback: "PP"
  },
  {
    src: "https://logo.clearbit.com/openai.com",
    alt: "OpenAI",
    href: "https://openai.com",
    fallback: "AI"
  },
  {
    src: "https://logo.clearbit.com/supabase.com",
    alt: "Supabase",
    href: "https://supabase.com",
    fallback: "SB"
  },
  {
    src: "https://logo.clearbit.com/github.com",
    alt: "GitHub",
    href: "https://github.com",
    fallback: "GH"
  },
  {
    src: "https://logo.clearbit.com/vercel.com",
    alt: "Vercel",
    href: "https://vercel.com",
    fallback: "VC"
  },
  {
    src: "https://logo.clearbit.com/anthropic.com",
    alt: "Anthropic",
    href: "https://anthropic.com",
    fallback: "AN"
  },
  {
    src: "https://logo.clearbit.com/aws.amazon.com",
    alt: "Amazon AWS",
    href: "https://aws.amazon.com",
    fallback: "AWS"
  },
  {
    src: "https://logo.clearbit.com/azure.microsoft.com",
    alt: "Microsoft Azure",
    href: "https://azure.microsoft.com",
    fallback: "AZ"
  },
  {
    src: "https://logo.clearbit.com/slack.com",
    alt: "Slack",
    href: "https://slack.com",
    fallback: "SL"
  },
  {
    src: "https://logo.clearbit.com/notion.so",
    alt: "Notion",
    href: "https://notion.so",
    fallback: "NO"
  },
  {
    src: "https://logo.clearbit.com/figma.com",
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

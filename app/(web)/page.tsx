import { Building2, Clock, Globe2, HeartHandshake, Package, Plane, ShieldCheck, Truck, Warehouse } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { FeatureCard } from "./components/feature-card"
import { ProcessCard } from "./components/process-card"
import { ServiceCard } from "./components/service-card"
import { PricingTable } from "./components/pricing-table"
import { ContactCard } from "./components/contact-card"
import { userService } from '@/lib/axios/services/user.service'
import type { Metadata } from 'next'
import Image from 'next/image'
import { WAREHOUSE } from '@/public'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const aboutData = await userService.getAboutUs()
    
    return {
      title: aboutData?.meta_title || 'USA2GEORGIA',
      description: aboutData?.meta_description || 'International shipping and logistics services',
      keywords: aboutData?.meta_keyword || '',
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return {
      title: 'USA2GEORGIA',
      description: 'International shipping and logistics services',
    }
  }
}

export default async function HomePage() {
  const [aboutData, siteLabels, pricingData] = await Promise.all([
    userService.getAboutUs(),
    userService.getAllSiteLabels(),
    userService.getPricing(),
  ])

  // Map icons to features
  const featureIcons: { [key: string]: React.ReactNode } = {
    "Free Registration": <Package className="h-6 w-6" />,
    "Addresses in the USA, Turkey, and China": <Globe2 className="h-6 w-6" />,
    "Daily Flights and Shipments": <Plane className="h-6 w-6" />,
    "Parcel Management Panel": <Package className="h-6 w-6" />,
    "Tracking System": <ShieldCheck className="h-6 w-6" />,
  }

  return (
    <div className="space-y-24 pb-24">
      {/* About Section */}
      <section className="space-y-12">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{aboutData?.title || 'About us'}</h1>
            <div 
              className="text-gray-600"
              dangerouslySetInnerHTML={{ 
                __html: aboutData?.description || 'Loading content...'
              }} 
            />
          </div>
          <div className="bg-secondary rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">USA2GEORGIA Offers You:</h2>
            <div
              dangerouslySetInnerHTML={{ 
                __html: aboutData?.short_description || 'Loading content...'
              }}
            />
          </div>
        </div>
        <div className="aspect-[2/1] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={WAREHOUSE}
            alt="USA2GEORGIA Warehouse"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Why USA2GEORGIA Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Why USA2GEORGIA?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteLabels.whyUs.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={featureIcons[feature.title] || <Package className="h-6 w-6" />}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">How does it work?</h2>
        <div className="grid gap-4">
          {siteLabels.howItWorks.map((process) => (
            <ProcessCard
              key={process.title}
              title={process.title}
              description={process.description || ''}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">What USA2GEORGIA Offers You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {siteLabels.whatWeOffer.map((service) => (
            <ServiceCard
              key={service.title}
              icon={<Building2 className="h-8 w-8" />}
              title={service.title}
              description={service.description || ''}
            />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="space-y-8 scroll-mt-16">
        <h2 className="text-2xl font-bold">{pricingData.title || 'Pricing'}</h2>
        <div className="prose prose-gray max-w-none">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: pricingData.description 
            }} 
            className="text-gray-600"
          />
        </div>
        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
          Calculate Cost
        </Button>
      </section>

      {/* Contact Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold">Contact</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ContactCard
            title="Tbilisi Branch"
            address="41, Tsereteli Ave"
            hours={["Mon-Sat: 10:00 - 19:00", "Sun: 10:00 - 17:00"]}
            phone="+995 32 2 60 30 60"
          />
          <ContactCard
            title="Batumi Branch"
            address="Tbel Abuseridze 14"
            hours={["Mon-Sat: 10:00 - 19:00", "Sun: Closed"]}
            phone="+995 32 2 60 30 60"
          />
          <ContactCard
            title="U.S. Representative"
            address="New York, NY 10001"
            hours={["Mon-Fri: 09:00 - 18:00", "Sat-Sun: Closed"]}
          />
        </div>
      </section>
    </div>
  )
}


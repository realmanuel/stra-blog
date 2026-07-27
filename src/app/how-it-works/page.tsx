'use client'

import CustomCursor from '@/components/BlogCursor'
import Navbar from '@/components/BlogNavbar'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/BlogFooter'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function HowItWorksPage() {
  useScrollReveal()

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="pt-24">
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}
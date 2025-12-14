import React from 'react'
import Hero from '../Hero/Hero'
import HowItWorks from '../HowItWorks/HowItWorks'
import Features from '../Features/Features'
import Benefits from '../Benefits/Benefits'
import CoveredCategories from '../CoveredCategories/CoveredCategories'

export default function Home() {
  return (
    <div>
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <CoveredCategories />
    </div>
  )
}

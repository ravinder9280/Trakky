import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import {howItWorks} from '@/data/howitWorks'
import { VortexDemo } from '@/components/vertoxDemo'
const page = () => {
  return (
    <div className=' w-full flex items-center pt-2  flex-col justify-center'>
      {/* <div className='bg-green-500 w-full p-8 flex items-center text-center  gap-4 flex-wrap rounded justify-center flex-col text-white'>
      <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl  gradient-title animate-gradient">
      Personalized AI Meal Plans
          </h1>
          <p className="mx-auto max-w-[600px] text-muted md:text-xl">
                     Our AI meal planning system is designed to make meal planning easy and efficient.
        </p>
        <Link className='' href={'/mealplan'}>
        <Button size="lg" className="px-6 bg-white hover:text-green-300 text-green-500">
              Get Started
            </Button>
        </Link>

      </div> */}
      <VortexDemo/>
      
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Follow these simple steps to get your personalized meal plan
            </p>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-400  flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default page
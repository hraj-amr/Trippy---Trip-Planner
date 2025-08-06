'use client'

import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Globe2, icons, Landmark, Plane, PlaneTakeoff, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


export const suggestions=[
    {
        title: 'Plan New Trip',
        icon: <PlaneTakeoff className='text-primary h-5 w-5'/>
    },
    {
        title: 'Inspire me where to go',
        icon: <Plane className='text-primary h-5 w-5'/>
    },
    {
        title: 'Discover Hidden Gems',
        icon: <Landmark className='text-primary h-5 w-5'/>
    },
    {
        title: 'Adventure Destination',
        icon: <Globe2 className='text-primary h-5 w-5'/>
    }
    
]

function Hero() {

    const user = useUser()
    const router = useRouter()
    const onSend = () => {
        if(!user){
            router.push('/sign-in')
            return;
        }
        router.push('/create-new-trip')
    }

  return (
    <div className='mt-24 w-full flex flex-col items-center space-y-10'>
        {/* content */}
        <div className='max-w-3xl w-full text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font-bold'>Hey, I'm your personal <span className='text-primary'>Trippy</span></h1>
            <p className='text-lg'>Tell me what you want, and I'll handle the rest: Hotels, Trip Planning - All in seconds</p>
        </div>

        {/* Input Box */}
        <div className='w-full max-w-3xl'>
            <div className='relative border rounded-2xl p-4'>
                <Textarea placeholder='Create a trip for Paris from New York'
                    className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                />
                <Button size={'icon'} className='absolute bottom-6 right-6' onClick={() => onSend()}>
                    <Send className='h-4 w-4'/>
                </Button>
            </div>
        </div>

        {/* Suggestion List */}
            <div className='flex gap-5'>
                {suggestions.map((suggestions, index) => (
                    <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white'>
                        {suggestions.icon}
                        <h2 className='text-sm'>{suggestions.title}</h2>
                    </div>
                ))}
            </div>
            
            {/* Video Section */}
            <div>
                <h2 className='my-7 mt-14 flex gap-2'> Not Sure where to start? <strong>See how it works</strong> <ArrowDown/> </h2>
                <HeroVideoDialog
                    className="block dark:hidden w-full max-w-3xl"
                    animationStyle="from-center"
                    videoSrc="https://www.pexels.com/video/aerial-view-of-beautiful-resort-2169880"
                    thumbnailSrc="thumbnail.jpg"
                    thumbnailAlt="Video"
                />
            </div>
    </div>
  )
}

export default Hero
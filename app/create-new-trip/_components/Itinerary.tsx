'use client'
import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { ArrowLeft, Clock, ExternalLink, Star, Ticket, Timer, Wallet, Wallet2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCard from './HotelCard';
import PlaceCard from './PlaceCard';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';




function Itinerary() {
  // @ts-ignore
      const {tripDetailInfo} = useTripDetail()
      const [tripData, setTripData] = useState<TripInfo|null>(null)
      useEffect(() => {
        tripDetailInfo && setTripData(tripDetailInfo)
      }, [tripDetailInfo])

  const data = tripData ? [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index) => (
            <HotelCard hotel={hotel}/>
          ))}
        </div>
      ),
    },

    ...tripData?.itinerary.map((dayData) => ({
        title: `Day ${dayData?.day}`,
        content: (
            <div>
                <p className='mb-2 font-bold text-xl text-primary'>Best Time: {dayData?.best_time_to_visit_day}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {dayData?.activities.map((activity, index) =>(
                    <PlaceCard activity={activity} />
                ))}
                </div>
            </div>
        )
    }))
    
  ] : []
  return (
    <div className="relative w-full overflow-y-auto h-[80vh]">
      {/* @ts-ignore */}
      {tripData ? <Timeline data={data} tripData = {tripData} />
      : 
      <div className='relative w-full h-full'>
    <div className='absolute inset-0 bg-black/50 rounded-3xl z-10' />
    <div className='relative z-20 flex flex-col items-center justify-center h-full text-white text-center p-4'>
        <ArrowLeft className='w-10 h-10 mb-4' />
        <h2 className='text-3xl font-bold'>Your Itinerary Awaits</h2>
        <p className='mt-2 text-lg'>Plan a new trip to see your personalized travel schedule here.</p>
    </div>
    <Image src={'/travel.jpg'} alt='travel' fill className='object-cover rounded-3xl' />
</div>
    }
    </div>
  );
}

export default Itinerary
'use client'

import { Button } from '@/components/ui/button'
import { Star, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import axios from 'axios'


type Props = {
    hotel: Hotel
}
function HotelCard({hotel}: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>()
    useEffect(() => {
        hotel && GetGooglePlaceDetail()
    }, [hotel])

    const GetGooglePlaceDetail = async() => {
        const result = await axios.post('/api/google-place-detail', {
            placeName: hotel?.hotel_name
        });
        if(result?.data?.e){
            return;
        }
        setPhotoUrl(result?.data)
    }

  return (
    <div className='flex flex-col gap-1'>
                <Image src={photoUrl?photoUrl:'/placeholder.jpg'} alt='place-image' width={400} height={200} 
                className='rounded-xl shadow object-cover mb-2'
                />
                <h2 className='font-semibold'>{hotel?.hotel_name}</h2>
                <div className='flex justify-between items-center'>
                <h2 className='text-gray-400'>{hotel.hotel_address}</h2>
                {/* <p className='flex gap-2 text-green-500'> <Wallet/>{hotel.price_per_night}</p> */}
                <p className='text-yellow-500 flex-gap-2'><Star/> {hotel.rating}</p>
                </div>
                <Link href={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name} target='_blank'>
                <Button variant={'outline'} className='w-full mt-1'>View</Button>
                </Link>
                {/* <p className='line-clamp-2 text-gray-400'>{hotel?.description}</p> */}
            </div>
  )
}

export default HotelCard
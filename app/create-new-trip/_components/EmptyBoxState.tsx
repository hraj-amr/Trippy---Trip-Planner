import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className='mt-7'>
        <h2 className='font bold text-xl text-center'>Start Planning new <strong className='text-primary'>Trip</strong> using AI</h2>
        <p className='text-center text-gray-500 mt-3'>Discover personalized travel itineraries, explore top destinations, and plan your dream vacation effortlessly with the power of AI. Let our smart assistant handle the hard work while you enjoy the journey.</p>
        <div className='flex flex-col gap-5 mt-5'>
            {suggestions.map((suggestions, index) => (
                <div key={index}
                onClick={() => onSelectOption(suggestions.title)}
                className='flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary'>
                    {suggestions.icon}
                    <h2 className='text-sm'>{suggestions.title}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default EmptyBoxState
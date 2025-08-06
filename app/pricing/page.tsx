import React from 'react'
import { PricingTable } from '@clerk/nextjs'

function page() {
  return (
    <div className='mt-20'>
        <h2 className='font-bold text-3xl my-5 text-center'>AI-Powered Trip Planning - Pick Your Plan</h2>
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
    </div>
  )
}

export default page
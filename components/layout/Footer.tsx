import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='bg-secondary flex justify-end items-center font-[SuisseIntl-Light] text-white'>
      <div>
        <p className='text-end'>© {year} Hambarico Coffee and Co.</p>
        <p className='underline'>Powered by Gezat Communications.</p>
      </div>
    </footer>
  )
}

export default Footer
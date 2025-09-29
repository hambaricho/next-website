import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='bg-greenSecondary dark:bg-secondary flex text-sm md:text-base justify-center items-center font-[SuisseIntl-Light] text-white'>
      <div>
        <p className='text-end'>© {year} Hambarico Coffee and Co.</p>
        <p className='underline'>Powered by Gezat Communications.</p>
      </div>
    </footer>
  )
}

export default Footer
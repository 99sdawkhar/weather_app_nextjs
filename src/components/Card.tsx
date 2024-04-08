import React, { ReactNode } from 'react'

interface ICard {
  icon: ReactNode;
  title: string;
  detail: string;
  units?: string;
}

const Card = ({ icon,  title, detail, units }: ICard) => {
  return (
    <div className='rounded-2xl px-3 py-2 flex flex-nowrap justify-start gap-2 items-center bg-[#D0BCFF4D] w-[45%]'>
      <div className='bg-white rounded-2xl p-1.5'>{icon}</div>
      <div className='w-full'>
        <span className='text-xs sm:text-sm'>{title}</span>
        <div className='flex justify-between items-end gap-2 flex-wrap w-full'>
          <span>{detail}</span>
          {/* didn't find any property for below field */}
          {/* <span className='text-xs justify-self-end'>{units}</span> */}
        </div>
      </div>
    </div>
  )
}

export default Card
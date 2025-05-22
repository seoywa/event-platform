import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteConfirmation from './DeleteConfirmation'

type CardPropsType = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({
  event, hasOrderLink, hidePrice
}: CardPropsType) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer?._id.toString();

  return (
    <div className='group relative flex min-h-[380px] w-full max-2-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[430px]'>
      <Link href={`/events/${event._id}`} style={{ backgroundImage: `url(${event.imageUrl})`}} className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500'>
        
        {isEventCreator && !hidePrice && (
          <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
            <DeleteConfirmation eventId={event._id} />
            <Link href={`/events/${event._id}/update`}>
              <Image src={'/assets/icons/edit.svg'} alt='edit' height={20} width={20} />
            </Link>
          </div>
        )}

      </Link>
      <Link href={`/events/${event._id}`} className='min-h-[230px] flex flex-col gap-3 p-5 md:gap-4'>
        {!hidePrice && (
        <div className='flex gap-2'>
          <span className='p-semibold-14 w-min rounded-full bg-green-100 text-green-60 px-4 py-4'>
            {event.isFree ? 'FREE': `$${event.price}`}
          </span>
          <p className='p-semibold-14 w-min rounded-full bg-gray-500/10 px-4 py-4 text-gray-500'>
            {event.category?.name}
          </p>
        </div>
        )}

        <p className='p-medium-16 p-medium-18 text-gray-500'>
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <p className='p-medium-15 md:p-medium-20 line-clamp-2 flex-1 text-black'>
          {event.title}
        </p>

        {hasOrderLink && (
          <Link href={`orders?eventId=${event._id}`} className='flex gap-2'>
            <p className='text-primary-500'>Order Details</p>
            <Image src={'/assets/icons/arrow.svg'} alt='arrow search' width={10} height={10}/>
          </Link>
        )}
      </Link>
    </div>
  )
}

export default Card
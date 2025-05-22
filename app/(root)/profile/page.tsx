import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvent = await getEventsByUser({ userId, page: 1});

  return (
    <>
      {/* MY TICKET */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild className='button hidden sm:flex'>
            <Link href={'/#events'}>
              Explore more Events
            </Link>
          </Button>
        </div>
      </section>

      <section className='wrapper my-8'>
        <Collection
          data={[]}
          emptyTitle="No Event Tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore"
          collectionType="My_Tickets"
          limit={5}
          page={1}
          urlParamName='ordersPage'
          totalPages={2}
        />
      </section>


      {/* EVENTS ORGANIZED */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
          <Button asChild className='button hidden sm:flex'>
            <Link href={'/events/create'}>
              Create New Events
            </Link>
          </Button>
        </div>
      </section>

      <section className='wrapper my-8'>
        <Collection
          data={organizedEvent?.data}
          emptyTitle="No Events created yet"
          emptyStateSubtext="Create now"
          collectionType="Events_Organized"
          limit={5}
          page={1}
          urlParamName='eventsPage'
          totalPages={2}
        />
      </section>
    </>
  )
}

export default ProfilePage
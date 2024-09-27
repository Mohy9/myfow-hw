import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CALENDARS } from '../../graphql/queries';

import { Headline } from '../HeadLine/Headline';
import { ReservationItem } from '../ReservationItem/ReservationItem';

import { customerId, photoUrl } from '../../constants';
import { CalendarsData, CalendarState } from '../../types';
import './ReservationPage.scss';

export const ReservationPage = () => {
  // data fetching
  const { data } = useQuery<CalendarsData>(GET_CALENDARS, {
    variables: {
      customerId,
      state: [
        CalendarState.Open,
        CalendarState.Paid,
        CalendarState.Storno,
        CalendarState.Test,
        CalendarState.Canceled,
      ],
    },
  });

   // state for storing resolved image
  const [resolvedUrls, setResolvedUrls] = useState<{ [key: string]: string }>({});

   // fetch image urls
  useEffect(() => {
    const fetchImageUrls = async () => {
      if (data && data.calendars) {
        const newUrls: { [key: string]: string } = {};
        for (const calendar of data.calendars) {
          // First try to get event's picture from carts item
          const eventImageSecret = calendar.carts?.[0]?.item?.picture?.secret;
          let imageSecret = eventImageSecret;

          // If no event image, fall back to subject's logo
          if (!imageSecret) {
            imageSecret = calendar.subject?.microsite?.logo?.secret;
          }

          if (imageSecret) {
            try {
              const response = await fetch(`${photoUrl}${imageSecret}`);
              const result = await response.json();
              newUrls[calendar.id] = result.url;
            } catch (error) {
              console.error('Error fetching image URL:', error);
            }
          }
        }
        setResolvedUrls(newUrls);
      }
    };

    fetchImageUrls();
  }, [data]);

  // Filter reservations by their state
  const openReservations =
    data?.calendars.filter((calendar) => calendar.state === CalendarState.Open) || [];
  const cancelledReservations =
    data?.calendars.filter((calendar) => calendar.state === CalendarState.Canceled) || [];
  const otherReservations =
    data?.calendars.filter(
      (calendar) => ![CalendarState.Open, CalendarState.Canceled].includes(calendar.state)
    ) || [];

  return (
    <div className="reservation-page-container">
      {openReservations.length > 0 && (
        <>
          <Headline title="Moje rezervace" />
          {openReservations.map((calendar) => (
            <ReservationItem
              key={calendar.id}
              calendar={calendar}
              resolvedImageUrl={resolvedUrls[calendar.id]}
            />
          ))}
        </>
      )}

      {otherReservations.length > 0 && (
        <>
          <Headline title="Objednejte znovu" />
          {otherReservations.map((calendar) => (
            <ReservationItem
              key={calendar.id}
              calendar={calendar}
              resolvedImageUrl={resolvedUrls[calendar.id]}
            />
          ))}
        </>
      )}

      {cancelledReservations.length > 0 && (
        <>
          <Headline title="Zrušeno" />
          {cancelledReservations.map((calendar) => (
            <ReservationItem
              key={calendar.id}
              calendar={calendar}
              resolvedImageUrl={resolvedUrls[calendar.id]}
            />
          ))}
        </>
      )}
    </div>
  );
};

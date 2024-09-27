import { Calendar } from '../../types';
import './ReservationItem.scss';

interface ReservationItemProps {
  calendar: Calendar;
  resolvedImageUrl: string;
}

export const ReservationItem = ({ calendar, resolvedImageUrl }: ReservationItemProps) => {
  const eventDate = new Date(calendar.from);
  const formattedDate = eventDate
    .toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\s/g, '');
  const formattedTime = eventDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const eventFrom = new Date(calendar.from);
  const eventTo = new Date(calendar.to);

  // Calculate the time difference in minutes
  const durationInMinutes = Math.round(
    (eventTo.getTime() - eventFrom.getTime()) / 60000
  );

  return (
    <section key={calendar.id} className="card-section">
      {resolvedImageUrl && (
        <img
          src={resolvedImageUrl}
          alt="logo businessu"
          className="card-img"
        />
      )}
      <div className="card-info">
        <h3 className="card-info__headline">{calendar.shop.name}</h3>
        <p className="card-info__description--small">
          {`${calendar.shop.address.street}, ${calendar.shop.address.city}`}
        </p>
        <p className="card-info__description--small">tel {calendar.shop.phone}</p>
        <h4 className="card-info__subheadline">{calendar.carts?.[0]?.item.name}</h4>
        <p className="card-info__description">{`${formattedDate} ${formattedTime}`}</p>
        <p className="card-info__description--small">
          {`${durationInMinutes} minut ${calendar.carts?.[0]?.item.priceVat} Kč`}
        </p>

        <div className="card-info__buttons">
          <a className="card-info__buttons__item">Trasa</a>
          <a className="card-info__buttons__item" href={`tel:${calendar.shop.phone}`}>
            Zavolat
          </a>
          <a className="card-info__buttons__item">...</a>
        </div>
      </div>
    </section>
  );
};

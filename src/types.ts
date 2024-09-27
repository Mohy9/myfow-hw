export enum CalendarState {
  Open = 'Open',
  Paid = 'Paid',
  Canceled = 'Canceled',
  Storno = 'Storno',
  Test = 'Test',
}

export interface File {
  __typename: 'File';
  secret: string;
}

export interface Item {
  __typename: 'Item';
  name: string;
  priceVat: number;
  picture: File;
}

export interface Cart {
  __typename: 'Cart';
  item: Item;
}

export interface Address {
  __typename: 'Address';
  street: string;
  city: string;
  zip: string;
}

export interface Shop {
  __typename: 'Shop';
  name: string;
  address: Address;
  phone: string;
}

export interface Microsite {
  __typename: 'Microsite';
  logo: File;
}

export interface Subject {
  __typename: 'Subject';
  alias: string;
  microsite: Microsite;
}

export interface Calendar {
  __typename: 'Calendar';
  id: string;
  from: string;
  to: string;
  state: CalendarState;
  note: string;
  carts: Cart[];
  shop: Shop;
  subject: Subject;
}

export interface CalendarsData {
  calendars: Calendar[];
}

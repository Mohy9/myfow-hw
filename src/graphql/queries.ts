import { gql } from '@apollo/client';

// Query to fetch customer information
export const GET_CUSTOMER = gql`
  query GetCustomer($id: ID!) {
    customer(where: { id: $id }) {
      id
      name
      surname
      phone
      email
      address
      picture {
        secret
      }
    }
  }
`;

export const GET_CALENDARS = gql`
  query GetCalendars($customerId: ID!, $state: [CalendarState!]) {
    calendars(
      where: { customers_some: { id: $customerId }, state_in: $state }
      orderBy: from_ASC
    ) {
      id
      from
      to
      state
      note
      carts {
        item {
          name
          priceVat
          picture {
            secret
          }
        }
      }
      shop {
        name
        address {
          street
          city
          zip
        }
        phone
      }
      subject {
        alias
        microsite {
          logo {
            secret
          }
        }
      }
    }
  }
`;

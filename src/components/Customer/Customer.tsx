import { useQuery } from '@apollo/client';
import { GET_CUSTOMER } from '../../graphql/queries';
import { customerId } from '../../constants';

export const Customer = () => {
  const { data } = useQuery(GET_CUSTOMER, {
    variables: { id: customerId },
  });

  const { customer } = data;

  return (
    <div>
      <h2>
        {customer.name} {customer.surname}
      </h2>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>Address: {customer.address}</p>
    </div>
  );
};

'use client';

import Card from 'react-bootstrap/Card';
import { Contact } from '@/lib/validationSchemas';

const ContactCard = ({ firstName, lastName, address,
  image, description, owner }: Contact) => (
    <Card
      className="h-100"
      style={{ width: '18rem' }}
    >
      <Card.Img variant="top" style={{ width: '75px' }} src={image} />
      <Card.Body>
        <Card.Title>
          {firstName}
          {' '}
          {lastName}
        </Card.Title>
        <Card.Subtitle>{address}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <p>{owner}</p>
      </Card.Body>
    </Card>
);

export default ContactCard;

'use client';

import Card from 'react-bootstrap/Card';
import { Contact, Note } from '@prisma/client';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import NoteItemComponent from './NoteItem';
import AddNoteForm from './AddNoteForm';

const ContactCard = ({ contact, notes }:
{ contact: Contact; notes: Note[] }) => (
  <Card
    className="h-100"
    style={{ width: '18rem' }}
  >
    <Card.Img variant="top" style={{ width: '75px' }} src={contact.image} />
    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
      <Card.Text>
        {contact.description}
      </Card.Text>
    </Card.Body>
    <p className="blockquote-footer">{contact.owner}</p>
    <ListGroup variant="flush">
      {notes.map((note) => <NoteItemComponent key={note.id} {...note} />)}
    </ListGroup>
    <AddNoteForm contact={contact} />
    <Card.Footer>
      <Link href={`edit/${contact.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;

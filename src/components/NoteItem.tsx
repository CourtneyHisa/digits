import ListGroup from 'react-bootstrap/ListGroup';
import { Note } from '@prisma/client';

const NoteItem = ({ note, createdAt }: Note) => (
  <ListGroup.Item>
    <p className="fw-lighter">{createdAt.toLocaleDateString('en-US')}</p>
    <p>{note}</p>
  </ListGroup.Item>
);

export default NoteItem;

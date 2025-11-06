import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
import { Contact } from '@prisma/client';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const contacts: Contact[] = await prisma.contact.findMany({
    where: {
      owner,
    },
  });
  console.log(contacts);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <h1 className="text-center">List Contacts</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact) => (
              <Col key={`Contact-${contact.firstName}`}>

                <ContactCard
                  id={contact.id}
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  address={contact.address}
                  image={contact.image}
                  description={contact.description}
                  owner={contact.owner}
                />
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;

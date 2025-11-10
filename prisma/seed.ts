import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });

  // for (const contacts of config.defaultContacts) {
  config.defaultContacts.forEach(async (contacts, index) => {
    // const condition = data.condition as Condition || Condition.good;
    console.log(`  Adding contacts: ${JSON.stringify(contacts)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.contact.upsert({
      where: { id: config.defaultContacts.indexOf(contacts) },
      update: {},
      create: {
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        address: contacts.address,
        image: contacts.image,
        description: contacts.description,
        owner: contacts.owner,
      },
    });
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

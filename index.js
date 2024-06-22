const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./src");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const currentContact = await getContactById(id);
      console.log(currentContact);
      break;

    case "add":
      const addedContact = await addContact({ name, email, phone });
      console.log(addedContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    case "update":
      const updContact = await updateContact(id, { name, email, phone });
      console.log(updContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

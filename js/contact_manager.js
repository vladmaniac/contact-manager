/**
 * Contact Manager Class
 */
var i = 0;

function ContactManager() {
  this.contacts = [];
}

ContactManager.prototype = {
  // Adds a new contact entry
  addContact: function ContactManager_addContact(aContact) {
    var userId = i;
    
    aContact.id = userId;
    this.contacts.push(aContact);
    i++;
    return this.contacts;
  },

  // Removes a contact entry
  deleteContact: function ContactManager_deleteContact(aContact) {
    for (var i in this.contacts) {
      if(this.contacts[i] == aContact) {
        this.contacts.splice(i,1);
        break;
      }
    }
  },

  // Edits a contact entry
  editContact: function ContactManager_editContact(aContact, newName, newEmail, newBirthday, newAddress) {
    aContact.name = newName;
    aContact.email = newEmail;
    aContact.birthday = newBirthday;
    aContact.optionalAddress = newAddress;

    return aContact;
  }
};

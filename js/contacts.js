/**
 * Contacts class
 * Contains the Contact object
 */
function Contact(name, email, birthday, optionalAddress) {
  this.name = name;
  this.email = email;
  this.birthday = birthday;
  this.optionalAddress = optionalAddress || "";
};


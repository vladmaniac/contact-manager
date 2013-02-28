/**
 * Contacts type
 * Contains the constructor of a Contact object
 */
function Contact(name, email, birthday, optionalAddress,id) {
  this.name = name;
  this.email = email;
  this.birthday = birthday;
  this.optionalAddress = optionalAddress || "";
  this.id = id;
}


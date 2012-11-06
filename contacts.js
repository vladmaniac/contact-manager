/**
 * Contacts class
 * Contains the Contact object and methods which all contacts must have
 *          editName()
 *          editMail()
 *          editBirthday()
 *          editOptionalAddress()
 *          deleteContact()
 */
function Contact(name, email, birthday, optionalAddress, id) {
  this.name = name;
  this.email = email;
  this.birthday = birthday;
  // Optionals
  this.optionalAddress = optionalAddress || "";
  this.id = id;
};

Contact.prototype.editName = function(newValue, handler) {
  if(typeof(newValue) === "string") {
    this.name = newValue;
    handler.createUser(this, false);
  } else
      throw new Error(arguments.callee, "Invalid input type for editing " + 
                      "the name field");
};

Contact.prototype.editEmail = function(newValue, handler) {
  //XXX: Todo
  // Validation of e-mail field
  this.email = newValue;
  handler.createUser(this, false);
};

Contact.prototype.editBirthday = function(newValue, handler) {
  // XXX: Todo validation
  this.birthday = newValue;
  handler.createUser(this, false);
};

Contact.prototype.editOptionalAddress = function(newValue, handler) {
  this.optionalAddress = newValue;
  handler.createUser(this, false);
};

Contact.prototype.deleteContact = function(handler) {
  if(confirm("Are you sure you want to delete '" + this.name +
             "' from your contact list?")) {
    handler.deleteFromStorage(this);
  }
};

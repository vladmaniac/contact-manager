require("contacts.js");

/**
 * Contacts class
 */
function Contact(id, name, email, birthday, optionalAddress) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.birthday = birthday;
  this.optionalAddress = optionalAddress;
};

var contact = new Contact("0", "Vlad", "maniacvld@gmail.com", "03/02/1988", 
                          "Decebal Street");

Contact.prototype.editName = function(userAsObject, newValue, handler) {
  if(typeof(newValue) === "string") {
    userAsObject.name = newValue;
    handler.createUser(userAsObject);
  } else
      throw new Error(arguments.callee, "Invalid input type for editing " + 
                      "the name field");
};

Contact.prototype.editEmail = function(userAsObject, newValue, handler) {
  //XXX: Todo
  // Validation of e-mail field
  userAsObject.email = newValue;
  handler.createUser(userAsObject);
};

Contact.prototype.editBirthday = function(userAsObject, newValue, handler) {
  // XXX: Todo validation
  userAsObject.birthday = newValue;
  handler.createUser(userAsObject);
};

Contact.prototype.editOptionalAddress = function(userAsObject, newValue, handler) {
  userAsObject.optionalAddress = newValue;
  handler.createUser(userAsObject);
};

Contact.prototype.deleteContact = function(userAsObject, handler) {
  if(confirm("Are you sure you want to delete '" + userAsObject.name + 
             "' from your contact list?")) {
    handler.deleteFromStorage(userAsObject);
  }
};

/**
 * Handler of contacts in local storage
 */
function Handler() {
};

// XXX: Todo: Probably better to have these as a setter and getter 
Handler.prototype.createUser = function(user) {
  localStorage.setItem("user" + user.id, JSON.stringify(user));
  console.log(JSON.stringify(user));  
};

Handler.prototype.retrieveUser = function(user) {
  return JSON.parse(localStorage.getItem("user" + user.id));
};

Handler.prototype.deleteFromStorage = function(user) {
  var deletedUser = JSON.stringify(user);

  localStorage.removeItem("user" + user.id);
  console.log("You have deleted --> " + deletedUser);

  delete deteledUser;
};

// A bit of testing
var handler = new Handler();
handler.createUser(contact);

var userAsObject = handler.retrieveUser(contact);
typeof(userAsObject);
contact.editName(userAsObject, "Maria", handler);
contact.editEmail(userAsObject, "maria@gmail.com", handler);
contact.editBirthday(userAsObject, "04/05/1995", handler);
contact.editOptionalAddress(userAsObject, "Main Street", handler);



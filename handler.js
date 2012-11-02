/**
 * Contacts class
 */
function Contact(name, email, birthday, optionalAddress, id) {
  this.name = name;
  this.email = email;
  this.birthday = birthday;
  // Optionals
  this.optionalAddress = optionalAddress || "";
  this.id = id || "";
};

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
 * Only a wrapper
 */
function Handler() {
};

// XXX: Todo: Probably better to have these as a setter and getter 
Handler.prototype.createUser = function(user) {
  // Randomly give the entry an id for internal tracking
  user.id = Math.floor(Math.random() * 100 + 1);

  localStorage.setItem("user" + user.id, JSON.stringify(user));
  console.log(JSON.stringify(user));

  displayItem(user);
};

// Get user as Object type from localStorage
Handler.prototype.retrieveUser = function(user) {
  return JSON.parse(localStorage.getItem("user" + user.id));
};

// Delete contact entry from localStorage entirely
Handler.prototype.deleteFromStorage = function(user) {
  var deletedUser = JSON.stringify(user);

  localStorage.removeItem("user" + user.id);
  console.log("You have deleted --> " + deletedUser);

  delete deteledUser;
};

// Helper functions part
function addUser() {
  var nameValue = document.getElementById("name-field").value;
  var emailValue = document.getElementById("mail-field").value;
  var birthValue = document.getElementById("birth-field").value;
  var addressValue = document.getElementById("address-field").value;

  var contact = new Contact(nameValue, emailValue, birthValue, addressValue);
  var handler = new Handler();

  handler.createUser(contact);
}

function displayItem(contact) {
  var container = document.getElementById("contacts-container");
  var doc = container.ownerDocument;
  var handler = new Handler();
  var contactAsObject = handler.retrieveUser(contact);

  // Display name
  var name = doc.createElement("TEXTAREA");
  name.setAttribute("id", contact.name + contact.id);
  name.textContent = "Name: " + contact.name;
  name.style.border = "none";
  name.style.resize = "none";
  container.appendChild(name);

  // Display email
  var mail = doc.createElement("TEXTAREA");
  mail.setAttribute("id", "email" + contact.id);
  mail.textContent = "E-mail: " + contact.email;
  mail.style.border = "none";
  mail.style.resize = "none";
  container.appendChild(mail);

  // Display birthday
  var birth = doc.createElement("TEXTAREA");
  birth.setAttribute("id", "birth" + contact.id);
  birth.textContent = "Date of birth: " + contact.birthday;
  birth.style.border = "none";
  birth.style.resize = "none";
  container.appendChild(birth);

  // Display additional address information
  var addInfo = doc.createElement("TEXTAREA");
  addInfo.setAttribute("id", "info" + contact.id);
  addInfo.textContent = "Additional address info: " + contact.optionalAddress;
  addInfo.style.border = "none";
  addInfo.style.resize = "none";
  container.appendChild(addInfo);

  // Create edit button
  var edit = doc.createElement("BUTTON");
  edit.setAttribute("id", "edit-button" + contact.id);
  edit.setAttribute("onlick", "activateEditMode()");
  edit.textContent = "Edit";
  container.appendChild(edit);

  // Create delete button
  var del = doc.createElement("BUTTON");
  del.setAttribute("id", "delete-button" + contact.id);
  // XXX: Todo add another method delete() to call contact.deleteContact and also delete from UI
  del.addEventListener("click", function () { deleteItem(contact); }, false);
  del.textContent = "Delete";
  container.appendChild(del);
  del.removeEventListener("click", function () { deleteItem(contact); }, false);
}

function deleteItem(contact) {
  var container = document.getElementById("contacts-container");
  var handler = new Handler();
  var userAsObject = handler.retrieveUser(contact);

  contact.deleteContact(userAsObject, handler);

  var name = document.getElementById(contact.name + contact.id);
  var email = document.getElementById("email" + contact.id);
  var birth = document.getElementById("birth" + contact.id);
  var add = document.getElementById("info" + contact.id);
  var edit = document.getElementById("edit-button" + contact.id);
  var deleteButton = document.getElementById("delete-button" + contact.id);

  container.removeChild(name);
  container.removeChild(email);
  container.removeChild(birth);
  container.removeChild(add);
  container.removeChild(edit);
  container.removeChild(deleteButton);
}


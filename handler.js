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
    handler.createUser(userAsObject, false);
  } else
      throw new Error(arguments.callee, "Invalid input type for editing " + 
                      "the name field");
};

Contact.prototype.editEmail = function(userAsObject, newValue, handler) {
  //XXX: Todo
  // Validation of e-mail field
  userAsObject.email = newValue;
  handler.createUser(userAsObject, false);
};

Contact.prototype.editBirthday = function(userAsObject, newValue, handler) {
  // XXX: Todo validation
  userAsObject.birthday = newValue;
  handler.createUser(userAsObject, false);
};

Contact.prototype.editOptionalAddress = function(userAsObject, newValue, handler) {
  userAsObject.optionalAddress = newValue;
  handler.createUser(userAsObject, false);
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

// Sorry, global
var userId = 0;

// XXX: Todo: Probably better to have these as a setter and getter 
Handler.prototype.createUser = function(user, display) {
  // Randomly give the entry an id for internal tracking
  if (display) {
    user.id = userId;
    userId++;
  }

  localStorage.setItem("user" + user.id, JSON.stringify(user));

  if (display) {
    displayItem(user);
    console.log(JSON.stringify(user));
  }
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

  delete deletedUser;
};

/**
 * Helper functions part
 * addUser() - adds a user via the UI
 * displayItem() - displays the user in the content area
 * deleteItem() - delete the contact
 * editItem() - edit a contact
 */
function addUser() {
  var nameValue = document.getElementById("name-field").value;
  var emailValue = document.getElementById("mail-field").value;
  var birthValue = document.getElementById("birth-field").value;
  var addressValue = document.getElementById("address-field").value;

  var contact = new Contact(nameValue, emailValue, birthValue, addressValue);
  var handler = new Handler();

  handler.createUser(contact, true);
}

function displayItem(contact) {
  var container = document.getElementById("contacts-container");
  var doc = container.ownerDocument;
  var handler = new Handler();
  var contactAsObject = handler.retrieveUser(contact);

  // Display name
  var name = doc.createElement("TEXTAREA");

  name.setAttribute("id", contact.name + contact.id);
  name.textContent = contact.name;
  name.style.border = "none";
  name.style.resize = "none";
  name.disabled = "disabled";
  container.appendChild(name);

  // Display email
  var mail = doc.createElement("TEXTAREA");

  mail.setAttribute("id", "email" + contact.id);
  mail.textContent = contact.email;
  mail.style.border = "none";
  mail.style.resize = "none";
  mail.disabled = "disabled";
  container.appendChild(mail);

  // Display birthday
  var birth = doc.createElement("TEXTAREA");

  birth.setAttribute("id", "birth" + contact.id);
  birth.textContent = contact.birthday;
  birth.style.border = "none";
  birth.style.resize = "none";
  birth.disabled = "disabled";
  container.appendChild(birth);

  // Display additional address information
  var addInfo = doc.createElement("TEXTAREA");

  addInfo.setAttribute("id", "info" + contact.id);
  addInfo.textContent = contact.optionalAddress;
  addInfo.style.border = "none";
  addInfo.style.resize = "none";
  addInfo.disabled = "disabled";
  container.appendChild(addInfo);

  // Create edit button
  var edit = doc.createElement("BUTTON");

  edit.setAttribute("id", "edit-button" + contact.id);
  edit.addEventListener("click", function () { editItem(contact); }, false);
  edit.textContent = "Edit";
  container.appendChild(edit);
  edit.removeEventListener("click", function () { editItem(contact); }, false);

  // Create delete button
  var del = doc.createElement("BUTTON");

  del.setAttribute("id", "delete-button" + contact.id);
  del.addEventListener("click", function () { deleteItem(contact); }, false);
  del.textContent = "Delete";
  container.appendChild(del);
  del.removeEventListener("click", function () { deleteItem(contact); }, false);

  // Create save button
  var save = doc.createElement("BUTTON");

  save.setAttribute("id", "save-button" + contact.id);
  save.addEventListener("click", function () { saveItem(contact) }, false);
  save.textContent = "Save";
  container.appendChild(save);
  save.removeEventListener("click", function () { saveItem(contact) }, false);
}

// Actually delete the item from storage and UI
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
  var saveButton = document.getElementById("save-button" + contact.id);

  container.removeChild(name);
  container.removeChild(email);
  container.removeChild(birth);
  container.removeChild(add);
  container.removeChild(edit);
  container.removeChild(deleteButton);
  container.removeChild(saveButton);
}

// Edit a contact using the app UI
function editItem(contact) {
  // Items
  var name = document.getElementById(contact.name + contact.id);
  var email = document.getElementById("email" + contact.id);
  var birth = document.getElementById("birth" + contact.id);
  var add = document.getElementById("info" + contact.id);
  var edit = document.getElementById("edit-button" + contact.id);

  // On 'Edit' mode the user has the ability to edit the fields
  name.disabled = false;
  email.disabled = false;
  birth.disabled = false;
  add.disabled = false;
}

// Save item
function saveItem(contact) {
  var handler = new Handler();
  var contactAsObject = handler.retrieveUser(contact);
  var newName = document.getElementById(contact.name + contact.id);
  var newMail = document.getElementById("email" + contact.id);
  var newBirth = document.getElementById("birth" + contact.id);
  var newInfo = document.getElementById("info" + contact.id);

  // Save name
  contact.editName(contactAsObject, newName.value, handler);
  // Save e-mail
  contact.editEmail(contactAsObject, newMail.value, handler);
  // Save birthday
  contact.editBirthday(contactAsObject, newBirth.value, handler);
  // Save additional address
  contact.editOptionalAddress(contactAsObject, newInfo.value, handler);

  // Block textareas again, as we saved
  newName.disabled = true;
  newMail.disabled = true;
  newBirth.disabled = true;
  newInfo.disabled = true;
}

// Display all data from localStorage on window.load event
window.addEventListener("load", displayAll, false);

// Display all data
function displayAll() {
  var entries = [];
  for (var i = 0; i < localStorage.length; i++) {
    entries[i] = localStorage["user" + i];
    displayItem(JSON.parse(localStorage["user" + i]));
  }
}

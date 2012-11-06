/**
 * Editor class
 * Handles the UI
 */
function Editor() {
}

Editor.prototype.displayItem = function(contact) {
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
  edit.addEventListener("click", function () {
    var editor = new Editor(); 
    editor.editItem(contact);
  }, false);
  edit.textContent = "Edit";
  container.appendChild(edit);
  edit.removeEventListener("click", function () {
    var editor = new Editor();
    editor.editItem(contact);
  }, false);

  // Create delete button
  var del = doc.createElement("BUTTON");

  del.setAttribute("id", "delete-button" + contact.id);
  del.addEventListener("click", function () {
    var editor = new Editor();
    editor.deleteItem(contact);
  }, false);
  del.textContent = "Delete";
  container.appendChild(del);
  del.removeEventListener("click", function () {
    var editor = new Editor();
    editor.deleteItem(contact);
  }, false);

  // Create save button
  var save = doc.createElement("BUTTON");

  save.setAttribute("id", "save-button" + contact.id);
  save.addEventListener("click", function () {
    var editor = new Editor();
    editor.saveItem(contact);
  }, false);
  save.textContent = "Save";
  container.appendChild(save);
  save.removeEventListener("click", function () {
    var editor = new Editor();
    editor.saveItem(contact);
  }, false);

  // New lines
  var space = doc.createElement("BR");
  container.appendChild(space);
}

// Actually delete the item from storage and UI
Editor.prototype.deleteItem = function(contact) {
  var container = document.getElementById("contacts-container");
  var handler = new Handler();
  var userAsObject = handler.retrieveUser(contact);

  contact.deleteContact(handler);

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
Editor.prototype.editItem = function(contact) {
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
Editor.prototype.saveItem = function(contact) {
  var handler = new Handler();
  var newName = document.getElementById(contact.name + contact.id);
  var newMail = document.getElementById("email" + contact.id);
  var newBirth = document.getElementById("birth" + contact.id);
  var newInfo = document.getElementById("info" + contact.id);

  // Save name
  contact.editName(newName.value, handler);
  // Save e-mail
  contact.editEmail(newMail.value, handler);
  // Save birthday
  contact.editBirthday(newBirth.value, handler);
  // Save additional address
  contact.editOptionalAddress(newInfo.value, handler);

  // Block textareas again, as we saved
  newName.disabled = true;
  newMail.disabled = true;
  newBirth.disabled = true;
  newInfo.disabled = true;
}


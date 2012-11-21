/**
 * UI
 */
function Render() {
};

Render.prototype = {
  renderContact: function Render_renderContact(aContact) {
    var container,
      doc,
      list,
      name,
      email,
      birthday,
      address,
      editButton,
      deleteButton,
      saveButton,
      buttonsDiv;

    container = document.getElementById("contacts-container");
    doc = container.ownerDocument;
    div = doc.createElement("DIV");
    div.setAttribute("id", "div" + aContact.id);
    div.setAttribute("class", "oneContact");  
    container.appendChild(div);  

    list = doc.createElement("UL");
    list.setAttribute("id", "list" + aContact.id);
    list.setAttribute("class", "contactList");
    div.appendChild(list);

    name = doc.createElement("LI");
    name.setAttribute("id", "name-field" + aContact.id);
    name.textContent = "Name: " + aContact.name;
    list.appendChild(name);

    email = doc.createElement("LI");
    email.setAttribute("id", "mail-field" + aContact.id);
    email.textContent = "E-mail: " + aContact.email;
    list.appendChild(email);

    birth = doc.createElement("LI");
    birth.setAttribute("id", "birth-field" + aContact.id);
    birth.textContent = "Date of birth: " + aContact.birthday;
    list.appendChild(birth);

    address = doc.createElement("LI");
    address.setAttribute("id", "address-field" + aContact.id);
    address.textContent = "Address: " + aContact.optionalAddress;
    list.appendChild(address);

    buttonsDiv = doc.createElement("DIV");
    buttonsDiv.setAttribute("id", "buttons-div" + aContact.id);
    buttonsDiv.setAttribute("class", "ops-buttons");
    div.appendChild(buttonsDiv);
 
    editButton = doc.createElement("BUTTON");
    editButton.setAttribute("id", "edit-button" + aContact.id);
    editButton.setAttribute("class", "button");
    editButton.textContent = "Edit";
    buttonsDiv.appendChild(editButton);

    deleteButton = doc.createElement("BUTTON");
    deleteButton.setAttribute("id", "delete-button" + aContact.id);
    deleteButton.setAttribute("class", "button");
    deleteButton.textContent = "Delete";
    buttonsDiv.appendChild(deleteButton);

    saveButton = doc.createElement("BUTTON");
    saveButton.setAttribute("id", "save-button" + aContact.id);
    saveButton.setAttribute("class", "button");
    saveButton.textContent = "Save";
    buttonsDiv.appendChild(saveButton);
  },

  deleteContact: function Render_deleteContact(aContact) {
    var container,
      doc,
      list,
      name,
      email,
      birthday,
      address,
      editButton,
      deleteButton,
      saveButton,
      div,
      buttonsDiv;

    container = document.getElementById("contacts-container");
    doc = container.ownerDocument;

    name = document.getElementById("name-field" + aContact.id);
    email = document.getElementById("mail-field" + aContact.id);
    birthday = document.getElementById("birth-field" + aContact.id);
    address = document.getElementById("address-field" + aContact.id);
    editButton = document.getElementById("edit-button" + aContact.id);
    deleteButton = document.getElementById("delete-button" + aContact.id);
    saveButton = document.getElementById("save-button" + aContact.id);
    div = document.getElementById("div" + aContact.id);
    buttonsDiv = document.getElementById("buttons-div" + aContact.id);
    list = document.getElementById("list" + aContact.id);

    buttonsDiv.removeChild(editButton);
    buttonsDiv.removeChild(deleteButton);
    buttonsDiv.removeChild(saveButton);

    div.removeChild(buttonsDiv);
  
    list.removeChild(name);
    list.removeChild(email);
    list.removeChild(birthday);
    list.removeChild(address);

    div.removeChild(list);

    container.removeChild(div);
  }
};

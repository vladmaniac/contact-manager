/**
 * Global functions part
 * addUser() - adds a user via the UI
 * displayAll() - displays all users in the content area
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

// Display all data from localStorage on window.load event
window.addEventListener("load", function () { displayAll(); }, false);

// Display all data
function displayAll() {
  var editor = new Editor();
  var entries = [];

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var object = JSON.parse(localStorage.getItem(key));
    
    entries[i] = new Contact(object.name, object.email, object.birthday, object.optionalAddress, object.id);
    editor.displayItem(entries[i]);
  }
}

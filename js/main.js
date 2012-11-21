/**
 * Global part
 */
function add() {
   var name,
      email,
      birthday,
      address,
      contact,
      ops;

   name = document.getElementById("name-field").value;
   email = document.getElementById("mail-field").value;
   birthday = document.getElementById("birth-field").value;
   address = document.getElementById("address-field").value;

   contact = new Contact(name, email, birthday, address);
   ops = new Operations(contact);

   ops.addContact();
}


// document.addEventListener("DOMContentLoaded", function () {var ops = new Operations(contact); console.log("loading"); ops.displayAll();}, false);


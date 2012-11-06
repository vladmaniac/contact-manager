/**
 * Handler of contacts in local storage
 * Only a wrapper
 */
function Handler() {
};

// XXX: Todo: Probably better to have these as a setter and getter 
Handler.prototype.createUser = function(user, display) {
  var editor = new Editor();
  var userId = Math.floor((Math.random() * 100) + 1);

  if (display) {
    user.id = userId;
  }

  localStorage.setItem("user" + user.id, JSON.stringify(user));

  if (display) {
    editor.displayItem(user);
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
  var saveUserId = user.id;
  var entries = [];

  localStorage.removeItem("user" + user.id);
  console.log("You have deleted --> " + deletedUser);

  delete deletedUser;
};


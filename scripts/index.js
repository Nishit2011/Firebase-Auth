const guidelist = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");
const setupUI = user => {
  if (user) {
    if (user.admin) {
      //if the user is admin, all the items with admin class
      //is made visible
      adminItems.forEach(item => (item.style.display = "block"));
    }

    //adding account info to the account detail modal when the user is logged in
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-test">${user.admin ? "Admin" : ""}</div>
        `;
        accountDetails.innerHTML = html;
      });

    //toggle UI elements
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    //hiding account detail info when the user is not logged in
    accountDetails.innerHTML = "";
    //toggle UI elements

    adminItems.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
    loggedInLinks.forEach(item => (item.style.display = "none"));
  }
};

//setup guides
const setupGuides = data => {
  //if the user is logged in
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
        </li>
        `;

      html += li;
    });

    guidelist.innerHTML = html;
  } else {
    guidelist.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

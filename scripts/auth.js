// add admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", e => {
  e.preventDefault();

  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

//listen for auth status changes
//everytime a user logs in or logs out, this method is fired
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    console.log("user logged in:", user);

    //accessing the claims which will be used to manage content
    //so a user that was made admin will show true in this case
    user.getIdTokenResult().then(idTokenResult => {
      console.log(idTokenResult.claims);
      user.admin = idTokenResult.claims.admin;

      //passing user details to below function
      //where links on nav bar will be hidden or shown based on the status of user login
      setupUI(user);
    });

    //getting collections from firebase firestore only when the user is logged in
    db.collection("guides").onSnapshot(
      snapshot => {
        //passing each document to a function
        setupGuides(snapshot.docs);
      },
      err => {
        console.log(err.message);
      }
    );
  } else {
    console.log("user logged out");
    //when not logged in, passing empty array as the data to the dom
    //we dont want to show the user any content when not logged in
    setupGuides([]);
    setupUI();
  }
});

//create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();

  //adding form into the database by fetching DOM using id and value
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value
    })
    .then(() => {
      //close the modal and reset form

      const modal = document.querySelector("#modal-create");

      //will close the sign up modal window after the creds are entered
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  console.log(email, password);

  //signup the user
  //when the user is successfully created or signed up, credentials with user data is returned back
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      //using doc method to create a document with specific user id and a field bio
      //add method will create a document with a random id hence doc method
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          bio: signupForm["signup-bio"].value
        });
      //console.log(cred);
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");

      //will close the sign up modal window after the creds are entered
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    //close the login modal and reset the form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

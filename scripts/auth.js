//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  console.log(email, password);

  //signup the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred);
    const modal = document.querySelector("#modal-signup");

    //will close the sign up modal window after the creds are entered
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

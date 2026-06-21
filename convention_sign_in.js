const signInBtn = document.getElementById("sign-in-button")
const signOutBtn = document.getElementById("sign-out-button")
const signInModal = document.getElementById("sign-in-modal")
const modalClose = document.getElementById("modal-close-btn")
const signInForm = document.getElementById("sign-in-form")

// show sign in form when "sign in" button clicked (when not signed in)
// otherwise the sign in button will become a sign out button
signInBtn.addEventListener("click", () => {
    signInModal.style.display = 'inline'
});

signOutBtn.addEventListener("click", () => {
    deleteAllCookies();
    toggleSignInOut();
});

// stop showing form when x is clicked
modalClose.addEventListener("click", () => {
    signInModal.style.display = 'none'
});

// form submission and logic for signing in
signInForm.addEventListener('submit', function(e){
    e.preventDefault()
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    fetch("/data/accounts.json")
    .then(response => response.json())
    .then(data => {
        const account = data.find(
            acc => acc.userName === username && acc.password === password
        );
        document.cookie = `username=${username};`;
        document.cookie = `signedin=true;`;
        if (account) {
            document.cookie = `likedrallies=${JSON.stringify(account.LikedRallies)};`;
            console.log(username + password + "has been signed in");
        } else {
            document.cookie = `likedrallies=[];`;
            console.log("could not sign in")
            // create new account in accounts.json
        }
        toggleSignInOut();
        signInModal.style.display = 'none';
    })
})

// Function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // Return null if cookie not found
}

// Function to delete all cookies
function deleteAllCookies() {
    // Beware! If your cookies are configured to use a path or domain component, this handy snippet won't work. (currently not configured with path)
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

function toggleSignInOut() {
    if (getCookie("signedin") === "true") {
        // show sign out button
        signOutBtn.style.display = 'inline'
        signInBtn.style.display = 'none'
    } else {
        // show sign in button
        signOutBtn.style.display = 'none'
        signInBtn.style.display = 'inline'
    }
}

document.addEventListener("load", toggleSignInOut());
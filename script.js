// --- CONFIGURATION ---
const ADMIN_USER = "rjoximer"; 
const ADMIN_PASS = "als123456"; 

// --- LOGIN LOGIC ---
function login() {
    // 1. Get what the user typed
    const userInput = document.getElementById("username").value;
    const passInput = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-message");
    
    // 2. Check password
    const savedPass = localStorage.getItem("sitePassword");
    const actualPass = savedPass ? savedPass : ADMIN_PASS;

    if (userInput === ADMIN_USER && passInput === actualPass) {
        // SUCCESS: Save the key and go to dashboard
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html"; 
    } else {
        // FAIL: Show error
        if(errorMsg) errorMsg.style.display = "block";
        else alert("Incorrect Username or Password");
    }
}

// --- LOGOUT LOGIC ---
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
}

// --- CHANGE PASSWORD LOGIC ---
function changePassword() {
    const newPass = prompt("Enter your new password:");
    if (newPass) {
        localStorage.setItem("sitePassword", newPass);
        alert("Password updated! Please log in again.");
        logout();
    }
}
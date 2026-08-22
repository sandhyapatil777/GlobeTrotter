/* =========================================
   GLOBETROTTER AUTHENTICATION
========================================= */


/* =========================================
   GET SCREENS
========================================= */

const screens = {

    login:
        document.getElementById(
            "loginScreen"
        ),

    register:
        document.getElementById(
            "registerScreen"
        ),

    forgot:
        document.getElementById(
            "forgotScreen"
        ),

    success:
        document.getElementById(
            "successScreen"
        )

};


/* =========================================
   CHANGE SCREEN
========================================= */

function showScreen(name) {

    Object.values(screens)
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    screens[name]
        .classList.add(
            "active"
        );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    clearMessages();

}


/* =========================================
   LOGIN
========================================= */

function showLogin() {

    showScreen("login");

}


/* =========================================
   REGISTER
========================================= */

function showRegister() {

    showScreen("register");

}


/* =========================================
   FORGOT PASSWORD
========================================= */

function showForgot() {

    showScreen("forgot");

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearMessages() {


    document
        .querySelectorAll(".message")
        .forEach(element => {

            element.className =
                "message";

            element.textContent =
                "";

        });


    document
        .querySelectorAll(".error")
        .forEach(element => {

            element.textContent =
                "";

        });


    document
        .querySelectorAll("input")
        .forEach(input => {

            input.classList.remove(
                "invalid"
            );

        });

}


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

function togglePassword(
    id,
    button
) {

    const input =
        document.getElementById(id);


    if (
        input.type === "password"
    ) {

        input.type = "text";

        button.textContent =
            "Hide";

    }

    else {

        input.type =
            "password";

        button.textContent =
            "Show";

    }

}


/* =========================================
   PASSWORD STRENGTH
========================================= */

const registerPassword =
    document.getElementById(
        "registerPassword"
    );


registerPassword.addEventListener(
    "input",
    function () {


        const password =
            this.value;


        let score = 0;


        if (
            password.length >= 8
        ) {

            score++;

        }


        if (
            /[A-Z]/.test(password)
        ) {

            score++;

        }


        if (
            /[0-9]/.test(password)
        ) {

            score++;

        }


        if (
            /[^A-Za-z0-9]/.test(password)
        ) {

            score++;

        }


        const bar =
            document.getElementById(
                "strengthBar"
            );


        const text =
            document.getElementById(
                "strengthText"
            );


        const widths = [

            "0%",

            "25%",

            "50%",

            "75%",

            "100%"

        ];


        bar.style.width =
            widths[score];


        if (
            password.length === 0
        ) {

            text.textContent =
                "Use 8+ characters with a number and symbol.";

        }

        else if (
            score <= 1
        ) {

            text.textContent =
                "Weak password";

        }

        else if (
            score === 2
        ) {

            text.textContent =
                "Fair password";

        }

        else if (
            score === 3
        ) {

            text.textContent =
                "Good password";

        }

        else {

            text.textContent =
                "Strong password";

        }

    }

);


/* =========================================
   SET ERROR
========================================= */

function setError(
    inputId,
    errorId,
    message
) {


    const input =
        document.getElementById(
            inputId
        );


    const error =
        document.getElementById(
            errorId
        );


    input.classList.add(
        "invalid"
    );


    error.textContent =
        message;

}


/* =========================================
   CLEAR ERROR
========================================= */

function clearError(
    inputId,
    errorId
) {


    const input =
        document.getElementById(
            inputId
        );


    const error =
        document.getElementById(
            errorId
        );


    input.classList.remove(
        "invalid"
    );


    error.textContent =
        "";

}


/* =========================================
   SHOW MESSAGE
========================================= */

function showMessage(
    id,
    message,
    type
) {


    const element =
        document.getElementById(id);


    element.textContent =
        message;


    element.className =
        "message show " +
        type;

}


/* =========================================
   LOGIN FORM
========================================= */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const identity =
                document
                    .getElementById(
                        "loginIdentity"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "loginPassword"
                    )
                    .value;


            let valid = true;


            /* USERNAME */


            if (!identity) {


                setError(

                    "loginIdentity",

                    "loginIdentityError",

                    "Please enter your email or username."

                );


                valid = false;

            }

            else {


                clearError(

                    "loginIdentity",

                    "loginIdentityError"

                );

            }


            /* PASSWORD */


            if (!password) {


                setError(

                    "loginPassword",

                    "loginPasswordError",

                    "Please enter your password."

                );


                valid = false;

            }

            else {


                clearError(

                    "loginPassword",

                    "loginPasswordError"

                );

            }


            if (!valid) {

                return;

            }


            /*
                FRONTEND DEMO

                In your real project,
                replace this with:

                fetch("login.php", {
                    method: "POST",
                    body: new FormData(this)
                })
            */


            const savedUser =
                JSON.parse(

                    localStorage.getItem(
                        "globetrotterUser"
                    )

                );


            if (

                savedUser &&

                (

                    identity ===
                    savedUser.email ||

                    identity ===
                    savedUser.username

                ) &&

                password ===
                savedUser.password

            ) {


                showMessage(

                    "loginMessage",

                    "Login successful! Welcome back, " +
                    savedUser.firstName +
                    ".",

                    "success"

                );


                setTimeout(
                    function () {


                        /*
                            LATER:

                            window.location.href =
                            "dashboard.php";
                        */


                        showToast(

                            "Demo login successful. Connect this to dashboard.php."

                        );


                    },

                    700

                );

            }


            else if (!savedUser) {


                showMessage(

                    "loginMessage",

                    "No demo account found. Please create an account first.",

                    "error"

                );

            }


            else {


                showMessage(

                    "loginMessage",

                    "Incorrect email/username or password.",

                    "error"

                );

            }

        }

    );


/* =========================================
   REGISTER FORM
========================================= */

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const firstName =
                document
                    .getElementById(
                        "firstName"
                    )
                    .value
                    .trim();


            const lastName =
                document
                    .getElementById(
                        "lastName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "registerEmail"
                    )
                    .value
                    .trim();


            const username =
                document
                    .getElementById(
                        "registerUsername"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "registerPassword"
                    )
                    .value;


            const terms =
                document
                    .getElementById(
                        "terms"
                    )
                    .checked;


            let valid = true;


            /* FIRST NAME */


            if (!firstName) {


                setError(

                    "firstName",

                    "firstNameError",

                    "First name is required."

                );


                valid = false;

            }

            else {


                clearError(

                    "firstName",

                    "firstNameError"

                );

            }


            /* LAST NAME */


            if (!lastName) {


                setError(

                    "lastName",

                    "lastNameError",

                    "Last name is required."

                );


                valid = false;

            }

            else {


                clearError(

                    "lastName",

                    "lastNameError"

                );

            }


            /* EMAIL */


            if (

                !email ||

                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)

            ) {


                setError(

                    "registerEmail",

                    "registerEmailError",

                    "Enter a valid email address."

                );


                valid = false;

            }

            else {


                clearError(

                    "registerEmail",

                    "registerEmailError"

                );

            }


            /* USERNAME */


            if (
                username.length < 3
            ) {


                setError(

                    "registerUsername",

                    "registerUsernameError",

                    "Username must contain at least 3 characters."

                );


                valid = false;

            }

            else {


                clearError(

                    "registerUsername",

                    "registerUsernameError"

                );

            }


            /* PASSWORD */


            if (
                password.length < 8
            ) {


                setError(

                    "registerPassword",

                    "registerPasswordError",

                    "Password must contain at least 8 characters."

                );


                valid = false;

            }

            else {


                clearError(

                    "registerPassword",

                    "registerPasswordError"

                );

            }


            /* TERMS */


            if (!terms) {


                showMessage(

                    "registerMessage",

                    "Please accept the Terms and Privacy Policy.",

                    "error"

                );


                valid = false;

            }


            if (!valid) {

                return;

            }


            /* CREATE USER */


            const user = {

                firstName:
                    firstName,

                lastName:
                    lastName,

                email:
                    email,

                username:
                    username,

                password:
                    password

            };


            /*
                FRONTEND DEMO ONLY.

                DO NOT store real passwords
                in localStorage.

                For the actual project,
                send this data to PHP
                and hash the password
                before saving it to MySQL.
            */


            localStorage.setItem(

                "globetrotterUser",

                JSON.stringify(user)

            );


            showMessage(

                "registerMessage",

                "Account created successfully! Redirecting to sign in...",

                "success"

            );


            setTimeout(

                function () {

                    showLogin();

                },

                1200

            );

        }

    );


/* =========================================
   FORGOT PASSWORD FORM
========================================= */

document
    .getElementById("forgotForm")
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "forgotEmail"
                    )
                    .value
                    .trim();


            /* VALIDATE EMAIL */


            if (

                !email ||

                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)

            ) {


                setError(

                    "forgotEmail",

                    "forgotEmailError",

                    "Please enter a valid email address."

                );


                return;

            }


            clearError(

                "forgotEmail",

                "forgotEmailError"

            );


            /*
                REAL PROJECT FLOW:

                1. Send email to PHP

                2. PHP checks user

                3. Generate secure token

                4. Store token in database

                5. Set token expiry

                6. Send reset email

                7. User clicks reset link

                8. reset-password.php opens

                9. User creates new password
            */


            showScreen(
                "success"
            );

        }

    );


/* =========================================
   GOOGLE LOGIN DEMO
========================================= */

function demoSocial(provider) {


    showToast(

        provider +
        " sign-in is ready to connect to OAuth."

    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {


    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.style.display =
        "block";


    clearTimeout(
        toastTimer
    );


    toastTimer =

        setTimeout(

            function () {

                toast.style.display =
                    "none";

            },

            3000

        );

}
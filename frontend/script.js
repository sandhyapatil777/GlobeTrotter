/* =========================================================
   GLOBETROTTER - COMPLETE JAVASCRIPT
   Authentication + Trip Planner + My Trips
========================================================= */


/* =========================================================
   AUTHENTICATION
========================================================= */

const screens = {

    login:
        document.getElementById("loginScreen"),

    register:
        document.getElementById("registerScreen"),

    forgot:
        document.getElementById("forgotScreen"),

    success:
        document.getElementById("successScreen")

};


/* =========================================================
   SCREEN FUNCTIONS
========================================================= */

function showScreen(name) {

    Object.values(screens).forEach(screen => {

        if (screen) {
            screen.classList.remove("active");
        }

    });

    if (screens[name]) {
        screens[name].classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    clearMessages();

}


function showRegister() {
    showScreen("register");
}


function showLogin() {
    showScreen("login");
}


function showForgot() {
    showScreen("forgot");
}


/* =========================================================
   CLEAR MESSAGES
========================================================= */

function clearMessages() {

    document
        .querySelectorAll(".message")
        .forEach(element => {

            element.className = "message";
            element.textContent = "";

        });


    document
        .querySelectorAll(".error")
        .forEach(element => {

            element.textContent = "";

        });


    document
        .querySelectorAll("input")
        .forEach(input => {

            input.classList.remove("invalid");

        });

}


/* =========================================================
   ERROR FUNCTIONS
========================================================= */

function setError(inputId, errorId, message) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(errorId);


    if (input) {
        input.classList.add("invalid");
    }


    if (error) {
        error.textContent = message;
    }

}


function clearError(inputId, errorId) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(errorId);


    if (input) {
        input.classList.remove("invalid");
    }


    if (error) {
        error.textContent = "";
    }

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(id, message, type) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        "message show " + type;

}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function togglePassword(id, button) {

    const input =
        document.getElementById(id);

    if (!input) {
        return;
    }


    if (input.type === "password") {

        input.type = "text";
        button.textContent = "Hide";

    }

    else {

        input.type = "password";
        button.textContent = "Show";

    }

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const identity =
                document
                    .getElementById("loginIdentity")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            let valid = true;


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


            const savedUser =
                localStorage.getItem(
                    "globetrotterUser"
                );


            if (!savedUser) {

                showMessage(
                    "loginMessage",
                    "No account found. Please create an account first.",
                    "error"
                );

                return;

            }


            let user;

            try {

                user =
                    JSON.parse(savedUser);

            }

            catch (error) {

                showMessage(
                    "loginMessage",
                    "Unable to read account information.",
                    "error"
                );

                return;

            }


            const identityMatches =

                identity.toLowerCase() ===
                String(user.email || "").toLowerCase()

                ||

                identity.toLowerCase() ===
                String(user.username || "").toLowerCase();


            if (!identityMatches) {

                showMessage(
                    "loginMessage",
                    "Incorrect email or username.",
                    "error"
                );

                return;

            }


            if (password !== user.password) {

                showMessage(
                    "loginMessage",
                    "Incorrect password.",
                    "error"
                );

                return;

            }


            /* LOGIN SUCCESS */

            localStorage.setItem(
                "globetrotterLoggedIn",
                "true"
            );


            localStorage.setItem(
                "globetrotterCurrentUser",
                JSON.stringify(user)
            );


            const rememberMe =
                document.getElementById("rememberMe");


            if (
                rememberMe &&
                rememberMe.checked
            ) {

                localStorage.setItem(
                    "globetrotterRememberMe",
                    "true"
                );

            }

            else {

                localStorage.removeItem(
                    "globetrotterRememberMe"
                );

            }


            /* IMPORTANT:
               Remove old editing information
               when normal login happens.
            */

            localStorage.removeItem("editingTrip");


            window.location.href =
                "dashboard.html";

        }
    );

}


/* =========================================================
   REGISTER
========================================================= */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const firstName =
                document
                    .getElementById("firstName")
                    .value
                    .trim();


            const lastName =
                document
                    .getElementById("lastName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim();


            const username =
                document
                    .getElementById("registerUsername")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const terms =
                document
                    .getElementById("terms")
                    .checked;


            let valid = true;


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


            if (
                !email ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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


            if (username.length < 3) {

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


            if (password.length < 8) {

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
                function() {

                    showLogin();

                },
                1200
            );

        }
    );

}


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

const registerPassword =
    document.getElementById(
        "registerPassword"
    );


if (registerPassword) {

    registerPassword.addEventListener(
        "input",
        function() {

            const password =
                this.value;


            let score = 0;


            if (password.length >= 8) {
                score++;
            }


            if (/[A-Z]/.test(password)) {
                score++;
            }


            if (/[0-9]/.test(password)) {
                score++;
            }


            if (/[^A-Za-z0-9]/.test(password)) {
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


            if (bar) {
                bar.style.width =
                    widths[score];
            }


            if (!text) {
                return;
            }


            if (password.length === 0) {

                text.textContent =
                    "Use 8+ characters with a number and symbol.";

            }

            else if (score <= 1) {

                text.textContent =
                    "Weak password";

            }

            else if (score === 2) {

                text.textContent =
                    "Fair password";

            }

            else if (score === 3) {

                text.textContent =
                    "Good password";

            }

            else {

                text.textContent =
                    "Strong password";

            }

        }
    );

}


/* =========================================================
   FORGOT PASSWORD
========================================================= */

const forgotForm =
    document.getElementById("forgotForm");


if (forgotForm) {

    forgotForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("forgotEmail")
                    .value
                    .trim();


            if (
                !email ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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


            showScreen("success");

        }
    );

}


/* =========================================================
   SOCIAL LOGIN
========================================================= */

function demoSocial(provider) {

    showToast(
        provider +
        " sign-in is ready to connect to OAuth."
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            function() {

                toast.classList.remove("show");

            },
            3000
        );

}


/* =========================================================
   TRIP STORAGE
========================================================= */

function getTrips() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "globetrotterTrips"
            )
        ) || [];

    }

    catch (error) {

        console.error(
            "Could not read trips:",
            error
        );

        return [];

    }

}


function saveTrips(trips) {

    localStorage.setItem(
        "globetrotterTrips",
        JSON.stringify(trips)
    );

}


/* =========================================================
   DATE FUNCTIONS
========================================================= */

function calculateDays(startDate, endDate) {

    const start =
        new Date(startDate + "T00:00:00");

    const end =
        new Date(endDate + "T00:00:00");

    const difference =
        end.getTime() -
        start.getTime();

    return Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
    ) + 1;

}


function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;

}


/* =========================================================
   CUSTOM TRIP MODAL
========================================================= */

function openCustomTrip() {

    const modal =
        document.getElementById(
            "customModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


function closeCustomTrip() {

    const modal =
        document.getElementById(
            "customModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }

}


/* =========================================================
   POPULAR DESTINATION
========================================================= */

function selectDestination(destination) {

    const customDestination =
        document.getElementById(
            "customDestination"
        );


    if (customDestination) {

        customDestination.value =
            destination;

    }


    showToast(
        destination +
        " selected. Choose your dates."
    );

}


function selectCustomDestination(destination) {

    const input =
        document.getElementById(
            "customDestination"
        );


    if (input) {

        input.value =
            destination;

    }

}


/* =========================================================
   GENERATE CUSTOM TRIP
========================================================= */

function generateCustomTrip() {

    const destinationInput =
        document.getElementById(
            "customDestination"
        );

    const travelStyleInput =
        document.getElementById(
            "travelStyle"
        );

    const startInput =
        document.getElementById(
            "customStart"
        );

    const endInput =
        document.getElementById(
            "customEnd"
        );

    const budgetInput =
        document.getElementById(
            "customBudget"
        );

    const interestsInput =
        document.getElementById(
            "interests"
        );


    if (
        !destinationInput ||
        !travelStyleInput ||
        !startInput ||
        !endInput ||
        !budgetInput ||
        !interestsInput
    ) {
        return;
    }


    const destination =
        destinationInput.value.trim();

    const travelStyle =
        travelStyleInput.value;

    const startDate =
        startInput.value;

    const endDate =
        endInput.value;

    const budget =
        budgetInput.value;

    const interests =
        interestsInput.value.trim();


    /* VALIDATION */

    if (!destination) {

        showToast(
            "Please enter a destination."
        );

        return;

    }


    if (!startDate || !endDate) {

        showToast(
            "Please select both dates."
        );

        return;

    }


    if (
        new Date(endDate) <
        new Date(startDate)
    ) {

        showToast(
            "End date cannot be before start date."
        );

        return;

    }


    if (
        !budget ||
        Number(budget) <= 0
    ) {

        showToast(
            "Please enter your trip budget."
        );

        return;

    }


    const days =
        calculateDays(
            startDate,
            endDate
        );


    const trips =
        getTrips();


    /* =====================================================
       EDIT EXISTING TRIP
    ===================================================== */

    const editingTrip =
        localStorage.getItem(
            "editingTrip"
        );


    if (editingTrip) {

        try {

            const oldTrip =
                JSON.parse(editingTrip);


            const tripId =
                Number(oldTrip.id);


            const index =
                trips.findIndex(
                    item =>
                        Number(item.id) ===
                        tripId
                );


            const updatedTrip = {

                id:
                    tripId,

                destination:
                    destination,

                startDate:
                    startDate,

                endDate:
                    endDate,

                days:
                    days,

                budget:
                    Number(budget),

                tripType:
                    travelStyle,

                interests:
                    interests,

                createdAt:
                    oldTrip.createdAt ||
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString()

            };


            if (index !== -1) {

                trips[index] =
                    updatedTrip;

            }

            else {

                trips.push(
                    updatedTrip
                );

            }


            saveTrips(trips);


            localStorage.setItem(
                "globeTrotterTrip",
                JSON.stringify(updatedTrip)
            );


            /* VERY IMPORTANT */

            localStorage.removeItem(
                "editingTrip"
            );


            closeCustomTrip();


            showToast(
                "Trip updated successfully!"
            );


            setTimeout(
                function() {

                    window.location.href =
                        "trips.html";

                },
                700
            );


            return;

        }

        catch (error) {

            console.error(
                "Could not update trip:",
                error
            );

            localStorage.removeItem(
                "editingTrip"
            );

        }

    }


    /* =====================================================
       CREATE NEW TRIP
    ===================================================== */

    const trip = {

        id:
            Date.now(),

        destination:
            destination,

        startDate:
            startDate,

        endDate:
            endDate,

        days:
            days,

        budget:
            Number(budget),

        tripType:
            travelStyle,

        interests:
            interests,

        createdAt:
            new Date().toISOString()

    };


    trips.push(trip);


    saveTrips(trips);


    localStorage.setItem(
        "globeTrotterTrip",
        JSON.stringify(trip)
    );


    /* IMPORTANT:
       Make sure edit mode is completely cleared.
    */

    localStorage.removeItem(
        "editingTrip"
    );


    closeCustomTrip();


    showToast(
        "Trip created successfully!"
    );


    setTimeout(
        function() {

            window.location.href =
                "trips.html";

        },
        700
    );

}


/* =========================================================
   CREATE NORMAL TRIP
========================================================= */

function createTrip() {

    const destinationElement =
        document.getElementById(
            "destination"
        );

    const startElement =
        document.getElementById(
            "startDate"
        );

    const endElement =
        document.getElementById(
            "endDate"
        );

    const budgetElement =
        document.getElementById(
            "budget"
        );


    if (
        !destinationElement ||
        !startElement ||
        !endElement ||
        !budgetElement
    ) {
        return;
    }


    const destination =
        destinationElement.value.trim();

    const startDate =
        startElement.value;

    const endDate =
        endElement.value;

    const budget =
        budgetElement.value;


    if (!destination) {

        showToast(
            "Please enter a destination."
        );

        return;

    }


    if (!startDate || !endDate) {

        showToast(
            "Please select both dates."
        );

        return;

    }


    if (
        new Date(endDate) <
        new Date(startDate)
    ) {

        showToast(
            "End date cannot be before start date."
        );

        return;

    }


    if (
        !budget ||
        Number(budget) <= 0
    ) {

        showToast(
            "Please enter your trip budget."
        );

        return;

    }


    const trip = {

        id:
            Date.now(),

        destination:
            destination,

        startDate:
            startDate,

        endDate:
            endDate,

        days:
            calculateDays(
                startDate,
                endDate
            ),

        budget:
            Number(budget),

        tripType:
            "Standard Trip",

        interests:
            "",

        createdAt:
            new Date().toISOString()

    };


    const trips =
        getTrips();


    trips.push(trip);


    saveTrips(trips);


    localStorage.setItem(
        "globeTrotterTrip",
        JSON.stringify(trip)
    );


    localStorage.removeItem(
        "editingTrip"
    );


    window.location.href =
        "trips.html";

}


/* =========================================================
   EDIT TRIP
========================================================= */

function editTrip(id) {

    const trips =
        getTrips();


    const trip =
        trips.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        return;

    }


    /*
       Save which trip is being edited.
    */

    localStorage.setItem(
        "editingTrip",
        JSON.stringify(trip)
    );


    /*
       IMPORTANT:
       Use a special URL parameter.

       This tells index.html that it should
       open the modal ONLY for editing.
    */

    window.location.href =
        "index.html?editTrip=true";

}


/* =========================================================
   DELETE TRIP
========================================================= */

function deleteTrip(id) {

    const trips =
        getTrips();


    const trip =
        trips.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        return;

    }


    const confirmed =
        window.confirm(
            "Are you sure you want to delete the trip to " +
            trip.destination +
            "?"
        );


    if (!confirmed) {
        return;
    }


    const updatedTrips =
        trips.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveTrips(updatedTrips);


    const currentTrip =
        localStorage.getItem(
            "globeTrotterTrip"
        );


    if (currentTrip) {

        try {

            const parsed =
                JSON.parse(currentTrip);


            if (
                Number(parsed.id) ===
                Number(id)
            ) {

                localStorage.removeItem(
                    "globeTrotterTrip"
                );

            }

        }

        catch (error) {

            console.error(error);

        }

    }


    const editingTrip =
        localStorage.getItem(
            "editingTrip"
        );


    if (editingTrip) {

        try {

            const parsed =
                JSON.parse(editingTrip);


            if (
                Number(parsed.id) ===
                Number(id)
            ) {

                localStorage.removeItem(
                    "editingTrip"
                );

            }

        }

        catch (error) {

            localStorage.removeItem(
                "editingTrip"
            );

        }

    }


    showToast(
        "Trip deleted successfully."
    );


    setTimeout(
        function() {

            if (
                window.location.pathname
                    .toLowerCase()
                    .includes("trips")
            ) {

                if (
                    typeof loadTrips ===
                    "function"
                ) {

                    loadTrips();

                }

                else {

                    window.location.reload();

                }

            }

        },
        300
    );

}


/* =========================================================
   VIEW TRIP
========================================================= */

function viewTrip(id) {

    const trips =
        getTrips();


    const trip =
        trips.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        return;

    }


    localStorage.setItem(
        "globeTrotterTrip",
        JSON.stringify(trip)
    );


    /*
       View itinerary WITHOUT opening
       the Create Trip modal.
    */

    window.location.href =
        "index.html#itinerary";

}


/* =========================================================
   LOAD EDITING TRIP
========================================================= */

function loadEditingTrip() {

    /*
       IMPORTANT:
       Only open editing mode when the URL
       contains ?editTrip=true
    */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const isEditMode =
        params.get("editTrip") === "true";


    /*
       NORMAL index.html:
       DO NOTHING.
    */

    if (!isEditMode) {

        return;

    }


    const editingTrip =
        localStorage.getItem(
            "editingTrip"
        );


    if (!editingTrip) {

        return;

    }


    try {

        const trip =
            JSON.parse(editingTrip);


        const destination =
            document.getElementById(
                "customDestination"
            );

        const travelStyle =
            document.getElementById(
                "travelStyle"
            );

        const start =
            document.getElementById(
                "customStart"
            );

        const end =
            document.getElementById(
                "customEnd"
            );

        const budget =
            document.getElementById(
                "customBudget"
            );

        const interests =
            document.getElementById(
                "interests"
            );


        if (destination) {

            destination.value =
                trip.destination || "";

        }


        if (travelStyle) {

            travelStyle.value =
                trip.tripType ||
                "Relaxed";

        }


        if (start) {

            start.value =
                trip.startDate || "";

        }


        if (end) {

            end.value =
                trip.endDate || "";

        }


        if (budget) {

            budget.value =
                trip.budget || "";

        }


        if (interests) {

            interests.value =
                trip.interests || "";

        }


        /*
           NOW and ONLY NOW open modal.
        */

        openCustomTrip();

    }

    catch (error) {

        console.error(
            "Could not load trip for editing:",
            error
        );


        localStorage.removeItem(
            "editingTrip"
        );

    }

}


/* =========================================================
   ITINERARY
========================================================= */

function createItinerary(
    destination,
    startDate,
    endDate,
    days,
    tripType,
    interests
) {

    const itineraryContainer =
        document.getElementById(
            "itineraryContainer"
        );


    const tripSubtitle =
        document.getElementById(
            "tripSubtitle"
        );


    if (
        !itineraryContainer ||
        !tripSubtitle
    ) {

        return;

    }


    const formattedStart =
        formatDate(startDate);


    const formattedEnd =
        formatDate(endDate);


    tripSubtitle.innerHTML =
        `${escapeHTML(destination)} · ${formattedStart} – ${formattedEnd} · ${days} days`;


    let itineraryHTML = "";


    for (
        let i = 1;
        i <= days;
        i++
    ) {

        const currentDate =
            new Date(
                startDate + "T00:00:00"
            );


        currentDate.setDate(
            currentDate.getDate() +
            (i - 1)
        );


        const formattedDay =
            currentDate.toLocaleDateString(
                "en-IN",
                {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                }
            );


        const activities =
            getActivities(
                destination,
                i,
                days,
                interests
            );


        itineraryHTML += `

            <div class="itinerary-day">

                <div class="day-number">
                    ${i}
                </div>

                <div class="day-content">

                    <div class="day-header">

                        <div>

                            <h3>
                                Day ${i}
                            </h3>

                            <span class="day-date">
                                ${formattedDay}
                            </span>

                        </div>

                        <span class="trip-type">
                            ${escapeHTML(
                                tripType ||
                                "Standard Trip"
                            )}
                        </span>

                    </div>

                    <div class="activities">

                        ${activities}

                    </div>

                </div>

            </div>

        `;

    }


    itineraryContainer.innerHTML = `

        <div class="itinerary-summary">

            <div class="summary-icon">
                ✈
            </div>

            <div>

                <h3>
                    ${escapeHTML(destination)}
                </h3>

                <p>
                    ${formattedStart}
                    →
                    ${formattedEnd}
                    · ${days} days
                </p>

            </div>

        </div>


        <div class="itinerary-days">

            ${itineraryHTML}

        </div>

    `;

}


/* =========================================================
   ACTIVITIES
========================================================= */

function getActivities(
    destination,
    day,
    totalDays,
    interests
) {

    const interestText =
        interests
            ? interests.toLowerCase()
            : "";


    let activities = [];


    if (
        interestText.includes("beach")
    ) {

        activities.push(
            "🏖️ Explore the nearby beaches"
        );

    }


    if (
        interestText.includes("museum")
    ) {

        activities.push(
            "🏛️ Visit a famous local museum"
        );

    }


    if (
        interestText.includes("food")
    ) {

        activities.push(
            "🍴 Try popular local food"
        );

    }


    if (
        interestText.includes("shopping")
    ) {

        activities.push(
            "🛍️ Explore local shopping areas"
        );

    }


    if (
        interestText.includes("hiking")
    ) {

        activities.push(
            "🥾 Enjoy a scenic hiking experience"
        );

    }


    if (activities.length === 0) {

        if (day === 1) {

            activities = [

                `📍 Arrive in ${escapeHTML(destination)}`,

                "🏨 Check-in and settle into your accommodation",

                "🌆 Explore the nearby area"

            ];

        }

        else if (
            day === totalDays
        ) {

            activities = [

                "☕ Enjoy a relaxed breakfast",

                "🛍️ Last-minute shopping and sightseeing",

                "✈️ Check-out and departure"

            ];

        }

        else {

            activities = [

                `📸 Explore the main attractions of ${escapeHTML(destination)}`,

                "🍴 Enjoy local cuisine",

                "🌆 Evening sightseeing"

            ];

        }

    }


    return activities
        .map(
            activity => `

                <div class="activity">
                    ${activity}
                </div>

            `
        )
        .join("");

}


/* =========================================================
   LOAD SAVED ITINERARY
========================================================= */

function loadSavedTrip() {

    const savedTrip =
        localStorage.getItem(
            "globeTrotterTrip"
        );


    if (!savedTrip) {
        return;
    }


    try {

        const trip =
            JSON.parse(savedTrip);


        if (
            trip.destination &&
            trip.startDate &&
            trip.endDate
        ) {

            const days =
                trip.days ||
                calculateDays(
                    trip.startDate,
                    trip.endDate
                );


            createItinerary(

                trip.destination,

                trip.startDate,

                trip.endDate,

                days,

                trip.tripType ||
                "Standard Trip",

                trip.interests ||
                ""

            );

        }

    }

    catch (error) {

        console.error(
            "Could not load saved trip:",
            error
        );

    }

}


/* =========================================================
   MODAL OUTSIDE CLICK
========================================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "customModal"
            );


        if (
            modal &&
            event.target === modal
        ) {

            closeCustomTrip();

        }

    }
);


/* =========================================================
   NAVIGATION FIX
========================================================= */

/*
   This is the important part for your
   Explore link.

   When user goes to index.html normally,
   remove editing mode.

   Therefore:

   trips.html
       ↓
   Explore
       ↓
   index.html
       ↓
   NO CREATE TRIP MODAL
*/

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const isIndexPage =
            window.location.pathname
                .toLowerCase()
                .endsWith("index.html");


        const params =
            new URLSearchParams(
                window.location.search
            );


        const isEditMode =
            params.get("editTrip") === "true";


        /*
           If index.html is opened normally,
           clear any old editing state.
        */

        if (
            isIndexPage &&
            !isEditMode
        ) {

            localStorage.removeItem(
                "editingTrip"
            );

        }


        /*
           Load saved itinerary.
           This DOES NOT open the modal.
        */

        loadSavedTrip();


        /*
           Open modal ONLY when editing.
        */

        if (
            isIndexPage &&
            isEditMode
        ) {

            loadEditingTrip();

        }

    }
);
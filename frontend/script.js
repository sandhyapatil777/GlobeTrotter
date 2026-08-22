/* =========================================================
   GLOBETROTTER - COMPLETE JAVASCRIPT

   AUTHENTICATION
   TRIP CREATION
   ITINERARY BUILDER
   ADD STOPS
   CITY + DATES
   ACTIVITIES
   ACTIVITY TIME
   ACTIVITY COST
   REORDER STOPS
   SAVE ITINERARY
   MY TRIPS
   VIEW COMPLETE ITINERARY
   LIST / CALENDAR VIEW
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

            localStorage.setItem(
                "globetrotterLoggedIn",
                "true"
            );

            localStorage.setItem(
                "globetrotterCurrentUser",
                JSON.stringify(user)
            );

            const rememberMe =
                document.getElementById(
                    "rememberMe"
                );

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

            localStorage.removeItem(
                "editingTrip"
            );

            window.location.href =
                "dashboard.html";

        }
    );

}


/* =========================================================
   REGISTER
========================================================= */

const registerForm =
    document.getElementById(
        "registerForm"
    );


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
    document.getElementById(
        "forgotForm"
    );


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
        new Date(
            startDate + "T00:00:00"
        );

    const end =
        new Date(
            endDate + "T00:00:00"
        );

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


function escapeAttribute(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

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

        openCustomTrip();

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
        input.value = destination;
    }

}


/* =========================================================
   CREATE NEW CUSTOM TRIP
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


    const editingTrip =
        localStorage.getItem(
            "editingTrip"
        );


    if (editingTrip) {

        try {

            const oldTrip =
                JSON.parse(
                    editingTrip
                );

            const tripId =
                Number(oldTrip.id);

            const trips =
                getTrips();

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

                stops:
                    oldTrip.stops &&
                    Array.isArray(oldTrip.stops)

                        ? oldTrip.stops

                        :

                        [

                            {

                                id:
                                    Date.now(),

                                city:
                                    destination,

                                startDate:
                                    startDate,

                                endDate:
                                    endDate,

                                activities:
                                    interests
                                        ? interests
                                            .split(",")
                                            .map(
                                                item =>
                                                    item.trim()
                                            )
                                            .filter(
                                                item =>
                                                    item.length > 0
                                            )
                                            .map(
                                                activity => ({

                                                    name:
                                                        activity,

                                                    time:
                                                        "",

                                                    cost:
                                                        0

                                                })
                                            )

                                        : []

                            }

                        ],

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
                JSON.stringify(
                    updatedTrip
                )
            );


            localStorage.removeItem(
                "editingTrip"
            );


            closeCustomTrip();


            window.location.href =
                "itinerary.html?id=" +
                updatedTrip.id;


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


    const tripId =
        Date.now();


    const firstStop = {

        id:
            tripId + 1,

        city:
            destination,

        startDate:
            startDate,

        endDate:
            endDate,

        activities:
            interests
                ? interests
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                    .filter(
                        item =>
                            item.length > 0
                    )
                    .map(
                        activity => ({

                            name:
                                activity,

                            time:
                                "",

                            cost:
                                0

                        })
                    )

                : []

    };


    const trip = {

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

        stops:
            [
                firstStop
            ],

        createdAt:
            new Date().toISOString(),

        updatedAt:
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


    closeCustomTrip();


    window.location.href =
        "itinerary.html?id=" +
        trip.id;

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


    const tripId =
        Date.now();


    const trip = {

        id:
            tripId,

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

        stops:
            [

                {

                    id:
                        tripId + 1,

                    city:
                        destination,

                    startDate:
                        startDate,

                    endDate:
                        endDate,

                    activities:
                        []

                }

            ],

        createdAt:
            new Date().toISOString(),

        updatedAt:
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
        "itinerary.html?id=" +
        trip.id;

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


    localStorage.setItem(
        "editingTrip",
        JSON.stringify(trip)
    );


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

            localStorage.removeItem(
                "globeTrotterTrip"
            );

        }

    }


    showToast(
        "Trip deleted successfully."
    );


    setTimeout(
        function() {

            if (
                typeof loadTrips ===
                "function"
            ) {

                loadTrips();

            }

            else {

                window.location.reload();

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


    window.location.href =
        "itinerary.html?id=" +
        trip.id;

}


/* =========================================================
   LOAD EDITING TRIP
========================================================= */

function loadEditingTrip() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (
        params.get("editTrip") !==
        "true"
    ) {
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
                trip.tripType || "Relaxed";
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
   GET SELECTED TRIP
========================================================= */

function getSelectedTrip() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const tripId =
        params.get("id");


    const trips =
        getTrips();


    if (tripId) {

        const trip =
            trips.find(
                item =>
                    Number(item.id) ===
                    Number(tripId)
            );


        if (trip) {

            localStorage.setItem(
                "globeTrotterTrip",
                JSON.stringify(trip)
            );


            return trip;

        }

    }


    const savedTrip =
        localStorage.getItem(
            "globeTrotterTrip"
        );


    if (!savedTrip) {
        return null;
    }


    try {

        return JSON.parse(savedTrip);

    }

    catch (error) {

        console.error(
            "Could not load selected trip:",
            error
        );

        return null;

    }

}


/* =========================================================
   NORMALIZE ACTIVITIES
   Converts old activity strings into objects.
========================================================= */

function normalizeActivities(stop) {

    if (!stop.activities) {

        stop.activities = [];

        return;

    }


    stop.activities =
        stop.activities.map(
            function(activity) {

                if (
                    typeof activity ===
                    "string"
                ) {

                    return {

                        name:
                            activity,

                        time:
                            "",

                        cost:
                            0

                    };

                }


                return {

                    name:
                        activity.name || "",

                    time:
                        activity.time || "",

                    cost:
                        Number(
                            activity.cost || 0
                        )

                };

            }
        );

}


/* =========================================================
   LOAD ITINERARY BUILDER
========================================================= */

function loadItineraryBuilder() {

    const trip =
        getSelectedTrip();


    if (!trip) {

        showToast(
            "No trip selected."
        );


        setTimeout(
            function() {

                window.location.href =
                    "trips.html";

            },
            1000
        );


        return;

    }


    if (
        !trip.stops ||
        !Array.isArray(trip.stops)
    ) {

        trip.stops = [

            {

                id:
                    Date.now(),

                city:
                    trip.destination || "",

                startDate:
                    trip.startDate || "",

                endDate:
                    trip.endDate || "",

                activities:
                    []

            }

        ];

    }


    trip.stops.forEach(
        function(stop) {

            normalizeActivities(stop);

        }
    );


    saveCurrentTrip(trip);


    const title =
        document.getElementById(
            "itineraryTitle"
        );


    const subtitle =
        document.getElementById(
            "itinerarySubtitle"
        );


    const information =
        document.getElementById(
            "tripInformation"
        );


    if (title) {

        title.textContent =
            trip.destination;

    }


    if (subtitle) {

        subtitle.textContent =
            `${formatDate(
                trip.startDate
            )} → ${formatDate(
                trip.endDate
            )} · ${trip.days} days`;

    }


    if (information) {

        information.innerHTML = `

            <div class="summary-icon">
                ✈
            </div>

            <div>

                <h3>
                    ${escapeHTML(
                        trip.destination
                    )}
                </h3>

                <p>
                    ${formatDate(
                        trip.startDate
                    )}
                    →
                    ${formatDate(
                        trip.endDate
                    )}
                </p>

                <p>
                    ${trip.days} days
                </p>

                <p>
                    Budget:
                    ₹${Number(
                        trip.budget || 0
                    ).toLocaleString(
                        "en-IN"
                    )}
                </p>

                <p>
                    Travel Style:
                    ${escapeHTML(
                        trip.tripType ||
                        "Standard Trip"
                    )}
                </p>

            </div>

        `;

    }


    renderStops(
        trip.stops
    );

    renderCalendarView(
        trip
    );

}


/* =========================================================
   RENDER STOPS
========================================================= */

function renderStops(stops) {

    const container =
        document.getElementById(
            "stopsContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    stops.forEach(
        function(stop, index) {

            normalizeActivities(stop);


            const stopElement =
                document.createElement(
                    "div"
                );


            stopElement.className =
                "itinerary-stop";


            stopElement.dataset.id =
                stop.id;


            stopElement.innerHTML = `

                <div class="stop-header">

                    <div>

                        <span class="stop-number">
                            Stop ${index + 1}
                        </span>

                        <h2>
                            ${escapeHTML(
                                stop.city ||
                                "New Stop"
                            )}
                        </h2>

                    </div>


                    <div class="stop-controls">

                        <button
                            type="button"
                            onclick="moveStopUp(${stop.id})"
                            title="Move stop up"
                        >
                            ↑
                        </button>


                        <button
                            type="button"
                            onclick="moveStopDown(${stop.id})"
                            title="Move stop down"
                        >
                            ↓
                        </button>


                        <button
                            type="button"
                            onclick="deleteStop(${stop.id})"
                            title="Delete stop"
                        >
                            ✕
                        </button>

                    </div>

                </div>


                <div class="form-grid">


                    <!-- CITY -->

                    <div class="input-group">

                        <label>
                            City
                        </label>

                        <input
                            type="text"
                            value="${escapeAttribute(
                                stop.city || ""
                            )}"
                            onchange="updateStopCity(
                                ${stop.id},
                                this.value
                            )"
                            placeholder="e.g. Paris"
                        >

                    </div>


                    <!-- START DATE -->

                    <div class="input-group">

                        <label>
                            Start Date
                        </label>

                        <input
                            type="date"
                            value="${stop.startDate || ""}"
                            onchange="updateStopDate(
                                ${stop.id},
                                'startDate',
                                this.value
                            )"
                        >

                    </div>


                    <!-- END DATE -->

                    <div class="input-group">

                        <label>
                            End Date
                        </label>

                        <input
                            type="date"
                            value="${stop.endDate || ""}"
                            onchange="updateStopDate(
                                ${stop.id},
                                'endDate',
                                this.value
                            )"
                        >

                    </div>


                    <!-- ACTIVITIES -->

                    <div class="activities-section">

                        <div class="activities-title">

                            <h3>
                                Activities
                            </h3>

                        </div>


                        <div id="activities-${stop.id}">

                            ${renderActivityInputs(
                                stop
                            )}

                        </div>


                        <button
                            type="button"
                            class="add-activity-btn"
                            onclick="addActivity(${stop.id})"
                        >
                            + Add Activity
                        </button>

                    </div>

                </div>


                <!-- ACTIVITY PREVIEW -->

                <div class="activities-preview">

                    ${
                        (stop.activities || [])
                            .map(
                                activity => `

                                    <div class="activity">

                                        <div class="activity-info">

                                            <span class="activity-name">
                                                ${escapeHTML(
                                                    activity.name
                                                )}
                                            </span>

                                            <span class="activity-meta">

                                                ${
                                                    activity.time
                                                        ? "🕒 " +
                                                          escapeHTML(
                                                              activity.time
                                                          )
                                                        : "🕒 Time not set"
                                                }

                                            </span>

                                        </div>


                                        <span class="activity-cost">

                                            ₹${Number(
                                                activity.cost || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </span>

                                    </div>

                                `
                            )
                            .join("")
                    }

                </div>

            `;


            container.appendChild(
                stopElement
            );

        }
    );

}


/* =========================================================
   RENDER ACTIVITY INPUTS
========================================================= */

function renderActivityInputs(stop) {

    if (
        !stop.activities ||
        stop.activities.length === 0
    ) {

        return `

            <p style="
                color:#888;
                margin:0 0 12px;
            ">
                No activities added yet.
            </p>

        `;

    }


    return stop.activities
        .map(
            function(activity, index) {

                return `

                    <div class="activity-builder">

                        <div class="activity-form-grid">


                            <!-- ACTIVITY NAME -->

                            <div class="activity-form-group">

                                <label>
                                    Activity
                                </label>

                                <input
                                    type="text"
                                    value="${escapeAttribute(
                                        activity.name || ""
                                    )}"
                                    placeholder="e.g. Eiffel Tower visit"
                                    onchange="updateActivity(
                                        ${stop.id},
                                        ${index},
                                        'name',
                                        this.value
                                    )"
                                >

                            </div>


                            <!-- TIME -->

                            <div class="activity-form-group">

                                <label>
                                    Time
                                </label>

                                <input
                                    type="time"
                                    value="${escapeAttribute(
                                        activity.time || ""
                                    )}"
                                    onchange="updateActivity(
                                        ${stop.id},
                                        ${index},
                                        'time',
                                        this.value
                                    )"
                                >

                            </div>


                            <!-- COST -->

                            <div class="activity-form-group">

                                <label>
                                    Cost (₹)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value="${Number(
                                        activity.cost || 0
                                    )}"
                                    placeholder="0"
                                    onchange="updateActivity(
                                        ${stop.id},
                                        ${index},
                                        'cost',
                                        this.value
                                    )"
                                >

                            </div>


                            <!-- REMOVE -->

                            <button
                                type="button"
                                class="remove-activity-btn"
                                onclick="removeActivity(
                                    ${stop.id},
                                    ${index}
                                )"
                                title="Remove activity"
                            >
                                ✕
                            </button>

                        </div>

                    </div>

                `;

            }
        )
        .join("");

}


/* =========================================================
   ADD ACTIVITY
========================================================= */

function addActivity(stopId) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(stopId)
        );


    if (!stop) {
        return;
    }


    normalizeActivities(stop);


    stop.activities.push({

        name:
            "",

        time:
            "",

        cost:
            0

    });


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );


    showToast(
        "Activity added. Enter its name, time and cost."
    );

}


/* =========================================================
   UPDATE ACTIVITY
========================================================= */

function updateActivity(
    stopId,
    activityIndex,
    field,
    value
) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(stopId)
        );


    if (!stop) {
        return;
    }


    normalizeActivities(stop);


    const activity =
        stop.activities[
            activityIndex
        ];


    if (!activity) {
        return;
    }


    if (field === "cost") {

        activity.cost =
            Number(value) || 0;

    }

    else {

        activity[field] =
            value;

    }


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );

}


/* =========================================================
   REMOVE ACTIVITY
========================================================= */

function removeActivity(
    stopId,
    activityIndex
) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(stopId)
        );


    if (!stop) {
        return;
    }


    normalizeActivities(stop);


    stop.activities.splice(
        activityIndex,
        1
    );


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );


    showToast(
        "Activity removed."
    );

}


/* =========================================================
   UPDATE CITY
========================================================= */

function updateStopCity(id, city) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!stop) {
        return;
    }


    stop.city =
        city.trim();


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );

}


/* =========================================================
   UPDATE STOP DATE
========================================================= */

function updateStopDate(
    id,
    field,
    value
) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!stop) {
        return;
    }


    stop[field] =
        value;


    saveCurrentTrip(
        trip
    );


    renderCalendarView(
        trip
    );

}


/* =========================================================
   ADD STOP
========================================================= */

function addStop() {

    const trip =
        getSelectedTrip();


    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        return;

    }


    if (!trip.stops) {
        trip.stops = [];
    }


    const lastStop =
        trip.stops[
            trip.stops.length - 1
        ];


    const newStop = {

        id:
            Date.now(),

        city:
            "",

        startDate:
            lastStop &&
            lastStop.endDate

                ? lastStop.endDate

                : trip.startDate,

        endDate:
            "",

        activities:
            []

    };


    trip.stops.push(
        newStop
    );


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );


    showToast(
        "New stop added. Enter the city, dates and activities."
    );

}


/* =========================================================
   MOVE STOP UP
========================================================= */

function moveStopUp(id) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const index =
        trip.stops.findIndex(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (index <= 0) {

        showToast(
            "This stop is already first."
        );

        return;

    }


    const temp =
        trip.stops[index];


    trip.stops[index] =
        trip.stops[index - 1];


    trip.stops[index - 1] =
        temp;


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );

}


/* =========================================================
   MOVE STOP DOWN
========================================================= */

function moveStopDown(id) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    const index =
        trip.stops.findIndex(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (
        index === -1 ||
        index >=
        trip.stops.length - 1
    ) {

        showToast(
            "This stop is already last."
        );

        return;

    }


    const temp =
        trip.stops[index];


    trip.stops[index] =
        trip.stops[index + 1];


    trip.stops[index + 1] =
        temp;


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );

}


/* =========================================================
   DELETE STOP
========================================================= */

function deleteStop(id) {

    const trip =
        getSelectedTrip();


    if (
        !trip ||
        !trip.stops
    ) {
        return;
    }


    if (
        trip.stops.length <= 1
    ) {

        showToast(
            "At least one stop is required."
        );

        return;

    }


    const confirmed =
        window.confirm(
            "Are you sure you want to delete this stop?"
        );


    if (!confirmed) {
        return;
    }


    trip.stops =
        trip.stops.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveCurrentTrip(
        trip
    );


    renderStops(
        trip.stops
    );


    renderCalendarView(
        trip
    );


    showToast(
        "Stop deleted."
    );

}


/* =========================================================
   SAVE CURRENT TRIP
========================================================= */

function saveCurrentTrip(trip) {

    localStorage.setItem(
        "globeTrotterTrip",
        JSON.stringify(trip)
    );


    const trips =
        getTrips();


    const index =
        trips.findIndex(
            item =>
                Number(item.id) ===
                Number(trip.id)
        );


    if (index !== -1) {

        trip.updatedAt =
            new Date().toISOString();


        trips[index] =
            trip;


        saveTrips(
            trips
        );

    }

}


/* =========================================================
   CALENDAR DATE HELPERS
========================================================= */

function getDatesBetween(
    startDate,
    endDate
) {

    const dates = [];


    if (
        !startDate ||
        !endDate
    ) {
        return dates;
    }


    const current =
        new Date(
            startDate + "T00:00:00"
        );


    const end =
        new Date(
            endDate + "T00:00:00"
        );


    while (
        current <= end
    ) {

        dates.push(
            new Date(current)
        );


        current.setDate(
            current.getDate() + 1
        );

    }


    return dates;

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(time) {

    if (!time) {
        return "Time not set";
    }


    const parts =
        time.split(":");


    if (parts.length < 2) {
        return time;
    }


    let hours =
        Number(parts[0]);

    const minutes =
        parts[1];


    const suffix =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 ||
        12;


    return (
        hours +
        ":" +
        minutes +
        " " +
        suffix
    );

}


/* =========================================================
   RENDER CALENDAR VIEW
========================================================= */

function renderCalendarView(trip) {

    const container =
        document.getElementById(
            "calendarContainer"
        );


    if (!container) {
        return;
    }


    if (
        !trip ||
        !trip.stops
    ) {

        container.innerHTML = "";

        return;

    }


    let calendarHTML = "";


    trip.stops.forEach(
        function(stop) {

            normalizeActivities(stop);


            const dates =
                getDatesBetween(
                    stop.startDate,
                    stop.endDate
                );


            if (dates.length === 0) {

                return;

            }


            dates.forEach(
                function(date) {

                    const dateString =
                        date.toISOString()
                            .split("T")[0];


                    const dayActivities =
                        stop.activities
                            .filter(
                                function(activity) {

                                    /*
                                       If an activity has
                                       no date field, show it
                                       on the first day of
                                       the stop.
                                    */

                                    if (
                                        !activity.date
                                    ) {

                                        return (
                                            dateString ===
                                            stop.startDate
                                        );

                                    }


                                    return (
                                        activity.date ===
                                        dateString
                                    );

                                }
                            );


                    calendarHTML += `

                        <div class="calendar-day">

                            <div class="calendar-day-header">

                                <div>

                                    <h3>
                                        ${date.toLocaleDateString(
                                            "en-IN",
                                            {
                                                weekday:
                                                    "long",
                                                day:
                                                    "numeric",
                                                month:
                                                    "short",
                                                year:
                                                    "numeric"
                                            }
                                        )}
                                    </h3>

                                    <span class="calendar-city">
                                        ${escapeHTML(
                                            stop.city ||
                                            "City not set"
                                        )}
                                    </span>

                                </div>

                            </div>


                            <div class="calendar-activities">

                                ${
                                    dayActivities.length
                                        ?

                                        dayActivities
                                            .map(
                                                activity => `

                                                    <div class="calendar-activity">

                                                        <div class="calendar-time">

                                                            🕒
                                                            ${escapeHTML(
                                                                formatTime(
                                                                    activity.time
                                                                )
                                                            )}

                                                        </div>


                                                        <div class="calendar-activity-name">

                                                            ${escapeHTML(
                                                                activity.name ||
                                                                "Unnamed activity"
                                                            )}

                                                        </div>


                                                        <div class="calendar-cost">

                                                            ₹${Number(
                                                                activity.cost ||
                                                                0
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}

                                                        </div>

                                                    </div>

                                                `
                                            )
                                            .join("")

                                        :

                                        `

                                            <div style="
                                                color:#888;
                                                padding:10px 0;
                                            ">
                                                No activities planned for this day.
                                            </div>

                                        `
                                }

                            </div>

                        </div>

                    `;

                }
            );

        }
    );


    if (!calendarHTML) {

        calendarHTML = `

            <div class="itinerary-stop">

                <h3>
                    Calendar unavailable
                </h3>

                <p>
                    Add valid start and end dates to your stops.
                </p>

            </div>

        `;

    }


    container.innerHTML =
        calendarHTML;

}


/* =========================================================
   VIEW MODE
========================================================= */

function setItineraryView(mode) {

    const listContainer =
        document.getElementById(
            "stopsContainer"
        );

    const calendarContainer =
        document.getElementById(
            "calendarContainer"
        );

    const listButton =
        document.getElementById(
            "listViewButton"
        );

    const calendarButton =
        document.getElementById(
            "calendarViewButton"
        );


    if (
        !listContainer ||
        !calendarContainer
    ) {
        return;
    }


    if (mode === "calendar") {

        listContainer.style.display =
            "none";

        calendarContainer.style.display =
            "flex";


        if (listButton) {
            listButton.classList.remove(
                "active"
            );
        }


        if (calendarButton) {
            calendarButton.classList.add(
                "active"
            );
        }


        const trip =
            getSelectedTrip();


        if (trip) {

            renderCalendarView(
                trip
            );

        }

    }

    else {

        listContainer.style.display =
            "block";

        calendarContainer.style.display =
            "none";


        if (calendarButton) {
            calendarButton.classList.remove(
                "active"
            );
        }


        if (listButton) {
            listButton.classList.add(
                "active"
            );
        }

    }

}


/* =========================================================
   SAVE ITINERARY
========================================================= */

function saveItinerary() {

    const trip =
        getSelectedTrip();


    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        return;

    }


    if (
        !trip.stops ||
        trip.stops.length === 0
    ) {

        showToast(
            "Please add at least one stop."
        );

        return;

    }


    for (
        let i = 0;
        i < trip.stops.length;
        i++
    ) {

        const stop =
            trip.stops[i];


        normalizeActivities(stop);


        if (
            !stop.city ||
            !stop.city.trim()
        ) {

            showToast(
                "Please enter a city for Stop " +
                (i + 1)
            );

            return;

        }


        if (!stop.startDate) {

            showToast(
                "Please enter a start date for " +
                stop.city
            );

            return;

        }


        if (!stop.endDate) {

            showToast(
                "Please enter an end date for " +
                stop.city
            );

            return;

        }


        if (
            new Date(stop.endDate) <
            new Date(stop.startDate)
        ) {

            showToast(
                "End date cannot be before start date for " +
                stop.city
            );

            return;

        }


        /*
           Validate activities.
        */

        for (
            let j = 0;
            j < stop.activities.length;
            j++
        ) {

            const activity =
                stop.activities[j];


            if (
                activity.name &&
                activity.name.trim() &&
                activity.cost < 0
            ) {

                showToast(
                    "Activity cost cannot be negative."
                );

                return;

            }

        }

    }


    saveCurrentTrip(
        trip
    );


    localStorage.setItem(
        "globeTrotterTrip",
        JSON.stringify(trip)
    );


    showToast(
        "Itinerary saved successfully!"
    );


    setTimeout(
        function() {

            window.location.href =
                "trips.html";

        },
        800
    );

}


/* =========================================================
   OLD ITINERARY SUPPORT
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
                startDate +
                "T00:00:00"
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
                    ${escapeHTML(
                        destination
                    )}
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
   ACTIVITIES - OLD ITINERARY SUPPORT
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


    if (
        activities.length === 0
    ) {

        if (day === 1) {

            activities = [

                `📍 Arrive in ${escapeHTML(
                    destination
                )}`,

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

                `📸 Explore the main attractions of ${escapeHTML(
                    destination
                )}`,

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
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const currentPath =
            window.location.pathname
                .toLowerCase();


        const isIndexPage =

            currentPath.endsWith(
                "index.html"
            )

            ||

            currentPath.endsWith(
                "/"
            );


        const isItineraryPage =
            currentPath.endsWith(
                "itinerary.html"
            );


        const params =
            new URLSearchParams(
                window.location.search
            );


        const isEditMode =
            params.get("editTrip") ===
            "true";


        if (
            isIndexPage &&
            !isEditMode
        ) {

            localStorage.removeItem(
                "editingTrip"
            );

        }


        if (
            isIndexPage &&
            isEditMode
        ) {

            loadEditingTrip();

        }


        if (
            isItineraryPage
        ) {

            loadItineraryBuilder();

        }

    }
);

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

        input.value =
            destination;

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

                        ?

                        oldTrip.stops

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
                                        ?
                                        interests
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

                                                    date:
                                                        startDate,

                                                    time:
                                                        "",

                                                    cost:
                                                        0

                                                })
                                            )

                                        :
                                        []

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
                ?
                interests
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

                            date:
                                startDate,

                            time:
                                "",

                            cost:
                                0

                        })
                    )

                :
                []

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
   Also makes sure every activity has:
   name
   date
   time
   cost
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

                        date:
                            stop.startDate || "",

                        time:
                            "",

                        cost:
                            0

                    };

                }


                return {

                    name:
                        activity.name || "",

                    date:
                        activity.date ||
                        stop.startDate ||
                        "",

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
   GET ACTIVITY DATE
========================================================= */

function getActivityDate(activity, stop) {

    if (
        activity &&
        activity.date
    ) {

        return activity.date;

    }


    if (
        stop &&
        stop.startDate
    ) {

        return stop.startDate;

    }


    return "";

}


/* =========================================================
   CHECK WHETHER DATE BELONGS TO STOP
========================================================= */

function isDateInsideStop(
    date,
    stop
) {

    if (
        !date ||
        !stop.startDate ||
        !stop.endDate
    ) {

        return false;

    }


    return (
        date >= stop.startDate &&
        date <= stop.endDate
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

    // SHOW THE ACTUAL SELECTED TRIP
    renderCurrentTripHeader(trip);

    if (
        !trip.stops ||
        !Array.isArray(trip.stops)
    ) {

        trip.stops = [
            {
                id: Date.now(),

                city:
                    trip.destination || "",

                startDate:
                    trip.startDate || "",

                endDate:
                    trip.endDate || "",

                activities: []
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


/* =========================================================
   OLD ITINERARY HEADER
========================================================= */

if (title) {

    title.textContent =
        trip.destination;
}


if (subtitle) {

    const tripDays =
        trip.days ||
        (
            trip.startDate &&
            trip.endDate
                ? calculateDays(
                    trip.startDate,
                    trip.endDate
                )
                : 0
        );

    subtitle.textContent =
        `${formatDate(
            trip.startDate
        )} → ${formatDate(
            trip.endDate
        )} · ${tripDays} days`;

    trip.days = tripDays;
}


/* =========================================================
   CURRENT TRIP CARD
========================================================= */

const currentTripTitle =
    document.getElementById(
        "currentTripTitle"
    );

const currentTripDates =
    document.getElementById(
        "currentTripDates"
    );

const currentTripBudget =
    document.getElementById(
        "currentTripBudget"
    );


/* TRIP NAME */

if (currentTripTitle) {

    currentTripTitle.textContent =
        "✈️ " +
        (
            trip.destination ||
            "My Trip"
        );
}


/* TRIP DATES */

if (currentTripDates) {

    const tripDays =
        trip.days ||
        (
            trip.startDate &&
            trip.endDate
                ? calculateDays(
                    trip.startDate,
                    trip.endDate
                )
                : 0
        );

    currentTripDates.textContent =
        (
            trip.startDate
                ? formatDate(
                    trip.startDate
                )
                : "Start date not set"
        )
        +
        " → "
        +
        (
            trip.endDate
                ? formatDate(
                    trip.endDate
                )
                : "End date not set"
        )
        +
        " · "
        +
        tripDays
        +
        " days";
}


/* TRIP BUDGET */

if (currentTripBudget) {

    currentTripBudget.textContent =
        "₹" +
        Number(
            trip.budget || 0
        ).toLocaleString(
            "en-IN"
        );
}
/* =========================================================
   CURRENT TRIP HEADER
========================================================= */

const currentTripTitle =
    document.getElementById(
        "currentTripTitle"
    );

const currentTripDates =
    document.getElementById(
        "currentTripDates"
    );

const currentTripBudget =
    document.getElementById(
        "currentTripBudget"
    );


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


    /* Default to list view */
    setItineraryView("list");

}


/* =========================================================
   RENDER STOPS
========================================================= */

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


                    <!-- TRANSPORT COST -->

                    <div class="input-group">

                        <label>
                            Transport Cost (₹)
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value="${Number(
                                stop.transportCost || 0
                            )}"
                            onchange="updateStopCost(
                                ${stop.id},
                                'transportCost',
                                this.value
                            )"
                            placeholder="e.g. 2000"
                        >

                    </div>


                    <!-- STAY COST -->

                    <div class="input-group">

                        <label>
                            Stay Cost (₹)
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value="${Number(
                                stop.stayCost || 0
                            )}"
                            onchange="updateStopCost(
                                ${stop.id},
                                'stayCost',
                                this.value
                            )"
                            placeholder="e.g. 3000"
                        >

                    </div>


                    <!-- MEAL COST -->

                    <div class="input-group">

                        <label>
                            Meal Cost (₹)
                        </label>

                        <input
                            type="number"
                            min="0"
                            step="1"
                            value="${Number(
                                stop.mealCost || 0
                            )}"
                            onchange="updateStopCost(
                                ${stop.id},
                                'mealCost',
                                this.value
                            )"
                            placeholder="e.g. 1500"
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
                            .filter(
                                activity =>
                                    activity.name &&
                                    activity.name.trim()
                            )
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
                                                    activity.date
                                                        ? "📅 " +
                                                          formatDate(
                                                              activity.date
                                                          )
                                                        : "📅 Date not set"
                                                }

                                                ·

                                                ${
                                                    activity.time
                                                        ? "🕒 " +
                                                          escapeHTML(
                                                              formatTime(
                                                                  activity.time
                                                              )
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
   UPDATE STOP COST
========================================================= */

function updateStopCost(
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


    const allowedFields = [
        "transportCost",
        "stayCost",
        "mealCost"
    ];


    if (
        !allowedFields.includes(field)
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
        Math.max(
            0,
            Number(value) || 0
        );


    saveCurrentTrip(trip);

    renderStops(
        trip.stops
    );

    renderCalendarView(
        trip
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

                const activityDate =
                    getActivityDate(
                        activity,
                        stop
                    );


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


                            <!-- DATE -->

                            <div class="activity-form-group">

                                <label>
                                    Date
                                </label>

                                <input
                                    type="date"
                                    value="${escapeAttribute(
                                        activityDate
                                    )}"
                                    min="${escapeAttribute(
                                        stop.startDate || ""
                                    )}"
                                    max="${escapeAttribute(
                                        stop.endDate || ""
                                    )}"
                                    onchange="updateActivity(
                                        ${stop.id},
                                        ${index},
                                        'date',
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

        date:
            stop.startDate || "",

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
        "Activity added. Enter its date, name, time and cost."
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

    else if (field === "date") {

        if (
            value &&
            stop.startDate &&
            value < stop.startDate
        ) {

            showToast(
                "Activity date cannot be before the stop start date."
            );

            return;

        }


        if (
            value &&
            stop.endDate &&
            value > stop.endDate
        ) {

            showToast(
                "Activity date cannot be after the stop end date."
            );

            return;

        }


        activity.date =
            value;

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


    if (
        field === "endDate" &&
        stop.startDate &&
        value &&
        value < stop.startDate
    ) {

        showToast(
            "End date cannot be before start date."
        );

        renderStops(
            trip.stops
        );

        return;

    }


    if (
        field === "startDate" &&
        stop.endDate &&
        value &&
        value > stop.endDate
    ) {

        showToast(
            "Start date cannot be after end date."
        );

        renderStops(
            trip.stops
        );

        return;

    }


    stop[field] =
        value;


    /*
       Keep activities inside the stop date range.
       If the stop start date changes, activities
       without a valid date are moved to the new
       start date.
    */

    normalizeActivities(stop);


    stop.activities.forEach(
        function(activity) {

            if (
                !activity.date ||
                !isDateInsideStop(
                    activity.date,
                    stop
                )
            ) {

                activity.date =
                    stop.startDate || "";

            }

        }
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

}


/* =========================================================
   ADD STOP
========================================================= */

/* =========================================================
   ADD STOP
========================================================= */

function addStop() {

    console.log("ADD STOP BUTTON CLICKED");

    const trip = getSelectedTrip();

    console.log("Selected trip:", trip);

    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        console.error(
            "No selected trip found."
        );

        return;
    }

    if (!Array.isArray(trip.stops)) {
        trip.stops = [];
    }

    const lastStop =
        trip.stops.length > 0
            ? trip.stops[trip.stops.length - 1]
            : null;

    const newStop = {

        id: Date.now(),

        city: "",

        startDate:
            lastStop &&
            lastStop.endDate
                ? lastStop.endDate
                : trip.startDate || "",

        endDate: "",

        transportCost: 0,

        stayCost: 0,

        mealCost: 0,

        activities: []
    };

    trip.stops.push(newStop);

    console.log(
        "New stop added:",
        newStop
    );

    saveCurrentTrip(trip);

    renderStops(trip.stops);

    renderCalendarView(trip);

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

                    const year =
                        date.getFullYear();


                    const month =
                        String(
                            date.getMonth() + 1
                        ).padStart(2, "0");


                    const day =
                        String(
                            date.getDate()
                        ).padStart(2, "0");


                    const dateString =
                        `${year}-${month}-${day}`;


                    const dayActivities =
                        stop.activities
                            .filter(
                                function(activity) {

                                    const activityDate =
                                        getActivityDate(
                                            activity,
                                            stop
                                        );


                                    return (
                                        activityDate ===
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
                                            .sort(
                                                function(a, b) {

                                                    return (
                                                        (a.time || "")
                                                            .localeCompare(
                                                                b.time || ""
                                                            )
                                                    );

                                                }
                                            )
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
                activity.name.trim()
            ) {

                if (
                    Number(activity.cost) < 0
                ) {

                    showToast(
                        "Activity cost cannot be negative."
                    );

                    return;

                }


                if (
                    activity.date &&
                    !isDateInsideStop(
                        activity.date,
                        stop
                    )
                ) {

                    showToast(
                        "Activity date must be within the stop dates for " +
                        stop.city
                    );

                    return;

                }

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
            ?
            interests.toLowerCase()
            :
            "";


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

/* =========================================================
   GLOBETROTTER
   CITY SEARCH + ACTIVITY SEARCH
========================================================= */


/* =========================================================
   CITY DATABASE
========================================================= */

const globeTrotterCities = [

    {
        city: "Paris",
        country: "France",
        region: "Europe",
        costIndex: 4,
        popularity: 98
    },

    {
        city: "London",
        country: "United Kingdom",
        region: "Europe",
        costIndex: 5,
        popularity: 97
    },

    {
        city: "Rome",
        country: "Italy",
        region: "Europe",
        costIndex: 4,
        popularity: 96
    },

    {
        city: "Barcelona",
        country: "Spain",
        region: "Europe",
        costIndex: 4,
        popularity: 95
    },

    {
        city: "Amsterdam",
        country: "Netherlands",
        region: "Europe",
        costIndex: 5,
        popularity: 94
    },

    {
        city: "Zurich",
        country: "Switzerland",
        region: "Europe",
        costIndex: 5,
        popularity: 90
    },

    {
        city: "Vienna",
        country: "Austria",
        region: "Europe",
        costIndex: 4,
        popularity: 91
    },

    {
        city: "Prague",
        country: "Czech Republic",
        region: "Europe",
        costIndex: 3,
        popularity: 92
    },

    {
        city: "Istanbul",
        country: "Turkey",
        region: "Europe",
        costIndex: 2,
        popularity: 93
    },

    {
        city: "Dubai",
        country: "United Arab Emirates",
        region: "Middle East",
        costIndex: 5,
        popularity: 97
    },

    {
        city: "Abu Dhabi",
        country: "United Arab Emirates",
        region: "Middle East",
        costIndex: 5,
        popularity: 88
    },

    {
        city: "Doha",
        country: "Qatar",
        region: "Middle East",
        costIndex: 5,
        popularity: 82
    },

    {
        city: "Mumbai",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 95
    },

    {
        city: "Delhi",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 94
    },

    {
        city: "Pune",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 88
    },

    {
        city: "Bengaluru",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 90
    },

    {
        city: "Goa",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 96
    },

    {
        city: "Jaipur",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 93
    },

    {
        city: "Agra",
        country: "India",
        region: "Asia",
        costIndex: 2,
        popularity: 91
    },

    {
        city: "Tokyo",
        country: "Japan",
        region: "Asia",
        costIndex: 4,
        popularity: 98
    },

    {
        city: "Kyoto",
        country: "Japan",
        region: "Asia",
        costIndex: 4,
        popularity: 96
    },

    {
        city: "Osaka",
        country: "Japan",
        region: "Asia",
        costIndex: 4,
        popularity: 94
    },

    {
        city: "Seoul",
        country: "South Korea",
        region: "Asia",
        costIndex: 4,
        popularity: 95
    },

    {
        city: "Singapore",
        country: "Singapore",
        region: "Asia",
        costIndex: 5,
        popularity: 96
    },

    {
        city: "Bangkok",
        country: "Thailand",
        region: "Asia",
        costIndex: 2,
        popularity: 97
    },

    {
        city: "Bali",
        country: "Indonesia",
        region: "Asia",
        costIndex: 2,
        popularity: 96
    },

    {
        city: "Hong Kong",
        country: "Hong Kong",
        region: "Asia",
        costIndex: 5,
        popularity: 91
    },

    {
        city: "Sydney",
        country: "Australia",
        region: "Oceania",
        costIndex: 5,
        popularity: 96
    },

    {
        city: "Melbourne",
        country: "Australia",
        region: "Oceania",
        costIndex: 5,
        popularity: 94
    },

    {
        city: "Auckland",
        country: "New Zealand",
        region: "Oceania",
        costIndex: 4,
        popularity: 88
    },

    {
        city: "New York",
        country: "United States",
        region: "North America",
        costIndex: 5,
        popularity: 99
    },

    {
        city: "Los Angeles",
        country: "United States",
        region: "North America",
        costIndex: 5,
        popularity: 96
    },

    {
        city: "San Francisco",
        country: "United States",
        region: "North America",
        costIndex: 5,
        popularity: 94
    },

    {
        city: "Las Vegas",
        country: "United States",
        region: "North America",
        costIndex: 5,
        popularity: 95
    },

    {
        city: "Toronto",
        country: "Canada",
        region: "North America",
        costIndex: 4,
        popularity: 91
    },

    {
        city: "Vancouver",
        country: "Canada",
        region: "North America",
        costIndex: 4,
        popularity: 90
    },

    {
        city: "Mexico City",
        country: "Mexico",
        region: "North America",
        costIndex: 2,
        popularity: 89
    },

    {
        city: "Rio de Janeiro",
        country: "Brazil",
        region: "South America",
        costIndex: 2,
        popularity: 94
    },

    {
        city: "Buenos Aires",
        country: "Argentina",
        region: "South America",
        costIndex: 2,
        popularity: 89
    },

    {
        city: "Cape Town",
        country: "South Africa",
        region: "Africa",
        costIndex: 2,
        popularity: 93
    },

    {
        city: "Cairo",
        country: "Egypt",
        region: "Africa",
        costIndex: 2,
        popularity: 94
    },

    {
        city: "Marrakech",
        country: "Morocco",
        region: "Africa",
        costIndex: 2,
        popularity: 91
    }

];


/* =========================================================
   ACTIVITY DATABASE
========================================================= */

const globeTrotterActivities = [

    {
        id: 1,
        name: "City Sightseeing Tour",
        type: "Sightseeing",
        cost: "Medium",
        costValue: 1500,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 95,
        description:
            "Explore the city's most famous landmarks with a guided sightseeing experience.",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 2,
        name: "Museum Visit",
        type: "Culture",
        cost: "Low",
        costValue: 800,
        duration: "1-2 hours",
        durationValue: 2,
        popularity: 89,
        description:
            "Discover local history, art and culture through a visit to a popular museum.",
        image:
            "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 3,
        name: "Local Food Tour",
        type: "Food",
        cost: "Medium",
        costValue: 2000,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 97,
        description:
            "Taste authentic local dishes while discovering the city's food culture.",
        image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 4,
        name: "Street Food Experience",
        type: "Food",
        cost: "Low",
        costValue: 700,
        duration: "1-2 hours",
        durationValue: 2,
        popularity: 92,
        description:
            "Try delicious street food and discover popular local food markets.",
        image:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 5,
        name: "Beach Day",
        type: "Adventure",
        cost: "Low",
        costValue: 500,
        duration: "Half day",
        durationValue: 5,
        popularity: 96,
        description:
            "Relax by the beach, enjoy the scenery and spend a peaceful day near the sea.",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 6,
        name: "Hiking Adventure",
        type: "Adventure",
        cost: "Medium",
        costValue: 1200,
        duration: "Half day",
        durationValue: 5,
        popularity: 91,
        description:
            "Enjoy a scenic hiking route and experience the natural beauty around the destination.",
        image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 7,
        name: "Mountain Trek",
        type: "Adventure",
        cost: "High",
        costValue: 3500,
        duration: "Full day",
        durationValue: 8,
        popularity: 88,
        description:
            "Take a full-day trek through scenic mountain landscapes.",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 8,
        name: "Shopping Experience",
        type: "Shopping",
        cost: "Medium",
        costValue: 2000,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 90,
        description:
            "Explore popular markets, malls and local shopping streets.",
        image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 9,
        name: "Sunset Cruise",
        type: "Adventure",
        cost: "High",
        costValue: 4000,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 94,
        description:
            "Enjoy a relaxing cruise while watching the sunset over the city or coastline.",
        image:
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 10,
        name: "Temple Visit",
        type: "Culture",
        cost: "Low",
        costValue: 300,
        duration: "1-2 hours",
        durationValue: 2,
        popularity: 87,
        description:
            "Visit an important local temple and learn about its history and traditions.",
        image:
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 11,
        name: "Photography Walk",
        type: "Sightseeing",
        cost: "Low",
        costValue: 0,
        duration: "1-2 hours",
        durationValue: 2,
        popularity: 86,
        description:
            "Walk through beautiful areas of the destination and capture memorable photographs.",
        image:
            "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 12,
        name: "Nightlife Experience",
        type: "Entertainment",
        cost: "High",
        costValue: 3000,
        duration: "3-5 hours",
        durationValue: 5,
        popularity: 93,
        description:
            "Experience the city's nightlife, entertainment districts and evening atmosphere.",
        image:
            "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 13,
        name: "Cooking Class",
        type: "Food",
        cost: "Medium",
        costValue: 2500,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 85,
        description:
            "Learn how to prepare traditional dishes with a local cooking instructor.",
        image:
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 14,
        name: "Wildlife Safari",
        type: "Adventure",
        cost: "High",
        costValue: 5000,
        duration: "Full day",
        durationValue: 8,
        popularity: 90,
        description:
            "Explore wildlife habitats and experience animals in their natural environment.",
        image:
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 15,
        name: "Historical Walking Tour",
        type: "Culture",
        cost: "Low",
        costValue: 600,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 88,
        description:
            "Walk through historic areas while learning about important events and landmarks.",
        image:
            "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 16,
        name: "Spa & Wellness",
        type: "Relaxation",
        cost: "High",
        costValue: 3500,
        duration: "2-3 hours",
        durationValue: 3,
        popularity: 84,
        description:
            "Relax and recharge with a spa and wellness experience.",
        image:
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80"
    }

];


/* =========================================================
   CITY SEARCH STATE
========================================================= */

let citySearchState = {

    search: "",

    country: "",

    region: ""

};


/* =========================================================
   ACTIVITY SEARCH STATE
========================================================= */

let activitySearchState = {

    search: "",

    type: "",

    cost: "",

    duration: "",

    stopId: null

};


/* =========================================================
   COST INDEX DISPLAY
========================================================= */

function getCostIndexHTML(index) {

    const safeIndex =
        Math.max(
            1,
            Math.min(
                5,
                Number(index) || 1
            )
        );

    let html = "";

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        html +=
            i <= safeIndex
                ? "₹"
                : "·";

    }

    return html;

}


/* =========================================================
   CITY FILTER OPTIONS
========================================================= */

function getCityCountries() {

    return [
        ...new Set(
            globeTrotterCities.map(
                city => city.country
            )
        )
    ].sort();

}


function getCityRegions() {

    return [
        ...new Set(
            globeTrotterCities.map(
                city => city.region
            )
        )
    ].sort();

}


/* =========================================================
   CITY SEARCH
========================================================= */

function searchCities() {

    const search =
        citySearchState.search
            .toLowerCase()
            .trim();

    const country =
        citySearchState.country;

    const region =
        citySearchState.region;

    return globeTrotterCities
        .filter(
            city => {

                const matchesSearch =
                    !search ||

                    city.city
                        .toLowerCase()
                        .includes(search) ||

                    city.country
                        .toLowerCase()
                        .includes(search);

                const matchesCountry =
                    !country ||
                    city.country === country;

                const matchesRegion =
                    !region ||
                    city.region === region;

                return (
                    matchesSearch &&
                    matchesCountry &&
                    matchesRegion
                );

            }
        )
        .sort(
            (a, b) =>
                b.popularity -
                a.popularity
        );

}


/* =========================================================
   OPEN CITY SEARCH
========================================================= */

function openCitySearch() {

    createSearchOverlay();

    const overlay =
        document.getElementById(
            "globeCitySearchOverlay"
        );

    if (!overlay) {
        return;
    }

    overlay.style.display =
        "flex";

    citySearchState.search =
        "";

    citySearchState.country =
        "";

    citySearchState.region =
        "";

    renderCitySearch();

}


/* =========================================================
   CLOSE CITY SEARCH
========================================================= */

function closeCitySearch() {

    const overlay =
        document.getElementById(
            "globeCitySearchOverlay"
        );

    if (overlay) {

        overlay.style.display =
            "none";

    }

}


/* =========================================================
   RENDER CITY SEARCH
========================================================= */

function renderCitySearch() {

    const content =
        document.getElementById(
            "globeCitySearchContent"
        );

    if (!content) {
        return;
    }

    const countries =
        getCityCountries();

    const regions =
        getCityRegions();

    const cities =
        searchCities();

    content.innerHTML = `

        <div class="globe-search-header">

            <div>

                <h2>
                    🔎 Search Cities
                </h2>

                <p>
                    Find cities and add them directly to your trip.
                </p>

            </div>

            <button
                type="button"
                class="globe-search-close"
                onclick="closeCitySearch()"
            >
                ✕
            </button>

        </div>


        <div class="globe-search-filters">

            <input
                type="text"
                id="citySearchInput"
                placeholder="Search city or country..."
                value="${escapeAttribute(
                    citySearchState.search
                )}"
            >


            <select id="cityCountryFilter">

                <option value="">
                    All Countries
                </option>

                ${
                    countries
                        .map(
                            country => `
                                <option
                                    value="${escapeAttribute(
                                        country
                                    )}"
                                    ${
                                        citySearchState.country ===
                                        country
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${escapeHTML(country)}
                                </option>
                            `
                        )
                        .join("")
                }

            </select>


            <select id="cityRegionFilter">

                <option value="">
                    All Regions
                </option>

                ${
                    regions
                        .map(
                            region => `
                                <option
                                    value="${escapeAttribute(
                                        region
                                    )}"
                                    ${
                                        citySearchState.region ===
                                        region
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${escapeHTML(region)}
                                </option>
                            `
                        )
                        .join("")
                }

            </select>

        </div>


        <div class="globe-search-count">

            ${cities.length}
            ${
                cities.length === 1
                    ? "city"
                    : "cities"
            }
            found

        </div>


        <div class="globe-city-results">

            ${
                cities.length

                    ?

                    cities
                        .map(
                            city => `

                                <div class="globe-city-card">

                                    <div class="globe-city-icon">
                                        📍
                                    </div>


                                    <div class="globe-city-info">

                                        <h3>
                                            ${escapeHTML(
                                                city.city
                                            )}
                                        </h3>

                                        <p>
                                            ${escapeHTML(
                                                city.country
                                            )}
                                            ·
                                            ${escapeHTML(
                                                city.region
                                            )}
                                        </p>


                                        <div class="globe-city-meta">

                                            <span>
                                                Cost:
                                                <strong>
                                                    ${getCostIndexHTML(
                                                        city.costIndex
                                                    )}
                                                </strong>
                                            </span>

                                            <span>
                                                ⭐
                                                ${city.popularity}%
                                                popularity
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        class="globe-add-city-btn"
                                        onclick="addCityToTrip(
                                            '${escapeAttribute(
                                                city.city
                                            )}',
                                            '${escapeAttribute(
                                                city.country
                                            )}'
                                        )"
                                    >
                                        + Add to Trip
                                    </button>

                                </div>

                            `
                        )
                        .join("")

                    :

                    `

                        <div class="globe-empty-search">

                            <div>
                                🔎
                            </div>

                            <h3>
                                No cities found
                            </h3>

                            <p>
                                Try another city, country or region.
                            </p>

                        </div>

                    `

            }

        </div>

    `;


    const searchInput =
        document.getElementById(
            "citySearchInput"
        );

    const countryFilter =
        document.getElementById(
            "cityCountryFilter"
        );

    const regionFilter =
        document.getElementById(
            "cityRegionFilter"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function() {

                citySearchState.search =
                    this.value;

                renderCitySearch();

                const input =
                    document.getElementById(
                        "citySearchInput"
                    );

                if (input) {

                    input.focus();

                    input.setSelectionRange(
                        input.value.length,
                        input.value.length
                    );

                }

            }
        );

    }


    if (countryFilter) {

        countryFilter.addEventListener(
            "change",
            function() {

                citySearchState.country =
                    this.value;

                renderCitySearch();

            }
        );

    }


    if (regionFilter) {

        regionFilter.addEventListener(
            "change",
            function() {

                citySearchState.region =
                    this.value;

                renderCitySearch();

            }
        );

    }

}


/* =========================================================
   ADD CITY TO CURRENT TRIP
========================================================= */

function addCityToTrip(
    cityName,
    country
) {

    const trip =
        getSelectedTrip();

    if (!trip) {

        showToast(
            "Please create or select a trip first."
        );

        return;

    }


    if (!trip.stops) {

        trip.stops = [];

    }


    const duplicate =
        trip.stops.some(
            stop =>
                String(
                    stop.city || ""
                )
                    .trim()
                    .toLowerCase() ===
                String(cityName)
                    .trim()
                    .toLowerCase()
        );


    if (duplicate) {

        showToast(
            cityName +
            " is already in your trip."
        );

        return;

    }


    const lastStop =
        trip.stops[
            trip.stops.length - 1
        ];


    const newStop = {

        id:
            Date.now(),

        city:
            cityName,

        country:
            country,

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


    closeCitySearch();


    showToast(
        cityName +
        " added to your trip."
    );

}


/* =========================================================
   ACTIVITY SEARCH
========================================================= */

function searchActivities() {

    const search =
        activitySearchState.search
            .toLowerCase()
            .trim();

    const type =
        activitySearchState.type;

    const cost =
        activitySearchState.cost;

    const duration =
        activitySearchState.duration;


    return globeTrotterActivities
        .filter(
            activity => {

                const matchesSearch =
                    !search ||

                    activity.name
                        .toLowerCase()
                        .includes(search) ||

                    activity.description
                        .toLowerCase()
                        .includes(search);


                const matchesType =
                    !type ||
                    activity.type === type;


                const matchesCost =
                    !cost ||
                    activity.cost === cost;


                let matchesDuration =
                    true;


                if (duration === "short") {

                    matchesDuration =
                        activity.durationValue <= 2;

                }

                else if (
                    duration === "medium"
                ) {

                    matchesDuration =
                        activity.durationValue >= 3 &&
                        activity.durationValue <= 5;

                }

                else if (
                    duration === "long"
                ) {

                    matchesDuration =
                        activity.durationValue >= 6;

                }


                return (

                    matchesSearch &&
                    matchesType &&
                    matchesCost &&
                    matchesDuration

                );

            }
        )
        .sort(
            (a, b) =>
                b.popularity -
                a.popularity
        );

}


/* =========================================================
   OPEN ACTIVITY SEARCH
========================================================= */

function openActivitySearch(stopId) {

    const trip =
        getSelectedTrip();

    if (!trip) {

        showToast(
            "Please select a trip first."
        );

        return;

    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(stopId)
        );


    if (!stop) {

        showToast(
            "Stop could not be found."
        );

        return;

    }


    activitySearchState.search =
        "";

    activitySearchState.type =
        "";

    activitySearchState.cost =
        "";

    activitySearchState.duration =
        "";

    activitySearchState.stopId =
        Number(stopId);


    createSearchOverlay();


    const overlay =
        document.getElementById(
            "globeActivitySearchOverlay"
        );


    if (overlay) {

        overlay.style.display =
            "flex";

    }


    renderActivitySearch();

}


/* =========================================================
   CLOSE ACTIVITY SEARCH
========================================================= */

function closeActivitySearch() {

    const overlay =
        document.getElementById(
            "globeActivitySearchOverlay"
        );

    if (overlay) {

        overlay.style.display =
            "none";

    }

}


/* =========================================================
   RENDER ACTIVITY SEARCH
========================================================= */

function renderActivitySearch() {

    const content =
        document.getElementById(
            "globeActivitySearchContent"
        );

    if (!content) {
        return;
    }


    const trip =
        getSelectedTrip();


    if (!trip) {
        return;
    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(
                    activitySearchState.stopId
                )
        );


    if (!stop) {
        return;
    }


    const activities =
        searchActivities();


    const types =
        [
            ...new Set(
                globeTrotterActivities.map(
                    activity =>
                        activity.type
                )
            )
        ].sort();


    content.innerHTML = `

        <div class="globe-search-header">

            <div>

                <h2>
                    🎯 Find Activities
                </h2>

                <p>
                    Add experiences to
                    <strong>
                        ${escapeHTML(
                            stop.city ||
                            "this stop"
                        )}
                    </strong>
                </p>

            </div>


            <button
                type="button"
                class="globe-search-close"
                onclick="closeActivitySearch()"
            >
                ✕
            </button>

        </div>


        <div class="globe-search-filters">

            <input
                type="text"
                id="activitySearchInput"
                placeholder="Search activities..."
                value="${escapeAttribute(
                    activitySearchState.search
                )}"
            >


            <select id="activityTypeFilter">

                <option value="">
                    All Types
                </option>

                ${
                    types
                        .map(
                            type => `

                                <option
                                    value="${escapeAttribute(
                                        type
                                    )}"
                                    ${
                                        activitySearchState.type ===
                                        type
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${escapeHTML(type)}
                                </option>

                            `
                        )
                        .join("")
                }

            </select>


            <select id="activityCostFilter">

                <option value="">
                    All Costs
                </option>

                <option
                    value="Low"
                    ${
                        activitySearchState.cost ===
                        "Low"
                            ? "selected"
                            : ""
                    }
                >
                    Low
                </option>

                <option
                    value="Medium"
                    ${
                        activitySearchState.cost ===
                        "Medium"
                            ? "selected"
                            : ""
                    }
                >
                    Medium
                </option>

                <option
                    value="High"
                    ${
                        activitySearchState.cost ===
                        "High"
                            ? "selected"
                            : ""
                    }
                >
                    High
                </option>

            </select>


            <select id="activityDurationFilter">

                <option value="">
                    All Durations
                </option>

                <option
                    value="short"
                    ${
                        activitySearchState.duration ===
                        "short"
                            ? "selected"
                            : ""
                    }
                >
                    Short
                </option>

                <option
                    value="medium"
                    ${
                        activitySearchState.duration ===
                        "medium"
                            ? "selected"
                            : ""
                    }
                >
                    Medium
                </option>

                <option
                    value="long"
                    ${
                        activitySearchState.duration ===
                        "long"
                            ? "selected"
                            : ""
                    }
                >
                    Long
                </option>

            </select>

        </div>


        <div class="globe-search-count">

            ${activities.length}
            ${
                activities.length === 1
                    ? "activity"
                    : "activities"
            }
            found

        </div>


        <div class="globe-activity-results">

            ${
                activities.length

                    ?

                    activities
                        .map(
                            activity => `

                                <div
                                    class="globe-activity-card"
                                    data-activity-id="${activity.id}"
                                >

                                    <img
                                        src="${escapeAttribute(
                                            activity.image
                                        )}"
                                        alt="${escapeAttribute(
                                            activity.name
                                        )}"
                                        class="globe-activity-image"
                                    >


                                    <div class="globe-activity-content">

                                        <div class="globe-activity-top">

                                            <span class="globe-activity-type">

                                                ${escapeHTML(
                                                    activity.type
                                                )}

                                            </span>

                                            <span class="globe-activity-popularity">

                                                ⭐
                                                ${activity.popularity}%

                                            </span>

                                        </div>


                                        <h3>
                                            ${escapeHTML(
                                                activity.name
                                            )}
                                        </h3>


                                        <p class="globe-activity-description">

                                            ${escapeHTML(
                                                activity.description
                                            )}

                                        </p>


                                        <div class="globe-activity-meta">

                                            <span>
                                                💰
                                                ${escapeHTML(
                                                    activity.cost
                                                )}
                                            </span>

                                            <span>
                                                ⏱
                                                ${escapeHTML(
                                                    activity.duration
                                                )}
                                            </span>

                                            <span>
                                                ₹${Number(
                                                    activity.costValue
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>


                                        <div class="globe-activity-actions">

                                            <button
                                                type="button"
                                                onclick="addActivityFromSearch(
                                                    ${activity.id}
                                                )"
                                            >
                                                + Add to Stop
                                            </button>

                                            <button
                                                type="button"
                                                class="globe-view-activity-btn"
                                                onclick="viewActivityDetails(
                                                    ${activity.id}
                                                )"
                                            >
                                                Quick View
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            `
                        )
                        .join("")

                    :

                    `

                        <div class="globe-empty-search">

                            <div>
                                🔎
                            </div>

                            <h3>
                                No activities found
                            </h3>

                            <p>
                                Try changing your filters.
                            </p>

                        </div>

                    `

            }

        </div>

    `;


    const searchInput =
        document.getElementById(
            "activitySearchInput"
        );


    const typeFilter =
        document.getElementById(
            "activityTypeFilter"
        );


    const costFilter =
        document.getElementById(
            "activityCostFilter"
        );


    const durationFilter =
        document.getElementById(
            "activityDurationFilter"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function() {

                activitySearchState.search =
                    this.value;

                renderActivitySearch();

                const input =
                    document.getElementById(
                        "activitySearchInput"
                    );

                if (input) {

                    input.focus();

                    input.setSelectionRange(
                        input.value.length,
                        input.value.length
                    );

                }

            }
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            function() {

                activitySearchState.type =
                    this.value;

                renderActivitySearch();

            }
        );

    }


    if (costFilter) {

        costFilter.addEventListener(
            "change",
            function() {

                activitySearchState.cost =
                    this.value;

                renderActivitySearch();

            }
        );

    }


    if (durationFilter) {

        durationFilter.addEventListener(
            "change",
            function() {

                activitySearchState.duration =
                    this.value;

                renderActivitySearch();

            }
        );

    }

}


/* =========================================================
   ADD ACTIVITY FROM SEARCH
========================================================= */

function addActivityFromSearch(
    activityId
) {

    const trip =
        getSelectedTrip();


    if (!trip) {

        showToast(
            "Trip could not be found."
        );

        return;

    }


    const stop =
        trip.stops.find(
            item =>
                Number(item.id) ===
                Number(
                    activitySearchState.stopId
                )
        );


    if (!stop) {

        showToast(
            "Stop could not be found."
        );

        return;

    }


    const activity =
        globeTrotterActivities.find(
            item =>
                Number(item.id) ===
                Number(activityId)
        );


    if (!activity) {

        showToast(
            "Activity could not be found."
        );

        return;

    }


    normalizeActivities(
        stop
    );


    const alreadyAdded =
        stop.activities.some(
            item =>
                String(
                    item.name || ""
                )
                    .trim()
                    .toLowerCase() ===
                activity.name
                    .trim()
                    .toLowerCase()
        );


    if (alreadyAdded) {

        showToast(
            activity.name +
            " is already added to this stop."
        );

        return;

    }


    stop.activities.push({

        name:
            activity.name,

        time:
            "",

        cost:
            activity.costValue,

        date:
            stop.startDate || "",

        type:
            activity.type,

        duration:
            activity.duration,

        description:
            activity.description,

        image:
            activity.image

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


    closeActivitySearch();


    showToast(
        activity.name +
        " added successfully."
    );

}


/* =========================================================
   ACTIVITY QUICK VIEW
========================================================= */

function viewActivityDetails(
    activityId
) {

    const activity =
        globeTrotterActivities.find(
            item =>
                Number(item.id) ===
                Number(activityId)
        );


    if (!activity) {
        return;
    }


    createActivityDetailsModal();


    const modal =
        document.getElementById(
            "globeActivityDetailsModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "flex";


    modal.innerHTML = `

        <div class="globe-details-box">

            <button
                type="button"
                class="globe-details-close"
                onclick="closeActivityDetails()"
            >
                ✕
            </button>


            <img
                src="${escapeAttribute(
                    activity.image
                )}"
                alt="${escapeAttribute(
                    activity.name
                )}"
                class="globe-details-image"
            >


            <div class="globe-details-body">

                <span class="globe-activity-type">
                    ${escapeHTML(
                        activity.type
                    )}
                </span>


                <h2>
                    ${escapeHTML(
                        activity.name
                    )}
                </h2>


                <p>
                    ${escapeHTML(
                        activity.description
                    )}
                </p>


                <div class="globe-details-meta">

                    <div>
                        <strong>
                            💰 Cost
                        </strong>

                        <span>
                            ₹${Number(
                                activity.costValue
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>


                    <div>
                        <strong>
                            ⏱ Duration
                        </strong>

                        <span>
                            ${escapeHTML(
                                activity.duration
                            )}
                        </span>
                    </div>


                    <div>
                        <strong>
                            ⭐ Popularity
                        </strong>

                        <span>
                            ${activity.popularity}%
                        </span>
                    </div>

                </div>


                <button
                    type="button"
                    class="globe-details-add-btn"
                    onclick="addActivityFromSearch(
                        ${activity.id}
                    ); closeActivityDetails();"
                >
                    + Add to Stop
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   CLOSE ACTIVITY DETAILS
========================================================= */

function closeActivityDetails() {

    const modal =
        document.getElementById(
            "globeActivityDetailsModal"
        );

    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =========================================================
   CREATE SEARCH OVERLAYS
========================================================= */

function createSearchOverlay() {

    if (
        !document.getElementById(
            "globeCitySearchOverlay"
        )
    ) {

        const cityOverlay =
            document.createElement(
                "div"
            );


        cityOverlay.id =
            "globeCitySearchOverlay";


        cityOverlay.className =
            "globe-search-overlay";


        cityOverlay.style.display =
            "none";


        cityOverlay.innerHTML = `

            <div
                class="globe-search-modal"
                onclick="event.stopPropagation()"
            >

                <div
                    id="globeCitySearchContent"
                ></div>

            </div>

        `;


        cityOverlay.addEventListener(
            "click",
            function(event) {

                if (
                    event.target ===
                    cityOverlay
                ) {

                    closeCitySearch();

                }

            }
        );


        document.body.appendChild(
            cityOverlay
        );

    }


    if (
        !document.getElementById(
            "globeActivitySearchOverlay"
        )
    ) {

        const activityOverlay =
            document.createElement(
                "div"
            );


        activityOverlay.id =
            "globeActivitySearchOverlay";


        activityOverlay.className =
            "globe-search-overlay";


        activityOverlay.style.display =
            "none";


        activityOverlay.innerHTML = `

            <div
                class="globe-search-modal"
                onclick="event.stopPropagation()"
            >

                <div
                    id="globeActivitySearchContent"
                ></div>

            </div>

        `;


        activityOverlay.addEventListener(
            "click",
            function(event) {

                if (
                    event.target ===
                    activityOverlay
                ) {

                    closeActivitySearch();

                }

            }
        );


        document.body.appendChild(
            activityOverlay
        );

    }

}


/* =========================================================
   CREATE ACTIVITY DETAILS MODAL
========================================================= */

function createActivityDetailsModal() {

    if (
        document.getElementById(
            "globeActivityDetailsModal"
        )
    ) {
        return;
    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "globeActivityDetailsModal";


    modal.className =
        "globe-details-overlay";


    modal.style.display =
        "none";


    document.body.appendChild(
        modal
    );


    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modal
            ) {

                closeActivityDetails();

            }

        }
    );

}


/* =========================================================
   ADD CITY SEARCH BUTTON
   TO ITINERARY PAGE
========================================================= */

function createCitySearchButton() {

    const container =
        document.getElementById(
            "stopsContainer"
        );


    if (!container) {
        return;
    }


    if (
        document.getElementById(
            "globeCitySearchButton"
        )
    ) {
        return;
    }


    const buttonWrapper =
        document.createElement(
            "div"
        );


    buttonWrapper.id =
        "globeCitySearchButtonWrapper";


    buttonWrapper.innerHTML = `

        <button
            type="button"
            id="globeCitySearchButton"
            class="globe-main-search-btn"
            onclick="openCitySearch()"
        >
            🔎 Search & Add Cities
        </button>

    `;


    container.parentNode.insertBefore(
        buttonWrapper,
        container
    );

}


/* =========================================================
   ADD ACTIVITY SEARCH BUTTONS
   TO EACH STOP
========================================================= */

function addActivitySearchButtons() {

    const stops =
        document.querySelectorAll(
            ".itinerary-stop"
        );


    stops.forEach(
        function(stopElement) {

            const stopId =
                stopElement.dataset.id;


            if (!stopId) {
                return;
            }


            if (
                stopElement.querySelector(
                    ".globe-search-activity-btn"
                )
            ) {
                return;
            }


            const activitiesSection =
                stopElement.querySelector(
                    ".activities-section"
                );


            if (!activitiesSection) {
                return;
            }


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "globe-search-activity-btn";


            button.textContent =
                "🔎 Search Activities";


            button.onclick =
                function() {

                    openActivitySearch(
                        Number(stopId)
                    );

                };


            activitiesSection.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   PATCH RENDER STOPS
========================================================= */

const originalRenderStops =
    window.renderStops;


if (
    typeof originalRenderStops ===
    "function"
) {

    window.renderStops =
        function(stops) {

            originalRenderStops(
                stops
            );

            setTimeout(
                function() {

                    createCitySearchButton();

                    addActivitySearchButtons();

                },
                0
            );

        };

}


/* =========================================================
   CITY SEARCH BUTTON ON PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setTimeout(
            function() {

                createSearchOverlay();

                createActivityDetailsModal();

                createCitySearchButton();

                addActivitySearchButtons();

            },
            300
        );

    }
);


/* =========================================================
   ADD SEARCH BUTTON IF ITINERARY
   IS RENDERED LATER
========================================================= */

const globeTrotterObserver =
    new MutationObserver(
        function() {

            createCitySearchButton();

            addActivitySearchButtons();

        }
    );


document.addEventListener(
    "DOMContentLoaded",
    function() {

        const itineraryArea =
            document.getElementById(
                "stopsContainer"
            );


        if (itineraryArea) {

            globeTrotterObserver.observe(
                itineraryArea,
                {
                    childList: true,
                    subtree: true
                }
            );

        }

    }
);


/* =========================================================
   EXTRA CSS
   Automatically inserted by JavaScript
========================================================= */

function addGlobeSearchStyles() {

    if (
        document.getElementById(
            "globeSearchDynamicStyles"
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "globeSearchDynamicStyles";


    style.textContent = `

        /* ================================
           SEARCH BUTTONS
        ================================= */

        #globeCitySearchButtonWrapper {

            margin: 20px 0;

            display: flex;

            justify-content: flex-end;

        }


        .globe-main-search-btn,
        .globe-search-activity-btn {

            border: none;

            border-radius: 10px;

            padding: 12px 18px;

            cursor: pointer;

            font-weight: 600;

            transition: 0.2s ease;

        }


        .globe-main-search-btn:hover,
        .globe-search-activity-btn:hover {

            transform: translateY(-1px);

            opacity: 0.9;

        }


        .globe-search-activity-btn {

            margin-top: 15px;

        }


        /* ================================
           SEARCH OVERLAY
        ================================= */

        .globe-search-overlay,
        .globe-details-overlay {

            position: fixed;

            inset: 0;

            z-index: 99999;

            background: rgba(
                0,
                0,
                0,
                0.65
            );

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

        }


        .globe-search-modal {

            width: min(
                1100px,
                100%
            );

            max-height: 90vh;

            overflow-y: auto;

            background: #fff;

            border-radius: 18px;

            padding: 25px;

            box-shadow:
                0 25px 80px
                rgba(
                    0,
                    0,
                    0,
                    0.3
                );

        }


        /* ================================
           SEARCH HEADER
        ================================= */

        .globe-search-header {

            display: flex;

            justify-content: space-between;

            align-items: flex-start;

            gap: 20px;

            margin-bottom: 20px;

        }


        .globe-search-header h2 {

            margin: 0 0 6px;

        }


        .globe-search-header p {

            margin: 0;

            color: #777;

        }


        .globe-search-close,
        .globe-details-close {

            width: 38px;

            height: 38px;

            border: none;

            border-radius: 50%;

            cursor: pointer;

            font-size: 18px;

            flex-shrink: 0;

        }


        /* ================================
           FILTERS
        ================================= */

        .globe-search-filters {

            display: grid;

            grid-template-columns:
                2fr
                1fr
                1fr
                1fr;

            gap: 10px;

            margin-bottom: 15px;

        }


        .globe-search-filters input,
        .globe-search-filters select {

            width: 100%;

            box-sizing: border-box;

            padding: 12px 14px;

            border: 1px solid #ddd;

            border-radius: 10px;

            background: #fff;

            outline: none;

        }


        .globe-search-filters input:focus,
        .globe-search-filters select:focus {

            border-color: #777;

        }


        .globe-search-count {

            color: #777;

            font-size: 14px;

            margin-bottom: 15px;

        }


        /* ================================
           CITY RESULTS
        ================================= */

        .globe-city-results {

            display: grid;

            gap: 12px;

        }


        .globe-city-card {

            display: grid;

            grid-template-columns:
                55px
                1fr
                auto;

            align-items: center;

            gap: 15px;

            padding: 15px;

            border: 1px solid #eee;

            border-radius: 14px;

            background: #fafafa;

        }


        .globe-city-icon {

            width: 50px;

            height: 50px;

            display: flex;

            align-items: center;

            justify-content: center;

            border-radius: 12px;

            background: #eee;

            font-size: 24px;

        }


        .globe-city-info h3 {

            margin: 0 0 4px;

        }


        .globe-city-info p {

            margin: 0 0 8px;

            color: #777;

        }


        .globe-city-meta {

            display: flex;

            gap: 15px;

            flex-wrap: wrap;

            font-size: 13px;

            color: #666;

        }


        .globe-add-city-btn {

            border: none;

            border-radius: 9px;

            padding: 10px 14px;

            cursor: pointer;

            font-weight: 600;

            white-space: nowrap;

        }


        /* ================================
           ACTIVITY RESULTS
        ================================= */

        .globe-activity-results {

            display: grid;

            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(
                        300px,
                        1fr
                    )
                );

            gap: 18px;

        }


        .globe-activity-card {

            overflow: hidden;

            border: 1px solid #eee;

            border-radius: 15px;

            background: #fff;

            box-shadow:
                0 4px 18px
                rgba(
                    0,
                    0,
                    0,
                    0.06
                );

        }


        .globe-activity-image {

            width: 100%;

            height: 190px;

            object-fit: cover;

            display: block;

        }


        .globe-activity-content {

            padding: 16px;

        }


        .globe-activity-top {

            display: flex;

            justify-content: space-between;

            gap: 10px;

            margin-bottom: 8px;

        }


        .globe-activity-type {

            display: inline-block;

            padding: 5px 9px;

            border-radius: 20px;

            background: #f0f0f0;

            font-size: 12px;

            font-weight: 600;

        }


        .globe-activity-popularity {

            font-size: 12px;

            color: #777;

        }


        .globe-activity-content h3 {

            margin: 7px 0;

        }


        .globe-activity-description {

            color: #666;

            line-height: 1.5;

            font-size: 14px;

            min-height: 63px;

        }


        .globe-activity-meta {

            display: flex;

            gap: 12px;

            flex-wrap: wrap;

            font-size: 13px;

            margin: 12px 0;

        }


        .globe-activity-actions {

            display: flex;

            gap: 8px;

        }


        .globe-activity-actions button {

            flex: 1;

            border: none;

            border-radius: 8px;

            padding: 10px;

            cursor: pointer;

            font-weight: 600;

        }


        .globe-view-activity-btn {

            background: #eee;

        }


        /* ================================
           EMPTY STATE
        ================================= */

        .globe-empty-search {

            text-align: center;

            padding: 50px 20px;

            color: #777;

        }


        .globe-empty-search div {

            font-size: 40px;

            margin-bottom: 10px;

        }


        .globe-empty-search h3 {

            color: #333;

            margin: 0 0 5px;

        }


        /* ================================
           ACTIVITY DETAILS
        ================================= */

        .globe-details-box {

            width: min(
                600px,
                100%
            );

            max-height: 90vh;

            overflow-y: auto;

            background: #fff;

            border-radius: 18px;

            overflow: hidden;

            position: relative;

        }


        .globe-details-image {

            width: 100%;

            height: 260px;

            object-fit: cover;

        }


        .globe-details-body {

            padding: 25px;

        }


        .globe-details-body h2 {

            margin: 12px 0;

        }


        .globe-details-body p {

            color: #666;

            line-height: 1.6;

        }


        .globe-details-close {

            position: absolute;

            right: 15px;

            top: 15px;

            z-index: 2;

            background: rgba(
                255,
                255,
                255,
                0.9
            );

        }


        .globe-details-meta {

            display: grid;

            grid-template-columns:
                repeat(
                    3,
                    1fr
                );

            gap: 10px;

            margin: 20px 0;

        }


        .globe-details-meta div {

            padding: 12px;

            border-radius: 10px;

            background: #f7f7f7;

        }


        .globe-details-meta strong {

            display: block;

            font-size: 12px;

            color: #777;

            margin-bottom: 5px;

        }


        .globe-details-meta span {

            font-weight: 600;

        }


        .globe-details-add-btn {

            width: 100%;

            border: none;

            border-radius: 10px;

            padding: 13px;

            cursor: pointer;

            font-weight: 700;

        }


        /* ================================
           MOBILE
        ================================= */

        @media (
            max-width: 750px
        ) {

            .globe-search-filters {

                grid-template-columns:
                    1fr;

            }


            .globe-city-card {

                grid-template-columns:
                    45px
                    1fr;

            }


            .globe-city-icon {

                width: 42px;

                height: 42px;

            }


            .globe-add-city-btn {

                grid-column:
                    1 / -1;

                width: 100%;

            }


            .globe-details-meta {

                grid-template-columns:
                    1fr;

            }


            .globe-search-modal {

                padding: 16px;

            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   INITIALIZE SEARCH STYLES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        addGlobeSearchStyles();

    }
);

/* =========================================================
   TRIP BUDGET & COST
========================================================= */

function calculateTripBudget() {

    if (!currentItinerary) {
        return;
    }

    let transport = 0;
    let stay = 0;
    let activities = 0;
    let meals = 0;

    let stops = currentItinerary.stops || [];

    stops.forEach(stop => {

        if (stop.transportCost) {
            transport += Number(stop.transportCost);
        }

        if (stop.stayCost) {
            stay += Number(stop.stayCost);
        }

        if (stop.mealCost) {
            meals += Number(stop.mealCost);
        }

        if (stop.activities) {

            stop.activities.forEach(activity => {

                if (activity.cost) {
                    activities += Number(activity.cost);
                }

            });

        }

    });

    const totalCost =
        transport +
        stay +
        activities +
        meals;

    const budget =
        Number(currentItinerary.budget) || 0;

    const startDate =
        new Date(currentItinerary.startDate);

    const endDate =
        new Date(currentItinerary.endDate);

    let days = 1;

    if (
        !isNaN(startDate) &&
        !isNaN(endDate)
    ) {

        days =
            Math.ceil(
                (endDate - startDate) /
                (1000 * 60 * 60 * 24)
            ) + 1;

    }

    const averageCost =
        totalCost / days;

    const remaining =
        budget - totalCost;

    document.getElementById("totalBudget").textContent =
        "₹" + budget.toLocaleString("en-IN");

    document.getElementById("estimatedCost").textContent =
        "₹" + totalCost.toLocaleString("en-IN");

    document.getElementById("remainingBudget").textContent =
        "₹" + remaining.toLocaleString("en-IN");

    document.getElementById("averageCost").textContent =
        "₹" + Math.round(averageCost).toLocaleString("en-IN");

    document.getElementById("transportCost").textContent =
        "₹" + transport.toLocaleString("en-IN");

    document.getElementById("stayCost").textContent =
        "₹" + stay.toLocaleString("en-IN");

    document.getElementById("activityCost").textContent =
        "₹" + activities.toLocaleString("en-IN");

    document.getElementById("mealCost").textContent =
        "₹" + meals.toLocaleString("en-IN");


    const alertBox =
        document.getElementById("budgetAlert");

    if (budget === 0) {

        alertBox.textContent =
            "Set a trip budget to track your expenses.";

        alertBox.className =
            "budget-alert warning";

    }
    else if (totalCost > budget) {

        alertBox.textContent =
            "🔴 Trip Budget Exceeded by ₹" +
            (totalCost - budget).toLocaleString("en-IN");

        alertBox.className =
            "budget-alert danger";

    }
    else {

        alertBox.textContent =
            "✓ You are within your trip budget. ₹" +
            remaining.toLocaleString("en-IN") +
            " remaining.";

        alertBox.className =
            "budget-alert safe";

    }

}
function openBudgetScreen() {

    calculateTripBudget();

    const budgetScreen =
        document.getElementById("budgetScreen");

    if (budgetScreen) {

        document
            .querySelectorAll(".screen")
            .forEach(screen => {
                screen.classList.remove("active");
            });

        budgetScreen.classList.add("active");

    }

}

/* =========================================================
   DISPLAY CURRENT TRIP DETAILS
========================================================= */

/* =========================================================
   CURRENT TRIP HEADER
========================================================= */

function renderCurrentTripHeader(trip) {

    if (!trip) {
        console.error("No current trip found.");
        return;
    }

    const title =
        document.getElementById("currentTripTitle");

    const dates =
        document.getElementById("currentTripDates");

    const budget =
        document.getElementById("currentTripBudget");

    const destination =
        trip.destination ||
        (trip.stops &&
            trip.stops.length > 0 &&
            trip.stops[0].city) ||
        "My Trip";

    const startDate =
        trip.startDate ||
        (trip.stops &&
            trip.stops.length > 0 &&
            trip.stops[0].startDate);

    const endDate =
        trip.endDate ||
        (trip.stops &&
            trip.stops.length > 0 &&
            trip.stops[trip.stops.length - 1].endDate);

    let days = Number(trip.days);

    if (
        (!days || days <= 0) &&
        startDate &&
        endDate
    ) {
        days = calculateDays(
            startDate,
            endDate
        );
    }

    if (title) {
        title.textContent =
            "✈️ " + destination;
    }

    if (dates) {

        const formattedStart =
            startDate
                ? formatDate(startDate)
                : "Start date not set";

        const formattedEnd =
            endDate
                ? formatDate(endDate)
                : "End date not set";

        dates.textContent =
            formattedStart +
            " → " +
            formattedEnd +
            " · " +
            (days || 0) +
            " days";
    }

    if (budget) {

        budget.textContent =
            "₹" +
            Number(
                trip.budget || 0
            ).toLocaleString("en-IN");
    }
}
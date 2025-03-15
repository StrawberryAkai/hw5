document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const messageInfo = document.getElementById("message-info");
    const maxLength = 10;
    const errorTimeout = 3000;

    const themeToggle = document.getElementById("toggle-theme");
    const body = document.body;

    let errors = [];

    const validationRules = {
        name: /^[a-zA-Z\s]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };


    const fields = [
        { id: "name", errorId: "name-missing-error", regex: validationRules.name, errorMsg: "name-error" },
        { id: "email", errorId: "email-missing-error", regex: validationRules.email, errorMsg: "email-error" },
        { id: "message", errorId: "message-missing-error", errorMsg: "message-error" }
    ];

    function validateField(field) {
        const input = document.getElementById(field.id);
        const missingError = document.getElementById(field.errorId);
        const error = document.getElementById(field.errorMsg);

        let hasError = false;

        if (input.validity.valueMissing) {
            input.classList.add("error");
            missingError.classList.add("show");
            hasError = true;
        } 

        else if (field.regex && !field.regex.test(input.value)) {
            input.classList.add("error");
            error.classList.add("show");
            hasError = true;
        }

        else {
            input.classList.remove("error");
            missingError.classList.remove("show");
            error.classList.remove("show");
        }


        if (hasError) {
            errors.push({ field: field.id, message: error ? error.textContent : "Invalid input" });

            setTimeout(() => {
                missingError.classList.remove("show");
                error.classList.remove("show");
            }, errorTimeout);
        }

        return !hasError;
    }

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.addEventListener("input", function () {
            validateField(field);
        });
    });

    message.addEventListener("input", function () {
        const remaining = maxLength - message.value.length;
        messageInfo.textContent = `${remaining} characters remaining`;

        if (remaining < 0) {
            message.classList.add("error");
        } else {
            message.classList.remove("error");
        }
    });


    form.addEventListener("submit", function (event) {
        let valid = true;

        fields.forEach(field => {
            if (!validateField(field)) valid = false;
        });

        if (!valid) event.preventDefault();
    });

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save user preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 Dark Mode";
        }
    });
});


/* =====================================
   ADMIN LOGIN JAVASCRIPT
===================================== */


/* =====================================
   GET FORM
===================================== */

const adminLoginForm =

document.getElementById(
    "adminLoginForm"
);


/* =====================================
   LOGIN FORM SUBMIT
===================================== */

adminLoginForm.addEventListener(

    "submit",

    function(event) {

        event.preventDefault();


        const username =

        document.getElementById(
            "adminUsername"
        ).value.trim();


        const password =

        document.getElementById(
            "adminPassword"
        ).value.trim();


        const loginMessage =

        document.getElementById(
            "loginMessage"
        );


        /* =================================
           ADMIN USERNAME AND PASSWORD
        ================================= */

        if (

            username === "admin"

            &&

            password === "12345"

        ) {

            /* LOGIN SAVE */

            localStorage.setItem(

                "adminLoggedIn",

                "true"

            );


            /* SUCCESS MESSAGE */

            loginMessage.style.color =

            "#247331";


            loginMessage.textContent =

            "लॉगिन सफल हो रहा है...";


            /* DASHBOARD OPEN */

            setTimeout(

                function() {

                    window.location.href =

                    "admin-dashboard.html";

                },

                500

            );

        }

        else {

            /* ERROR MESSAGE */

            loginMessage.style.color =

            "#d32f2f";


            loginMessage.textContent =

            "यूज़रनेम या पासवर्ड गलत है।";

        }

    }

);

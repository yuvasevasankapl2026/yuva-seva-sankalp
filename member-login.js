/* =====================================
   MEMBER LOGIN JAVASCRIPT
===================================== */

document.addEventListener(
    "DOMContentLoaded",

    function () {


        const loginForm =

        document.getElementById(
            "memberLoginForm"
        );


        const message =

        document.getElementById(
            "memberLoginMessage"
        );


        if (!loginForm) {

            return;

        }


        loginForm.addEventListener(

            "submit",

            function (event) {


                event.preventDefault();


                const memberId =

                document
                .getElementById(
                    "memberId"
                )
                .value
                .trim()
                .toUpperCase();


                const password =

                document
                .getElementById(
                    "memberPassword"
                )
                .value
                .trim();


                let members = [];


                try {

                    members = JSON.parse(

                        localStorage.getItem(
                            "members"
                        )

                    ) || [];

                }

                catch (error) {

                    members = [];

                }


                const foundMember =

                members.find(

                    function (member) {


                        return (

                            String(

                                member.memberId
                                || ""

                            )

                            .trim()

                            .toUpperCase()

                            ===

                            memberId

                            &&

                            String(

                                member.mobile
                                || ""

                            )

                            .trim()

                            ===

                            password

                        );

                    }

                );


                if (foundMember) {


                    localStorage.setItem(

                        "memberLoggedIn",

                        "true"

                    );


                    localStorage.setItem(

                        "loggedInMember",

                        JSON.stringify(
                            foundMember
                        )

                    );


                    message.textContent =

                    "✅ लॉगिन सफल हुआ।";


                    message.style.color =

                    "green";


                    setTimeout(

                        function () {


                            window.location.href =

                            "member-dashboard.html";


                        },

                        500

                    );


                }

                else {


                    message.textContent =

                    "❌ Member ID या मोबाइल नंबर गलत है।";


                    message.style.color =

                    "red";


                }


            }

        );


    }

);

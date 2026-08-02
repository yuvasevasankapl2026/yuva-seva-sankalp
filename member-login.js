/* =====================================
   MEMBER LOGIN JAVASCRIPT
===================================== */

document.addEventListener(
    "DOMContentLoaded",

    function () {


        /* =====================================
           HTML ELEMENTS
        ===================================== */

        const loginForm =

        document.getElementById(
            "memberLoginForm"
        );


        const message =

        document.getElementById(
            "memberLoginMessage"
        );


        /* =====================================
           FORM CHECK
        ===================================== */

        if (!loginForm) {

            console.log(
                "Member login form नहीं मिला।"
            );

            return;

        }


        /* =====================================
           LOGIN FORM SUBMIT
        ===================================== */

        loginForm.addEventListener(

            "submit",

            function (event) {


                event.preventDefault();


                /* =====================================
                   MEMBER ID
                ===================================== */

                const memberId =

                document
                .getElementById(
                    "memberId"
                )
                .value
                .trim()
                .toUpperCase();


                /* =====================================
                   MOBILE NUMBER / PASSWORD
                ===================================== */

                const password =

                document
                .getElementById(
                    "memberPassword"
                )
                .value
                .trim();


                /* =====================================
                   EMPTY CHECK
                ===================================== */

                if (
                    memberId === ""
                    ||
                    password === ""
                ) {

                    message.textContent =

                    "कृपया Member ID और मोबाइल नंबर भरें।";


                    message.style.color =

                    "red";


                    return;

                }


                /* =====================================
                   MOBILE NUMBER CHECK
                ===================================== */

                if (
                    !/^[0-9]{10}$/.test(
                        password
                    )
                ) {

                    message.textContent =

                    "कृपया 10 अंकों का मोबाइल नंबर लिखें।";


                    message.style.color =

                    "red";


                    return;

                }


                /* =====================================
                   MEMBERS LOAD
                ===================================== */

                let members = [];


                try {

                    const savedMembers =

                    localStorage.getItem(
                        "members"
                    );


                    if (
                        savedMembers
                    ) {

                        members =

                        JSON.parse(
                            savedMembers
                        );

                    }


                    if (
                        !Array.isArray(
                            members
                        )
                    ) {

                        members = [];

                    }

                }

                catch (error) {

                    members = [];

                }


                /* =====================================
                   MEMBER NOT FOUND
                ===================================== */

                if (
                    members.length === 0
                ) {

                    message.textContent =

                    "कोई सदस्य रिकॉर्ड नहीं मिला। पहले सदस्यता फॉर्म भरें।";


                    message.style.color =

                    "red";


                    return;

                }


                /* =====================================
                   FIND MEMBER
                ===================================== */

                const foundMember =

                members.find(

                    function (member) {


                        const savedMemberId =

                        String(

                            member.memberId
                            ||
                            ""

                        )

                        .trim()

                        .toUpperCase();


                        const savedMobile =

                        String(

                            member.mobile
                            ||
                            ""

                        )

                        .trim();


                        return (

                            savedMemberId
                            ===
                            memberId

                            &&

                            savedMobile
                            ===
                            password

                        );

                    }

                );


                /* =====================================
                   LOGIN SUCCESS
                ===================================== */

                if (
                    foundMember
                ) {


                    message.textContent =

                    "✅ लॉगिन सफल हुआ।";


                    message.style.color =

                    "green";


                    /* LOGIN DATA SAVE */

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


                    /* SUCCESS MESSAGE */

                    setTimeout(

                        function () {


                            alert(

                                "लॉगिन सफल हुआ।\n\n" +

                                "नाम: " +

                                (
                                    foundMember.name
                                    ||
                                    "-"
                                )

                                +

                                "\n\nMember ID: " +

                                (
                                    foundMember.memberId
                                    ||
                                    "-"
                                )

                                +

                                "\n\nस्थिति: " +

                                (
                                    foundMember.status
                                    ===
                                    "approved"

                                    ?

                                    "स्वीकृत"

                                    :

                                    "लंबित"
                                )

                            );


                        },

                        300

                    );


                }


                /* =====================================
                   LOGIN FAILED
                ===================================== */

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

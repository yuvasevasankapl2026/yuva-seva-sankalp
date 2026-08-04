/* =====================================
   MEMBER LOGIN
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {


        const loginForm =

            document.getElementById(

                "memberLoginForm"

            );


        const messageBox =

            document.getElementById(

                "memberMessage"

            );


        loginForm.addEventListener(

            "submit",

            function (event) {


                event.preventDefault();


                const enteredMemberId =

                    document.getElementById(

                        "memberId"

                    ).value.trim();


                const enteredMobile =

                    document.getElementById(

                        "memberMobile"

                    ).value.trim();


                /* =====================================
                   MEMBERSHIP DATA
                ===================================== */

                const members = JSON.parse(

                    localStorage.getItem(

                        "members"

                    )

                ) || [];


                /* =====================================
                   FIND MEMBER
                ===================================== */

                const member = members.find(

                    function (item) {


                        return (

                            String(

                                item.memberId

                            ).toUpperCase()

                            ===

                            enteredMemberId.toUpperCase()

                            &&

                            String(

                                item.mobile

                            )

                            ===

                            enteredMobile

                        );


                    }

                );


                /* =====================================
                   MEMBER NOT FOUND
                ===================================== */

                if (

                    !member

                ) {


                    messageBox.textContent =

                        "❌ Member ID या मोबाइल नंबर गलत है।";


                    messageBox.style.color =

                        "red";


                    return;


                }


                /* =====================================
                   MEMBER APPROVAL CHECK
                ===================================== */

                if (

                    member.status !== "स्वीकृत"

                    &&

                    member.status !== "approved"

                ) {


                    messageBox.textContent =

                        "⏳ आपका सदस्यता आवेदन अभी स्वीकृत नहीं हुआ है।";


                    messageBox.style.color =

                        "#d97706";


                    return;


                }


                /* =====================================
                   SAVE LOGIN MEMBER
                ===================================== */

                localStorage.setItem(

                    "loggedInMember",

                    JSON.stringify(

                        member

                    )

                );


                /* =====================================
                   LOGIN SUCCESS
                ===================================== */

                messageBox.textContent =

                    "✅ लॉगिन सफल हो गया।";


                messageBox.style.color =

                    "green";


                /* =====================================
                   OPEN MEMBER DASHBOARD
                ===================================== */

                setTimeout(

                    function () {


                        window.location.href =

                            "member-dashboard.html";


                    },

                    700

                );


            }

        );


    }

);

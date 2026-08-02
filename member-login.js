document.addEventListener(

    "DOMContentLoaded",

    function () {


        const loginForm =

        document.getElementById(
            "memberLoginForm"
        );


        const message =

        document.getElementById(
            "memberMessage"
        );


        const profile =

        document.getElementById(
            "memberProfile"
        );


        if (!loginForm) {

            alert(
                "Login form नहीं मिला।"
            );

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


                const mobile =

                document
                .getElementById(
                    "memberMobile"
                )
                .value
                .trim();


                let members = [];


                try {


                    const savedMembers =

                    localStorage.getItem(
                        "members"
                    );


                    if (savedMembers) {

                        members =

                        JSON.parse(
                            savedMembers
                        );

                    }


                }

                catch (error) {


                    members = [];


                }


                if (

                    !Array.isArray(
                        members
                    )

                ) {


                    members = [];


                }


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
                            mobile

                        );


                    }

                );


                if (foundMember) {


                    message.textContent =

                    "लॉगिन सफल हुआ।";


                    message.style.color =

                    "green";


                    loginForm.style.display =

                    "none";


                    profile.style.display =

                    "block";


                    document
                    .getElementById(
                        "profileMemberId"
                    )
                    .textContent =

                    foundMember.memberId
                    ||
                    "-";


                    document
                    .getElementById(
                        "profileName"
                    )
                    .textContent =

                    foundMember.name
                    ||
                    "-";


                    document
                    .getElementById(
                        "profileMobile"
                    )
                    .textContent =

                    foundMember.mobile
                    ||
                    "-";


                    document
                    .getElementById(
                        "profileMembership"
                    )
                    .textContent =

                    foundMember.membershipType
                    ||
                    foundMember.membership
                    ||
                    "-";


                    const memberStatus =

                    String(

                        foundMember.status
                        ||
                        "pending"

                    )

                    .toLowerCase();


                    if (

                        memberStatus
                        ===
                        "approved"

                    ) {


                        document
                        .getElementById(
                            "profileStatus"
                        )
                        .textContent =

                        "✅ स्वीकृत";


                    }

                    else {


                        document
                        .getElementById(
                            "profileStatus"
                        )
                        .textContent =

                        "⏳ लंबित";


                    }


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


/* MEMBER LOGOUT */

function memberLogout() {


    window.location.reload();


}

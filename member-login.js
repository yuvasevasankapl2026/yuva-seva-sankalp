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


        if (!loginForm) {

            console.log(
                "Member login form नहीं मिला।"
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


                    document
                    .getElementById(
                        "memberProfile"
                    )
                    .style.display =

                    "block";


                    document
                    .getElementById(
                        "profileMemberId"
                    )
                    .textContent =

                    foundMember.memberId;


                    document
                    .getElementById(
                        "profileName"
                    )
                    .textContent =

                    foundMember.name
                    || "-";


                    document
                    .getElementById(
                        "profileMobile"
                    )
                    .textContent =

                    foundMember.mobile
                    || "-";


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


                    const status =

                    String(

                        foundMember.status
                        || "pending"

                    )

                    .toLowerCase();


                    document
                    .getElementById(
                        "profileStatus"
                    )
                    .textContent =

                    status === "approved"

                    ?

                    "✅ स्वीकृत"

                    :

                    "⏳ लंबित";


                }

                else {


                    message.textContent =

                    "Member ID या पासवर्ड गलत है।";


                    message.style.color =

                    "red";

                }


            }

        );


    }

);


function memberLogout() {


    window.location.reload();


}

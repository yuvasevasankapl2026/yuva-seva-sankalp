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

            alert(
                "Member Login Form नहीं मिला।"
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


                if (

                    memberId === ""

                    ||

                    mobile === ""

                ) {

                    message.textContent =

                    "कृपया Member ID और मोबाइल नंबर भरें।";


                    message.style.color =

                    "red";


                    return;

                }


                let members = [];


                try {

                    const savedMembers =

                    localStorage.getItem(
                        "members"
                    );


                    members =

                    JSON.parse(
                        savedMembers
                    ) || [];


                }

                catch (error) {


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

                    "✅ लॉगिन सफल हुआ।";


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


                    const status =

                    String(

                        foundMember.status

                        ||

                        "pending"

                    )

                    .toLowerCase();


                    document
                    .getElementById(
                        "profileStatus"
                    )
                    .textContent =

                    status === "approved"

                    ||

                    status === "स्वीकृत"

                    ?

                    "✅ स्वीकृत"

                    :

                    "⏳ लंबित";


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


function memberLogout() {


    window.location.reload();


}

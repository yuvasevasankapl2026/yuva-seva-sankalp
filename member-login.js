/* =====================================
   MEMBER LOGIN JAVASCRIPT
===================================== */


const memberLoginForm =

document.getElementById(
    "memberLoginForm"
);


/* =====================================
   MEMBER LOGIN
===================================== */

if (
    memberLoginForm
) {

    memberLoginForm.addEventListener(

        "submit",

        function(event) {

            event.preventDefault();


            const enteredMemberId =

            document.getElementById(
                "memberId"
            )
            .value
            .trim()
            .toUpperCase();


            const enteredMobile =

            document.getElementById(
                "memberMobile"
            )
            .value
            .trim();


            let members =

            JSON.parse(

                localStorage.getItem(
                    "members"
                )

            );


            if (
                !Array.isArray(
                    members
                )
            ) {

                members = [];

            }


            const foundMember =

            members.find(

                function(member) {

                    return (

                        String(
                            member.memberId
                            ||
                            ""
                        )
                        .toUpperCase()

                        ===

                        enteredMemberId

                        &&

                        String(
                            member.mobile
                            ||
                            ""
                        )

                        ===

                        enteredMobile

                    );

                }

            );


            if (
                foundMember
            ) {

                document.getElementById(
                    "memberLoginForm"
                ).style.display =

                "none";


                document.getElementById(
                    "memberProfile"
                ).style.display =

                "block";


                document.getElementById(
                    "profileMemberId"
                ).textContent =

                foundMember.memberId;


                document.getElementById(
                    "profileName"
                ).textContent =

                foundMember.name
                ||
                "-";


                document.getElementById(
                    "profileMobile"
                ).textContent =

                foundMember.mobile
                ||
                "-";


                document.getElementById(
                    "profileMembership"
                ).textContent =

                foundMember.membershipType
                ||
                foundMember.membership
                ||
                "-";


                const status =

                foundMember.status
                ||
                "pending";


                document.getElementById(
                    "profileStatus"
                ).textContent =

                status === "approved"

                ?

                "✅ स्वीकृत"

                :

                "⏳ लंबित";


                localStorage.setItem(

                    "memberLoggedIn",

                    foundMember.memberId

                );

            }

            else {

                alert(

                    "Member ID या मोबाइल नंबर गलत है।"

                );

            }

        }

    );

}


/* =====================================
   MEMBER LOGOUT
===================================== */

function memberLogout() {

    localStorage.removeItem(

        "memberLoggedIn"

    );


    window.location.reload();

}

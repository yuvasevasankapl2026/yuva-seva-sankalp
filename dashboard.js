document.addEventListener(
    "DOMContentLoaded",
    function () {

        showMembers();

    }
);


function showMembers() {

    const members =

        JSON.parse(

            localStorage.getItem(
                "members"
            )

        )
        ||
        [];


    const memberTable =

        document.getElementById(
            "memberTable"
        );


    if (
        !memberTable
    ) {

        return;

    }


    memberTable.innerHTML = "";


    if (
        members.length === 0
    ) {

        memberTable.innerHTML = `

            <tr>

                <td colspan="6">

                    अभी कोई सदस्यता आवेदन नहीं है।

                </td>

            </tr>

        `;

    }

    else {

        members.forEach(

            function (
                member,
                index
            ) {

                let membershipName =

                    "सामान्य सदस्य";


                if (
                    member.membershipType
                    ===
                    "active"
                ) {

                    membershipName =

                        "सक्रिय सदस्य";

                }


                if (
                    member.membershipType
                    ===
                    "lifetime"
                ) {

                    membershipName =

                        "आजीवन सदस्य";

                }


                memberTable.innerHTML += `

                    <tr>

                        <td>

                            ${index + 1}

                        </td>


                        <td>

                            ${member.name}

                        </td>


                        <td>

                            ${member.mobile}

                        </td>


                        <td>

                            ${membershipName}

                        </td>


                        <td>

                            <span class="status-pending">

                                ${member.status}

                            </span>

                        </td>


                        <td>

                            <button

                                onclick="approveMember(
                                    ${member.id}
                                )"

                            >

                                स्वीकृत करें

                            </button>

                        </td>

                    </tr>

                `;

            }

        );

    }


    updateDashboardCount(
        members
    );

}


function updateDashboardCount(
    members
) {

    const cards =

        document.querySelectorAll(
            ".dashboard-card h3"
        );


    if (
        cards.length >= 4
    ) {

        cards[0].innerHTML =

            members.length;


        cards[1].innerHTML =

            members.length;


        cards[2].innerHTML =

            members.filter(

                function (
                    member
                ) {

                    return (

                        member.status
                        ===
                        "स्वीकृत"

                    );

                }

            ).length;


        cards[3].innerHTML =

            members.filter(

                function (
                    member
                ) {

                    return (

                        member.status
                        ===
                        "लंबित"

                    );

                }

            ).length;

    }

}


function approveMember(
    memberId
) {

    const members =

        JSON.parse(

            localStorage.getItem(
                "members"
            )

        )
        ||
        [];


    members.forEach(

        function (
            member
        ) {

            if (
                member.id
                ===
                memberId
            ) {

                member.status =

                    "स्वीकृत";

            }

        }

    );


    localStorage.setItem(

        "members",

        JSON.stringify(
            members
        )

    );


    showMembers();

}


function logoutAdmin() {

    const confirmLogout =

        confirm(

            "क्या आप लॉगआउट करना चाहते हैं?"

        );


    if (
        confirmLogout
    ) {

        window.location.href =

            "admin-login.html";

    }

}

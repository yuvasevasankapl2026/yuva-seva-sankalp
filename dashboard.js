/* =====================================
   ADMIN DASHBOARD JAVASCRIPT
===================================== */


/* =====================================
   ADMIN LOGIN CHECK
===================================== */

const adminLogin = localStorage.getItem(
    "adminLoggedIn"
);


if (
    adminLogin !== "true"
) {

    window.location.href =
    "admin-login.html";

}


/* =====================================
   MEMBERS LOAD
===================================== */

let members = JSON.parse(

    localStorage.getItem(
        "members"
    )

) || [];


/* =====================================
   SAVE MEMBERS
===================================== */

function saveMembers() {

    localStorage.setItem(

        "members",

        JSON.stringify(
            members
        )

    );

}


/* =====================================
   DASHBOARD LOAD
===================================== */

function loadDashboard() {

    updateStatistics();

    displayMembers(
        members
    );

}


/* =====================================
   STATISTICS
===================================== */

function updateStatistics() {

    const total =

        members.length;


    const approved =

        members.filter(

            function(member) {

                return (
                    member.status ===
                    "approved"
                );

            }

        ).length;


    const pending =

        members.filter(

            function(member) {

                return (

                    member.status !==
                    "approved"

                );

            }

        ).length;


    document.getElementById(
        "totalMembers"
    ).textContent = total;


    document.getElementById(
        "newApplications"
    ).textContent = pending;


    document.getElementById(
        "approvedMembers"
    ).textContent = approved;


    document.getElementById(
        "pendingMembers"
    ).textContent = pending;

}


/* =====================================
   MEMBER TABLE
===================================== */

function displayMembers(
    memberList
) {

    const table =

        document.getElementById(
            "memberTable"
        );


    table.innerHTML = "";


    if (
        memberList.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    कोई सदस्यता आवेदन नहीं मिला।

                </td>

            </tr>

        `;


        return;

    }


    memberList.forEach(

        function(
            member,
            index
        ) {

            const status =

                member.status ===
                "approved"

                ?

                `

                <span
                    class="
                    status-approved
                    "
                >

                    स्वीकृत

                </span>

                `

                :

                `

                <span
                    class="
                    status-pending
                    "
                >

                    लंबित

                </span>

                `;


            const approveButton =

                member.status ===
                "approved"

                ?

                `

                <span
                    class="
                    approved-text
                    "
                >

                    ✓ स्वीकृत

                </span>

                `

                :

                `

                <button

                    class="
                    approve-btn
                    "

                    onclick="
                    approveMember(
                        ${index}
                    )
                    "

                >

                    ✓ स्वीकृत करें

                </button>

                `;


            table.innerHTML += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>


                    <td>

                        ${
                            member.name
                            ||
                            "-"
                        }

                    </td>


                    <td>

                        ${
                            member.mobile
                            ||
                            "-"
                        }

                    </td>


                    <td>

                        ${
                            member.membership
                            ||
                            member.memberType
                            ||
                            "-"
                        }

                    </td>


                    <td>

                        ${status}

                    </td>


                    <td>

                        ${approveButton}


                        <button

                            class="
                            delete-btn
                            "

                            onclick="
                            deleteMember(
                                ${index}
                            )
                            "

                        >

                            🗑️ हटाएँ

                        </button>

                    </td>

                </tr>

            `;

        }

    );

}


/* =====================================
   APPROVE MEMBER
===================================== */

function approveMember(
    index
) {

    const confirmApprove =

        confirm(

            "क्या आप इस सदस्य को स्वीकृत करना चाहते हैं?"

        );


    if (
        confirmApprove
    ) {

        members[index].status =

            "approved";


        saveMembers();


        loadDashboard();


        alert(

            "सदस्य को सफलतापूर्वक स्वीकृत कर दिया गया।"

        );

    }

}


/* =====================================
   DELETE MEMBER
===================================== */

function deleteMember(
    index
) {

    const memberName =

        members[index].name
        ||
        "इस सदस्य";


    const confirmDelete =

        confirm(

            "क्या आप " +

            memberName +

            " का आवेदन हटाना चाहते हैं?"

        );


    if (
        confirmDelete
    ) {

        members.splice(
            index,
            1
        );


        saveMembers();


        loadDashboard();


        alert(

            "सदस्य का आवेदन सफलतापूर्वक हटा दिया गया।"

        );

    }

}


/* =====================================
   SEARCH MEMBER
===================================== */

const searchBox =

    document.getElementById(
        "memberSearch"
    );


if (
    searchBox
) {

    searchBox.addEventListener(

        "input",

        function() {

            const searchText =

                this.value

                .toLowerCase()

                .trim();


            const filteredMembers =

                members.filter(

                    function(
                        member
                    ) {

                        const name =

                            (
                                member.name
                                ||
                                ""
                            )

                            .toLowerCase();


                        const mobile =

                            String(

                                member.mobile
                                ||
                                ""

                            );


                        return (

                            name.includes(
                                searchText
                            )

                            ||

                            mobile.includes(
                                searchText
                            )

                        );

                    }

                );


            displayMembers(
                filteredMembers
            );

        }

    );

}


/* =====================================
   START DASHBOARD
===================================== */

loadDashboard();
/* =====================================
   HATAYE BUTTON FINAL FIX
===================================== */

function deleteMember(index) {

    const confirmDelete = confirm(
        "क्या आप इस सदस्य को हटाना चाहते हैं?"
    );

    if (confirmDelete) {

        members.splice(index, 1);

        localStorage.setItem(
            "members",
            JSON.stringify(members)
        );

        location.reload();

    }

}

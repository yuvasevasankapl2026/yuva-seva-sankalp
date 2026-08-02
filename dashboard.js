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
   UPDATE STATISTICS
===================================== */

function updateStatistics() {

    const totalMembers =

        members.length;


    const approvedMembers =

        members.filter(

            function(member) {

                return (

                    member.status ===
                    "approved"

                );

            }

        ).length;


    const pendingMembers =

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
    ).textContent =

        totalMembers;


    document.getElementById(
        "newApplications"
    ).textContent =

        pendingMembers;


    document.getElementById(
        "approvedMembers"
    ).textContent =

        approvedMembers;


    document.getElementById(
        "pendingMembers"
    ).textContent =

        pendingMembers;

}


/* =====================================
   DISPLAY MEMBERS
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
                        text-align:
                        center;

                        padding:
                        30px;
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

            const originalIndex =

                members.indexOf(
                    member
                );


            let statusHTML;


            if (
                member.status ===
                "approved"
            ) {

                statusHTML = `

                    <span
                        class="
                        status-approved
                        "
                    >

                        स्वीकृत

                    </span>

                `;

            }

            else {

                statusHTML = `

                    <span
                        class="
                        status-pending
                        "
                    >

                        लंबित

                    </span>

                `;

            }


            let approveHTML;


            if (
                member.status ===
                "approved"
            ) {

                approveHTML = `

                    <span
                        class="
                        approved-text
                        "
                    >

                        ✓ स्वीकृत

                    </span>

                `;

            }

            else {

                approveHTML = `

                    <button
                        type="button"
                        class="
                        approve-btn
                        "

                        onclick="
                        approveMember(
                            ${originalIndex}
                        )
                        "
                    >

                        ✓ स्वीकृत करें

                    </button>

                `;

            }


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

                        ${statusHTML}

                    </td>


                    <td>

                        ${approveHTML}


                        <button
                            type="button"
                            class="
                            delete-btn
                            "

                            onclick="
                            deleteMember(
                                ${originalIndex}
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


        updateStatistics();


        displayMembers(
            members
        );


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


        updateStatistics();


        displayMembers(
            members
        );


        alert(

            "सदस्य का आवेदन सफलतापूर्वक हटा दिया गया।"

        );

    }

}


/* =====================================
   MEMBER SEARCH
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

                            String(

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

updateStatistics();


displayMembers(
    members
);

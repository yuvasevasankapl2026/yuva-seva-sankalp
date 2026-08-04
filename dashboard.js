/* =====================================
   ADMIN LOGIN CHECK
===================================== */

if (
    localStorage.getItem("adminLoggedIn") !== "true"
) {
    window.location.href = "admin-login.html";
}


/* =====================================
   MEMBER DATA
===================================== */

let members = [];

try {

    members = JSON.parse(
        localStorage.getItem("members")
    ) || [];

} catch (error) {

    members = [];

}


/* =====================================
   VOLUNTEER DATA
===================================== */

let volunteers = [];

try {

    volunteers = JSON.parse(
        localStorage.getItem("volunteers")
    ) || [];

} catch (error) {

    volunteers = [];

}


/* =====================================
   CONTACT DATA
===================================== */

let contacts = [];

try {

    contacts = JSON.parse(
        localStorage.getItem("contactMessages")
    ) || [];

} catch (error) {

    contacts = [];

}


/* =====================================
   SAVE MEMBER DATA
===================================== */

function saveMembers() {

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );

}


/* =====================================
   SAVE VOLUNTEER DATA
===================================== */

function saveVolunteers() {

    localStorage.setItem(
        "volunteers",
        JSON.stringify(volunteers)
    );

}


/* =====================================
   SAVE CONTACT DATA
===================================== */

function saveContacts() {

    localStorage.setItem(
        "contactMessages",
        JSON.stringify(contacts)
    );

}


/* =====================================
   MEMBER TABLE
===================================== */

function showMembers(
    memberList = members
) {

    const memberTable =
    document.getElementById(
        "memberTable"
    );


    if (!memberTable) {

        return;

    }


    memberTable.innerHTML = "";


    if (
        memberList.length === 0
    ) {

        memberTable.innerHTML = `

        <tr>

            <td
                colspan="7"
                style="
                    text-align:center;
                    padding:25px;
                "
            >

                अभी कोई सदस्य आवेदन उपलब्ध नहीं है।

            </td>

        </tr>

        `;


        updateDashboard();

        return;

    }


    memberList.forEach(
        function(member, index) {


            const originalIndex =
            members.indexOf(member);


            const memberId =

            member.memberId ||

            member.id ||

            member.memberID ||

            "YSSF-" + (
                originalIndex + 1
            );


            const name =

            member.name ||

            member.fullName ||

            member.memberName ||

            "नाम उपलब्ध नहीं";


            const mobile =

            member.mobile ||

            member.phone ||

            member.mobileNumber ||

            "-";


            const membership =

            member.membership ||

            member.membershipType ||

            member.category ||

            "-";


            const status =

            member.status ||

            "लंबित";


            memberTable.innerHTML += `

            <tr>


                <td>

                    ${index + 1}

                </td>


                <td>

                    ${memberId}

                </td>


                <td>

                    ${name}

                </td>


                <td>

                    ${mobile}

                </td>


                <td>

                    ${membership}

                </td>


                <td>

                    <span class="status">

                        ${status}

                    </span>

                </td>


                <td>


                    <button
                        type="button"
                        class="approve-btn"
                        onclick="approveMember(
                            ${originalIndex}
                        )"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="rejectMember(
                            ${originalIndex}
                        )"
                    >

                        ❌ Reject

                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteMember(
                            ${originalIndex}
                        )"
                    >

                        🗑 Delete

                    </button>


                </td>


            </tr>

            `;

        }
    );


    updateDashboard();

}


/* =====================================
   APPROVE MEMBER
===================================== */

function approveMember(
    index
) {

    if (!members[index]) {

        return;

    }


    members[index].status =
    "स्वीकृत";


    saveMembers();


    showMembers();


    alert(
        "✅ सदस्य आवेदन स्वीकृत कर दिया गया।"
    );

}


/* =====================================
   REJECT MEMBER
===================================== */

function rejectMember(
    index
) {

    if (!members[index]) {

        return;

    }


    members[index].status =
    "अस्वीकृत";


    saveMembers();


    showMembers();


    alert(
        "❌ सदस्य आवेदन अस्वीकृत कर दिया गया।"
    );

}


/* =====================================
   DELETE MEMBER
===================================== */

function deleteMember(
    index
) {

    const confirmDelete =

    confirm(
        "क्या आप इस सदस्य आवेदन को हटाना चाहते हैं?"
    );


    if (!confirmDelete) {

        return;

    }


    members.splice(
        index,
        1
    );


    saveMembers();


    showMembers();


    alert(
        "🗑 सदस्य आवेदन हटा दिया गया।"
    );

}


/* =====================================
   VOLUNTEER TABLE
===================================== */

function showVolunteers(
    volunteerList = volunteers
) {

    const volunteerTable =

    document.getElementById(
        "volunteerTable"
    );


    if (!volunteerTable) {

        return;

    }


    volunteerTable.innerHTML = "";


    if (
        volunteerList.length === 0
    ) {

        volunteerTable.innerHTML = `

        <tr>

            <td
                colspan="8"
                style="
                    text-align:center;
                    padding:25px;
                "
            >

                अभी कोई वॉलंटियर आवेदन उपलब्ध नहीं है।

            </td>

        </tr>

        `;

        return;

    }


    volunteerList.forEach(
        function(volunteer, index) {


            const originalIndex =

            volunteers.indexOf(
                volunteer
            );


            const volunteerId =

            volunteer.volunteerId ||

            volunteer.id ||

            "VOL-" + (
                originalIndex + 1
            );


            const name =

            volunteer.name ||

            volunteer.fullName ||

            "-";


            const mobile =

            volunteer.mobile ||

            volunteer.phone ||

            "-";


            const service =

            volunteer.service ||

            volunteer.serviceArea ||

            "-";


            const availability =

            volunteer.availability ||

            "-";


            const status =

            volunteer.status ||

            "लंबित";


            volunteerTable.innerHTML += `

            <tr>


                <td>

                    ${index + 1}

                </td>


                <td>

                    ${volunteerId}

                </td>


                <td>

                    ${name}

                </td>


                <td>

                    ${mobile}

                </td>


                <td>

                    ${service}

                </td>


                <td>

                    ${availability}

                </td>


                <td>

                    <span class="volunteer-status">

                        ${status}

                    </span>

                </td>


                <td>


                    <button
                        type="button"
                        class="approve-btn"
                        onclick="approveVolunteer(
                            ${originalIndex}
                        )"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="rejectVolunteer(
                            ${originalIndex}
                        )"
                    >

                        ❌ Reject

                    </button>


                    <button
                        type="button"
                        class="delete-btn"
                        onclick="deleteVolunteer(
                            ${originalIndex}
                        )"
                    >

                        🗑 Delete

                    </button>


                </td>


            </tr>

            `;

        }
    );

}


/* =====================================
   APPROVE VOLUNTEER
===================================== */

function approveVolunteer(
    index
) {

    if (!volunteers[index]) {

        return;

    }


    volunteers[index].status =
    "स्वीकृत";


    saveVolunteers();


    showVolunteers();


    alert(
        "✅ वॉलंटियर आवेदन स्वीकृत कर दिया गया।"
    );

}


/* =====================================
   REJECT VOLUNTEER
===================================== */

function rejectVolunteer(
    index
) {

    if (!volunteers[index]) {

        return;

    }


    volunteers[index].status =
    "अस्वीकृत";


    saveVolunteers();


    showVolunteers();


    alert(
        "❌ वॉलंटियर आवेदन अस्वीकृत कर दिया गया।"
    );

}


/* =====================================
   DELETE VOLUNTEER
===================================== */

function deleteVolunteer(
    index
) {

    const confirmDelete =

    confirm(
        "क्या आप इस वॉलंटियर आवेदन को हटाना चाहते हैं?"
    );


    if (!confirmDelete) {

        return;

    }


    volunteers.splice(
        index,
        1
    );


    saveVolunteers();


    showVolunteers();


    alert(
        "🗑 वॉलंटियर आवेदन हटा दिया गया।"
    );

}


/* =====================================
   DASHBOARD COUNT
===================================== */

function updateDashboard() {


    const totalMembers =

    members.length;


    const approvedMembers =

    members.filter(
        function(member) {

            return (

                member.status ===
                "स्वीकृत"

            );

        }
    ).length;


    const pendingMembers =

    members.filter(
        function(member) {

            return (

                !member.status ||

                member.status ===
                "लंबित"

            );

        }
    ).length;


    const totalElement =

    document.getElementById(
        "totalMembers"
    );


    const newElement =

    document.getElementById(
        "newApplications"
    );


    const approvedElement =

    document.getElementById(
        "approvedMembers"
    );


    const pendingElement =

    document.getElementById(
        "pendingMembers"
    );


    if (totalElement) {

        totalElement.textContent =
        totalMembers;

    }


    if (newElement) {

        newElement.textContent =
        pendingMembers;

    }


    if (approvedElement) {

        approvedElement.textContent =
        approvedMembers;

    }


    if (pendingElement) {

        pendingElement.textContent =
        pendingMembers;

    }

}


/* =====================================
   MEMBER SEARCH
===================================== */

const memberSearch =

document.getElementById(
    "memberSearch"
);


if (memberSearch) {

    memberSearch.addEventListener(
        "input",
        function() {


            const searchText =

            this.value
            .toLowerCase()
            .trim();


            const filteredMembers =

            members.filter(
                function(member) {


                    const memberId =

                    String(

                        member.memberId ||

                        member.id ||

                        ""

                    )
                    .toLowerCase();


                    const name =

                    String(

                        member.name ||

                        member.fullName ||

                        ""

                    )
                    .toLowerCase();


                    const mobile =

                    String(

                        member.mobile ||

                        member.phone ||

                        ""

                    );


                    return (

                        memberId.includes(
                            searchText
                        )

                        ||

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


            showMembers(
                filteredMembers
            );

        }
    );

}


/* =====================================
   VOLUNTEER SEARCH
===================================== */

const volunteerSearch =

document.getElementById(
    "volunteerSearch"
);


if (volunteerSearch) {

    volunteerSearch.addEventListener(
        "input",
        function() {


            const searchText =

            this.value
            .toLowerCase()
            .trim();


            const filteredVolunteers =

            volunteers.filter(
                function(volunteer) {


                    const volunteerId =

                    String(

                        volunteer.volunteerId ||

                        volunteer.id ||

                        ""

                    )
                    .toLowerCase();


                    const name =

                    String(

                        volunteer.name ||

                        volunteer.fullName ||

                        ""

                    )
                    .toLowerCase();


                    const mobile =

                    String(

                        volunteer.mobile ||

                        volunteer.phone ||

                        ""

                    );


                    return (

                        volunteerId.includes(
                            searchText
                        )

                        ||

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


            showVolunteers(
                filteredVolunteers
            );

        }
    );

}


/* =====================================
   CONTACT TABLE
===================================== */

function loadContactMessages(
    contactList = contacts
) {

    const contactTable =

    document.getElementById(
        "contactTable"
    );


    if (!contactTable) {

        return;

    }


    contactTable.innerHTML = "";


    if (
        contactList.length === 0
    ) {

        contactTable.innerHTML = `

        <tr>

            <td
                colspan="10"
                style="
                    text-align:center;
                    padding:25px;
                "
            >

                अभी कोई संपर्क संदेश उपलब्ध नहीं है।

            </td>

        </tr>

        `;

        return;

    }


    contactList.forEach(
        function(contact, index) {


            const originalIndex =

            contacts.indexOf(
                contact
            );


            const status =

            contact.status ||

            "नया";


            contactTable.innerHTML += `

            <tr>


                <td>

                    ${index + 1}

                </td>


                <td>

                    ${contact.contactId || "-"}

                </td>


                <td>

                    ${contact.name || "-"}

                </td>


                <td>

                    ${contact.mobile || "-"}

                </td>


                <td>

                    ${contact.email || "-"}

                </td>


                <td>

                    ${contact.subject || "-"}

                </td>


                <td>

                    ${contact.message || "-"}

                </td>


                <td>

                    ${contact.date || "-"}

                </td>


                <td>

                    <span class="contact-status">

                        ${status}

                    </span>

                </td>


                <td>


                    <button
                        type="button"
                        class="contact-read-btn"
                        onclick="markContactRead(
                            ${originalIndex}
                        )"
                    >

                        ✓ पढ़ा

                    </button>


                    <button
                        type="button"
                        class="contact-delete-btn"
                        onclick="deleteContact(
                            ${originalIndex}
                        )"
                    >

                        🗑 हटाएँ

                    </button>


                </td>


            </tr>

            `;

        }
    );

}


/* =====================================
   MARK CONTACT READ
===================================== */

function markContactRead(
    index
) {

    if (!contacts[index]) {

        return;

    }


    contacts[index].status =

    "पढ़ा गया";


    saveContacts();


    loadContactMessages();

}


/* =====================================
   DELETE CONTACT
===================================== */

function deleteContact(
    index
) {

    const confirmDelete =

    confirm(
        "क्या आप यह संपर्क संदेश हटाना चाहते हैं?"
    );


    if (!confirmDelete) {

        return;

    }


    contacts.splice(
        index,
        1
    );


    saveContacts();


    loadContactMessages();


    alert(
        "🗑 संपर्क संदेश हटा दिया गया।"
    );

}


/* =====================================
   CONTACT SEARCH
===================================== */

const contactSearch =

document.getElementById(
    "contactSearch"
);


if (contactSearch) {

    contactSearch.addEventListener(
        "input",
        function() {


            const searchText =

            this.value
            .toLowerCase()
            .trim();


            const filteredContacts =

            contacts.filter(
                function(contact) {


                    const allData =

                    (

                        contact.contactId +

                        " " +

                        contact.name +

                        " " +

                        contact.mobile +

                        " " +

                        contact.email +

                        " " +

                        contact.subject +

                        " " +

                        contact.message

                    )
                    .toLowerCase();


                    return (

                        allData.includes(
                            searchText
                        )

                    );

                }
            );


            loadContactMessages(
                filteredContacts
            );

        }
    );

}


/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showMembers();

        showVolunteers();

        loadContactMessages();

        updateDashboard();

    }
);
/* =====================================
   MEMBER DELETE
===================================== */

function deleteMember(index) {

    const confirmDelete = confirm(

        "क्या आप इस सदस्य को हटाना चाहते हैं?"

    );


    if (!confirmDelete) {

        return;

    }


    members.splice(

        index,

        1

    );


    localStorage.setItem(

        "members",

        JSON.stringify(

            members

        )

    );


    showMembers();

    updateDashboard();


    alert(

        "🗑 सदस्य सफलतापूर्वक हटा दिया गया।"

    );

}
/* =====================================
   VOLUNTEER DELETE
===================================== */

function deleteVolunteer(index) {

    const confirmDelete = confirm(

        "क्या आप इस वॉलंटियर आवेदन को हटाना चाहते हैं?"

    );


    if (!confirmDelete) {

        return;

    }


    volunteers.splice(

        index,

        1

    );


    localStorage.setItem(

        "volunteers",

        JSON.stringify(

            volunteers

        )

    );


    showVolunteers();


    alert(

        "🗑 वॉलंटियर आवेदन सफलतापूर्वक हटा दिया गया।"

    );

}

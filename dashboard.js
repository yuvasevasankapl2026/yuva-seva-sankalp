/* =====================================
   ADMIN LOGIN CHECK
===================================== */

if (
    localStorage.getItem("adminLoggedIn") !== "true"
) {

    window.location.href =
    "admin-login.html";

}


/* =====================================
   SAFE LOCAL STORAGE DATA
===================================== */

function getStorageData(key) {

    try {

        const data = JSON.parse(
            localStorage.getItem(key)
        );

        return Array.isArray(data)
            ? data
            : [];

    }

    catch (error) {

        console.error(
            key + " data पढ़ने में समस्या:",
            error
        );

        return [];

    }

}


/* =====================================
   HTML SAFE TEXT
===================================== */

function safeText(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "-";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================
   STATUS CLASS
===================================== */

function getStatusClass(status) {

    const value = String(
        status || "लंबित"
    )
    .toLowerCase()
    .trim();


    if (
        value === "स्वीकृत" ||
        value === "approved"
    ) {

        return "approved";

    }


    if (
        value === "अस्वीकृत" ||
        value === "rejected"
    ) {

        return "rejected";

    }


    if (
        value === "पढ़ा गया" ||
        value === "read"
    ) {

        return "read";

    }


    return "pending";

}


/* =====================================
   MEMBER TABLE
===================================== */

function showMembers(
    memberList
) {

    const memberTable =
    document.getElementById(
        "memberTable"
    );


    if (!memberTable) {

        return;

    }


    const members =
    getStorageData("members");


    const list =
    memberList || members;


    memberTable.innerHTML = "";


    if (
        list.length === 0
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


    list.forEach(
        function(
            member,
            index
        ) {


            const originalIndex =
            members.indexOf(member);


            const memberId =

            member.memberId ||

            member.memberID ||

            member.id ||

            "YSSF-" +
            (originalIndex + 1);


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


            const statusClass =

            getStatusClass(
                status
            );


            memberTable.innerHTML += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>


                    <td>

                        ${safeText(
                            memberId
                        )}

                    </td>


                    <td>

                        ${safeText(
                            name
                        )}

                    </td>


                    <td>

                        ${safeText(
                            mobile
                        )}

                    </td>


                    <td>

                        ${safeText(
                            membership
                        )}

                    </td>


                    <td>

                        <span
                            class="
                                status
                                ${statusClass}
                            "
                        >

                            ${safeText(
                                status
                            )}

                        </span>

                    </td>


                    <td>

                        <button
                            type="button"
                            class="approve-btn"
                            onclick="
                                approveMember(
                                    ${originalIndex}
                                )
                            "
                        >

                            ✅ Approve

                        </button>


                        <button
                            type="button"
                            class="reject-btn"
                            onclick="
                                rejectMember(
                                    ${originalIndex}
                                )
                            "
                        >

                            ❌ Reject

                        </button>


                        <button
                            type="button"
                            class="delete-btn"
                            onclick="
                                deleteMember(
                                    ${originalIndex}
                                )
                            "
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

    updateMemberStatus(
        index,
        "स्वीकृत"
    );

}


/* =====================================
   REJECT MEMBER
===================================== */

function rejectMember(
    index
) {

    updateMemberStatus(
        index,
        "अस्वीकृत"
    );

}


/* =====================================
   UPDATE MEMBER STATUS
===================================== */

function updateMemberStatus(
    index,
    newStatus
) {

    const members =
    getStorageData(
        "members"
    );


    if (
        !members[index]
    ) {

        alert(
            "सदस्य आवेदन नहीं मिला।"
        );

        return;

    }


    members[index].status =
    newStatus;


    localStorage.setItem(

        "members",

        JSON.stringify(
            members
        )

    );


    showMembers();

    updateDashboard();


    alert(

        "✅ सदस्य की स्थिति " +

        newStatus +

        " कर दी गई है।"

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

        "क्या आप इस सदस्य को स्थायी रूप से हटाना चाहते हैं?"

    );


    if (
        !confirmDelete
    ) {

        return;

    }


    const members =

    getStorageData(
        "members"
    );


    if (
        !members[index]
    ) {

        alert(
            "सदस्य नहीं मिला।"
        );

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
   VOLUNTEER TABLE
===================================== */

function showVolunteers(
    volunteerList
) {

    const volunteerTable =

    document.getElementById(
        "volunteerTable"
    );


    if (
        !volunteerTable
    ) {

        return;

    }


    const volunteers =

    getStorageData(
        "volunteers"
    );


    const list =

    volunteerList ||
    volunteers;


    volunteerTable.innerHTML = "";


    if (
        list.length === 0
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


    list.forEach(

        function(
            volunteer,
            index
        ) {


            const originalIndex =

            volunteers.indexOf(
                volunteer
            );


            const volunteerId =

            volunteer.volunteerId ||

            volunteer.id ||

            "VOL-" +
            (originalIndex + 1);


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

            volunteer.area ||

            "-";


            const availability =

            volunteer.availability ||

            volunteer.availableTime ||

            "-";


            const status =

            volunteer.status ||

            "लंबित";


            const statusClass =

            getStatusClass(
                status
            );


            volunteerTable.innerHTML += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>


                    <td>

                        ${safeText(
                            volunteerId
                        )}

                    </td>


                    <td>

                        ${safeText(
                            name
                        )}

                    </td>


                    <td>

                        ${safeText(
                            mobile
                        )}

                    </td>


                    <td>

                        ${safeText(
                            service
                        )}

                    </td>


                    <td>

                        ${safeText(
                            availability
                        )}

                    </td>


                    <td>

                        <span
                            class="
                                volunteer-status
                                ${statusClass}
                            "
                        >

                            ${safeText(
                                status
                            )}

                        </span>

                    </td>


                    <td>

                        <button
                            type="button"
                            class="approve-btn"
                            onclick="
                                approveVolunteer(
                                    ${originalIndex}
                                )
                            "
                        >

                            ✅ Approve

                        </button>


                        <button
                            type="button"
                            class="reject-btn"
                            onclick="
                                rejectVolunteer(
                                    ${originalIndex}
                                )
                            "
                        >

                            ❌ Reject

                        </button>


                        <button
                            type="button"
                            class="delete-btn"
                            onclick="
                                deleteVolunteer(
                                    ${originalIndex}
                                )
                            "
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

    updateVolunteerStatus(
        index,
        "स्वीकृत"
    );

}


/* =====================================
   REJECT VOLUNTEER
===================================== */

function rejectVolunteer(
    index
) {

    updateVolunteerStatus(
        index,
        "अस्वीकृत"
    );

}


/* =====================================
   UPDATE VOLUNTEER STATUS
===================================== */

function updateVolunteerStatus(
    index,
    newStatus
) {

    const volunteers =

    getStorageData(
        "volunteers"
    );


    if (
        !volunteers[index]
    ) {

        alert(
            "वॉलंटियर आवेदन नहीं मिला।"
        );

        return;

    }


    volunteers[index].status =

    newStatus;


    localStorage.setItem(

        "volunteers",

        JSON.stringify(
            volunteers
        )

    );


    showVolunteers();


    alert(

        "✅ वॉलंटियर की स्थिति " +

        newStatus +

        " कर दी गई है।"

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


    if (
        !confirmDelete
    ) {

        return;

    }


    const volunteers =

    getStorageData(
        "volunteers"
    );


    if (
        !volunteers[index]
    ) {

        alert(
            "वॉलंटियर आवेदन नहीं मिला।"
        );

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
        "🗑 वॉलंटियर आवेदन हटा दिया गया।"
    );

}


/* =====================================
   CONTACT MESSAGE TABLE
===================================== */

function loadContactMessages(
    contactList
) {

    const contactTable =

    document.getElementById(
        "contactTable"
    );


    if (
        !contactTable
    ) {

        return;

    }


    const contacts =

    getStorageData(
        "contactMessages"
    );


    const list =

    contactList ||
    contacts;


    contactTable.innerHTML = "";


    if (
        list.length === 0
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


    list.forEach(

        function(
            contact,
            index
        ) {


            const originalIndex =

            contacts.indexOf(
                contact
            );


            const status =

            contact.status ||

            "नया";


            const statusClass =

            getStatusClass(
                status
            );


            contactTable.innerHTML += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>


                    <td>

                        ${safeText(

                            contact.contactId ||

                            contact.id ||

                            "MSG-" +
                            (originalIndex + 1)

                        )}

                    </td>


                    <td>

                        ${safeText(
                            contact.name
                        )}

                    </td>


                    <td>

                        ${safeText(

                            contact.mobile ||

                            contact.phone

                        )}

                    </td>


                    <td>

                        ${safeText(
                            contact.email
                        )}

                    </td>


                    <td>

                        ${safeText(
                            contact.subject
                        )}

                    </td>


                    <td>

                        ${safeText(
                            contact.message
                        )}

                    </td>


                    <td>

                        ${safeText(

                            contact.date ||

                            contact.createdAt

                        )}

                    </td>


                    <td>

                        <span
                            class="
                                contact-status
                                ${statusClass}
                            "
                        >

                            ${safeText(
                                status
                            )}

                        </span>

                    </td>


                    <td>

                        <button
                            type="button"
                            class="contact-read-btn"
                            onclick="
                                markContactRead(
                                    ${originalIndex}
                                )
                            "
                        >

                            ✓ पढ़ा

                        </button>


                        <button
                            type="button"
                            class="contact-delete-btn"
                            onclick="
                                deleteContact(
                                    ${originalIndex}
                                )
                            "
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
   MARK CONTACT AS READ
===================================== */

function markContactRead(
    index
) {

    const contacts =

    getStorageData(
        "contactMessages"
    );


    if (
        !contacts[index]
    ) {

        alert(
            "संपर्क संदेश नहीं मिला।"
        );

        return;

    }


    contacts[index].status =

    "पढ़ा गया";


    localStorage.setItem(

        "contactMessages",

        JSON.stringify(
            contacts
        )

    );


    loadContactMessages();


    alert(
        "✓ संदेश को पढ़ा गया कर दिया गया।"
    );

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


    if (
        !confirmDelete
    ) {

        return;

    }


    const contacts =

    getStorageData(
        "contactMessages"
    );


    if (
        !contacts[index]
    ) {

        alert(
            "संपर्क संदेश नहीं मिला।"
        );

        return;

    }


    contacts.splice(
        index,
        1
    );


    localStorage.setItem(

        "contactMessages",

        JSON.stringify(
            contacts
        )

    );


    loadContactMessages();


    alert(
        "🗑 संपर्क संदेश हटा दिया गया।"
    );

}


/* =====================================
   DASHBOARD STATISTICS
===================================== */

function updateDashboard() {

    const members =

    getStorageData(
        "members"
    );


    const totalMembers =

    members.length;


    const approvedMembers =

    members.filter(

        function(member) {

            const status =

            String(

                member.status ||

                ""

            )
            .toLowerCase()
            .trim();


            return (

                status === "स्वीकृत" ||

                status === "approved"

            );

        }

    ).length;


    const pendingMembers =

    members.filter(

        function(member) {

            const status =

            String(

                member.status ||

                "लंबित"

            )
            .toLowerCase()
            .trim();


            return (

                status === "लंबित" ||

                status === "pending" ||

                status === ""

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


    if (
        totalElement
    ) {

        totalElement.textContent =

        totalMembers;

    }


    if (
        newElement
    ) {

        newElement.textContent =

        pendingMembers;

    }


    if (
        approvedElement
    ) {

        approvedElement.textContent =

        approvedMembers;

    }


    if (
        pendingElement
    ) {

        pendingElement.textContent =

        pendingMembers;

    }

}


/* =====================================
   MEMBER SEARCH
===================================== */

function setupMemberSearch() {

    const memberSearch =

    document.getElementById(
        "memberSearch"
    );


    if (
        !memberSearch
    ) {

        return;

    }


    memberSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value
            .toLowerCase()
            .trim();


            const members =

            getStorageData(
                "members"
            );


            const filteredMembers =

            members.filter(

                function(member) {


                    const text =

                    [

                        member.memberId,

                        member.memberID,

                        member.id,

                        member.name,

                        member.fullName,

                        member.memberName,

                        member.mobile,

                        member.phone,

                        member.mobileNumber

                    ]
                    .join(" ")
                    .toLowerCase();


                    return text.includes(

                        searchText

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

function setupVolunteerSearch() {

    const volunteerSearch =

    document.getElementById(
        "volunteerSearch"
    );


    if (
        !volunteerSearch
    ) {

        return;

    }


    volunteerSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value
            .toLowerCase()
            .trim();


            const volunteers =

            getStorageData(
                "volunteers"
            );


            const filteredVolunteers =

            volunteers.filter(

                function(volunteer) {


                    const text =

                    [

                        volunteer.volunteerId,

                        volunteer.id,

                        volunteer.name,

                        volunteer.fullName,

                        volunteer.mobile,

                        volunteer.phone

                    ]
                    .join(" ")
                    .toLowerCase();


                    return text.includes(

                        searchText

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
   CONTACT SEARCH
===================================== */

function setupContactSearch() {

    const contactSearch =

    document.getElementById(
        "contactSearch"
    );


    if (
        !contactSearch
    ) {

        return;

    }


    contactSearch.addEventListener(

        "input",

        function() {


            const searchText =

            this.value
            .toLowerCase()
            .trim();


            const contacts =

            getStorageData(
                "contactMessages"
            );


            const filteredContacts =

            contacts.filter(

                function(contact) {


                    const text =

                    [

                        contact.contactId,

                        contact.id,

                        contact.name,

                        contact.mobile,

                        contact.phone,

                        contact.email,

                        contact.subject,

                        contact.message

                    ]
                    .join(" ")
                    .toLowerCase();


                    return text.includes(

                        searchText

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


        setupMemberSearch();


        setupVolunteerSearch();


        setupContactSearch();


    }

);

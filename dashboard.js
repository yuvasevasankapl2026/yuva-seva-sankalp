/* =====================================
   ADMIN DASHBOARD JAVASCRIPT
===================================== */


/* =====================================
   ADMIN LOGIN CHECK
===================================== */

if (

    localStorage.getItem(

        "adminLoggedIn"

    ) !== "true"

) {

    window.location.href =

    "admin-login.html";

}


/* =====================================
   SAFE LOCAL STORAGE DATA
===================================== */

function getStorageData(

    key

) {

    try {

        const data = JSON.parse(

            localStorage.getItem(

                key

            )

        );

        return Array.isArray(

            data

        )

        ? data

        : [];

    }

    catch (

        error

    ) {

        console.error(

            key + " data error:",

            error

        );

        return [];

    }

}


/* =====================================
   SAVE LOCAL STORAGE DATA
===================================== */

function saveStorageData(

    key,

    data

) {

    localStorage.setItem(

        key,

        JSON.stringify(

            data

        )

    );

}


/* =====================================
   GET MEMBER VALUE
===================================== */

function getMemberId(

    member,

    index

) {

    return (

        member.memberId ||

        member.memberID ||

        member.id ||

        "YSSF-2026-" +

        String(

            index + 1

        ).padStart(

            4,

            "0"

        )

    );

}


function getMemberName(

    member

) {

    return (

        member.name ||

        member.fullName ||

        member.memberName ||

        "नाम उपलब्ध नहीं"

    );

}


function getMemberMobile(

    member

) {

    return (

        member.mobile ||

        member.phone ||

        member.mobileNumber ||

        "—"

    );

}


function getMemberMembership(

    member

) {

    return (

        member.membership ||

        member.membershipType ||

        member.category ||

        "general"

    );

}


function getMemberDate(

    member

) {

    return (

        member.date ||

        member.applicationDate ||

        member.createdAt ||

        "—"

    );

}


/* =====================================
   STATUS NORMALIZE
===================================== */

function normalizeStatus(

    status

) {

    const value = String(

        status ||

        "लंबित"

    )

    .trim()

    .toLowerCase();


    if (

        value === "approved" ||

        value === "स्वीकृत"

    ) {

        return "स्वीकृत";

    }


    if (

        value === "rejected" ||

        value === "अस्वीकृत"

    ) {

        return "अस्वीकृत";

    }


    if (

        value === "read" ||

        value === "पढ़ा गया"

    ) {

        return "पढ़ा गया";

    }


    if (

        value === "new" ||

        value === "नया"

    ) {

        return "नया";

    }


    return "लंबित";

}


/* =====================================
   STATUS CLASS
===================================== */

function getStatusClass(

    status

) {

    const finalStatus =

    normalizeStatus(

        status

    );


    if (

        finalStatus === "स्वीकृत"

    ) {

        return "approved";

    }


    if (

        finalStatus === "अस्वीकृत"

    ) {

        return "rejected";

    }


    if (

        finalStatus === "पढ़ा गया"

    ) {

        return "read";

    }


    if (

        finalStatus === "नया"

    ) {

        return "new";

    }


    return "pending";

}


/* =====================================
   UPDATE DASHBOARD COUNT
===================================== */

function updateDashboardStatistics() {

    const members =

    getStorageData(

        "members"

    );


    const volunteers =

    getStorageData(

        "volunteers"

    );


    const contacts =

    getStorageData(

        "contactMessages"

    );


    const totalMembers =

    members.length;


    const approvedMembers =

    members.filter(

        function (

            member

        ) {

            return (

                normalizeStatus(

                    member.status

                ) === "स्वीकृत"

            );

        }

    ).length;


    const pendingMembers =

    members.filter(

        function (

            member

        ) {

            return (

                normalizeStatus(

                    member.status

                ) === "लंबित"

            );

        }

    ).length;


    const totalMembersElement =

    document.getElementById(

        "totalMembers"

    );


    const newApplicationsElement =

    document.getElementById(

        "newApplications"

    );


    const approvedMembersElement =

    document.getElementById(

        "approvedMembers"

    );


    const pendingMembersElement =

    document.getElementById(

        "pendingMembers"

    );


    const totalVolunteersElement =

    document.getElementById(

        "totalVolunteers"

    );


    const totalContactsElement =

    document.getElementById(

        "totalContacts"

    );


    if (

        totalMembersElement

    ) {

        totalMembersElement.textContent =

        totalMembers;

    }


    if (

        newApplicationsElement

    ) {

        newApplicationsElement.textContent =

        pendingMembers;

    }


    if (

        approvedMembersElement

    ) {

        approvedMembersElement.textContent =

        approvedMembers;

    }


    if (

        pendingMembersElement

    ) {

        pendingMembersElement.textContent =

        pendingMembers;

    }


    if (

        totalVolunteersElement

    ) {

        totalVolunteersElement.textContent =

        volunteers.length;

    }


    if (

        totalContactsElement

    ) {

        totalContactsElement.textContent =

        contacts.length;

    }


    updateDashboardNotification(

        pendingMembers,

        volunteers,

        contacts

    );

}


/* =====================================
   DASHBOARD NOTIFICATION
===================================== */

function updateDashboardNotification(

    pendingMembers,

    volunteers,

    contacts

) {

    const notification =

    document.getElementById(

        "dashboardNotification"

    );


    if (

        !notification

    ) {

        return;

    }


    const pendingVolunteers =

    volunteers.filter(

        function (

            volunteer

        ) {

            return (

                normalizeStatus(

                    volunteer.status

                ) === "लंबित"

            );

        }

    ).length;


    const newContacts =

    contacts.filter(

        function (

            contact

        ) {

            const status = String(

                contact.status ||

                "नया"

            )

            .trim()

            .toLowerCase();


            return (

                status === "नया" ||

                status === "new"

            );

        }

    ).length;


    const totalNew =

    pendingMembers +

    pendingVolunteers +

    newContacts;


    if (

        totalNew === 0

    ) {

        notification.innerHTML =

        "✅ अभी कोई नया आवेदन या संदेश नहीं है।";

    }

    else {

        notification.innerHTML =

        "🔔 कुल " +

        totalNew +

        " नए आवेदन / संदेश उपलब्ध हैं।";

    }

}


/* =====================================
   LOAD MEMBERS
===================================== */

function loadMembers() {

    const memberTable =

    document.getElementById(

        "memberTable"

    );


    if (

        !memberTable

    ) {

        return;

    }


    const members =

    getStorageData(

        "members"

    );


    const searchBox =

    document.getElementById(

        "memberSearch"

    );


    const dateBox =

    document.getElementById(

        "memberDateSearch"

    );


    const searchText =

    searchBox

    ? searchBox.value

        .toLowerCase()

        .trim()

    : "";


    const selectedDate =

    dateBox

    ? dateBox.value

    : "";


    memberTable.innerHTML = "";


    const filteredMembers =

    members.filter(

        function (

            member,

            index

        ) {

            const fullText =

            (

                getMemberId(

                    member,

                    index

                ) +

                " " +

                getMemberName(

                    member

                ) +

                " " +

                getMemberMobile(

                    member

                )

            )

            .toLowerCase();


            const memberDate =

            String(

                getMemberDate(

                    member

                )

            );


            const searchMatch =

            fullText.includes(

                searchText

            );


            const dateMatch =

            !selectedDate ||

            memberDate.includes(

                selectedDate

            );


            return (

                searchMatch &&

                dateMatch

            );

        }

    );


    if (

        filteredMembers.length === 0

    ) {

        memberTable.innerHTML = `

        <tr>

            <td
                colspan="8"
                style="
                    text-align:center;
                    padding:25px;
                "
            >

                अभी कोई सदस्य आवेदन उपलब्ध नहीं है।

            </td>

        </tr>

        `;


        return;

    }


    filteredMembers.forEach(

        function (

            member,

            displayIndex

        ) {

            const originalIndex =

            members.indexOf(

                member

            );


            const status =

            normalizeStatus(

                member.status

            );


            const statusClass =

            getStatusClass(

                status

            );


            memberTable.innerHTML += `

            <tr>

                <td>

                    ${displayIndex + 1}

                </td>


                <td>

                    ${getMemberId(
                        member,
                        originalIndex
                    )}

                </td>


                <td>

                    ${getMemberName(
                        member
                    )}

                </td>


                <td>

                    ${getMemberMobile(
                        member
                    )}

                </td>


                <td>

                    ${getMemberMembership(
                        member
                    )}

                </td>


                <td>

                    ${getMemberDate(
                        member
                    )}

                </td>


                <td>

                    <span
                        class="status ${statusClass}"
                    >

                        ${status}

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="view-btn"
                        onclick="viewMember(
                            ${originalIndex}
                        )"
                    >

                        👁️ देखें

                    </button>


                    <button
                        type="button"
                        class="edit-btn"
                        onclick="openMemberEdit(
                            ${originalIndex}
                        )"
                    >

                        ✏️ Edit

                    </button>


                    <button
                        type="button"
                        class="approve-btn"
                        onclick="updateMemberStatus(
                            ${originalIndex},
                            'स्वीकृत'
                        )"
                    >

                        ✅

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="updateMemberStatus(
                            ${originalIndex},
                            'अस्वीकृत'
                        )"
                    >

                        ❌

                    </button>

                </td>

            </tr>

            `;

        }

    );

}


/* =====================================
   MEMBER STATUS UPDATE
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

            "सदस्य नहीं मिला।"

        );

        return;

    }


    members[index].status =

    newStatus;


    saveStorageData(

        "members",

        members

    );


    loadMembers();

    updateDashboardStatistics();


    alert(

        "सदस्य की स्थिति " +

        newStatus +

        " कर दी गई है।"

    );

}


/* =====================================
   VIEW MEMBER
===================================== */

function viewMember(

    index

) {

    const members =

    getStorageData(

        "members"

    );


    const member =

    members[index];


    if (

        !member

    ) {

        return;

    }


    const content =

    document.getElementById(

        "memberViewContent"

    );


    const modal =

    document.getElementById(

        "memberViewModal"

    );


    if (

        !content ||

        !modal

    ) {

        return;

    }


    let details = "";


    Object.keys(

        member

    ).forEach(

        function (

            key

        ) {

            details += `

            <div class="member-detail">

                <strong>

                    ${key}

                </strong>

                <span>

                    ${member[key]}

                </span>

            </div>

            `;

        }

    );


    content.innerHTML =

    details;


    modal.style.display =

    "flex";

}


/* =====================================
   CLOSE MEMBER VIEW
===================================== */

function closeMemberView() {

    const modal =

    document.getElementById(

        "memberViewModal"

    );


    if (

        modal

    ) {

        modal.style.display =

        "none";

    }

}


/* =====================================
   OPEN MEMBER EDIT
===================================== */

function openMemberEdit(

    index

) {

    const members =

    getStorageData(

        "members"

    );


    const member =

    members[index];


    if (

        !member

    ) {

        return;

    }


    document.getElementById(

        "editMemberIndex"

    ).value =

    index;


    document.getElementById(

        "editMemberName"

    ).value =

    getMemberName(

        member

    );


    document.getElementById(

        "editMemberMobile"

    ).value =

    getMemberMobile(

        member

    );


    document.getElementById(

        "editMemberMembership"

    ).value =

    getMemberMembership(

        member

    );


    document.getElementById(

        "editMemberStatus"

    ).value =

    normalizeStatus(

        member.status

    );


    document.getElementById(

        "memberEditModal"

    ).style.display =

    "flex";

}


/* =====================================
   CLOSE MEMBER EDIT
===================================== */

function closeMemberEdit() {

    const modal =

    document.getElementById(

        "memberEditModal"

    );


    if (

        modal

    ) {

        modal.style.display =

        "none";

    }

}


/* =====================================
   SAVE MEMBER EDIT
===================================== */

function setupMemberEditForm() {

    const form =

    document.getElementById(

        "memberEditForm"

    );


    if (

        !form

    ) {

        return;

    }


    form.addEventListener(

        "submit",

        function (

            event

        ) {

            event.preventDefault();


            const index =

            Number(

                document.getElementById(

                    "editMemberIndex"

                ).value

            );


            const members =

            getStorageData(

                "members"

            );


            if (

                !members[index]

            ) {

                return;

            }


            members[index].name =

            document.getElementById(

                "editMemberName"

            ).value

            .trim();


            members[index].mobile =

            document.getElementById(

                "editMemberMobile"

            ).value

            .trim();


            members[index].membership =

            document.getElementById(

                "editMemberMembership"

            ).value

            .trim();


            members[index].status =

            document.getElementById(

                "editMemberStatus"

            ).value;


            saveStorageData(

                "members",

                members

            );


            closeMemberEdit();

            loadMembers();

            updateDashboardStatistics();


            alert(

                "✅ सदस्य की जानकारी सेव हो गई।"

            );

        }

    );

}


/* =====================================
   LOAD CONTACT MESSAGES
===================================== */

function loadContactMessages() {

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


    const searchBox =

    document.getElementById(

        "contactSearch"

    );


    const dateBox =

    document.getElementById(

        "contactDateSearch"

    );


    const searchText =

    searchBox

    ? searchBox.value

        .toLowerCase()

        .trim()

    : "";


    const selectedDate =

    dateBox

    ? dateBox.value

    : "";


    contactTable.innerHTML = "";


    const filteredContacts =

    contacts.filter(

        function (

            contact

        ) {

            const fullText =

            (

                (contact.contactId || "") +

                " " +

                (contact.name || "") +

                " " +

                (contact.mobile || "") +

                " " +

                (contact.subject || "")

            )

            .toLowerCase();


            const contactDate =

            String(

                contact.date ||

                contact.createdAt ||

                ""

            );


            return (

                fullText.includes(

                    searchText

                )

                &&

                (

                    !selectedDate ||

                    contactDate.includes(

                        selectedDate

                    )

                )

            );

        }

    );


    if (

        filteredContacts.length === 0

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


    filteredContacts.forEach(

        function (

            contact,

            displayIndex

        ) {

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

                    ${displayIndex + 1}

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

                    ${contact.date ||
                    contact.createdAt ||
                    "-"}

                </td>


                <td>

                    <span
                        class="status ${getStatusClass(
                            status
                        )}"
                    >

                        ${status}

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="approve-btn"
                        onclick="markContactRead(
                            ${originalIndex}
                        )"
                    >

                        ✓ पढ़ा

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
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

    const contacts =

    getStorageData(

        "contactMessages"

    );


    if (

        !contacts[index]

    ) {

        return;

    }


    contacts[index].status =

    "पढ़ा गया";


    saveStorageData(

        "contactMessages",

        contacts

    );


    loadContactMessages();

    updateDashboardStatistics();

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


    contacts.splice(

        index,

        1

    );


    saveStorageData(

        "contactMessages",

        contacts

    );


    loadContactMessages();

    updateDashboardStatistics();

}


/* =====================================
   LOAD VOLUNTEERS
===================================== */

function loadVolunteers() {

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


    const searchBox =

    document.getElementById(

        "volunteerSearch"

    );


    const dateBox =

    document.getElementById(

        "volunteerDateSearch"

    );


    const searchText =

    searchBox

    ? searchBox.value

        .toLowerCase()

        .trim()

    : "";


    const selectedDate =

    dateBox

    ? dateBox.value

    : "";


    volunteerTable.innerHTML = "";


    const filteredVolunteers =

    volunteers.filter(

        function (

            volunteer,

            index

        ) {

            const fullText =

            (

                (

                    volunteer.volunteerId ||

                    "VOL-" +

                    (index + 1)

                ) +

                " " +

                (

                    volunteer.name ||

                    ""

                ) +

                " " +

                (

                    volunteer.mobile ||

                    ""

                )

            )

            .toLowerCase();


            const volunteerDate =

            String(

                volunteer.date ||

                volunteer.applicationDate ||

                volunteer.createdAt ||

                ""

            );


            return (

                fullText.includes(

                    searchText

                )

                &&

                (

                    !selectedDate ||

                    volunteerDate.includes(

                        selectedDate

                    )

                )

            );

        }

    );


    if (

        filteredVolunteers.length === 0

    ) {

        volunteerTable.innerHTML = `

        <tr>

            <td
                colspan="9"
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


    filteredVolunteers.forEach(

        function (

            volunteer,

            displayIndex

        ) {

            const originalIndex =

            volunteers.indexOf(

                volunteer

            );


            const status =

            normalizeStatus(

                volunteer.status

            );


            volunteerTable.innerHTML += `

            <tr>

                <td>

                    ${displayIndex + 1}

                </td>


                <td>

                    ${volunteer.volunteerId ||
                    "VOL-" +
                    (originalIndex + 1)}

                </td>


                <td>

                    ${volunteer.name || "-"}

                </td>


                <td>

                    ${volunteer.mobile || "-"}

                </td>


                <td>

                    ${volunteer.service ||
                    volunteer.serviceArea ||
                    "-"}

                </td>


                <td>

                    ${volunteer.availability || "-"}

                </td>


                <td>

                    ${volunteer.date ||
                    volunteer.applicationDate ||
                    volunteer.createdAt ||
                    "-"}

                </td>


                <td>

                    <span
                        class="status ${getStatusClass(
                            status
                        )}"
                    >

                        ${status}

                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="approve-btn"
                        onclick="updateVolunteerStatus(
                            ${originalIndex},
                            'स्वीकृत'
                        )"
                    >

                        ✅ Approve

                    </button>


                    <button
                        type="button"
                        class="reject-btn"
                        onclick="updateVolunteerStatus(
                            ${originalIndex},
                            'अस्वीकृत'
                        )"
                    >

                        ❌ Reject

                    </button>

                </td>

            </tr>

            `;

        }

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

        return;

    }


    volunteers[index].status =

    newStatus;


    saveStorageData(

        "volunteers",

        volunteers

    );


    loadVolunteers();

    updateDashboardStatistics();


    alert(

        "वॉलंटियर की स्थिति " +

        newStatus +

        " कर दी गई है।"

    );

}


/* =====================================
   PASSWORD MODAL
===================================== */

function openPasswordModal() {

    const modal =

    document.getElementById(

        "passwordModal"

    );


    if (

        modal

    ) {

        modal.style.display =

        "flex";

    }

}


function closePasswordModal() {

    const modal =

    document.getElementById(

        "passwordModal"

    );


    if (

        modal

    ) {

        modal.style.display =

        "none";

    }

}


/* =====================================
   CHANGE PASSWORD
===================================== */

function setupPasswordForm() {

    const form =

    document.getElementById(

        "passwordChangeForm"

    );


    if (

        !form

    ) {

        return;

    }


    form.addEventListener(

        "submit",

        function (

            event

        ) {

            event.preventDefault();


            const oldPassword =

            document.getElementById(

                "oldPassword"

            ).value;


            const newPassword =

            document.getElementById(

                "newPassword"

            ).value;


            const confirmPassword =

            document.getElementById(

                "confirmNewPassword"

            ).value;


            const savedPassword =

            localStorage.getItem(

                "adminPassword"

            ) ||

            "admin123";


            if (

                oldPassword !==

                savedPassword

            ) {

                alert(

                    "❌ पुराना पासवर्ड गलत है।"

                );

                return;

            }


            if (

                newPassword !==

                confirmPassword

            ) {

                alert(

                    "❌ नया पासवर्ड मेल नहीं खाता।"

                );

                return;

            }


            localStorage.setItem(

                "adminPassword",

                newPassword

            );


            form.reset();

            closePasswordModal();


            alert(

                "✅ एडमिन पासवर्ड बदल दिया गया है।"

            );

        }

    );

}


/* =====================================
   CSV VALUE
===================================== */

function csvValue(

    value

) {

    return (

        '"' +

        String(

            value ||

            ""

        )

        .replace(

            /"/g,

            '""'

        )

        +

        '"'

    );

}


/* =====================================
   DOWNLOAD CSV
===================================== */

function downloadCSV(

    fileName,

    csvData

) {

    const file =

    new Blob(

        [

            "\uFEFF" +

            csvData

        ],

        {

            type:

            "text/csv;charset=utf-8;"

        }

    );


    const link =

    document.createElement(

        "a"

    );


    const fileURL =

    URL.createObjectURL(

        file

    );


    link.href =

    fileURL;


    link.download =

    fileName;


    document.body.appendChild(

        link

    );


    link.click();


    document.body.removeChild(

        link

    );


    URL.revokeObjectURL(

        fileURL

    );

}


/* =====================================
   MEMBER REPORT
===================================== */

function downloadReport() {

    const members =

    getStorageData(

        "members"

    );


    if (

        members.length === 0

    ) {

        alert(

            "अभी कोई सदस्य उपलब्ध नहीं है।"

        );

        return;

    }


    let csv =

    "क्रमांक,Member ID,नाम,मोबाइल नंबर,सदस्यता,दिनांक,स्थिति\n";


    members.forEach(

        function (

            member,

            index

        ) {

            csv +=

            [

                index + 1,

                getMemberId(

                    member,

                    index

                ),

                getMemberName(

                    member

                ),

                getMemberMobile(

                    member

                ),

                getMemberMembership(

                    member

                ),

                getMemberDate(

                    member

                ),

                normalizeStatus(

                    member.status

                )

            ]

            .map(

                csvValue

            )

            .join(

                ","

            )

            +

            "\n";

        }

    );


    downloadCSV(

        "YSSF-Member-Report.csv",

        csv

    );


    alert(

        "✅ सदस्य रिपोर्ट डाउनलोड हो गई।"

    );

}


/* =====================================
   VOLUNTEER REPORT
===================================== */

function downloadVolunteerReport() {

    const volunteers =

    getStorageData(

        "volunteers"

    );


    if (

        volunteers.length === 0

    ) {

        alert(

            "अभी कोई वॉलंटियर उपलब्ध नहीं है।"

        );

        return;

    }


    let csv =

    "क्रमांक,Volunteer ID,नाम,मोबाइल,सेवा क्षेत्र,उपलब्धता,दिनांक,स्थिति\n";


    volunteers.forEach(

        function (

            volunteer,

            index

        ) {

            csv +=

            [

                index + 1,

                volunteer.volunteerId ||

                "VOL-" +

                (index + 1),

                volunteer.name,

                volunteer.mobile,

                volunteer.service ||

                volunteer.serviceArea,

                volunteer.availability,

                volunteer.date ||

                volunteer.applicationDate ||

                volunteer.createdAt,

                normalizeStatus(

                    volunteer.status

                )

            ]

            .map(

                csvValue

            )

            .join(

                ","

            )

            +

            "\n";

        }

    );


    downloadCSV(

        "YSSF-Volunteer-Report.csv",

        csv

    );


    alert(

        "✅ वॉलंटियर रिपोर्ट डाउनलोड हो गई।"

    );

}


/* =====================================
   CONTACT REPORT
===================================== */

function downloadContactReport() {

    const contacts =

    getStorageData(

        "contactMessages"

    );


    if (

        contacts.length === 0

    ) {

        alert(

            "अभी कोई संपर्क संदेश उपलब्ध नहीं है।"

        );

        return;

    }


    let csv =

    "क्रमांक,संदेश ID,नाम,मोबाइल,ईमेल,विषय,संदेश,दिनांक,स्थिति\n";


    contacts.forEach(

        function (

            contact,

            index

        ) {

            csv +=

            [

                index + 1,

                contact.contactId,

                contact.name,

                contact.mobile,

                contact.email,

                contact.subject,

                contact.message,

                contact.date ||

                contact.createdAt,

                contact.status ||

                "नया"

            ]

            .map(

                csvValue

            )

            .join(

                ","

            )

            +

            "\n";

        }

    );


    downloadCSV(

        "YSSF-Contact-Report.csv",

        csv

    );


    alert(

        "✅ संपर्क रिपोर्ट डाउनलोड हो गई।"

    );

}


/* =====================================
   PRINT MEMBER LIST
===================================== */

function printMemberList() {

    window.print();

}


/* =====================================
   CLEAR ALL DATA
===================================== */

function clearAllDashboardData() {

    const confirmDelete =

    confirm(

        "क्या आप सभी सदस्य, वॉलंटियर और संपर्क डेटा हटाना चाहते हैं? यह वापस नहीं आएगा।"

    );


    if (

        !confirmDelete

    ) {

        return;

    }


    const secondConfirm =

    confirm(

        "अंतिम पुष्टि: क्या आप सच में सभी डेटा हटाना चाहते हैं?"

    );


    if (

        !secondConfirm

    ) {

        return;

    }


    localStorage.removeItem(

        "members"

    );


    localStorage.removeItem(

        "volunteers"

    );


    localStorage.removeItem(

        "contactMessages"

    );


    loadMembers();

    loadVolunteers();

    loadContactMessages();

    updateDashboardStatistics();


    alert(

        "✅ सभी dashboard डेटा हटा दिया गया है।"

    );

}


/* =====================================
   SEARCH AND DATE FILTER EVENTS
===================================== */

function setupSearchFilters() {

    const inputIds = [

        "memberSearch",

        "memberDateSearch",

        "contactSearch",

        "contactDateSearch",

        "volunteerSearch",

        "volunteerDateSearch"

    ];


    inputIds.forEach(

        function (

            id

        ) {

            const input =

            document.getElementById(

                id

            );


            if (

                !input

            ) {

                return;

            }


            input.addEventListener(

                "input",

                function () {

                    loadMembers();

                    loadContactMessages();

                    loadVolunteers();

                }

            );


            input.addEventListener(

                "change",

                function () {

                    loadMembers();

                    loadContactMessages();

                    loadVolunteers();

                }

            );

        }

    );

}


/* =====================================
   CLOSE MODAL ON OUTSIDE CLICK
===================================== */

function setupModalClose() {

    const modals =

    document.querySelectorAll(

        ".dashboard-modal"

    );


    modals.forEach(

        function (

            modal

        ) {

            modal.addEventListener(

                "click",

                function (

                    event

                ) {

                    if (

                        event.target ===

                        modal

                    ) {

                        modal.style.display =

                        "none";

                    }

                }

            );

        }

    );

}


/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        loadMembers();

        loadContactMessages();

        loadVolunteers();

        updateDashboardStatistics();

        setupSearchFilters();

        setupMemberEditForm();

        setupPasswordForm();

        setupModalClose();

    }

);
/* =====================================
   ADMIN PASSWORD CHANGE
===================================== */

function openPasswordModal() {

    const passwordModal =

    document.getElementById(

        "passwordModal"

    );


    if (

        passwordModal

    ) {

        passwordModal.classList.add(

            "show"

        );

    }

}


/* =====================================
   CLOSE PASSWORD MODAL
===================================== */

function closePasswordModal() {

    const passwordModal =

    document.getElementById(

        "passwordModal"

    );


    if (

        passwordModal

    ) {

        passwordModal.classList.remove(

            "show"

        );

    }


    const passwordForm =

    document.getElementById(

        "passwordChangeForm"

    );


    if (

        passwordForm

    ) {

        passwordForm.reset();

    }

}


/* =====================================
   PASSWORD CHANGE FORM
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {


        const passwordForm =

        document.getElementById(

            "passwordChangeForm"

        );


        if (

            !passwordForm

        ) {

            return;

        }


        passwordForm.addEventListener(

            "submit",

            function (

                event

            ) {


                event.preventDefault();


                const oldPassword =

                document.getElementById(

                    "oldPassword"

                ).value.trim();


                const newPassword =

                document.getElementById(

                    "newPassword"

                ).value.trim();


                const confirmNewPassword =

                document.getElementById(

                    "confirmNewPassword"

                ).value.trim();


                /* =====================================
                   CURRENT PASSWORD
                ===================================== */

                const savedPassword =

                localStorage.getItem(

                    "adminPassword"

                ) ||

                "admin123";


                /* OLD PASSWORD CHECK */

                if (

                    oldPassword !==

                    savedPassword

                ) {

                    alert(

                        "❌ पुराना पासवर्ड गलत है।"

                    );


                    return;

                }


                /* NEW PASSWORD LENGTH */

                if (

                    newPassword.length < 4

                ) {

                    alert(

                        "❌ नया पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।"

                    );


                    return;

                }


                /* PASSWORD MATCH */

                if (

                    newPassword !==

                    confirmNewPassword

                ) {

                    alert(

                        "❌ नया पासवर्ड और दोबारा लिखा गया पासवर्ड एक जैसा नहीं है।"

                    );


                    return;

                }


                /* SAME PASSWORD CHECK */

                if (

                    newPassword ===

                    savedPassword

                ) {

                    alert(

                        "⚠️ नया पासवर्ड पुराने पासवर्ड से अलग रखें।"

                    );


                    return;

                }


                /* SAVE NEW PASSWORD */

                localStorage.setItem(

                    "adminPassword",

                    newPassword

                );


                alert(

                    "✅ एडमिन पासवर्ड सफलतापूर्वक बदल दिया गया है।"

                );


                closePasswordModal();


            }

        );


    }

);

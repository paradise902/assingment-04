// console.log("functionality.js is loaded");

// How many job cards we have on the page at the start
const totalCards = 8;

// Which tab is currently active: "all", "interview" or "rejected"
let activeTab = "all";


// Helper functions to read / write the DOM. 

// Write a number into a dashboard stat (Total / Interview / Rejected)
function setCount(id, value) {
    const el = document.getElementById(id);
    el.innerText = value;
}

// Read the data-status attribute of a card ("none" / "interview" / "rejected")
function getStatus(cardId) {
    const card = document.getElementById(cardId);
    return card.getAttribute("data-status");
}

// Write the data-status attribute of a card
// (Tailwind reads this attribute to colour the left border)
function setStatus(cardId, newStatus) {
    const card = document.getElementById(cardId);
    card.setAttribute("data-status", newStatus);
}



// UPDATE THE DASHBOARD COUNTS
// Loops through all 8 cards and counts how many of each status exist

function updateDashboard() {
    let total = 0;
    let interviewCount = 0;
    let rejectedCount = 0;

    for (let i = 1; i <= totalCards; i++) {
        const card = document.getElementById("job-" + i);

        // If the card was deleted, skip it
        if (card) {
            total = total + 1;
            const status = getStatus("job-" + i);

            if (status === "interview") {
                interviewCount = interviewCount + 1;
            }
            if (status === "rejected") {
                rejectedCount = rejectedCount + 1;
            }
        }
    }

    setCount("stat-total", total);
    setCount("stat-interview", interviewCount);
    setCount("stat-rejected", rejectedCount);

    updateJobsCount();
}



// UPDATE THE "X jobs" TEXT  (right side of "Available Jobs")
// Shows count of visible cards in the current tab

function updateJobsCount() {
    let count = 0;
    let total = 0;

    for (let i = 1; i <= totalCards; i++) {
        const card = document.getElementById("job-" + i);

        if (card) {
            total = total + 1;
            const status = getStatus("job-" + i);

            if (activeTab === "all") {
                count = count + 1;
            }
            else if (status === activeTab) {
                count = count + 1;
            }
        }
    }

    const jobsCountText = document.getElementById("jobs-count");
    jobsCountText.innerText = count + " of " + total + " jobs";

}   



// SHOW / HIDE CARDS BASED ON ACTIVE TAB
// Also shows the "No jobs available" empty state when needed

function filterCards() {
    let visibleCount = 0;

    for (let i = 1; i <= totalCards; i++) {
        const card = document.getElementById("job-" + i);

        if (card) {
            const status = getStatus("job-" + i);

            // Decide whether to show this card
            if (activeTab === "all") {
                card.classList.remove("hidden");
                visibleCount = visibleCount + 1;
            }
            else if (status === activeTab) {
                card.classList.remove("hidden");
                visibleCount = visibleCount + 1;
            }
            else {
                card.classList.add("hidden");
            }
        }
    }

    // Show or hide the "No jobs available" message
    const emptyState = document.getElementById("empty-state");

    if (visibleCount === 0) {
        emptyState.classList.remove("hidden");
    }
    else {
        emptyState.classList.add("hidden");
    }

    updateJobsCount();
}



// MARK A CARD AS INTERVIEW OR REJECTED

function markCard(cardNumber, newStatus) {
    // 1. Update data-status on the card (Tailwind uses this for border colour)
    setStatus("job-" + cardNumber, newStatus);

    // 2. Update the status badge next to the job title
    const badge = document.getElementById("badge-" + cardNumber);
    badge.classList.remove("hidden");
    badge.classList.remove("badge-success");
    badge.classList.remove("badge-error");

    if (newStatus === "interview") {
        badge.classList.add("badge-success");
        badge.innerText = "Interview";
    }
    else {
        badge.classList.add("badge-error");
        badge.innerText = "Rejected";
    }

    // 3. Update the two action buttons
    //    Active button   = filled  → remove "btn-outline"
    //    Inactive button = outline → keep / add "btn-outline"
    const interviewBtn = document.getElementById("interview-btn-" + cardNumber);
    const rejectedBtn  = document.getElementById("rejected-btn-" + cardNumber);

    if (newStatus === "interview") {
        interviewBtn.classList.remove("btn-outline");
        rejectedBtn.classList.add("btn-outline");
    }
    else {
        rejectedBtn.classList.remove("btn-outline");
        interviewBtn.classList.add("btn-outline");
    }

    // 4. Refresh dashboard counts and the visible cards
    updateDashboard();
    filterCards();
}



// DELETE A CARD

function deleteCard(cardNumber) {
    const card = document.getElementById("job-" + cardNumber);
    card.remove();

    updateDashboard();
    filterCards();
}



// SWITCH TABS

function switchTab(tabName) {
    activeTab = tabName;

    // Remove the active style from all 3 tabs
    document.getElementById("tab-all").classList.remove("tab-active");
    document.getElementById("tab-interview").classList.remove("tab-active");
    document.getElementById("tab-rejected").classList.remove("tab-active");

    // Add the active style to the clicked tab
    document.getElementById("tab-" + tabName).classList.add("tab-active");

    filterCards();
}



// ATTACH EVENT LISTENERS TO ALL 8 CARDS
// One loop sets up 24 listeners (3 buttons × 8 cards)

for (let i = 1; i <= totalCards; i++) {

    // Interview button click
    document.getElementById("interview-btn-" + i).addEventListener("click", function() {
        markCard(i, "interview");
    });

    // Rejected button click
    document.getElementById("rejected-btn-" + i).addEventListener("click", function() {
        markCard(i, "rejected");
    });

    // Delete button click
    document.getElementById("delete-btn-" + i).addEventListener("click", function() {
        deleteCard(i);
    });
}



// ATTACH EVENT LISTENERS TO THE TABS

document.getElementById("tab-all").addEventListener("click", function() {
    switchTab("all");
});

document.getElementById("tab-interview").addEventListener("click", function() {
    switchTab("interview");
});

document.getElementById("tab-rejected").addEventListener("click", function() {
    switchTab("rejected");
});
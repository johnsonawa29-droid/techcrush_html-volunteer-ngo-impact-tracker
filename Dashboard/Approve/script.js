document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 1. COUNTDOWN TIMER
    // =========================

    // Set a future date (you can change this)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10); // 10 days from now

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Update HTML
        const timerBoxes = document.querySelectorAll(".timer span");

        if (timerBoxes.length >= 3) {
            timerBoxes[0].innerText = days;
            timerBoxes[1].innerText = hours;
            timerBoxes[2].innerText = minutes;
        }

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector(".timer-card h3").innerText = "Deadline Passed";
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();


    // =========================
    // 2. CHECKLIST SAVE (Local Storage)
    // =========================

    const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");

    // Load saved state
    checkboxes.forEach((box, index) => {
        const saved = localStorage.getItem("check_" + index);
        if (saved === "true") {
            box.checked = true;
        }

        // Save on change
        box.addEventListener("change", () => {
            localStorage.setItem("check_" + index, box.checked);
        });
    });


    // =========================
    // 3. BUTTON ACTIONS
    // =========================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            alert("Button clicked: " + this.innerText);
        });
    });


    // =========================
    // 4. DOWNLOAD BUTTON
    // =========================

    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {
            const text = `
Application Details

Name: John Doe
Role: Community Volunteer
Status: Approved
Date: 12 June 2026
            `;

            const blob = new Blob([text], { type: "text/plain" });
            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);
            link.download = "application-details.txt";
            link.click();
        });
    }

});
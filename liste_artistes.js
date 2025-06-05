import artists from './artistes.js'; // Assuming artistes.js exports the artistes object

let artistes = artists;
document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const artistList = document.getElementById("artistList");
    const monthDisplay = document.getElementById("monthDisplay");
    let currentMonth = 6; // July (0-based index)
    let currentYear = 2026;

    // Function to calculate distance (mock implementation)
    function calculateDistance(location1, location2) {
        // Replace with actual distance calculation logic (e.g., using an API)
        return Math.floor(Math.random() * 400) + 10; // Mock distance in km
    }

    // Update calendar display
    function updateCalendar() {
        calendar.innerHTML = ""; // Clear previous calendar
        monthDisplay.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const button = document.createElement("button");
            button.textContent = day;
            button.dataset.date = date;
            button.classList.add("calendar-day");
            button.addEventListener("click", () => displayArtists(date));
            calendar.appendChild(button);
        }
    }

    // Display artists not available on the selected date
    function displayArtists(date) {
        artistList.innerHTML = ""; // Clear previous list
        const formattedDate = date.split("-").reverse().join("/"); // Convert to DD/MM/YYYY
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1);
        const formattedPreviousDate = previousDate.toISOString().split("T")[0].split("-").reverse().join("/");

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        const formattedNextDate = nextDate.toISOString().split("T")[0].split("-").reverse().join("/");

        Object.values(artistes).forEach(artist => {
            if (!artist.tournées || !artist.tournées[formattedDate]) {
                const button = document.createElement("button");
                button.textContent = `${artist.name} (${artist.genre})`;
                button.classList.add("artist-button");
                button.addEventListener("click", () => {
                    window.location.href = `${artist.name.replace(/\s+/g, '_')}.html`;
                });
                let ydistanceToParis, tdistanceToParis = -1;
                // Check for the previous day's entry
                if (artist.tournées && artist.tournées[formattedPreviousDate]) {
                    const previousLocation = artist.tournées[formattedPreviousDate].location;
                    ydistanceToParis = calculateDistance(previousLocation, "Paris");
                    const distanceInfo = document.createElement("span");
                    distanceInfo.textContent = ` - yesterday's event: ${ydistanceToParis} km`;
                    button.appendChild(distanceInfo);

                    if (ydistanceToParis < 200) {
                        button.style.backgroundColor = "green";
                    }
                }

                // Check for the next day's entry
                if (artist.tournées && artist.tournées[formattedNextDate]) {
                    const nextLocation = artist.tournées[formattedNextDate].location;
                    tdistanceToParis = calculateDistance(nextLocation, "Paris");
                    const distanceInfo = document.createElement("span");
                    distanceInfo.textContent = ` - tomorrow's event: ${tdistanceToParis} km`;
                    button.appendChild(distanceInfo);

                    if (tdistanceToParis < 200) {
                        button.style.backgroundColor = "green";
                    }
                }
                if (ydistanceToParis >= 0 && tdistanceToParis >= 0) {
                    const dist = ydistanceToParis + tdistanceToParis;
                    console.log(`Distance for ${artist.name} on ${formattedDate}: ${dist} km`);
                    if (dist < 300) {
                        button.style.backgroundColor = "gold";
                    }

                }

                artistList.appendChild(button);
            }
        });
    }

    // Add navigation buttons
    document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Initialize calendar
    updateCalendar();
});

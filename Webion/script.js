document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const course = document.getElementById("course").value;
    const status = document.getElementById("status").value;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number");
        return;
    }

    // Create user card
    const userContainer = document.getElementById("usersContainer");
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.style.backgroundColor = "skyblue";
    userCard.style.color = "black";
    userCard.style.padding = "15px";
    userCard.style.margin = "10px";
    userCard.style.borderRadius = "10px";
    userCard.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    userCard.style.fontFamily = "Arial, sans-serif";

    userCard.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>Role: ${role}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Course: ${course}</p>
        <p>Status: ${status}</p>
        <button class="delete-btn" style="background-color: red; color: white; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer;">Delete</button>
    `;

    // Delete function
    userCard.querySelector(".delete-btn").addEventListener("click", function () {
        userContainer.removeChild(userCard);
        updateStudentCount(-1, status);
    });

    userContainer.appendChild(userCard);

    // Update student count
    updateStudentCount(1, status);

    // Reset form
    document.getElementById("userForm").reset();
});

// Function to update student count
function updateStudentCount(change, status) {
    let totalStudents = localStorage.getItem("totalStudents") ? parseInt(localStorage.getItem("totalStudents")) : 0;
    let placedStudents = localStorage.getItem("placedStudents") ? parseInt(localStorage.getItem("placedStudents")) : 0;
    let unplacedStudents = localStorage.getItem("unplacedStudents") ? parseInt(localStorage.getItem("unplacedStudents")) : 0;

    totalStudents += change;
    
    if (status.toLowerCase() === "placed") {
        placedStudents += change;
    } else {
        unplacedStudents += change;
    }

    // Prevent negative values
    totalStudents = Math.max(0, totalStudents);
    placedStudents = Math.max(0, placedStudents);
    unplacedStudents = Math.max(0, unplacedStudents);

    // Store updated values
    localStorage.setItem("totalStudents", totalStudents);
    localStorage.setItem("placedStudents", placedStudents);
    localStorage.setItem("unplacedStudents", unplacedStudents);

    // Update display on stats page
    localStorage.setItem("updateStats", "true"); // Set flag for update
}


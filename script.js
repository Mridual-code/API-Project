const userContainer = document.getElementById("userContainer");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const searchInput = document.getElementById("searchInput");

let users = [];

// Fetch users from API
async function fetchUsers() {
    try {
        loading.style.display = "block";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        users = await response.json();

        displayUsers(users);
    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        loading.style.display = "none";
    }
}

// Display users
function displayUsers(userList) {
    userContainer.innerHTML = "";

    userList.forEach(user => {
        const card = document.createElement("div");

        card.classList.add("user-card");

        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Company:</strong> ${user.company.name}</p>
        `;

        userContainer.appendChild(card);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText)
    );

    displayUsers(filteredUsers);
});

fetchUsers();
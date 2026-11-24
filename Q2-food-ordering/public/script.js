const API_KEY = "12345";
const headers = { "Content-Type": "application/json", "x-api-key": API_KEY };

const form = document.getElementById("menuForm");
const table = document.getElementById("menuTable");
const restaurantSelect = document.getElementById("restaurant");

// load restaurants into the dropdown (GET /restaurants)
const loadRestaurants = async () => {
  const res = await fetch("/restaurants");
  const restaurants = await res.json();

  restaurants.forEach((r) => {
    restaurantSelect.innerHTML += `<option value="${r.id}">${r.name}</option>`;
  });
};

// load menu items into the table (GET /menu-items)
const loadMenuItems = async () => {
  const res = await fetch("/menu-items", { headers });
  const items = await res.json();

  table.innerHTML = items.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>Rs. ${item.price}</td>
      <td>${item.restaurant.name}</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${item.id})">Delete</button></td>
    </tr>
  `).join("");
};

// add menu item (POST /menu-items)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const restaurantId = restaurantSelect.value;

  // validation
  if (name === "" || price === "" || restaurantId === "") {
    alert("Please fill all fields");
    return;
  }
  if (Number(price) <= 0) {
    alert("Price must be a positive number");
    return;
  }

  await fetch("/menu-items", {
    method: "POST",
    headers,
    body: JSON.stringify({ name, price: Number(price), restaurantId: Number(restaurantId) }),
  });

  form.reset();
  loadMenuItems();
});

// delete menu item (DELETE /menu-items/:id)
const deleteItem = async (id) => {
  await fetch(`/menu-items/${id}`, { method: "DELETE", headers });
  loadMenuItems();
};

loadRestaurants();
loadMenuItems();

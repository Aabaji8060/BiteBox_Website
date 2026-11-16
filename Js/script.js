/*console.log("Bitebox Javascript is working");
let resturantName = "BiteBox";
alert("Welcome to " + resturantName + "Enjoy Your Meal!");

let customerName = prompt("Please enter your name:");
alert("Hello " + customerName + ", thank you for visiting to " + resturantName + "!");

let exploreMenu = confirm("Would you like to explore our menu?");
if (exploreMenu) {
  alert("Great! Let's explore our menu.");
}
else {
    alert("No worries! Feel free to explore our menu anytime.");
}

let choice = prompt("Please enter your item:\n" + "1. Burger\n" + "2. Pizza\n" + "3. Sandwich\n" + "4. pasta\n" + "5. fries\n");
switch (choice) {
    case "1":
        alert("You have selected Burger. Enjoy your meal!");
        break;
    case "2":
        alert("You have selected Pizza. Enjoy your meal!");
        break;
    case "3":
        alert("You have selected Sandwich. Enjoy your meal!");
        break;
    case "4":
        alert("You have selected Pasta. Enjoy your meal!");
        break;
    case "5":
        alert("You have selected Fries. Enjoy your meal!");
        break;
    default:
        alert("Invalid choice. Please select a valid item.");
}

let order=prompt("Please enter how many items you want to order:");
alert("You have ordered: " + order + " items. Thank you for your order!");
for(let i = 1; i <= order; i++) {
    let item = prompt("Please enter item " + i + ":");
    let quantity = prompt("Please enter quantity for " + item + ":");
    console.log("Item " + i + ": " + item + ", Quantity: " + quantity);
}*/

function calculateTotalPrice(price, quantity) {
    return price * quantity;
}
if(document.getElementById("menu-search-form")) {
let customerName = prompt("Welcome to  BiteBox! Please enter your name:");
let cartrows = document.querySelectorAll("#shopping-cart tbody tr");
alert("Hello " + customerName + ", thank you for visiting BiteBox! Enjoy your meal!");
let exploreMenu = confirm("Would you like to explore our menu?");
}

function calculatesubtotal() {
    let subtotal = 0;
    let cartrows = document.querySelectorAll("#shopping-cart tbody tr");

cartrows.forEach(function(row) {
    let priceText = row.children[1].textContent;
    let price = parseFloat(priceText.replace(/[^\d.]/g, ""));
    let quantityText= row.querySelector(".quantity-box span").textContent;
    let quantity = parseInt(quantityText);
    let itemTotal = calculateTotalPrice(price, quantity);
    subtotal += itemTotal;
});
return subtotal;
}

function calculateDeliveryCharge(subtotal) {
    if(subtotal === 0) {
        return 0.00;
    }
    return 50.00;
}

function calculatePackagingCharge(subtotal) {
    if(subtotal === 0) {
        return 0.00;
    }
    return 20.00;
}

function calculateDiscount(subtotal) {
    if(subtotal > 500) {
        return subtotal * 0.10;
    }
    return 0.00;
}   

function calculateTotalAmount(subtotal, deliveryCharge, packagingCharge, discount) {
    return subtotal + deliveryCharge + packagingCharge - discount;
}   

function updateOrdersummary() {
    let subtotal = calculatesubtotal();
    let deliveryCharge = calculateDeliveryCharge(subtotal);
    let packagingCharge = calculatePackagingCharge(subtotal);
    let discount = calculateDiscount(subtotal);
    let totalAmount = calculateTotalAmount(subtotal, deliveryCharge, packagingCharge, discount);
    document.getElementById("subtotal-amount").textContent = "₹ " + subtotal.toFixed(2);
    document.getElementById("delivery-charge-amount").textContent = "₹ " + deliveryCharge.toFixed(2);
    document.getElementById("packaging-charge-amount").textContent = "₹ " + packagingCharge.toFixed(2);
    document.getElementById("discount-amount").textContent = "₹ " + discount.toFixed(2);
    document.getElementById("total-amount").textContent = "₹ " + totalAmount.toFixed(2);

}   
if(document.getElementById("shopping-cart") && document.getElementById("subtoatal-amount")) {
updateOrdersummary();
}

let menuCards=document.querySelectorAll("#Menu-items article");
let searchinput=document.getElementById("menu-search");
let searchForm=document.getElementById("menu-search-form");

function searchMenu(searchText) 
{
    let searchValue=searchText.trim().toLowerCase();
    menuCards.forEach(function(card)
    {
        let CardTitles=card.querySelector("h3").textContent.trim().toLowerCase();
        if(CardTitles.includes(searchValue))
        {
            card.style.display=""
        }
        else
        {
            card.style.display="none"
        }
    });
}

if(searchForm && searchinput)
{
    searchinput.addEventListener("input",function()
    {
        searchMenu(searchinput.value);
    });

    searchForm.addEventListener("submit",function(event)
    {
        event.preventDefault();
        let searchText=searchinput.value;
        searchMenu(searchText)
    });
}

/*Theme mode*/
let themeButton=document.getElementById("theme-toggle");
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    let themeIcon=themeButton.querySelector(".theme-icon");
    let themeText=themeButton.querySelector(".theme-text");
    let isDarkTheme=document.body.classList.contains("dark-mode");

    if (isDarkTheme) {
        themeIcon.textContent="\u263E";
        themeText.textContent="Light Mode";
        themeButton.setAttribute("aria-label","Light");
        localStorage.setItem("bitebox-theme","dark");
    }
    else {
        themeText.textContent="Dark Mode";
        themeIcon.textContent="\u2600";
        themeButton.setAttribute("aria-label", "Dark");
        localStorage.setItem("bitebox-theme","light");
    }
    themeButton.setAttribute("aria-pressed",String(isDarkTheme));
}

function loadTheme() {
    let savedTheme=localStorage.getItem("bitebox-theme");
    let isDarkTheme=savedTheme==="dark";

    document.body.classList.toggle("dark-mode",isDarkTheme);
    if(themeButton) {
        let themeIcon=themeButton.querySelector(".theme-icon");
        let themeText=themeButton.querySelector(".theme-text");

        themeIcon.textContent=isDarkTheme?"\u263E":"\u2600";
        themeText.textContent=isDarkTheme?"Light Mode":"Dark Mode";
        themeButton.setAttribute("aria-pressed",String(isDarkTheme));
        themeButton.setAttribute("aria-label",
            isDarkTheme?"Light":"Dark");
        themeButton.addEventListener("click",toggleTheme);
    }
}

loadTheme();


// 1. MockAPI URL
const API_URL = "https://6a86d1d070fbbd308f9857a5.mockapi.io/menu/menu";

// 2. Get HTML Elements
const menuContainer = document.getElementById("menu-container");
const menuForm = document.getElementById("menu-form");
const menuModal = document.getElementById("menu-modal");
const addMenuBtn = document.getElementById("add-menu-btn");

let updateMenuId = null;

// 3. Open and Close Modal
addMenuBtn.addEventListener("click", () => {
    updateMenuId = null;
    menuForm.reset();
    document.getElementById("modal-title").textContent = "Add Menu Item";
    menuModal.classList.add("show");
});

document.getElementById("cancel-menu-form").addEventListener("click", () => {
    menuModal.classList.remove("show");
});

// 4. Display Menu Cards
function displayMenuItems(items) {
    items.forEach(item => {
        const card = document.createElement("article");

        card.className = "api-menu-card";
        card.dataset.id = item.id;
        card.dataset.category = item.category;

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="rating">${item.rating}
                <small>(${item.reviews})</small>
            </p>
            <p class="price">₹${item.price}</p>

            <div class="menu-actions">
                <button type="button" class="update-menu-btn">Edit</button>
                <button type="button" class="delete-menu-btn">Delete</button>
            </div>

            <button type="button" class="add-to-cart">
                Add to Cart
            </button>
        `;

        menuContainer.appendChild(card);
    });
}

// 5. GET - Fetch Menu Items
async function fetchMenuItems() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Fetch failed");

        const items = await response.json();

        menuContainer.querySelectorAll(".api-menu-card")
            .forEach(card => card.remove());

        displayMenuItems(items);
        applyFilters();

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// 6. POST / PUT - Add or Update Menu Item
menuForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const menuItem = {
        name: document.getElementById("menu-name").value,
        price: document.getElementById("menu-price").value,
        category: document.getElementById("menu-category").value,
        rating: document.getElementById("menu-rating").value,
        reviews: document.getElementById("menu-reviews").value,
        image: document.getElementById("menu-image").value
    };

    try {
        const isUpdate = updateMenuId !== null;

        const response = await fetch(
            isUpdate ? `${API_URL}/${updateMenuId}` : API_URL,
            {
                method: isUpdate ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(menuItem)
            }
        );

        if (!response.ok) throw new Error("Save failed");

        await response.json();

        menuForm.reset();
        menuModal.classList.remove("show");
        updateMenuId = null;

        fetchMenuItems();

    } catch (error) {
        console.error("Save Error:", error);
    }
});

// 7. UPDATE / DELETE - Event Delegation
menuContainer.addEventListener("click", async (event) => {

    const card = event.target.closest(".api-menu-card");
    if (!card) return;

    const id = card.dataset.id;

    // UPDATE
    if (event.target.closest(".update-menu-btn")) {

        updateMenuId = id;

        document.getElementById("menu-name").value =
            card.querySelector("h3").textContent;

        document.getElementById("menu-price").value =
            card.querySelector(".price").textContent.replace("₹", "");

        document.getElementById("menu-category").value =
            card.dataset.category;

        document.getElementById("menu-rating").value =
            card.querySelector(".rating").childNodes[0].textContent.trim();

        document.getElementById("menu-reviews").value =
            card.querySelector(".rating small").textContent.replace(/[()]/g, "");

        document.getElementById("menu-image").value =
            card.querySelector("img").getAttribute("src");

        document.getElementById("modal-title").textContent =
            "Update Menu Item";

        menuModal.classList.add("show");
    }

    // DELETE
    if (event.target.closest(".delete-menu-btn")) {

        if (!confirm("Delete this menu item?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Delete failed");

            card.remove();

        } catch (error) {
            console.error("Delete Error:", error);
        }
    }
});

// 8. SEARCH AND CATEGORY FILTER
let searchText = "";
let selectedCategory = "all";

function applyFilters() {
    menuContainer.querySelectorAll("article").forEach(card => {

        const name = card.querySelector("h3").textContent.toLowerCase();
        const category = (card.dataset.category || "").toLowerCase();

        card.style.display =
            name.includes(searchText) &&
            (selectedCategory === "all" || category === selectedCategory)
                ? ""
                : "none";
    });
}

// Search
document.getElementById("menu-search").addEventListener("input", (event) => {
    searchText = event.target.value.trim().toLowerCase();
    applyFilters();
});

// Category Filter
function filterMenu(category) {
    selectedCategory = category.toLowerCase();
    applyFilters();
}

// 9. Load Menu When Page Opens
fetchMenuItems();

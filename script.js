// ================================
// GREENLEAF NURSERY - SCRIPT.JS
// ================================


// =================================
// ADD TO CART
// =================================

function addToCart(name, price, image) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    window.location.href = "cart.html";
}


// =================================
// LOAD CART
// =================================

function loadCart() {

    const cartContainer =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    if (!cartContainer) {
        return;
    }

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div style="text-align:center; padding:30px;">

                <h2>🛒 Your Cart is Empty</h2>

                <p>
                    Add some beautiful plants to your cart.
                </p>

                <a href="index.html">
                    <button>Start Shopping</button>
                </a>

            </div>
        `;

        if (totalElement) {
            totalElement.innerText = "₹0";
        }

        return;
    }


    cart.forEach((item, index) => {

        const itemTotal =
            Number(item.price) *
            Number(item.quantity);

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    style="
                        width:100px;
                        height:100px;
                        object-fit:cover;
                        border-radius:10px;
                    "
                >

            </div>


            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>Price: ₹${item.price}</p>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <p>
                    Total:
                    <strong>₹${itemTotal}</strong>
                </p>

                <button
                    onclick="removeFromCart(${index})"
                    style="
                        background:#e53935;
                        color:white;
                        border:none;
                        padding:8px 15px;
                        border-radius:5px;
                        cursor:pointer;
                    "
                >
                    Remove
                </button>

            </div>

        `;

        cartContainer.appendChild(cartItem);

    });


    if (totalElement) {

        totalElement.innerText =
            "₹" + total;

    }

}


// =================================
// INCREASE QUANTITY
// =================================

function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {

        cart[index].quantity += 1;

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}


// =================================
// DECREASE QUANTITY
// =================================

function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart[index]) {

        if (cart[index].quantity > 1) {

            cart[index].quantity -= 1;

        } else {

            cart.splice(index, 1);

        }

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}


// =================================
// REMOVE FROM CART
// =================================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();
}


// =================================
// CANCEL ORDER
// =================================

function cancelOrder(index) {

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    orders.splice(index, 1);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();
}


// =================================
// LOAD ORDERS
// =================================

function loadOrders() {

    const ordersContainer =
        document.getElementById("ordersList");


    if (!ordersContainer) {
        return;
    }


    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    ordersContainer.innerHTML = "";


    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
            ">

                <h2>📦 No Orders Found</h2>

                <p>
                    You don't have any orders yet.
                </p>

                <a href="index.html">
                    <button>Start Shopping</button>
                </a>

            </div>
        `;

        return;
    }


    orders.forEach((order, index) => {

        const orderDiv =
            document.createElement("div");


        orderDiv.className =
            "order-card";


        orderDiv.innerHTML = `

            <h3>📦 Order #${index + 1}</h3>

            <p>
                <strong>Plant:</strong>
                ${order.name || "Plant"}
            </p>

            <p>
                <strong>Price:</strong>
                ₹${order.price || 0}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${order.quantity || 1}
            </p>

            <p>
                <strong>Status:</strong>
                ${order.status || "Ordered"}
            </p>

            <button
                onclick="cancelOrder(${index})"
                style="
                    background:#e53935;
                    color:white;
                    border:none;
                    padding:10px 18px;
                    border-radius:6px;
                    cursor:pointer;
                "
            >
                Cancel Order
            </button>

        `;


        ordersContainer.appendChild(orderDiv);

    });

}


// =================================
// GO TO CHECKOUT
// =================================

function goCheckout() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a plant first."
        );

        return;
    }


    window.location.href =
        "checkout.html";
}


// =================================
// SEARCH PLANTS
// =================================

function searchPlants() {

    const searchInput =
        document.getElementById("plantSearch");

    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    const cards =
        document.querySelectorAll(".plant-card");


    let found = false;


    cards.forEach(card => {

        const name =
            card.querySelector("h3");


        if (!name) {
            return;
        }


        const plantName =
            name.innerText.toLowerCase();


        if (
            plantName.includes(searchText)
        ) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    let noResult =
        document.getElementById("noPlants");


    if (!noResult) {

        noResult =
            document.createElement("p");

        noResult.id = "noPlants";

        noResult.style.textAlign =
            "center";

        noResult.style.fontSize =
            "18px";

        const container =
            document.querySelector(".plant-container");

        if (container) {
            container.after(noResult);
        }

    }


    if (
        searchText !== "" &&
        !found
    ) {

        noResult.innerText =
            "❌ No plants found.";

    } else {

        noResult.innerText =
            "";

    }

}


// =================================
// VIEW PLANT DETAILS
// =================================

function viewPlant(
    name,
    price,
    description,
    light,
    water,
    image
) {

    const selectedPlant = {

        name: name,

        price: price,

        description: description,

        light: light,

        water: water,

        image: image

    };


    localStorage.setItem(
        "selectedPlant",
        JSON.stringify(selectedPlant)
    );


    window.location.href =
        "plant-details.html";
}


// =================================
// LOAD PLANT DETAILS
// =================================

function loadPlantDetails() {

    const detailsContainer =
        document.getElementById(
            "plantDetails"
        );


    if (!detailsContainer) {
        return;
    }


    const plant =
        JSON.parse(
            localStorage.getItem(
                "selectedPlant"
            )
        );


    if (!plant) {

        detailsContainer.innerHTML = `
            <h2>Plant not found</h2>

            <a href="indoor.html">
                Go Back
            </a>
        `;

        return;
    }


    detailsContainer.innerHTML = `

        <img
            src="${plant.image}"
            alt="${plant.name}"
            style="
                width:100%;
                max-width:500px;
                height:450px;
                object-fit:cover;
                border-radius:15px;
            "
        >

        <h1>${plant.name}</h1>

        <h2>₹${plant.price}</h2>

        <p>
            ${plant.description || "Beautiful plant for your home and garden."}
        </p>

        <p>
            ☀️ Light:
            ${plant.light || "Moderate sunlight"}
        </p>

        <p>
            💧 Water:
            ${plant.water || "Moderate watering"}
        </p>

        <button
            onclick="addToCart(
                '${plant.name}',
                ${plant.price},
                '${plant.image}'
            )"
        >
            🛒 Add to Cart
        </button>

    `;
}


// ======================================================
// NEW FEATURE
// LOAD PLANTS ADDED FROM ADMIN PANEL
// ======================================================

function loadAdminPlants() {

    /*
       Only load these plants on index.html
       so other pages are not affected.
    */

    const currentPage =
        window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    if (
        currentPage !== "index.html" &&
        currentPage !== ""
    ) {
        return;
    }


    const container =
        document.querySelector(
            ".plant-container"
        );


    if (!container) {
        return;
    }


    let plants =
        JSON.parse(
            localStorage.getItem(
                "greenleafPlants"
            )
        ) || [];


    if (plants.length === 0) {
        return;
    }


    /*
       Add heading before newly added plants
    */

    const heading =
        document.createElement("h2");

    heading.innerHTML =
        "🌱 Newly Added Plants";

    heading.style.textAlign =
        "center";

    heading.style.width =
        "100%";


    /*
       Create separate section
    */

    const newPlantContainer =
        document.createElement("div");

    newPlantContainer.className =
        "plant-container";


    newPlantContainer.style.marginTop =
        "20px";


    newPlantContainer.style.display =
        "grid";


    newPlantContainer.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(220px, 1fr))";


    newPlantContainer.style.gap =
        "20px";


    /*
       Create cards
    */

    plants.forEach(function(plant) {

        const card =
            document.createElement("div");

        card.className =
            "plant-card";


        card.innerHTML = `

            <img
                src="${plant.image}"
                alt="${plant.name}"
                style="
                    width:100%;
                    height:220px;
                    object-fit:cover;
                    border-radius:10px;
                "
            >

            <h3>
                ${plant.name}
            </h3>

            <p>
                ${plant.category}
            </p>

            <h4>
                ₹${plant.price}
            </h4>

            <button
                class="details-btn"
                onclick="viewAdminPlant(${plant.id})"
            >
                View Details
            </button>

            <button
                onclick="addToCart(
                    '${escapePlantText(plant.name)}',
                    ${Number(plant.price) || 0},
                    '${escapePlantText(plant.image)}'
                )"
            >
                Add to Cart
            </button>

        `;


        newPlantContainer.appendChild(card);

    });


    /*
       Add new plants after existing popular plants
    */

    container.insertAdjacentElement(
        "afterend",
        heading
    );


    heading.insertAdjacentElement(
        "afterend",
        newPlantContainer
    );

}


// =================================
// ESCAPE TEXT FOR BUTTONS
// =================================

function escapePlantText(text) {

    if (!text) {
        return "";
    }

    return String(text)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}


// =================================
// VIEW ADMIN ADDED PLANT
// =================================

function viewAdminPlant(id) {

    let plants =
        JSON.parse(
            localStorage.getItem(
                "greenleafPlants"
            )
        ) || [];


    const plant =
        plants.find(
            item => Number(item.id) === Number(id)
        );


    if (!plant) {

        alert(
            "Plant details not found."
        );

        return;
    }


    const selectedPlant = {

        name:
            plant.name,

        price:
            plant.price,

        description:
            plant.description ||
            "Beautiful plant available at GreenLeaf Nursery.",

        light:
            plant.sunlight ||
            "Moderate sunlight",

        water:
            plant.watering ||
            "Moderate watering",

        image:
            plant.image,

        type:
            plant.category,

        diseases:
            plant.diseases || ""

    };


    localStorage.setItem(
        "selectedPlant",
        JSON.stringify(selectedPlant)
    );


    window.location.href =
        "plant-details.html";
}


// =================================
// RUN WHEN PAGE LOADS
// =================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCart();

        loadPlantDetails();

        loadOrders();

        /*
           NEW:
           Load plants added through
           Admin Panel
        */

        loadAdminPlants();

    }
);
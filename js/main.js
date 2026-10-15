const API = "https://dummyjson.com/products?limit=0";
const Category_API = "https://dummyjson.com/products/categories";

let productsContainer = document.querySelector("#products-container")
let categoryFilters = document.querySelector("#category-filters")
const wishlistContainer = document.querySelector("#wishlist-container");
const cartContainer = document.querySelector("#cart-container");

console.log("cartContainer =", cartContainer);

let allCategory = [];

let wishlistProducts =
    JSON.parse(localStorage.getItem("favouriteProduct")) || [];

let cartProducts =
    JSON.parse(localStorage.getItem("cartProduct")) || [];

async function products(url) {
    productsContainer.innerHTML = "loading...";

    let response = await fetch(url)
    let data = await response.json()

    renderProducts(data.products)
}


async function categories() {

    let response = await fetch(Category_API)
    let data = await response.json()

    allCategory = [
        {
            name: "all",
            slug: "all",
            url: API
        },
        ...data
    ];

    renderCategories()
}

async function loadProductImage() {

    const productDetailContainer =
        document.querySelector("#product-detail-container");

    if (!productDetailContainer) {
        return;
    }

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const url = `https://dummyjson.com/products/${id}`;

    productDetailContainer.innerHTML = "loading...";

    let response = await fetch(url)

    let data = await response.json()

    if (data.message) {

        productDetailContainer.innerHTML =
            "Failed to Load Products"

    }

    const {
        thumbnail,
        category,
        price,
        reviews,
        title,
        description,
        rating
    } = data;


    const card = `

        <div class="grid items-start grid-cols-1 gap-10 md:grid-cols-2">

            <div class="bg-white border border-slate-200 rounded-lg p-8 flex items-center justify-center min-h-[350px] md:min-h-[440px]">

                <img 
                    src="${thumbnail}"
                    alt="${title}" 
                    class="object-contain max-w-full max-h-96"
                >

            </div>


            <div class="flex flex-col">

                <div>

                    <span class="inline-block mb-2 text-xs font-semibold tracking-wider text-teal-700 uppercase">

                        ${category}

                    </span>

                </div>


                <h1 class="mb-3 text-2xl font-bold leading-tight sm:text-3xl text-slate-900">

                    ${title}

                </h1>


                <div class="flex items-center gap-1 mb-4">

                    <div class="flex items-center">

                        <svg class="w-5 h-5 fill-current text-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>

                        <svg class="w-5 h-5 fill-current text-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>

                        <svg class="w-5 h-5 fill-current text-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>

                    </div>

                    <span class="ml-2 text-sm font-medium text-slate-500">

                        ${rating} (${reviews.length} reviews)

                    </span>

                </div>


                <div class="mb-6">

                    <span class="text-2xl font-bold sm:text-3xl text-slate-900">

                        ₹${(price * 96.29).toFixed(2)}

                    </span>

                </div>


                <div class="py-6 mb-6 border-t border-b border-slate-200">

                    <p class="text-base leading-relaxed text-slate-600">

                        ${description}

                    </p>

                </div>


                <div class="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">


                    <div class="flex items-center bg-white border rounded-md border-slate-300 w-fit">

                        <button 
                            type="button" 
                            id="qty-minus" 
                            class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-md transition"
                        >
                            -
                        </button>


                        <span 
                            id="qty-value" 
                            class="w-12 text-sm font-semibold text-center select-none text-slate-900"
                        >
                            1
                        </span>


                        <button 
                            type="button" 
                            id="qty-plus" 
                            class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-md transition"
                        >
                            +
                        </button>

                    </div>


                    <button 
                        type="button" 
                        id="add-to-cart-btn" 
                        class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-md shadow-sm transition"
                    >
                        Add to Cart
                    </button>


                    <button 
                        type="button" 
                        id="add-to-wishlist-btn" 
                        class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-teal-700 text-teal-700 hover:bg-teal-50 font-medium py-2.5 px-6 rounded-md shadow-sm transition"
                    >
                        Add to Wishlist
                    </button>

                </div>

            </div>

        </div>

    `;


    productDetailContainer.innerHTML = card;


    const addToWishlistBtn =
        document.querySelector("#add-to-wishlist-btn")


    addToWishlistBtn.addEventListener("click", e => {

        e.stopPropagation();

        const alreadyExists = wishlistProducts.find(
            product => product.id === data.id
        );

        if (!alreadyExists) {

            wishlistProducts.push(data);

            localStorage.setItem(
                "favouriteProduct",
                JSON.stringify(wishlistProducts)
            )

            totalWishlist()

        }

    })

    // 🔴 QUANTITY CHANGE


    const qtyMinus =
        document.querySelector("#qty-minus");

    const qtyPlus =
        document.querySelector("#qty-plus");

    const qtyValue =
        document.querySelector("#qty-value");

    // 🔴 QUANTITY CHANGE

    qtyMinus.addEventListener("click", e => {

        e.stopPropagation();

        let quantity =
            Number(qtyValue.textContent);

        if (quantity > 1) {

            quantity--;

            qtyValue.textContent =
                quantity;

        }

    });

    // 🔴 QUANTITY CHANGE

    qtyPlus.addEventListener("click", e => {

        e.stopPropagation();

        let quantity =
            Number(qtyValue.textContent);

        quantity++;

        qtyValue.textContent =
            quantity;

    });



    // ======================================================
    // 🔴 QUANTITY CHANGE
    // ADD TO CART
    // ======================================================

    const addToCartBtn =
        document.querySelector("#add-to-cart-btn");


    addToCartBtn.addEventListener("click", e => {

        e.stopPropagation();


        // 🔴 QUANTITY CHANGE
        // Get the current quantity from the screen
        let quantity =
            Number(qtyValue.textContent);


        let alreadyExists = cartProducts.find(
            product => product.id === data.id
        );


        if (!alreadyExists) {

            // 🔴 QUANTITY CHANGE
            // Save product + selected quantity
            cartProducts.push({
                ...data,
                quantity: quantity
            });


            localStorage.setItem(
                "cartProduct",
                JSON.stringify(cartProducts)
            );


            totalCartItem()

        }

    })

}


function renderCategories(currentCategory = "all") {

    categoryFilters.innerHTML = "";

    allCategory.forEach(({ name, slug, url }) => {

        let button = document.createElement("button");

        if (currentCategory === slug) {

            button.className =
                "px-4 py-1.5 rounded-md text-sm font-medium bg-teal-700 capitalize text-white transition"

        }
        else {

            button.className =
                "px-4 py-1.5 rounded-md text-sm font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition";

        }

        button.type = "button";

        button.textContent = name

        button.dataset.category = slug
        button.dataset.url = url

        categoryFilters.append(button);
    });
}



function renderProducts(product) {
    productsContainer.innerHTML = "";

    product.forEach(products => {

        let article = document.createElement("article");

        article.className =
            "flex flex-col justify-between p-4 transition bg-white border rounded-lg border-slate-200 hover:border-slate-300 hover:shadow-sm";

        article.innerHTML = `
            <div class="flex items-center justify-center w-full h-48 p-3 mb-4 bg-white">
                <img 
                    src="${products.thumbnail}"
                    alt="${products.title}" 
                    class="object-contain max-w-full max-h-full"
                    loading="lazy">
            </div>

            <div class="flex flex-col flex-grow">

                <span class="mb-1 text-xs font-semibold tracking-wider text-teal-700 uppercase">
                    ${products.category}
                </span>

                <h2 
                    class="mb-2 text-sm font-semibold text-slate-900 line-clamp-2"
                    title="${products.title}">
                    ${products.title}
                </h2>

                <div class="pt-2 mt-auto">
                    <span class="text-lg font-bold text-slate-900">
                        ${(products.price * 19).toFixed(2)}
                    </span>
                </div>

                <a 
                    href="product-detail.html?id=${products.id}"
                    class="block w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white transition bg-teal-700 rounded hover:bg-teal-800">
                    View Details
                </a>

            </div>
        `

        productsContainer.append(article)
    });
}

function renderWishlist() {

    if (!wishlistContainer) {
        return;
    }

    wishlistContainer.innerHTML = "";


    wishlistProducts.forEach(
        ({ id, thumbnail, title, price }) => {

            const div =
                document.createElement("div");

            div.className =
                "overflow-hidden bg-white border divide-y rounded-lg shadow-sm border-slate-200 divide-slate-200"


            div.innerHTML = `

                <div class="flex flex-col items-center justify-between gap-4 p-4 sm:p-6 sm:flex-row sm:gap-6">

                    <div class="flex items-center flex-1 w-full min-w-0 gap-4 sm:w-auto">

                        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">

                            <img 
                                src="${thumbnail}" 
                                alt="${title}" 
                                class="object-contain max-w-full max-h-full"
                            >

                        </div>


                        <div class="flex-1 min-w-0">

                            <a 
                                href="product-detail.html?id=${id}" 
                                class="text-sm font-semibold transition text-slate-900 hover:text-teal-700 line-clamp-2" 
                                title="${title}"
                            >

                                ${title}

                            </a>


                            <p class="mt-1 text-sm font-bold text-slate-900">

                                ${(price * 19).toFixed(2)}

                            </p>

                        </div>

                    </div>


                    <div class="flex items-center justify-end w-full gap-3 sm:w-auto shrink-0">


                        <button 
                            type="button" 
                            data-id="${id}"
                            class="wishlist-add-cart-btn inline-flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition shadow-sm"
                        >

                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
                                </path>

                            </svg>

                            <span>Add to Cart</span>

                        </button>


                        <button 
                            type="button" 
                            data-id="${id}"
                            class="wishlist-remove-btn inline-flex items-center justify-center gap-1.5 text-slate-500 hover:text-red-600 border border-slate-300 hover:border-red-300 text-sm font-medium py-2 px-3 rounded transition"
                            title="Remove from Wishlist"
                        >

                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                </path>

                            </svg>

                            <span>Remove from Wishlist</span>

                        </button>

                    </div>

                </div>

            `

            wishlistContainer.append(div);

        })

}


function totalWishlist() {

    let wishlistCount =
        document.querySelector("#wishlist-count");

    if (!wishlistCount) {
        return;
    }

    wishlistCount.textContent =
        wishlistProducts.length;
}

function wishlistRemove(removeWishlist) {

    wishlistProducts =
        wishlistProducts.filter(wishlist => {

            if (
                wishlist.id !==
                Number(removeWishlist.dataset.id)
            ) {

                return wishlist;

            }

        })


    renderWishlist()


    localStorage.setItem(
        "favouriteProduct",
        JSON.stringify(wishlistProducts)
    );


    totalWishlist()

}


function addToCart(wishlistAddCartBtn) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("favouriteProduct")
        ) || [];


    let product =
        wishlist.find(item =>
            item.id ===
            Number(wishlistAddCartBtn.dataset.id)
        );


    if (product) {

        let alreadyExists =
            cartProducts.find(item =>
                item.id === product.id
            );


        if (!alreadyExists) {

            // 🔴 QUANTITY CHANGE
            // Wishlist has NO quantity.
            // When moving to cart, start with quantity 1.
            cartProducts.push({
                ...product,
                quantity: 1
            });


            localStorage.setItem(
                "cartProduct",
                JSON.stringify(cartProducts)
            );


            totalCartItem()

        }

    }

}


function renderCartProducts() {

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";


    let div =
        document.createElement("div");

    div.className =
        "grid items-start grid-cols-1 gap-8 lg:grid-cols-3";


    let div2 =
        document.createElement("div");

    div2.className =
        "overflow-hidden bg-white border divide-y rounded-lg shadow-sm lg:col-span-2 border-slate-200 divide-slate-200"


    // 🔴 QUANTITY CHANGE
    cartProducts.forEach(
        ({ id, thumbnail, title, price, quantity }) => {


            let productDiv =
                document.createElement("div");


            productDiv.className =
                "flex flex-col items-center justify-between gap-4 p-4 sm:p-6 sm:flex-row sm:gap-6";


            productDiv.innerHTML = `

                <div class="flex items-center flex-1 w-full min-w-0 gap-4 sm:w-auto">

                    <div
                        class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">

                        <img 
                            src="${thumbnail}"
                            alt="${title}"
                        >

                    </div>


                    <div class="flex-1 min-w-0">

                        <a 
                            href="product-detail.html?id=${id}"
                            class="text-sm font-semibold transition text-slate-900 hover:text-teal-700 line-clamp-2"
                            title="${title}"
                        >

                            ${title}

                        </a>


                        <p class="mt-1 text-xs text-slate-500">

                            ${(price * 19).toFixed(2)}

                        </p>

                    </div>

                </div>



                <div class="flex items-center justify-between w-full gap-4 sm:justify-end sm:gap-6 sm:w-auto shrink-0">


                    <div class="flex items-center bg-white border rounded border-slate-300">


                        <button 
                            type="button"
                            class="cart-qty-minus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l transition"
                            aria-label="Decrease quantity"
                            data-id="${id}"
                        >

                            <svg 
                                class="w-3.5 h-3.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >

                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M20 12H4">
                                </path>

                            </svg>

                        </button>


                        <!-- 🔴 QUANTITY CHANGE -->
                        <!-- Show actual cart quantity -->
                        <span 
                            class="w-8 text-xs font-semibold text-center select-none text-slate-800"
                        >

                            ${quantity}

                        </span>


                        <button 
                            type="button"
                            class="cart-qty-plus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r transition"
                            aria-label="Increase quantity"
                            data-id="${id}"
                        >

                            <svg 
                                class="w-3.5 h-3.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >

                                <path 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M12 4v16m8-8H4">
                                </path>

                            </svg>

                        </button>

                    </div>



                    <div class="w-20 text-right">

                        <!-- 🔴 QUANTITY CHANGE -->
                        <!-- Price × quantity -->
                        <span class="text-sm font-bold text-slate-900">

                            ₹${(price * 19 * quantity).toFixed(2)}

                        </span>

                    </div>



                    <button 
                        type="button"
                        class="cart-wishlist-btn text-slate-400 hover:text-teal-700 p-1.5 rounded transition"
                        title="Add to Wishlist"
                        aria-label="Add to Wishlist"
                        data-id="${id}"
                    >

                        <svg 
                            class="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >

                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>

                        </svg>

                    </button>



                    <button 
                        type="button" 
                        class="cart-remove-btn text-slate-400 hover:text-red-600 p-1.5 rounded transition"
                        title="Remove from cart" 
                        aria-label="Remove item" 
                        data-id="${id}"
                    >

                        <svg 
                            class="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >

                            <path 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a1.995 1.995 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1 1v3M4 7h16">
                            </path>

                        </svg>

                    </button>

                </div>

            `


            div2.append(productDiv);

        });



    // 🔴 QUANTITY CHANGE
    // TOTAL CART AMOUNT
    let totalAmount = 0;


    cartProducts.forEach(product => {

        totalAmount +=
            product.price *
            19 *
            product.quantity;

    });


    let orderSummary =
        document.createElement("div");


    orderSummary.className =
        "sticky p-6 bg-white border rounded-lg shadow-sm border-slate-200 top-24";


    orderSummary.innerHTML = `

        <h2 class="pb-3 mb-4 text-lg font-bold border-b text-slate-900 border-slate-200">

            Order Summary

        </h2>


        <div class="flex items-center justify-between mb-6 text-base font-semibold text-slate-900">

            <span>Total Amount</span>


            <span class="text-xl font-bold text-teal-700">

                ₹${totalAmount.toFixed(2)}

            </span>

        </div>


        <button 
            type="button" 
            id="checkout-btn"
            class="w-full px-4 py-3 font-medium text-center text-white transition bg-teal-700 rounded-md shadow-sm hover:bg-teal-800"
        >

            Proceed to Checkout

        </button>

    `;


    div.append(div2);

    div.append(orderSummary);


    cartContainer.append(div);

}

function cartRemove(removeCart) {

    cartProducts =
        cartProducts.filter(cart => {

            if (
                cart.id !==
                Number(removeCart.dataset.id)
            ) {

                return cart;

            }

        })


    renderCartProducts()


    localStorage.setItem(
        "cartProduct",
        JSON.stringify(cartProducts)
    );


    totalCartItem()

}


function cartWishlist(cartWishlistBtn) {

    let cart =
        JSON.parse(
            localStorage.getItem("cartProduct")
        ) || [];


    let product =
        cart.find(item =>
            item.id ===
            Number(cartWishlistBtn.dataset.id)
        );


    if (product) {

        let alreadyExists =
            wishlistProducts.find(item =>
                item.id === product.id
            );


        if (!alreadyExists) {
            // 🔴 QUANTITY CHANGE
            const {
                quantity,
                ...wishlistProduct
            } = product;


            wishlistProducts.push(
                wishlistProduct
            );


            localStorage.setItem(
                "favouriteProduct",
                JSON.stringify(wishlistProducts)
            );


            totalWishlist()

        }

    }

}


function totalCartItem() {

    let cartCount =
        document.querySelector("#cart-count");


    if (!cartCount) {
        return;
    }


    cartCount.textContent =
        cartProducts.length;

}


function init() {


    if (categoryFilters) {

        categoryFilters.addEventListener('click', e => {

            e.stopPropagation();

            const element = e.target;

            if (element.type) {

                const category = element.dataset.category;
                const url = element.dataset.url;

                renderCategories(category)
                products(url)
            }
        })
    }


    if (productsContainer && categoryFilters) {

        products(API)
        categories()

    }

    let searchInput = document.querySelector("#search-input");


    if (searchInput) {

        searchInput.addEventListener("input", e => {

            e.stopPropagation();

            let value = searchInput.value;

            products(
                `https://dummyjson.com/products/search?q=${value}`
            );

        })
    }


    if (wishlistContainer) {

        wishlistContainer.addEventListener("click", e => {

            e.stopPropagation();

            let removeWishlist =
                e.target.closest(".wishlist-remove-btn");

            let wishlistAddCartBtn =
                e.target.closest(".wishlist-add-cart-btn");


            if (removeWishlist) {

                wishlistRemove(removeWishlist)

            }


            if (wishlistAddCartBtn) {

                addToCart(wishlistAddCartBtn);

            }

        })

    }
    if (cartContainer) {

        cartContainer.addEventListener("click", e => {

            e.stopPropagation();


            let removeCart =
                e.target.closest(".cart-remove-btn");


            let cartWishlistBtn =
                e.target.closest(".cart-wishlist-btn");


            // 🔴 QUANTITY CHANGE
            let minusBtn =
                e.target.closest(".cart-qty-minus");


            // 🔴 QUANTITY CHANGE
            let plusBtn =
                e.target.closest(".cart-qty-plus");



            if (removeCart) {

                cartRemove(removeCart)

            }


            if (cartWishlistBtn) {

                cartWishlist(cartWishlistBtn);

            }

            // 🔴 QUANTITY CHANGE

            if (minusBtn) {

                let productId =
                    Number(minusBtn.dataset.id);


                let product =
                    cartProducts.find(
                        product => product.id === productId
                    );


                if (product && product.quantity > 1) {

                    product.quantity--;


                    localStorage.setItem(
                        "cartProduct",
                        JSON.stringify(cartProducts)
                    );


                    renderCartProducts();

                }

            }

            if (plusBtn) {

                let productId =
                    Number(plusBtn.dataset.id);


                let product =
                    cartProducts.find(
                        product => product.id === productId
                    );


                if (product) {

                    product.quantity++;


                    localStorage.setItem(
                        "cartProduct",
                        JSON.stringify(cartProducts)
                    );


                    renderCartProducts();

                }

            }

        })

    }


}

renderWishlist()

loadProductImage()

totalWishlist()

renderCartProducts()

totalCartItem()
init()
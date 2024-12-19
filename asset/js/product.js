

// lay du lieu tu db fake
var productApi = 'http://localhost:3000/products'
var cartApi = 'http://localhost:3000/cart'
var products;
var cart;
function getProduct() {
    fetch(productApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            products = data;
            renderProduct(data)
        });

}
getProduct();

function getCart() {
    fetch(cartApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cart = data;
        });
}
getCart();
// render
function renderProduct(data) {
    var html = '';
    data.forEach(product => {
        html += `
                    <div class="col-sm-6 col-md-6 col-lg-4 mb-4 item-${product.id}">
                        <div class="card position-relative">
                            <a target="_self">
                                <img src="${product.image}" class="card-img-top" alt="Vợt cầu lông">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${product.name} </h5>
                                    <p class="card-text">${product.price} VND</p>
                                    <button class="btn btn-primary btn-sm" onclick="handleAddToCart(${product.id})" type="button">Thêm vào giỏ</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    `
    })
    document.querySelector('.items').innerHTML = html;
}

function handleAddToCart(id) {
    getCart();

    var product = products.find(pro => {
        return pro.id == id;
    })

    var isInCart = cart.find(it => it.product_id == product.id);

    if (isInCart) {
        // thuc hien update quantity
        var cart_item = { ...isInCart }
        cart_item.quantity += 1;
        console.log(Number(cart_item.id));
        console.log(product.id);

        // putCart(cart_item);
    }
    else {
        var cart_item = { ...product };

        cart_item.product_id = product.id;
        cart_item.id = cart.length + 1;
        cart_item.quantity = 1;

        // call api
        postCart(cart_item);
    }

}
function postCart(cart_item) {
    var option = {
        "method": "POST",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart_item)
    }
    fetch("http://localhost:3000/cart", option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            alert("Đã thêm vào giỏ hàng")
        })
        .catch(er => {
            console.log(er);

        });
}

function putCart(cart_item) {
    // call api
    var option = {
        "method": "PUT",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart_item)
    }
    fetch("http://localhost:3000/cart/" + toString(cart_item.id), option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            alert("Đã thêm vào giỏ hàng")
        })
        .catch(er => {
            console.log(er);
        });
}
// filter
document.querySelector('.filter').onchange = function () {
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    var select = document.querySelector('select')
    var html = ''
    var validProducts = []

    // xu li select 
    products.forEach(pro => {
        var isMatchedProduct = filterByRange(pro, select.value)
        if (isMatchedProduct) {
            validProducts.push(pro);
        }
    })
    function filterByRange(product, range) {
        switch (range) {
            case 'duoi-1m':
                return product.price < 1000000;
            case '1m-3m':
                return product.price >= 1000000 && product.price <= 3000000;
            case 'tren-3m':
                return product.price > 3000000;
            default:
                return true;
        }
    }
    // xu li checkbox
    if (checkboxes.length === 0) {
        renderProduct(validProducts)
        return;
    }
    validProducts.forEach(pro => {
        checkboxes.forEach(checked => {
            if (pro.type === checked.value) {
                html += `
                    <div class="col-sm-6 col-md-6 col-lg-4 mb-4 item-${pro.id}">
                        <div class="card position-relative">
                            <a href="#" target="_self">
                                <img src="${pro.image}" class="card-img-top" alt="Vợt cầu lông">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${pro.name} </h5>
                                    <p class="card-text">${pro.price}</p>
                                    <button class="btn btn-primary btn-sm">Thêm vào giỏ</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    `
            }
        });
    });
    document.querySelector('.items').innerHTML = html;
}

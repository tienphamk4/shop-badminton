

// lay du lieu tu db fake
var productApi = 'http://localhost:8080/products'
var cartApi = 'http://localhost:8080/cart'
var products;
var cart;
function getProduct(page, api) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            products = data.data;

            renderProduct(products)
        });

}
getProduct(1, productApi + "?_page=" + 1 + "&_per_page=9");

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

    var product = products.find(pro => {
        return pro.id == id;
    })

    var isInCart = cart.find(it => it.product_id == product.id);

    if (isInCart) {
        // thuc hien update quantity
        var cart_item = { ...isInCart }
        cart_item.quantity += 1;

        putCart(cart_item);
    }
    else {
        var cart_item = { ...product };

        cart_item.product_id = product.id;
        cart_item.id = cart.length + 1;
        cart_item.id = cart_item.id.toString();
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
    fetch("http://localhost:8080/cart", option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            alert("Đã thêm vào giỏ hàng")
            getCart();
        })
        .catch(er => {
            console.log(er);
        });
}

function putCart(cart_item) {
    console.log(cart_item);

    // call api
    var option = {
        "method": "PUT",
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart_item)
    }
    fetch("http://localhost:8080/cart/" + cart_item.id, option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            alert("Đã thêm vào giỏ hàng")
            getCart();
        })
        .catch(er => {
            console.log(er);
        });
}
// filter
var condition = '';
document.querySelector('.filter').onchange = function () {
    function filterByRange(range) {
        switch (range) {
            case 'duoi-1m':
                condition = '&price_lt=1000000';
                break;
            case '1m-3m':
                condition = '&price_lte=3000000&price_gte=1000000'
                break;
            case 'tren-3m':
                condition = '&price_gt=3000000'
                break;
            default:
                condition = ''
        }
    }
    function filterByType() {
        checkboxes.forEach(checked => {
            if (checked.value === 'vot') {
                condition += '&type=vot'
            }
            if (checked.value === 'giay') {
                condition += '&type=giay'
            }
            if (checked.value === 'trangphuc') {
                condition += '&type=trangphuc'
            }
            if (checked.value === 'phukien') {
                condition += '&type=phukien'
            }
        });
    }

    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    var select = document.querySelector('select')
    var validProducts = []


    filterByRange(select.value);
    filterByType();

    var api = productApi + "?_page=1&_per_page=9" + condition;
    console.log(api);

    // update lai trang hien tai
    pages[currentIndex - 1].classList.remove('actived')
    currentIndex = 1
    pages[currentIndex - 1].classList.add('actived')

    getProduct(1, api);
}

// xu li phan trang

var pages = document.querySelectorAll('.pagination .number a');
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')
var currentIndex = 1;
pages.forEach((page, index) => {
    page.addEventListener('click', () => {
        pages[currentIndex - 1].classList.remove('actived')

        var currentPage = index + 1;
        getProduct(currentPage, productApi + "?_page=" + currentPage + "&_per_page=9" + condition)
        currentIndex = index + 1;

        pages[currentIndex - 1].classList.add('actived')
    })
})
prev.addEventListener('click', () => {
    if (currentIndex !== 1) {
        pages[currentIndex - 1].classList.remove('actived')
        currentIndex -= 1;
        pages[currentIndex - 1].classList.add('actived')
        getProduct(currentIndex, productApi + "?_page=" + currentIndex + "&_per_page=9" + condition);
        console.log(currentIndex);
    }
})
next.addEventListener('click', () => {
    if (currentIndex < 5) {
        pages[currentIndex - 1].classList.remove('actived')
        currentIndex += 1;
        pages[currentIndex - 1].classList.add('actived')
        getProduct(currentIndex, productApi + "?_page=" + currentIndex + "&_per_page=9" + condition);
        console.log(currentIndex);
    }
    console.log(condition);

})
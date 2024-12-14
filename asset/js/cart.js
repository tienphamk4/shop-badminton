var cartApi = 'http://localhost:3000/cart'
var carts
function getCart() {
    fetch(cartApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            carts = data
            renderCart()
        })
}
getCart();

function renderCart() {
    var html = '';
    var totalPrice = 0;
    carts.forEach(cart => {
        totalPrice += cart.price;
        html += `<div class="cart_item row" data-id="${cart.id}">
                    <div class="image col-lg-2">
                        <img src="${cart.image}" alt="">
                    </div>
                    <div class="name col-lg-4 col-md-6 text-center col-sm-6">
                        ${cart.name}
                    </div>
                    <div class="quantity col-lg-2 col-md-3 col-sm-3 text-center d-flex align-items-center justify-content-center mb-2 mt-2">
                        <div><i class="fa-solid fa-plus" onclick="add(${cart.id})"></i></div>
                        <input type="text" value="1">
                        <i class="fa-solid fa-minus" onclick=extract(${cart.id})></i>
                    </div>
                    <div class="price col-lg-2 col-sm-3 text-center">
                        <span>${cart.price}</span> VND 
                    </div>
                    <div class="remove col-lg-2 text-center">
                        <i class="fa-solid fa-trash" onclick="removeCart(${cart.id})"></i>
                    </div>
                </div>
                `
    })
    document.querySelector('.items').innerHTML = html;
    // cap nhat tong tien
    document.querySelector('.total span').innerHTML = Number(totalPrice)
}

async function removeCart(currentProductId) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(cartApi + "/" + currentProductId, option)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            hidden(currentProductId)
        });
}
function hidden(id) {
    // lay san pham can xoa va an di
    var product = document.querySelector('[data-id="' + id + '"]');
    var price = product.querySelector('.price span');
    product.style.display = 'none'

    // update tong tien
    var totalPrice = document.querySelector('.total span');
    totalPrice.textContent = Number(totalPrice.textContent) - Number(price.textContent)
}
function add(id) {
    var input = document.querySelector('[data-id="' + id + '"] input');

    // lay gia  cua x1 vot
    var realPrice = carts.find(function (cart) {
        return cart.id == id;
    })

    var price = input.parentElement.nextElementSibling.querySelector('span')
    var value = Number(input.value);

    input.value = value + 1;
    price.textContent = Number(price.textContent) + Number(realPrice.price);

    // cap nhat tong thanh tien
    var totalPrice = document.querySelector('.total span');
    totalPrice.innerHTML = Number(totalPrice.textContent) + Number(realPrice.price)
}
function extract(id) {
    var input = document.querySelector('[data-id="' + id + '"] input');

    // lay gia  cua x1 vot
    var realPrice = carts.find(function (cart) {
        return cart.id == id;
    })
    var price = input.parentElement.nextElementSibling.querySelector('span')
    var value = Number(input.value);
    if (value > 1) {
        input.value = value - 1;
        price.textContent = Number(price.textContent) - Number(realPrice.price);
        var totalPrice = document.querySelector('.total span');
        totalPrice.innerHTML = Number(totalPrice.textContent) - Number(realPrice.price)
    }
}

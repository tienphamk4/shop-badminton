var cartApi = 'http://localhost:8080/cart'
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
    if (carts.length == 0) {
        html = `<div class="cart_item row">
                    <div class="name col-lg-12 text-center">
                        <h1>Không có sản phẩm nào trong giỏ hàng</h1>
                    </div>
                </div>`
        document.querySelector('.items').innerHTML = html;
        return;
    }
    html += ` <div class="item">
                        <div class="cart_item row" style="color:var(--main-color)">
                            <div class="col-lg-2 text-center">
                                Ảnh
                            </div>
                            <div class="name col-lg-4 col-md-6 text-center col-sm-6">
                                Tên sản phẩm
                            </div>
                            <div
                                class="quantity col-lg-2 col-md-3 col-sm-3 text-center d-flex align-items-center justify-content-center mb-2 mt-2">
                                Số lượng
                            </div>
                            <div class="price col-lg-2 col-sm-3 text-center">
                                <span>Đơn giá</span>
                            </div>
                            <div class="remove col-lg-2 text-center">
                                Xóa
                            </div>
                        </div>
                    </div>`
    carts.forEach(cart => {
        totalPrice += cart.price * cart.quantity;
        html += `<div class="cart_item row" data-id="${cart.id}">
                    <div class="image col-lg-2">
                        <img src="${cart.image}" alt="">
                    </div>
                    <div class="name col-lg-4 col-md-6 text-center col-sm-6">
                        ${cart.name}
                    </div>
                    <div class="quantity col-lg-2 col-md-3 col-sm-3 text-center d-flex align-items-center justify-content-center mb-2 mt-2">
                        <div><i class="fa-solid fa-plus" onclick="add(${cart.id})"></i></div>
                        <input type="text" value="${cart.quantity}">
                        <i class="fa-solid fa-minus" onclick=extract(${cart.id})></i>
                    </div>
                    <div class="price col-lg-2 col-sm-3 text-center">
                        <span>${formatVND(cart.price)}</span>  
                    </div>
                    <div class="remove col-lg-2 text-center">
                        <i class="fa-solid fa-trash" onclick="removeCart(${cart.id})"></i>
                    </div>
                </div>
                `
    })
    document.querySelector('.items').innerHTML = html;
    // cap nhat tong tien
    document.querySelector('.total span').innerHTML = formatVND(totalPrice)
}

function removeCart(currentProductId) {
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
    var quantity = product.querySelector('.quantity input');
    product.style.display = 'none'

    // update tong tien
    var totalPrice = document.querySelector('.total span');
    var price = parseVND(price.textContent);
    var sum = parseVND(totalPrice.textContent);
    var updated = sum - price * Number(quantity.value)
    totalPrice.textContent = formatVND(updated)
}
function add(id) {
    var input = document.querySelector('[data-id="' + id + '"] input');
    var price = input.parentElement.nextElementSibling.querySelector('span')
    var value = Number(input.value);

    input.value = value + 1;

    // cap nhat tong thanh tien
    var totalPrice = document.querySelector('.total span');
    var price = parseVND(price.textContent);
    var sum = parseVND(totalPrice.textContent);

    var updated = sum + price
    totalPrice.innerHTML = formatVND(updated)
}
function extract(id) {
    var input = document.querySelector('[data-id="' + id + '"] input');
    var price = input.parentElement.nextElementSibling.querySelector('span')
    var value = Number(input.value);
    if (value > 1) {
        input.value = value - 1;
        var totalPrice = document.querySelector('.total span');
        var price = parseVND(price.textContent);
        var sum = parseVND(totalPrice.textContent);
        var updated = sum - price
        totalPrice.innerHTML = formatVND(updated)
    }
}
function formatVND(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
function parseVND(price) {
    return Number(price.replace(/[^\d]/g, ''));
}
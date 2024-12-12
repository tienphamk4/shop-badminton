// var products = document.querySelectorAll('.product');

// function filter(data) {
//     products.forEach(pro => {
//         if (pro.dataset.filter === data || !data) {
//             pro.style.display = 'block'
//         } else {
//             pro.style.display = 'none'
//         }
//     })
// }

// var input = document.querySelector('.nav input');
// input.addEventListener('keyup', function (e) {

//     products.forEach(pro => {
//         var name = pro.querySelector('.card-title').textContent.toLowerCase()
//         console.log(name)
//         if (name.indexOf(e.target.value) !== -1 || e.target.value === '') {
//             pro.style.display = 'block'
//         } else {
//             pro.style.display = 'none'
//         }
//     })
// })

// lay du lieu tu db fake
var productApi = 'http://localhost:3000/products'
fetch(productApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        renderProduct(data)
    });


function renderProduct(data) {
    var html = '';
    data.forEach(product => {
        html += `
                    <div class="col-sm-6 col-md-6 col-lg-4 mb-4 item-${product.id}">
                        <div class="card h-100 position-relative">
                            <a href="#" target="_self">
                                <img src="asset/img/p1.webp" class="card-img-top" alt="Vợt cầu lông">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${product.name} </h5>
                                    <p class="card-text">${product.price} VND</p>
                                    <button class="btn btn-primary btn-sm">Thêm vào giỏ</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    `
    })
    document.querySelector('.items').innerHTML = html;
}

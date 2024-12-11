var products = document.querySelectorAll('.product');

function filter(data) {
    products.forEach(pro => {
        if (pro.dataset.filter === data || !data) {
            pro.style.display = 'block'
        } else {
            pro.style.display = 'none'
        }
    })
}

var input = document.querySelector('.nav input');
input.addEventListener('keyup', function (e) {

    products.forEach(pro => {
        var name = pro.querySelector('.card-title').textContent.toLowerCase()
        console.log(name)
        if (name.indexOf(e.target.value) !== -1 || e.target.value === '') {
            pro.style.display = 'block'
        } else {
            pro.style.display = 'none'
        }
    })
})
var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(item => {
    var prev = item.previousElementSibling;

    prev.addEventListener('mouseover', function () {
        item.classList.remove('hide')
        console.log("ok");

    })
    console.log(prev.parentElement);

    prev.parentElement.addEventListener('mouseleave', function (e) {
        item.classList.add('hide')
    })
})

// bar responsive show
var bar = document.querySelector('.bar')
var dropdownBar = document.querySelector('.dropdown-bar')
bar.addEventListener('click', function (e) {
    e.stopPropagation()
    dropdownBar.classList.toggle('hide')
})

// chan hien tuong noi bot
document.addEventListener('click', function () {
    dropdownBar.classList.add('hide')
})
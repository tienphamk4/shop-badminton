const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 30); // 30 ngày từ hôm nay

function updateCountdown() {
    const now = new Date();
    const timeRemaining = targetDate - now; // thoi gian chenh lech

    if (timeRemaining <= 0) {
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);


    document.querySelector(".days").textContent = days;
    document.querySelector(".hours").textContent = hours;
    document.querySelector(".minutes").textContent = minutes;
    document.querySelector(".seconds").textContent = seconds;
}

const run = setInterval(updateCountdown, 1000);
updateCountdown();

// xu li click vao anh
var imgs = document.querySelectorAll('.products img')
imgs.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
        window.location.href = 'detail.html';
    })
})
var imgs = document.querySelectorAll('.deal img')
imgs.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
        window.location.href = 'detail.html';
    })
})

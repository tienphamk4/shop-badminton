// fetch api
var userApi = ('http://localhost:8080/user')
var users

function fetchAllUsers() {
    fetch(userApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            users = data;
        });
}
fetchAllUsers();

function handleCreateUser(newUser) {
    var option = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }
    fetch(userApi, option)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

function authorize(data) {
    var form = document.querySelector('form');
    var email = form.querySelector('#email').value;
    var password = form.querySelector('#password').value;
    var check = false;

    console.log(email + password);

    data.forEach(user => {
        if (user.email === email && password === user.password) {
            check = true;
        }
    })

    return check;
}

function validator(option) {
    var form = document.querySelector(option.form_id);
    // huy su kien mac dich khi bam nut
    form.onsubmit = function (e) {
        e.preventDefault();
        // validate tat ca
        var isValid = true;
        option.rules.forEach(rule => {
            if (!validate(rule)) {
                isValid = false;
            }
        })
        // thuc hien redirect
        if (isValid && option.form_id === '#login-form') {
            // xac thuc nguoi dung
            if (authorize(users)) {
                document.querySelector('.login-success').classList.remove('hide')

                setTimeout(function () {
                    window.location.href = 'index.html'
                }, 2000)
            }
            else {
                document.querySelector('.login-failed').classList.remove('hide')
                setTimeout(function () {
                    document.querySelector('.login-failed').classList.add('hide')
                }, 4000)
            }
        }
        else if (isValid && option.form_id === '#register-form') {
            e.preventDefault();
            var name = document.querySelector('#name').value
            var email = document.querySelector('#email').value
            var password = document.querySelector('#password').value
            var newUser = {
                "id": users.length + 1,
                "name": name,
                "email": email,
                "password": password
            }

            document.querySelector('.login-success').classList.remove('hide')
            setTimeout(function () {
                handleCreateUser(newUser);
                window.location.href = 'login.html'
            }, 2000)
        }
    }
    option.rules.forEach(rule => {
        var input = form.querySelector(rule.validId);
        console.log(rule.validId)
        input.onblur = function () {
            validate(rule)
        }
        input.oninput = function () {
            var message = input.parentElement.querySelector('.form-message')
            message.textContent = ''
        }
    })

    function validate(rule) {
        var input = form.querySelector(rule.validId);
        var parent = input.parentElement;
        var message = parent.querySelector('.form-message');
        var error = rule.check(input.value)

        if (error) {
            message.textContent = error;
            input.classList.add('invalid')
            return false;
        } else {
            message.textContent = '';
            input.classList.remove('invalid')
            return true;
        }
    }
}



validator.isRequired = function (validId, name) {
    return {
        validId: validId,
        check: function (value) {
            return value ? undefined : 'Vui lòng nhập ' + name;
        }
    }
}

validator.isEmail = function (emailId) {
    return {
        validId: emailId,
        check: function (value) {
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng địa chỉ email'
        }
    }
}

validator.checkPasswordConfirm = function (confirmPasswordId) {
    return {
        validId: confirmPasswordId,
        check: function (value) {
            var password = document.querySelector('#password')
            return value === password.value ? undefined : 'Mật khẩu nhập lại không khớp'
        }
    }
}
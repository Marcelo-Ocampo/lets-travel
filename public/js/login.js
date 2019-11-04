let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;
    fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.text())
        .then((data) => {
            alert(data);
            signInForm.reset();
        });
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let rePassword = document.getElementById('register-re-password').value;
    if (password !== rePassword) {
        alert('The passwords do not match');
    } else {
        fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then((res) => res.text())
            .then((data) => {
                alert(data);
                registerForm.reset();
            });
    }
})
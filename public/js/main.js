let callbackForm = document.querySelector('.callback-form');
let mailForm = document.querySelector('.mail-form');

//GET request for articles for main page
document.addEventListener('DOMContentLoaded', async () => {
    let articles = document.querySelector('.articles');
    articles.innerHTML = "";
    let posts = await getPosts(); //comes from posts.js in "js" folder in root
    posts.forEach((post) => {
        let postHTML =
            `<div class="col-4">
                <div class="card mb-10">
                <img src="${post.imageURL}" alt="${post.title}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.description}</p>
                    <a href="/sight?id=${post.id}"class="btn btn-primary">Details</a>
                </div>
                </div>
            </div>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
})

//Enabling "Call me Back!" button to post new callback requests to server
callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let callbackPhone = callbackForm.querySelector('#callback-phone');
    fetch('http://localhost:3000/callback-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber: callbackPhone.value
            })
        }).then((res) => res.text())
        .then(() => alert('Request received! We will call you back as soon as possible!'));
    callbackPhone.value = "";
})

//Enabling "Contact us" button to post new mail request to server
mailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let mailName = mailForm.querySelector('#mail-name');
    let mailEmail = mailForm.querySelector('#mail-email');
    let mailMessage = mailForm.querySelector('#mail-message');
    fetch('http://localhost:3000/mails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: mailName.value,
                email: mailEmail.value,
                message: mailMessage.value
            })
        }).then((res) => res.text())
        .then(() => {
            alert('Request received!');
            window.history.go();
        });
})
let addPostForm = document.querySelector('.add-post-form');
let addPostTitle = document.getElementById('add-post-title');
let addPostCountry = document.getElementById('add-post-country');
let addPostImgUrl = document.getElementById('add-post-imgURL');
let addPostText = document.getElementById('add-post-text');

addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let postText = addPostText.value;
    fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: addPostTitle.value,
                country: addPostCountry.value,
                imageURL: addPostImgUrl.value,
                text: postText,
                description: postText.substring(0, postText.indexOf('.') + 1)
            })
        }).then((response) => response.text())
        .then((data) => window.history.go());
})
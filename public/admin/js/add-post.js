let addPostForm = document.querySelector('.add-post-form');
let addPostTitle = document.getElementById('add-post-title');
let addPostCountry = document.getElementById('add-post-country');
let addPostImgUrl = document.getElementById('add-post-imgURL');
let addPostImgFile = document.getElementById('add-post-file');
let addPostText = document.getElementById('add-post-text');

addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let postText = addPostText.value;
    let data = new FormData(); //Using FormData class to start working with uploaded files
    data.append('title', addPostTitle.value); // adding fields to the data object that correspond to form information
    data.append('country', addPostCountry.value);
    data.append('imageURL', addPostImgUrl.value);
    data.append('text', postText);
    data.append('description', postText.substring(0, postText.indexOf('.') + 1));
    data.append('imageFile', addPostImgFile.files[0]);

    fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: data
        }).then((response) => response.text())
        .then((data) => window.history.go());
})

// Concentrating image directory input into one source: image URL field or image file button
addPostImgUrl.addEventListener('change', function () {
    disableInput(this, addPostImgFile);
});
addPostImgFile.addEventListener('change', function () {
    disableInput(this, addPostImgUrl);
});

function disableInput(input1, input2) {
    if (input1.value) {
        input2.disabled = true;
    } else {
        input2.disabled = false;
    }
}
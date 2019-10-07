//GET request for articles for main page
document.addEventListener('DOMContentLoaded', async () => {
    let articles = document.querySelector('.articles');
    articles.innerHTML = "";
    let posts = await getPosts(); //comes from posts.js in "js" folder in root
    posts.forEach((post) => {
        let postHTML =
            `<div class="col-4">
                <div class="card">
                <img src="${post.imageURL}" alt="${post.title}" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.description}</p>
                    <button class="btn btn-primary">Details</button>
                </div>
                </div>
            </div>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
})
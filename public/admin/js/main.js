let addPostBtn = document.querySelector('.add-post-btn');

//GET request for articles for admin page
document.addEventListener('DOMContentLoaded', async () => {
    let articles = document.querySelector('.articles');
    articles.innerHTML = "";
    let orderID = 1;
    let posts = await getPosts(); //comes from posts.js in "js" folder in root
    posts.forEach((post) => {
        let postHTML =
            `<article
                class="d-flex justify-content-between align-items-center article-inline">
                <div class="order w5">${orderID++}</div>
                <input class="id" type="hidden" value="${post.id}">
                <div class="name w30">${post.title}</div>
                <div class="date w25">${post.date}</div>
                <div class="country w20">${post.country}</div>
                <div class="edit w10">
                    <button class="btn btn-link">Edit</button>
                </div>
                <div class="remove w10">
                    <button class="btn btn-link">Remove</button>
                </div>
            </article>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
})

//Showing add post form by chaging "show" and "active" classes from Bootstrap CSS
addPostBtn.addEventListener('click', () => {
    let articlesTab = document.getElementById('v-pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let addPostTab = document.getElementById('v-pills-add-post');
    addPostTab.classList.add('show');
    addPostTab.classList.add('active');
});
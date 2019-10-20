let addPostBtn = document.querySelector('.add-post-btn');

//GET request for articles for admin page
document.addEventListener('DOMContentLoaded', async () => {
    addPosts();
    addCallbackRequests();
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

async function addPosts() {
    let articles = document.querySelector('.articles');
    articles.innerHTML = "";
    let orderID = 1;
    let posts = await getPosts(); //from posts.js in "js" folder in root
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
                    <button class="btn btn-link update-btn">Edit</button>
                </div>
                <div class="remove w10">
                    <button class="btn btn-link remove-btn">Remove</button>
                </div>
            </article>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
}

async function addCallbackRequests() {
    let requestsBlock = document.querySelector('#v-pills-callback');
    requestsBlock.innerHTML = "";
    let orderID = 1;
    let callbackRequests = await getCallbackRequests(); //from get-callback-requests.js in "js" folder in local
    callbackRequests.forEach((request) => {
        let callbackRequestHTML =
            `<article
                class="d-flex justify-content-between align-items-center article-inline">
                <div class="order w5">${orderID++}</div>
                <input class="id" type="hidden" value="${request.id}">
                <div class="phoneNumber w60">${request.phoneNumber}</div>
                <div class="date w25">${request.date}</div>
                <div class="remove w10">
                    <button class="btn btn-link remove-btn">Remove</button>
                </div>
            </article>`;
        requestsBlock.insertAdjacentHTML('beforeend', callbackRequestHTML);
    });
}
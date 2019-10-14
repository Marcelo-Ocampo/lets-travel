{
    let articlesBlock = document.querySelector('.articles');
    let updatePostTitle = document.getElementById('update-post-title');
    let updatePostText = document.getElementById('update-post-text');
    let updateForm = document.querySelector('.update-post-form');
    let postID;

    articlesBlock.addEventListener('click', async (e) => {
        if (e.target.classList.contains('update-btn')) {
            postID = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + postID)
                .then((res) => res.json())
                .then((data) => data);

            updatePostTitle.value = postInfo.title;
            updatePostText.value = postInfo.text;

            let articlesTab = document.getElementById('v-pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');

            let updatePostTab = document.getElementById('v-pills-update-post');
            updatePostTab.classList.add('show');
            updatePostTab.classList.add('active');
        }
    });

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/posts/' + postID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: updatePostTitle.value,
                    text: updatePostText.value,
                    description: updatePostText.value.substring(0, updatePostText.value.indexOf('.') + 1)
                })
            }).then((res) => res.text())
            .then((data) => window.history.go());
    })
}
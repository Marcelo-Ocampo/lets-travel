{
    let articlesBlock = document.querySelector('.articles');

    articlesBlock.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            let postID = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('http://localhost:3000/posts/' + postID, {
                    method: 'DELETE'
                }).then((res) => res.text())
                .then((data) => window.history.go());
        }
    })
}
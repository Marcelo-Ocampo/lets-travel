let requestsBlock = document.querySelector('#v-pills-callback');

requestsBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        let reqID = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/callback-requests/' + reqID, {
                method: 'DELETE'
            }).then((res) => res.text())
            .then((data) => window.history.go());
    }
})
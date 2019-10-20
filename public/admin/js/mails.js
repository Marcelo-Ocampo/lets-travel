async function getMails() {
    return await fetch('http://localhost:3000/mails')
        .then((response) => response.json())
        .then((data) => data);
}

let mailsBlock = document.querySelector('#v-pills-mails');

mailsBlock.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        let reqID = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/mails/' + reqID, {
                method: 'DELETE'
            }).then((res) => res.text())
            .then((data) => window.history.go());
    }
})
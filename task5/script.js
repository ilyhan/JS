const buttonUp = document.getElementById('button-up');

const maxScrollHidden = 300;

window.addEventListener('scroll', function () {
    if (this.window.scrollY > maxScrollHidden) {
        buttonUp.classList.remove('hidden');
    } else {
        buttonUp.classList.add('hidden');
    }
});
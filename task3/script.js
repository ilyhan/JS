const searchInput = document.getElementById('input');
const items = document.querySelectorAll('li');

//особенно полезен при поиске в БД, чтобы на каждое изменение не отправлять запрос
function debounce( callback, delay ) {
    let timeout;
    return function(...args) {
        clearTimeout( timeout );
        timeout = setTimeout( ()=>callback.apply(this, args), delay );
    }
}

function filterItems(e) {
    const searchText = e.target.value;

    items.forEach(item => {
        item.classList.remove('hidden');
    });

    if (searchText.trim()) {
        items.forEach(item => {
            if (!item.textContent.toLowerCase().includes(searchText.toLowerCase())) {
                item.classList.add('hidden');
            }
        });
    }
}

const debounceFilter = debounce(filterItems, 300);

searchInput.oninput = debounceFilter;
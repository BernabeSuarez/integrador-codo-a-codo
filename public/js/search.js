const searchInput = document.querySelector("#search");
const form = document.querySelector("#search-form");

searchInput.addEventListener("keypress", (e) =>{
    if (e.key === 'Enter')
        form.submit();
});
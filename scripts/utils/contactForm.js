function displayModal() {
    const body = document.querySelector('body');
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    body.style.overflowY = 'hidden';
}

function closeModal() {
    const body = document.querySelector('body');
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    body.style.overflowY = 'auto';
}

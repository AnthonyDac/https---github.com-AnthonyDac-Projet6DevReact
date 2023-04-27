async function getPhotographers() {
    let photographers = undefined;
    await fetch('../../data/photographers.json')
    .then(response => response.json())
    .then(data => {
        photographers = data.photographers;
    })
    .catch(error => {
        console.log(error);
    });
    return ({photographers: [...photographers]})
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer, true);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();
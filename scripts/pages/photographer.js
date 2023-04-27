let photographer = undefined;
let medias = [];
let indexCarroussel = undefined;

async function getPhotographer() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const response = await fetch('../../data/photographers.json');
  const data = await response.json();
  photographer = data.photographers.find(element => element.id == id);
  medias = data.media.filter(element => element.photographerId == id);
  return { photographer, medias };
}

async function displayData(photographer, medias) {
  const photographersSection = document.querySelector(".photograph-header");
  const mediasSection = document.querySelector(".medias");
  const photographerPrice = document.querySelector("#price");
  const photographerName = document.querySelector("#name");
  const photographerModel = photographerFactory(photographer, false);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographersSection.appendChild(userCardDOM);
  photographerPrice.innerHTML = photographer.price + '€/jour';
  photographerName.innerHTML = photographer.name;
  displaySumLikes();
  const sortedMedias = trierMedias(medias, select.value);
  const galeryModel = galeryFactory(sortedMedias);
  const galeryCards = galeryModel.getGaleryCardDOM;
  mediasSection.innerHTML = '';
  galeryCards.forEach((card) => mediasSection.appendChild(card));
};

async function displaySumLikes() {
  let sumLikes = 0;
  medias.forEach(objet => {
    sumLikes += objet.likes;
  });
  const photographerLikes = document.querySelector("#sumLikes");
  photographerLikes.innerHTML = sumLikes + ' ❤';
}
const select = document.getElementById('sort-select');
select.addEventListener('change', function() {
  const selectedValue = this.value;
  const sortedMedias = trierMedias(medias, selectedValue);
  const galeryModel = galeryFactory(sortedMedias);
  const galeryCards = galeryModel.getGaleryCardDOM;
  const mediasSection = document.querySelector(".medias");
  mediasSection.innerHTML = '';
  galeryCards.forEach((card) => mediasSection.appendChild(card));
  addEventListeners();
});

function trierMedias(medias, tri) {
  switch (tri) {
    case 'popularite':
      return medias.sort((a, b) => b.likes - a.likes);
    case 'date':
      return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'titre':
      return medias.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return medias;
  }
}

window.onload = function() {
  localStorage.clear();
  addEventListeners();

  document.getElementById('prev').onclick = function() {
    previousCarroussel();
  };

  document.getElementById('next').onclick = function() {
    nextCarroussel();
  };
  document.getElementById('closeModal').onclick = function() {
    closeModalCarroussel();
  };
};

function addEventListeners() {
  const likeButtons = document.querySelectorAll('.like-btn');
  const images = document.querySelectorAll('.image-display');

  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      let id = button.id.replace("like-", "");
      toggleLike(id);
    });
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
     previousCarroussel()
    } else if (event.key === 'ArrowRight') {
      nextCarroussel();
    } else if (event.key === 'Escape') {
      closeModalCarroussel();
    }
  });
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement) {
            focusedElement.click();
        }
    }
  });

  images.forEach(element => {
    element.addEventListener('click', () => {
      const objectIndex = medias.findIndex(obj => obj.id === parseInt(element.id));
      displayOnCarroussel(objectIndex);
    });
  });
}
/*
async function displayOnCarroussel(index) {
  const displayerCarroussel = document.querySelector('#modal');
  const imageCarroussel = document.querySelector('#carroussel-image');
  const videoCarroussel = document.querySelector('#carroussel-video');
  const videoContainer = document.querySelectorAll('.videoContainer');
  const body = document.querySelector('body');
  body.style.overflowY = 'hidden';
  displayerCarroussel.style.display = 'flex';
  videoContainer.forEach(element => {
    element.innerHTML = '';
  })
  if(medias[index].image) {
    imageCarroussel.style.display = "flex";
    videoContainer.forEach(element => {
      element.style.display = 'none';
    })
    imageCarroussel.src = 'assets/medias/' + medias[index].image;
    imageCarroussel.alt = medias[index].title;
  } else {
    imageCarroussel.style.display = "none";
    const videoElement = document.createElement('video');
    videoElement.id = 'carroussel-video';
    videoElement.controls = true;
    videoElement.innerHTML = `<source src="assets/medias/${medias[index].video}" type="video/mp4">Your browser does not support the video tag.`;
    videoContainer.forEach(element => {
      element.style.display = 'flex';
      element.appendChild(videoElement);
    })
  }
  indexCarroussel = index;
}*/

async function displayOnCarroussel(index) {
  const displayerCarroussel = document.querySelector('#modal');
  const imageCarroussel = document.querySelector('#carroussel-image');
  const videoCarroussel = document.querySelector('#carroussel-video');
  const videoContainer = document.querySelectorAll('.videoContainer');
  const body = document.querySelector('body');
  body.style.overflowY = 'hidden';
  displayerCarroussel.style.display = 'flex';
  displayerCarroussel.tabIndex = 8; // Ajout du tabindex
  displayerCarroussel.focus(); // Focus sur la modale

  videoContainer.forEach(element => {
    element.innerHTML = '';
  });

  if(medias[index].image) {
    imageCarroussel.style.display = "flex";
    videoContainer.forEach(element => {
      element.style.display = 'none';
    });
    imageCarroussel.src = 'assets/medias/' + medias[index].image;
    imageCarroussel.alt = medias[index].title;
  } else {
    imageCarroussel.style.display = "none";
    const videoElement = document.createElement('video');
    videoElement.id = 'carroussel-video';
    videoElement.controls = true;
    videoElement.innerHTML = `<source src="assets/medias/${medias[index].video}" type="video/mp4">Your browser does not support the video tag.`;
    videoContainer.forEach(element => {
      element.style.display = 'flex';
      element.appendChild(videoElement);
    });
  }
  indexCarroussel = index;

  // Gestion du focus à l'intérieur de la modale
  displayerCarroussel.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const focusableElements = Array.from(displayerCarroussel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  });
}

async function closeModalCarroussel() {
  const displayerCarroussel = document.querySelector('#modal');
  displayerCarroussel.style.display = 'none';
  const body = document.querySelector('body');
  body.style.overflowY = 'auto';
}
async function nextCarroussel() {
  const lastIndex = medias.length - 1;
  if(indexCarroussel === lastIndex) {
    indexCarroussel = 0;
    displayOnCarroussel(indexCarroussel);
  } else {
    displayOnCarroussel(indexCarroussel + 1);
  }
}

async function previousCarroussel() {
  if (indexCarroussel === 0) {
    indexCarroussel = medias.length - 1;
    displayOnCarroussel(indexCarroussel);
  } else {
    displayOnCarroussel(indexCarroussel - 1);
  }
}

async function toggleLike(id) {
  const media = medias.find((media) => media.id == parseInt(id));
  if (media) {
    media.likes = media.likes + 1;
    const galeryModel = galeryFactory(medias);
    galeryModel.updateAndRefreshLike(media);
    displaySumLikes();
  }
}

async function init() {
  const { photographer, medias } = await getPhotographer();
  displayData(photographer, medias);
}

init();
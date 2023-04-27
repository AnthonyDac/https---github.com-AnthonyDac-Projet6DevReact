function photographerFactory(data, formatted) {
    const { name, portrait, city, country, tagline, price, id } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
      const div = document.createElement('div');
      const img = document.createElement('img');
      const a = document.createElement('a');
      const h2 = document.createElement('h2');
      const span = document.createElement('span');
      const p = document.createElement('p');
      const spanPrice = document.createElement('span');
      const article = document.createElement('article');
      if(formatted === true) {
        div.classList.add('details');
        a.setAttribute('href', '../photographer.html?id='+id);
        a.title = `Voir la page de ${name}`;
        a.appendChild(img);
        img.setAttribute('src', picture);
        img.setAttribute('alt', "Portrait de "+name);
        img.setAttribute("aria-label", "Portrait de " + name);
        h2.textContent = name;
        span.textContent = `${city}, ${country}`;
        p.textContent = tagline;
        spanPrice.textContent = `${price}€/jour`;
        div.appendChild(span);
        div.appendChild(p);
        div.appendChild(spanPrice);
        article.appendChild(a);
        article.appendChild(h2);
        article.appendChild(div);
        return article;
      } else {
        const infos = document.createElement('div');
        div.classList.add('details');
        infos.classList.add('infos');
        img.setAttribute('src', picture);
        img.setAttribute('alt', "Portrait de "+name);
        img.setAttribute("aria-label", "Portrait de " + name);
        h2.textContent = name;
        span.textContent = `${city}, ${country}`;
        p.textContent = tagline
        infos.appendChild(h2);
        infos.appendChild(span);
        infos.appendChild(p);
        const contactButton = document.createElement('button');
        contactButton.classList.add('contact_button');
        contactButton.setAttribute("tabindex", "1");
        contactButton.textContent = 'Contactez-moi';
        contactButton.onclick = displayModal;
        div.appendChild(infos);
        div.appendChild(contactButton);
        div.appendChild(img);
        return div;
      }
    }
    return { name, picture, getUserCardDOM };
}
  
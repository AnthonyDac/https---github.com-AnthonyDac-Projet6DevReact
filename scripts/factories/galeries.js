function galeryFactory(data) {
  function getGaleryCardDOM(data) {
    const { date, id, image, video, likes, photographerId, price, title } = data;
    const isVideo = video && video.includes(".mp4");
    const mediaUrl = isVideo ? `assets/medias/${video}` : `assets/medias/${image}`;
    const div = document.createElement("div");
    const titleLikes = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const like_btn = document.createElement("button");
    div.classList.add("galery-card");
    div.appendChild(img);
    img.id = id;
    img.classList.add('image-display')
    img.setAttribute("src", mediaUrl);
    img.setAttribute("alt", title);
    img.setAttribute("aria-label", title);
    img.setAttribute("tabindex", "12");
    h2.textContent = title;
    like_btn.textContent = "❤";
    like_btn.setAttribute("title", "Like/dislike");
    like_btn.setAttribute("tabindex", "12");
    like_btn.id = 'like-' + id;
    like_btn.classList.add('like-btn');
    p.textContent = likes;
    p.id = 'display_like-' + id;
    span.appendChild(p);
    span.appendChild(like_btn);
    titleLikes.classList.add("card-infos");
    titleLikes.appendChild(h2);
    titleLikes.appendChild(span);
    div.appendChild(titleLikes);
    if(isVideo) {
      const videoElement = document.createElement("video");
      videoElement.style.display = "none";
      videoElement.src = mediaUrl;
      div.appendChild(videoElement);
      const canvasElement = document.createElement("canvas");
      canvasElement.width = 700;
      canvasElement.height = 500;
      videoElement.appendChild(canvasElement);
      const context = canvasElement.getContext("2d");
      videoElement.addEventListener("loadeddata", function() {
        videoElement.currentTime = videoElement.duration / 2;
      });
      videoElement.addEventListener("seeked", function() {
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        img.src = canvasElement.toDataURL();
      });
    }
    return div;
  }

  function updateAndRefreshLike(media) {
    const mediaToUpdate = data.find((item) => item.id == media.id);
    if (mediaToUpdate) {
      mediaToUpdate.likes = media.likes;
      const likeDisplay = document.getElementById("display_like-" + media.id);
      if (likeDisplay) {
        likeDisplay.textContent = media.likes;
      }
    }
  }

  const getUserCardDOMArray = data.map((item) => getGaleryCardDOM(item));
  return {
    getGaleryCardDOM: getUserCardDOMArray,
    updateAndRefreshLike,
  };
}
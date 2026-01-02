
// ================sliders================

const playCards = document.querySelectorAll(".play-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const playlistFrame = document.querySelector(".video-iframe iframe");
const allCards = document.querySelector(".sliders");


let firstCard;
let totalWidth;
let visibleWidth;
let maxOffset;



let offset = 0;

const defaultSize = 250; // in px 


playCards.forEach(async (card, i) => {
    let link = card.getAttribute("data-target");
    getYouTubeTitle(link, card, i);
    card.addEventListener("click", () => {
        playCards.forEach(crd => crd.classList.remove("active-slide"));
        card.classList.add("active-slide");
        let title = card.querySelector("img").alt;
        changePlaylistSrc(link, title);
    });
});


function changePlaylistSrc(link, title) {
    playlistFrame.setAttribute("src", link);
    playlistFrame.setAttribute("title", title);
}

function setThumbAlt(thumb, card, alt, i) {
    let img = card.querySelector("img");
    img.src = thumb;
    img.setAttribute("alt", alt);
    if (i === 0) {
        let link = card.getAttribute("data-target");
        changePlaylistSrc(link, alt)
    }
}

function applyTransform() {
    playCards.forEach(card => {
        card.style.transform = `translateX(-${offset}px)`;
    });
}

nextBtn.addEventListener("click", () => {
    calculateOffsetWidth();
    offset = Math.min(offset + defaultSize, maxOffset);
    applyTransform();
});

prevBtn.addEventListener("click", () => {
    calculateOffsetWidth();
    offset = Math.max(offset - defaultSize, 0);
    applyTransform();
});

function calculateOffsetWidth() {
    firstCard = playCards[0];
    totalWidth = firstCard.parentElement.scrollWidth;
    visibleWidth = firstCard.parentElement.clientWidth;
    maxOffset = totalWidth - visibleWidth;
}


function getYouTubeTitle(link, card, i) {
    const videoId = link.split('/embed/')[1].split('?')[0];
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}`;
    const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    fetch(oembedUrl)
        .then(response => response.json())
        .then(data => {
            setThumbAlt(thumb, card, data.title, i);
        })
        .catch(error => console.error('Error:', error));
}

//================media card - duplication for infinite scroll================
const mediaTrack = document.querySelector(".media-track");
const mediaSlider = document.querySelector(".media-slider");

function duplicateMediaTrack() {
    const duplicateTrack = mediaTrack.cloneNode(true);
    duplicateTrack.classList.add("duplicate-media-track");
    mediaSlider.appendChild(duplicateTrack);
}

if(mediaSlider){
    duplicateMediaTrack();
}
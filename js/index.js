// initialize its empty
const typewriterElement = document.querySelector(".hero-hashtag");
typewriterElement.textContent = '\u200B';

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


// ================timer for the event================

const eventDate = new Date("2026-08-21 GMT+05:30").getTime(); // IN YYYY-MM-DD and time zone for corrrect date
const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");

countdown();
setInterval(countdown, 1000);

function countdown() {
    if (!d || !h || !m || !s)
        return;
    const now = new Date().getTime();
    const distance = eventDate - now;
    if (distance > 0) {
        d.textContent = Math.floor(distance / (1000 * 86400));
        h.textContent = Math.floor(distance % (1000 * 86400) / (1000 * 3600));
        m.textContent = Math.floor(distance % (1000 * 3600) / (1000 * 60));
        s.textContent = Math.floor(distance % (1000 * 60) / (1000));
    }
    else {
        d.textContent = "0";
        h.textContent = "0";
        m.textContent = "0";
        s.textContent = "0";
    }
}


//Typing animation for the edition
const phrases = [
    "EDITION 3"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 150;
const deletingSpeed = 100;
const pauseBetweenPhrases = 3000;

// Add a zero-width character to maintain height
function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        const text = currentPhrase.substring(0, charIndex - 1);
        typewriterElement.textContent = text || '\u200B'; // Zero-width space when empty
        charIndex--;
    } else {
        const text = currentPhrase.substring(0, charIndex + 1);
        typewriterElement.textContent = text || '\u200B'; // Zero-width space when empty
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = pauseBetweenPhrases;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1000);


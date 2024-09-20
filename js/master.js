let backGround = document.querySelector(".background");
let backgroundArray = ["imgs/01.jpg", "imgs/02.jpg", "imgs/03.jpg", "imgs/04.jpg", "imgs/05.jpg", "imgs/06.jpg", "imgs/07.jpg", "imgs/08.jpg", "imgs/09.jpg"];
var open_list = document.querySelector(".settings-icon");
let add_openClass = document.querySelector(".settings-box");
let icon_span = document.querySelector(".settings-icon i");
let color_selection = document.querySelectorAll(".colors-option li ");
let creative_span = document.querySelector(".HText span ");
let nav_a = document.querySelectorAll(".nav-item a ");
let random_bg = document.querySelectorAll("#random-background span");
let show_b = document.querySelectorAll("#Show-Bullets span");
let bullets = document.querySelector(".bullets");
let reset = document.querySelector(".settings-box .reset");
let interval_bg;
let Skill_sec = document.querySelector("#Skills");
let spans_progress = document.querySelectorAll(".skill-progress span");
let images = document.querySelectorAll(".gallery img");

// Scroll to sections slowly 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
})

// loading differents backgrounds 
// default random background 
// deault show bullets
random_bg[0].classList.add("active-selection");
show_b[0].classList.add("active-selection");

if (window.localStorage.getItem("randomBG")) {
    BG_selection(window.localStorage.getItem("randomBG"));
    document.querySelector('[value="' + window.localStorage.getItem("randomBG") + '"]').parentElement.querySelector(".active-selection").classList.remove("active-selection");
    document.querySelector('[value="' + window.localStorage.getItem("randomBG") + '"]').classList.add("active-selection");
} else {
    interval_bg = window.setInterval(nextBackground, 2000);
}

if (window.localStorage.getItem("showBullets")) {
    SH_bullets(window.localStorage.getItem("showBullets"));
    document.querySelector('[value="' + window.localStorage.getItem("showBullets") + '"]').parentElement.querySelector(".active-selection").classList.remove("active-selection");
    document.querySelector('[value="' + window.localStorage.getItem("showBullets") + '"]').classList.add("active-selection");
}

random_bg.forEach(element => {
    element.addEventListener("click", function(e) {
        //remove activation from all childs 
        e.target.parentElement.querySelector(".active-selection").classList.remove("active-selection");
        e.target.classList.add("active-selection");
        window.localStorage.setItem("randomBG", e.target.getAttribute("value"));
        BG_selection(e.target.getAttribute("value"));

    })
});
show_b.forEach(element => {
    element.addEventListener("click", function(e) {
        //remove activation from all childs 
        e.target.parentElement.querySelector(".active-selection").classList.remove("active-selection");
        e.target.classList.add("active-selection");
        window.localStorage.setItem("showBullets", e.target.getAttribute("value"));
        SH_bullets(e.target.getAttribute("value"));

    })
});

function BG_selection(select) {
    if (select === "no") {
        let random = Math.floor(Math.random() * backgroundArray.length);
        backGround.style.backgroundImage = 'url("' + backgroundArray[random] + '")';
        clearTimeout(interval_bg);
    } else {
        interval_bg = window.setInterval(nextBackground, 2000);
    }
}

function SH_bullets(select) {
    if (select === "none") {
        bullets.style.display = "none";
    } else {
        bullets.style.display = "block";
    }
}
// check if there is a color in local storage 
if (window.localStorage.getItem("color")) {
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem("color"));
    document.querySelector('[data-color="' + window.localStorage.getItem("color") + '"]').classList.add("active");
}

// get random next background 
function nextBackground() {
    let random = Math.floor(Math.random() * backgroundArray.length);
    backGround.style.backgroundImage = 'url("' + backgroundArray[random] + '")';
}

// open settings 
function settings() {
    add_openClass.classList.toggle("open");
    icon_span.classList.toggle("fa-spin");
}

// activat selected color 
function activation(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    e.target.classList.add("active");
}
// open settings 
open_list.addEventListener("click", settings);
// change color according to selection 
color_selection.forEach(element => {
    element.addEventListener("click", function(e) {
        document.documentElement.style.setProperty('--main-color', e.target.getAttribute("data-color"));
        window.localStorage.setItem("color", e.target.getAttribute("data-color"));
        activation(e);
    })
});

// Skill animation
window.onscroll = function() {
    if (window.scrollY >= Skill_sec.offsetTop) {
        spans_progress.forEach(span => {
            span.style.width = span.getAttribute("data-width");
        });
    }
};
// gallery popup
let h5 = document.querySelector(".popUp h5");
let img = document.querySelector(".popUp img");
let exit = document.querySelector(".popUp .exit");
let popOverLay = document.querySelector(".popup-overlay");

let popup = document.querySelector(".popUp");
images.forEach(element => {
    element.addEventListener("click", function() {
        popOverLay.classList.add("appear");
        popup.classList.add("appear");
        h5.innerHTML = "Image " + element.getAttribute("value");
        img.setAttribute("src", element.getAttribute("src"));
    })
});
exit.addEventListener("click", function() {
    popOverLay.classList.remove("appear");
    popup.classList.remove("appear");
});
/***Reset Button******/
reset.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
/*tooltip*/

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})
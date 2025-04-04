const menuElem = document.querySelector("#menu");
const navOverlayElem = document.querySelector("#nav-overlay");

// Select all nav links and menu elements
const navLinks = document.querySelectorAll("#nav-overlay menu li");
const menus = document.querySelectorAll("#nav-overlay menu[id$='_menu']");

// nav subjects
const navSubjects = document.querySelectorAll("#intro-subjects > div");

//
const languageBtn = document.querySelector("#language-btn");
const languageDropdown = document.querySelector("#language-dropdown");

//
const navSearchBtn = document.querySelector("#nav-search-btn");
const menuSearchBtn = document.querySelector("#menu-search-btn");

//
const pageLink = document.querySelector("#page-link");

//! events
//* toggle nav overlay and menu icons
let showOverlay = false;
menuElem.addEventListener("click", () => {
  showOverlay = !showOverlay;
  if (showOverlay) {
    navOverlayElem.classList.add("h-[90vh]");
    navOverlayElem.classList.remove("h-0");

    menuElem.querySelector("img:nth-child(1)").classList.add("hidden");
    menuElem.querySelector("img:nth-child(2)").classList.remove("hidden");

    navSearchBtn.classList.add("opacity-0");

    menuSearchBtn.classList.remove("opacity-0");
    menuSearchBtn.classList.add("opacity-full");
  } else {
    navOverlayElem.classList.remove("h-[90vh]");
    navOverlayElem.classList.add("h-0");

    menuElem.querySelector("img:nth-child(1)").classList.remove("hidden");
    menuElem.querySelector("img:nth-child(2)").classList.add("hidden");

    navSearchBtn.classList.add("opacity-full");
    navSearchBtn.classList.remove("opacity-0");

    menuSearchBtn.classList.add("opacity-0");
  }
});

//* Add event listeners to each nav link
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    navLinks.forEach((link) => {
      link.classList.toggle("active-link", link === navLink);
    });

    const menuId = `${navLink.id}_menu`;
    switchMenu(menuId);
    switchSubject(menuId);
  });
});

//* toggle language dropdown event
let showLanguageDropdown = false;
languageBtn.addEventListener("click", () => {
  showLanguageDropdown = !showLanguageDropdown;
  if (showLanguageDropdown) {
    languageDropdown.classList.remove("h-0");
    languageDropdown.classList.add("h-full");
  } else {
    languageDropdown.classList.remove("h-full");
    languageDropdown.classList.add("h-0");
  }
});

//
let searchInputWidth = "w-[12rem]";
navSearchBtn.addEventListener("mouseover", () => {
  navSearchBtn.querySelector("input").classList.remove("w-0");
  navSearchBtn.querySelector("input").classList.add("w-[12rem]");
});

navSearchBtn.addEventListener("mouseout", () => {
  if (document.activeElement !== navSearchBtn.querySelector("input")) {
    navSearchBtn.querySelector("input").classList.add("w-0");
    navSearchBtn.querySelector("input").classList.remove("w-[12rem]");
  }
});

navSearchBtn.querySelector("input").addEventListener("blur", () => {
  navSearchBtn.querySelector("input").classList.remove("w-[12rem]");
  navSearchBtn.querySelector("input").classList.add("w-0");
});

//! utils
//* Function to handle menu switching
function switchMenu(selectedMenuId) {
  menus.forEach((menu) => {
    console.log(selectedMenuId);
    if (menu.id !== selectedMenuId) {
      menu.classList.add("opacity-0");
      menu.classList.add("invisible");

      setTimeout(() => {
        menu.classList.add("hidden");
      }, 500);
    } else {
      menu.classList.remove("opacity-0");
      menu.classList.remove("invisible");

      setTimeout(() => {
        menu.classList.remove("hidden");
      }, 500);
    }
  });
}

//* Function to handle nav subjects
function switchSubject(selectedMenuId) {
  navSubjects.forEach((subject) => {
    let matchId = selectedMenuId.split("_")[0];

    if (matchId.includes("-")) {
      matchId = matchId.split("-")[0];
    }

    pageLink.setAttribute("href", `/pages/${matchId}`);

    if (!subject.id.includes(matchId)) {
      subject.classList.add("opacity-0");
      subject.classList.add("invisible");

      setTimeout(() => {
        subject.classList.add("hidden");
      }, 500);
    } else {
      subject.classList.remove("opacity-0");
      subject.classList.remove("invisible");

      setTimeout(() => {
        subject.classList.remove("hidden");
      }, 500);
    }
  });
}

//#00000026

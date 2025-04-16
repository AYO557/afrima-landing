const menuElem = document.querySelector("#menu");
const navOverlayElem = document.querySelector("#nav-overlay");

// Select all nav links and menu elements
const navLinks = document.querySelectorAll("#nav-overlay > menu li");
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

const mobileLanguageBtn = document.querySelector("#mobile-language-btn");
const mobileLanguageDropdown = document.querySelector(
  "#mobile-language-dropdown"
);
const mobileSelectedLanguage = document.querySelector(
  "#mobile-selected-language"
);

//

//! events
//* toggle nav overlay and menu icons
let showOverlay = false;
menuElem.addEventListener("click", () => {
  showOverlay = !showOverlay;
  if (showOverlay) {
    navOverlayElem.classList.add("h-auto");
    navOverlayElem.classList.remove("h-0");

    menuElem.querySelector("img:nth-child(1)").classList.add("hidden");
    menuElem.querySelector("img:nth-child(2)").classList.remove("hidden");

    navSearchBtn.classList.add("opacity-0");

    menuSearchBtn.classList.remove("opacity-0");
    menuSearchBtn.classList.add("opacity-full");
  } else {
    navOverlayElem.classList.remove("h-auto");
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

    showOverlay = false;
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

function toggleLanguageDropdown() {
  showLanguageDropdown = !showLanguageDropdown;
  if (showLanguageDropdown) {
    mobileLanguageDropdown.classList.remove("h-0");
    mobileLanguageDropdown.classList.add("h-[80px]"); // Adjust height for two options
    mobileLanguageBtn.setAttribute("aria-expanded", "true");
  } else {
    mobileLanguageDropdown.classList.remove("h-[80px]");
    mobileLanguageDropdown.classList.add("h-0");
    mobileLanguageBtn.setAttribute("aria-expanded", "false");
  }
}

// mobile language dropdown
mobileLanguageBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent closing when clicking button
  toggleLanguageDropdown();
});

// Update selected language on option click
mobileLanguageDropdown.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    const language = option.getAttribute("data-language");
    mobileSelectedLanguage.textContent = language;
    showLanguageDropdown = false;
    mobileLanguageDropdown.classList.remove("h-[80px]");
    mobileLanguageDropdown.classList.add("h-0");
    mobileLanguageBtn.setAttribute("aria-expanded", "false");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (
    !mobileLanguageBtn.contains(event.target) &&
    !mobileLanguageDropdown.contains(event.target)
  ) {
    showLanguageDropdown = false;
    mobileLanguageDropdown.classList.remove("h-[80px]");
    mobileLanguageDropdown.classList.add("h-0");
    mobileLanguageBtn.setAttribute("aria-expanded", "false");
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

function isMobile() {
  return window.innerWidth <= 768;
}

//! mobile nav bar
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileNavOverlay = document.querySelector("#mobile-nav-overlay");

let isMobileNavOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  isMobileNavOpen = !isMobileNavOpen;

  if (isMobileNavOpen) {
    mobileMenuBtn.querySelector("img:first-of-type").classList.add("hidden");
    mobileMenuBtn.querySelector("img:last-of-type").classList.remove("hidden");

    mobileNavOverlay.classList.remove("h-0", "pb-20");
    mobileNavOverlay.classList.add("h-[200vh]", "pb-20");
  } else {
    mobileMenuBtn.querySelector("img:first-of-type").classList.remove("hidden");
    mobileMenuBtn.querySelector("img:last-of-type").classList.add("hidden");

    mobileNavOverlay.classList.remove("h-[200vh]", "pb-20");
    mobileNavOverlay.classList.add("h-0");
  }
});

const mobileNavDetails = [
  {
    id: "mobile-about-us",
    title: "About Us",
    description:
      "The All Africa Music Awards (AFRIMA) is the continent's most prestigious event dedicated to recognizing and celebrating the immense talent and diversity of African music. Established to honor the rich musical heritage of Africa, AFRIMA stands as a beacon of pride for Africa, demonstrating the power of music to unite, inspire, and drive positive change.",
    subLinks: ["Our History", "Vision, Mision, Values", "Team", "Partners"],
    link: "/pages/about/",
    image: "/about.svg",
  },
  {
    id: "mobile-awards",
    title: "Awards",
    description:
      "The All Africa Music Awards (AFRIMA) is the continent's most prestigious event dedicated to recognizing and celebrating the immense talent and diversity of African music. Established to honor the rich musical heritage of Africa, AFRIMA stands as a beacon of pride for Africa, demonstrating the power of music to unite, inspire, and drive positive change.",
    subLinks: [
      "Categories",
      "2025 Nominees",
      "How Winners Emerge",
      "Past Winners",
    ],
    link: "/pages/awards",
    image: "/awards.svg",
  },
  {
    id: "mobile-events",
    title: "Events",
    description:
      "The All Africa Music Awards (AFRIMA) is the continent's most prestigious event dedicated to recognizing and celebrating the immense talent and diversity of African music. Established to honor the rich musical heritage of Africa, AFRIMA stands as a beacon of pride for Africa, demonstrating the power of music to unite, inspire, and drive positive change.",
    subLinks: ["Events Schedule", "Afrima Pillars/Projects", "Tickets"],
    link: "/pages/events",
    image: "/events.svg",
  },
  {
    id: "mobile-afrima-pillars",
    title: "Afrima Pillars/Projects",
    description:
      "The All Africa Music Awards (AFRIMA) is the continent's most prestigious event dedicated to recognizing and celebrating the immense talent and diversity of African music. Established to honor the rich musical heritage of Africa, AFRIMA stands as a beacon of pride for Africa, demonstrating the power of music to unite, inspire, and drive positive change.",
    subLinks: [
      "Award Ceremony",
      "Music Festival",
      "Music Business Hub",
      "Talent Discovery Promo",
      "Creative Academy",
      "Advisory Policy Debate",
      "Our Voice",
    ],
    link: "/pages/afrima-pillars",
    image: "/afrima-pillars.svg",
  },
  {
    id: "mobile-media",
    title: "Media",
    description:
      "The All Africa Music Awards (AFRIMA) is the continent's most prestigious event dedicated to recognizing and celebrating the immense talent and diversity of African music. Established to honor the rich musical heritage of Africa, AFRIMA stands as a beacon of pride for Africa, demonstrating the power of music to unite, inspire, and drive positive change.",
    subLinks: [
      "Press Releases",
      "Media Accreditation",
      "International Media Committe",
      "Social Media Handles",
    ],
    link: "/pages/media",
    image: "/media.svg",
  },
  {
    id: "mobile-contact-us",
    title: "Contact Us",
    description:
      "The All Africa Music Awards (AFRIMA) is the continent's most prestigious event dedicated to recognizing and celebrating the immense talent and diversity of African music. Established to honor the rich musical heritage of Africa, AFRIMA stands as a beacon of pride for Africa, demonstrating the power of music to unite, inspire, and drive positive change.",
    subLinks: ["Enquiry Form", "Contact Information"],
    link: "/pages/contact",
    image: "/contact.svg",
  },
];

// First, let's select all the link elements in the mobile-nav-links container
const mobileNavLinks = document.querySelectorAll("#mobile-nav-links .link");
const mobileNavSublinks = document.querySelector("#mobile-nav-sublinks");
const backToMainNav = document.querySelector(
  "#mobile-nav-sublinks div:first-child"
);

// Function to populate the sublinks container with data
function showSublinks(navItem) {
  // Find the matching data in mobileNavDetails
  const navData = mobileNavDetails.find((item) => item.id === navItem.id);

  if (!navData) return;

  // Update the heading
  const heading = mobileNavSublinks.querySelector(
    "div:first-child span:last-child"
  );
  heading.textContent = navData.title;

  // Update the image
  const image = mobileNavSublinks.querySelector(
    "div.flex.flex-col.gap-4 div:first-child img"
  );
  if (image.src.includes("about.svg")) {
    image.src = image.src.replace("about.svg", "");
  }
  if (image.src.includes("awards.svg")) {
    image.src = image.src.replace("awards.svg", "");
  }
  if (image.src.includes("events.svg")) {
    image.src = image.src.replace("events.svg", "");
  }
  if (image.src.includes("afrima-pillars.svg")) {
    image.src = image.src.replace("afrima-pillars.svg", "");
  }
  if (image.src.includes("media.svg")) {
    image.src = image.src.replace("media.svg", "");
  }
  if (image.src.includes("contact.svg")) {
    image.src = image.src.replace("contact.svg", "");
  }
  image.src += navData.image;
  image.alt = navData.title;

  // Update the title
  const title = mobileNavSublinks.querySelector("h2");
  title.textContent = navData.title;

  // Update the description
  const description = mobileNavSublinks.querySelector("p.leading-7");
  description.textContent = navData.description;

  // Update the button link
  const button = mobileNavSublinks.querySelector("button");
  button.addEventListener("click", () => {
    window.location.href = navData.link;
  });

  // Update the sublinks
  const sublinksContainer = mobileNavSublinks.querySelector(
    "div.flex.flex-col.gap-4.px-5.py-2"
  );
  sublinksContainer.innerHTML = "";

  navData.subLinks.forEach((subLink) => {
    const linkElement = document.createElement("p");
    linkElement.className = "border-b border-gray-300 w-fit";
    linkElement.textContent = subLink;

    // You could add click handlers for these sublinks as well if needed
    // linkElement.addEventListener("click", () => {
    //   window.location.href = `./${navData.link}/${subLink
    //     .toLowerCase()
    //     .replace(/\s+/g, "-")}.html`;
    // });

    sublinksContainer.appendChild(linkElement);
  });

  // Show the sublinks container and hide the main links
  document.querySelector("#mobile-nav-links").classList.add("hidden");
  mobileNavSublinks.classList.remove("hidden");
}

// Add click event listeners to all mobile nav links
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showSublinks(link);
  });
});

// Add back button functionality
if (backToMainNav) {
  backToMainNav.addEventListener("click", () => {
    mobileNavSublinks.classList.add("hidden");
    document.querySelector("#mobile-nav-links").classList.remove("hidden");
  });
}

// Update the mobile menu button functionality to ensure it works with the sublinks
// mobileMenuBtn.addEventListener("click", () => {
//   isMobileNavOpen = !isMobileNavOpen;

//   if (isMobileNavOpen) {
//     mobileMenuBtn.querySelector("img:first-of-type").classList.add("hidden");
//     mobileMenuBtn.querySelector("img:last-of-type").classList.remove("hidden");
//     document.querySelector("#mobile-nav-container").classList.remove("hidden");
//   } else {
//     mobileMenuBtn.querySelector("img:first-of-type").classList.remove("hidden");
//     mobileMenuBtn.querySelector("img:last-of-type").classList.add("hidden");
//     document.querySelector("#mobile-nav-container").classList.add("hidden");

//     // Reset to main navigation when closing
//     mobileNavSublinks.classList.add("hidden");
//     document.querySelector("#mobile-nav-links").classList.remove("hidden");
//   }
// });

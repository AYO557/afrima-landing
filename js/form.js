const form = document.querySelector("#entryform");
const btn = document.querySelector("#submitBtn");

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

//

//! events
//* toggle nav overlay and menu icons
let showOverlay = false;

btn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Clear previous errors
  const inputs = document.querySelectorAll(
    "#entryform input, #entryform select"
  );
  inputs.forEach((input) => {
    input.style.border = "1px solid transparent";
  });

  // Helper function to show error
  function showError(input, message) {
    input.style.border = "1px solid red";
    alert(message); // You can use a nicer popup or inline error if preferred
  }

  // Collect inputs
  const firstName = inputs[0];
  const lastName = inputs[1];
  const countryOrigin = inputs[2];
  const countryResidence = inputs[3];
  const region = inputs[4];
  const postalCode = inputs[5];
  const address = inputs[6];
  const phone = inputs[7];
  const email = inputs[8];
  const stageName = inputs[9];
  const albumTitle = inputs[10];
  const trackTitle = inputs[11];
  const songLink = inputs[12];
  const recordLabel = inputs[13];
  const producer = inputs[14];
  const songwriter = inputs[15];
  const year = inputs[16];
  const regionalCategory = document.querySelectorAll("select")[3];
  const continentalCategory = document.querySelectorAll("select")[4];

  const requiredFields = [
    { input: firstName, name: "First Name" },
    { input: lastName, name: "Last Name" },
    { input: countryOrigin, name: "Country of Origin" },
    { input: countryResidence, name: "Country of Residence" },
    { input: region, name: "Region" },
    { input: postalCode, name: "Postal Code" },
    { input: address, name: "Address" },
    { input: phone, name: "Phone Number" },
    { input: email, name: "Email Address" },
    { input: stageName, name: "Stage Name" },
    { input: albumTitle, name: "Album Title" },
    { input: trackTitle, name: "Track Title" },
    { input: songLink, name: "Song Link" },
    { input: recordLabel, name: "Record Label" },
    { input: producer, name: "Producer" },
    { input: songwriter, name: "Songwriter" },
    { input: year, name: "Year of Recording" },
    { input: regionalCategory, name: "Regional Category" },
    { input: continentalCategory, name: "Continental Category" },
  ];

  // Validate fields
  for (const field of requiredFields) {
    if (!field.input.value.trim()) {
      showError(field.input, `${field.name} is required`);
      return;
    }
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, "Enter a valid email address");
    return;
  }

  // Validate phone
  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    showError(phone, "Enter a valid phone number");
    return;
  }

  // Validate song link (basic check)
  if (
    !songLink.value.trim().startsWith("http://") &&
    !songLink.value.trim().startsWith("https://")
  ) {
    showError(songLink, "Enter a valid URL for the song link");
    return;
  }

  // All validations passed – redirect
  window.location.href = "../pages/forms/success/index.html"; // change this to your target page
});

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

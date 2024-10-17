document.addEventListener("DOMContentLoaded", function () {
  const eyeContainer = document.querySelector(".eye-container");
  const pupil = document.querySelector(".pupil");
  const secretLink = document.querySelector(".secret-link");
  const defaultPupilImage = "website_assets/sphere.jpg";
  const hoverPupilImage = "website_assets/cross-mark_274c.png";
  const hole = document.querySelector("#hole");
  const marquee = document.querySelector(".marquee");

  // Set initial position of the pupil
  function setInitialPupilPosition() {
    const eyeRect = eyeContainer.getBoundingClientRect();
    const radius = eyeRect.width / 2;
    const angle = -Math.PI / 4; // -45 degrees in radians
    const initialX = radius * Math.cos(angle) - pupil.offsetWidth / 2;
    const initialY = radius * Math.sin(angle) - pupil.offsetHeight / 2;
    pupil.style.transform = `translate(${initialX}px, ${initialY}px)`;
  }

  setInitialPupilPosition();

  const savedPosition = localStorage.getItem("pupilPosition");
  if (savedPosition) {
    const position = JSON.parse(savedPosition);
    pupil.style.transform = `translate(${position.x}px, ${position.y}px)`;
  }

  function updatePupilPosition(x, y) {
    const eyeRect = eyeContainer.getBoundingClientRect();
    const centerX = eyeRect.left + eyeRect.width / 2;
    const centerY = eyeRect.top + eyeRect.height / 2;
    const radius = eyeRect.width / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const angle = Math.atan2(dy, dx);
    const pupilX =
      centerX + radius * Math.cos(angle) - eyeRect.left - pupil.offsetWidth / 2;
    const pupilY =
      centerY + radius * Math.sin(angle) - eyeRect.top - pupil.offsetHeight / 2;

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    localStorage.setItem(
      "pupilPosition",
      JSON.stringify({ x: pupilX, y: pupilY })
    );
  }
  if (history.state && history.state.showHomePage) {
    setTimeout(() => {
      hole.click();
    }, 1000);
  }
  // hole animation
  hole.addEventListener("click", function () {
    hole.classList.add("page-out");
    document.querySelector(".home-page").classList.remove("hidden");
    document.querySelector(".home-page").classList.add("page-in");
    window.history.pushState(
      { page: "home", showHomePage: true },
      "",
      "index.html"
    );
    setTimeout(() => {
      hole.classList.add("hidden");
    }, 2000);
  });
  marquee.addEventListener("click", function () {
    const state = { page: "maze" };
    history.pushState(state, "", "maze.html");
    location.href = "maze.html"; // Navigate to maze.html
  });

  // Push state when navigating to maze.html
  // marquee.addEventListener("click", function () {
  //   history.pushState(null, "", "maze.html");
  //   location.href = "maze.html";
  // });
  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.showHomePage) {
      document.querySelector(".home-page").classList.remove("hidden");
      hole.classList.add("hidden");
    } else {
      document.querySelector(".home-page").classList.add("hidden");
      // Optionally handle other states
    }
  });

  document.addEventListener("mousemove", function (e) {
    updatePupilPosition(e.clientX, e.clientY);
  });

  document.addEventListener("touchmove", function (e) {
    const touch = e.touches[0];
    updatePupilPosition(touch.clientX, touch.clientY);
  });

  secretLink.addEventListener("mouseover", function () {
    pupil.style.backgroundImage = `url(${hoverPupilImage})`;
  });

  secretLink.addEventListener("mouseout", function () {
    pupil.style.backgroundImage = `url(${defaultPupilImage})`;
  });
});

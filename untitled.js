window.addEventListener("popstate", function (event) {
  if (event.state && event.state.page === "home") {
    window.location.href = "index.html"; // Redirect to index.html
  }
});

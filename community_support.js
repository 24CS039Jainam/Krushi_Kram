// Show the button when user scrolls down 200px
window.onscroll = function () {
    let scrollBtn = document.getElementById("scrollBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };
  
  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
$(".navBtn").click(function(evt) {
  var url = $(evt.target).attr("location");
  $("button").removeClass("active");
  $(".btn.box").removeClass("active");
  $(evt.target)
    .addClass("active")
    .parent()
    .addClass("active");
  navigate(url, evt.target.innerHTML);
});
window.onpopstate = function(e) {
  var el = document.getElementById("content");
  $(el).addClass("animated fadeOut");
  function animationEnd() {
    el.innerHTML = e.state.html;
    $(el).removeClass("animated fadeOut");
    el.removeEventListener("animationend", animationEnd);
  }
  el.addEventListener("animationend", animationEnd);
};
function listeners() {
  $(".pSection").click(function(e) {
    var dir = $(e.currentTarget).attr("location");
    navigate("/portafolio/" + dir, dir);
  });
}

function navigate(url, title) {
  $.ajax({
    url,
    context: document.body
  }).done(function(data) {
    $("#content").addClass("animated fadeOut");
    function animationEnd() {
      var doc = new DOMParser()
        .parseFromString(data, "text/html")
        .getElementById("content").innerHTML;
      window.history.pushState({ html: doc, title: data.title }, "", url);
      window.title = title;
      document.getElementById("content").innerHTML = doc;
      $("#content").removeClass("animated fadeOut");
      document
        .getElementById("content")
        .removeEventListener("animationend", animationEnd);
      listeners();
    }
    document
      .getElementById("content")
      .addEventListener("animationend", animationEnd);
  });
}
listeners();

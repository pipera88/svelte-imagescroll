import ImageScroll from "./ImageScroll.html";

var imagescroll = new ImageScroll({
  target: document.querySelector(".svelte-imagescroll"),
  data: {
    transition: "slide",
    url: "/images/api/featured",
    autostart: false,
  },
});

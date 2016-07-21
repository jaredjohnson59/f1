var container = document.querySelector('.gallery');

container.addEventListener('click', function(e) {
  if (e.target != e.currentTarget) {
    e.preventDefault();
    // e.target is the image inside the link we just clicked.
  }
  e.stopPropagation();
}, false);

const anm = document.querySelectorAll<HTMLElement>(".intersection");
const options = {
  root: null,
  rootMargin: "0%",
  threshold: [0],
};
const observe = new IntersectionObserver(addAnimation, options);
anm?.forEach(function (elem, index): void {
  observe.observe(elem);
});
function addAnimation(entries: any): void {
  entries.forEach(function (entry: any): void {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-animated");
    }
  });
}

export default addAnimation;
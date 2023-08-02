gsap.registerPlugin(ScrollTrigger);

let container = document.querySelector('.container');
let sections = gsap.utils.toArray('.image');

gsap.to(container, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => '+=' + document.querySelector('.container').offsetWidth
  }
});
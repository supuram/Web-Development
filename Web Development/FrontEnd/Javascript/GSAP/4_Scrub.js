gsap.registerPlugin(ScrollTrigger)

gsap.to('.c', {
    scrollTrigger: {
        trigger: '.c',
        scrub: true
    },
    x:400,
    rotation:360,
    duration:3
})
gsap.registerPlugin(ScrollTrigger)

gsap.to('.c', {
    scrollTrigger: {
        trigger: '.c',
        start: 'top center',
        end: 'top 100px',
        scrub: true, 
        pin: true
    },
    x:400,
    rotation:360,
    duration:3
})
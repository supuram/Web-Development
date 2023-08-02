gsap.registerPlugin(ScrollTrigger)

gsap.to('.c', {
    scrollTrigger: {
        trigger: '.c',
        start: 'top center',
        end: 'bottom top', // bottom of .c hits top of the viewport
        markers: true,
        toggleActions: 'restart pause reverse pause'  // other keywords can be - play, pause, resume, restart, reverse, reset, complete, none
    },
    x:400,
    rotation:360,
    duration:3
})
gsap.registerPlugin(ScrollTrigger)

gsap.to('.b', {
    scrollTrigger: {
        trigger: '.a',
        start: 'top 50px', // means when top of .a hits 50px from the top of the viewport
        endTrigger: '.c',
        end: 'bottom 80%', // bottom of .c hits 80% down from the top of viewport
        markers: true,
        toggleActions: 'restart pause reverse pause'  // other keywords can be - play, pause, resume, restart, reverse, reset, complete, none
    },
    x:400,
    rotation:360,
    duration:3
})
gsap.registerPlugin(ScrollTrigger)

gsap.utils.toArray('.image').forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: 'top top', // animation will start when top of trigger element reaches top of the viewport
        pin: true,
        pinSpacing: false
    })
})
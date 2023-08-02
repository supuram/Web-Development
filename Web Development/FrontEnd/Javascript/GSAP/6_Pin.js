gsap.registerPlugin(ScrollTrigger)

gsap.utils.toArray('.image').forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        pin: true,
        pinSpacing: false
    })
})
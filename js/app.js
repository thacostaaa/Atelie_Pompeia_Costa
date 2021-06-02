gsap.registerPlugin(ScrollTrigger);

var pageContainer = document.querySelector('.scroll-wrap');

var scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true
});

scroller.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
        return arguments.length
            ? scroller.scrollTo(value, 0, 0)
            : scroller.scroll.instance.scroll.y;
        },
    getBoundingClientRect() {
        return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
});

window.addEventListener('load', function () {
    var pinnedImages = gsap.utils.toArray('.hero__image');
    var pinWrap = document.querySelector('.hero__pin');
    var pinWrapWidth = pinWrap.offsetWidth;
    var horizontalScrollLength = pinWrapWidth - window.innerWidth;
    var headerLogo = document.querySelector('.header__logo');

    var tl1 = gsap.timeline({
        scrollTrigger: {
            scroller: pageContainer,
            trigger: '.hero',
            start: 'top top',
            end: pinWrapWidth,
            scrub: true,
            pin: true,
        },
    });

    var tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: pageContainer,
            trigger: '.about',
            start: 'top bottom',
            end: 'top bottom-=385px',
            scrub: true,
        },
    });

    var tl3 = gsap.timeline({
        scrollTrigger: {
            scroller: pageContainer,
            trigger: '.about',
            start: 'top bottom-=385px',
            toggleActions: "play pause resume reset",
        },
    });

    tl1.to('.hero__pin', {  x: -horizontalScrollLength }, "start")
        .to('.large-logo-container', { x: horizontalScrollLength }, "start");

    pinnedImages.forEach(function (image, index) {
        tl1.to(image, { xPercent: - index * 59 }, "start");
    });

    tl2.to('.large-logo-container', { width: '176px' });

    tl3.to('.large-logo-container', { opacity: 0 })
        .to(headerLogo, { opacity: 1 });

    gsap.timeline()
        .add(tl1)
        .add(tl2)
        .add(tl3);

    // var tl2 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '.about',
    //         scrub: true,
    //         pin: true,
    //         start: 'top top',
    //         end: 'top center',
    //     },
    // });

    // tl2.to('.logo-container', { scale: .15 })

    // gsap.to('.hero__pin', {
    //     scrollTrigger: {
    //         // scroller: pageContainer,
    //         scrub: true,
    //         trigger: '.hero',
    //         pin: true,
    //         anticipatePin: 1,
    //         start: 'top top',
    //         end: pinWrapWidth
    //     },
    //     x: -horizontalScrollLength,
    //     ease: "none"
    // });

    // gsap.to('.logo-container', {
    //     scrollTrigger: {
    //         // scroller: pageContainer,
    //         scrub: true,
    //         start: 'top top',
    //         end: pinWrapWidth
    //     },
    //     x: horizontalScrollLength,
    //     ease: "none"
    // });

    // gsap.to('.logo-container', {
    //     scrollTrigger: {
    //         // scroller: pageContainer,
    //         scrub: true,
    //         trigger: '.about',
    //         pin: true,
    //         start: 'top bottom',
    //         end: 'top 70%',
    //     },
    //     scale: .15,
    //     y: 0,
    // });

    // gsap.to('#logo', {
    //     scrollTrigger: {
    //         scroller: pageContainer,
    //         scrub: true,
    //         trigger: '.about',
    //         endTrigger: '#hero',
    //         start: 'top bottom',
    //         end: 'top center',
    //     },
    //     scale: .2,
    // });

    ScrollTrigger.addEventListener('refresh', () => scroller.update());
    ScrollTrigger.refresh();
});
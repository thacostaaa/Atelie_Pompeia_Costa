gsap.registerPlugin(ScrollTrigger);

var pageContainer = document.querySelector('[data-scroll-container]');

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
    var docStyle = getComputedStyle(document.documentElement);
    var headerLogo = document.querySelector('.header__logo');
    var largeLogo = document.querySelector('.large-logo');

    var tl1 = gsap.timeline({
        scrollTrigger: {
            scroller: pageContainer,
            trigger: '.hero',
            start: 'bottom 65%',
            end: 'bottom top',
            scrub: true,
            // markers: true,
        },
    });

    var tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: pageContainer,
            trigger: '.hero',
            start: 'bottom top',
            toggleActions: 'play pause resume reset',
        },
    });

    tl1.to(largeLogo, { width: '176px', transformOrigin: '50% 0%' }, 'logo')
        .to('html', { '--background': docStyle.getPropertyValue('--pink') }, 'logo');

    tl2.to(largeLogo, { opacity: 0 })
        .to(headerLogo, { opacity: 1 });

    gsap.timeline()
        .add(tl1)
        .add(tl2);

    ScrollTrigger.addEventListener('refresh', () => scroller.update());
    ScrollTrigger.refresh();
});
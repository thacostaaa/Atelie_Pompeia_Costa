(function () {
    gsap.registerPlugin(ScrollTrigger);

    var pageContainer = document.querySelector('[data-scroll-container]');
    var logoCabecalho = document.querySelector('.cabecalho__logo');
    var logoFundo = document.querySelector('.fundo-inicio__imagem');
    var secaoInicio = document.querySelector('.inicio');
    var secaoBordados = document.querySelector('.bordados');

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

    var getDocStylePropValue = function (propName) {
        var docStyle = getComputedStyle(document.documentElement);

        return docStyle.getPropertyValue(propName);
    };

    var converterPxEmInt = function (value) {
        return value.replace('px', '');
    };

    window.addEventListener('load', function () {
        var timeline1 = gsap.timeline({
            scrollTrigger: {
                scroller: pageContainer,
                trigger: secaoInicio,
                start: 'bottom 65%',
                end: 'bottom top',
                scrub: true,
                // markers: true,
            },
        });

        timeline1.to(logoFundo, {
                width: '176px',
                y: -converterPxEmInt(getDocStylePropValue('--inicioPaddingTopo')),
            }, 'logo')
            .to('html', { '--fundo': getDocStylePropValue('--rosa') }, 'logo');

        var timeline2 = gsap.timeline({
            scrollTrigger: {
                scroller: pageContainer,
                trigger: secaoInicio,
                start: 'bottom top',
                toggleActions: 'play pause resume reset',
                scrub: true,
                // markers: true,
            },
        });

        timeline2.to(logoFundo, { opacity: 0 })
            .to('.cabecalho__logo', { opacity: 1 });

        var timeline3 = gsap.timeline({
            scrollTrigger: {
                scroller: pageContainer,
                trigger: secaoBordados,
                start: 'top 70%',
                end: 'top 20%',
                toggleActions: 'play pause resume reset',
                scrub: true,
                // markers: true,
            },
        });

        timeline3.to('html', { '--fundo': getDocStylePropValue('--cinza') });

        gsap.timeline()
            .add(timeline1)
            .add(timeline2)
            .add(timeline3);

        ScrollTrigger.addEventListener('refresh', () => scroller.update());
        ScrollTrigger.refresh();
    });

    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
    });

    var menuLinks = document.querySelectorAll('.menu__link');

    var clickScrollTo = function (event) {
        event.preventDefault();

        var section = document.querySelector(event.target.getAttribute('href'))

        scroller.scrollTo(section);
    };

    logoCabecalho.addEventListener('click', clickScrollTo);

    menuLinks.forEach(function(link) {
        link.addEventListener('click', clickScrollTo);
    });
})();
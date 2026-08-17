// GSAP Animation Controller
class AnimationController {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    this.initPreloader();
  }

  initPreloader() {
    const progress = document.getElementById("preloader-progress");
    const preloader = document.getElementById("preloader");

    gsap.to(progress, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            preloader.style.display = "none";
            this.initHeroAnimations();
            this.initScrollAnimations();
          },
        });
      },
    });
  }

  initHeroAnimations() {
    const tl = gsap.timeline();

    tl.from(".availability-badge", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        ".hero-title .reveal-text",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".hero-subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".hero-bio",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".hero-actions",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".scroll-indicator",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );
  }

  initScrollAnimations() {
    // Fade-in reveal for general section elements
    gsap.utils.toArray(".reveal-on-scroll").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Navbar Scroll Background Toggle
    ScrollTrigger.create({
      start: "top -50",
      onUpdate: (self) => {
        const navbar = document.getElementById("navbar");
        if (self.direction === 1 || window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      },
    });
  }
}

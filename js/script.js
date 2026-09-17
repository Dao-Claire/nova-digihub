/* ============================================================
   NOVA DIGIHUB
   Main JavaScript
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {


    /* ========================================================
       1. MOBILE MENU
    ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");


    if (menuToggle && navMenu) {

        const closeMenu = () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Ouvrir le menu"
            );

            menuToggle.innerHTML =
                '<i class="bi bi-list"></i>';
        };


        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );


            if (isOpen) {

                menuToggle.setAttribute(
                    "aria-label",
                    "Fermer le menu"
                );

                menuToggle.innerHTML =
                    '<i class="bi bi-x-lg"></i>';

            } else {

                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

                menuToggle.innerHTML =
                    '<i class="bi bi-list"></i>';
            }

        });


        const navLinks =
            document.querySelectorAll(".nav-menu a");


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                closeMenu();

            });

        });


        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    closeMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            () => {

                if (window.innerWidth > 850) {

                    closeMenu();

                }

            }
        );

    }



    /* ========================================================
       2. ACTIVE NAVIGATION LINK
    ========================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const updateActiveLink = () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );


    updateActiveLink();



    /* ========================================================
       3. HEADER SCROLL EFFECT
    ========================================================= */

    const header =
        document.querySelector(".site-header");


    const updateHeader = () => {

        if (!header) {
            return;
        }


        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();



    /* ========================================================
       4. REVEAL ANIMATIONS
    ========================================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const revealElements =
        document.querySelectorAll(
            ".pillar-card, " +
            ".section-heading, " +
            ".service-card, " +
            ".formation-card, " +
            ".about-content, " +
            ".about-card, " +
            ".about-principle, " +
            ".contact-content, " +
            ".contact-card, " +
            ".upcoming-formations, " +
            ".upcoming-item, " +
            ".ambition-card, " +
            ".founder-section, " +
            ".final-cta"
        );


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion.matches
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }



    /* ========================================================
       5. FOOTER YEAR
    ========================================================= */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Nova DigiHub. Tous droits réservés.`;

    }



    /* ========================================================
       6. SMOOTH INTERNAL LINKS
    ========================================================= */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const targetElement =
                    document.querySelector(
                        targetId
                    );


                if (!targetElement) {

                    return;

                }


                event.preventDefault();


                targetElement.scrollIntoView({
                    behavior:
                        prefersReducedMotion.matches
                            ? "auto"
                            : "smooth",

                    block: "start"
                });

            }
        );

    });



    /* ========================================================
       7. FLOATING WHATSAPP
    ========================================================= */

    const floatingWhatsapp =
        document.querySelector(
            ".floating-whatsapp"
        );


    if (floatingWhatsapp) {

        const updateWhatsappVisibility = () => {

            if (window.scrollY > 350) {

                floatingWhatsapp.classList.add(
                    "visible"
                );

            } else {

                floatingWhatsapp.classList.remove(
                    "visible"
                );

            }

        };


        /*
         * Le bouton reste naturellement visible.
         * Cette classe permet simplement au CSS/JS
         * de contrôler son apparition si nécessaire.
         */

        floatingWhatsapp.classList.add(
            "visible"
        );


        window.addEventListener(
            "scroll",
            updateWhatsappVisibility,
            { passive: true }
        );

    }



    /* ========================================================
       8. ACCESSIBILITY — TOUCH / KEYBOARD
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                document.activeElement
            ) {

                const activeElement =
                    document.activeElement;


                if (
                    activeElement.classList.contains(
                        "floating-whatsapp"
                    )
                ) {

                    activeElement.click();

                }

            }

        }
    );

});
/* ============================================================
   NOVA DIGIHUB
   Main JavaScript
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* ========================================================
       1. MOBILE MENU
    ========================================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        const setMenuState = (isOpen) => {

            navMenu.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
                : '<i class="bi bi-list" aria-hidden="true"></i>';
        };

        const isMenuOpen = () => navMenu.classList.contains("active");


        menuToggle.addEventListener("click", () => {
            setMenuState(!isMenuOpen());
        });


        // Fermer le menu après un clic sur un lien
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuState(false));
        });


        // Fermer avec Échap et rendre le focus au bouton
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape" && isMenuOpen()) {
                setMenuState(false);
                menuToggle.focus();
            }
        });


        // Fermer en cliquant en dehors du menu
        document.addEventListener("click", (event) => {

            if (
                isMenuOpen() &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                setMenuState(false);
            }
        });


        // Fermer si l'écran repasse en version ordinateur
        window.matchMedia("(min-width: 851px)").addEventListener(
            "change",
            (event) => {
                if (event.matches) {
                    setMenuState(false);
                }
            }
        );
    }


    /* ========================================================
       2. LIEN ACTIF DANS LE MENU
       (IntersectionObserver : plus léger que de recalculer
       la position des sections à chaque défilement)
    ========================================================= */

    const navigationLinks = document.querySelectorAll(".nav-link");

    const setActiveLink = (id) => {

        navigationLinks.forEach((link) => {

            const isActive = link.getAttribute("href") === `#${id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const linkedSections = [...navigationLinks]
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if ("IntersectionObserver" in window && linkedSections.length) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLink(entry.target.id);
                    }
                });
            },
            {
                // Une section devient "active" quand elle passe
                // dans la zone située juste sous le menu
                rootMargin: "-35% 0px -60% 0px"
            }
        );

        linkedSections.forEach((section) => sectionObserver.observe(section));
    }


    /* ========================================================
       3. EFFET DU HEADER AU DÉFILEMENT
    ========================================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 40);
        };

        window.addEventListener("scroll", updateHeader, { passive: true });

        updateHeader();
    }


    /* ========================================================
       4. ANIMATIONS D'APPARITION
       Une fois l'animation terminée, les classes "reveal" et
       "visible" sont retirées : sinon elles écrasent les effets
       de survol des cartes (transform et transition).
    ========================================================= */

    const revealElements = document.querySelectorAll(
        ".pillar-card, " +
        ".section-heading, " +
        ".service-card, " +
        ".formation-card, " +
        ".faq-item, " +
        ".about-content, " +
        ".about-card, " +
        ".about-principle, " +
        ".contact-content, " +
        ".contact-card, " +
        ".upcoming-formations, " +
        ".upcoming-item, " +
        ".ambition-card, " +
        ".founder-section, " +
        ".why-item"
    );

    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion.matches
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;

                    element.classList.add("visible");

                    element.addEventListener(
                        "transitionend",
                        () => element.classList.remove("reveal", "visible"),
                        { once: true }
                    );

                    observer.unobserve(element);
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }


    /* ========================================================
       5. ANNÉE DU FOOTER
    ========================================================= */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

});
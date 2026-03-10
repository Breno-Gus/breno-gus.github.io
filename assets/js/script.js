document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll("#mobile-menu a");

const copyEmailBtn = document.getElementById("copy-email-btn");
const copyFeedback = document.getElementById("copy-feedback");

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", () => {
    const email = copyEmailBtn.dataset.email;

    const showFeedback = (text = "Copiado!") => {
      if (!copyFeedback) return;
      copyFeedback.textContent = text;
      copyFeedback.classList.add("show");

      clearTimeout(copyFeedback._timeout);
      copyFeedback._timeout = setTimeout(() => {
        copyFeedback.classList.remove("show");
      }, 1800);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(() => showFeedback("Copiado!"))
        .catch(() => fallbackCopy(email, showFeedback));
    } else {
      fallbackCopy(email, showFeedback);
    }
  });
}

function fallbackCopy(text, showFeedback) {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "absolute";
  input.style.left = "-9999px";
  document.body.appendChild(input);

  input.select();
  input.setSelectionRange(0, 99999);

  try {
    const success = document.execCommand("copy");
    if (success) {
      showFeedback("Copiado!");
    } else {
      showFeedback("Não foi possível copiar");
      setTimeout(() => {
        window.location.href = `mailto:${text}`;
      }, 400);
    }
  } catch {
    showFeedback("Abrindo e-mail...");
    setTimeout(() => {
      window.location.href = `mailto:${text}`;
    }, 400);
  }

  document.body.removeChild(input);
}

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      menuBtn.textContent = isHidden ? "☰" : "✕";
      menuBtn.setAttribute("aria-expanded", String(!isHidden));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const heroTitle = document.querySelector("#home h2");

  if (heroTitle) {
    const hora = new Date().getHours();
    let saudacao = "";

    if (hora < 12) saudacao = "☀️ Bom dia,";
    else if (hora < 18) saudacao = "🌤️ Boa tarde,";
    else saudacao = "🌙 Boa noite,";

    heroTitle.innerHTML = `
      <span class="block text-lg md:text-xl font-medium text-cyan-300 mb-3">
        ${saudacao}
      </span>
      Transformo ideias em
      <span class="gradient-text">interfaces modernas</span>
      e presença digital marcante.
    `;
  }

  const heroText = document.querySelector("#home p");

  if (heroText) {
    heroText.style.opacity = "0";
    heroText.style.transform = "translateY(12px)";
    heroText.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    }, 350);
  }

  // SCROLL SUAVE CORRIGIDO
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const destino = document.querySelector(targetId);
      const header = document.querySelector("header");

      if (destino) {
        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const extraSpace = 55;
        const targetPosition =
          destino.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraSpace;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const backToTop = document.createElement("button");
  backToTop.innerHTML = "↑";
  backToTop.setAttribute("aria-label", "Voltar ao topo");
  backToTop.className =
    "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-cyan-400/30 bg-cyan-500/90 text-white text-xl shadow-lg shadow-cyan-500/20 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300 hover:scale-110 hover:bg-cyan-400";

  document.body.appendChild(backToTop);

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTop.classList.remove("opacity-0", "pointer-events-none", "translate-y-3");
      backToTop.classList.add("opacity-100");
    } else {
      backToTop.classList.add("opacity-0", "pointer-events-none");
      backToTop.classList.remove("opacity-100");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const activateNav = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activateNav);
  activateNav();

  const revealItems = document.querySelectorAll(".skill-card, .project-card, .exp-card, .contact-card");

  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(22px)";
      item.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      observer.observe(item);
    });
  }
});
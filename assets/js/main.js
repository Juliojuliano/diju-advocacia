(function () {
  "use strict";

  // Configuração central — troque pelos dados reais do escritório.
  var CONFIG = {
    WHATSAPP_NUMBER: "5511000001234",
    FORM_ENDPOINT: "", // ex.: "https://formspree.io/f/xxxxxxxx" — ver README
  };

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initMobileNav();
    initSmoothAnchors();
    initScrollSpy();
    initReveal();
    initBackToTop();
    initWhatsAppLinks();
    initContactForm();
    initFooterYear();
  });

  /* ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function update() {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".mobile-nav");
    if (!toggle || !nav) return;

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    function open() {
      toggle.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        close();
      } else {
        open();
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) close();
    });
  }

  /* ------------------------------------------------------------------ */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        var headerOffset = 84;
        var top =
          target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({
          top: top,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  function initScrollSpy() {
    var links = document.querySelectorAll(".main-nav a[href^='#']");
    if (!links.length) return;

    var sections = Array.prototype.map
      .call(links, function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.querySelector(".float-btn--top");
    if (!btn) return;

    function update() {
      btn.classList.toggle("is-visible", window.scrollY > 480);
    }

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  function initWhatsAppLinks() {
    var message = encodeURIComponent(
      "Olá! Vim pelo site da DiJu Advocacia e gostaria de mais informações."
    );
    var href = "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + message;

    document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
      el.setAttribute("href", href);
    });
  }

  /* ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.querySelector("#contact-form");
    if (!form) return;

    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(kind, message) {
      status.textContent = message;
      status.className = "form-status is-visible is-" + kind;
    }

    function clearErrors() {
      form.querySelectorAll(".form-field.has-error").forEach(function (field) {
        field.classList.remove("has-error");
        var err = field.querySelector(".form-error");
        if (err) err.textContent = "";
      });
      var consentError = form.querySelector("[data-consent-error]");
      if (consentError) consentError.textContent = "";
    }

    function showError(fieldName, message) {
      if (fieldName === "consent") {
        var consentError = form.querySelector("[data-consent-error]");
        if (consentError) consentError.textContent = message;
        return;
      }
      var input = form.querySelector('[name="' + fieldName + '"]');
      if (!input) return;
      var field = input.closest(".form-field");
      if (!field) return;
      field.classList.add("has-error");
      var err = field.querySelector(".form-error");
      if (err) err.textContent = message;
    }

    function validate() {
      clearErrors();
      var valid = true;
      var data = new FormData(form);

      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var messageText = (data.get("message") || "").toString().trim();
      var consent = data.get("consent");

      if (name.length < 3) {
        showError("name", "Informe seu nome completo.");
        valid = false;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError("email", "Informe um e-mail válido.");
        valid = false;
      }

      if (phone.replace(/\D/g, "").length < 10) {
        showError("phone", "Informe um telefone com DDD.");
        valid = false;
      }

      if (messageText.length < 10) {
        showError("message", "Conte um pouco mais sobre o seu caso.");
        valid = false;
      }

      if (!consent) {
        showError("consent", "É necessário aceitar o contato para enviar.");
        valid = false;
      }

      return valid;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot anti-spam: se preenchido, ignora silenciosamente.
      var honeypot = form.querySelector('[name="empresa_site"]');
      if (honeypot && honeypot.value) {
        return;
      }

      if (!validate()) {
        setStatus("error", "Verifique os campos destacados e tente novamente.");
        return;
      }

      if (!CONFIG.FORM_ENDPOINT) {
        setStatus(
          "info",
          "Formulário ainda não conectado a um serviço de envio. Fale com a gente agora pelo WhatsApp — é mais rápido."
        );
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      fetch(CONFIG.FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            setStatus(
              "success",
              "Mensagem enviada. Nossa equipe entrará em contato em até um dia útil."
            );
          } else {
            setStatus(
              "error",
              "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp."
            );
          }
        })
        .catch(function () {
          setStatus(
            "error",
            "Falha de conexão. Tente novamente ou fale pelo WhatsApp."
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar mensagem";
        });
    });
  }

  /* ------------------------------------------------------------------ */
  function initFooterYear() {
    var el = document.querySelector("#footer-year");
    if (el) el.textContent = new Date().getFullYear();
  }
})();

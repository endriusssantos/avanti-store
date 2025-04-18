const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

const searchFunction = () => {
  const term = searchInput.value.trim();
  if (term) {
    const spanTerm = document.createElement("span");
    spanTerm.textContent = `${term}`;
    spanTerm.className = "text-blue";

    searchMessage.innerHTML = "Você buscou por: ";
    searchMessage.appendChild(spanTerm);
  } else {
    searchMessage.textContent = "";
  }
};

searchButton.addEventListener("click", searchFunction);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchFunction();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const productContainers = document.querySelectorAll(".product-container");

  function getCardsToShow() {
    const screenWidth = window.innerWidth;
    return screenWidth >= 1280 ? 5 : 2;
  }

  function setupCardEvents(card) {
    const buttonBuy = card.querySelector(".buttonBuy");
    const buttonQuantity = card.querySelector(".buttonQuantity");
    const buttonAdd = card.querySelector(".buttonAdd");
    const buttonRemove = card.querySelector(".buttonRemove");
    const quantity = card.querySelector(".quantity");

    buttonBuy.classList.remove("hidden");
    buttonQuantity.classList.add("hidden");
    buttonQuantity.classList.remove("flex");
    quantity.textContent = "1";

    buttonBuy.onclick = () => {
      buttonBuy.classList.add("hidden");
      buttonQuantity.classList.remove("hidden");
      buttonQuantity.classList.add("flex");
    };

    buttonAdd.onclick = () => {
      const currentQuantity = parseInt(quantity.textContent, 10);
      quantity.textContent = currentQuantity + 1;
    };

    buttonRemove.onclick = () => {
      const currentQuantity = parseInt(quantity.textContent, 10);
      if (currentQuantity > 1) {
        quantity.textContent = currentQuantity - 1;
      }
    };
  }

  function renderProducts(container) {
    const cards = container.querySelectorAll(".product-card");
    const cardsToShow = getCardsToShow();
    const baseCard = cards[0];

    for (let i = 1; i < cards.length; i++) {
      cards[i].remove();
    }

    for (let i = 1; i < cardsToShow; i++) {
      const clone = baseCard.cloneNode(true);
      setupCardEvents(clone);
      container.appendChild(clone);
    }
  }

  function renderAllProductContainers() {
    productContainers.forEach((container) => renderProducts(container));
  }

  renderAllProductContainers();

  window.addEventListener("resize", () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
      renderAllProductContainers();
    }, 200);
  });

  productContainers.forEach((container) => {
    const prevButton = container.querySelector('[data-action="prev"]');
    const nextButton = container.querySelector('[data-action="next"]');
    const dots = container.parentElement.querySelectorAll("[data-slide]");
    let currentSlide = 0;
    const totalSlides = dots.length;

    function getCardsToShow() {
      return window.innerWidth >= 1280 ? 5 : 2;
    }

    function renderSlide(index) {
      const cards = container.querySelectorAll(".product-card");
      const cardsToShow = getCardsToShow();
      const baseCard = cards[0];

      setupCardEvents(baseCard);

      container.classList.add("fade-out");

      setTimeout(() => {
        for (let i = 1; i < cards.length; i++) {
          cards[i].remove();
        }

        for (let i = 1; i < cardsToShow; i++) {
          const clone = baseCard.cloneNode(true);
          setupCardEvents(clone);
          container.appendChild(clone);
        }

        container.classList.remove("fade-out");
        container.classList.add("fade-in");

        setTimeout(() => {
          container.classList.remove("fade-in");
        }, 300);
      }, 300);

      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-gray-darkness", i === index);
        dot.classList.toggle("bg-gray-medium", i !== index);
      });
    }

    prevButton?.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      renderSlide(currentSlide);
    });

    nextButton?.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      renderSlide(currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentSlide = i;
        renderSlide(currentSlide);
      });
    });

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const isSmallScreen = window.innerWidth < 1280;
      if (!isSmallScreen) return;

      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX < 0) {
          currentSlide = (currentSlide + 1) % totalSlides;
        } else {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }
        renderSlide(currentSlide);
      }
    }

    renderSlide(currentSlide);
  });

  const productSections = document.querySelectorAll(".product-section");
  productSections.forEach((section) => {
    setupCardEvents(section);
  });
});

const buttonInstitutional = document.getElementById("buttonInstitutional");
const buttonFAQ = document.getElementById("buttonFAQ");
const buttonContacts = document.getElementById("buttonContacts");
const institutional = document.getElementById("institutional");
const faq = document.getElementById("faq");
const contacts = document.getElementById("contacts");

const institutionalArrow = buttonInstitutional.querySelector(".arrow");
const faqArrow = buttonFAQ.querySelector(".arrow");
const contactsArrow = buttonContacts.querySelector(".arrow");

function toggleVisibility(button, list, arrow) {
  if (window.innerWidth < 1280) {
    const isListVisible = list.style.display === "block";

    institutional.style.display = "none";
    faq.style.display = "none";
    contacts.style.display = "none";

    institutionalArrow.style.transform = "rotate(0deg)";
    faqArrow.style.transform = "rotate(0deg)";
    contactsArrow.style.transform = "rotate(0deg)";

    if (!isListVisible) {
      list.style.display = "block";
      arrow.style.transform = "rotate(180deg)";
    } else {
      list.style.display = "none";
    }
  }
}

buttonInstitutional.addEventListener("click", () =>
  toggleVisibility(buttonInstitutional, institutional, institutionalArrow)
);
buttonFAQ.addEventListener("click", () =>
  toggleVisibility(buttonFAQ, faq, faqArrow)
);
buttonContacts.addEventListener("click", () =>
  toggleVisibility(buttonContacts, contacts, contactsArrow)
);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1280) {
    institutional.style.display = "block";
    faq.style.display = "block";
    contacts.style.display = "block";

    institutionalArrow.style.transform = "rotate(0deg)";
    faqArrow.style.transform = "rotate(0deg)";
    contactsArrow.style.transform = "rotate(0deg)";
  } else {
    institutional.style.display = "none";
    faq.style.display = "none";
    contacts.style.display = "none";

    institutionalArrow.style.transform = "rotate(0deg)";
    faqArrow.style.transform = "rotate(0deg)";
    contactsArrow.style.transform = "rotate(0deg)";
  }
});

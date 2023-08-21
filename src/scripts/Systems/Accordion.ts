interface Options {
  duration?: number;
}

const defaultOptions: Options = {
  duration: 0.4,
};

const closingAnim = (content: HTMLElement, element: HTMLDetailsElement, options: Options = defaultOptions): void => {
  const animation = content.animate(
    [
      {
        height: getComputedStyle(content).height,
        opacity: 1,
      },
      {
        height: "0",
        opacity: 0,
      },
    ],
    {
      duration: options.duration! * 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }
  );
  animation.addEventListener("finish", () => {
    element.removeAttribute("open");
  });
};

const openingAnim = (content: HTMLElement, options: Options = defaultOptions): void => {
  const startHeight = "0";
  const endHeight = `${content.scrollHeight}px`;
  const animation = content.animate(
    [
      {
        height: startHeight,
        opacity: 0,
      },
      {
        height: endHeight,
        opacity: 1,
      },
    ],
    {
      duration: options.duration! * 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    }
  );
  animation.addEventListener("finish", () => {
    content.style.height = "auto";
  });
};

export const useAccordion = (options?: Options): void => {
  const details = document.querySelectorAll("[data-accordion-datails]");
  const openedClass = "is-opened";

  // 初期表示時に開いているものがあれば開く
  const isOpen = () => {
    details.forEach((element: HTMLDetailsElement) => {
      if (element.dataset.accordionOpen === "true") {
        element.setAttribute("open", "true");
        element.classList.add("is-opened");
      }
    });
  };
  isOpen();

  details.forEach((element: HTMLDetailsElement) => {
    const summary = element.querySelector("[data-accordion-title]") as HTMLElement;
    const content = element.querySelector("[data-accordion-content]") as HTMLElement;

    summary.addEventListener("click", (event: Event) => {
      event.preventDefault();

      if (element.classList.contains(openedClass)) {
        element.classList.remove(openedClass);
        closingAnim(content, element, options);
      } else {
        element.classList.add(openedClass);
        element.setAttribute("open", "true");
        openingAnim(content, options);
      }
    });
  });
};
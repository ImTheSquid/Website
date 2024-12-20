export function dotHighlight(element: Element) {
  element.addEventListener("mouseenter", () => {
    document.dispatchEvent(new CustomEvent("dotenter", { detail: element }));
  });
  element.addEventListener("mouseleave", () => {
    document.dispatchEvent(new CustomEvent("dotleave", { detail: element }));
  });
}

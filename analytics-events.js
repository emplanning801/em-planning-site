(() => {
  const send = (name, parameters = {}) => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, {
      page_path: window.location.pathname,
      ...parameters,
    });
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) {
      send("phone_click", {
        contact_method: href.includes("08055347560") ? "mobile" : "office",
      });
    } else if (href.startsWith("mailto:")) {
      send("email_click", { contact_method: "email" });
    } else if (href.startsWith("https://line.me/")) {
      send("line_click", { contact_method: "line" });
    } else if (/contact\.html(?:$|[?#])/.test(href)) {
      send("contact_page_click", { link_text: link.textContent.trim().slice(0, 80) });
    }
  });
})();

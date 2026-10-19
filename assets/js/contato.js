(() => {
  const form = document.querySelector("#project-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const business = String(data.get("business") || "").trim();
    const service = String(data.get("service") || "").trim();
    const goal = String(data.get("goal") || "").trim();
    const budget = String(data.get("budget") || "Prefiro conversar antes").trim();

    const message = [
      "Olá, Marco! Preenchi o formulário do seu site e gostaria de conversar sobre um projeto.",
      "",
      `Nome: ${name}`,
      business ? `Empresa/negócio: ${business}` : "",
      `Serviço: ${service}`,
      `Sobre o projeto: ${goal}`,
      `Faixa de investimento: ${budget}`
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/5521984741591?text=${encodeURIComponent(message)}`;
    // Open synchronously from the submit action to reduce popup blocking.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Track the lead-form submission, not a purchase.
    if (typeof window.gtag === "function") {
      window.gtag("event", "form_submit", {event_category: "contact", event_label: service});
    }
    window.location.href = "./obrigado.html";
  });
})();
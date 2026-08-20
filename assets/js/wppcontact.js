const whatsapp = document.querySelector(".whatsapp-contact");

if (whatsapp) {

    whatsapp.addEventListener("click", () => {

        setTimeout(() => {
            window.location.href = "./obrigado.html";
        }, 300);

    });

}
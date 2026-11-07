const BUSINESS_WHATSAPP = "";

const inquiryForm = document.querySelector("#inquiry-form");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");
const messagePreview = document.querySelector("#message-preview");
const businessContact = document.querySelector("#business-contact");

if (BUSINESS_WHATSAPP) {
  businessContact.textContent = `WhatsApp: +${BUSINESS_WHATSAPP}`;
  submitButton.querySelector("span").textContent = "Lanjut ke WhatsApp";
}

inquiryForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!inquiryForm.reportValidity()) return;

  const formData = new FormData(inquiryForm);
  const message = [
    "Halo, saya ingin bertanya tentang lele.",
    `Nama: ${formData.get("name")}`,
    `Kebutuhan dan jumlah: ${formData.get("need")}`,
    `Nomor saya: ${formData.get("contact")}`,
  ].join("\n");

  if (BUSINESS_WHATSAPP) {
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    formStatus.textContent = "Pesan disiapkan di WhatsApp. Periksa kembali sebelum mengirim.";
    return;
  }

  messagePreview.hidden = false;
  messagePreview.value = message;
  messagePreview.focus();

  try {
    await navigator.clipboard.writeText(message);
    formStatus.textContent = "Pesan disalin. Kontak usaha belum tersedia, jadi pesan belum terkirim.";
  } catch {
    formStatus.textContent = "Kontak usaha belum tersedia. Salin pratinjau pesan untuk digunakan nanti.";
  }
});

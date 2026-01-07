document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusDiv = document.getElementById("form-status");
  const tsField = document.getElementById("ts");

  if (!form) {
    return;
  }

  if (tsField) {
    tsField.value = String(Date.now());
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // Honeypot: if filled, silently stop
    const company = (formData.get("company") || "").toString().trim();
    if (company !== "") {
      return;
    }

    // Ensure timestamp is present and recent
    if (!formData.get("ts")) {
      formData.set("ts", String(Date.now()));
    }

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxXTxY7moPiNTC-YUcaAFKR1EA_YR-kvkH5BLsUiWauCAmIbR9askfxErDkj5bKncU/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      form.reset();

      // Reset ts after reset
      if (tsField) {
        tsField.value = String(Date.now());
      }

      if (statusDiv) {
        statusDiv.className = "form-success";
        statusDiv.textContent = "Message sent successfully.";

        setTimeout(() => {
          statusDiv.textContent = "";
          statusDiv.className = "";
        }, 4000);
      }
    } catch (err) {
      console.error(err);

      if (statusDiv) {
        statusDiv.className = "form-error";
        statusDiv.textContent = "An error occurred. Please try again.";
      }
    }
  });
});
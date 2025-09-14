document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contact-form");
	const statusDiv = document.getElementById("form-status");

	form.addEventListener("submit", async function (e) {
		e.preventDefault();
		const formData = new FormData(form);

		if (formData.get("website")) return;

		try {
			await fetch("https://script.google.com/macros/s/AKfycbxXTxY7moPiNTC-YUcaAFKR1EA_YR-kvkH5BLsUiWauCAmIbR9askfxErDkj5bKncU/exec", {
				method: "POST",
				mode: "no-cors",
				body: formData
			});

			form.reset();
			statusDiv.className = "form-success";
			statusDiv.textContent = "✔️ Mensaje enviado con éxito.";

			setTimeout(() => {
				statusDiv.textContent = "";
				statusDiv.className = "";
			}, 4000);

		} catch (err) {
			console.error(err);
			statusDiv.className = "form-error";
			statusDiv.textContent = "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
		}
	});
});
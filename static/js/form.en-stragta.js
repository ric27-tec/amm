document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contact-form");
	const statusDiv = document.getElementById("form-status");

	form.addEventListener("submit", async function (e) {
		e.preventDefault();
		const formData = new FormData(form);

		if (formData.get("website")) return;

		try {
			await fetch("https://script.google.com/macros/s/AKfycbwM4_ccoKLbt8_ZcQ8wdq7XdDDJC8Jus9LMfQUTr8UdBgpXq9Qa4EwmSyks6DyAKJwN/exec", {
				method: "POST",
				mode: "no-cors",
				body: formData
			});

			form.reset();
			statusDiv.className = "form-success";
			statusDiv.textContent = "✔️ Message sent successfully.";

			setTimeout(() => {
				statusDiv.textContent = "";
				statusDiv.className = "";
			}, 4000);

		} catch (err) {
			console.error(err);
			statusDiv.className = "form-error";
			statusDiv.textContent = "There has been an error. Please try again.";
		}
	});
});
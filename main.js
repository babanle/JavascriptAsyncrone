document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#countries-container"); // Correction du sélecteur

    async function fetchCountries() {
        try {
            container.innerHTML = "<p>Chargement des pays...</p>"; // Ajout du message de chargement

            const response = await fetch("https://restcountries.com/v3.1/all");
            if (!response.ok) throw new Error("Erreur lors de la récupération des données !");

            const countries = await response.json();
            displayCountries(countries.slice(0, 20)); // Affichage des 20 premiers pays
        } catch (error) {
            console.error(error);
            container.innerHTML = "<p>Échec du chargement des données. Veuillez réessayer.</p>";
        }
    }

    function displayCountries(countries) {
        container.innerHTML = ""; // Nettoyage du conteneur

        countries.forEach((country) => {
            const { name, flags, capital, currencies } = country;
            const currency = currencies ? Object.values(currencies)[0].name : "N/A";
            const capitalName = capital && capital.length > 0 ? capital[0] : "Non disponible";

            const countryCard = document.createElement("div");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
                <img src="${flags.png}" alt="Drapeau de ${name.common}" class="country-flag">
                <div class="country-info">
                    <h2 class="country-name">${name.common}</h2>
                    <p class="country-capital"><strong>Capitale :</strong> ${capitalName}</p>
                    <p class="country-currency"><strong>Devise :</strong> ${currency}</p>
                </div>
            `;
            container.appendChild(countryCard);
        });
    }

    fetchCountries(); // Lancement de la récupération des pays
});

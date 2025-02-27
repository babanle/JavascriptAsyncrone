document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("countries-container");

    // Fonction pour récupérer les données de l'API
    async function fetchCountries() {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données !");
            }

            const countries = await response.json();
            displayCountries(countries.slice(0, 20)); // Afficher seulement 20 pays
        } catch (error) {
            console.error(error);
            container.innerHTML = "<p>Échec de chargement des données. Veuillez réessayer.</p>";
        }
    }

    // Fonction pour afficher les pays
    function displayCountries(countries) {
        container.innerHTML = ""; // Vider le conteneur avant d'ajouter les pays

        countries.forEach((country) => {
            const { name, flags, capital, currencies } = country;

            // Récupérer la première devise (car certaines nations en ont plusieurs)
            const currency = currencies ? Object.values(currencies)[0].name : "N/A";

            // Création du bloc HTML pour chaque pays
            const countryCard = document.createElement("div");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
                <img src="${flags.png}" alt="Drapeau de ${name.common}" class="country-flag">
                <div class="country-info">
                    <h2 class="country-name">${name.common}</h2>
                    <p class="country-capital"><strong>Capitale :</strong> ${capital ? capital[0] : "Non disponible"}</p>
                    <p class="country-currency"><strong>Devise :</strong> ${currency}</p>
                </div>
            `;
            container.appendChild(countryCard);
        });
    }

    // Appel de la fonction pour récupérer et afficher les pays
    fetchCountries();
});
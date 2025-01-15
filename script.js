const apiKey = '';
const nasaForm = document.getElementById('nasaForm');
const dateInput = document.getElementById('dateInput');
const linkContainer = document.getElementById('linkContainer');

nasaForm.addEventListener('submit', async (event) => {
    event.preventDefault(); /* Fondamentale per gestire form con chiamata API. Impedisce che il browser ricarichi la pagina all'invio del form */
    const date = dateInput.value; /* .value fa si che venga utilizzato il valore esatto inserito nel form, in questo caso la data*/
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(data.message || 'Errore con l\'API.');
        } /* impostiamo una condizione per cui se la chiamata non va a buon fine per un problema HTTP verrà interrotta l'esecuzione e mostrato il messaggio */

        linkContainer.innerHTML = `
            <p class="text-xl font-semibold mt-4">Ecco il link del contenuto del giorno:</p>
            <a href="${data.url}" target="_blank" class="text-blue-400 underline mt-2">${data.url}</a>
        `;

    } catch (error) {
        console.error('Errore nella chiamata API:', error.message);
        alert('Errore nella chiamata API: ' + error.message);
    }
});



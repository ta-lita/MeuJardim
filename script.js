document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const plantaForm = document.getElementById('plantaForm');
    const cancelButton = document.getElementById('cancelButton');
    const tipoSoloSelect = document.getElementById('tipoSolo');
    const idealClimaInput = document.getElementById('idealClima');
    const plantaCaracSelect = document.getElementById('plantaCarac');
    const nomeNovoPlanta = document.getElementById('nomeNovoPlanta');
    const jardimSelect = document.getElementById('jardimSelect');
    const addJardimButton = document.getElementById('addJardimButton');
    const jardimFormContainer = document.getElementById('jardimFormContainer');
    const jardimForm = document.getElementById('jardimForm');
    const cancelJardimButton = document.getElementById('cancelJardimButton');
    const jardimCatalog = document.getElementById('jardimCatalog');
    
    // Esconder o formulário de adição de planta inicialmente
    formContainer.classList.add('hidden');

    // Esconder o botão de adicionar planta inicialmente
    addItemButton.style.display = 'none';

    const tipoSolotoClima = {
        'arenoso': 'Quente e Seco',
        'argiloso': 'Úmido e Temperado',
        'humoso': 'Frio e Úmido'
    };

    tipoSoloSelect.addEventListener('change', () => {
        const selectedtipoSolo = tipoSoloSelect.value;
        idealClimaInput.value = tipoSolotoClima[selectedtipoSolo] || '';
    });

    addJardimButton.addEventListener('click', () => {
        jardimFormContainer.classList.remove('hidden');
    });

    cancelJardimButton.addEventListener('click', () => {
        jardimFormContainer.classList.add('hidden');
        jardimForm.reset();
    });

    jardimForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const jardimName = document.getElementById('nomeNovoJardim').value;

        if (jardimName) {
            const newJardim = document.createElement('div');
            newJardim.classList.add('item');
            newJardim.innerHTML = `<h2>${jardimName}</h2>
                                   <div class="planta-list" id="${jardimName.replace(/\s+/g, '')}"></div>
                                   <button class="addPlantaButton">Adicionar Planta</button>
                                   <button class="removeJardimButton">Remover Jardim</button>`;
            jardimCatalog.appendChild(newJardim);

            // Add jardim as an option in the jardimSelect dropdown
            const newOption = document.createElement('option');
            newOption.value = jardimName;
            newOption.textContent = jardimName;
            jardimSelect.appendChild(newOption);

            console.log('Novo jardim cadastrado:', {
                nomeNovoJardim: jardimName
            });

            jardimFormContainer.classList.add('hidden');
            jardimForm.reset();

            // Esconder o botão "Adicionar Planta" global
            addItemButton.style.display = 'none';

            // Adicionar evento de clique ao novo botão "Adicionar Planta" no jardim criado
            newJardim.querySelector('.addPlantaButton').addEventListener('click', () => {
                formContainer.classList.remove('hidden');
            });

            // Adicionar evento de clique ao botão "Remover Jardim"
            newJardim.querySelector('.removeJardimButton').addEventListener('click', () => {
                // Remover o jardim e seu conteúdo do DOM
                jardimCatalog.removeChild(newJardim);

                // Remover o jardim da lista de seleção
                Array.from(jardimSelect.options).forEach((option) => {
                    if (option.value === jardimName) {
                        option.remove();
                    }
                });

                console.log('Jardim removido:', {
                    nomeJardim: jardimName
                });
            });
        }
    });

    cancelButton.addEventListener('click', () => {
        formContainer.classList.add('hidden');
        plantaForm.reset();
    });

    plantaForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const plantName = nomeNovoPlanta.value;
        const plantCharacteristics = Array.from(plantaCaracSelect.selectedOptions).map(option => option.value);
        const tipoSolo = tipoSoloSelect.value;
        const idealClima = idealClimaInput.value;
        const plantaValue = document.getElementById('plantaValue').value;
        const selectedJardim = jardimSelect.value;

        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

        if (plantName && selectedJardim) {
            const newPlanta = document.createElement('div');
            newPlanta.innerHTML = `<p>${plantName}</p>
                                   <table class="planta-info-table">
                                       <tr>
                                           <th>Solo</th>
                                           <th>Clima</th>
                                           <th>Valor (R$)</th>
                                           <th>Tipo</th>
                                       </tr>
                                       <tr>
                                           <td>${capitalize(tipoSolo)}</td>
                                           <td>${idealClima}</td>
                                           <td>${plantaValue}</td>
                                           <td>${plantCharacteristics.map(capitalize).join(', ')}</td>
                                       </tr>
                                   </table>`;
            const jardimContainer = document.getElementById(selectedJardim.replace(/\s+/g, ''));
            jardimContainer.appendChild(newPlanta);

            console.log('Nova planta cadastrada no jardim:', {
                nomeNovoPlanta: plantName,
                tipoSolo: tipoSolo,
                idealClima: idealClima,
                plantaCarac: plantCharacteristics,
                plantaValue: plantaValue,
                jardim: selectedJardim
            });

            formContainer.classList.add('hidden');
            plantaForm.reset();
        }
    });
});

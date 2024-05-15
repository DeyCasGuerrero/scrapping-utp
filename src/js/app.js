async function fetchData() {
    try {
        const response = await fetch("../../data.json");
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const jsonData = await response.json();

        const select = document.getElementById('opciones');
        select.addEventListener('change', function() {
            const selectedoption = this.value;
            if(selectedoption==""){
                renderContent(jsonData);
            }
            const filteredData = jsonData.filter(item => item.ciclo === selectedoption);
            renderContent(filteredData);
        });

        renderContent(jsonData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderContent(data) {
    const container = document.getElementById('container');

    container.innerHTML = '';

    data.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('bg-black', 'text-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4','mt-10', 'border-2', 'border-white', 'overflow-hidden');

        const texto = document.createElement('p');
        texto.textContent = "Ciclo " + item.ciclo;
        texto.classList.add('bg-blue-400', 'p-5', 'text-2xl', 'font-bold')

        const lista = document.createElement('ul');
        lista.classList.add('bg-white', 'text-black', 'p-2', 'text-xl', 'font-serif', 'mt-4');

        item.listaTextos.forEach(textoItem => {
            const listItem = document.createElement('li');
            listItem.textContent = textoItem;
            lista.appendChild(listItem);
        });

        div.appendChild(texto);
        div.appendChild(lista);
        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", fetchData);

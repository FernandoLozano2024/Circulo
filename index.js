function calcularPermutaciones() {
    const numPersonas = parseInt(document.getElementById('numPersonas').value);

    if (!isNaN(numPersonas) && numPersonas >= 1 && numPersonas <= 6) {
        const permutacionesCirculares = calcularPermutacionesCirculares(numPersonas);
        const roulette = document.getElementById('roulette');
        roulette.innerHTML = '';

        const personas = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, numPersonas);

        const radius = 150;
        const angleStep = (2 * Math.PI) / numPersonas;
        for (let i = 0; i < numPersonas; i++) {
            const person = document.createElement('div');
            person.classList.add('person');
            person.innerText = personas[i];
            const angle = i * angleStep;
            person.style.left = `${150 + radius * Math.cos(angle) - 20}px`;
            person.style.top = `${150 + radius * Math.sin(angle) - 20}px`;
            roulette.appendChild(person);
        }

        document.getElementById('resultado').innerText =
            `El número de maneras distintas en que se pueden sentar ${numPersonas} personas en un círculo es: ${permutacionesCirculares}`;

        const permutaciones = generarPermutaciones(personas);
        localStorage.setItem('permutaciones', JSON.stringify(permutaciones));
    } else {
        document.getElementById('resultado').innerText = 'Por favor, introduce un número válido de personas entre 1 y 6.';
    }
}

function mostrarPermutaciones() {
    const permutaciones = JSON.parse(localStorage.getItem('permutaciones'));
    const numPersonas = parseInt(document.getElementById('numPersonas').value);

    if (numPersonas >= 1 && numPersonas <= 6) {
        const permutacionesFiltradas = permutaciones.filter(perm => perm.length === numPersonas);
        const circleContainer = document.getElementById('roulette');
        circleContainer.innerHTML = '';

        const permutacionesContainer = document.getElementById('permutaciones');
        permutacionesContainer.innerHTML = '';
        permutacionesFiltradas.forEach((perm, index) => {
            const permContainer = document.createElement('div');
            permContainer.classList.add('perm-container');
            permContainer.innerHTML = `<strong>${index + 1}.</strong>`;

            const circleDiv = document.createElement('div');
            circleDiv.classList.add('circle');
            circleDiv.style.position = 'relative';

            const radius = 100;
            const angleStep = (2 * Math.PI) / numPersonas;
            perm.forEach((person, i) => {
                const personDiv = document.createElement('div');
                personDiv.classList.add('person');
                personDiv.innerText = person;
                const angle = i * angleStep;
                personDiv.style.left = `${100 + radius * Math.cos(angle) - 15}px`;
                personDiv.style.top = `${100 + radius * Math.sin(angle) - 15}px`;
                circleDiv.appendChild(personDiv);
            });

            permContainer.appendChild(circleDiv);
            permutacionesContainer.appendChild(permContainer);
        });

        const totalPermutaciones = permutacionesFiltradas.length;
        permutacionesContainer.innerHTML += `<p>Total de permutaciones: ${totalPermutaciones}</p>`;
    }
}

function calcularPermutacionesCirculares(n) {
    if (n <= 1) return 1;
    return factorial(n - 1);
}

function factorial(num) {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
}

function generarPermutaciones(arr) {
    if (arr.length <= 1) return [arr];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        const remainingPerms = generarPermutaciones(remaining);
        for (let perm of remainingPerms) {
            result.push([current].concat(perm));
        }
    }
    return result;
}

function generarDiagrama() {
    const numPersonas = parseInt(document.getElementById('numPersonas').value);
    window.location.href = `diagrama.html?numPersonas=${numPersonas}`;
}
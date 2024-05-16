const readline = require('readline');

let tarefas = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function adicionarTarefa(tarefa) {
    tarefas.push(tarefa);
    console.log(`Tarefa adicionada: ${tarefa}`);
}

function buscarTarefa(busca) {
    console.log(`Buscando tarefas que contêm: ${busca}`);
    for (let tarefa of tarefas) {
        if (tarefa.includes(busca)) {
            console.log(tarefa);
        }
    }
}

function iniciar() {
    rl.question('Digite uma tarefa ou uma busca (comece a busca com "?"): ', (entrada) => {
        if (entrada.startsWith('?')) {
            buscarTarefa(entrada.slice(1));
        } else {
            adicionarTarefa(entrada);
        }
        iniciar();
    });
}

iniciar();

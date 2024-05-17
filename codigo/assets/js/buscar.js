import data from '../../../database.json' with {type: 'json'}
const tarefas = [];
//Adicionar tarefas do usuário ao array de tarefas
for(let tarefa of data.users[0].tarefas) {
    tarefas.push(tarefa)
}

//função para buscar a tarefa do usuário
function buscarTarefa() {
    var busca = document.getElementById('busca').value;
    var lista = document.getElementById('lista');
    lista.innerHTML = '';

    //cria elemento da tarefa
    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].titulo.toLowerCase() == busca.toLowerCase()) {
            console.log(tarefas[i])
            var item = document.createElement('li');
            item.innerHTML = `<h5><strong>${tarefas[i].titulo}</strong> </h5><h5>${tarefas[i].data}</h5><h5>${tarefas[i].hora}</h5>`
            lista.appendChild(item);
        } else {
            alert("Tarefa não encontrada")
        }
    }
}
document.getElementById("buscar").addEventListener("click", buscarTarefa)






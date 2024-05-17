import data from '../../../database.json' with {type: 'json'}

function buscarTarefa() {
    var busca = document.getElementById('busca').value;
    var lista = document.getElementById('lista');
    let tarefa;

    for(let item of data.users[0].tarefas) {
        if (item.titulo.toLowerCase() == busca.toLowerCase()) tarefa = item
    }

    if(data.users[0].projetos) {
        data.users[0].projetos.map((projeto)=>{
            
            projeto.tarefas.map((task) => {
                if (task.titulo.toLowerCase() == busca.toLowerCase()) tarefa = task
            })
        })
    }
    lista.innerHTML = '';

    //cria elemento da tarefa
    
    if (tarefa) {
            const item = document.createElement('li');
            item.innerHTML = `<h5><strong>${tarefa.titulo}</strong> </h5><h5>${tarefa.data}</h5><h5>${tarefa.hora}</h5>`
            lista.appendChild(item);
        } else {
            console.log("else runned")
            const item = document.createElement('li');
            item.innerHTML = `<p style="color: red">Tarefa não encontrada</p>`
            lista.appendChild(item)
        }
    
}
document.getElementById("buscar").addEventListener("click", buscarTarefa)






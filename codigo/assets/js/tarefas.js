import database from '../../../database.json' with {type: 'json'}
let data = localStorage.getItem("data")
if(data == null || data == undefined) {
    localStorage.setItem("data", JSON.stringify(database))
} else {
    JSON.parse(data)
}
if(data){
//A partir daqui começamos: 


let data = localStorage.getItem("data")
data = JSON.parse(data)


//Pegar tarefas soltas do usuario e tarefas vinculadas a um projeto
const tarefas = []
data.users[0].tarefas.forEach(element => {
    tarefas.push(element)
});
data.users[0].projetos.map((projeto) => {
    projeto.tarefas.map((tarefa) => {
        tarefas.push(tarefa)
    })
})


const container = document.getElementById("my-tasks")
tarefas.map((tarefa) => {
    
    const task = document.createElement("div")
    task.className = 'task'
    task.innerHTML = `
        <p>${tarefa.titulo}, ${tarefa.data} às ${tarefa.hora}</p>
        <a href="editar-tarefas.html?${tarefa.id}"><button id="edit-btn">📝</button></a>
        <a href="delete.html?${tarefa.id}"> <button id="delete-btn">❌</button></a>

    
    `
    container.appendChild(task)

})
}




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
    console.log(tarefa.titulo)
    task.innerHTML = `
        <p>${tarefa.titulo}</p>
        <a href="editar-tarefas.html?${tarefa.titulo}"><button id="edit-btn">📝</button></a>
        <a href="delete.html?${tarefa.titulo}"> <button id="delete-btn">❌</button></a>

    
    `
    container.appendChild(task)

})






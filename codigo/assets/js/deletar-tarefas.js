const url = window.location.href
let index = url.indexOf('?'); // Find the index of the comma
let result = url.slice(index + 1); // Extract from the character after the comma to the end

const id = parseInt(result)
console.log(id)
//Achar objeto tarefa
let data = localStorage.getItem("data")
data = JSON.parse(data)
let tarefa;
tarefa = data.users[0].tarefas.find((task) => task.id == id)
if(!tarefa) {
    data.users[0].projetos.map((projeto)=>{
        tarefa = projeto.tarefas.find((task) => task.id == id)
        let index = projeto.tarefas.findIndex(task => task.id = id)
        projeto.tarefas.splice(index, 1);
        
    })

} else {
    console.log("Else rodando")
    let indexOfSingleTask = data.users[0].tarefas.findIndex(task => task.id = id)
    data.users[0].tarefas.splice(indexOfSingleTask, 1)
}


localStorage.setItem("data", JSON.stringify(data))
setTimeout(()=>{
    window.location.replace("/codigo/pages/tarefas.html")
}, "2000")
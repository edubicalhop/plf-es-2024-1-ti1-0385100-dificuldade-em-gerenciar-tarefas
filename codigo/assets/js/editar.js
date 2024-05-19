const url = window.location.href
let index = url.indexOf('?'); // Find the index of the comma
let result = url.slice(index + 1); // Extract from the character after the comma to the end

const id = parseInt(result)
//Achar objeto tarefa
let data = localStorage.getItem("data")
data = JSON.parse(data)



//Atribuit valor dos input aos atuais
document.getElementById("form").addEventListener("submit", (ev)=> {
    ev.preventDefault()
    let titulo = document.getElementById("titulo").value
    let date = document.getElementById("data").value
    let hora = document.getElementById("hora").value
    const instance = {
        "titulo": titulo,
        "data": date, 
        "hora": hora,
    }
    let tarefa;
    tarefa = data.users[0].tarefas.find((task) => task.id === id)
    if(!tarefa) {
        data.users[0].projetos.map((projeto)=>{
            tarefa = projeto.tarefas.find((task) => task.id === id)
            let index = projeto.tarefas.findIndex(task => task.id = tarefa.id)
            projeto.tarefas[index] = instance
            
        })

    } else {
        data.users[0].tarefas.map((tarefa)=> {
            let indexOfSingleTask = data.users[0].tarefas.findIndex(task => tarefa.id = id)
            data.users[0].tarefas[indexOfSingleTask]  = instance
        })

    }

    localStorage.setItem("data", JSON.stringify(data))
    alert("Tarefa atualizada!")
    setTimeout(()=>{
        window.location.replace("/codigo/pages/tarefas.html")
    }, "500")

   



       
    

})



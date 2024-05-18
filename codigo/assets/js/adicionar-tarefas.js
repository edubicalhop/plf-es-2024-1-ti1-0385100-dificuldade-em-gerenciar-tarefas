//Operações com o local storage
let data = localStorage.getItem("data")
data = JSON.parse(data)
console.log(data)
// Ler o valor dos inputs
document.getElementById("form").addEventListener("submit", (ev)=>{
    ev.preventDefault();
    let titulo = document.getElementById("titulo").value
    let date = document.getElementById("data").value
    let hora = document.getElementById("hora").value
    let projeto = document.getElementById("projeto").value

    function addTask(titulo, date, hora, projeto) {
        const instance = {
            "titulo": titulo,
            "data": date, 
            "hora": hora,
            
        }
        if(projeto) {
            //Ler o JSON, encontrar o projeto e adicionar à tarefa à ele
            
            const userProject = data.users[0].projetos.find((project) => project.titulo == projeto)
            console.log(userProject)
            if(userProject) {
                userProject.tarefas.push(instance)
            } else {
                alert("Projeto não encontrado. Tem certeza que digitou o nome certo?")
                location.reload()
            }

        } else {
             data.users[0].tarefas.push(instance)
        }
    }
    addTask(titulo, date, hora, projeto)
    alert("Tarefa adicionada!")
    localStorage.setItem("data", JSON.stringify(data))

    document.getElementById("form").reset()

    
    

})


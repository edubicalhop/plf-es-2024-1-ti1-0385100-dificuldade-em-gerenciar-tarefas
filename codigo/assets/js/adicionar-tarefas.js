import data from '../../../database.json' with {type: 'json'}
// Ler o valor dos inputs
document.getElementsByTagName("form").addEventListener("submit", (ev)=>{
    ev.preventDefault();
    const titulo = document.getElementById("titulo").value
    const date = document.getElementById("data").value
    const hora = document.getElementById("hora").value
    const projeto = document.getElementById("projeto").value

    function addTask(titulo, date, hora, projeto) {
        const instance = {
            "titulo": titulo,
            "data": date, 
            "hora": hora,
            
        }
        if(projeto) {
            //Ler o JSON, encontrar o projeto e adicionar à tarefa à ele
            const userProject = data[0].projetos.find((project) => project.titulo == projeto)
            if(userProject) {
                userProject.tarefas.append(instance)
            } else {
                alert("Projeto não encontrado. Tem certeza que digitou o nome certo?")
                location.reload()
            }

        } else {
             data[0].tarefas.append(instance)
        }
    }
    addTask(titulo, date, hora, projeto)
})


import { log, text } from "@clack/prompts";
import { taskManager } from "../gerenciador/tasks.js";
import { mainMenu } from "./main.js";

export async function createTaskMenu() {
    let name;

    do{
        name = await text({
            message: "Digite o nome da tarefa"
            
        })
        if(taskManager.tasks.has(name)){
            log.error("Essa task ja foi inserida, insira outra")
        }
    }while(taskManager.tasks.has(name));
    
    // if(isCancel(name)){
    //     mainMenu();
    // }

    const task = {
        name,
        status: "em andamento",
        createdAt: new Date().toISOString()
    }
    taskManager.create(task);

    log.success("Tarefa criada com sucesso");

    setTimeout(() => mainMenu() , 2000)
}
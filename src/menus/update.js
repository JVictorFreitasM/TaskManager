import { isCancel, log, select, text } from "@clack/prompts";
import { taskManager } from "../gerenciador/tasks.js";
import chalk from "chalk";
import { listTasksMenu } from "./list.js";

export async function updateTaskMenu(taskName){
    const task = taskManager.tasks.get(taskName);

    const formatedDate = new Date(task.createdAt).toLocaleString();
    const status = taskManager.colorStatus(task.status)

    log.info([
        `Tarefa: ${task.name}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgGray(formatedDate)}`
    ].join('\n'))

    const selected = await select({
        message: "Digite o que deseja fazer",
        options: [
            {label: "Alterar nome", value: "name"},
            {label: "Alterar status", value: "status"},
            {label: "Deletar", value: "delete"},
            {label: "Voltar", value: "back"}
        ]
    })
    if(isCancel(selected)){
        listTasksMenu();
        return;
    }

    switch(selected){
        case "delete":{
            taskManager.tasks.delete(taskName);
            taskManager.save();
            return;
        }
        case "back": {
            listTasksMenu();
            return;
        }
        case "name":{
           const oldTaskName = task.name;
           const newTaskName = await text({
            message: "Digite o novo nome",
            validate(input){
                if(taskManager.tasks.has(input)){
                    return "Já existe uma tarefa com esse nome"
                }
            }
           })
            if(isCancel(newTaskName)){
                updateTaskMenu(oldTaskName);
                return;
            }

            taskManager.tasks.delete(oldTaskName)
            const updatedTask = { ...task, name: newTaskName};
            taskManager.tasks.set( newTaskName, updatedTask);
            updateTaskMenu(newTaskName);
        }
        case "status":{
            const taskStatus = [
                "em andamento",
                "concluida",
                "cancelada"
            ]
            const options = taskStatus
            .filter(status => status !== task.status)
            .map(status => ({label: status, value: status}))
            
            const status = await select({
                message: "Selecione o nome status da tarefa",
                options
            })
            if(isCancel(status)){
                updateTaskMenu(taskName);
                return;
            }

            taskManager.tasks.set(taskName, {...task, status});
            taskManager.save();
            updatedTaskMenu(TaskName);
            return;
        }
    }   

}

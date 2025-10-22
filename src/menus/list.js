import { taskManager } from "../gerenciador/tasks.js"
import { isCancel, log, select } from "@clack/prompts";
import { mainMenu } from "./main.js";
import chalk from "chalk";
import { updateTaskMenu } from "./update.js";

export async function listTasksMenu(){
    if(taskManager.tasks.size < 1){
        log.warn(`${chalk.bgRed("Nenhum item inserido")}`);
        setTimeout(() => mainMenu(),2000);
        return;
    }
    
    const selected = await select({
        message: "Selecione uma tarefa",
        options: [
            ...taskManager.toArray().map(({ name, status })=>({
                label: `${ taskManager.colorStatus(status) } ${chalk.white.underline(name)}`,
                value: name
            })),
            {label: "Menu Principal",
             value: "main"}
        ]
    });
    if(isCancel(selected) || selected  === 'main'){
        mainMenu();
        return;
    }
    //criar o update aqui
    updateTaskMenu(selected);
}


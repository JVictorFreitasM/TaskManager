import { taskManager } from "../gerenciador/tasks.js"
import { log } from "@clack/prompts";
import { mainMenu } from "./main.js";
import chalk from "chalk";

export async function listTasksMenu(){
    if(taskManager.tasks.size < 1){
        log.warn(`${chalk.bgRed("Nenhum item inserido")}`);
        setTimeout(() => mainMenu(),2000);
    }
    
}


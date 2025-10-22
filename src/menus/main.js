import { isCancel, outro, select } from "@clack/prompts";
import chalk from "chalk";
import { createTaskMenu } from "./create.js";

//import { isCancel } from "@clack/core";

export async function mainMenu(){
    const opcoes = await select({
        message: "Escolha uma opção: ",
        options: [
            {label: "Criar tarefa", value: "create"},
            {label: "Listar tarefas", value: "list"},
            {label: "Sair", value: "end"},
        ]

    })
   

    switch(opcoes){
        case "create":{
            createTaskMenu()
            return;
        }
        case "list":{
            
            return;
        }
        default:{
            outro(`${chalk.red("Fim do programa")}`)
        }
    }
}

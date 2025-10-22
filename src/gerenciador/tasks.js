import { existsSync, readFileSync, writeFileSync } from "node:fs";
import  path  from "node:path";
import chalk from "chalk";


//Cria o caminho para o arquivo
const filePath = path.join("./tasks.json");
//Se o arquivo não existir, ele cria o arquivo no diretorio de filePath com conteudo 'stringficado'
if(!existsSync(filePath)){
    writeFileSync(filePath, JSON.stringify([]), "utf-8");
}
//Ler o conteudo de tasks.json e guarda na variavel data
const data = readFileSync(filePath, { encoding: "utf-8"})
//Transforma o conteudo que é string em um objeto js
const parsed = JSON.parse(data);
// Mapeia cada elemento do objeto e os transforma. Onde nome é a key e a task propriamente dita é o value
const tasks = new Map(parsed.map(task => [task.name, task]));
//Cria um objeto para gerenciar ações
export const taskManager = {
    tasks,
    //Pega o todos os valores mapeados salvos na variavel tasks e transforma num array
    save(){
        const data = this.toArray();
        //Escreve os valores em tasks.json
        writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    },
    //Cria task definindo de acordo com o map
    create(task){
        tasks.set(task.name, task);
        this.save();
    },
    //Apenas um metodo para transformar tasks em array.
    toArray(){
        return Array.from(tasks.values());
    },
    //Atribui cor dependendo do status
    colorStatus(status){
        switch(status){
            case "em andamento":{
                return chalk.bgMagenta(` ${status} `);
            }
            case "concluida":{
                return chalk.bgGreen(` ${status} `)
            }
            case "cancelada":{
                return chalk.bgRed(` ${status} `)
            }
            default:
                return chalk.bgWhite;
        }
    }
}



// arquivo inicial da aplicação
// node funciona num fluxo de requisição e resposta, entao sempre que usuario faz uma requisição, o node devolve uma resposta
// o express é um framework que ajuda lidar com requisições e respostas no node. 
//  criar uma unica aplicação no codigo -> const app = express();
// ouvindo porta 3333
// caso erro, instalar pacote de tipagem
// para testar em nome executar comando no terminal -> node src/server.ts
// é preciso executar com typescript como dependencia de desenvolvimento -> npm install typescript -D
// na raiz do projeto, executar -> npm tsc --init
// #rumoaoproximonivel
// -> com npm para criar o arquivo tsconfig.json  --> npx typescript --init
// em tsconfig.json - mudar "target": "es5" para "es2017"
// isso faz com q ao converter o codigo vai saber qual a versao do EcmaScript que é 2017
// pacote que possibilita executar projeto usando typescript e node -> npm install ts-node-dev -D
// comando para iniciar e testar o localhost:3333 -> npm run dev - yearn dev
// metodos comuns nas APIs get, post, put, delete
// get -> busca(lista, item)
// post = criar informação
// put = editar informação
// delete = deletar informação
//--- navegador faz requisiçoes tipo get

// parametros principais na aplicaçao -> query params - usado qndo quer busca dentro da aplicação
// route params -> enviados tbm atraves da rota mas sem nome - identifica um recurso caso deletar ou editar usuario, precisa saber qual usuario é , é preciso saber o id para identificar no banco de dados
// body -> corpo da requisição, sao dados q nao cabem nos outros dois parametro e vem de formularios ex: nome, email, twiter- possuem muitos dados
// para acessar os parametros acima -> console.log(request.query); ->  retorna todos os query params
// Rota = conjunto
// Recurso = usuario

// metodos http =
// parametros
// console.log(request.query);
// console.log(request.params);
// console.log(request.body);

// import {getRepository} from 'typeorm';
// import Orphanage from './models/Orphanage';
// cors permite acesso a outros dominios
import cors from 'cors';
import express from 'express';
const app = express();
import './database/connection';
import routes from './routes';
import path from 'path';
import errorHandler from './errors/handler';

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler);


app.listen(3333);





// migrations é o controle de versao do banco de dados, em caso de muitos dados sendo manipulados por varias pessoas
// migrations permitem criar um arquivo com essas descrições e se alguem precisar a pessoa só pega essa descrição e adiciona ao banco em uso
// typeorm roda com javascript e para executar ele com typescript, é necessario
// ir no arquivo package.json criar em scripts "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js" 




    //comentarios package.json
    // transpile - faz com q nao se preocupe com erro e deixa mais rapido - o editor ja avisa dos erros
    // node module é criado automaticamente -> faz com q nao leia os arquivos do module e deixa mais rapido
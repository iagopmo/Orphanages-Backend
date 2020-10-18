// faz a conexão com o banco de dados
//  é preciso chamar connection.ts dentro do arquivo server.ts, se nao numca sera executado
// Ao usar query builder ou ORM, é possivel trocar os bancos de dados sem precisar mudar nada na aplicação
import {createConnection} from 'typeorm';

createConnection();

    

// comentario do arquivo ormconfig.json
    // mantem informações da conexão com banco de dados

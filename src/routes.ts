// rota para criar um novo orphanato: usa post para criar um novo
// console.log(request.body) --> mostra todos os dados vindos do orfanato criado
// é preciso desestruturar o request body para pegar os dados do corpo da requisição
// console.log(request.body);
// para inserir os dados no banco de dados -> import {getRepository} from 'typorm' -> o repositorio detem a regra de como o dado pode ser criado, deletado e coisas do tipo
// é preciso importar models tbm -> import Orphanage from './models/Orphanage';


import {Router} from 'express';
import multer from 'multer';

import uploadingConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadingConfig);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
// nova rota do tipo get -> index usa para listagem 
routes.get('/orphanages', OrphanagesController.index);
// detalhes do orfanato
routes.get('/orphanages/:id', OrphanagesController.show);


// exportar para importar no server.ts
export default routes;
import {Request, Response} from 'express'
import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

export default{
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },
    // show -> para listar detalhes de um orfanato
    async show(request: Request, response: Response){
        const {id} = request.params;
        
        const orphanagesRepository = getRepository(Orphanage);
// metodo one or fail se achar o id ok se nao falha
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response){
        console.log(request.files);
        const{
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    // passa model como parametro - e possui todos os metodos
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };
        
        // falar quais campos tem na hora de inserir orfanatp -schema de validação do orfanato
        // e para validar dee fato -> await schema.validate(data,{abortEarly:false});
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório.'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )        
        });

        // valida os dados e caso um nao esteja valido, ele aborta com messagem de erro dos campos invalidos.
        await schema.validate(data,{
            abortEarly:false,
        });

    // esse comando somente deixa o orphanato criado
        const orphanage = orphanagesRepository.create(data);
    // para salvar no banco usar orphanageRepository.save(orphanage); -> o parametro é o criado acima
    // await faz com que o que é assincrono no node nao demore a carregar -> ele espera a linha executar para entao ir para a proxima
        await orphanagesRepository.save(orphanage);
        // status 201 significa que foi criado
        return response.status(201).json(orphanage);
    }
}
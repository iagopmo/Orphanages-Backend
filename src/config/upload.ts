// configura como os uploads ficaram dentro da aplicação
// exportar um objeto com varias configurações
//diskStorage salva imagens no disco 

import multer from 'multer';
import path from 'path';

export default{
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName);
        },
    })
}
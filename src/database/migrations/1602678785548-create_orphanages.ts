// classe criada com comando --> npm run typeorm migration:create -- -n create_orphanages
// metodo up -> qndo cria uma migration o metodo up realiza alterações no banco de dados, exemplo criar tabela, criar bando
// se fizer alterações e precisar voltar atras, metodo down é feito pra desfazer o que foi feito no up
// criar primeira tabela no banco de dados
// em import é preciso definir tabela como parametro

import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602678785548 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          // cria id tipo inteiro que nao pode ser negativo, é a chave primaria e tem auto increment
          // cada registro novo de orphanage, ira aumentar o id
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          generationStrategy: 'increment',
        },
        {
          // cria campo name  varchar
          name: 'name',
          type: 'varchar'
        },
        {
          // cria campo latitude tipo decimal, com precisao de numeros antes e apos a virgula - precision e scale
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          // campo com as informações do orfanato
          name: 'about',
          type: 'text',
        },
        {
          // campo com as instruções do orfanato
          name: 'instructions',
          type: 'text',
        },
        {
          // campo horario de atendimento
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        }

      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // nesse metodo é feito o contrario do q foi feito em metodo up, se la criou, aqui deleta
    await queryRunner.dropTable('orphanages')
  }

}

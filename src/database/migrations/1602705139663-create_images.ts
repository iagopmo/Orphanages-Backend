import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602705139663 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
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
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'orphanage_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageOrphanage',
          columnNames: ['orphanage_id'],
          referencedTableName: 'orphanages',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // nesse metodo é feito o contrario do q foi feito em metodo up, se la criou, aqui deleta
    await queryRunner.dropTable('images');
  }

}

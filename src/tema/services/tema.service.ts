import { Tema } from './../entities/tema.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private TemaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return await this.TemaRepository.find();
  }

  async findById(id: number): Promise<Tema> {
    // SELECT * FROM tb_tema WHERE id = ?;
    const Tema = await this.TemaRepository.findOne({
      where: {
        id,
      },
    });

    if (!Tema)
      throw new HttpException('Tema não encontrada!', HttpStatus.NOT_FOUND);

    return Tema;
  }

  async findByDescricao(descricao: string): Promise<Tema[]> {
    return this.TemaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
    });
  }

  async create(Tema: Tema): Promise<Tema> {
    // INSERT INTO tb_postagens (titulo, texto) VALUES (?, ?)
    return await this.TemaRepository.save(Tema);
  }

  async update(Tema: Tema): Promise<Tema> {
    await this.findById(Tema.id);

    // UPDATE tb_postagens SET titulo = Tema.titulo,
    // texto = Tema.texto, data = CURRENT_TIMESTAMP()
    // WHERE id = Tema.id
    return await this.TemaRepository.save(Tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    // DELETE tb_postagens WHERE id = ?;
    return await this.TemaRepository.delete(id);
  }
}

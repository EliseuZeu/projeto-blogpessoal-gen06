import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity'; // Import da entidade Postagem
import { PostagemService } from '../services/postagem.service';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly PostagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findall(): Promise<Postagem[]> {
    return this.PostagemService.findAll();
  }
}

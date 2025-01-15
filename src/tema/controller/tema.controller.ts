import { TemaService } from "../services/tema.service";

@Controller("/tema")
export class temaController{

    constructor(
        private readonly TemaService: TemaService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tema[]>{
        return this.TemaService.findAll();
    }
    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.TemaService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findBydescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.TemaService.findByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Tema: Tema): Promise<Tema>{
        return this.TemaService.create(Tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Tema: Tema): Promise<Tema>{
        return this.TemaService.update(Tema);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.TemaService.delete(id);
    }

}
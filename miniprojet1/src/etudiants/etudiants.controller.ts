import { Controller,Param, Get,Put, Post,Delete, Body, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { etudiantsService  } from './etudiant.service';
import { CreateEtudiantDTO } from './dto/CreateEtudiantDTO';
import { etudiant } from './etudiant.entity';

@Controller('etudiants')
export class EtudiantsController {
    constructor(private etudiantsService:etudiantsService){ }

    @Get("")
    async getetudiants():Promise<etudiant[]>{
        return await this.etudiantsService.getAllEtudiants();
    }

    @Post("/add")
    @UsePipes(ValidationPipe) 
    async createEtudiant(@Body(ValidationPipe) createEtDTO: CreateEtudiantDTO):Promise<void>{
        return this.etudiantsService.createEtudiant(createEtDTO);
    }


    @Get(':massar')
    async  getTudo(@Param('massar') ma:string){
        return  this.etudiantsService.getByMassar(ma);
    }
    @Put(':id/update')
    async update(@Param('id') id, @Body() contactData: CreateEtudiantDTO): Promise<any> {
        contactData.massar =String(id);
        console.log('Update #' + contactData.massar)
        return this.etudiantsService.update(contactData);
    } 
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.etudiantsService.delete(id);
    }  
}


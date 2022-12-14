import {
  Controller,
  Get,
  Render,
  Query,
  Post,
  Redirect,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDto } from './macska.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index(@Query('szem_szin') szem_szin: string) {
    if (szem_szin != undefined) {

      const [ rows ] = await db.execute(
        'SELECT szem_szin, suly FROM macskak WHERE szem_szin = ?',
        [szem_szin]
        );

      return {
        macskak: rows
      };

    }else{

      const [ rows ] = await db.execute(
        'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC'
        );

        return {
          macskak: rows
        };
    } 
  }
  @Get('cats/new')
  @Render('form')
  newMacskaForm(){
    return {};
  }

  @Post('cats/new')
  @Redirect()
  async newPainting(@Body() macskak: MacskaDto){

    const [res]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [ macskak.szem_szin, macskak.suly ]
    );

    return{
      url: '/',
    }
  }
}

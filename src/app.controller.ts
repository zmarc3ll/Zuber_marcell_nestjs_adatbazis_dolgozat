import {
  Controller,
  Get,
  Render,
  Query,
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
}

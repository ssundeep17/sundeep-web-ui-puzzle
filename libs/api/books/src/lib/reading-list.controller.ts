import { Body, HttpException, HttpStatus, Controller, Delete, Get,Put, Param, Post } from '@nestjs/common';
import { Book } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get('/reading-list/')
  async getReadingList() {
    try{
      return await this.readingList.getList();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('/reading-list/')
  async addToReadingList(@Body() item: Book) {
    try{
      return await this.readingList.addBook(item);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/reading-list/:id')
  async removeFromReadingList(@Param() params) {
    try{
      return await this.readingList.removeBook(params.id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
    
    @Put('/reading-list/:id/finished')
  async finishBook(@Param() params, @Body() item: Book) {
    try{
    return await this.readingList.finishBook(params.id, item);
  } catch (e) {
    throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
  } 
  }
  
}

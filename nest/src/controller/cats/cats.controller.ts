import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  Header,
  Redirect,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  // 获取所有猫咪
  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('breed') breed?: string,
  ): string {
    return `返回所有猫咪，限制 ${limit} 条${breed ? `，品种是 ${breed}` : ''}`;
  }

  // 获取特定品种
  @Get('breed')
  findBreeds(): string {
    return '这个操作返回所有猫咪的品种';
  }

  // 获取单个猫咪
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `这个操作返回 ID 为 #${id} 的猫咪`;
  }

  // 创建猫咪
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
    return `创建了猫咪：${createCatDto.name}，品种：${createCatDto.breed}`;
  }

  // 更新猫咪
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto): string {
    return `更新了ID为 ${id} 的猫咪信息，新的猫咪名字是：${updateCatDto.name}，品种是：${updateCatDto.breed}`;
  }

  // 删除猫咪
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): string {
    return `删除了ID为 ${id} 的猫咪`;
  }

  // 重定向示例
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 301)
  getDocs() {
    return { url: 'https://docs.nestjs.com/v9/' };
  }

  // 异步示例
  @Get('async/all')
  async findAllAsync(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ id: 1, name: 'Fluffy' }]);
      }, 1000);
    });
  }
}

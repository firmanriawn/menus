import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MoveMenuDto } from './dto/move-menu.dto';
import { Menu } from './entities/menu.entity';

@ApiTags('menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({ status: 201, description: 'Menu item created successfully', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Parent menu not found' })
  create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menu items in tree structure' })
  @ApiResponse({ status: 200, description: 'Menu tree retrieved successfully', type: [Menu] })
  findAll(): Promise<Menu[]> {
    return this.menuService.findAllTree();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single menu item by ID' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'Menu item retrieved successfully', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  findOne(@Param('id') id: string): Promise<Menu> {
    return this.menuService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a menu item' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'Menu item updated successfully', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto): Promise<Menu> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item and its children' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 204, description: 'Menu item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.menuService.remove(id);
  }

  @Patch(':id/move')
  @ApiOperation({ summary: 'Move a menu item to a different parent or position' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'Menu item moved successfully', type: Menu })
  @ApiResponse({ status: 400, description: 'Bad request or circular reference' })
  @ApiResponse({ status: 404, description: 'Menu or parent not found' })
  move(@Param('id') id: string, @Body() moveMenuDto: MoveMenuDto): Promise<Menu> {
    return this.menuService.move(id, moveMenuDto);
  }

  @Patch(':id/reorder')
  @ApiOperation({ summary: 'Reorder a menu item within the same level' })
  @ApiParam({ name: 'id', description: 'Menu ID' })
  @ApiResponse({ status: 200, description: 'Menu item reordered successfully', type: Menu })
  @ApiResponse({ status: 404, description: 'Menu not found' })
  reorder(@Param('id') id: string, @Body('order') newOrder: number): Promise<Menu> {
    return this.menuService.reorder(id, newOrder);
  }
}

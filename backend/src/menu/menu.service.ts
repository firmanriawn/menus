import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MoveMenuDto } from './dto/move-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    let depth = 0;
    let order = 0;

    // Calculate depth and order
    if (createMenuDto.parentId) {
      const parent = await this.menuRepository.findOne({
        where: { id: createMenuDto.parentId },
      });
      if (!parent) {
        throw new NotFoundException('Parent menu not found');
      }
      depth = parent.depth + 1;

      // Get the highest order among siblings
      const siblings = await this.menuRepository.find({
        where: { parentId: createMenuDto.parentId },
        order: { order: 'DESC' },
        take: 1,
      });
      if (siblings.length > 0) {
        order = siblings[0].order + 1;
      }
    } else {
      // Get the highest order among root items
      const rootItems = await this.menuRepository.find({
        where: { parentId: IsNull() },
        order: { order: 'DESC' },
        take: 1,
      });
      if (rootItems.length > 0) {
        order = rootItems[0].order + 1;
      }
    }

    const menu = this.menuRepository.create({
      ...createMenuDto,
      depth,
      order: createMenuDto.order ?? order,
    });

    return this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find({
      relations: ['children'],
      order: { order: 'ASC' },
    });
  }

  async findAllTree(): Promise<Menu[]> {
    const allMenus = await this.menuRepository.find({
      order: { order: 'ASC' },
    });

    // Build tree structure
    const menuMap = new Map<string, Menu>();
    const rootMenus: Menu[] = [];

    // First pass: create map of all menus
    allMenus.forEach(menu => {
      menuMap.set(menu.id, { ...menu, children: [] });
    });

    // Second pass: build tree structure
    allMenus.forEach(menu => {
      const menuWithChildren = menuMap.get(menu.id);
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          parent.children.push(menuWithChildren);
        }
      } else {
        rootMenus.push(menuWithChildren);
      }
    });

    return rootMenus;
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);

    // If parent is being changed, recalculate depth
    if (updateMenuDto.parentId !== undefined && updateMenuDto.parentId !== menu.parentId) {
      let newDepth = 0;
      if (updateMenuDto.parentId) {
        const newParent = await this.menuRepository.findOne({
          where: { id: updateMenuDto.parentId },
        });
        if (!newParent) {
          throw new NotFoundException('New parent menu not found');
        }
        // Check for circular reference
        if (await this.wouldCreateCircularReference(id, updateMenuDto.parentId)) {
          throw new BadRequestException('Cannot move menu to its own descendant');
        }
        newDepth = newParent.depth + 1;
      }
      updateMenuDto['depth'] = newDepth;
    }

    Object.assign(menu, updateMenuDto);
    return this.menuRepository.save(menu);
  }

  async remove(id: string): Promise<void> {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
  }

  async move(id: string, moveMenuDto: MoveMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);
    const updateData: Partial<Menu> = {};

    if (moveMenuDto.newParentId !== undefined) {
      if (moveMenuDto.newParentId) {
        const newParent = await this.menuRepository.findOne({
          where: { id: moveMenuDto.newParentId },
        });
        if (!newParent) {
          throw new NotFoundException('New parent menu not found');
        }
        // Check for circular reference
        if (await this.wouldCreateCircularReference(id, moveMenuDto.newParentId)) {
          throw new BadRequestException('Cannot move menu to its own descendant');
        }
        updateData.parentId = moveMenuDto.newParentId;
        updateData.depth = newParent.depth + 1;
      } else {
        updateData.parentId = null;
        updateData.depth = 0;
      }
    }

    if (moveMenuDto.newOrder !== undefined) {
      updateData.order = moveMenuDto.newOrder;
    }

    Object.assign(menu, updateData);
    return this.menuRepository.save(menu);
  }

  async reorder(id: string, newOrder: number): Promise<Menu> {
    const menu = await this.findOne(id);
    menu.order = newOrder;
    return this.menuRepository.save(menu);
  }

  private async wouldCreateCircularReference(menuId: string, newParentId: string): Promise<boolean> {
    let currentParentId = newParentId;
    while (currentParentId) {
      if (currentParentId === menuId) {
        return true;
      }
      const parent = await this.menuRepository.findOne({
        where: { id: currentParentId },
      });
      currentParentId = parent?.parentId;
    }
    return false;
  }
}

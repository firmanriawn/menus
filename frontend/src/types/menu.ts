export interface Menu {
  id: string;
  name: string;
  url?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  parentId?: string;
  depth: number;
  parent?: Menu;
  children: Menu[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMenuDto {
  name: string;
  url?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  parentId?: string;
}

export interface UpdateMenuDto {
  name?: string;
  url?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
  parentId?: string;
}

export interface MoveMenuDto {
  newParentId?: string;
  newOrder?: number;
}

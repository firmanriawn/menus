import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'Menu item name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Menu item URL or route', required: false })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty({ description: 'Menu item icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: 'Display order within the same level', required: false })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiProperty({ description: 'Whether the menu item is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ description: 'Parent menu ID', required: false })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}

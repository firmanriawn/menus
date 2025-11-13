import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsNumber } from 'class-validator';

export class MoveMenuDto {
  @ApiProperty({ description: 'New parent menu ID', required: false })
  @IsOptional()
  @IsUUID()
  newParentId?: string;

  @ApiProperty({ description: 'New order position', required: false })
  @IsOptional()
  @IsNumber()
  newOrder?: number;
}

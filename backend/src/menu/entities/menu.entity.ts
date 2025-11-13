import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('menus')
export class Menu {
  @ApiProperty({ description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Menu item name' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Menu item URL or route', required: false })
  @Column({ length: 500, nullable: true })
  url: string;

  @ApiProperty({ description: 'Menu item icon', required: false })
  @Column({ length: 100, nullable: true })
  icon: string;

  @ApiProperty({ description: 'Display order within the same level' })
  @Column({ default: 0 })
  order: number;

  @ApiProperty({ description: 'Whether the menu item is active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Parent menu ID', required: false })
  @Column({ nullable: true })
  parentId: string;

  @ApiProperty({ description: 'Depth level in the hierarchy' })
  @Column({ default: 0 })
  depth: number;

  @ApiProperty({ description: 'Parent menu item', required: false })
  @ManyToOne(() => Menu, (menu) => menu.children, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: Menu;

  @ApiProperty({ description: 'Child menu items', type: [Menu] })
  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}

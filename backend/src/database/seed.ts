import { DataSource } from 'typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { seedMenuData } from '../menu/menu.seed';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'menu_tree_db',
  entities: [Menu],
  synchronize: true,
  logging: false,
});

async function runSeed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
    
    await seedMenuData(AppDataSource);
    
    await AppDataSource.destroy();
    console.log('Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();

import { DataSource } from 'typeorm';
import { Menu } from './entities/menu.entity';

export async function seedMenuData(dataSource: DataSource) {
  const menuRepository = dataSource.getRepository(Menu);

  // Check if data already exists
  const existingMenus = await menuRepository.count();
  if (existingMenus > 0) {
    console.log('Menu data already exists, skipping seed...');
    return;
  }

  console.log('Creating comprehensive menu dummy data...');

  // ROOT LEVEL - System Management
  const systemManagement = menuRepository.create({
    name: 'system.management',
    url: '/system-management',
    icon: '⚙️',
    depth: 0,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(systemManagement);

  // LEVEL 1 - Main Categories
  const systemManagementChild = menuRepository.create({
    name: 'System Management',
    url: '/system-management/overview',
    icon: '🖥️',
    parentId: systemManagement.id,
    depth: 1,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(systemManagementChild);

  // LEVEL 2 - Systems Section
  const systems = menuRepository.create({
    name: 'Systems',
    url: '/systems',
    icon: '🔧',
    parentId: systemManagementChild.id,
    depth: 2,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(systems);

  // LEVEL 3 - System Code (with badge 1)
  const systemCode = menuRepository.create({
    name: 'System Code',
    url: '/systems/code',
    icon: '💻',
    parentId: systems.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(systemCode);

  // LEVEL 4 - System Code Children
  const codeRegistration = menuRepository.create({
    name: 'Code Registration',
    url: '/systems/code/registration',
    icon: '📝',
    parentId: systemCode.id,
    depth: 4,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(codeRegistration);

  const codeRegistration2 = menuRepository.create({
    name: 'Code Registration - 2',
    url: '/systems/code/registration-2',
    icon: '📋',
    parentId: systemCode.id,
    depth: 4,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(codeRegistration2);

  const properties = menuRepository.create({
    name: 'Properties',
    url: '/systems/code/properties',
    icon: '⚡',
    parentId: systemCode.id,
    depth: 4,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(properties);

  // LEVEL 3 - Menus Section
  const menus = menuRepository.create({
    name: 'Menus',
    url: '/systems/menus',
    icon: '📂',
    parentId: systems.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(menus);

  const menuRegistration = menuRepository.create({
    name: 'Menu Registration',
    url: '/systems/menus/registration',
    icon: '➕',
    parentId: menus.id,
    depth: 4,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(menuRegistration);

  const menuManagement = menuRepository.create({
    name: 'Menu Management',
    url: '/systems/menus/management',
    icon: '🔄',
    parentId: menus.id,
    depth: 4,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(menuManagement);

  // LEVEL 3 - API List Section
  const apiList = menuRepository.create({
    name: 'API List',
    url: '/systems/api',
    icon: '🔗',
    parentId: systems.id,
    depth: 3,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(apiList);

  const apiRegistration = menuRepository.create({
    name: 'API Registration',
    url: '/systems/api/registration',
    icon: '🆕',
    parentId: apiList.id,
    depth: 4,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(apiRegistration);

  const apiEdit = menuRepository.create({
    name: 'API Edit',
    url: '/systems/api/edit',
    icon: '✏️',
    parentId: apiList.id,
    depth: 4,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(apiEdit);

  const apiDocumentation = menuRepository.create({
    name: 'API Documentation',
    url: '/systems/api/docs',
    icon: '📚',
    parentId: apiList.id,
    depth: 4,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(apiDocumentation);

  // LEVEL 2 - Users & Groups Section
  const usersGroups = menuRepository.create({
    name: 'Users & Groups',
    url: '/users-groups',
    icon: '👥',
    parentId: systemManagementChild.id,
    depth: 2,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(usersGroups);

  // LEVEL 3 - Users
  const users = menuRepository.create({
    name: 'Users',
    url: '/users-groups/users',
    icon: '👤',
    parentId: usersGroups.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(users);

  const userAccountRegistration = menuRepository.create({
    name: 'User Account Registration',
    url: '/users-groups/users/registration',
    icon: '👤➕',
    parentId: users.id,
    depth: 4,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(userAccountRegistration);

  const userProfile = menuRepository.create({
    name: 'User Profile Management',
    url: '/users-groups/users/profile',
    icon: '👤⚙️',
    parentId: users.id,
    depth: 4,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(userProfile);

  const userPermissions = menuRepository.create({
    name: 'User Permissions',
    url: '/users-groups/users/permissions',
    icon: '🔐',
    parentId: users.id,
    depth: 4,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(userPermissions);

  // LEVEL 3 - Groups
  const groups = menuRepository.create({
    name: 'Groups',
    url: '/users-groups/groups',
    icon: '👥',
    parentId: usersGroups.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(groups);

  const userGroupRegistration = menuRepository.create({
    name: 'User Group Registration',
    url: '/users-groups/groups/registration',
    icon: '👥➕',
    parentId: groups.id,
    depth: 4,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(userGroupRegistration);

  const groupPermissions = menuRepository.create({
    name: 'Group Permissions',
    url: '/users-groups/groups/permissions',
    icon: '🔒',
    parentId: groups.id,
    depth: 4,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(groupPermissions);

  // ADDITIONAL ROOT SECTIONS
  // Content Management
  const contentManagement = menuRepository.create({
    name: 'content.management',
    url: '/content',
    icon: '📄',
    depth: 0,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(contentManagement);

  const contentMain = menuRepository.create({
    name: 'Content Management',
    url: '/content/overview',
    icon: '📝',
    parentId: contentManagement.id,
    depth: 1,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(contentMain);

  const pages = menuRepository.create({
    name: 'Pages',
    url: '/content/pages',
    icon: '📃',
    parentId: contentMain.id,
    depth: 2,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(pages);

  const pageCreate = menuRepository.create({
    name: 'Create Page',
    url: '/content/pages/create',
    icon: '➕',
    parentId: pages.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(pageCreate);

  const pageList = menuRepository.create({
    name: 'Page List',
    url: '/content/pages/list',
    icon: '📋',
    parentId: pages.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(pageList);

  const media = menuRepository.create({
    name: 'Media Library',
    url: '/content/media',
    icon: '🖼️',
    parentId: contentMain.id,
    depth: 2,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(media);

  const mediaUpload = menuRepository.create({
    name: 'Upload Media',
    url: '/content/media/upload',
    icon: '⬆️',
    parentId: media.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(mediaUpload);

  const mediaGallery = menuRepository.create({
    name: 'Media Gallery',
    url: '/content/media/gallery',
    icon: '🖼️',
    parentId: media.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(mediaGallery);

  // E-Commerce Section
  const ecommerce = menuRepository.create({
    name: 'ecommerce.management',
    url: '/ecommerce',
    icon: '🛒',
    depth: 0,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(ecommerce);

  const ecommerceMain = menuRepository.create({
    name: 'E-Commerce',
    url: '/ecommerce/overview',
    icon: '🏪',
    parentId: ecommerce.id,
    depth: 1,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(ecommerceMain);

  const products = menuRepository.create({
    name: 'Products',
    url: '/ecommerce/products',
    icon: '📦',
    parentId: ecommerceMain.id,
    depth: 2,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(products);

  const productAdd = menuRepository.create({
    name: 'Add Product',
    url: '/ecommerce/products/add',
    icon: '➕',
    parentId: products.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(productAdd);

  const productList = menuRepository.create({
    name: 'Product List',
    url: '/ecommerce/products/list',
    icon: '📋',
    parentId: products.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(productList);

  const categories = menuRepository.create({
    name: 'Categories',
    url: '/ecommerce/categories',
    icon: '🏷️',
    parentId: products.id,
    depth: 3,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(categories);

  const orders = menuRepository.create({
    name: 'Orders',
    url: '/ecommerce/orders',
    icon: '📋',
    parentId: ecommerceMain.id,
    depth: 2,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(orders);

  const orderList = menuRepository.create({
    name: 'Order List',
    url: '/ecommerce/orders/list',
    icon: '📄',
    parentId: orders.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(orderList);

  const orderTracking = menuRepository.create({
    name: 'Order Tracking',
    url: '/ecommerce/orders/tracking',
    icon: '🚚',
    parentId: orders.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(orderTracking);

  // Analytics Section
  const analytics = menuRepository.create({
    name: 'analytics.dashboard',
    url: '/analytics',
    icon: '📊',
    depth: 0,
    order: 3,
    isActive: true,
  });
  await menuRepository.save(analytics);

  const analyticsMain = menuRepository.create({
    name: 'Analytics',
    url: '/analytics/overview',
    icon: '📈',
    parentId: analytics.id,
    depth: 1,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(analyticsMain);

  const reports = menuRepository.create({
    name: 'Reports',
    url: '/analytics/reports',
    icon: '📋',
    parentId: analyticsMain.id,
    depth: 2,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(reports);

  const salesReport = menuRepository.create({
    name: 'Sales Report',
    url: '/analytics/reports/sales',
    icon: '💰',
    parentId: reports.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(salesReport);

  const userReport = menuRepository.create({
    name: 'User Report',
    url: '/analytics/reports/users',
    icon: '👥',
    parentId: reports.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(userReport);

  const trafficReport = menuRepository.create({
    name: 'Traffic Report',
    url: '/analytics/reports/traffic',
    icon: '🚦',
    parentId: reports.id,
    depth: 3,
    order: 2,
    isActive: true,
  });
  await menuRepository.save(trafficReport);

  const dashboard = menuRepository.create({
    name: 'Dashboard',
    url: '/analytics/dashboard',
    icon: '📊',
    parentId: analyticsMain.id,
    depth: 2,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(dashboard);

  const realTimeStats = menuRepository.create({
    name: 'Real-time Stats',
    url: '/analytics/dashboard/realtime',
    icon: '⚡',
    parentId: dashboard.id,
    depth: 3,
    order: 0,
    isActive: true,
  });
  await menuRepository.save(realTimeStats);

  const kpiMetrics = menuRepository.create({
    name: 'KPI Metrics',
    url: '/analytics/dashboard/kpi',
    icon: '🎯',
    parentId: dashboard.id,
    depth: 3,
    order: 1,
    isActive: true,
  });
  await menuRepository.save(kpiMetrics);

  console.log('✅ Comprehensive menu dummy data created successfully!');
  console.log('📊 Total menus created: ~50+ items with 4-5 levels deep structure');
  console.log('🎯 Includes: System Management, Content, E-Commerce, Analytics sections');
}

import { Menu } from '../types/menu';

export const dummyMenus: Menu[] = [
  {
    id: '1',
    name: 'system.management',
    depth: 0,
    order: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    children: [
      {
        id: '2',
        name: 'System Management',
        parentId: '1',
        depth: 1,
        order: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: '3',
            name: 'Systems',
            parentId: '2',
            depth: 2,
            order: 0,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: '4',
                name: 'System Code',
                parentId: '3',
                depth: 3,
                order: 0,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [
                  {
                    id: '5',
                    name: 'Code Registration',
                    parentId: '4',
                    depth: 4,
                    order: 0,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  },
                  {
                    id: '6',
                    name: 'Code Registration - 2',
                    parentId: '4',
                    depth: 4,
                    order: 1,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  },
                  {
                    id: '7',
                    name: 'Properties',
                    parentId: '4',
                    depth: 4,
                    order: 2,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  }
                ]
              },
              {
                id: '8',
                name: 'Menus',
                parentId: '3',
                depth: 3,
                order: 1,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [
                  {
                    id: '9',
                    name: 'Menu Registration',
                    parentId: '8',
                    depth: 4,
                    order: 0,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  }
                ]
              },
              {
                id: '10',
                name: 'API List',
                parentId: '3',
                depth: 3,
                order: 2,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [
                  {
                    id: '11',
                    name: 'API Registration',
                    parentId: '10',
                    depth: 4,
                    order: 0,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  },
                  {
                    id: '12',
                    name: 'API Edit',
                    parentId: '10',
                    depth: 4,
                    order: 1,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: '13',
            name: 'Users & Groups',
            parentId: '2',
            depth: 2,
            order: 1,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: '14',
                name: 'Users',
                parentId: '13',
                depth: 3,
                order: 0,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [
                  {
                    id: '15',
                    name: 'User Account Registration',
                    parentId: '14',
                    depth: 4,
                    order: 0,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  }
                ]
              },
              {
                id: '16',
                name: 'Groups',
                parentId: '13',
                depth: 3,
                order: 1,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                children: [
                  {
                    id: '17',
                    name: 'User Group Registration',
                    parentId: '16',
                    depth: 4,
                    order: 0,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

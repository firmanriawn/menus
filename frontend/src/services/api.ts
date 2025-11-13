import axios from 'axios';
import { Menu, CreateMenuDto, UpdateMenuDto, MoveMenuDto } from '../types/menu';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuApi = {
  // Get all menus in tree structure
  getMenus: async (): Promise<Menu[]> => {
    const response = await api.get<Menu[]>('/menus');
    return response.data;
  },

  // Get single menu by ID
  getMenu: async (id: string): Promise<Menu> => {
    const response = await api.get<Menu>(`/menus/${id}`);
    return response.data;
  },

  // Create new menu
  createMenu: async (menuData: CreateMenuDto): Promise<Menu> => {
    const response = await api.post<Menu>('/menus', menuData);
    return response.data;
  },

  // Update menu
  updateMenu: async (id: string, menuData: UpdateMenuDto): Promise<Menu> => {
    const response = await api.put<Menu>(`/menus/${id}`, menuData);
    return response.data;
  },

  // Delete menu
  deleteMenu: async (id: string): Promise<void> => {
    await api.delete(`/menus/${id}`);
  },

  // Move menu
  moveMenu: async (id: string, moveData: MoveMenuDto): Promise<Menu> => {
    const response = await api.patch<Menu>(`/menus/${id}/move`, moveData);
    return response.data;
  },

  // Reorder menu
  reorderMenu: async (id: string, order: number): Promise<Menu> => {
    const response = await api.patch<Menu>(`/menus/${id}/reorder`, { order });
    return response.data;
  },
};

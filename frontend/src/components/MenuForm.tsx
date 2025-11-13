import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Menu, CreateMenuDto, UpdateMenuDto } from '../types/menu';
import { useCreateMenu, useUpdateMenu, useMenus } from '../hooks/useMenus';

interface MenuFormProps {
  menu?: Menu | null;
  isOpen: boolean;
  onClose: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({ menu, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: '',
    parentId: '',
    isActive: true,
  });

  const { data: menus } = useMenus();
  const createMenuMutation = useCreateMenu();
  const updateMenuMutation = useUpdateMenu();

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name,
        url: menu.url || '',
        icon: menu.icon || '',
        parentId: menu.parentId || '',
        isActive: menu.isActive,
      });
    } else {
      setFormData({
        name: '',
        url: '',
        icon: '',
        parentId: '',
        isActive: true,
      });
    }
  }, [menu]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (menu) {
        // Update existing menu
        const updateData: UpdateMenuDto = {
          name: formData.name,
          url: formData.url || undefined,
          icon: formData.icon || undefined,
          parentId: formData.parentId || undefined,
          isActive: formData.isActive,
        };
        await updateMenuMutation.mutateAsync({ id: menu.id, data: updateData });
      } else {
        // Create new menu
        const createData: CreateMenuDto = {
          name: formData.name,
          url: formData.url || undefined,
          icon: formData.icon || undefined,
          parentId: formData.parentId || undefined,
          isActive: formData.isActive,
        };
        await createMenuMutation.mutateAsync(createData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Flatten menus for parent selection
  const flattenMenus = (menuList: Menu[], level = 0): Array<{ menu: Menu; level: number }> => {
    const result: Array<{ menu: Menu; level: number }> = [];
    menuList.forEach(menuItem => {
      // Don't include the current menu or its descendants as potential parents
      if (!menu || (menuItem.id !== menu.id && !isDescendant(menuItem, menu.id))) {
        result.push({ menu: menuItem, level });
        if (menuItem.children && menuItem.children.length > 0) {
          result.push(...flattenMenus(menuItem.children, level + 1));
        }
      }
    });
    return result;
  };

  const isDescendant = (menuItem: Menu, ancestorId: string): boolean => {
    if (!menuItem.children) return false;
    return menuItem.children.some(child => 
      child.id === ancestorId || isDescendant(child, ancestorId)
    );
  };

  if (!isOpen) return null;

  const flatMenus = flattenMenus(menus || []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {menu ? 'Edit Menu' : 'Add Menu'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter menu name"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter URL or route"
            />
          </div>

          {/* Icon */}
          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter icon (emoji or text)"
            />
          </div>

          {/* Parent Menu */}
          <div>
            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
              Parent Menu
            </label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">None (Root Level)</option>
              {flatMenus.map(({ menu: menuOption, level }) => (
                <option key={menuOption.id} value={menuOption.id}>
                  {'  '.repeat(level)}
                  {menuOption.name}
                </option>
              ))}
            </select>
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMenuMutation.isLoading || updateMenuMutation.isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>
                {createMenuMutation.isLoading || updateMenuMutation.isLoading
                  ? 'Saving...'
                  : menu
                  ? 'Update'
                  : 'Create'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;

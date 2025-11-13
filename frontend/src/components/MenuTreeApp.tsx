import React, { useState } from 'react';
import { Search, Plus, Settings, Menu as MenuIcon, Grid3X3, Code, List, Users, Trophy } from 'lucide-react';
import MenuTree from './MenuTree';
import MenuForm from './MenuForm';
import MenuDetail from './MenuDetail';
import { useMenus } from '../hooks/useMenus';
import { Menu } from '../types/menu';

const MenuTreeApp: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const { data: menus, isLoading, error } = useMenus();

  const handleMenuSelect = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const handleMenuEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setIsFormOpen(true);
  };

  const handleMenuAdd = (parentMenu?: Menu) => {
    setEditingMenu(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingMenu(null);
  };

  const toggleExpanded = (menuId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    if (!menus) return;
    const allIds = new Set<string>();
    const collectIds = (items: Menu[]) => {
      items.forEach(item => {
        allIds.add(item.id);
        if (item.children && item.children.length > 0) {
          collectIds(item.children);
        }
      });
    };
    collectIds(menus);
    setExpandedItems(allIds);
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Menus</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar - Exact match dengan gambar */}
      <div className="w-36 bg-blue-600 text-white flex flex-col flex-shrink-0">
        {/* Logo Header - Exact match */}
        <div className="p-3 flex items-center justify-between">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
            </div>
          </div>
          <div className="text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Navigation Menu - Exact styling */}
        <nav className="flex-1 px-3 py-2">
          <div className="space-y-1">
            <div className="flex items-center p-2 rounded text-white hover:bg-blue-500 transition-colors cursor-pointer">
              <div className="w-4 h-4 mr-3 bg-blue-500 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-sm"></div>
              </div>
              <span className="text-xs">Systems</span>
            </div>
            
            <div className="flex items-center p-2 rounded text-white hover:bg-blue-500 transition-colors cursor-pointer">
              <div className="w-4 h-4 mr-3 flex items-center justify-center">
                <Code className="h-3 w-3" />
              </div>
              <span className="text-xs">System Code</span>
            </div>
            
            <div className="flex items-center p-2 rounded text-white hover:bg-blue-500 transition-colors cursor-pointer">
              <div className="w-4 h-4 mr-3 flex items-center justify-center">
                <Settings className="h-3 w-3" />
              </div>
              <span className="text-xs">Properties</span>
            </div>
            
            {/* Active Menu Item - Exact styling */}
            <div className="flex items-center p-2 rounded bg-white text-blue-600 font-medium">
              <div className="w-4 h-4 mr-3 bg-blue-600 rounded flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-0.5 h-0.5 bg-white rounded-sm"></div>
                  <div className="w-0.5 h-0.5 bg-white rounded-sm"></div>
                  <div className="w-0.5 h-0.5 bg-white rounded-sm"></div>
                  <div className="w-0.5 h-0.5 bg-white rounded-sm"></div>
                </div>
              </div>
              <span className="text-xs">Menus</span>
            </div>
            
            <div className="flex items-center p-2 rounded text-white hover:bg-blue-500 transition-colors cursor-pointer">
              <div className="w-4 h-4 mr-3 flex items-center justify-center">
                <List className="h-3 w-3" />
              </div>
              <span className="text-xs">API List</span>
            </div>
            
            <div className="flex items-center p-2 rounded text-white hover:bg-blue-500 transition-colors cursor-pointer">
              <div className="w-4 h-4 mr-3 flex items-center justify-center">
                <Users className="h-3 w-3" />
              </div>
              <span className="text-xs">Users & Group</span>
            </div>
            
            <div className="flex items-center p-2 rounded text-white hover:bg-blue-500 transition-colors cursor-pointer">
              <div className="w-4 h-4 mr-3 flex items-center justify-center">
                <Trophy className="h-3 w-3" />
              </div>
              <span className="text-xs">Competition</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area - Exact match */}
      <div className="flex-1 flex bg-white">
        {/* Menu Tree Section - Exact width */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header - Exact match dengan gambar */}
          <div className="px-4 py-4 border-b border-gray-200">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="text-base">🏠</span>
              <span className="ml-2">Menus</span>
            </div>
            
            {/* Title with Icon - Exact match */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1 h-1 bg-white rounded-sm"></div>
                  <div className="w-1 h-1 bg-white rounded-sm"></div>
                  <div className="w-1 h-1 bg-white rounded-sm"></div>
                  <div className="w-1 h-1 bg-white rounded-sm"></div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Menus</h1>
            </div>

            {/* Menu Label */}
            <div className="mb-2">
              <span className="text-sm text-gray-600">Menu</span>
            </div>

            {/* Dropdown - Exact styling */}
            <div className="mb-4">
              <select className="w-full p-2 border border-gray-300 rounded bg-white text-sm">
                <option value="system.management">system.management</option>
              </select>
            </div>

            {/* Action Buttons - Exact match dengan gambar */}
            <div className="flex space-x-2">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-black text-white text-xs rounded hover:bg-gray-800 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Menu Tree - Exact styling */}
          <div className="flex-1 overflow-y-auto">
            <MenuTree
              menus={menus || []}
              selectedMenu={selectedMenu}
              expandedItems={expandedItems}
              searchTerm={searchTerm}
              onMenuSelect={handleMenuSelect}
              onMenuEdit={handleMenuEdit}
              onMenuAdd={handleMenuAdd}
              onToggleExpanded={toggleExpanded}
            />
          </div>
        </div>

        {/* Right Panel - Exact match dengan gambar */}
        <div className="flex-1 bg-gray-50">
          {selectedMenu ? (
            <MenuDetail
              menu={selectedMenu}
              onEdit={handleMenuEdit}
              onAdd={handleMenuAdd}
            />
          ) : (
            <div className="p-6">
              {/* Menu ID Field - Exact match */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Menu ID</label>
                <div className="w-full p-3 bg-gray-100 rounded text-sm font-mono text-gray-700">
                  56320ee9-6af6-11ed-a7ba-f220afe5ae9
                </div>
              </div>
              
              {/* Depth Field - Exact match */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Depth</label>
                <div className="text-4xl font-bold text-gray-900 py-2">3</div>
              </div>
              
              {/* Parent Data Field - Exact match */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Parent Data</label>
                <div className="w-full p-3 bg-gray-100 rounded text-sm">
                  <div className="font-medium text-gray-900">Systems</div>
                </div>
              </div>
              
              {/* Name Field - Exact match */}
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">Name</label>
                <div className="w-full p-3 bg-gray-100 rounded text-sm">
                  <div className="font-medium text-gray-900">System Code</div>
                </div>
              </div>
              
              {/* Save Button - Exact match dengan gambar */}
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-full font-medium hover:bg-blue-700 transition-colors">
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu Form Modal */}
      {isFormOpen && (
        <MenuForm
          menu={editingMenu}
          isOpen={isFormOpen}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default MenuTreeApp;

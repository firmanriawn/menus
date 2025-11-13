import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Edit, Trash2, Settings, Circle, GripVertical } from 'lucide-react';
import { Menu } from '../types/menu';
import { useDeleteMenu } from '../hooks/useMenus';

interface MenuTreeProps {
  menus: Menu[];
  selectedMenu: Menu | null;
  expandedItems: Set<string>;
  searchTerm: string;
  onMenuSelect: (menu: Menu) => void;
  onMenuEdit: (menu: Menu) => void;
  onMenuAdd: (parentMenu?: Menu) => void;
  onToggleExpanded: (menuId: string) => void;
}

interface MenuItemProps {
  menu: Menu;
  level: number;
  isSelected: boolean;
  isExpanded: boolean;
  searchTerm: string;
  selectedMenu: Menu | null;
  expandedItems: Set<string>;
  onSelect: (menu: Menu) => void;
  onEdit: (menu: Menu) => void;
  onAdd: (parentMenu?: Menu) => void;
  onToggleExpanded: (menuId: string) => void;
  onDelete: (menuId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  menu,
  level,
  isSelected,
  isExpanded,
  searchTerm,
  selectedMenu,
  expandedItems,
  onSelect,
  onEdit,
  onAdd,
  onToggleExpanded,
  onDelete,
}) => {
  // React Hooks must be called at the top level
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const hasChildren = menu.children && menu.children.length > 0;
  const paddingLeft = level * 20 + 12;

  // Filter children based on search term
  const filteredChildren = hasChildren
    ? menu.children!.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Show item if it matches search or has matching children
  const shouldShowItem = searchTerm === '' || 
    menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (hasChildren && filteredChildren.length > 0);

  if (!shouldShowItem) return null;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${menu.name}" and all its children?`)) {
      onDelete(menu.id);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', menu.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId !== menu.id) {
      // Handle drop logic here - move dragged item to this position
      console.log(`Moving ${draggedId} to ${menu.id}`);
    }
  };

  return (
    <div className="select-none">
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group flex items-center py-1 cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'bg-blue-50 text-blue-700' 
            : 'hover:bg-gray-50 text-gray-800'
        } ${isDragging ? 'opacity-50' : ''} ${dragOver ? 'bg-blue-100 border-l-2 border-blue-500' : ''}`}
        style={{ paddingLeft: `${paddingLeft + 12}px` }}
        onClick={() => onSelect(menu)}
      >
        {/* Drag Handle */}
        <div className="flex-shrink-0 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-3 w-3 text-gray-400 cursor-grab active:cursor-grabbing" />
        </div>

        {/* Expand/Collapse Button - Exact match dengan gambar */}
        <button
          className="flex-shrink-0 w-4 h-4 flex items-center justify-center mr-1"
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) {
              onToggleExpanded(menu.id);
            }
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-3 w-3 text-gray-600" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-600" />
            )
          ) : (
            <div className="h-3 w-3" />
          )}
        </button>

        {/* Menu Name - Exact styling dari gambar */}
        <span className={`flex-1 text-sm ${
          isSelected ? 'text-blue-700 font-medium' : 'text-gray-800'
        }`}>
          {menu.name}
        </span>

        {/* Badge - Exact match dengan gambar (hanya untuk System Code) */}
        {hasChildren && menu.name === 'System Code' && (
          <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full mr-2 font-medium">
            1
          </span>
        )}
      </div>

      {/* Children - Exact styling */}
      {hasChildren && isExpanded && (
        <div>
          {filteredChildren.map((child) => (
            <MenuItem
              key={child.id}
              menu={child}
              level={level + 1}
              isSelected={selectedMenu?.id === child.id}
              isExpanded={expandedItems.has(child.id)}
              searchTerm={searchTerm}
              selectedMenu={selectedMenu}
              expandedItems={expandedItems}
              onSelect={onSelect}
              onEdit={onEdit}
              onAdd={onAdd}
              onToggleExpanded={onToggleExpanded}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MenuTree: React.FC<MenuTreeProps> = ({
  menus,
  selectedMenu,
  expandedItems,
  searchTerm,
  onMenuSelect,
  onMenuEdit,
  onMenuAdd,
  onToggleExpanded,
}) => {
  const deleteMenuMutation = useDeleteMenu();

  const handleDelete = (menuId: string) => {
    deleteMenuMutation.mutate(menuId);
  };

  const filteredMenus = menus.filter(menu =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (menu.children && menu.children.some(child =>
      child.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  if (filteredMenus.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Settings className="h-8 w-8 mx-auto mb-2 text-gray-300" />
        <p className="text-sm">No menus found</p>
        {searchTerm && (
          <p className="text-xs mt-1">Try adjusting your search term</p>
        )}
      </div>
    );
  }

  return (
    <div className="py-2">
      {filteredMenus.map((menu) => (
        <MenuItem
          key={menu.id}
          menu={menu}
          level={0}
          isSelected={selectedMenu?.id === menu.id}
          isExpanded={expandedItems.has(menu.id)}
          searchTerm={searchTerm}
          selectedMenu={selectedMenu}
          expandedItems={expandedItems}
          onSelect={onMenuSelect}
          onEdit={onMenuEdit}
          onAdd={onMenuAdd}
          onToggleExpanded={onToggleExpanded}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MenuTree;

import React from 'react';
import { Edit, Plus, ExternalLink, Calendar, Settings } from 'lucide-react';
import { Menu } from '../types/menu';

interface MenuDetailProps {
  menu: Menu;
  onEdit: (menu: Menu) => void;
  onAdd: (parentMenu?: Menu) => void;
}

const MenuDetail: React.FC<MenuDetailProps> = ({ menu, onEdit, onAdd }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-md mx-auto space-y-4">
        {/* Menu ID Field - Enhanced responsive styling */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Menu ID</label>
          <div className="w-full p-3 bg-gray-100 rounded-md text-sm font-mono text-gray-700 border border-gray-200 break-all">
            {menu.id.substring(0, 8)}...{menu.id.substring(menu.id.length - 4)}
          </div>
        </div>
        
        {/* Depth Field - Large number display */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Depth</label>
          <div className="text-4xl sm:text-5xl font-bold text-gray-900 py-2">
            {menu.depth}
          </div>
        </div>
        
        {/* Parent Data Field - Clean styling */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Parent Data</label>
          <div className="w-full p-3 bg-gray-100 rounded-md text-sm border border-gray-200">
            <div className="font-medium text-gray-900">
              {menu.parent ? menu.parent.name : 'Systems'}
            </div>
          </div>
        </div>
        
        {/* Name Field - Clean styling */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <div className="w-full p-3 bg-gray-100 rounded-md text-sm border border-gray-200">
            <div className="font-medium text-gray-900">{menu.name}</div>
          </div>
        </div>
        
        {/* Additional Info - Status and timestamps */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              menu.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {menu.isActive ? 'Active' : 'Inactive'}
            </span>
            <span className="text-xs text-gray-500">Order: {menu.order}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => onEdit(menu)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            Save Changes
          </button>
          
          <button
            onClick={() => onAdd(menu)}
            className="w-full bg-green-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            Add Child Menu
          </button>
        </div>
        
        {/* Menu URL if available */}
        {menu.url && (
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-600">URL</label>
            <div className="w-full p-3 bg-blue-50 rounded-md text-sm border border-blue-200">
              <code className="text-blue-800 font-mono">{menu.url}</code>
            </div>
          </div>
        )}
        
        {/* Timestamps */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="text-xs text-gray-500">
            <div>Created: {formatDate(menu.createdAt)}</div>
            <div>Updated: {formatDate(menu.updatedAt)}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="text-sm text-gray-900 font-mono">{menu.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">{menu.name}</dd>
              </div>
              {menu.url && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">URL</dt>
                  <dd className="text-sm text-gray-900">
                    <a
                      href={menu.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-800"
                    >
                      {menu.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </dd>
                </div>
              )}
              {menu.icon && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Icon</dt>
                  <dd className="text-sm text-gray-900 flex items-center space-x-2">
                    <span className="text-lg">{menu.icon}</span>
                    <span className="text-gray-600">({menu.icon})</span>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Hierarchy Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Hierarchy</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Parent</dt>
                <dd className="text-sm text-gray-900">
                  {menu.parent ? menu.parent.name : 'None (Root Level)'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Depth Level</dt>
                <dd className="text-sm text-gray-900">{menu.depth}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Display Order</dt>
                <dd className="text-sm text-gray-900">{menu.order}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Children Count</dt>
                <dd className="text-sm text-gray-900">
                  {menu.children ? menu.children.length : 0}
                </dd>
              </div>
            </dl>
          </div>

          {/* Timestamps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Timestamps
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="text-sm text-gray-900">{formatDate(menu.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="text-sm text-gray-900">{formatDate(menu.updatedAt)}</dd>
              </div>
            </dl>
          </div>

          {/* Children */}
          {menu.children && menu.children.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Children</h3>
              <div className="space-y-2">
                {menu.children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center space-x-3 p-2 bg-white rounded border"
                  >
                    <div className="flex-shrink-0">
                      {child.icon ? (
                        <span className="text-sm">{child.icon}</span>
                      ) : (
                        <Settings className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{child.name}</div>
                      {child.url && (
                        <div className="text-xs text-gray-500">{child.url}</div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        child.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {child.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;


'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export default function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['activities', 'content']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: '数据概览',
      icon: 'ri-dashboard-line',
      onClick: () => setActiveMenu('dashboard')
    },
    {
      id: 'activities',
      title: '活动管理',
      icon: 'ri-trophy-line',
      children: [
        { id: 'offline-activity', title: '线下活动', onClick: () => setActiveMenu('offline-activity') },
        { id: 'online-activity', title: '线上活动', onClick: () => setActiveMenu('online-activity') },
        { id: 'participate', title: '参与活动', onClick: () => setActiveMenu('route') }
      ]
    },
    {
      id: 'content',
      title: '内容运营',
      icon: 'ri-article-line',
      children: [
        { id: 'news', title: '资讯管理', onClick: () => setActiveMenu('news') }
      ]
    },
    {
      id: 'users',
      title: '用户管理',
      icon: 'ri-user-line',
      onClick: () => setActiveMenu('users')
    }
  ];

  const isActive = (menuId: string) => {
    if (menuId === 'offline-activity') return ['offline-activity'].includes(activeMenu);
    if (menuId === 'online-activity') return ['online-activity'].includes(activeMenu);
    if (menuId === 'offline') return ['walking', 'step-stats', 'points-manage', 'ranking'].includes(activeMenu);
    if (menuId === 'online') return ['video', 'video-publish', 'video-manage', 'contest-result'].includes(activeMenu);
    if (menuId === 'participate') return ['route', 'route-publish', 'route-manage', 'route-creator'].includes(activeMenu);
    if (menuId === 'news') return ['news', 'news-list', 'news-publish', 'news-category'].includes(activeMenu);
    return activeMenu === menuId;
  };

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            if (item.children) {
              const isExpanded = expandedMenus.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <i className={`${item.icon} text-gray-500`}></i>
                      <span>{item.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {isExpanded && (
                    <ul className="mt-2 ml-6 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            onClick={child.onClick}
                            className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${
                              isActive(child.id)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {child.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            } else {
              return (
                <li key={item.id}>
                  <button
                    onClick={item.onClick}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg ${
                      isActive(item.id)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`${item.icon} ${isActive(item.id) ? 'text-blue-600' : 'text-gray-500'}`}></i>
                    <span>{item.title}</span>
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </aside>
  );
}

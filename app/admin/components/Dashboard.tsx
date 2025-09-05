
'use client';

import { useState } from 'react';

export default function Dashboard() {
  const statsData = [
    {
      title: '青少年飞踢体验...',
      sponsor: '郑州市体育协会',
      author: '王小峰',
      publishTime: '2023.11 17:30:00',
      status: '待开始',
      registrations: 156
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '郑州市体育协会',
      author: '王小峰',
      publishTime: '2023.11 17:30:00',
      status: '活动中',
      registrations: 234
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '郑州市体育协会',
      author: '王小峰',
      publishTime: '2023.11 17:30:00',
      status: '已结束',
      registrations: 89
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '郑州市体育协会',
      author: '王小峰',
      publishTime: '2023.11 17:30:00',
      status: '待开始',
      registrations: 145
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '洛阳广场舞协会',
      author: '李明',
      publishTime: '2023.11 17:30:00',
      status: '活动中',
      registrations: 67
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '洛阳广场舞协会',
      author: '李明',
      publishTime: '2023.11 17:30:00',
      status: '已结束',
      registrations: 23
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '洛阳广场舞协会',
      author: '李明',
      publishTitle: '2023.11 17:30:00',
      status: '待开始',
      registrations: 98
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '洛阳广场舞协会',
      author: '李明',
      publishTime: '2023.11 17:30:00',
      status: '活动中',
      registrations: 176
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '开封飞踢协会',
      author: '冯涛',
      publishTime: '2023.11 17:30:00',
      status: '已结束',
      registrations: 89
    },
    {
      title: '青少年飞踢体验...',
      sponsor: '开封飞踢协会',
      author: '冯涛',
      publishTime: '2023.11 17:30:00',
      status: '已结束',
      registrations: 134
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待开始': return 'text-blue-600';
      case '活动中': return 'text-green-600';
      case '已结束': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">活动管理</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center">
          <i className="ri-add-line mr-2"></i>
          新建活动
        </button>
      </div>

      <div className="flex items-center justify-end space-x-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="请输入搜索内容"
            className="w-80 pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
            搜索
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">标题</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">发布机构</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">操作人</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">操作时间</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">活动状态</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">小程序链接</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {statsData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.sponsor}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.publishTime}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <i className="ri-smartphone-line mr-1"></i>
                    复制链接
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">编辑</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">上线</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          共 10 条数据
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">10 条/页</span>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              上页
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
              下页
            </button>
          </div>
          <span className="text-sm text-gray-700">/ 1 页</span>
        </div>
      </div>
    </div>
  );
}

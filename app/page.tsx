'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-trophy-line text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">运动会管理系统</h1>
          <p className="text-gray-600">欢迎使用运动会注册系统管理后台</p>
        </div>
        
        <Link 
          href="/admin"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <i className="ri-dashboard-line mr-2"></i>
          进入管理后台
        </Link>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          管理运动会资讯、健步走活动、视频展示和虚拟路线
        </div>
      </div>
    </div>
  );
}
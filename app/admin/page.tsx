
'use client';

import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NewsManagement from './components/NewsManagement';
import WalkingActivity from './components/WalkingActivity';
import VideoActivity from './components/VideoActivity';
import VirtualRoute from './components/VirtualRoute';
import OfflineActivityManagement from './components/ActivityManagement';
import OnlineActivityManagement from './components/OnlineActivityManagement';

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState('offline-activity');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'offline-activity':
        return <OfflineActivityManagement />;
      case 'online-activity':
        return <OnlineActivityManagement />;
      case 'news':
      case 'news-list':
      case 'news-publish':
      case 'news-category':
        return <NewsManagement />;
      case 'walking':
      case 'step-stats':
      case 'points-manage':
      case 'ranking':
        return <WalkingActivity />;
      case 'video':
      case 'video-publish':
      case 'video-manage':
      case 'contest-result':
        return <VideoActivity />;
      case 'route':
      case 'route-publish':
      case 'route-manage':
      case 'route-creator':
        return <VirtualRoute />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className="flex-1 ml-64 p-6 mt-16">
          <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-6rem)]">
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

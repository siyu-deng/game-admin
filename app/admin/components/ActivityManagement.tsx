'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  title?: string;
  name?: string;
  organization: string;
  operator: string;
  operateTime?: string;
  createTime?: string;
  status: string;
  miniProgramLink?: string;
  miniProgram?: string;
  isOnline?: boolean;
  livePermission?: string;
  description?: string;
  location?: string;
  participants?: number;
  maxParticipants?: number;
}

export default function ActivityManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [showEditActivity, setShowEditActivity] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // 河南省相关的线下运动活动模拟数据
  const activitiesData = [
    {
      id: 'ACT001',
      title: '青少年飞盘体验...',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: false,
      description: '面向郑州市青少年的飞盘运动培训活动，提升运动技能与团队协作能力',
      location: '郑州奥体中心',
      participants: 120,
      maxParticipants: 150
    },
    {
      id: 'ACT002',
      title: '青少年飞盘体验...',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: false,
      description: '洛阳地区青少年飞盘运动推广活动，培养青少年运动兴趣',
      location: '洛阳体育中心',
      participants: 85,
      maxParticipants: 100
    },
    {
      id: 'ACT003',
      title: '青少年飞盘体验...',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'finished',
      miniProgramLink: '复制链接',
      isOnline: true,
      description: '开封市青少年飞盘运动训练营，打造专业飞盘运动队伍',
      location: '开封市体育馆',
      participants: 95,
      maxParticipants: 120
    },
    {
      id: 'ACT004',
      title: '青少年飞盘体验...',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: false,
      description: '南阳市青少年飞盘运动普及活动，推广新兴运动项目',
      location: '南阳体育公园',
      participants: 110,
      maxParticipants: 130
    },
    {
      id: 'ACT005',
      title: '青少年飞盘体验...',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: true,
      description: '濮阳地区青少年飞盘运动媒体推广活动',
      location: '濮阳市全民健身中心',
      participants: 75,
      maxParticipants: 90
    },
    {
      id: 'ACT006',
      name: '青少年飞盘特训营',
      organization: '安阳广播电视台',
      operator: '李娟',
      createTime: '2023-11-17 10:00',
      livePermission: '已报名',
      miniProgram: '编辑',
      status: 'active',
      description: '安阳市青少年飞盘运动电视宣传活动',
      location: '安阳市奥体中心',
      participants: 88,
      maxParticipants: 100
    },
    {
      id: 'ACT007',
      name: '青少年飞盘特训营',
      organization: '新乡广播电视台',
      operator: '赵明',
      createTime: '2023-11-17 10:00',
      livePermission: '直播间',
      miniProgram: '编辑',
      status: 'pending',
      description: '新乡地区青少年飞盘运动推广与培训',
      location: '新乡市体育中心',
      participants: 65,
      maxParticipants: 80
    },
    {
      id: 'ACT008',
      name: '青少年飞盘特训营',
      organization: '驻马店广播电视台',
      operator: '陈雷',
      createTime: '2023-11-17 10:00',
      livePermission: '直播间',
      miniProgram: '编辑',
      status: 'active',
      description: '驻马店青少年飞盘运动启蒙培训',
      location: '驻马店体育馆',
      participants: 72,
      maxParticipants: 85
    },
    {
      id: 'ACT009',
      name: '青少年飞盘特训营',
      organization: '焦作广播电视台',
      operator: '马丽',
      createTime: '2023-11-17 10:00',
      livePermission: '已报名',
      miniProgram: '编辑',
      status: 'active',
      description: '焦作市青少年飞盘运动技能培训',
      location: '焦作市全民健身广场',
      participants: 93,
      maxParticipants: 110
    },
    {
      id: 'ACT010',
      name: '青少年飞盘特训营',
      organization: '信阳广播电视台',
      operator: '孙伟',
      createTime: '2023-11-17 10:00',
      livePermission: '已报名',
      miniProgram: '编辑',
      status: 'completed',
      description: '信阳地区青少年飞盘运动竞技培训',
      location: '信阳体育中心',
      participants: 105,
      maxParticipants: 120
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">进行中</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已完成</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">待开始</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">未知</Badge>;
    }
  };

  const getLivePermissionBadge = (permission: string | undefined) => {
    switch (permission) {
      case '专门小程序':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">专门小程序</Badge>;
      case '直播间':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">直播间</Badge>;
      case '已报名':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">已报名</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{permission}</Badge>;
    }
  };

  const filteredActivities = activitiesData.filter(activity =>
    (activity.title || activity.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewActivity = (activity: any) => {
    setSelectedActivity(activity);
  };

  const handleCreateActivity = () => {
    setShowCreateActivity(true);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">活动管理</h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="输入关键字搜索"
              className="w-80 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap text-sm"
            onClick={handleCreateActivity}
          >
            <i className="ri-add-line mr-2"></i>
            新增
          </button>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活动</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布机构</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">直播间权限</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">小程序页面</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{activity.title || activity.name}</div>
                    <div className="text-xs text-gray-500">{activity.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.organization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.operator}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{activity.operateTime || activity.createTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activity.livePermission && getLivePermissionBadge(activity.livePermission)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      {activity.miniProgramLink || activity.miniProgram || '编辑'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => handleViewActivity(activity)}
                        title="查看详情"
                      >
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded" title="编辑">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded" title="删除">
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          共 {filteredActivities.length} 条
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            上一页
          </button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">9</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            下一页
          </button>
        </div>
      </div>

      {/* 活动详情弹窗 */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>活动详情</DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">活动名称</label>
                    <div className="text-lg font-semibold text-gray-900">{selectedActivity.title || selectedActivity.name}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">发布机构</label>
                    <div className="text-sm text-gray-900">{selectedActivity.organization}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">操作人</label>
                    <div className="text-sm text-gray-900">{selectedActivity.operator}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">创建时间</label>
                    <div className="text-sm text-gray-900">{selectedActivity.operateTime || selectedActivity.createTime}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">活动地点</label>
                    <div className="text-sm text-gray-900">{selectedActivity.location}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">活动状态</label>
                    <div className="mt-1">{getStatusBadge(selectedActivity.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">直播间权限</label>
                    <div className="mt-1">{getLivePermissionBadge(selectedActivity.livePermission)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">参与人数</label>
                    <div className="text-sm text-gray-900">
                      {selectedActivity.participants || 0} / {selectedActivity.maxParticipants || 0}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">参与率</label>
                    <div className="text-sm text-gray-900">
                      {selectedActivity.participants && selectedActivity.maxParticipants
                        ? (((selectedActivity.participants || 0) / (selectedActivity.maxParticipants || 1)) * 100).toFixed(1) + '%'
                        : '0%'
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">活动描述</label>
                <div className="mt-2 text-sm text-gray-900 p-4 bg-gray-50 rounded-lg">
                  {selectedActivity.description}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                  关闭
                </Button>
                <Button>
                  编辑活动
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 创建活动弹窗 */}
      <Dialog open={showCreateActivity} onOpenChange={setShowCreateActivity}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>创建新活动</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">活动名称</label>
                  <Input placeholder="请输入活动名称" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">发布机构</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">选择发布机构</option>
                    <option value="郑州市体育局">郑州市体育局</option>
                    <option value="洛阳市体育局">洛阳市体育局</option>
                    <option value="开封市体育局">开封市体育局</option>
                    <option value="南阳市体育局">南阳市体育局</option>
                    <option value="安阳市体育局">安阳市体育局</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">活动地点</label>
                  <Input placeholder="请输入活动地点" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">最大参与人数</label>
                  <Input type="number" placeholder="请输入最大参与人数" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">操作人</label>
                  <Input placeholder="请输入操作人姓名" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">直播间权限</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">选择直播间权限</option>
                    <option value="专门小程序">专门小程序</option>
                    <option value="直播间">直播间</option>
                    <option value="已报名">已报名</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">开始时间</label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">结束时间</label>
                  <Input type="datetime-local" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">活动描述</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="请输入活动详细描述"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowCreateActivity(false)}>
                取消
              </Button>
              <Button>
                创建活动
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function OnlineActivityManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: '青少年飞盘体验...',
      activityType: '健步走',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 2,
      title: '青少年飞盘体验...',
      activityType: '健步走',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 3,
      title: '青少年飞盘体验...',
      activityType: '健步走',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'finished',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 4,
      title: '青少年飞盘体验...',
      activityType: '健步走',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'comparing',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 5,
      title: '青少年飞盘体验...',
      activityType: '视频赛',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 6,
      title: '青少年飞盘体验...',
      activityType: '视频赛',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 7,
      title: '青少年飞盘体验...',
      activityType: '视频赛',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'finished',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 8,
      title: '青少年飞盘体验...',
      activityType: '视频赛',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'comparing',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 9,
      title: '青少年飞盘体验...',
      activityType: '视频赛',
      organization: '开封气盘协会',
      operator: '冯涛',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 10,
      title: '青少年飞盘体验...',
      activityType: '视频赛',
      organization: '开封气盘协会',
      operator: '冯涛',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    }
  ]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return '待开始';
      case 'active':
        return '活动中';
      case 'finished':
        return '已结束';
      case 'comparing':
        return '评比中';
      default:
        return status;
    }
  };

  const toggleActivityOnline = (id: number) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, isOnline: !activity.isOnline }
        : activity
    ));
  };

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
    setShowEditDialog(true);
  };

  const handleCheckboxChange = (id: number) => {
    setActivities(prev => prev.map(activity =>
      activity.id === id
        ? { ...activity, checked: !activity.checked }
        : activity
    ));
  };

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* 标题和操作栏 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">活动管理</h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="请输入关键词搜索"
              className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            新建
          </button>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活动类型</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布机构</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作人</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作时间</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">活动状态</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">小程序链接</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={activity.checked}
                    onChange={() => handleCheckboxChange(activity.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{activity.title}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{activity.activityType}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{activity.organization}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{activity.operator}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{activity.operateTime}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{getStatusText(activity.status)}</div>
                </td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <i className="ri-file-copy-line mr-1"></i>
                    {activity.miniProgramLink}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditActivity(activity)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => toggleActivityOnline(activity.id)}
                      className={`text-sm ${
                        activity.isOnline 
                          ? 'text-red-600 hover:text-red-800' 
                          : 'text-green-600 hover:text-green-800'
                      }`}
                    >
                      {activity.isOnline ? '下线' : '上线'}
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      查看成果
                    </button>
                    <button className="text-purple-600 hover:text-purple-800 text-sm">
                      发布成果
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          共 10 项数据
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">10 条/页</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>10 条/页</option>
            <option>20 条/页</option>
            <option>50 条/页</option>
          </select>
          <span className="text-sm text-gray-500">跳至</span>
          <input type="number" defaultValue="1" className="w-12 border border-gray-300 rounded px-2 py-1 text-sm text-center" />
          <span className="text-sm text-gray-500">/ 1 页</span>
        </div>
      </div>

      {/* 编辑活动弹窗 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                <Input 
                  defaultValue="青少年飞盘大赛" 
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">活动时间</label>
                <div className="flex space-x-4">
                  <Input 
                    type="datetime-local"
                    defaultValue="2023-01-01T00:00:00"
                    className="flex-1"
                  />
                  <Input 
                    type="datetime-local"
                    defaultValue="2023-01-15T00:00:00"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">评比时间（选填）</label>
                <div className="flex space-x-4">
                  <Input 
                    type="datetime-local"
                    defaultValue="2023-01-01T00:00:00"
                    className="flex-1"
                  />
                  <Input 
                    type="datetime-local"
                    defaultValue="2023-01-15T00:00:00"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">活动须知</label>
                
                {/* 富文本编辑器工具栏 */}
                <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-bold"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-italic"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-underline"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-strikethrough"></i></button>
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-list-unordered"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-list-ordered"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-indent-decrease"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-image-line"></i></button>
                    <div className="w-px h-6 bg-gray-300 mx-2"></div>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-arrow-go-back-line"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-arrow-go-forward-line"></i></button>
                  </div>
                </div>
                
                <textarea 
                  className="w-full border-x border-b border-gray-300 rounded-b-md p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入内容"
                  defaultValue="为响应体育总局关于推广全民健身运动的号召，满足广大文体爱好者参与热情和中老年群体对健身活动的需求，洛阳市体育局面向2023年'全民健身日上洛阳--首届洛阳市最大单项比赛'。

比赛以线上和线下的形式举办，面向全家到对河南省体育健身和普惠推广做参与。本小程序为大家提供一个统一平台，将及时展示优秀选手的优秀作品。

请相关参与人员用户，广泛动员全省体育健身好者兼数视参与，本小程序为大家提供一个统一平台，将及时展示优秀选手的优秀作品。"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">封面图片</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="w-24 h-16 bg-orange-200 rounded mx-auto mb-2">
                    <img src="/api/placeholder/96/64" alt="封面图" className="w-full h-full object-cover rounded" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">活动类型</label>
                <select className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>健步走</option>
                  <option>视频赛</option>
                  <option>飞盘体验</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                存为草稿
              </Button>
              <Button onClick={() => setShowEditDialog(false)}>
                提交
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: number;
  title: string;
  organization: string;
  operator: string;
  operateTime: string;
  status: string;
  miniProgramLink: string;
  isOnline: boolean;
  checked: boolean;
}

export default function OfflineActivityManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: '青少年飞盘体验...',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 2,
      title: '青少年飞盘体验...',
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 3,
      title: '青少年飞盘体验...',
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
      organization: '郑州市体育协会',
      operator: '王小峰',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 5,
      title: '青少年飞盘体验...',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 6,
      title: '青少年飞盘体验...',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'finished',
      miniProgramLink: '复制链接',
      isOnline: true,
      checked: false
    },
    {
      id: 7,
      title: '青少年飞盘体验...',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'waiting',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 8,
      title: '青少年飞盘体验...',
      organization: '洛阳广场舞协会',
      operator: '李阳',
      operateTime: '2023.11 17:30:00',
      status: 'active',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 9,
      title: '青少年飞盘体验...',
      organization: '开封气盘协会',
      operator: '冯涛',
      operateTime: '2023.11 17:30:00',
      status: 'finished',
      miniProgramLink: '复制链接',
      isOnline: false,
      checked: false
    },
    {
      id: 10,
      title: '青少年飞盘体验...',
      organization: '开封气盘协会',
      operator: '冯涛',
      operateTime: '2023.11 17:30:00',
      status: 'finished',
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

  const handleEditActivity = (activity: Activity) => {
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
    <div className="bg-gray-50 min-h-screen p-6">
      {/* 标题 */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">活动管理</h1>
      
      {/* 操作栏 */}
      <div className="flex items-center justify-between mb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <i className="ri-add-line mr-1"></i>
          新建活动
        </button>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="请输入关键词搜索"
              className="w-80 px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            搜索
          </button>
        </div>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-center">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">标题</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">发布机构</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作人</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作时间</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">活动状态</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">小程序链接</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={activity.checked}
                    onChange={() => handleCheckboxChange(activity.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{activity.organization}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{activity.operator}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{activity.operateTime}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{getStatusText(activity.status)}</div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <i className="ri-file-copy-line mr-1"></i>
                    复制链接
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
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
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      {activity.isOnline ? '下线' : '上线'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between py-3">
        <div className="text-sm text-gray-600">
          共 {filteredActivities.length} 条数据
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mr-4">
            <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
              <option>10 条/页</option>
              <option>20 条/页</option>
              <option>50 条/页</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">3</button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">10</button>
            <button className="px-2 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
          
          <div className="flex items-center ml-4">
            <span className="text-sm text-gray-600 mr-1">跳至</span>
            <input type="number" defaultValue="1" className="w-12 border border-gray-300 rounded-md px-2 py-1 text-sm text-center" />
            <span className="text-sm text-gray-600 ml-1">/ 1 页</span>
          </div>
        </div>
      </div>

      {/* 编辑活动弹窗 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>线下活动 &gt; 编辑活动</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">编辑活动</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                <Input 
                  defaultValue={editingActivity?.title || '青少年飞盘大赛'} 
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  跳转链接（与活动内容填写任一即可）
                </label>
                <Input 
                  placeholder="支持公众号文章链接，例如pages/activity/001"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  活动内容（与跳转链接填写任一即可）
                </label>
                
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
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-table-line"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-align-left"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-align-center"></i></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><i className="ri-more-line"></i></button>
                  </div>
                </div>
                
                <textarea 
                  className="w-full border-x border-b border-gray-300 rounded-b-md p-4 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入内容"
                  defaultValue="为响应体育总局关于推广全民健身运动的号召，满足广大文体爱好者参与热情和中老年群体对健身活动的需求，洛阳市体育局面向2023年'全民健身日上洛阳--首届洛阳市最大单项比赛'。

比赛以线上和线下的形式举办，面向全家到对河南省体育健身和普惠推广做参与。本小程序为大家提供一个统一平台，将及时展示优秀选手的优秀作品。"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">封面图</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="w-24 h-16 bg-orange-200 rounded mx-auto mb-2">
                    <div className="w-full h-full bg-orange-300 rounded flex items-center justify-center">
                      <i className="ri-image-line text-orange-600 text-2xl"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">活动类型</label>
                <select className="w-48 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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

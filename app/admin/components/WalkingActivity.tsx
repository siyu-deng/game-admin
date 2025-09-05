'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WalkingActivity() {
  const [activeTab, setActiveTab] = useState('steps');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showPointsSettings, setShowPointsSettings] = useState(false);

  const stepData = [
    { id: 'USER001', dailySteps: 12580, totalSteps: 125800, rank: 1, lastUpdate: '2024-02-15 18:30', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20athletic%20person%20with%20fitness%20tracker%2C%20healthy%20lifestyle%2C%20clean%20background%2C%20modern%20sports%20photography&width=32&height=32&seq=13&orientation=squarish', name: '张明', location: '郑州市', phone: '138****8899', level: '黄金会员' },
    { id: 'USER003', dailySteps: 11420, totalSteps: 98760, rank: 2, lastUpdate: '2024-02-15 17:45', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20fitness%20enthusiast%20wearing%20athletic%20wear%2C%20determined%20expression%2C%20simple%20background&width=32&height=32&seq=14&orientation=squarish', name: '李华', location: '洛阳市', phone: '139****7766', level: '白银会员' },
    { id: 'USER007', dailySteps: 10890, totalSteps: 89340, rank: 3, lastUpdate: '2024-02-15 19:20', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20active%20person%20with%20sports%20equipment%2C%20fitness%20motivation%2C%20clean%20studio%20lighting&width=32&height=32&seq=15&orientation=squarish', name: '王芳', location: '开封市', phone: '137****5544', level: '白银会员' },
    { id: 'USER012', dailySteps: 9850, totalSteps: 78540, rank: 4, lastUpdate: '2024-02-15 16:10', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20runner%20in%20athletic%20clothing%2C%20confident%20pose%2C%20minimalist%20background&width=32&height=32&seq=16&orientation=squarish', name: '刘强', location: '安阳市', phone: '135****3322', level: '青铜会员' },
    { id: 'USER005', dailySteps: 9320, totalSteps: 72180, rank: 5, lastUpdate: '2024-02-15 15:55', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20fitness%20coach%20with%20positive%20attitude%2C%20healthy%20lifestyle%20representation&width=32&height=32&seq=17&orientation=squarish', name: '陈敏', location: '南阳市', phone: '133****1100', level: '青铜会员' },
    { id: 'USER018', dailySteps: 8750, totalSteps: 65200, rank: 6, lastUpdate: '2024-02-15 14:30', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20wellness%20enthusiast%2C%20active%20lifestyle%2C%20bright%20clean%20background&width=32&height=32&seq=18&orientation=squarish', name: '赵鹏', location: '新乡市', phone: '158****9988', level: '青铜会员' },
    { id: 'USER024', dailySteps: 8200, totalSteps: 59800, rank: 7, lastUpdate: '2024-02-15 20:15', avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20health-conscious%20individual%2C%20exercise%20motivation%2C%20modern%20photography&width=32&height=32&seq=19&orientation=squarish', name: '孙丽', location: '焦作市', phone: '156****7766', level: '青铜会员' }
  ];

  const pointsData = [
    { id: 'USER001', totalPoints: 2580, level: '黄金会员', weeklyPoints: 420, monthlyPoints: 1650, avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20athletic%20person%20with%20fitness%20tracker%2C%20healthy%20lifestyle%2C%20clean%20background%2C%20modern%20sports%20photography&width=32&height=32&seq=13&orientation=squarish', name: '张明', location: '郑州市' },
    { id: 'USER003', totalPoints: 1920, level: '白银会员', weeklyPoints: 380, monthlyPoints: 1280, avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20young%20fitness%20enthusiast%20wearing%20athletic%20wear%2C%20determined%20expression%2C%20simple%20background&width=32&height=32&seq=14&orientation=squarish', name: '李华', location: '洛阳市' },
    { id: 'USER007', totalPoints: 1650, level: '白银会员', weeklyPoints: 290, monthlyPoints: 1050, avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20active%20person%20with%20sports%20equipment%2C%20fitness%20motivation%2C%20clean%20studio%20lighting&width=32&height=32&seq=15&orientation=squarish', name: '王芳', location: '开封市' },
    { id: 'USER012', totalPoints: 1380, level: '青铜会员', weeklyPoints: 260, monthlyPoints: 890, avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20runner%20in%20athletic%20clothing%2C%20confident%20pose%2C%20minimalist%20background&width=32&height=32&seq=16&orientation=squarish', name: '刘强', location: '安阳市' },
    { id: 'USER005', totalPoints: 1120, level: '青铜会员', weeklyPoints: 210, monthlyPoints: 720, avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20fitness%20coach%20with%20positive%20attitude%2C%20healthy%20lifestyle%20representation&width=32&height=32&seq=17&orientation=squarish', name: '陈敏', location: '南阳市' }
  ];

  const levelStats = [
    { level: '钻石会员', count: 5, percentage: 2.1, color: 'bg-purple-500' },
    { level: '黄金会员', count: 23, percentage: 9.6, color: 'bg-yellow-500' },
    { level: '白银会员', count: 67, percentage: 28.0, color: 'bg-gray-400' },
    { level: '青铜会员', count: 145, percentage: 60.3, color: 'bg-orange-600' }
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-blue-100 text-blue-800';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '钻石会员': return 'text-purple-600 bg-purple-100';
      case '黄金会员': return 'text-yellow-600 bg-yellow-100';
      case '白银会员': return 'text-gray-600 bg-gray-100';
      case '青铜会员': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleShowPointsSettings = () => {
    setShowPointsSettings(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">健步走活动管理</h1>
        <div className="flex items-center space-x-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            导出数据
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap"
            onClick={handleShowPointsSettings}
          >
            <i className="ri-settings-line mr-2"></i>
            积分设置
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">今日总步数</p>
              <p className="text-2xl font-bold text-gray-900">2,580,420</p>
              <p className="text-green-600 text-sm mt-1">↗ +12.5%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-walk-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">活跃用户</p>
              <p className="text-2xl font-bold text-gray-900">1,847</p>
              <p className="text-green-600 text-sm mt-1">↗ +8.2%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-heart-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">累计积分</p>
              <p className="text-2xl font-bold text-gray-900">485,260</p>
              <p className="text-blue-600 text-sm mt-1">本周发放</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-coin-line text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">平均步数</p>
              <p className="text-2xl font-bold text-gray-900">8,926</p>
              <p className="text-gray-600 text-sm mt-1">每人每日</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-bar-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'steps' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('steps')}
            >
              步数展示
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'points' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('points')}
            >
              积分管理
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'rules' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('rules')}
            >
              奖励规则
            </button>
          </nav>
        </div>

        {activeTab === 'steps' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value)}
                >
                  <option value="">全部用户</option>
                  <option value="钻石会员">钻石会员</option>
                  <option value="黄金会员">黄金会员</option>
                  <option value="白银会员">白银会员</option>
                  <option value="青铜会员">青铜会员</option>
                </select>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索用户ID..."
                    className="w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                  <i className="ri-sort-desc mr-1"></i>
                  按步数排序
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">排名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">头像</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户信息</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">今日步数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">总步数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">最后更新</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stepData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full ${getRankBadge(user.rank)}`}>
                          {user.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.id} • {user.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{user.dailySteps.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.totalSteps.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.lastUpdate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded"
                            onClick={() => handleViewUser(user)}
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded">
                            <i className="ri-gift-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                显示第 1-7 条，共 1,847 条记录
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  上一页
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  下一页
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'points' && (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">头像</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">总积分</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">等级</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">本周积分</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">本月积分</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pointsData.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-gray-900">{user.totalPoints}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(user.level)}`}>
                              {user.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">+{user.weeklyPoints}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">+{user.monthlyPoints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">积分等级统计</h3>
                <div className="space-y-4">
                  {levelStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                        <span className="text-sm text-gray-700">{stat.level}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">{stat.count}人</div>
                        <div className="text-xs text-gray-500">{stat.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">积分奖励规则设置</h3>
                <p className="text-blue-700 text-sm">配置用户完成健步走活动后获得的积分奖励，规则实时生效</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">基础积分规则</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">每1000步</div>
                        <div className="text-sm text-gray-600">基础步数奖励</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="10" className="w-16 text-center" />
                        <span className="text-sm text-gray-600">积分</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">连续7天</div>
                        <div className="text-sm text-gray-600">连续参与奖励</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="100" className="w-16 text-center" />
                        <span className="text-sm text-gray-600">积分</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">单日10000步</div>
                        <div className="text-sm text-gray-600">目标达成奖励</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="50" className="w-16 text-center" />
                        <span className="text-sm text-gray-600">积分</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">等级晋升奖励</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">晋升青铜会员</div>
                        <div className="text-sm text-gray-600">累计积分 ≥ 500</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="200" className="w-16 text-center" />
                        <span className="text-sm text-gray-600">积分</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">晋升白银会员</div>
                        <div className="text-sm text-gray-600">累计积分 ≥ 1500</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="500" className="w-16 text-center" />
                        <span className="text-sm text-gray-600">积分</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">晋升黄金会员</div>
                        <div className="text-sm text-gray-600">累计积分 ≥ 3000</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="1000" className="w-16 text-center" />
                        <span className="text-sm text-gray-600">积分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowPointsSettings(false)}>
                  取消
                </Button>
                <Button>
                  保存设置
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 用户详情弹窗 */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>用户详细信息</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img src={selectedUser.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.id}</p>
                  <p className="text-sm text-gray-500">{selectedUser.location}</p>
                </div>
                <div className="ml-auto">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getLevelColor(selectedUser.level)}`}>
                    {selectedUser.level}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">运动数据</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">今日步数</span>
                      <span className="font-semibold">{selectedUser.dailySteps.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">累计步数</span>
                      <span className="font-semibold">{selectedUser.totalSteps.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">当前排名</span>
                      <span className="font-semibold">第 {selectedUser.rank} 名</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最后更新</span>
                      <span className="text-sm text-gray-500">{selectedUser.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">联系信息</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">手机号码</span>
                      <span className="font-semibold">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">所在地区</span>
                      <span className="font-semibold">{selectedUser.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">会员等级</span>
                      <span className="font-semibold">{selectedUser.level}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">近7天步数趋势</h4>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">步数趋势图表</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 积分设置弹窗 */}
      <Dialog open={showPointsSettings} onOpenChange={setShowPointsSettings}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>积分奖励规则设置</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">积分奖励规则设置</h3>
              <p className="text-blue-700 text-sm">配置用户完成健步走活动后获得的积分奖励，规则实时生效</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">基础积分规则</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">每1000步</div>
                      <div className="text-sm text-gray-600">基础步数奖励</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue="10" className="w-16 text-center" />
                      <span className="text-sm text-gray-600">积分</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">连续7天</div>
                      <div className="text-sm text-gray-600">连续参与奖励</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue="100" className="w-16 text-center" />
                      <span className="text-sm text-gray-600">积分</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">单日10000步</div>
                      <div className="text-sm text-gray-600">目标达成奖励</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue="50" className="w-16 text-center" />
                      <span className="text-sm text-gray-600">积分</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">等级晋升奖励</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">晋升青铜会员</div>
                      <div className="text-sm text-gray-600">累计积分 ≥ 500</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue="200" className="w-16 text-center" />
                      <span className="text-sm text-gray-600">积分</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">晋升白银会员</div>
                      <div className="text-sm text-gray-600">累计积分 ≥ 1500</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue="500" className="w-16 text-center" />
                      <span className="text-sm text-gray-600">积分</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">晋升黄金会员</div>
                      <div className="text-sm text-gray-600">累计积分 ≥ 3000</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input type="number" defaultValue="1000" className="w-16 text-center" />
                      <span className="text-sm text-gray-600">积分</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setShowPointsSettings(false)}>
                取消
              </Button>
              <Button>
                保存设置
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
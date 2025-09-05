
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Eye, Trash2, Plus, MapPin, Navigation, Clock, Award } from 'lucide-react';

interface VirtualRoute {
  id: number;
  name: string;
  startPoint: string;
  endPoint: string;
  waypoints: string[];
  distance: number;
  difficulty: string;
  estimatedTime: string;
  points: number;
  description: string;
  participants: number;
  completions: number;
  status: string;
  createdAt: string;
}

export default function VirtualRoute() {
  const [currentView, setCurrentView] = useState('list');
  const [editingRoute, setEditingRoute] = useState<VirtualRoute | null>(null);
  const [viewingRoute, setViewingRoute] = useState<VirtualRoute | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // 表单数据状态
  const [formData, setFormData] = useState({
    name: '',
    startPoint: '',
    endPoint: '',
    waypoints: '',
    distance: '',
    difficulty: '',
    estimatedTime: '',
    points: '',
    description: ''
  });

  const [routes] = useState<VirtualRoute[]>([
    {
      id: 1,
      name: '黄河风景名胜区环线',
      startPoint: '炎黄二帝巨塑',
      endPoint: '黄河博物馆',
      waypoints: ['黄河大堤', '五龙峰', '岳山寺', '星海湖'],
      distance: 8.5,
      difficulty: '简单',
      estimatedTime: '45分钟',
      points: 50,
      description: '沿着黄河母亲河漫步，欣赏中华文明发源地的壮美景色，体验河南的历史文化底蕴。',
      participants: 1250,
      completions: 980,
      status: '活跃',
      createdAt: '2024-03-10'
    },
    {
      id: 2,
      name: '龙门石窟文化探索路线',
      startPoint: '龙门石窟景区入口',
      endPoint: '白园',
      waypoints: ['西山石窟', '奉先寺', '东山石窟', '香山寺'],
      distance: 6.2,
      difficulty: '中等',
      estimatedTime: '55分钟',
      points: 80,
      description: '探索千年石窟艺术宝库，感受佛教文化的博大精深，领略洛阳古都风韵。',
      participants: 890,
      completions: 645,
      status: '活跃',
      createdAt: '2024-03-08'
    },
    {
      id: 3,
      name: '嵩山少林文化体验路线',
      startPoint: '少林寺山门',
      endPoint: '达摩洞',
      waypoints: ['天王殿', '大雄宝殿', '藏经阁', '塔林'],
      distance: 4.8,
      difficulty: '简单',
      estimatedTime: '35分钟',
      points: 60,
      description: '走进禅宗祖庭少林寺，体验千年武术文化，感受嵩山的雄伟壮观。',
      participants: 1456,
      completions: 1298,
      status: '活跃',
      createdAt: '2024-03-05'
    },
    {
      id: 4,
      name: '开封古城墙环线',
      startPoint: '大梁门',
      endPoint: '龙亭公园',
      waypoints: ['包公祠', '清明上河园', '铁塔公园', '天波杨府'],
      distance: 12.3,
      difficulty: '中等',
      estimatedTime: '1小时30分钟',
      points: 120,
      description: '漫步千年古都开封，追寻北宋繁华盛景，体验八朝古都的历史文化魅力。',
      participants: 756,
      completions: 589,
      status: '活跃',
      createdAt: '2024-03-03'
    }
  ]);

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || !selectedDifficulty || route.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleCreateRoute = () => {
    setEditingRoute(null);
    setFormData({
      name: '',
      startPoint: '',
      endPoint: '',
      waypoints: '',
      distance: '',
      difficulty: '',
      estimatedTime: '',
      points: '',
      description: ''
    });
    setCurrentView('form');
  };

  const handleEditRoute = (route: VirtualRoute) => {
    setEditingRoute(route);
    setFormData({
      name: route.name,
      startPoint: route.startPoint,
      endPoint: route.endPoint,
      waypoints: route.waypoints.join('\n'),
      distance: route.distance.toString(),
      difficulty: route.difficulty,
      estimatedTime: route.estimatedTime,
      points: route.points.toString(),
      description: route.description
    });
    setCurrentView('form');
  };

  const handleViewRoute = (route: VirtualRoute) => {
    setViewingRoute(route);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingRoute(null);
  };

  const handlePreviewRoute = () => {
    const waypointsList = formData.waypoints
      .split('\n')
      .filter(point => point.trim() !== '')
      .map(point => point.trim());

    const routeData = {
      name: formData.name || '新建路线',
      startPoint: formData.startPoint || '起点位置',
      endPoint: formData.endPoint || '终点位置',
      waypoints: waypointsList,
      distance: formData.distance || '0',
      difficulty: formData.difficulty || '未设置',
      estimatedTime: formData.estimatedTime || '未设置',
      points: formData.points || '0',
      description: formData.description || '暂无描述'
    };

    setShowPreview(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单': return 'bg-green-100 text-green-800';
      case '中等': return 'bg-yellow-100 text-yellow-800';
      case '困难': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderPreviewDialog = () => {
    const waypointsList = formData.waypoints
      .split('\n')
      .filter(point => point.trim() !== '')
      .map(point => point.trim());

    const routeData = {
      name: formData.name || '新建路线',
      startPoint: formData.startPoint || '起点位置',
      endPoint: formData.endPoint || '终点位置',
      waypoints: waypointsList,
      distance: formData.distance || '0',
      difficulty: formData.difficulty || '未设置',
      estimatedTime: formData.estimatedTime || '未设置',
      points: formData.points || '0',
      description: formData.description || '暂无描述'
    };

    return (
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              路线预览 - {routeData.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-blue-900">{routeData.name}</h3>
                <Badge className="bg-blue-500 text-white">虚拟路线</Badge>
              </div>
              <div className="text-blue-700 text-sm space-x-4">
                <span>⏱️ 预计用时：{routeData.estimatedTime}</span>
                <span>🏃 难度等级：{routeData.difficulty}</span>
                <span>📏 总距离：{routeData.distance} km</span>
                <span>⭐ 完成奖励：{routeData.points} 积分</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      路线信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">起点：</span>
                      <span className="font-medium">{routeData.startPoint}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">终点：</span>
                      <span className="font-medium">{routeData.endPoint}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">距离：</span>
                      <span className="font-medium">{routeData.distance} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-gray-600">预计用时：</span>
                      <span className="font-medium">{routeData.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-gray-600">奖励积分：</span>
                      <span className="font-medium">{routeData.points} 分</span>
                    </div>
                  </CardContent>
                </Card>

                {routeData.waypoints.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">🚩 途经点列表</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {routeData.waypoints.map((waypoint, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span>{waypoint}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🗺️ 路线地图预览</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-medium">地图轨迹预览</p>
                        <p className="text-sm">实际使用中集成高德地图API</p>
                        <p className="text-sm">显示完整路线轨迹和途经点</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">📖 路线描述</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {routeData.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-green-900 font-medium mb-2">✅ 预览完成</h4>
              <p className="text-green-700 text-sm">
                路线信息已预览完成，确认无误后可保存并发布此虚拟路线。用户完成此路线后将获得 <strong>{routeData.points} 积分</strong> 奖励。
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderRoutesList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">虚拟路线管理</h2>
        <Button onClick={handleCreateRoute} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          创建新路线
        </Button>
      </div>

      <Card className="bg-white">
        <CardHeader className="bg-white">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="搜索路线名称或描述..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择难度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部难度</SelectItem>
                <SelectItem value="简单">简单</SelectItem>
                <SelectItem value="中等">中等</SelectItem>
                <SelectItem value="困难">困难</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="bg-white p-0">
          <div className="border rounded-lg overflow-hidden bg-white">
            <div className="overflow-x-auto" style={{ maxWidth: 'calc(100vw - 280px)' }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">路线名称</TableHead>
                    <TableHead className="min-w-[120px]">起点</TableHead>
                    <TableHead className="min-w-[120px]">终点</TableHead>
                    <TableHead className="min-w-[100px]">距离(km)</TableHead>
                    <TableHead className="min-w-[80px]">难度</TableHead>
                    <TableHead className="min-w-[100px]">预计时间</TableHead>
                    <TableHead className="min-w-[80px]">积分</TableHead>
                    <TableHead className="min-w-[80px]">参与人数</TableHead>
                    <TableHead className="min-w-[80px]">完成人数</TableHead>
                    <TableHead className="min-w-[80px]">状态</TableHead>
                    <TableHead className="min-w-[150px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.startPoint}</TableCell>
                      <TableCell>{route.endPoint}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>
                        <Badge className={getDifficultyColor(route.difficulty)}>
                          {route.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>{route.estimatedTime}</TableCell>
                      <TableCell>{route.points}</TableCell>
                      <TableCell>{route.participants}</TableCell>
                      <TableCell>{route.completions}</TableCell>
                      <TableCell>
                        <Badge variant={route.status === '活跃' ? 'default' : 'secondary'}>
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewRoute(route)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRoute(route)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRouteForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleBackToList}>
          ← 返回列表
        </Button>
        <h2 className="text-2xl font-semibold">
          {editingRoute ? '编辑路线' : '创建新路线'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">路线名称</label>
              <Input
                placeholder="请输入路线名称"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">起点</label>
                <Input
                  placeholder="输入起点位置"
                  value={formData.startPoint}
                  onChange={(e) => setFormData({...formData, startPoint: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">终点</label>
                <Input
                  placeholder="输入终点位置"
                  value={formData.endPoint}
                  onChange={(e) => setFormData({...formData, endPoint: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">途经点</label>
              <Textarea
                placeholder="输入途经的关键位置，每行一个地点&#10;例如：&#10;包公祠&#10;清明上河园&#11;铁塔公园"
                rows={4}
                value={formData.waypoints}
                onChange={(e) => setFormData({...formData, waypoints: e.target.value})}
              />
              <p className="text-sm text-gray-500 mt-1">
                每行输入一个途经地点，系统将自动规划最优路线
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">路线描述</label>
              <Textarea
                placeholder="描述这条路线的特色和亮点..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              路线设置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">预计距离(km)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.distance}
                  onChange={(e) => setFormData({...formData, distance: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">难度等级</label>
                <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="简单">简单</SelectItem>
                    <SelectItem value="中等">中等</SelectItem>
                    <SelectItem value="困难">困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">预计用时</label>
                <Input
                  placeholder="如：45分钟"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">完成奖励积分</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                地图路线生成
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                系统将根据您输入的起点、终点和途经点，自动使用高德地图API生成最优路线轨迹。
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handlePreviewRoute}
              >
                <Navigation className="w-4 h-4 mr-2" />
                预览路线轨迹
              </Button>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline">保存草稿</Button>
              <Button>发布路线</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen -m-6 p-6">
      {currentView === 'form' ? (
        <>
          {renderRouteForm()}
          {renderPreviewDialog()}
        </>
      ) : (
        <>
          {renderRoutesList()}
          
          {viewingRoute && (
            <Dialog open={!!viewingRoute} onOpenChange={() => setViewingRoute(null)}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Navigation className="w-5 h-5" />
                    {viewingRoute.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">路线信息</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">起点：</span>
                          <span className="font-medium">{viewingRoute.startPoint}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-600">终点：</span>
                          <span className="font-medium">{viewingRoute.endPoint}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">距离：</span>
                          <span className="font-medium">{viewingRoute.distance} km</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-gray-600">预计用时：</span>
                          <span className="font-medium">{viewingRoute.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">奖励积分：</span>
                          <span className="font-medium">{viewingRoute.points} 分</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">途经点</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {viewingRoute.waypoints.map((waypoint, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                              <span>{waypoint}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">统计数据</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">参与人数</span>
                          <span className="font-medium text-blue-600">{viewingRoute.participants}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">完成人数</span>
                          <span className="font-medium text-green-600">{viewingRoute.completions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">完成率</span>
                          <span className="font-medium text-orange-600">
                            {((viewingRoute.completions / viewingRoute.participants) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">难度等级</span>
                          <Badge className={getDifficultyColor(viewingRoute.difficulty)}>
                            {viewingRoute.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">状态</span>
                          <Badge variant={viewingRoute.status === '活跃' ? 'default' : 'secondary'}>
                            {viewingRoute.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">路线描述</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {viewingRoute.description}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">路线地图</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <MapPin className="w-12 h-12 mx-auto mb-2" />
                            <p>地图预览</p>
                            <p className="text-sm">集成高德地图显示路线轨迹</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
}


'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function VideoActivity() {
  const [activeTab, setActiveTab] = useState('publish');
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);

  const videoSubmissions = [
    {
      id: 1,
      title: '晨跑记录 - 郑州绿博园环湖路线',
      author: 'USER001',
      submitTime: '2024-02-15 09:30',
      duration: '03:25',
      status: '待审核',
      likes: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=morning%20jogging%20around%20Zhengzhou%20Green%20Expo%20Park%20lake%2C%20beautiful%20park%20scenery%20with%20runner%20in%20athletic%20wear%2C%20sunrise%20lighting%2C%20peaceful%20atmosphere&width=120&height=80&seq=20&orientation=landscape',
    },
    {
      id: 2,
      title: '团队健身操 - 活力中原',
      author: 'USER007',
      submitTime: '2024-02-14 16:45',
      duration: '05:12',
      status: '已通过',
      likes: 156,
      thumbnail: 'https://readdy.ai/api/search-image?query=group%20fitness%20aerobics%20class%20with%20young%20people%20exercising%20together%20in%20Henan%20cultural%20center%2C%20energetic%20atmosphere%2C%20traditional%20Chinese%20elements&width=120&height=80&seq=21&orientation=landscape',
    },
    {
      id: 3,
      title: '篮球训练集锦 - 洛阳体育中心',
      author: 'USER012',
      submitTime: '2024-02-14 11:20',
      duration: '04:18',
      status: '已发布',
      likes: 234,
      thumbnail: 'https://readdy.ai/api/search-image?query=basketball%20training%20highlights%20with%20players%20practicing%20on%20Luoyang%20sports%20center%20court%2C%20dynamic%20sports%20action%20shots%2C%20competitive%20atmosphere&width=120&height=80&seq=22&orientation=landscape',
    },
    {
      id: 4,
      title: '太极晨练 - 开封龙亭公园',
      author: 'USER024',
      submitTime: '2024-02-13 19:15',
      duration: '08:30',
      status: '已通过',
      likes: 89,
      thumbnail: 'https://readdy.ai/api/search-image?query=peaceful%20Tai%20Chi%20morning%20exercise%20session%20in%20Kaifeng%20Longteng%20Park%2C%20elderly%20people%20practicing%2C%20calm%20and%20tranquil%20atmosphere%2C%20traditional%20Chinese%20culture&width=120&height=80&seq=23&orientation=landscape',
    },
    {
      id: 5,
      title: '游泳技巧教学 - 安阳奥体中心',
      author: 'USER035',
      submitTime: '2024-02-13 14:20',
      duration: '06:45',
      status: '需修改',
      likes: 0,
      thumbnail: 'https://readdy.ai/api/search-image?query=swimming%20technique%20demonstration%20in%20clear%20pool%20water%20at%20Anyang%20Olympic%20Sports%20Center%2C%20professional%20swimmer%20showing%20proper%20form%2C%20aquatic%20sports%20instruction&width=120&height=80&seq=24&orientation=landscape',
    }
  ];

  const contestResults = [
    {
      rank: 1,
      title: '团队健身操 - 活力中原',
      author: 'USER007',
      likes: 1520,
      award: '一等奖',
      prize: '奖金5000元 + 荣誉证书'
    },
    {
      rank: 2,
      title: '篮球训练集锦 - 洛阳体育中心',
      author: 'USER012',
      likes: 1342,
      award: '二等奖',
      prize: '奖金3000元 + 荣誉证书'
    },
    {
      rank: 3,
      title: '晨跑记录 - 郑州绿博园环湖路线',
      author: 'USER003',
      likes: 998,
      award: '三等奖',
      prize: '奖金1000元 + 荣誉证书'
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case '已发布': return 'default';
      case '已通过': return 'secondary';
      case '待审核': return 'outline';
      case '需修改': return 'destructive';
      default: return 'outline';
    }
  };

  const handleSelectVideo = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedVideos([...selectedVideos, id]);
    } else {
      setSelectedVideos(selectedVideos.filter(videoId => videoId !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">视频展示活动管理</h1>
        <div className="flex items-center space-x-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            导出统计
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            发布新活动
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">投稿期视频</p>
              <p className="text-2xl font-bold text-gray-900">128</p>
              <p className="text-blue-600 text-sm mt-1">截止3天后</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-upload-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">评比期视频</p>
              <p className="text-2xl font-bold text-gray-900">85</p>
              <p className="text-green-600 text-sm mt-1">正在评选中</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-award-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">公示期视频</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-yellow-600 text-sm mt-1">待公示结果</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-trophy-line text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">总点赞数</p>
              <p className="text-2xl font-bold text-gray-900">15,420</p>
              <p className="text-purple-600 text-sm mt-1">实时统计</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-heart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'publish' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('publish')}
            >
              发布活动
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'videos' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              视频管理
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'results' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('results')}
            >
              比赛结果
            </button>
          </nav>
        </div>

        {activeTab === 'publish' && (
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">活动发布设置</h3>
              <p className="text-blue-700 text-sm">创建新的视频征集活动，设置投稿期、评比期、公示期等关键时间节点</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">活动标题</label>
                  <Input
                    type="text"
                    placeholder="输入活动标题"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">活动描述</label>
                  <Textarea
                    rows={4}
                    placeholder="详细描述活动内容、参与方式、奖励机制等"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">参与规则</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="rule1" />
                      <label htmlFor="rule1" className="text-sm text-gray-700">视频时长限制：30秒-5分钟</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="rule2" />
                      <label htmlFor="rule2" className="text-sm text-gray-700">必须为原创内容</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="rule3" />
                      <label htmlFor="rule3" className="text-sm text-gray-700">健康运动主题相关</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">关键时间节点设置</h4>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      投稿期
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">开始时间</label>
                        <Input type="datetime-local" className="text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">结束时间</label>
                        <Input type="datetime-local" className="text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      评比期
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">开始时间</label>
                        <Input type="datetime-local" className="text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">结束时间</label>
                        <Input type="datetime-local" className="text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      公示期
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">开始时间</label>
                        <Input type="datetime-local" className="text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">结束时间</label>
                        <Input type="datetime-local" className="text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <Button variant="outline">
                保存草稿
              </Button>
              <Button>
                发布活动
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="全部状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待审核</SelectItem>
                    <SelectItem value="approved">已通过</SelectItem>
                    <SelectItem value="published">已发布</SelectItem>
                    <SelectItem value="rejected">需修改</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="搜索视频标题或作者..."
                    className="w-64 pl-10"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" className="text-sm">
                  批量发布
                </Button>
                <Button variant="outline" size="sm" className="text-sm text-red-600 border-red-300 hover:bg-red-50">
                  批量删除
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {videoSubmissions.map((video) => (
                <div key={video.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedVideos.includes(video.id)}
                      onCheckedChange={(checked) => handleSelectVideo(video.id, checked as boolean)}
                    />
                    
                    <div className="relative">
                      <img src={video.thumbnail} alt="" className="w-32 h-20 object-cover rounded-lg" />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{video.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>作者: {video.author}</span>
                        <span>提交: {video.submitTime}</span>
                        <span className="flex items-center">
                          <i className="ri-heart-line mr-1"></i>
                          {video.likes}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusVariant(video.status)}>
                        {video.status}
                      </Badge>
                      
                      <div className="flex items-center space-x-1">
                        <button className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded">
                          <i className="ri-play-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded">
                          <i className="ri-check-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-yellow-600 hover:bg-yellow-50 rounded">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">比赛结果管理</h3>
              <p className="text-yellow-700 text-sm">编辑获奖名单和奖励公告，发布结果到小程序端</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg mb-6">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-semibold">获奖名单</h4>
              </div>
              <div className="divide-y">
                {contestResults.map((result) => (
                  <div key={result.rank} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        result.rank === 1 ? 'bg-yellow-500' : 
                        result.rank === 2 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {result.rank}
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900">{result.title}</h5>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>作者: {result.author}</span>
                          <span className="flex items-center">
                            <i className="ri-heart-fill mr-1 text-red-500"></i>
                            {result.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{result.award}</div>
                      <div className="text-sm text-gray-600">{result.prize}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-semibold">结果公告编辑</h4>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公告标题</label>
                  <Input
                    type="text"
                    placeholder="输入公告标题"
                    defaultValue="河南省第一届线上运动会视频征集活动获奖名单公示"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">公告内容</label>
                  <Textarea
                    rows={8}
                    placeholder="输入公告内容"
                    defaultValue="经过激烈的投票评选，河南省第一届线上运动会视频征集活动圆满结束。本次活动共收到优质投稿128件，经过专业评委和大众投票的综合评选，最终确定获奖名单如下：

一等奖：团队健身操 - 活力中原 (作者：USER007)
奖励：奖金5000元 + 荣誉证书

二等奖：篮球训练集锦 - 洛阳体育中心 (作者：USER012)  
奖励：奖金3000元 + 荣誉证书

三等奖：晨跑记录 - 郑州绿博园环湖路线 (作者：USER003)
奖励：奖金1000元 + 荣誉证书

感谢所有参与者的积极投稿，期待下次活动再见！"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify" />
                      <label htmlFor="notify" className="text-sm text-gray-700">同时发送推送通知</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="stick" />
                      <label htmlFor="stick" className="text-sm text-gray-700">置顶公告</label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button variant="outline">
                      保存草稿
                    </Button>
                    <Button>
                      发布公告
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

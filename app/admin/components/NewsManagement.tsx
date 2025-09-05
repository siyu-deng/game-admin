
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Eye, Trash2, Plus, Search } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  status: string;
  views: number;
  content: string;
}

interface Category {
  id: number;
  name: string;
  count: number;
}

export default function NewsManagement() {
  const [currentView, setCurrentView] = useState('list');
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previewNews, setPreviewNews] = useState<NewsItem | null>(null);
  const [previewWindow, setPreviewWindow] = useState<Window | null>(null);

  const [newsList] = useState<NewsItem[]>([
    {
      id: 1,
      title: '2024年春季运动会正式启动',
      category: '运动会公告',
      author: '管理员',
      publishDate: '2024-03-15',
      status: '已发布',
      views: 1245,
      content: '<h2>2024年春季运动会正式启动</h2><p>为了促进全民健身运动的开展，增强市民身体素质，我们将于4月举办2024年春季运动会。</p><h3>活动详情</h3><ul><li>时间：2024年4月15日-17日</li><li>地点：市体育中心</li><li>参与方式：个人报名或团体报名</li></ul><p>欢迎广大市民积极参与！</p>'
    },
    {
      id: 2,
      title: '马拉松比赛报名开始',
      category: '赛事通知',
      author: '赛事组委会',
      publishDate: '2024-03-14',
      status: '已发布',
      views: 892,
      content: '<h2>马拉松比赛报名开始</h2><p>2024年城市马拉松比赛即将开始报名，欢迎各位跑步爱好者积极参与。</p><h3>比赛信息</h3><ul><li>全程马拉松：42.195公里</li><li>半程马拉松：21.0975公里</li><li>迷你马拉松：5公里</li></ul><p>报名截止时间：2024年4月1日</p>'
    },
    {
      id: 3,
      title: '健身房新设备介绍',
      category: '设施更新',
      author: '设施管理部',
      publishDate: '2024-03-13',
      status: '草稿',
      views: 456,
      content: '<h2>健身房新设备介绍</h2><p>我们最近为健身房引进了一批先进的健身设备，为大家提供更好的锻炼体验。</p><h3>新设备清单</h3><ul><li>智能跑步机 x 10台</li><li>多功能力量训练器 x 5台</li><li>椭圆机 x 8台</li></ul><p>欢迎大家前来体验！</p>'
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: 1, name: '运动会公告', count: 5 },
    { id: 2, name: '赛事通知', count: 8 },
    { id: 3, name: '设施更新', count: 3 },
    { id: 4, name: '健康资讯', count: 12 }
  ]);

  const filteredNews = newsList.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateNews = () => {
    setEditingNews(null);
    setCurrentView('form');
  };

  const handleEditNews = (news: NewsItem) => {
    setEditingNews(news);
    setCurrentView('form');
  };

  const handleViewNews = (news: NewsItem) => {
    // 在新窗口中打开预览
    const previewContent = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>预览 - ${news.title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #f8fafc;
          }
          .preview-container {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .preview-header {
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }
          .preview-title {
            font-size: 2rem;
            font-weight: bold;
            color: #1e293b;
            margin: 0 0 1rem 0;
          }
          .preview-meta {
            display: flex;
            gap: 2rem;
            color: #64748b;
            font-size: 0.9rem;
          }
          .preview-content {
            color: #374151;
            font-size: 1rem;
          }
          .preview-content h1, .preview-content h2, .preview-content h3 {
            color: #1e293b;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .preview-content ul, .preview-content ol {
            padding-left: 2rem;
          }
          .preview-content li {
            margin-bottom: 0.5rem;
          }
          .close-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          }
          .close-btn:hover {
            background: #dc2626;
          }
        </style>
      </head>
      <body>
        <button class="close-btn" onclick="window.close()">关闭</button>
        <div class="preview-container">
          <div class="preview-header">
            <h1 class="preview-title">${news.title}</h1>
            <div class="preview-meta">
              <span>分类：${news.category}</span>
              <span>作者：${news.author}</span>
              <span>发布时间：${news.publishDate}</span>
              <span>状态：${news.status}</span>
              <span>浏览量：${news.views}</span>
            </div>
          </div>
          <div class="preview-content">
            ${news.content}
          </div>
        </div>
      </body>
      </html>
    `;

    const newWindow = window.open('', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
    if (newWindow) {
      newWindow.document.write(previewContent);
      newWindow.document.close();
      setPreviewWindow(newWindow);
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingNews(null);
  };

  const renderNewsList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">资讯管理</h2>
        <Button onClick={handleCreateNews} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          发布新资讯
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索资讯标题或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">标题</TableHead>
                    <TableHead className="min-w-[120px]">分类</TableHead>
                    <TableHead className="min-w-[100px]">作者</TableHead>
                    <TableHead className="min-w-[120px]">发布时间</TableHead>
                    <TableHead className="min-w-[80px]">状态</TableHead>
                    <TableHead className="min-w-[80px]">浏览量</TableHead>
                    <TableHead className="min-w-[150px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((news) => (
                    <TableRow key={news.id}>
                      <TableCell className="font-medium">{news.title}</TableCell>
                      <TableCell>{news.category}</TableCell>
                      <TableCell>{news.author}</TableCell>
                      <TableCell>{news.publishDate}</TableCell>
                      <TableCell>
                        <Badge variant={news.status === '已发布' ? 'default' : 'secondary'}>
                          {news.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{news.views}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewNews(news)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNews(news)}
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

  const renderNewsForm = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleBackToList}>
          ← 返回列表
        </Button>
        <h2 className="text-2xl font-semibold">
          {editingNews ? '编辑资讯' : '发布新资讯'}
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>资讯信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">资讯标题</label>
              <Input
                placeholder="请输入资讯标题"
                defaultValue={editingNews?.title}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">分类</label>
              <Select defaultValue={editingNews?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">资讯内容</label>
            <Textarea
              placeholder="请输入资讯内容..."
              rows={12}
              defaultValue={editingNews?.content?.replace(/<[^>]*>/g, '')}
            />
            <p className="text-sm text-gray-500 mt-1">
              支持富文本格式，可以使用HTML标签
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">保存为草稿</Button>
            <Button>立即发布</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCategoryManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">分类管理</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          添加分类
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>分类名称</TableHead>
                <TableHead>资讯数量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.count}</TableCell>
                  <TableCell>2024-03-01</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
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
        </CardContent>
      </Card>
    </div>
  );

  if (currentView === 'form') {
    return renderNewsForm();
  }

  if (currentView === 'categories') {
    return renderCategoryManagement();
  }

  return renderNewsList();
}
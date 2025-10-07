'use client';

import React, { useState, useMemo } from 'react';
import { Sidebar } from '@/src/temp/Sidebar';
import {
  Search,
  Bell,
  CheckCheck,
  Archive,
  Trash2,
  Filter,
  FileCheck,
  AlertCircle,
  CreditCard,
  Clock,
  Pin,
  X,
  ChevronRight,
} from 'lucide-react';

// Mock data
const mockNotifications = [
  {
    id: '1',
    type: 'success',
    category: 'translation',
    title: 'Document translation completed',
    description:
      'Business_Proposal_2024.docx has been successfully translated from English to Vietnamese.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    isPinned: true,
    metadata: {
      fileName: 'Business_Proposal_2024.docx',
      wordsTranslated: 2847,
      creditsUsed: 28,
    },
  },
  {
    id: '2',
    type: 'info',
    category: 'system',
    title: 'System maintenance scheduled',
    description:
      "We'll be performing scheduled maintenance this Sunday from 2-4 AM EST.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    isPinned: false,
  },
  {
    id: '3',
    type: 'warning',
    category: 'billing',
    title: 'Credits running low',
    description:
      'You have 45 translation credits remaining. Upgrade your plan to continue.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    isPinned: false,
    metadata: {
      creditsRemaining: 45,
      totalCredits: 100,
    },
  },
  {
    id: '4',
    type: 'error',
    category: 'translation',
    title: 'Translation failed',
    description:
      'Unable to process technical_manual.pdf due to unsupported formatting.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: false,
    isPinned: false,
  },
  {
    id: '5',
    type: 'success',
    category: 'translation',
    title: 'Subtitle translation ready',
    description: 'Movie_subtitles.srt has been translated to 5 languages.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isRead: true,
    isPinned: false,
  },
  {
    id: '6',
    type: 'success',
    category: 'billing',
    title: 'Payment successful',
    description: '500 new credits have been added to your account.',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    isRead: true,
    isPinned: false,
  },
];

export default function NotificationsInterface() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const formatTimestamp = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  };

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    if (activeFilter === 'unread') {
      filtered = filtered.filter((n) => !n.isRead);
    } else if (activeFilter !== 'all') {
      filtered = filtered.filter((n) => n.category === activeFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.description.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [notifications, activeFilter, searchQuery]);

  const stats = useMemo(() => {
    return {
      total: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      translation: notifications.filter((n) => n.category === 'translation')
        .length,
      billing: notifications.filter((n) => n.category === 'billing').length,
      system: notifications.filter((n) => n.category === 'system').length,
    };
  }, [notifications]);

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleTogglePin = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((sid) => sid !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FileCheck className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Bell className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-500 to-emerald-500';
      case 'error':
        return 'from-red-500 to-rose-500';
      case 'warning':
        return 'from-amber-500 to-orange-500';
      case 'info':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const filters = [
    { id: 'all', label: 'All Notifications', count: stats.total },
    { id: 'unread', label: 'Unread', count: stats.unread },
    { id: 'translation', label: 'Translations', count: stats.translation },
    { id: 'billing', label: 'Billing', count: stats.billing },
    { id: 'system', label: 'System', count: stats.system },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Notifications
                </h1>
                <p className="text-sm text-gray-600">
                  Stay updated on translations, system alerts, and account
                  activity
                </p>
              </div>

              <div className="flex items-center gap-3">
                {stats.unread > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 rounded-xl font-semibold transition-all"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Mark all read
                  </button>
                )}

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Search and Quick Stats */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-3">
                {filters.slice(0, 3).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <span className="ml-2 text-xs font-bold">
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-blue-50 border-b border-blue-100 px-8 py-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Filter by Category
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {filter.label}
                    <span className="ml-2 text-xs opacity-75">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="bg-amber-50 border-b border-amber-100 px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {selectedIds.length} notification(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-lg transition-all">
                  Mark as read
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-all">
                  <Archive className="w-4 h-4" />
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No notifications found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : "You're all caught up!"}
                </p>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
                  >
                    View all notifications
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-2xl border-2 transition-all hover:shadow-md ${
                      notification.isRead
                        ? 'border-gray-200'
                        : 'border-blue-200 shadow-sm'
                    } ${selectedIds.includes(notification.id) ? 'ring-2 ring-blue-400' : ''}`}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(notification.id)}
                          onChange={() => handleToggleSelect(notification.id)}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />

                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${getNotificationColor(notification.type)} text-white flex-shrink-0`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {notification.isPinned && (
                                  <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
                                )}
                                <h3
                                  className={`font-semibold ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}
                                >
                                  {notification.title}
                                </h3>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {notification.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => handleTogglePin(notification.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                                title={notification.isPinned ? 'Unpin' : 'Pin'}
                              >
                                <Pin
                                  className={`w-4 h-4 ${notification.isPinned ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  handleToggleRead(notification.id)
                                }
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                                title={
                                  notification.isRead
                                    ? 'Mark as unread'
                                    : 'Mark as read'
                                }
                              >
                                <CheckCheck
                                  className={`w-4 h-4 ${notification.isRead ? 'text-green-600' : 'text-gray-400'}`}
                                />
                              </button>
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                              </button>
                            </div>
                          </div>

                          {/* Metadata */}
                          {notification.metadata && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                                {notification.metadata.fileName && (
                                  <span className="flex items-center gap-1">
                                    <FileCheck className="w-3.5 h-3.5" />
                                    {notification.metadata.fileName}
                                  </span>
                                )}
                                {notification.metadata.wordsTranslated && (
                                  <span>
                                    {notification.metadata.wordsTranslated.toLocaleString()}{' '}
                                    words
                                  </span>
                                )}
                                {notification.metadata.creditsUsed && (
                                  <span className="flex items-center gap-1">
                                    <CreditCard className="w-3.5 h-3.5" />
                                    {notification.metadata.creditsUsed} credits
                                  </span>
                                )}
                                {notification.metadata.creditsRemaining && (
                                  <span className="font-medium text-amber-600">
                                    {notification.metadata.creditsRemaining}/
                                    {notification.metadata.totalCredits} credits
                                    remaining
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="mt-3 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Clock className="w-3.5 h-3.5" />
                              <span>
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              <span>•</span>
                              <span className="capitalize">
                                {notification.category}
                              </span>
                            </div>
                            {notification.category === 'translation' && (
                              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                View details
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

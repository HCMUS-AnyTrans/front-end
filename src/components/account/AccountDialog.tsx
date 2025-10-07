import React, { useState } from 'react';
import {
  User,
  CreditCard,
  Settings,
  X,
  Camera,
  Upload,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Calendar,
  Download,
  Plus,
  MoreHorizontal,
  Star,
  TrendingUp,
  CheckCircle,
  Globe,
  Bell,
  Lock,
  Trash2,
} from 'lucide-react';

// Mock Dialog Components
function Dialog({ open, onOpenChange, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

function DialogContent({ children, className }: any) {
  return (
    <div className={`bg-white rounded-2xl shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

export default function AccountDialog() {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    pushNotifications: true,
    translationAlerts: false,
  });

  // Mock data
  const userData = {
    fullName: 'Johnathan Smith',
    email: 'johnathan.smith@example.com',
    phone: '+84 901 234 567',
    company: 'Tech Solutions Inc.',
    avatar: null,
  };

  const currentPlan = {
    name: 'Plus Plan',
    price: 19,
    billing: 'monthly',
    credits: { used: 180, total: 300 },
    renewalDate: 'March 15, 2025',
    status: 'active',
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: 6,
      expiryYear: 2026,
      isDefault: false,
    },
  ];

  const invoices = [
    { id: '1', date: 'Feb 15, 2025', amount: 19, status: 'paid' },
    { id: '2', date: 'Jan 15, 2025', amount: 19, status: 'paid' },
    { id: '3', date: 'Dec 15, 2024', amount: 19, status: 'paid' },
  ];

  const sessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Ho Chi Minh City, VN',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Ho Chi Minh City, VN',
      lastActive: '1 hour ago',
      current: false,
    },
    {
      id: '3',
      device: 'Firefox on MacBook',
      location: 'Hanoi, VN',
      lastActive: '2 days ago',
      current: false,
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const usagePercentage =
    (currentPlan.credits.used / currentPlan.credits.total) * 100;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Account Settings
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your profile, billing and preferences
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-56 border-r border-gray-200 p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Profile Picture
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                        {userData.fullName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border-2 border-blue-600 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-3">
                        Upload a profile picture (JPG, PNG or GIF, max 5MB)
                      </p>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all">
                        <Upload className="w-4 h-4" />
                        Upload New Photo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.fullName}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.company}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Security
                  </h3>

                  {/* Change Password */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Change Password
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? 'text' : 'password'}
                            className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                current: !prev.current,
                              }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          >
                            {showPasswords.current ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  new: !prev.new,
                                }))
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showPasswords.new ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  confirm: !prev.confirm,
                                }))
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Two-Factor Auth */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs text-gray-600">
                          Add extra security to your account
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Active Sessions
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage and monitor where you're logged in
                  </p>

                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900 text-sm">
                                {session.device}
                              </p>
                              {session.current && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {session.location}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Last active: {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Sign out all other sessions
                    </button>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                  <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Current Plan</p>
                      <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                      <p className="text-3xl font-bold mt-2">
                        ${currentPlan.price}/month
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>

                  {/* Usage */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Credits Usage</span>
                      <span className="text-sm">
                        {currentPlan.credits.used} / {currentPlan.credits.total}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all"
                        style={{ width: `${usagePercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-blue-100 mt-2">
                      Renews on {currentPlan.renewalDate}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 bg-white hover:bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Upgrade Plan
                    </button>
                    <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-lg font-semibold text-sm transition-all">
                      Cancel Plan
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Payment Methods
                    </h3>
                    <button
                      onClick={() => setShowAddCardDialog(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Add Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                {method.type === 'visa' ? 'Visa' : 'Mastercard'}{' '}
                                •••• {method.last4}
                              </span>
                              {method.isDefault && (
                                <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                  <Star className="w-3 h-3 fill-current" />
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              Expires{' '}
                              {method.expiryMonth.toString().padStart(2, '0')}/
                              {method.expiryYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              Set Default
                            </button>
                          )}
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Card Dialog */}
                {showAddCardDialog && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                      className="fixed inset-0 bg-black/50"
                      onClick={() => setShowAddCardDialog(false)}
                    />
                    <div className="relative z-50 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          Add Payment Method
                        </h3>
                        <button
                          onClick={() => setShowAddCardDialog(false)}
                          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Month
                            </label>
                            <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="">MM</option>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (m) => (
                                  <option key={m} value={m}>
                                    {m.toString().padStart(2, '0')}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Year
                            </label>
                            <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option value="">YYYY</option>
                              {Array.from(
                                { length: 10 },
                                (_, i) => 2025 + i
                              ).map((y) => (
                                <option key={y} value={y}>
                                  {y}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => setShowAddCardDialog(false)}
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => setShowAddCardDialog(false)}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold transition-all"
                          >
                            Add Card
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing History */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Billing History
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Date
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Amount
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Status
                          </th>
                          <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice, index) => (
                          <tr
                            key={invoice.id}
                            className={
                              index !== invoices.length - 1
                                ? 'border-b border-gray-100'
                                : ''
                            }
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-900">
                                  {invoice.date}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-semibold text-gray-900">
                                ${invoice.amount}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <CheckCircle className="w-3 h-3" />
                                Paid
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                <Download className="w-4 h-4" />
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Preferences */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Preferences
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Theme
                        </p>
                        <p className="text-xs text-gray-600">
                          Choose your preferred theme
                        </p>
                      </div>
                      <select
                        value={preferences.theme}
                        onChange={(e) =>
                          setPreferences((prev) => ({
                            ...prev,
                            theme: e.target.value,
                          }))
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Language
                        </p>
                        <p className="text-xs text-gray-600">
                          Select your preferred language
                        </p>
                      </div>
                      <select
                        value={preferences.language}
                        onChange={(e) =>
                          setPreferences((prev) => ({
                            ...prev,
                            language: e.target.value,
                          }))
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="en">English</option>
                        <option value="vi">Vietnamese</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Email Notifications
                          </p>
                          <p className="text-xs text-gray-600">
                            Receive updates via email
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.emailNotifications}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              emailNotifications: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Push Notifications
                          </p>
                          <p className="text-xs text-gray-600">
                            Receive push notifications
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.pushNotifications}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              pushNotifications: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            Translation Alerts
                          </p>
                          <p className="text-xs text-gray-600">
                            Get notified when translations complete
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.translationAlerts}
                          onChange={(e) =>
                            setPreferences((prev) => ({
                              ...prev,
                              translationAlerts: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3 pt-2">
                  <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                    Reset to Defaults
                  </button>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

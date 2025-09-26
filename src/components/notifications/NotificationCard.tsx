"use client";

import React from "react";
import { 
  Info, 
  CreditCard, 
  FolderOpen, 
  AlertTriangle,
  MoreVertical,
  Pin,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type NotificationType = "system" | "billing" | "project" | "error";

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  source: string;
  isRead: boolean;
  isPinned?: boolean;
  tags?: string[];
}

interface NotificationCardProps {
  notification: NotificationData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMarkRead: (id: string) => void;
  onPin: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (notification: NotificationData) => void;
}

const typeIcons = {
  system: Info,
  billing: CreditCard,
  project: FolderOpen,
  error: AlertTriangle,
};

const typeColors = {
  system: "text-blue-500",
  billing: "text-green-500", 
  project: "text-purple-500",
  error: "text-red-500",
};

export function NotificationCard({ 
  notification, 
  isSelected, 
  onSelect, 
  onMarkRead, 
  onPin, 
  onDelete,
  onClick 
}: NotificationCardProps) {
  const Icon = typeIcons[notification.type];
  const iconColor = typeColors[notification.type];

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, input')) {
      return;
    }
    onClick(notification);
  };

  return (
    <div 
      className={`
        group relative bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200
        hover:shadow-md hover:border-gray-300
        ${!notification.isRead ? 'bg-blue-50/30 border-blue-200' : ''}
        ${isSelected ? 'ring-2 ring-[#19398f] ring-offset-1' : ''}
      `}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      <div className="absolute left-4 top-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(notification.id)}
          className="w-4 h-4 text-[#19398f] border-gray-300 rounded focus:ring-[#19398f] focus:ring-2"
        />
      </div>

      <div className="flex gap-4 pl-8">
        {/* Status Indicator & Icon */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <div className={`w-2 h-2 rounded-full ${!notification.isRead ? 'bg-[#19398f]' : 'bg-gray-300'}`} />
          <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-semibold font-nunito ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
              {notification.title}
              {notification.isPinned && (
                <Pin className="inline w-3 h-3 ml-2 text-gray-500" />
              )}
            </h3>
            
            {/* Actions - Show on hover */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkRead(notification.id);
                }}
                className="h-8 w-8 p-0"
                title={notification.isRead ? "Mark as unread" : "Mark as read"}
              >
                {notification.isRead ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPin(notification.id);
                }}
                className="h-8 w-8 p-0"
                title={notification.isPinned ? "Unpin" : "Pin"}
              >
                <Pin className={`w-4 h-4 ${notification.isPinned ? 'text-[#19398f]' : 'text-gray-500'}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  // Could show a dropdown menu here
                }}
                className="h-8 w-8 p-0"
                title="More actions"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-600 font-nunito mb-3 line-clamp-2">
            {notification.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500 font-nunito">
            <span>{notification.timestamp}</span>
            <span>•</span>
            <span>{notification.source}</span>
            
            {notification.tags && notification.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-1">
                  {notification.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

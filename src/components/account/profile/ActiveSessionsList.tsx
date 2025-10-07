'use client';

import React from 'react';
import { Smartphone, Lock } from 'lucide-react';
import { Session } from '@/src/types/account';

type ActiveSessionsListProps = {
  sessions: Session[];
  onRevoke: (sessionId: string) => void;
  onSignOutAllOthers: () => void;
};

export default function ActiveSessionsList({
  sessions,
  onRevoke,
  onSignOutAllOthers,
}: ActiveSessionsListProps) {
  return (
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
                <p className="text-sm text-gray-600">{session.location}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last active: {session.lastActive}
                </p>
              </div>
            </div>
            {!session.current && (
              <button
                onClick={() => onRevoke(session.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={onSignOutAllOthers}
          className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Sign out all other sessions
        </button>
      </div>
    </div>
  );
}

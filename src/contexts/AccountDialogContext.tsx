"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import AccountDialog from "@/src/components/account/AccountDialog";

type TabType = "profile" | "billing" | "settings";

interface AccountDialogContextType {
  openAccount: (tab?: TabType) => void;
  closeAccount: () => void;
  isOpen: boolean;
}

const AccountDialogContext = createContext<AccountDialogContextType | undefined>(undefined);

export const useAccountDialog = () => {
  const context = useContext(AccountDialogContext);
  if (context === undefined) {
    throw new Error("useAccountDialog must be used within an AccountDialogProvider");
  }
  return context;
};

interface AccountDialogProviderProps {
  children: ReactNode;
}

export const AccountDialogProvider = ({ children }: AccountDialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<TabType>("profile");

  // Mock user data - in real app this would come from auth context
  const userData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+84 123 456 789",
    company: "AnyTrans Inc.",
    avatar: undefined,
  };

  const openAccount = (tab: TabType = "profile") => {
    setDefaultTab(tab);
    setIsOpen(true);
  };

  const closeAccount = () => {
    setIsOpen(false);
  };

  const value = {
    openAccount,
    closeAccount,
    isOpen,
  };

  return (
    <AccountDialogContext.Provider value={value}>
      {children}
      <AccountDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultTab={defaultTab}
        userData={userData}
      />
    </AccountDialogContext.Provider>
  );
};

"use client";

import React from "react";
import { CreditCard, MoreHorizontal, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onSetDefault?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function PaymentMethodCard({ 
  paymentMethod, 
  onSetDefault, 
  onRemove 
}: PaymentMethodCardProps) {
  const getCardIcon = (type: string) => {
    return <CreditCard size={20} className="text-[#19398f]" />;
  };

  const getCardName = (type: string) => {
    switch (type) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'amex':
        return 'American Express';
      default:
        return 'Card';
    }
  };

  return (
    <Card className="border-gray-200 hover:border-[#19398f]/30 transition-colors">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {getCardIcon(paymentMethod.type)}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#142457] font-inter">
                {getCardName(paymentMethod.type)} •••• {paymentMethod.last4}
              </span>
              {paymentMethod.isDefault && (
                <div className="flex items-center gap-1 text-xs bg-[#19398f]/10 text-[#19398f] px-2 py-1 rounded-full">
                  <Star size={12} className="fill-current" />
                  Default
                </div>
              )}
            </div>
            <p className="text-sm text-[#717680] font-nunito">
              Expires {paymentMethod.expiryMonth.toString().padStart(2, '0')}/{paymentMethod.expiryYear}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="cursor-pointer">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!paymentMethod.isDefault && (
              <DropdownMenuItem 
                onClick={() => onSetDefault?.(paymentMethod.id)}
                className="cursor-pointer"
              >
                Set as default
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={() => onRemove?.(paymentMethod.id)}
              className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50"
            >
              Remove card
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}

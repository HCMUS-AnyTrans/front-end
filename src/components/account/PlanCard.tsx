"use client";

import React from "react";
import { Calendar, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  credits: {
    used: number;
    total: number;
  };
  renewalDate: string;
  status: 'active' | 'cancelled' | 'expired';
}

interface PlanCardProps {
  plan: Plan;
  onUpgrade?: () => void;
  onCancel?: () => void;
  onReactivate?: () => void;
}

export default function PlanCard({ plan, onUpgrade, onCancel, onReactivate }: PlanCardProps) {
  const usagePercentage = (plan.credits.used / plan.credits.total) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-orange-600 bg-orange-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'cancelled':
        return 'Cancelled';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#142457] font-inter">
              {plan.name}
            </h3>
            <p className="text-2xl font-bold text-[#19398f] font-inter mt-1">
              ${plan.price}/{plan.billing === 'monthly' ? 'month' : 'year'}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(plan.status)}`}>
            {getStatusText(plan.status)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#142457] font-nunito">
              Credits Usage
            </span>
            <span className="text-sm text-[#717680] font-nunito">
              {plan.credits.used.toLocaleString()} / {plan.credits.total.toLocaleString()}
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <p className="text-xs text-[#717680] mt-1 font-nunito">
            {Math.round(usagePercentage)}% used this billing cycle
          </p>
        </div>

        {/* Renewal Date */}
        <div className="flex items-center gap-2 text-[#717680]">
          <Calendar size={16} />
          <span className="text-sm font-nunito">
            {plan.status === 'active' ? 'Renews' : 'Renewal was'} on {plan.renewalDate}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {plan.status === 'active' ? (
            <>
              <Button 
                onClick={onUpgrade}
                className="flex-1 bg-[#19398f] hover:bg-[#142457] cursor-pointer"
              >
                <TrendingUp size={16} className="mr-2" />
                Upgrade Plan
              </Button>
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="cursor-pointer hover:border-red-500 hover:text-red-600"
              >
                Cancel Plan
              </Button>
            </>
          ) : plan.status === 'cancelled' ? (
            <Button 
              onClick={onReactivate}
              className="flex-1 bg-[#19398f] hover:bg-[#142457] cursor-pointer"
            >
              Reactivate Plan
            </Button>
          ) : (
            <Button 
              onClick={onUpgrade}
              className="flex-1 bg-[#19398f] hover:bg-[#142457] cursor-pointer"
            >
              <CreditCard size={16} className="mr-2" />
              Subscribe Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

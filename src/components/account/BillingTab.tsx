"use client";

import React, { useState } from "react";
import { Plus, Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlanCard from "./PlanCard";
import PaymentMethodCard from "./PaymentMethodCard";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export default function BillingTab() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
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
  ]);

  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    name: '',
  });

  const currentPlan = {
    id: 'plus',
    name: 'Plus Plan',
    price: 19,
    billing: 'monthly' as const,
    credits: {
      used: 180,
      total: 300,
    },
    renewalDate: 'March 15, 2025',
    status: 'active' as const,
  };

  const invoices: Invoice[] = [
    {
      id: 'inv_001',
      date: 'February 15, 2025',
      amount: 19,
      status: 'paid',
      downloadUrl: '#',
    },
    {
      id: 'inv_002',
      date: 'January 15, 2025',
      amount: 19,
      status: 'paid',
      downloadUrl: '#',
    },
    {
      id: 'inv_003',
      date: 'December 15, 2024',
      amount: 19,
      status: 'paid',
      downloadUrl: '#',
    },
  ];

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    alert('Default payment method updated');
  };

  const handleRemoveCard = (id: string) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      alert('Payment method removed');
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!newCard.cardNumber || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvc || !newCard.name) {
      alert('Please fill in all fields');
      return;
    }

    // Mock card addition
    const mockCard: PaymentMethod = {
      id: Date.now().toString(),
      type: 'visa', // Simplified - would normally detect from card number
      last4: newCard.cardNumber.slice(-4),
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods(prev => [...prev, mockCard]);
    setNewCard({ cardNumber: '', expiryMonth: '', expiryYear: '', cvc: '', name: '' });
    setShowAddCardDialog(false);
    alert('Payment method added successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Paid</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Failed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Plan */}
      <div>
        <h3 className="text-lg font-semibold text-[#142457] font-inter mb-4">Current Plan</h3>
        <PlanCard
          plan={currentPlan}
          onUpgrade={() => alert('Redirecting to upgrade page...')}
          onCancel={() => {
            if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing cycle.')) {
              alert('Subscription cancelled. You will retain access until March 15, 2025.');
            }
          }}
        />
      </div>

      {/* Payment Methods */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#142457] font-inter">Payment Methods</h3>
          <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#19398f] hover:bg-[#142457] cursor-pointer">
                <Plus size={16} className="mr-2" />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-inter">Add New Payment Method</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-[#142457] font-nunito font-semibold">
                    Card Number *
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="expiryMonth" className="text-[#142457] font-nunito font-semibold">
                      Month *
                    </Label>
                    <Select value={newCard.expiryMonth} onValueChange={(value) => setNewCard(prev => ({ ...prev, expiryMonth: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="expiryYear" className="text-[#142457] font-nunito font-semibold">
                      Year *
                    </Label>
                    <Select value={newCard.expiryYear} onValueChange={(value) => setNewCard(prev => ({ ...prev, expiryYear: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cvc" className="text-[#142457] font-nunito font-semibold">
                      CVC *
                    </Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={newCard.cvc}
                      onChange={(e) => setNewCard(prev => ({ ...prev, cvc: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardName" className="text-[#142457] font-nunito font-semibold">
                    Cardholder Name *
                  </Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={newCard.name}
                    onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-[#19398f] hover:bg-[#142457] cursor-pointer">
                    Add Card
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddCardDialog(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              paymentMethod={method}
              onSetDefault={handleSetDefault}
              onRemove={handleRemoveCard}
            />
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <Card className="border-dashed border-gray-300">
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-[#717680] font-nunito mb-4">No payment methods added yet</p>
                <Button 
                  onClick={() => setShowAddCardDialog(true)}
                  className="bg-[#19398f] hover:bg-[#142457] cursor-pointer"
                >
                  <Plus size={16} className="mr-2" />
                  Add Your First Card
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-lg font-semibold text-[#142457] font-inter mb-4">Billing History</h3>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#142457] font-nunito">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#142457] font-nunito">Amount</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#142457] font-nunito">Status</th>
                    <th className="text-right p-4 text-sm font-semibold text-[#142457] font-nunito">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} className={index !== invoices.length - 1 ? "border-b border-gray-100" : ""}>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[#717680]" />
                          <span className="text-[#142457] font-nunito">{invoice.date}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-[#142457] font-inter">${invoice.amount}</span>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="p-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(invoice.downloadUrl, '_blank')}
                          className="cursor-pointer"
                        >
                          <Download size={16} className="mr-2" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

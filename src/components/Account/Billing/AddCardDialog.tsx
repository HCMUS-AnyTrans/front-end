'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BaseDialog, BaseDialogContent } from '@/components/Common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type AddCardDialogProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  onSubmit: (payload: {
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
    cardholder: string;
  }) => void;
};

export default function AddCardDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddCardDialogProps) {
  const t = useTranslations('common.billing.addCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [cardholder, setCardholder] = React.useState('');

  return (
    <BaseDialog open={open} onOpenChange={onOpenChange}>
      <BaseDialogContent className="max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{t('title')}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="cardNumber"
              className="text-sm font-semibold text-gray-900"
            >
              {t('cardNumber')}
            </Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder={t('cardNumberPlaceholder')}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">
                {t('month')}
              </Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <SelectItem key={m} value={m.toString()}>
                      {m.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-900">
                {t('year')}
              </Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="focus:ring-primary">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => 2025 + i).map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="cvc"
                className="text-sm font-semibold text-gray-900"
              >
                {t('cvc')}
              </Label>
              <Input
                id="cvc"
                type="text"
                placeholder={t('cvcPlaceholder')}
                maxLength={3}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="cardholder"
              className="text-sm font-semibold text-gray-900"
            >
              {t('cardholderName')}
            </Label>
            <Input
              id="cardholder"
              type="text"
              placeholder={t('cardholderPlaceholder')}
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
              className="focus-visible:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="gradient"
              onClick={() => {
                onSubmit({ cardNumber, month, year, cvc, cardholder });
                onOpenChange(false);
              }}
              className="flex-1"
            >
              {t('addCard')}
            </Button>
          </div>
        </div>
      </BaseDialogContent>
    </BaseDialog>
  );
}

import {
  Download,
  Languages,
  LayoutTemplate,
  Shield,
  Upload,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type PreviewSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export type PreviewSlideKey =
  | 'uploadPreview'
  | 'reviewPreview'
  | 'deliveryPreview';

export type BenefitKey = 'layout' | 'speed' | 'security';

export type StepKey = 'upload' | 'selectLanguage' | 'download';

export type PlanKey = 'starter' | 'vip' | 'business';

export type FaqKey =
  | 'supportedFormats'
  | 'formatRetention'
  | 'turnaroundTime'
  | 'creditExpiry';

type PreviewSlideConfig = {
  key: PreviewSlideKey;
};

type FeatureConfig = {
  key: BenefitKey;
  icon: LucideIcon;
};

type StepConfig = {
  key: StepKey;
  icon: LucideIcon;
};

type PlanConfig = {
  key: PlanKey;
  credits: number;
  bonus?: number;
  originalPrice?: string;
  price: string;
  pricePerCredit: string;
  popular?: boolean;
};

type FaqConfig = {
  key: FaqKey;
};

export const previewSlideConfigs: PreviewSlideConfig[] = [
  {
    key: 'uploadPreview',
  },
  {
    key: 'reviewPreview',
  },
  {
    key: 'deliveryPreview',
  },
];

export const benefitConfigs: FeatureConfig[] = [
  {
    key: 'layout',
    icon: LayoutTemplate,
  },
  {
    key: 'speed',
    icon: Zap,
  },
  {
    key: 'security',
    icon: Shield,
  },
];

export const stepConfigs: StepConfig[] = [
  {
    key: 'upload',
    icon: Upload,
  },
  {
    key: 'selectLanguage',
    icon: Languages,
  },
  {
    key: 'download',
    icon: Download,
  },
];

export const planConfigs: PlanConfig[] = [
  {
    key: 'starter',
    credits: 20,
    price: '40.000',
    pricePerCredit: '2.000',
  },
  {
    key: 'vip',
    credits: 50,
    bonus: 5,
    originalPrice: '100.000',
    price: '90.000',
    pricePerCredit: '~1.800',
    popular: true,
  },
  {
    key: 'business',
    credits: 200,
    bonus: 30,
    originalPrice: '460.000',
    price: '320.000',
    pricePerCredit: '~1.400',
  },
];

export const faqConfigs: FaqConfig[] = [
  {
    key: 'supportedFormats',
  },
  {
    key: 'formatRetention',
  },
  {
    key: 'turnaroundTime',
  },
  {
    key: 'creditExpiry',
  },
];

export type BenefitConfig = (typeof benefitConfigs)[number];
export type StepConfigItem = (typeof stepConfigs)[number];
export type PlanConfigItem = (typeof planConfigs)[number];
export type FaqConfigItem = (typeof faqConfigs)[number];
export type PreviewSlideConfigItem = (typeof previewSlideConfigs)[number];

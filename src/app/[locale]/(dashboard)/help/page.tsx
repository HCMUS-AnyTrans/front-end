"use client";

import { use, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import {
  Search,
  HelpCircle,
  FileText,
  BookOpen,
  CreditCard,
  Mail,
  MessageSquare,
  Clock,
  ExternalLink,
} from "lucide-react";
import { AppCard, AppCardContent } from "@/components/ui/app-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

type FAQItem = {
  category: string;
  q: string;
  a: string;
};

export default function HelpPage() {
  const t = useTranslations("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Categories definition
  const categories = useMemo(() => {
    return [
      { id: "all", label: t("categories.all"), icon: HelpCircle },
      { id: "general", label: t("categories.general"), icon: HelpCircle },
      { id: "translation", label: t("categories.translation"), icon: FileText },
      { id: "glossary", label: t("categories.glossary"), icon: BookOpen },
      { id: "billing", label: t("categories.billing"), icon: CreditCard },
    ];
  }, [t]);

  // Frequently Asked Questions from JSON
  const faqs = useMemo<FAQItem[]>(() => {
    return t.raw("faqs") as FAQItem[];
  }, [t]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  return (
    <div className="flex w-full flex-col gap-6 py-4 md:py-6 lg:py-8">
      {/* ── Banner ── */}
      <AppCard className="overflow-hidden rounded-xl border-border/70 bg-[#eef5ff] dark:bg-[linear-gradient(135deg,#0e1e38_0%,#061024_100%)] dark:border-primary/15">
        <AppCardContent
          padding="none"
          className="relative overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <Image
            src="/help/help-banner.png"
            alt="Help Banner"
            fill
            preload
            unoptimized
            className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-60 dark:opacity-40 lg:object-center"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0e1e38] via-[#0e1e38]/85 to-transparent dark:block" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("title")}
              </h2>
              <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                {t("description")}
              </p>
            </div>

            {/* Banner Search Bar */}
            <div className="relative w-full max-w-sm md:w-80">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-11 rounded-xl bg-background/80 dark:bg-black/20 backdrop-blur"
              />
            </div>
          </div>
        </AppCardContent>
      </AppCard>

      {/* ── Main Content Grid ── */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: FAQ Accordion list (incorporating Categories) */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          <AppCard className="overflow-hidden p-2 sm:p-4">
            <AppCardContent padding="all" className="space-y-5">
              {/* Header with Title and Integrated Category Tabs */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-border pb-4">
                <h3 className="text-xl font-bold tracking-tight text-foreground shrink-0">
                  {t("faqTitle")}
                </h3>

                {/* Categories Tab Selector merged inside the card header */}
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/15"
                            : "border-border bg-card text-foreground hover:bg-muted/50"
                        }`}
                      >
                        <Icon className="size-3.5" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accordion list */}
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-2 pt-2">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-border/70 rounded-xl px-4 py-1 last:border-b"
                    >
                      <AccordionTrigger className="text-base font-semibold hover:no-underline text-foreground">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <p>{t("noResults")}</p>
                </div>
              )}
            </AppCardContent>
          </AppCard>
        </div>

        {/* Right Column: Support Cards */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          {/* Support Ticket Box */}
          <AppCard className="overflow-hidden">
            <AppCardContent padding="all" className="space-y-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="size-5" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  {t("support.title")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("support.description")}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="size-4 text-primary" />
                  <span>{t("support.email")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="size-4 text-primary" />
                  <span>{t("support.hours")}</span>
                </div>
              </div>

              <Button className="w-full h-11 rounded-xl" asChild>
                <a href={`mailto:${t("support.email")}`} className="flex items-center gap-2">
                  <Mail className="size-4" />
                  {t("support.button")}
                </a>
              </Button>
            </AppCardContent>
          </AppCard>

          {/* Quick Guide Links */}
          <AppCard className="overflow-hidden">
            <AppCardContent padding="all" className="space-y-4">
              <h3 className="text-base font-bold tracking-tight text-foreground border-b border-border pb-2">
                {t("resources.title")}
              </h3>

              <div className="flex flex-col gap-1">
                <Link
                  href="/documents"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {t("resources.translate")}
                  </span>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link
                  href="/settings?tab=preferences"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {t("resources.preferences")}
                  </span>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link
                  href="/settings?tab=billing"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {t("resources.billing")}
                  </span>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </AppCardContent>
          </AppCard>
        </div>
      </div>
    </div>
  );
}

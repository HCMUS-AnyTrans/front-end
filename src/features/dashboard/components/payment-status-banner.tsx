"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAccessToken, useIsAuthenticated, useIsInitialized } from "@/features/auth"
import { useMarkPaymentCancelled } from "@/features/settings"
import { billingKeys, dashboardKeys, notificationKeys, walletKeys } from "@/lib/query-client"

type BannerStatus = "success" | "error" | "pending" | null
const CLOSE_ANIMATION_MS = 220

export function PaymentStatusBanner() {
  const t = useTranslations("dashboard.paymentBanner")
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { markPaymentCancelledAsync } = useMarkPaymentCancelled()
  const isAuthInitialized = useIsInitialized()
  const isAuthenticated = useIsAuthenticated()
  const accessToken = useAccessToken()
  const [open, setOpen] = useState(false)
  const hasTracked = useRef(false)
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const source = searchParams.get("source")
  const rawStatus = searchParams.get("paymentStatus")
  const statusCode = searchParams.get("status")
  const responseCode = searchParams.get("code")
  const isCancelled = searchParams.get("cancel") === "true"
  const orderCode = searchParams.get("orderCode")

  const status = useMemo<BannerStatus>(() => {
    if (source !== "payment") return null

    if (rawStatus === "success" || rawStatus === "error" || rawStatus === "pending") {
      return rawStatus
    }

    if (statusCode) {
      const normalized = statusCode.toLowerCase()
      if (normalized === "paid" || normalized === "success") return "success"
      if (normalized === "pending" || normalized === "processing") return "pending"
      return "error"
    }

    if (!responseCode) return null
    if (responseCode === "00") return "success"
    if (responseCode === "24" || responseCode === "01") return "pending"
    if (isCancelled) return "error"
    return "error"
  }, [source, rawStatus, statusCode, responseCode, isCancelled])

  const dismiss = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("source")
    params.delete("paymentStatus")
    params.delete("status")
    params.delete("code")
    params.delete("cancel")
    params.delete("orderCode")
    params.delete("id")
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }

  useEffect(() => {
    setOpen(Boolean(status))
  }, [status])

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!status || hasTracked.current) return

    if (status === "success") {
      hasTracked.current = true
      queryClient.invalidateQueries({ queryKey: walletKeys.all })
      queryClient.invalidateQueries({ queryKey: billingKeys.all })
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all })
      queryClient.invalidateQueries({ queryKey: notificationKeys.all })
      return
    }

    if (isCancelled && orderCode && isAuthInitialized && isAuthenticated && accessToken) {
      hasTracked.current = true
      void markPaymentCancelledAsync({ orderCode }).catch(() => undefined)
      return
    }

    // For non-success statuses, wait until auth is ready before deciding whether
    // to run cancellation sync; otherwise this effect can be skipped too early.
    if (status === "error" && isCancelled && orderCode) {
      return
    }

    hasTracked.current = true
  }, [
    status,
    isCancelled,
    orderCode,
    isAuthInitialized,
    isAuthenticated,
    accessToken,
    markPaymentCancelledAsync,
    queryClient,
  ])

  const onOpenChange = (nextOpen: boolean) => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current)
      dismissTimerRef.current = null
    }

    setOpen(nextOpen)

    if (!nextOpen) {
      dismissTimerRef.current = setTimeout(() => {
        dismiss()
        dismissTimerRef.current = null
      }, CLOSE_ANIMATION_MS)
    }
  }

  if (!status) return null

  const statusIcon =
    status === "success"
      ? <CheckCircle className="size-6 text-success" />
      : status === "pending"
        ? <Clock className="size-6 text-yellow-600" />
        : <XCircle className="size-6 text-destructive" />

  const statusMessage =
    status === "success"
      ? t("success")
      : status === "pending"
        ? t("pending")
        : t("error")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            {statusIcon}
            <DialogTitle>{t("title")}</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">{statusMessage}</p>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t("dismiss")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import type { Metadata } from "next";
import { NotificationsInterface } from "./notifications-interface";

export const metadata: Metadata = {
  title: "Notifications - AnyTrans",
  description: "Stay on top of translation events, system alerts, and billing updates.",
};

export default function NotificationsPage() {
  return <NotificationsInterface />;
}

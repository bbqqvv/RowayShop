import { ReactNode } from "react";

export interface MenuItem {
  name: string;
  link?: string;
  icon: ReactNode;
  subItems?: MenuItem[];
}
// Define the LayoutProps interface separately
export interface LayoutProps {
  children: ReactNode;
  title?: string;
}
export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export interface SidebarProps {
  closeSidebar?: () => void;
  isMobile?: boolean;
}
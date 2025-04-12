import { ReactNode } from "react";

export interface MenuItem {
  name: string;
  link?: string;
  icon: ReactNode;
  subItems?: MenuItem[];
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export interface SidebarProps {
  closeSidebar?: () => void;
  isMobile?: boolean;
}
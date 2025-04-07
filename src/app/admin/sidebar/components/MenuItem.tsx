"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MenuItem } from "./types";

export default function MenuItemComponent({ 
  item, 
  closeSidebar 
}: { 
  item: MenuItem; 
  closeSidebar?: () => void 
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;
  
  const isActive = item.link ? pathname === item.link : false;
  const isSubItemActive = hasSubItems && item.subItems?.some(
    subItem => subItem.link && pathname.startsWith(subItem.link)
  );

  useEffect(() => {
    if (isSubItemActive) {
      setIsOpen(true);
    }
  }, [isSubItemActive, pathname]);

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      closeSidebar?.();
    }
  };

  return (
    <li>
      <div className="flex flex-col">
        <Link
          href={item.link || "#"}
          className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            (isActive || isSubItemActive)
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-50"
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.name}</span>
          </div>
          {hasSubItems && (
            isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />
          )}
        </Link>

        {hasSubItems && isOpen && (
          <div className="mt-1 ml-8 pl-2 border-l border-gray-200">
            <ul className="space-y-1">
              {item.subItems?.map((subItem) => {
                const isSubActive = subItem.link && pathname.startsWith(subItem.link);
                return (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.link || "#"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isSubActive
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={closeSidebar}
                    >
                      {subItem.icon}
                      <span>{subItem.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}
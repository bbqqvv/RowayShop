"use client";

import { MenuGroup } from "./types";
import MenuItemComponent from "./MenuItem";

export default function MenuGroupComponent({ 
  group, 
  closeSidebar 
}: { 
  group: MenuGroup; 
  closeSidebar?: () => void 
}) {
  return (
    <div className="mb-6 last:mb-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
        {group.title}
      </h3>
      <ul className="space-y-1">
        {group.items.map((item) => (
          <MenuItemComponent
            key={item.name}
            item={item}
            closeSidebar={closeSidebar}
          />
        ))}
      </ul>
    </div>
  );
}
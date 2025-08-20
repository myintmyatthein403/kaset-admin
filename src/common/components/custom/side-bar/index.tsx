import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/src/common/components/ui/sidebar";
import { sidebarGroups } from "@/src/common/constants/navigation.constant";
import { Link, useRouter } from "@tanstack/react-router";
import clsx from "clsx";

export const AppSidebar = () => {
  const { state: routerState } = useRouter();

  return (
    <Sidebar className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-lg">
      <SidebarHeader className="py-4 px-6 text-2xl font-bold text-primary-600 dark:text-primary-400 border-b border-gray-200 dark:border-gray-800">
        Kaset
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto py-4">
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="px-6 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = routerState.location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <Link
                        to={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-6 py-2 rounded-lg transition-colors duration-200",
                          isActive
                            ? "bg-primary-100 text-primary-700 font-medium dark:bg-primary-900 dark:text-primary-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

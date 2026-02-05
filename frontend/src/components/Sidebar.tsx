import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Eye,
  LayoutDashboard,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    href: "/dashboard",
  },
  {
    label: "Companies",
    icon: <Building2 size={18} />,
    href: "/companies",
  },
  {
    label: "Portfolio",
    icon: <BriefcaseBusiness size={18} />,
    href: "/portfolio",
  },
  {
    label: "Watchlist",
    icon: <Eye size={18} />,
    href: "/watchlist",
  },
];

const Sidebar = () => {
  return (
    <div>
      <aside className="bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed lg:relative h-full z-50 overflow-hidden w-64 translate-x-0">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl font-extrabold">SMKT</h3>
          <button className="p-2 hover:bg-gray-100 rounded-md hidden lg:block">
            <ChevronRight size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <ul>
            {navItems.map((navItem, index) => {
              return (
                <li key={index}>
                  <a
                    href={navItem.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {navItem.icon}
                    {navItem.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;

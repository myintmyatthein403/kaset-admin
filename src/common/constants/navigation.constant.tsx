import {
  Home,
  Briefcase,
  Users,
  FileText,
  Tag,
  HeartHandshake,
  Building,
  User,
  Inbox,
  Calendar,
  Search,
  Settings,
  FileType,
  Shield,
  Music,
  Album,
  Image,
  ImagePlay,
  CircleQuestionMark,
  ListMusic,
  Shirt,
  ChartBarStacked,
  Database,
} from "lucide-react";

export const sidebarGroups = [
  /*{
    label: "General",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Inbox",
        url: "/inbox",
        icon: Inbox,
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Calendar,
      },
      {
        title: "Search",
        url: "/search",
        icon: Search,
      },
    ],
  },*/
  {
    label: "Product Management",
    items: [
      {
        title: "Product",
        url: "/product/products",
        icon: Shirt,
      },
      {
        title: "Product Category",
        url: "/product/product-categories",
        icon: ChartBarStacked,
      },
      {
        title: "Job Types",
        url: "/jobs/types",
        icon: FileType,
      },
      {
        title: "Tags",
        url: "/jobs/tags",
        icon: Tag,
      },
      {
        title: "Benefits",
        url: "/jobs/benefits",
        icon: HeartHandshake,
      },
    ],
  },
  {
    label: "Music Management",
    items: [
      {
        title: "Tracks",
        url: "/music/tracks",
        icon: Music,
      },
      {
        title: "Albums",
        url: "/music/albums",
        icon: Album,
      },
      {
        title: "Genre",
        url: "/music/genres",
        icon: ListMusic,
      },
      {
        title: "Data-Collect",
        url: "/music/data-collect",
        icon: Database
      }
    ],
  },
  /*{
    label: "User Management",
    items: [
      {
        title: "Employers",
        url: "/user-management/employers",
        icon: Building,
      },
      {
        title: "Employees",
        url: "/users/employees",
        icon: Users,
      },
      {
        title: "Admins",
        url: "/users/admins",
        icon: Shield
      },
      {
        title: "My Profile",
        url: "/profile",
        icon: User,
      },
    ],
  },*/
  {
    label: "System",
    items: [
      {
        title: "Setting",
        url: "/setting",
        icon: Settings,
      },
      {
        title: "Logo",
        url: "/setting/logo",
        icon: Image,
      },
      {
        title: "Slide Show",
        url: "/setting/home-page-slide-show",
        icon: ImagePlay
      },
      {
        title: "FAQ",
        url: "/setting/faq",
        icon: CircleQuestionMark
      }
    ],
  },
];

import {
  User,
  Settings,
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
  Link,
  Calendar,
  Home,
  Inbox,
  Search,
  ShoppingBasket,
  Globe
} from "lucide-react";

export const sidebarGroups = [
  {
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
  },
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
        title: "Order",
        url: "/product/orders",
        icon: ShoppingBasket
      }
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
  {
    label: "User Management",
    items: [
      {
        title: "Artists",
        url: "/user-management/artist",
        icon: Shield
      },
      {
        title: "My Profile",
        url: "/profile",
        icon: User,
      },
      {
        title: "Roles",
        url: "/user-management/roles",
        icon: Shield
      }
    ],
  },
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
      },
      {
        title: "Platform",
        url: "/setting/platforms",
        icon: Globe
      },
      {
        title: "Social Link",
        url: "/setting/social-link",
        icon: Link
      }
    ],
  },
];

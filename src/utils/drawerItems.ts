import { DrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PetsIcon from "@mui/icons-material/Pets";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import WebIcon from "@mui/icons-material/Web";
import WorkIcon from "@mui/icons-material/Work";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ArticleIcon from "@mui/icons-material/Article";

import { USER_ROLE } from "@/app/constants/role";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Profile",
      path: `profile`,
      icon: PersonIcon,
    },
    {
      title: "Change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Projects",
          path: `${role}/manage-projects`,
          icon: WebIcon,
        },
        {
          title: "Manage Experience",
          path: `${role}/manage-experience`,
          icon: WorkIcon,
        },
        {
          title: "Manage Skills",
          path: `${role}/manage-skills`,
          icon: AccountTreeIcon,
        },
        {
          title: "Manage Blogs",
          path: `${role}/manage-blogs`,
          icon: ArticleIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenus.push({
        title: "Dashboard",
        path: `${role}`,
        icon: DashboardIcon,
      });
      roleMenus.push({
        title: "Adoption Requests",
        path: `${role}/adoption-requests`,
        icon: ForwardToInboxIcon,
      });
      roleMenus.push({
        title: "Adopted Pets",
        path: `${role}/adopted-pets`,
        icon: PetsIcon,
      });
      break;
    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};

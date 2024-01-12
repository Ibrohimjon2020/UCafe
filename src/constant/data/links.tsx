import InsightsIcon from "@mui/icons-material/Insights";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import GroupsIcon from "@mui/icons-material/Groups";
import RateReviewIcon from "@mui/icons-material/RateReview";

export const navList = [
  {
    id: 1,
    path: "/orders",
    name: "Все заказы",
  },
  {
    id: 2,
    path: "/configure-menu",
    name: "Управление меню",
  },
  {
    id: 3,
    path: "/orders-history",
    name: "История заказов",
  },
];

export const profileList = [
  {
    id: 1,
    path: "/reports",
    name: "Отчеты",
    icon: <InsightsIcon color="primary" />,
  },
  {
    id: 2,
    path: "/expenses",
    name: "Расходы",
    icon: <LocalAtmIcon color="primary" />,
  },
  {
    id: 3,
    path: "/complaints",
    name: "Жалобы",
    icon: <RateReviewIcon color="primary" />,
  },
  {
    id: 4,
    path: "/configure-employee",
    name: "Управление сотрудниками",
    icon: <GroupsIcon color="primary" />,
  },
];

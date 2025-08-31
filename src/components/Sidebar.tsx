// components/Sidebar.tsx
import { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Collapse,
  ListItemButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Home,
  Inbox,
  Settings,
  Dashboard,
  QrCode,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { routes } from "../routes/routes";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = (key: string) =>
    setSubmenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const menuItems = [
    { text: "Home", icon: <Home />, path:routes.homepage },
    {text: "Qr Code", icon: <QrCode />, path:routes.qrcode},
    {
      text: "Dashboard",
      icon: <Dashboard />,
      submenu: [
        { text: "Overview", path: routes.dashboard },
        { text: "Reports", path: "/dashboard/reports" },
      ],
    },
    { text: "Inbox", icon: <Inbox />, path: "/inbox" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 240 : 80,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
          paddingTop: 1,
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", padding: 12 }}>
        {/* <img
          src={isOpen ? logo : shortLogo}
          alt="Logo"
          style={{ height: 48, cursor: "pointer" }}
        /> */}
        <IconButton onClick={toggleMenu}>{isOpen ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
      </div>

      <List>
        {menuItems.map((item) => (
          <div key={item.text}>
            {!item.submenu ? (
              <Tooltip title={item.text} disableHoverListener={isOpen} placement="right">
                <ListItem disablePadding sx={{ px: isOpen ? 0 : 0 }}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    selected={activeTab === item.path}
                    sx={{ px: isOpen ? 2 : 1 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                    {isOpen && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ) : (
              <>
                <Tooltip title={item.text} disableHoverListener={isOpen} placement="right">
                  <ListItem disablePadding sx={{ px: isOpen ? 0 : 0 }}>
                    <ListItemButton onClick={() => toggleSubmenu(item.text)} sx={{ px: isOpen ? 2 : 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                      {isOpen && <ListItemText primary={item.text} />}
                      {isOpen && (submenuOpen[item.text] ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
                <Collapse in={submenuOpen[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem) => (
                      <ListItemButton
                        key={subItem.text}
                        onClick={() => navigate(subItem.path)}
                        selected={activeTab === subItem.path}
                        sx={{ pl: isOpen ? 6 : 3 }}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

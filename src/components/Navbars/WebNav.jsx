import * as React from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import logo from "../../assets/images/logo/logo-white.png";
import { Reorder } from "@mui/icons-material";

const logoStyle = {
  width: "6rem",

  height: "auto",
  cursor: "pointer",
  margin: " 0  2rem 0 0",
};

function WebNav({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      data-aos="fade-down"
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "999px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.735)"
                : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(24px)",
            maxHeight: 40,
            border: "1px solid",
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              ml: "-18px",
              px: 0,
            }}
          >
            <img src={logo} style={logoStyle} alt="logo of sitemark" />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem
                onClick={() => scrollToSection("overview")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary" style={{}}>
                  Overview
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("highlights")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary" style={{}}>
                  Highlights
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("services")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary" style={{}}>
                  Services
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={() => scrollToSection("pricing")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary" style={{}}>
                  Pricing
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("faq")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography variant="body2" color="text.primary" style={{}}>
                  FAQ
                </Typography>
              </MenuItem>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
              component="a"
              target="_blank"
            >
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: { sm: "", md: "none" } }}>
            <Button
              variant="text"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: "30px", p: "4px" }}
            >
              <Reorder style={{ color: "black" }} />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: "60dvw",
                  p: 2,
                  backgroundColor: "background.paper",
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    flexGrow: 1,
                  }}
                ></Box>
                <MenuItem onClick={() => scrollToSection("overview")}>
                  Overview
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("highlights")}>
                  Highlights
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("services")}>
                  Services
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("pricing")}>
                  Pricing
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>
                <Divider />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    component="a"
                    target="_blank"
                    sx={{ width: "100%" }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    target="_blank"
                    sx={{ width: "100%" }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default WebNav;

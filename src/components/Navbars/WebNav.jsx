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
import logo from "../../assets/images/logo/logo.webp";
import { Reorder } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function WebNav({ mode, toggleColorMode }) {
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const w = window.screen.width;

  const logoStyle = {
    width: "5.8rem",
    height: "2.1rem",

    cursor: "pointer",
    margin: w < 901 ? " 0  4rem 0 1rem" : " 0  4rem 0 2rem",
  };

  const scrollToSection = (sectionId) => {
    setActive(sectionId);
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
      <Container maxWidth="xl">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            borderRadius: "10px",
            bgcolor:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.832)"
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
            <img
              src={logo}
              onClick={() => scrollToSection("intro")}
              style={logoStyle}
              alt="logo of sitemark"
            />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <MenuItem
                onClick={() => scrollToSection("overview")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{
                    color: active === "overview" ? "#D81902" : "",
                    fontSize: "1.05rem",
                    borderBottom:
                      active === "overview" ? "1px dashed #d817026d" : "none",
                    letterSpacing: "0.08rem",
                    transition: "all .5s",
                    transform:
                      active === "overview" ? "scale(1.05)" : "scale(1)",
                    marginRight: "0.7rem",
                    fontWeight: "550",
                    backfaceVisibility: "hidden",
                    textTransform: "capitalize",
                  }}
                >
                  Overview
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("services")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{
                    color: active === "services" ? "#D81902" : "",
                    fontSize: "1.05rem",
                    borderBottom:
                      active === "services" ? "1px dashed #d817026d" : "none",
                    letterSpacing: "0.08rem",
                    transition: "all .5s",
                    transform:
                      active === "services" ? "scale(1.05)" : "scale(1)",
                    marginRight: "0.7rem",
                    fontWeight: "550",
                    backfaceVisibility: "hidden",
                    textTransform: "capitalize",
                  }}
                >
                  Services
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection("startwithus")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{
                    color: active === "startwithus" ? "#D81902" : "",
                    fontSize: "1.05rem",
                    borderBottom:
                      active === "startwithus"
                        ? "1px dashed #d817026d"
                        : "none",
                    letterSpacing: "0.08rem",
                    transition: "all .5s",
                    transform:
                      active === "startwithus" ? "scale(1.05)" : "scale(1)",
                    marginRight: "0.7rem",
                    fontWeight: "550",
                    backfaceVisibility: "hidden",
                    textTransform: "capitalize",
                  }}
                >
                  Start with us
                </Typography>
              </MenuItem>{" "}
              <MenuItem
                onClick={() => scrollToSection("contact-us")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{
                    color: active === "contact-us" ? "#D81902" : "",
                    fontSize: "1.05rem",
                    borderBottom:
                      active === "contact-us" ? "1px dashed #d817026d" : "none",
                    letterSpacing: "0.08rem",
                    transition: "all .5s",
                    transform:
                      active === "contact-us" ? "scale(1.05)" : "scale(1)",
                    marginRight: "0.7rem",
                    fontWeight: "550",
                    backfaceVisibility: "hidden",
                    textTransform: "capitalize",
                  }}
                >
                  Contact Us
                </Typography>
              </MenuItem>{" "}
              {/* <MenuItem
                onClick={() => scrollToSection("faq")}
                sx={{ py: "6px", px: "12px" }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{
                    color: active === "faq" ? "#D81902" : "",
                    fontSize: "1.05rem",
                    borderBottom:
                      active === "faq" ? "1px dashed #d817026d" : "none",
                    letterSpacing: "0.08rem",
                    transition: "all .5s",
                    transform: active === "faq" ? "scale(1.05)" : "scale(1)",
                    marginRight: "0.7rem",
                              fontWeight: "550",
                    backfaceVisibility: "hidden",
                    textTransform: "capitalize",
                  }}
                >
                  FAQ
                </Typography>
              </MenuItem> */}
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
              style={{
                backgroundColor: "#ff4800",
                letterSpacing: "0.09rem",
                color: "white",
              }}
            >
              {!isLoggedIn && (
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Sign in
                </Link>
              )}
              {isLoggedIn && !isAdmin && (
                <Link
                  to={"/user-panel/home"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Dashboard
                </Link>
              )}
              {isLoggedIn && isAdmin && (
                <Link
                  to={"/admin-panel/orders"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Dashboard
                </Link>
              )}
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
                <MenuItem onClick={() => scrollToSection("services")}>
                  Services
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("startwithus")}>
                  Start With Us
                </MenuItem>
                <MenuItem onClick={() => scrollToSection("contact-us")}>
                  Contact Us
                </MenuItem>{" "}
                {/* <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem> */}
                <Divider />
                <MenuItem>
                  {" "}
                  {!isLoggedIn && (
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      target="_blank"
                      sx={{ width: "100%" }}
                      style={{
                        backgroundColor: "#ff4800",
                        letterSpacing: "0.09rem",
                        color: "white",
                      }}
                    >
                      <Link
                        to={"/register"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign up
                      </Link>
                    </Button>
                  )}
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    target="_blank"
                    sx={{ width: "100%" }}
                    style={{
                      backgroundColor: "#ff4800",
                      letterSpacing: "0.09rem",
                      color: "white",
                    }}
                  >
                    {!isLoggedIn && (
                      <Link
                        to={"/login"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign in
                      </Link>
                    )}
                    {isLoggedIn && !isAdmin && (
                      <Link
                        to={"/user-panel/home"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Dashboard
                      </Link>
                    )}
                    {isLoggedIn && isAdmin && (
                      <Link
                        to={"/admin-panel/orders"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Dashboard
                      </Link>
                    )}
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

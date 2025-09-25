import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { drawerHeader, gridHeader } from "./custom-drawer.widgets";
import theme from "../../constant/styles/theme";

interface DrawerProps {
  anchor: "left" | "top" | "right" | "bottom";
  open: boolean;
  title?: string;
  drawerWidth?: string;
  drawermargin?: string;
  drawerPadding?: string;
  onClose?: () => void;
  headerStyle?: string;
}

const CustomDrawer = (props: React.PropsWithChildren<DrawerProps>) => {
  const { drawerWidth, drawermargin, drawerPadding } = props;
  const belowLg = useMediaQuery(theme.breakpoints.down("lg")) && !drawerWidth;
  const below768 = useMediaQuery("(max-width:768px)");

  return (
    <Drawer 
      anchor={props.anchor} 
      open={props.open}
      variant="temporary"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        zIndex: 1400, // Higher than AppBar z-index (theme.zIndex.drawer + 1 = 1201)
        '& .MuiDrawer-paper': {
          zIndex: 1400,
          position: 'fixed',
          top: 0,
          height: '100vh',
          width: props.anchor === 'right' || props.anchor === 'left' ? 
            (props.drawerWidth || (belowLg ? '50vw' : '40vw')) : 'auto',
        },
        '& .MuiBackdrop-root': {
          zIndex: 1399, // Slightly lower than drawer but higher than AppBar
        }
      }}
    >
      <Grid
        container
        flexDirection={"column"}
        height={"100%"}
        flexWrap={"nowrap"}
        sx={{ margin: drawermargin }}
      >
        {props.title && (
          <Grid
            container
            sx={{
              ...gridHeader,
              alignItems: "center",
              mt: props.headerStyle,
            }}
          >
            <Grid>
              <Typography 
                sx={{
                  ...drawerHeader,
                  fontSize: "1.25rem",
                  lineHeight: 1.6,
                  letterSpacing: "0.0075em",
                  fontWeight: 600,
                }}
              >
                {props.title}
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={props.onClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
        <Box
          sx={{
            mt: 2,
            flex: 1,
            width: drawerWidth ? drawerWidth : belowLg ? "50vw" : "40vw",
            paddingX: below768
              ? "15px"
              : drawerPadding
                ? drawerPadding
                : "50px",
            overflowX: "hidden",
            overflowY: "auto",
            height: "calc(100vh - 120px)", // Account for header height
          }}
        >
          {props.children}
        </Box>
      </Grid>
    </Drawer>
  );
};

export default CustomDrawer;

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
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
    <Drawer anchor={props.anchor} open={props.open}>
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
            alignItems="center"
            sx={gridHeader}
            mt={props.headerStyle}
          >
            <Grid item>
              <Typography sx={drawerHeader} variant="h6">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={props.onClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
        <Grid
          item
          mt={2}
          flex={1}
          sx={{
            width: drawerWidth ? drawerWidth : belowLg ? "50vw" : "40vw",
            paddingX: below768
              ? "15px"
              : drawerPadding
                ? drawerPadding
                : "50px",
            overflowX: "hidden",
          }}
        >
          {props.children}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CustomDrawer;

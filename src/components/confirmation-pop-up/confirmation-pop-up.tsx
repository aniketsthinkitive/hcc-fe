import { Button, Grid, Typography } from "@mui/material";
import CustomDialog from "../custom-dialog/custom-dialog";

type ConfirmationPopUpProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmationPopUp = (props: ConfirmationPopUpProps) => {
  const { open, onClose, onConfirm, message } = props;
  return (
    <CustomDialog
      width={"400px"}
      title={"Confirm"}
      buttonName={[]}
      open={open}
      onClose={() => onClose()}
    >
      <Grid container flexDirection={"column"} rowGap={2}>
        <Typography variant="inputTitle">
          {message || "Do you really want to go ahead with this operation?"}
        </Typography>
        <Grid
          container
          width={"100%"}
          justifyContent={"flex-end"}
          columnGap={1}
        >
          <Button variant="contained" onClick={() => onConfirm()}>
            <Typography variant="buttonLinkAndField3">{"Confirm"}</Typography>
          </Button>
          <Button variant="outlined" onClick={() => onClose()}>
            <Typography variant="buttonLinkAndField3">{"Cancel"}</Typography>
          </Button>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default ConfirmationPopUp;

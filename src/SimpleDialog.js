import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button } from "@material-ui/core";

export default function SimpleDialog(props) {
  const { onClose, openDialog, name } = props;
  let ans = false;
  const handleClose = () => {
    onClose(ans);
  };

  return (
    <Dialog onClose={handleClose} open={openDialog}>
      <DialogTitle>Are you sure you want to delete { name }?</DialogTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            ans = true;
            handleClose();
          }}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}
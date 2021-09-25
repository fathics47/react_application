import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SimpleDialog from "./SimpleDialog";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box } from "@mui/system";

export default function StudentTable(props){
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  
  async function fetchDetails() {
    axios.get("http://localhost:3001/api/studentDetails").then((res) => {
      if (!(typeof res.data === "string")) {
        setRows(res.data)
      } else {
        alert("Try again later");
      }
    });
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  const columns = [
    { field: "id", headerName: "S No", width: 120 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "mobile",
      headerName: "Mobile No",
      type: "number",
      width: 160,
    },
    {
      field: "skills",
      headerName: "skills",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 100,
    },
    {
      field: "",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const onDelete = () => {
          const id = params["row"]["id"];
          return id;
        };
        return (
          <div>
            <Button
              variant="contained"
              color="success"
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                marginRight: "2rem",
              }}
              onClick={() => {
                props.setUpdate(onDelete());
              }}
            >
              edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDialog(true);
                setId(onDelete());
              }}
              style={{ backgroundColor: "#d32f2f", color: "white" }}
            >
              delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get("http://localhost:3001/api/studentDetails").then((res) => {
      if (!(typeof res.data === "string")) {
        console.log(typeof res.data[0].mobile)
        const newRows = res.data.filter(
          (row) => {
            if (mobile === "") {
              return row.lastName.includes(name) ||
            row.firstName.includes(name)
            }
            if (name === "") {
              return String(row.mobile).includes(mobile);
            }
            return (
              row.lastName.includes(name) ||
              row.firstName.includes(name) ||
              String(row.mobile).includes(mobile)
            ); 
          }
        );
        setRows(newRows);
      } else {
        alert("Try again later");
      }
    }).catch((err) => {console.log(err)});
  }
  const findName = () => {
    if (id === null) {
      return ""
    }
    const select = rows.filter((row) => row.id === id)[0];
    return select?.firstName + " " + select?.lastName;
  }
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Student Details
      </Typography>
      <Box
        component="form"
        onSubmit={handleSearch}
        noValidate
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <TextField
          margin="normal"
          label="name"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          sx={{ marginRight: "2%" }}
        />
        <TextField
          margin="normal"
          label="mobile"
          type="number"
          fullWidth
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%",
            marginTop: "2%",
          }}
        >
          search
        </Button>
        <Button
          onClick={() => {
            setName("");
            setMobile("");
          }}
          variant="contained"
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            marginBottom: "2%",
            marginTop: "2%",
          }}
        >
          Cancel
        </Button>
      </Box>
      <div style={{ width: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
        />
        <SimpleDialog
          openDialog={openDialog}
          name={findName()}
          onClose={(e) => {
            setOpenDialog(false);
            if (e) {
              axios
                .post("http://localhost:3001/api/deleteStudent", { id: id })
                .then((res) => {
                  console.log(res.data);
                  if (res.data === "fail") {
                    alert("Try again later");
                  } else {
                    fetchDetails();
                  }
                });
            }
          }}
        />
      </div>
    </>
  );
};

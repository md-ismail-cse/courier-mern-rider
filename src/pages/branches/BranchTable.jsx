import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const BranchTable = () => {
  // GET BRANCHES
  const [branches, setBranches] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchBranches = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/branches"
      );
      setBranches(data);
      setLoading(true);
    };
    fatchBranches();
  }, [branches]);

  // Data table column heading
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      status: false,
      traderName: false,
    },
    {
      field: "branch",
      headerName: "Branch",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      type: "date",
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
  ];

  return (
    <>
      <div className="dataTable">
        <Box sx={{ width: "100%" }}>
          {laoding ? (
            <DataGrid
              rows={branches}
              getRowId={(row) => row._id}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                  csvOptions: { disableToolbarButton: true },
                  printOptions: { disableToolbarButton: true },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
              disableColumnFilter
              disableDensitySelector
              disableColumnSelector
              disableColumnMenu
            />
          ) : (
            <Loader />
          )}
        </Box>
      </div>
    </>
  );
};

export default BranchTable;

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const PriceTable = () => {
  // GET PRICES
  const [prices, setPrices] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchPrices = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/prices"
      );
      setPrices(data);
      setLoading(true);
    };
    fatchPrices();
  }, [prices]);

  const columns = [
    {
      field: "sendLocation",
      headerName: "Send location",
      width: 150,
    },
    {
      field: "endLocation",
      headerName: "End location",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      valueGetter: (params) => `${params.row.price} ৳`,
    },
  ];

  return (
    <>
      <div className="dataTable">
        <Box sx={{ width: "100%" }}>
          {laoding ? (
            <DataGrid
              rows={prices}
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

export default PriceTable;

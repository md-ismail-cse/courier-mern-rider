import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/title/Title";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Loader from "../../components/loader/Loader";

const CompleteParcels = () => {
  const id = localStorage.getItem("rID");
  // GET PARCELS
  const [parcels, setParcels] = useState([]);
  const [laoding, setLoading] = useState(false);
  useEffect(() => {
    const fatchParcels = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/parcels"
      );
      const newParcels = data.filter((curData) => {
        return (
          (curData.picRiderID === id || curData.dlvRiderID === id) &&
          curData.status === "Delivered"
        );
      });
      setParcels(newParcels);
      setLoading(true);
    };
    fatchParcels();
  }, [parcels, id]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="tableLink">
            <Link to={"/parcels/" + params.row._id}>{params.row._id}</Link>
          </div>
        );
      },
    },
    {
      field: "customerName",
      headerName: "Customer",
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "weight",
      headerName: "Weight",
      valueGetter: (params) => `${params.row.weight} kg`,
    },
    {
      field: "totalPrice",
      headerName: "Total price",
      valueGetter: (params) => `${params.row.totalPrice} ৳`,
    },
    {
      field: "payment",
      headerName: "Payment",
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return <span className={params.row.status}>{params.row.status}</span>;
      },
    },
    {
      field: "recName",
      headerName: "Rec_name",
    },
    {
      field: "recPhone",
      headerName: "Rec_phone",
    },
    {
      field: "recEmail",
      headerName: "Rec_email",
    },
    {
      field: "recAddress",
      headerName: "Rec_address",
    },
    {
      field: "sendLocation",
      headerName: "Send",
    },
    {
      field: "endLocation",
      headerName: "End",
    },
    {
      field: "orderDate",
      headerName: "orderDate",
      type: "date",
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "acceptTime",
      headerName: "acpDate",
      renderCell: (params) => {
        return (
          <>
            {params.row.acceptTime
              ? new Date(params.row.acceptTime).toLocaleString()
              : "NaN"}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="tableAction">
            <Link to={"/parcels/" + params.row._id} className="view">
              <i className="ri-eye-fill"></i>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="completeParcels">
        <Title title="Complete Parcels" />
        <div className="content">
          <div className="dataTable">
            <Box sx={{ width: "100%" }}>
              {laoding ? (
                <DataGrid
                  rows={parcels}
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
        </div>
      </div>
    </>
  );
};

export default CompleteParcels;

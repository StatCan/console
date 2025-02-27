// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  IconButton,
} from "@material-ui/core";
import get from "lodash/get";
import GroupIcon from "@material-ui/icons/Group";
import { AddIcon, CreateIcon } from "../../../icons";
import { setErrorSnackMessage } from "../../../actions";
import {
  actionsTray,
  containerForHeader,
  searchField,
} from "../Common/FormComponents/common/styleLibrary";
import {
  IDirectCSIDrives,
  IDirectCSIFormatResItem,
  IDrivesResponse,
} from "./types";
import { niceBytes } from "../../../common/utils";
import { selectDrive } from "./actions";
import { ErrorResponseHandler } from "../../../common/types";
import api from "../../../common/api";
import TableWrapper from "../Common/TableWrapper/TableWrapper";
import FormatDrives from "./FormatDrives";
import FormatErrorsResult from "./FormatErrorsResult";
import RefreshIcon from "../../../icons/RefreshIcon";
import SearchIcon from "../../../icons/SearchIcon";

interface IDirectCSIMain {
  classes: any;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  selectDrive: typeof selectDrive;
}

const styles = (theme: Theme) =>
  createStyles({
    headerLabel: {
      fontSize: 22,
      fontWeight: 600,
      color: "#000",
      marginTop: 4,
    },
    tableWrapper: {
      height: "calc(100vh - 275px)",
    },
    notAvailableNotice: {
      border: "#EAEDEE 1px solid",
      backgroundColor: "#FFF",
      display: "flex",
      padding: "19px 38px",
      overflow: "auto",
      position: "relative",
      boxShadow: "none",
      minHeight: 200,
      overflowY: "scroll",
      borderRadius: 3,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 275px)",
      fontSize: 18,
      fontWeight: 600,
      textAlign: "center",
    },
    linkItem: {
      display: "default",
      color: "#072F51",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
        color: "#000",
      },
    },
    ...actionsTray,
    ...searchField,
    ...containerForHeader(theme.spacing(4)),
  });

const DirectCSIMain = ({
  classes,
  selectDrive,
  setErrorSnackMessage,
}: IDirectCSIMain) => {
  const [records, setRecords] = useState<IDirectCSIDrives[]>([]);
  const [filter, setFilter] = useState("");
  const [checkedDrives, setCheckedDrives] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formatOpen, setFormatOpen] = useState<boolean>(false);
  const [formatAll, setFormatAll] = useState<boolean>(false);
  const [formatErrorsResult, setFormatErrorsResult] = useState<
    IDirectCSIFormatResItem[]
  >([]);
  const [formatErrorsOpen, setFormatErrorsOpen] = useState<boolean>(false);
  const [drivesToFormat, setDrivesToFormat] = useState<string[]>([]);
  const [notAvailable, setNotAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      api
        .invoke("GET", "/api/v1/direct-csi/drives")
        .then((res: IDrivesResponse) => {
          let drives: IDirectCSIDrives[] = get(res, "drives", []);

          if (!drives) {
            drives = [];
          }

          drives = drives.map((item) => {
            const newItem = { ...item };
            newItem.joinName = `${newItem.node}:${newItem.drive}`;

            return newItem;
          });

          drives.sort((d1, d2) => {
            if (d1.drive > d2.drive) {
              return 1;
            }

            if (d1.drive < d2.drive) {
              return -1;
            }

            return 0;
          });

          setRecords(drives);
          setLoading(false);
          setNotAvailable(false);
        })
        .catch((err: ErrorResponseHandler) => {
          setLoading(false);
          setNotAvailable(true);
        });
    }
  }, [loading, setErrorSnackMessage, notAvailable]);

  const formatAllDrives = () => {
    const allDrives = records.map((item) => {
      return `${item.node}:${item.drive}`;
    });
    setFormatAll(true);
    setDrivesToFormat(allDrives);
    setFormatOpen(true);
  };

  const formatSingleUnit = (driveID: string) => {
    const selectedUnit = [driveID];
    setDrivesToFormat(selectedUnit);
    setFormatAll(false);
    setFormatOpen(true);
  };

  const formatSelectedDrives = () => {
    if (checkedDrives.length > 0) {
      setDrivesToFormat(checkedDrives);
      setFormatAll(false);
      setFormatOpen(true);
    }
  };

  const selectionChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetD = e.target;
    const value = targetD.value;
    const checked = targetD.checked;

    let elements: string[] = [...checkedDrives]; // We clone the checkedDrives array

    if (checked) {
      // If the user has checked this field we need to push this to checkedDrivesList
      elements.push(value);
    } else {
      // User has unchecked this field, we need to remove it from the list
      elements = elements.filter((element) => element !== value);
    }

    setCheckedDrives(elements);

    return elements;
  };

  const closeFormatModal = (
    refresh: boolean,
    errorsList: IDirectCSIFormatResItem[]
  ) => {
    setFormatOpen(false);
    if (refresh) {
      // Errors are present, we trigger the modal box to show these changes.
      if (errorsList && errorsList.length > 0) {
        setFormatErrorsResult(errorsList);
        setFormatErrorsOpen(true);
      }
      setLoading(true);
      setCheckedDrives([]);
    }
  };

  const tableActions = [
    {
      type: "format",
      onClick: formatSingleUnit,
      sendOnlyId: true,
    },
  ];

  const filteredRecords: IDirectCSIDrives[] = records.filter((elementItem) =>
    elementItem.drive.includes(filter)
  );

  return (
    <Fragment>
      {formatOpen && (
        <FormatDrives
          closeFormatModalAndRefresh={closeFormatModal}
          deleteOpen={formatOpen}
          allDrives={formatAll}
          drivesToFormat={drivesToFormat}
        />
      )}

      {formatErrorsOpen && (
        <FormatErrorsResult
          errorsList={formatErrorsResult}
          open={formatErrorsOpen}
          onCloseFormatErrorsList={() => {
            setFormatErrorsOpen(false);
          }}
        />
      )}
      <h1 className={classes.sectionTitle}>Drives</h1>
      <Grid item xs={12} className={classes.actionsTray}>
        <TextField
          placeholder="Search Drives"
          className={classes.searchField}
          id="search-resource"
          label=""
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          disabled={notAvailable}
        />
        <IconButton
          color="primary"
          aria-label="Refresh Tenant List"
          component="span"
          onClick={() => {
            setLoading(true);
          }}
          disabled={notAvailable}
        >
          <RefreshIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GroupIcon />}
          disabled={checkedDrives.length <= 0 || notAvailable}
          onClick={formatSelectedDrives}
        >
          Format Selected Drives
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={formatAllDrives}
          disabled={notAvailable}
        >
          Format All Drives
        </Button>
      </Grid>

      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
        {notAvailable && !loading ? (
          <div className={classes.notAvailableNotice}>
            To manage locally attached drives you need to install direct-csi,
            for more information
            <br />
            please follow this
            <a
              href="https://github.com/minio/direct-csi"
              rel="noreferrer"
              target="_blank"
              className={classes.linkItem}
            >
              Link
            </a>
          </div>
        ) : (
          <TableWrapper
            itemActions={tableActions}
            columns={[
              {
                label: "Drive",
                elementKey: "drive",
              },
              {
                label: "Capacity",
                elementKey: "capacity",
                renderFunction: niceBytes,
              },
              {
                label: "Allocated",
                elementKey: "allocated",
                renderFunction: niceBytes,
              },
              {
                label: "Volumes",
                elementKey: "volumes",
              },
              {
                label: "Node",
                elementKey: "node",
              },
              {
                label: "Status",
                elementKey: "status",
              },
            ]}
            onSelect={selectionChanged}
            selectedItems={checkedDrives}
            isLoading={loading}
            records={filteredRecords}
            customPaperHeight={classes.tableWrapper}
            entityName="Drives"
            idField="joinName"
          />
        )}
      </Grid>
    </Fragment>
  );
};

const mapDispatchToProps = {
  setErrorSnackMessage,
  selectDrive,
};

const connector = connect(null, mapDispatchToProps);

export default withStyles(styles)(connector(DirectCSIMain));

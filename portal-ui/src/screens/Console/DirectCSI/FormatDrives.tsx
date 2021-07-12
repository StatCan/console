// This file is part of MinIO Kubernetes Cloud
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

import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { setErrorSnackMessage } from "../../../actions";
import { IDirectCSIFormatResItem, IDirectCSIFormatResult } from "./types";
import { ErrorResponseHandler } from "../../../common/types";
import api from "../../../common/api";
import InputBoxWrapper from "../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import PredefinedList from "../Common/FormComponents/PredefinedList/PredefinedList";
import FormSwitchWrapper from "../Common/FormComponents/FormSwitchWrapper/FormSwitchWrapper";
import { Trans, useTranslation } from "react-i18next";

interface IFormatAllDrivesProps {
  closeFormatModalAndRefresh: (
    refresh: boolean,
    formatIssuesList: IDirectCSIFormatResItem[]
  ) => void;
  deleteOpen: boolean;
  allDrives: boolean;
  drivesToFormat: string[];
  setErrorSnackMessage: typeof setErrorSnackMessage;
}

const FormatDrives = ({
  closeFormatModalAndRefresh,
  deleteOpen,
  allDrives,
  drivesToFormat,
  setErrorSnackMessage,
}: IFormatAllDrivesProps) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [formatAll, setFormatAll] = useState<string>("");
  const [force, setForce] = useState<boolean>(false);

  const { t } = useTranslation("directCSI");

  const removeRecord = () => {
    if (deleteLoading) {
      return;
    }
    setDeleteLoading(true);
    api
      .invoke("POST", `/api/v1/direct-csi/drives/format`, {
        drives: drivesToFormat,
        force,
      })
      .then((res: IDirectCSIFormatResult) => {
        setDeleteLoading(false);
        closeFormatModalAndRefresh(true, res.formatIssuesList);
      })
      .catch((err: ErrorResponseHandler) => {
        setDeleteLoading(false);
        setErrorSnackMessage(err);
      });
  };
  return (
    <Dialog
      open={deleteOpen}
      onClose={() => {
        closeFormatModalAndRefresh(false, []);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {allDrives
          ? t("formatAllDrives")
          : t("formatDrive", { count: drivesToFormat.length })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!allDrives && (
            <Fragment>
              <PredefinedList
                label={t("selectedDrive", { count: drivesToFormat.length })}
                content={drivesToFormat.join(", ")}
              />
              <br />
            </Fragment>
          )}
          <Grid item xs={12}>
            <FormSwitchWrapper
              value="force"
              id="force"
              name="force"
              checked={force}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setForce(event.target.checked);
              }}
              label={t("forceFormat")}
              indicatorLabels={[t("yes"), t("no")]}
            />
          </Grid>
          {allDrives ? (
            <Trans i18nKey="directCSI:formatAllDrivesConfirmation">
              Are you sure you want to format <strong>All</strong> drives?
            </Trans>
          ) : (
            t("formatDriveConfirmation", { count: drivesToFormat.length })
          )}
          <br />
          <br />
          <strong>{t("formatWarning")}</strong>
          <br />
          <br />
          <Trans i18nKey="directCSI:formatConfirmation">
            To continue please type <b>{{ msg: "YES, PROCEED" }}</b> in the box.
          </Trans>
          <Grid item xs={12}>
            <InputBoxWrapper
              id="format-confirm"
              name="format-confirm"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormatAll(event.target.value);
              }}
              label=""
              value={formatAll}
            />
          </Grid>
        </DialogContentText>
      </DialogContent>
      {deleteLoading && <LinearProgress />}
      <DialogActions>
        <Button
          onClick={() => {
            closeFormatModalAndRefresh(false, []);
          }}
          color="primary"
          disabled={deleteLoading}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={removeRecord}
          color="secondary"
          autoFocus
          disabled={formatAll !== "YES, PROCEED"}
        >
          {t("formatDrive", { count: drivesToFormat.length })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  setErrorSnackMessage,
};

const connector = connect(null, mapDispatchToProps);

export default connector(FormatDrives);

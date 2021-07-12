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

import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import { BucketList } from "../types";
import { setErrorSnackMessage } from "../../../../actions";
import { ErrorResponseHandler } from "../../../../common/types";
import api from "../../../../common/api";
import { Trans, useTranslation } from "react-i18next";

interface IDeleteBucketProps {
  closeDeleteModalAndRefresh: (refresh: boolean) => void;
  deleteOpen: boolean;
  selectedBucket: string;
  setErrorSnackMessage: typeof setErrorSnackMessage;
}

const DeleteBucket = ({
  closeDeleteModalAndRefresh,
  deleteOpen,
  selectedBucket,
  setErrorSnackMessage,
}: IDeleteBucketProps) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { t } = useTranslation("listBuckets");

  const removeRecord = () => {
    if (!deleteLoading) {
      setDeleteLoading(true);

      api
        .invoke("DELETE", `/api/v1/buckets/${selectedBucket}`, {
          name: selectedBucket,
        })
        .then((res: BucketList) => {
          setDeleteLoading(false);
          closeDeleteModalAndRefresh(true);
        })
        .catch((err: ErrorResponseHandler) => {
          setDeleteLoading(false);
          setErrorSnackMessage(err);
        });
    }
  };

  return (
    <Dialog
      open={deleteOpen}
      onClose={() => {
        closeDeleteModalAndRefresh(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t("deleteBucket")}</DialogTitle>
      <DialogContent>
        {deleteLoading && <LinearProgress />}
        <DialogContentText id="alert-dialog-description">
          <Trans i18nKey="listBuckets:deleteBucketsDialog">
            Are you sure you want to delete bucket
            <b>{{ selectedBucket }}</b>? <br />A bucket can only be deleted if
            it's empty.
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            closeDeleteModalAndRefresh(false);
          }}
          color="primary"
          disabled={deleteLoading}
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={() => {
            removeRecord();
          }}
          color="secondary"
          autoFocus
        >
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  setErrorSnackMessage,
};

const connector = connect(null, mapDispatchToProps);

export default connector(DeleteBucket);

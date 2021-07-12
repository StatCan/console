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

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import api from "../../../../common/api";
import { IPodListElement } from "../ListTenants/types";
import InputBoxWrapper from "../../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { setErrorSnackMessage } from "../../../../actions";
import { ErrorResponseHandler } from "../../../../common/types";
import { Trans, useTranslation } from "react-i18next";

interface IDeletePod {
  deleteOpen: boolean;
  selectedPod: IPodListElement;
  closeDeleteModalAndRefresh: (refreshList: boolean) => any;
  setErrorSnackMessage: typeof setErrorSnackMessage;
}

const DeletePod = ({
  deleteOpen,
  selectedPod,
  closeDeleteModalAndRefresh,
  setErrorSnackMessage,
}: IDeletePod) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [retypePod, setRetypePod] = useState("");

  const { t } = useTranslation("tenants");

  useEffect(() => {
    if (deleteLoading) {
      api
        .invoke(
          "DELETE",
          `/api/v1/namespaces/${selectedPod.namespace}/tenants/${selectedPod.tenant}/pods/${selectedPod.name}`
        )
        .then(() => {
          setDeleteLoading(false);
          closeDeleteModalAndRefresh(true);
        })
        .catch((err: ErrorResponseHandler) => {
          setDeleteLoading(false);
          setErrorSnackMessage(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteLoading]);

  const removeRecord = () => {
    if (retypePod !== selectedPod.name) {
      setErrorSnackMessage({
        errorMessage: t("tenantNameErr"),
        detailedError: "",
      });
      return;
    }
    setDeleteLoading(true);
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
      <DialogTitle id="alert-dialog-title">{t("deletePod")}</DialogTitle>
      <DialogContent>
        {deleteLoading && <LinearProgress />}
        <DialogContentText id="alert-dialog-description">
          <Trans i18nKey="tenants:deletePodConfirmation">
            To continue please type <b>{{selectedPod: selectedPod.name}}</b> in the box.
          </Trans>
          <Grid item xs={12}>
            <InputBoxWrapper
              id="retype-pod"
              name="retype-pod"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRetypePod(event.target.value);
              }}
              label=""
              value={retypePod}
            />
          </Grid>
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
          onClick={removeRecord}
          color="secondary"
          autoFocus
          disabled={retypePod !== selectedPod.name}
        >
          {t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const connector = connect(null, {
  setErrorSnackMessage,
});

export default connector(DeletePod);

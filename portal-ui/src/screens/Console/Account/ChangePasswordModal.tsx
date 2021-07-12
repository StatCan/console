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
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import ModalWrapper from "../Common/ModalWrapper/ModalWrapper";
import Grid from "@material-ui/core/Grid";
import InputBoxWrapper from "../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import { Button, LinearProgress } from "@material-ui/core";
import {
  actionsTray,
  containerForHeader,
  modalBasic,
} from "../Common/FormComponents/common/styleLibrary";
import { ChangePasswordRequest } from "../Buckets/types";
import { setModalErrorSnackMessage } from "../../../actions";
import { ErrorResponseHandler } from "../../../common/types";
import api from "../../../common/api";
import { useTranslation } from "react-i18next";

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      textAlign: "right",
    },
    ...actionsTray,
    ...modalBasic,
    ...containerForHeader(theme.spacing(4)),
  });

interface IChangePasswordProps {
  classes: any;
  open: boolean;
  closeModal: () => void;
  setModalErrorSnackMessage: typeof setModalErrorSnackMessage;
}

const ChangePassword = ({
  classes,
  open,
  closeModal,
  setModalErrorSnackMessage,
}: IChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [reNewPassword, setReNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("accounts");

  const changePassword = (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== reNewPassword) {
      setModalErrorSnackMessage({
        errorMessage: t("newPasswordsMatchError"),
        detailedError: "",
      });
      return;
    }

    if (newPassword.length < 8) {
      setModalErrorSnackMessage({
        errorMessage: t("minPasswordLengthError"),
        detailedError: "",
      });
      return;
    }

    if (loading) {
      return;
    }
    setLoading(true);

    let request: ChangePasswordRequest = {
      current_secret_key: currentPassword,
      new_secret_key: newPassword,
    };

    api
      .invoke("POST", "/api/v1/account/change-password", request)
      .then((res) => {
        setLoading(false);
        setNewPassword("");
        setReNewPassword("");
        setCurrentPassword("");
        closeModal();
      })
      .catch((err: ErrorResponseHandler) => {
        setLoading(false);
        setNewPassword("");
        setReNewPassword("");
        setCurrentPassword("");
        setModalErrorSnackMessage(err);
      });
  };

  return open ? (
    <ModalWrapper
      title={t("changePassword")}
      modalOpen={open}
      onClose={() => {
        setNewPassword("");
        setReNewPassword("");
        setCurrentPassword("");
        closeModal();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          changePassword(e);
        }}
      >
        <Grid container>
          <Grid item xs={12} className={classes.formScrollable}>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="current-password"
                name="current-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCurrentPassword(event.target.value);
                }}
                label={t("currentPassword")}
                type="password"
                value={currentPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="new-password"
                name="new-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(event.target.value);
                }}
                label={t("newPassword")}
                type="password"
                value={newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="re-new-password"
                name="re-new-password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setReNewPassword(event.target.value);
                }}
                label={t("typeNewPasswordAgain")}
                type="password"
                value={reNewPassword}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                loading ||
                !(
                  currentPassword.length > 0 &&
                  newPassword.length > 0 &&
                  reNewPassword.length > 0
                )
              }
            >
              {t("save")}
            </Button>
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          )}
        </Grid>
      </form>
    </ModalWrapper>
  ) : null;
};

const connector = connect(null, {
  setModalErrorSnackMessage,
});

export default withStyles(styles)(connector(ChangePassword));

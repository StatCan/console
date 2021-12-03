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
import { connect } from "react-redux";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { modalBasic } from "../Common/FormComponents/common/styleLibrary";
import { setModalErrorSnackMessage } from "../../../actions";
import { ErrorResponseHandler } from "../../../common/types";
import api from "../../../common/api";
import GroupsSelectors from "./GroupsSelectors";
import ModalWrapper from "../Common/ModalWrapper/ModalWrapper";
import PredefinedList from "../Common/FormComponents/PredefinedList/PredefinedList";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

interface IAddToGroup {
  open: boolean;
  checkedUsers: any;
  closeModalAndRefresh: any;
  classes: any;
  setModalErrorSnackMessage: typeof setModalErrorSnackMessage;
}

const styles = (theme: Theme) =>
  createStyles({
    strongText: {
      fontWeight: 700,
    },
    keyName: {
      marginLeft: 5,
    },
    buttonContainer: {
      textAlign: "right",
    },
    ...modalBasic,
  });

const BulkAddToGroup = ({
  open,
  checkedUsers,
  closeModalAndRefresh,
  classes,
  setModalErrorSnackMessage,
}: IAddToGroup) => {
  const { t } = useTranslation("users");
  
  //Local States
  const [saving, isSaving] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  //Effects
  useEffect(() => {
    if (saving) {
      if (selectedGroups.length > 0) {
        api
          .invoke("PUT", "/api/v1/users-groups-bulk", {
            groups: selectedGroups,
            users: checkedUsers,
          })
          .then(() => {
            isSaving(false);
            setAccepted(true);
          })
          .catch((err: ErrorResponseHandler) => {
            isSaving(false);
            setModalErrorSnackMessage(err);
          });
      } else {
        isSaving(false);
        setModalErrorSnackMessage({
          errorMessage: i18n.t("users:minAssignGroupErr"),
          detailedError: "",
        });
      }
    }
  }, [
    saving,
    isSaving,
    closeModalAndRefresh,
    selectedGroups,
    checkedUsers,
    setModalErrorSnackMessage,
  ]);

  //Fetch Actions
  const setSaving = (event: React.FormEvent) => {
    event.preventDefault();

    isSaving(true);
  };

  const resetForm = () => {
    setSelectedGroups([]);
  };

  return (
    <ModalWrapper
      modalOpen={open}
      onClose={() => {
        closeModalAndRefresh(accepted);
      }}
      title={
        accepted
          ? t("selectedUsersAdded")
          : t("addUsersToGroup")
      }
    >
      {accepted ? (
        <React.Fragment>
          <Grid container>
            <PredefinedList
              label={t("groups")}
              content={selectedGroups.join(", ")}
            />
            <PredefinedList label={t("users")} content={checkedUsers.join(", ")} />
          </Grid>
          <br />
          <br />
          <br />
        </React.Fragment>
      ) : (
        <form noValidate autoComplete="off" onSubmit={setSaving}>
          <Grid container>
            <Grid item xs={12} className={classes.formScrollable}>
              <PredefinedList
                label={t("selectedUsers")}
                content={checkedUsers.join(", ")}
              />
              <Grid item xs={12}>
                <br />
              </Grid>
              <Grid item xs={12}>
                <GroupsSelectors
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer}>
              <button
                type="button"
                color="primary"
                className={classes.clearButton}
                onClick={resetForm}
              >
                {t("clear")}
              </button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={saving || selectedGroups.length < 1}
              >
                {t("save")}
              </Button>
            </Grid>
            {saving && (
              <Grid item xs={12}>
                <LinearProgress />
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </ModalWrapper>
  );
};

const mapDispatchToProps = {
  setModalErrorSnackMessage,
};

const connector = connect(null, mapDispatchToProps);

export default withStyles(styles)(connector(BulkAddToGroup));

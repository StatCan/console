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

import React from "react";
import get from "lodash/get";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { NewServiceAccount } from "./types";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";

const styles = (theme: Theme) =>
  createStyles({
    warningBlock: {
      color: "red",
    },
    buttonContainer: {
      textAlign: "right",
    },
    credentialsPanel: {
      overflowY: "auto",
      maxHeight: 350,
    },
  });

interface ICredentialsPromptProps {
  classes: any;
  newServiceAccount: NewServiceAccount | null;
  open: boolean;
  entity: string;
  closeModal: () => void;
}

const download = (filename: string, text: string) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const CredentialsPrompt = ({
  classes,
  newServiceAccount,
  open,
  closeModal,
  entity,
}: ICredentialsPromptProps) => {
  const { t } = useTranslation("common");
  if (!newServiceAccount) {
    return null;
  }

  const consoleCreds = get(newServiceAccount, "console", null);
  const idp = get(newServiceAccount, "idp", false);

  return (
    <ModalWrapper
      modalOpen={open}
      onClose={() => {
        closeModal();
      }}
      title={t("newEntityCreated", { entity: `${entity}` })}
    >
      <React.Fragment>
        <Grid container>
          <Grid item xs={12} className={classes.formScrollable}>
            {t("newEntityDetails", { entity: `${entity}` })}
            {!idp && consoleCreds && (
              <React.Fragment>
                <Grid item xs={12} className={classes.credentialsPanel}>
                  <strong>{t("consoleCreds")}</strong>
                  {Array.isArray(consoleCreds) &&
                    consoleCreds.map((credentialsPair, index) => {
                      return (
                        <ul key={`creds-item-${index.toString()}`}>
                          <li>
                            <b>{t("accessKeyColon")}</b>{" "}
                            {credentialsPair.accessKey}
                          </li>
                          <li>
                            <b>{t("secretKeyColon")}</b>{" "}
                            {credentialsPair.secretKey}
                          </li>
                        </ul>
                      );
                    })}
                  {!Array.isArray(consoleCreds) && (
                    <ul>
                      <li>
                        <b>{t("accessKeyColon")}</b> {consoleCreds.accessKey}
                      </li>
                      <li>
                        <b>{t("secretKeyColon")}</b> {consoleCreds.secretKey}
                      </li>
                    </ul>
                  )}
                </Grid>
              </React.Fragment>
            )}
            {idp ? (
              <Typography
                component="p"
                variant="body1"
                className={classes.warningBlock}
              >
                {t("pleaseLoginVia")}
              </Typography>
            ) : (
              <Typography
                component="p"
                variant="body1"
                className={classes.warningBlock}
              >
                {t("oneTimeSecret")}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            {!idp && (
              <Button
                onClick={() => {
                  let consoleExtras = {};

                  if (consoleCreds) {
                    if (!Array.isArray(consoleCreds)) {
                      consoleExtras = {
                        console: [
                          {
                            access_key: consoleCreds.accessKey,
                            secret_key: consoleCreds.secretKey,
                          },
                        ],
                      };
                    } else {
                      const cCreds = consoleCreds.map((itemMap) => {
                        return {
                          access_key: itemMap.accessKey,
                          secret_key: itemMap.secretKey,
                        };
                      });

                      consoleExtras = {
                        console: [...cCreds],
                      };
                    }
                  }

                  download(
                    "credentials.json",
                    JSON.stringify({
                      ...consoleExtras,
                    })
                  );
                }}
                color="primary"
              >
                {t("download")}
              </Button>
            )}
            <Button
              onClick={() => {
                closeModal();
              }}
              color="secondary"
              autoFocus
            >
              {t("done")}
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </ModalWrapper>
  );
};

export default withStyles(styles)(CredentialsPrompt);

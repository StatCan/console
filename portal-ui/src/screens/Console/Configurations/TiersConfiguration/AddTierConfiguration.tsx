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

import React, { Fragment, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import api from "../../../../common/api";
import { setErrorSnackMessage } from "../../../../actions";
import {
  modalBasic,
  settingsCommon,
} from "../../Common/FormComponents/common/styleLibrary";
import { ErrorResponseHandler } from "../../../../common/types";
import InputBoxWrapper from "../../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import FileSelector from "../../Common/FormComponents/FileSelector/FileSelector";
import { useTranslation } from "react-i18next";

const styles = (theme: Theme) =>
  createStyles({
    ...modalBasic,
    ...settingsCommon,
    strongText: {
      fontWeight: 700,
    },
    keyName: {
      marginLeft: 5,
    },
    buttonContainer: {
      textAlign: "right",
    },
    customTitle: {
      ...settingsCommon.customTitle,
      marginTop: 0,
    },
    settingsFormContainer: {
      ...settingsCommon.settingsFormContainer,
      height: "calc(100vh - 422px)",
    },
  });

interface IAddNotificationEndpointProps {
  saveAndRefresh: any;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  classes: any;
  type: string;
}

const AddTierConfiguration = ({
  saveAndRefresh,
  classes,
  setErrorSnackMessage,
  type,
}: IAddNotificationEndpointProps) => {
  const { t } = useTranslation("configurations");

  //Local States
  const [saving, setSaving] = useState<boolean>(false);

  // Form Items
  const [name, setName] = useState<string>("");
  const [endpoint, setEndpoint] = useState<string>("");
  const [bucket, setBucket] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [storageClass, setStorageClass] = useState<string>("");

  const [accessKey, setAccessKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");

  const [creds, setCreds] = useState<string>("");
  const [encodedCreds, setEncodedCreds] = useState<string>("");

  const [accountName, setAccountName] = useState<string>("");
  const [accountKey, setAccountKey] = useState<string>("");

  const [titleSelection, setTitleSelection] = useState<string>("");

  // Validations
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [nameInputError, setNameInputError] = useState<string>("");

  // Extra validation functions

  const validName = useCallback(() => {
    const patternAgainst = /^[A-Z0-9-_]+$/; // Only allow uppercase, numbers, dashes and underscores
    if (patternAgainst.test(name)) {
      setNameInputError("");
      return true;
    }

    setNameInputError(t("nameErr"));
    return false;
  }, [name]);

  //Effects

  useEffect(() => {
    if (saving) {
      let request = {};
      let fields = {
        name,
        endpoint,
        bucket,
        prefix,
        region,
      };

      let tierType = type;

      if (type === "minio") {
        tierType = "s3";
      }

      switch (type) {
        case "minio":
        case "s3":
          request = {
            s3: {
              ...fields,
              accesskey: accessKey,
              secretkey: secretKey,
              storageclass: storageClass,
            },
          };
          break;
        case "gcs":
          request = {
            gcs: {
              ...fields,
              creds: encodedCreds,
            },
          };
          break;
        case "azure":
          request = {
            azure: {
              ...fields,
              accountname: accountName,
              accountkey: accountKey,
            },
          };
      }

      let payload = {
        type: tierType,
        ...request,
      };

      api
        .invoke("POST", `/api/v1/admin/tiers`, payload)
        .then(() => {
          setSaving(false);
          saveAndRefresh();
        })
        .catch((err: ErrorResponseHandler) => {
          setSaving(false);
          setErrorSnackMessage(err);
        });
    }
  }, [
    accessKey,
    accountKey,
    accountName,
    bucket,
    encodedCreds,
    endpoint,
    name,
    prefix,
    region,
    saveAndRefresh,
    saving,
    secretKey,
    setErrorSnackMessage,
    storageClass,
    type,
  ]);

  useEffect(() => {
    let valid = true;
    if (type === "") {
      valid = false;
    }
    if (name === "" || !validName()) {
      valid = false;
    }
    if (endpoint === "") {
      valid = false;
    }
    if (bucket === "") {
      valid = false;
    }
    if (prefix === "") {
      valid = false;
    }
    if (region === "") {
      valid = false;
    }

    if (type === "s3" || type === "minio") {
      if (accessKey === "") {
        valid = false;
      }
      if (secretKey === "") {
        valid = false;
      }
    }

    if (type === "gcs") {
      if (encodedCreds === "") {
        valid = false;
      }
    }

    if (type === "azure") {
      if (accountName === "") {
        valid = false;
      }
      if (accountKey === "") {
        valid = false;
      }
    }

    setIsFormValid(valid);
  }, [
    accessKey,
    accountKey,
    accountName,
    bucket,
    encodedCreds,
    endpoint,
    isFormValid,
    name,
    prefix,
    region,
    secretKey,
    storageClass,
    type,
    validName,
  ]);

  useEffect(() => {
    switch (type) {
      case "gcs":
        setEndpoint("https://storage.googleapis.com/");
        setTitleSelection("Google Cloud");
        break;
      case "s3":
        setEndpoint("https://s3.amazonaws.com");
        setTitleSelection("Amazon S3");
        break;
      case "azure":
        setEndpoint("http://blob.core.windows.net");
        setTitleSelection("Azure");
        break;
      case "minio":
        setEndpoint("");
        setTitleSelection("MinIO");
    }
  }, [type]);

  //Fetch Actions
  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
  };

  // Input actions
  const updateTierName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toUpperCase());
  };

  return (
    <Fragment>
      <form noValidate onSubmit={submitForm}>
        <Grid item xs={12} className={classes.customTitle}>
          {t("addTierConfig", { titleSelection })}
        </Grid>
        <Grid item xs={12} className={classes.settingsFormContainer}>
          <Grid container>
            {type !== "" && (
              <Fragment>
                <InputBoxWrapper
                  id="name"
                  name="name"
                  label={t("name")}
                  placeholder={t("enterNameExample")}
                  value={name}
                  onChange={updateTierName}
                  error={nameInputError}
                />
                <InputBoxWrapper
                  id="endpoint"
                  name="endpoint"
                  label={t("endpoint")}
                  placeholder={t("enterEndpoint")}
                  value={endpoint}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEndpoint(e.target.value);
                  }}
                />
                {(type === "s3" || type === "minio") && (
                  <Fragment>
                    <InputBoxWrapper
                      id="accessKey"
                      name="accessKey"
                      label={t("accessKey")}
                      placeholder={t("enterAccessKey")}
                      value={accessKey}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAccessKey(e.target.value);
                      }}
                    />
                    <InputBoxWrapper
                      id="secretKey"
                      name="secretKey"
                      label={t("secretKey")}
                      placeholder={t("enterSecretKey")}
                      value={secretKey}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSecretKey(e.target.value);
                      }}
                    />
                  </Fragment>
                )}
                {type === "gcs" && (
                  <Fragment>
                    <FileSelector
                      accept=".json"
                      id="creds"
                      label={t("creds")}
                      name="creds"
                      onChange={(encodedValue, fileName) => {
                        setEncodedCreds(encodedValue);
                        setCreds(fileName);
                      }}
                      value={creds}
                    />
                  </Fragment>
                )}
                {type === "azure" && (
                  <Fragment>
                    <InputBoxWrapper
                      id="accountName"
                      name="accountName"
                      label={t("accountName")}
                      placeholder={t("enterAccountName")}
                      value={accountName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAccountName(e.target.value);
                      }}
                    />
                    <InputBoxWrapper
                      id="accountKey"
                      name="accountKey"
                      label={t("accountKey")}
                      placeholder={t("enterAccountkey")}
                      value={accountKey}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAccountKey(e.target.value);
                      }}
                    />
                  </Fragment>
                )}
                <InputBoxWrapper
                  id="bucket"
                  name="bucket"
                  label={t("bucket")}
                  placeholder={t("enterBucket")}
                  value={bucket}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBucket(e.target.value);
                  }}
                />
                <InputBoxWrapper
                  id="prefix"
                  name="prefix"
                  label={t("prefix")}
                  placeholder={t("enterPrefix")}
                  value={prefix}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPrefix(e.target.value);
                  }}
                />
                <InputBoxWrapper
                  id="region"
                  name="region"
                  label={t("region")}
                  placeholder={t("enterRegion")}
                  value={region}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setRegion(e.target.value);
                  }}
                />
                {type === "s3" ||
                  (type === "minio" && (
                    <InputBoxWrapper
                      id="storageClass"
                      name="storageClass"
                      label={t("storageClass")}
                      placeholder={t("enterStorageClass")}
                      value={storageClass}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setStorageClass(e.target.value);
                      }}
                    />
                  ))}
              </Fragment>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.settingsButtonContainer}>
          <Grid item xs={12} className={classes.innerSettingsButtonContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={saving || !isFormValid}
            >
              {t("save")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const mapDispatchToProps = {
  setErrorSnackMessage,
};

const connector = connect(null, mapDispatchToProps);

export default withStyles(styles)(connector(AddTierConfiguration));

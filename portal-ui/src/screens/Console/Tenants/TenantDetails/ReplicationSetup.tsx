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
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { modalBasic } from "../../Common/FormComponents/common/styleLibrary";
import Grid from "@material-ui/core/Grid";
import InputBoxWrapper from "../../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import SelectWrapper from "../../Common/FormComponents/SelectWrapper/SelectWrapper";
import { Button, LinearProgress } from "@material-ui/core";
import ModalWrapper from "../../Common/ModalWrapper/ModalWrapper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { useTranslation } from "react-i18next";

interface IReplicationProps {
  classes: any;
  open: boolean;
  closeModalAndRefresh: (refreshList: boolean) => void;
}

interface IDropDownElements {
  label: string;
  value: string;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonContainer: {
      textAlign: "right",
    },
    multiContainer: {
      display: "flex",
      alignItems: "center" as const,
      justifyContent: "flex-start" as const,
    },
    sizeFactorContainer: {
      marginLeft: 8,
    },
    ...modalBasic,
  });

const ReplicationSetup = ({
  classes,
  open,
  closeModalAndRefresh,
}: IReplicationProps) => {
  const [addSending, setAddSending] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [sourceBucket, setSourceBucket] = useState<string>("");
  const [clusterSelected, setClusterSelected] = useState<string>("");
  const [destinationBucket, setDestinationBucket] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [bucket, setBucket] = useState<string>("");
  const [accessKey, setAccessKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");

  const clustersList: IDropDownElements[] = [];
  const sourceBuckets: IDropDownElements[] = [];
  const destinationBuckets: IDropDownElements[] = [];

  const { t } = useTranslation("tenants");

  return (
    <ModalWrapper
      modalOpen={open}
      title={t("addPool")}
      onClose={() => {
        closeModalAndRefresh(false);
      }}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setAddSending(true);
        }}
      >
        <Grid item xs={12}>
          <SelectWrapper
            label={t("sourceBucket")}
            options={sourceBuckets}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              setSourceBucket(e.target.value as string);
            }}
            value={sourceBucket}
            name="source_bucket"
            id="source_bucket"
          />
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_, newValue: number) => {
              setSelectedTab(newValue);
            }}
            aria-label={t("clusterTabs")}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label={t("localCluster")} />
            <Tab label={t("remoteCluster")} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        {selectedTab === 0 && (
          <React.Fragment>
            <Grid item xs={12}>
              <SelectWrapper
                label={t("cluster")}
                options={clustersList}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  setClusterSelected(e.target.value as string);
                }}
                value={clusterSelected}
                name="cluster"
                id="cluster"
              />
            </Grid>
            <Grid item xs={12}>
              <SelectWrapper
                label={t("destinationBucket")}
                options={destinationBuckets}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                  setDestinationBucket(e.target.value as string);
                }}
                value={destinationBucket}
                name="destination_bucket"
                id="destination_bucket"
              />
            </Grid>
          </React.Fragment>
        )}

        {selectedTab === 1 && (
          <React.Fragment>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="address"
                name="address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAddress(e.target.value);
                }}
                label={t("address")}
                value={address}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="bucket"
                name="bucket"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBucket(e.target.value);
                }}
                label={t("bucket")}
                value={bucket}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="accessKey"
                name="accessKey"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAccessKey(e.target.value);
                }}
                label={t("accessKey")}
                value={accessKey}
              />
            </Grid>
            <Grid item xs={12}>
              <InputBoxWrapper
                id="secretKey"
                name="secretKey"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSecretKey(e.target.value);
                }}
                label={t("secretKey")}
                value={secretKey}
              />
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={addSending}
          >
            {t("save")}
          </Button>
        </Grid>
        {addSending && (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        )}
      </form>
    </ModalWrapper>
  );
};

export default withStyles(styles)(ReplicationSetup);

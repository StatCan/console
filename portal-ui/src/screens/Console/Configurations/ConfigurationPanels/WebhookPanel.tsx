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
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import TableWrapper from "../../Common/TableWrapper/TableWrapper";
import EditConfiguration from "../CustomForms/EditConfiguration";
import SearchIcon from "../../../../icons/SearchIcon";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";

interface IMatchParams {
  isExact: boolean;
  params: any;
  path: string;
}

interface IWebhookPanel {
  match: IMatchParams;
  classes: any;
}

interface IWebhook {
  name: string;
}

const styles = (theme: Theme) =>
  createStyles({
    strongText: {
      fontWeight: 700,
    },
    keyName: {
      marginLeft: 5,
    },
    actionsTray: {
      textAlign: "right",
      "& button": {
        marginLeft: 10,
      },
    },
    searchField: {
      background: "#FFFFFF",
      padding: 12,
      borderRadius: 5,
      boxShadow: "0px 3px 6px #00000012",
    },
    iconText: {
      lineHeight: "24px",
    },
  });

const panels = {
  logger: {
    main: "logger",
    title: i18n.t("configurations:loggerWebhookConfig"),
    modalTitle: i18n.t("configurations:loggerWebhook"),
    apiURL: "",
    configuration: {
      configuration_id: "logger_webhook",
      configuration_label: i18n.t("configurations:loggerWebhook"),
    },
  },
  audit: {
    main: "audit",
    title: i18n.t("configurations:auditWebhookConfig"),
    modalTitle: i18n.t("configurations:auditWebhook"),
    apiURL: "",
    configuration: {
      configuration_id: "audit_webhook",
      configuration_label: i18n.t("configurations:auditWebhook"),
    },
  },
};

const WebhookPanel = ({ match, classes }: IWebhookPanel) => {
  const [addWebhookOpen, setAddWebhookOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [webhooks, setWebhooks] = useState<IWebhook[]>([]);
  const { t } = useTranslation("configurations");

  const pathIn = get(match, "path", "");
  const panelToDisplay = pathIn.split("/");
  const panelData = get(panels, panelToDisplay[2], false);

  if (!panelData) {
    return null;
  }

  const webhooks: IWebhook[] = [];

  const filteredRecords: IWebhook[] = webhooks.filter((elementItem) =>
    elementItem.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const tableActions = [
    {
      type: "edit",
      onClick: () => {},
    },
  ];

  return (
    <React.Fragment>
      {addWebhookOpen && (
        <EditConfiguration
          closeModalAndRefresh={() => {
            setIsLoading(true);
            setAddWebhookOpen(false);
          }}
          selectedConfiguration={panelData.configuration}
        />
      )}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">{panelData.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={12} className={classes.actionsTray}>
          <TextField
            placeholder={t("filter")}
            className={classes.searchField}
            id="search-resource"
            label=""
            onChange={(event) => {
              setFilter(event.target.value);
            }}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setAddWebhookOpen(true);
            }}
          >
            {t("addWebhookConfig")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={12}>
          <TableWrapper
            itemActions={tableActions}
            columns={[{ label: t("name"), elementKey: "name" }]}
            isLoading={isLoading}
            records={filteredRecords}
            entityName={t("webhookConfigs")}
            idField="name"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(WebhookPanel);

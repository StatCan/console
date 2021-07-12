import React, { Fragment } from "react";
import PageHeader from "../Common/PageHeader/PageHeader";
import { Grid } from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { containerForHeader } from "../Common/FormComponents/common/styleLibrary";
import ListTenants from "./ListTenants/ListTenants";
import { useTranslation } from "react-i18next";

interface IConfigurationMain {
  classes: any;
}

const styles = (theme: Theme) =>
  createStyles({
    headerLabel: {
      fontSize: 22,
      fontWeight: 600,
      color: "#000",
      marginTop: 4,
    },
    ...containerForHeader(theme.spacing(4)),
  });

const TenantsMain = ({ classes }: IConfigurationMain) => {
  const { t } = useTranslation("tenants")
  return (
    <Fragment>
      <PageHeader label={t("tenants")} />
      <Grid container>
        <Grid item xs={12} className={classes.container}>
          <ListTenants />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(TenantsMain);

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
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { containerForHeader } from "../../Common/FormComponents/common/styleLibrary";
import { Button, Typography } from "@material-ui/core";
import { niceBytes } from "../../../../common/utils";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { ITenant } from "../ListTenants/types";
import { LicenseInfo } from "../../License/types";
import { useTranslation } from "react-i18next";

interface ISubnetLicenseTenant {
  classes: any;
  tenant: ITenant | null;
  loadingActivateProduct: any;
  loadingLicenseInfo: boolean;
  licenseInfo: LicenseInfo | undefined;
  activateProduct: any;
}

const styles = (theme: Theme) =>
  createStyles({
    paperContainer: {
      padding: "15px 15px 15px 50px",
    },
    licenseInfoValue: {
      textTransform: "none",
      fontSize: 14,
      fontWeight: "bold",
    },
    licenseContainer: {
      position: "relative",
      padding: "20px 52px 0px 28px",
      background: "#032F51",
      boxShadow: "0px 3px 7px #00000014",
      "& h2": {
        color: "#FFF",
        marginBottom: 67,
      },
      "& a": {
        textDecoration: "none",
      },
      "& h3": {
        color: "#FFFFFF",
        marginBottom: "30px",
        fontWeight: "bold",
      },
      "& h6": {
        color: "#FFFFFF !important",
      },
    },
    licenseInfo: { color: "#FFFFFF", position: "relative" },
    licenseInfoTitle: {
      textTransform: "none",
      color: "#BFBFBF",
      fontSize: 11,
    },
    verifiedIcon: {
      width: 96,
      position: "absolute",
      right: 0,
      bottom: 29,
    },
    noUnderLine: {
      textDecoration: "none",
    },
    ...containerForHeader(theme.spacing(4)),
  });

const SubnetLicenseTenant = ({
  classes,
  tenant,
  loadingActivateProduct,
  loadingLicenseInfo,
  licenseInfo,
  activateProduct,
}: ISubnetLicenseTenant) => {
  const { t } = useTranslation("tenants");

  return (
    <Paper
      className={
        tenant && tenant.subnet_license ? classes.licenseContainer : ""
      }
    >
      {tenant && tenant.subnet_license ? (
        <React.Fragment>
          <Grid container className={classes.licenseInfo}>
            <Grid item xs={6}>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.licenseInfoTitle}
              >
                {t("license")}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                className={classes.licenseInfoValue}
              >
                {t("commercialLicense")}
              </Typography>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.licenseInfoTitle}
              >
                {t("organization")}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                className={classes.licenseInfoValue}
              >
                {tenant.subnet_license.organization}
              </Typography>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.licenseInfoTitle}
              >
                {t("registeredCapacity")}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                className={classes.licenseInfoValue}
              >
                {niceBytes(
                  (tenant.subnet_license.storage_capacity * 1099511627776) // 1 Terabyte = 1099511627776 Bytes
                    .toString(10)
                )}
              </Typography>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.licenseInfoTitle}
              >
                {t("expiryDate")}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                className={classes.licenseInfoValue}
              >
                <Moment format="YYYY-MM-DD">
                  {tenant.subnet_license.expires_at}
                </Moment>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.licenseInfoTitle}
              >
                {t("subscriptionPlan")}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                className={classes.licenseInfoValue}
              >
                {tenant.subnet_license.plan}
              </Typography>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                className={classes.licenseInfoTitle}
              >
                {t("requester")}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                className={classes.licenseInfoValue}
              >
                {tenant.subnet_license.email}
              </Typography>
            </Grid>
            <img
              className={classes.verifiedIcon}
              src={"/verified.svg"}
              alt={t("verified")}
            />
          </Grid>
        </React.Fragment>
      ) : (
        !loadingLicenseInfo && (
          <Grid className={classes.paperContainer}>
            {!licenseInfo && (
              <Link
                to={"/license"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={classes.noUnderLine}
              >
                <Button
                  className={classes.licenseButton}
                  variant="contained"
                  color="primary"
                >
                  {t("activateProduct")}
                </Button>
              </Link>
            )}
            {licenseInfo && tenant && (
              <Button
                disabled={loadingActivateProduct}
                className={classes.licenseButton}
                variant="contained"
                color="primary"
                onClick={() => activateProduct(tenant.namespace, tenant.name)}
              >
                {t("attachLicense")}
              </Button>
            )}
          </Grid>
        )
      )}
    </Paper>
  );
};

export default withStyles(styles)(SubnetLicenseTenant);

import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Trans } from "react-i18next";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Trans i18nKey="other:copyright">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          MinIO
        </Link>{" "}
        {{year: new Date().getFullYear()}}
        {"."}
      </Trans>
    </Typography>
  );
}

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../../../common/Title";
import { useTranslation } from "react-i18next";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const { t } = useTranslation("dashboard");
  return (
    <React.Fragment>
      <Title>{t("recentDeposits")}</Title>
      <Typography component="p" variant="h4">
        {t("numForMoney")}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {t("dateDeposit")}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          {t("viewBalance")}
        </Link>
      </div>
    </React.Fragment>
  );
}

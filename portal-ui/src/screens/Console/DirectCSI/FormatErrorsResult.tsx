// This file is part of MinIO Kubernetes Cloud
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

import {
  Button,
  createStyles,
  Grid,
  Theme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import ModalWrapper from "../Common/ModalWrapper/ModalWrapper";
import TableWrapper from "../Common/TableWrapper/TableWrapper";
import { IDirectCSIFormatResItem } from "./types";
import { useTranslation } from "react-i18next";

interface IFormatErrorsProps {
  open: boolean;
  onCloseFormatErrorsList: () => void;
  errorsList: IDirectCSIFormatResItem[];
  classes: any;
}

const styles = (theme: Theme) =>
  createStyles({
    warningBlock: {
      color: "red",
    },
    buttonContainer: {
      textAlign: "right",
    },
    errorsList: {
      height: "calc(100vh - 280px)",
    },
  });

const download = (filename: string, text: string) => {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:application/json;charset=utf-8," + encodeURIComponent(text)
  );
  console.log(filename);
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const FormatErrorsResult = ({
  open,
  onCloseFormatErrorsList,
  errorsList,
  classes,
}: IFormatErrorsProps) => {
  const { t } = useTranslation("directCSI");
  
  return (
    <ModalWrapper
      modalOpen={open}
      title={t("formatErrors")}
      onClose={onCloseFormatErrorsList}
    >
      <Grid container>
        <Grid item xs={12} className={classes.formScrollable}>
          {t("formatCSIdriveErr")}
          <br />
          <TableWrapper
            columns={[
              {
                label: t("node"),
                elementKey: "node",
              },
              { label: t("drive"), elementKey: "drive" },
              { label: t("message"), elementKey: "error" },
            ]}
            entityName={t("formatErrors")}
            idField="drive"
            records={errorsList}
            isLoading={false}
            customPaperHeight={classes.errorsList}
            textSelectable
            noBackground
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            onClick={() => {
              download("csiFormatErrors.json", JSON.stringify([...errorsList]));
            }}
            color="primary"
          >
            {t("download")}
          </Button>
          <Button onClick={onCloseFormatErrorsList} color="secondary" autoFocus>
            {t("done")}
          </Button>
        </Grid>
      </Grid>
    </ModalWrapper>
  );
};

export default withStyles(styles)(FormatErrorsResult);

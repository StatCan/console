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
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { widgetCommon } from "../../../Common/FormComponents/common/styleLibrary";
import { IDataSRep } from "./types";
import { connect } from "react-redux";
import { setErrorSnackMessage } from "../../../../../actions";
import { IDashboardPanel } from "../types";
import { widgetDetailsToPanel } from "../utils";
import { CircularProgress } from "@material-ui/core";
import { ErrorResponseHandler } from "../../../../../common/types";
import api from "../../../../../common/api";

interface ISingleRepWidget {
  classes: any;
  title: string;
  panelItem: IDashboardPanel;
  timeStart: MaterialUiPickersDate;
  timeEnd: MaterialUiPickersDate;
  propLoading: boolean;
  displayErrorMessage: any;
  color: string;
  fillColor: string;
  apiPrefix: string;
}

const styles = (theme: Theme) =>
  createStyles({
    ...widgetCommon,
    loadingAlign: {
      width: "100%",
      paddingTop: "5px",
      textAlign: "center",
      margin: "auto",
    },
  });

const SingleRepWidget = ({
  classes,
  title,
  panelItem,
  timeStart,
  timeEnd,
  propLoading,
  displayErrorMessage,
  color,
  fillColor,
  apiPrefix,
}: ISingleRepWidget) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IDataSRep[]>([]);
  const [result, setResult] = useState<IDashboardPanel | null>(null);

  useEffect(() => {
    if (propLoading) {
      setLoading(true);
    }
  }, [propLoading]);

  useEffect(() => {
    if (loading) {
      let stepCalc = 0;
      if (timeStart !== null && timeEnd !== null) {
        const secondsInPeriod = timeEnd.unix() - timeStart.unix();
        const periods = Math.floor(secondsInPeriod / 60);

        stepCalc = periods < 1 ? 15 : periods;
      }

      api
        .invoke(
          "GET",
          `/api/v1/${apiPrefix}/info/widgets/${
            panelItem.id
          }/?step=${stepCalc}&${
            timeStart !== null ? `&start=${timeStart.unix()}` : ""
          }${timeStart !== null && timeEnd !== null ? "&" : ""}${
            timeEnd !== null ? `end=${timeEnd.unix()}` : ""
          }`
        )
        .then((res: any) => {
          const widgetsWithValue = widgetDetailsToPanel(res, panelItem);
          setResult(widgetsWithValue);
          setData(widgetsWithValue.data);
          setLoading(false);
        })
        .catch((err: ErrorResponseHandler) => {
          displayErrorMessage(err);
          setLoading(false);
        });
    }
  }, [loading, panelItem, timeEnd, timeStart, displayErrorMessage, apiPrefix]);
  return (
    <div className={classes.singleValueContainer}>
      <div className={classes.titleContainer}>{title}</div>
      {loading && (
        <div className={classes.loadingAlign}>
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <div className={classes.contentContainer}>
          <ResponsiveContainer>
            <AreaChart data={data}>
              <YAxis
                domain={[0, (dataMax: number) => dataMax * 2]}
                hide={true}
              />
              <Area
                type="monotone"
                dataKey={"value"}
                stroke={color}
                fill={fillColor}
                fillOpacity={1}
              />
              <text
                x={"50%"}
                y={"50%"}
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight={600}
                fontSize={18}
                fill={color}
              >
                {result ? result.innerLabel : ""}
              </text>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const connector = connect(null, {
  displayErrorMessage: setErrorSnackMessage,
});

export default withStyles(styles)(connector(SingleRepWidget));

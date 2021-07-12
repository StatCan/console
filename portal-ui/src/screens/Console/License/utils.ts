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

import i18n from "../../../i18n";

export const planDetails = [
  {
    id: 0,
    title: i18n.t("license:community"),
    price: i18n.t("license:openSource"),
    capacityMin: "",
  },
  {
    id: 1,
    title: i18n.t("license:standard"),
    price: i18n.t("license:standardPrice"),
    capacityMax: i18n.t("license:standardCapacity"),
    capacityMin: "",
  },
  {
    id: 2,
    title: i18n.t("license:enterprise"),
    price: i18n.t("license:enterprisePrice"),
    capacityMax: i18n.t("license:enterpriseCapacity"),
    capacityMin: "",
  },
];

export const planItems = [
  {
    id: 0,
    field: i18n.t("license:license"),
    community: i18n.t("license:gnu"),
    communityDetail: "",
    standard: i18n.t("license:commercialLicense"),
    standardDetail: "",
    enterprise: i18n.t("license:commercialLicense"),
    enterpriseDetail: "",
  },
  {
    id: 1,
    field: i18n.t("license:softwareRelease"),
    community: i18n.t("license:updateToLatest"),
    standard: i18n.t("license:oneYearSupport"),
    enterprise: i18n.t("license:fiveYearsSupport"),
  },
  {
    id: 2,
    field: i18n.t("license:sla"),
    community: i18n.t("license:noSLA"),
    standard: i18n.t("license:twentyFourHours"),
    enterprise: i18n.t("license:oneHour"),
  },
  {
    id: 3,
    field: i18n.t("license:support"),
    community: i18n.t("license:communityColon"),
    communityDetail: i18n.t("license:communitySupport"),
    standard: i18n.t("license:twentyFourSevenDirect"),
    standardDetail: i18n.t("license:supportViaSubnet"),
    enterprise: i18n.t("license:twentyFourSevenDirect"),
    enterpriseDetail: i18n.t("license:supportViaSubnet"),
  },
  {
    id: 4,
    field: i18n.t("license:securityUpdatesAnd"),
    community: i18n.t("license:selfUpdate"),
    standard: i18n.t("license:guidedUpdate"),
    enterprise: i18n.t("license:guidedUpdate"),
  },
  {
    id: 5,
    field: i18n.t("license:panicButton"),
    community: "N/A",
    standard: i18n.t("license:onePerYear"),
    enterprise: i18n.t("license:unlimited"),
  },
  {
    id: 6,
    field: i18n.t("license:annualArchReview"),
    community: "N/A",
    standard: "Yes",
    enterprise: "Yes",
  },
  {
    id: 7,
    field: i18n.t("license:annualPerformanceReview"),
    community: "N/A",
    standard: "Yes",
    enterprise: "Yes",
  },
  {
    id: 8,
    field: i18n.t("license:indemnification"),
    community: "N/A",
    standard: "N/A",
    enterprise: "Yes",
  },
  {
    id: 9,
    field: i18n.t("license:securityPolicyReview"),
    community: "N/A",
    standard: "N/A",
    enterprise: "Yes",
  },
];

export const planButtons = [
  {
    id: 0,
    text: i18n.t("license:joinSlack"),
    text2: "",
    link: "https://slack.min.io",
    plan: "community",
  },
  {
    id: 1,
    text: i18n.t("license:subscribe"),
    text2: i18n.t("license:upgrade"),
    link: "https://subnet.min.io/subscription",
    plan: "standard",
  },
  {
    id: 2,
    text: i18n.t("license:subscribe"),
    text2: i18n.t("license:upgrade"),
    link: "https://subnet.min.io/subscription",
    plan: "enterprise",
  },
];

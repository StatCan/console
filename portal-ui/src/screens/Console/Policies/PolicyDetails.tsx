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

import React, { Fragment, useEffect, useState } from "react";
import { IAMPolicy, IAMStatement, Policy } from "./types";
import { connect } from "react-redux";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
  actionsTray,
  containerForHeader,
  modalBasic,
  searchField,
} from "../Common/FormComponents/common/styleLibrary";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import TableWrapper from "../Common/TableWrapper/TableWrapper";
import api from "../../../common/api";
import PageHeader from "../Common/PageHeader/PageHeader";
import { Link } from "react-router-dom";
import { setErrorSnackMessage, setSnackBarMessage } from "../../../actions";
import { ErrorResponseHandler } from "../../../common/types";
import CodeMirrorWrapper from "../Common/FormComponents/CodeMirrorWrapper/CodeMirrorWrapper";
import history from "../../../history";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ScreenTitle from "../Common/ScreenTitle/ScreenTitle";
import IAMPoliciesIcon from "../../../icons/IAMPoliciesIcon";
import RefreshIcon from "../../../icons/RefreshIcon";
import SearchIcon from "../../../icons/SearchIcon";
import TrashIcon from "../../../icons/TrashIcon";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

interface IPolicyDetailsProps {
  classes: any;
  match: any;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  setSnackBarMessage: typeof setSnackBarMessage;
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
    containerHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
    paperContainer: {
      padding: "15px 15px 15px 50px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "auto auto auto auto",
      gridGap: 8,
      "& div": {
        display: "flex",
        alignItems: "center",
      },
      "& div:nth-child(odd)": {
        justifyContent: "flex-end",
        fontWeight: 700,
      },
      "& div:nth-child(2n)": {
        paddingRight: 35,
      },
    },
    masterActions: {
      width: "25%",
      minWidth: "120px",
      "& div": {
        margin: "5px 0px",
      },
    },
    updateButton: {
      backgroundColor: "transparent",
      border: 0,
      padding: "0 6px",
      cursor: "pointer",
      "&:focus, &:active": {
        outline: "none",
      },
      "& svg": {
        height: 12,
      },
    },
    noUnderLine: {
      textDecoration: "none",
    },
    poolLabel: {
      color: "#666666",
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
    licenseInfoValue: {
      textTransform: "none",
      fontSize: 14,
      fontWeight: "bold",
    },
    verifiedIcon: {
      width: 96,
      position: "absolute",
      right: 0,
      bottom: 29,
    },
    breadcrumLink: {
      textDecoration: "none",
      color: "black",
    },
    statement: {
      border: "1px solid #DADADA",
      padding: 8,
      marginBottom: 8,
      borderRadius: 4,
    },
    labelCol: {
      fontWeight: "bold",
    },
    statementActions: {
      textAlign: "right",
    },
    addStmt: {
      color: theme.palette.primary.main,
    },
    listBox: {
      border: "1px solid #DADADA",
      height: 100,
    },
    ...actionsTray,
    ...searchField,
    ...modalBasic,
    ...containerForHeader(theme.spacing(4)),
  });

const PolicyDetails = ({
  classes,
  match,
  setErrorSnackMessage,
  setSnackBarMessage,
}: IPolicyDetailsProps) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [policy, setPolicy] = useState<Policy | null>(null);
  const [policyStatements, setPolicyStatements] = useState<IAMStatement[]>([]);
  const [userList, setUserList] = useState<string[]>([]);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [policyName, setPolicyName] = useState<string>(
    match.params["policyName"]
  );
  const [policyDefinition, setPolicyDefinition] = useState<string>("");
  const [loadingPolicy, setLoadingPolicy] = useState<boolean>(true);
  const [filterUsers, setFilterUsers] = useState<string>("");
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [filterGroups, setFilterGroups] = useState<string>("");
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);

  const { t } = useTranslation("policies");

  const saveRecord = (event: React.FormEvent) => {
    event.preventDefault();
    if (addLoading) {
      return;
    }
    setAddLoading(true);
    api
      .invoke("POST", "/api/v1/policies", {
        name: policyName,
        policy: policyDefinition,
      })
      .then((_) => {
        setAddLoading(false);
        setSnackBarMessage(i18n.t("policies:policySuccessfullyUpdated"));
      })
      .catch((err: ErrorResponseHandler) => {
        setAddLoading(false);
        setErrorSnackMessage(err);
      });
  };

  useEffect(() => {
    const loadUsersForPolicy = () => {
      if (loadingUsers) {
        api
          .invoke("GET", `/api/v1/policies/${policyName}/users`)
          .then((result: any) => {
            setUserList(result);
            setLoadingUsers(false);
          })
          .catch((err: ErrorResponseHandler) => {
            setErrorSnackMessage(err);
            setLoadingUsers(false);
          });
      }
    };
    const loadGroupsForPolicy = () => {
      if (loadingGroups) {
        api
          .invoke("GET", `/api/v1/policies/${policyName}/groups`)
          .then((result: any) => {
            setGroupList(result);
            setLoadingGroups(false);
          })
          .catch((err: ErrorResponseHandler) => {
            setErrorSnackMessage(err);
            setLoadingGroups(false);
          });
      }
    };
    const loadPolicyDetails = () => {
      if (loadingPolicy) {
        api
          .invoke("GET", `/api/v1/policy?name=${policyName}`)
          .then((result: any) => {
            if (result) {
              setPolicy(result);
              setPolicyDefinition(
                result ? JSON.stringify(JSON.parse(result.policy), null, 4) : ""
              );
              const pol: IAMPolicy = JSON.parse(result.policy);
              setPolicyStatements(pol.Statement);
            }
            setLoadingPolicy(false);
          })
          .catch((err: ErrorResponseHandler) => {
            setErrorSnackMessage(err);
            setLoadingPolicy(false);
          });
      }
    };

    if (loadingPolicy) {
      loadPolicyDetails();
      loadUsersForPolicy();
      loadGroupsForPolicy();
    }
  }, [
    policyName,
    loadingPolicy,
    loadingUsers,
    loadingGroups,
    setErrorSnackMessage,
    setUserList,
    setGroupList,
    setPolicyDefinition,
    setPolicy,
    setLoadingUsers,
    setLoadingGroups,
  ]);

  const resetForm = () => {
    setPolicyName("");
    setPolicyDefinition("");
  };

  const validSave = policyName.trim() !== "";

  const userViewAction = (user: any) => {
    history.push(`/users/${user}`);
  };
  const userTableActions = [{ type: "view", onClick: userViewAction }];

  const filteredUsers = userList.filter((elementItem) =>
    elementItem.includes(filterUsers)
  );

  const filteredGroups = groupList.filter((elementItem) =>
    elementItem.includes(filterGroups)
  );

  return (
    <Fragment>
      <PageHeader
        label={
          <Fragment>
            <Link to={"/policies"} className={classes.breadcrumLink}>
              {t("policy")}
            </Link>
          </Fragment>
        }
      />
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <ScreenTitle
            icon={
              <Fragment>
                <IAMPoliciesIcon width={40} />
              </Fragment>
            }
            title={policyName}
            subTitle={<Fragment>{t("iamPolicy")}</Fragment>}
            actions={
              <Fragment>
                <Tooltip title={t<string>("delete")}>
                  <IconButton
                    color="primary"
                    aria-label={t("delete")}
                    component="span"
                    onClick={() => {
                      // setDeleteOpen(true);
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t<string>("refresh")}>
                  <IconButton
                    color="primary"
                    aria-label={t("refreshList")}
                    component="span"
                    onClick={() => {
                      setLoadingUsers(true);
                      setLoadingGroups(true);
                      setLoadingPolicy(true);
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Fragment>
            }
          />
        </Grid>
        <Grid item xs={2}>
          <List component="nav" dense={true}>
            <ListItem
              button
              selected={selectedTab === 0}
              onClick={() => {
                setSelectedTab(0);
              }}
            >
              <ListItemText primary={t("summary")} />
            </ListItem>
            <ListItem
              button
              selected={selectedTab === 1}
              onClick={() => {
                setSelectedTab(1);
              }}
            >
              <ListItemText primary={t("users")} />
            </ListItem>
            <ListItem
              button
              selected={selectedTab === 2}
              onClick={() => {
                setSelectedTab(2);
              }}
            >
              <ListItemText primary={t("groups")} />
            </ListItem>
            <ListItem
              button
              selected={selectedTab === 3}
              onClick={() => {
                setSelectedTab(3);
              }}
            >
              <ListItemText primary={t("json")} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={10}>
          {selectedTab === 0 && (
            <Fragment>
              <h1 className={classes.sectionTitle}>{t("summary")}</h1>
              <Paper className={classes.paperContainer}>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    saveRecord(e);
                  }}
                >
                  <Grid container>
                    <Grid item xs={8}>
                      <h4>{t("statements")}</h4>
                    </Grid>
                    <Grid item xs={4} />

                    <Fragment>
                      {policyStatements.map((stmt, i) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            className={classes.statement}
                            key={`s-${i}`}
                          >
                            <Grid container>
                              <Grid item xs={2} className={classes.labelCol}>
                                {t("effect")}
                              </Grid>
                              <Grid item xs={4}>
                                <Fragment>{stmt.Effect}</Fragment>
                              </Grid>
                              <Grid item xs={2} className={classes.labelCol} />
                              <Grid item xs={4} />
                              <Grid item xs={2} className={classes.labelCol}>
                                {t("actions")}
                              </Grid>
                              <Grid item xs={4}>
                                <ul>
                                  {stmt.Action &&
                                    stmt.Action.map((act, actIndex) => (
                                      <li key={`${i}-r-${actIndex}`}>{act}</li>
                                    ))}
                                </ul>
                              </Grid>
                              <Grid item xs={2} className={classes.labelCol}>
                                {t("resources")}
                              </Grid>
                              <Grid item xs={4}>
                                <ul>
                                  {stmt.Resource &&
                                    stmt.Resource.map((res, resIndex) => (
                                      <li key={`${i}-r-${resIndex}`}>{res}</li>
                                    ))}
                                </ul>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Fragment>
                  </Grid>
                </form>
              </Paper>
            </Fragment>
          )}
          {selectedTab === 1 && (
            <Fragment>
              <h1 className={classes.sectionTitle}>{t("users")}</h1>
              <Grid container>
                <Grid item xs={12} className={classes.actionsTray}>
                  <TextField
                    placeholder={t("searchUsers")}
                    className={classes.searchField}
                    id="search-resource"
                    label=""
                    onChange={(val) => {
                      setFilterUsers(val.target.value);
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
                </Grid>
                <Grid item xs={12} className={classes.actionsTray}>
                  <br />
                </Grid>
                <TableWrapper
                  itemActions={userTableActions}
                  columns={[{ label: t("name"), elementKey: "name" }]}
                  isLoading={loadingUsers}
                  records={filteredUsers}
                  entityName={t("users")}
                  idField="name"
                />
              </Grid>
            </Fragment>
          )}
          {selectedTab === 2 && (
            <Fragment>
              <h1 className={classes.sectionTitle}>{t("groups")}</h1>
              <Grid container>
                <Grid item xs={12} className={classes.actionsTray}>
                  <TextField
                    placeholder={t("searchGroups")}
                    className={classes.searchField}
                    id="search-resource"
                    label=""
                    onChange={(val) => {
                      setFilterGroups(val.target.value);
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
                </Grid>
                <Grid item xs={12} className={classes.actionsTray}>
                  <br />
                </Grid>
                <TableWrapper
                  itemActions={[]}
                  columns={[{ label: t("name"), elementKey: "name" }]}
                  isLoading={loadingGroups}
                  records={filteredGroups}
                  entityName={t("groups")}
                  idField="name"
                />
              </Grid>
            </Fragment>
          )}
          {selectedTab === 3 && (
            <Fragment>
              <h1 className={classes.sectionTitle}>{t("rawPolicy")}</h1>
              <Paper className={classes.paperContainer}>
                <form
                  noValidate
                  autoComplete="off"
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    saveRecord(e);
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} className={classes.formScrollable}>
                      <CodeMirrorWrapper
                        value={policyDefinition}
                        onBeforeChange={(editor, data, value) => {
                          setPolicyDefinition(value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                      {!policy && (
                        <button
                          type="button"
                          color="primary"
                          className={classes.clearButton}
                          onClick={() => {
                            resetForm();
                          }}
                        >
                          {t("clear")}
                        </button>
                      )}

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={addLoading || !validSave}
                      >
                        {t("save")}
                      </Button>
                    </Grid>
                    {addLoading && (
                      <Grid item xs={12}>
                        <LinearProgress />
                      </Grid>
                    )}
                  </Grid>
                </form>
              </Paper>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

const connector = connect(null, {
  setErrorSnackMessage,
  setSnackBarMessage,
});

export default withStyles(styles)(connector(PolicyDetails));

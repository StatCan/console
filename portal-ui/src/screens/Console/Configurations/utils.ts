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
import { IConfigurationElement, IElementValue } from "./types";

export const notifyPostgres = "notify_postgres";
export const notifyMysql = "notify_mysql";
export const notifyKafka = "notify_kafka";
export const notifyAmqp = "notify_amqp";
export const notifyMqtt = "notify_mqtt";
export const notifyRedis = "notify_redis";
export const notifyNats = "notify_nats";
export const notifyElasticsearch = "notify_elasticsearch";
export const notifyWebhooks = "notify_webhook";
export const notifyNsq = "notify_nsq";

export const configurationElements: IConfigurationElement[] = [
  {
    configuration_id: "region",
    configuration_label: i18n.t("configurations:editRegionConfig"),
  },
  {
    configuration_id: "cache",
    configuration_label: i18n.t("configurations:editCacheConfig"),
  },
  {
    configuration_id: "compression",
    configuration_label: i18n.t("configurations:editCompressionConfig"),
  },
  { configuration_id: "etcd", configuration_label: i18n.t("configurations:editEtcdConfig") },
  {
    configuration_id: "identity_openid",
    configuration_label: i18n.t("configurations:editIdentityOpenidConfig"),
  },
  {
    configuration_id: "identity_ldap",
    configuration_label: i18n.t("configurations:editIdentityLDAPConfig"),
  },
  {
    configuration_id: "logger_webhook",
    configuration_label: i18n.t("configurations:editLoggerWebhookConfig"),
  },
  {
    configuration_id: "audit_webhook",
    configuration_label: i18n.t("configurations:editAuditWebhookConfig"),
  },
];

export const fieldsConfigurations: any = {
  region: [
    {
      name: "name",
      required: true,
      label: i18n.t("configurations:serverLocation"),
      tooltip: i18n.t("configurations:serverLocationTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:serverLocationEx"),
    },
    {
      name: "comment",
      required: false,
      label: i18n.t("configurations:comment"),
      tooltip: i18n.t("configurations:commentTooltip"),
      type: "comment",
      placeholder: i18n.t("configurations:enterComment"),
    },
  ],
  cache: [
    {
      name: "drives",
      required: true,
      label: i18n.t("configurations:drives"),
      tooltip: i18n.t("configurations:drivesTooltip"),
      type: "csv",
      placeholder:  i18n.t("configurations:enterMountPoint"),
    },
    {
      name: "expiry",
      required: false,
      label: i18n.t("configurations:expiry"),
      tooltip: i18n.t("configurations:expiryTooltip"),
      type: "number",
      placeholder: i18n.t("configurations:enterNumOfDays"),
    },
    {
      name: "quota",
      required: false,
      label: i18n.t("configurations:quota"),
      tooltip: i18n.t("configurations:quotaTooltip"),
      type: "number",
      placeholder: i18n.t("configurations:enterInPercentage"),
    },
    {
      name: "exclude",
      required: false,
      label: i18n.t("configurations:exclude"),
      tooltip: i18n.t("configurations:excludeTooltip"),
      type: "csv",
      placeholder: i18n.t("configurations:enterWildcardExclusion"),
    },
    {
      name: "after",
      required: false,
      label: i18n.t("configurations:after"),
      tooltip: i18n.t("configurations:afterTooltip"),
      type: "number",
      placeholder: i18n.t("configurations:enterNumOfAttempts"),
    },
    {
      name: "watermark_low",
      required: false,
      label: i18n.t("configurations:watermarkLow"),
      tooltip: i18n.t("configurations:watermarkLow"),
      type: "number",
      placeholder: i18n.t("configurations:enterWatermarkLow"),
    },
    {
      name: "watermark_high",
      required: false,
      label: i18n.t("configurations:watermarkHigh"),
      tooltip: i18n.t("configurations:watermarkHigh"),
      type: "number",
      placeholder: i18n.t("configurations:enterWatermarkHigh"),
    },
    {
      name: "comment",
      required: false,
      label:  i18n.t("configurations:comment"),
      tooltip:  i18n.t("configurations:commentTooltip"),
      type: "comment",
      multiline: true,
      placeholder:  i18n.t("configurations:enterComment"),
    },
  ],
  compression: [
    {
      name: "extensions",
      required: false,
      label: i18n.t("configurations:extensions"),
      tooltip: i18n.t("configurations:extensionsTooltip"),
      type: "csv",
      placeholder:i18n.t("configurations:enterExtension"),
      withBorder: true,
    },
    {
      name: "mime_types",
      required: false,
      label:  i18n.t("configurations:mimeTypes"),
      tooltip:  i18n.t("configurations:mimeTypesTooltip"),
      type: "csv",
      placeholder:  i18n.t("configurations:enterMimeType"),
      withBorder: true,
    },
  ],
  etcd: [
    {
      name: "endpoints",
      required: true,
      label: i18n.t("configurations:endpoints"),
      tooltip: i18n.t("configurations:endpointsTooltip"),
      type: "csv",
      placeholder: i18n.t("configurations:enterEndpoint"),
    },
    {
      name: "path_prefix",
      required: false,
      label: i18n.t("configurations:pathPrefix"),
      tooltip: i18n.t("configurations:pathPrefixTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterPathPrefix"),
    },
    {
      name: "coredns_path",
      required: false,
      label: i18n.t("configurations:corednsPath"),
      tooltip: i18n.t("configurations:corednsPathTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterCorednsPath"),
    },
    {
      name: "client_cert",
      required: false,
      label: i18n.t("configurations:clientCert"),
      tooltip: i18n.t("configurations:clientCertTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterClientCert"),
    },
    {
      name: "client_cert_key",
      required: false,
      label: i18n.t("configurations:clientCertKey"),
      tooltip: i18n.t("configurations:clientCertKeyTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterClientCertKey"),
    },
    {
      name: "comment",
      required: false,
      label: i18n.t("configurations:comment"),
      tooltip: i18n.t("configurations:commentTooltip"),
      type: "comment",
      multiline: true,
      placeholder: i18n.t("configurations:enterComment"),
    },
  ],
  identity_openid: [
    {
      name: "config_url",
      required: false,
      label: i18n.t("configurations:configURL"),
      tooltip: i18n.t("configurations:configURLTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterConfigURL"),
    },
    {
      name: "client_id",
      required: false,
      label: i18n.t("configurations:clientID"),
      type: "string",
      placeholder: i18n.t("configurations:enterClientID"),
    },
    {
      name: "claim_name",
      required: false,
      label: i18n.t("configurations:claimName"),
      tooltip: i18n.t("configurations:claimName"),
      type: "string",
      placeholder: i18n.t("configurations:enterClaimName"),
    },
    {
      name: "claim_prefix",
      required: false,
      label: i18n.t("configurations:claimPrefix"),
      tooltip: i18n.t("configurations:claimPrefix"),
      type: "string",
      placeholder: i18n.t("configurations:enterClaimPrefix"),
    },
  ],
  identity_ldap: [
    {
      name: "server_addr",
      required: true,
      label: i18n.t("configurations:serverAddr"),
      tooltip: i18n.t("configurations:serverAddrTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterServerAddress"),
    },
    {
      name: "username_format",
      required: true,
      label: i18n.t("configurations:usernameFormat"),
      tooltip: i18n.t("configurations:usernameFormatTooltip"),
      type: "csv",
      placeholder: i18n.t("configurations:enterUsernameFormat"),
    },
    {
      name: "username_search_filter",
      required: true,
      label: i18n.t("configurations:usernameSearchFilter"),
      tooltip: i18n.t("configurations:usernameSearchFilterTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterUsernameSearchFilter"),
    },
    {
      name: "group_search_filter",
      required: true,
      label: i18n.t("configurations:groupSearchFilter"),
      tooltip: i18n.t("configurations:groupSearchFilterTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterGroupSearchFilter"),
    },
    {
      name: "username_search_base_dn",
      required: false,
      label: i18n.t("configurations:usernameSearchBase"),
      tooltip: i18n.t("configurations:usernameSearchBaseTooltip"),
      type: "csv",
      placeholder: i18n.t("configurations:enterUsernameSearchBase"),
    },
    {
      name: "group_name_attribute",
      required: false,
      label: i18n.t("configurations:groupNameAttribute"),
      tooltip: i18n.t("configurations:groupNameAttributeTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterGroupNameAttribute"),
    },
    {
      name: "sts_expiry",
      required: false,
      label: i18n.t("configurations:stsExpiry"),
      tooltip: i18n.t("configurations:stsExpiryTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterSTSExpiry"),
    },
    {
      name: "tls_skip_verify",
      required: false,
      label: i18n.t("configurations:tlsSkipVerify"),
      tooltip: i18n.t("configurations:tlsSkipVerifyLdapTooltip"),
      type: "on|off",
    },
    {
      name: "server_insecure",
      required: false,
      label:i18n.t("configurations:serverInsecure"),
      tooltip: i18n.t("configurations:serverInsecureTooltip"),
      type: "on|off",
    },
    {
      name: "comment",
      required: false,
      label: i18n.t("configurations:comment"),
      tooltip: i18n.t("configurations:commentTooltip"),
      type: "comment",
      placeholder: i18n.t("configurations:enterComment"),
    },
  ],
  logger_webhook: [
    {
      name: "endpoint",
      required: true,
      label: i18n.t("configurations:endpoint"),
      type: "string",
      placeholder: i18n.t("configurations:enterEndpoint"),
    },
    {
      name: "auth_token",
      required: true,
      label: i18n.t("configurations:authToken"),
      type: "string",
      placeholder: i18n.t("configurations:enterAuthToken"),
    },
  ],
  audit_webhook: [
    {
      name: "endpoint",
      required: true,
      label: i18n.t("configurations:endpoint"),
      type: "string",
      placeholder: i18n.t("configurations:enterEndpoint"),
    },
    {
      name: "auth_token",
      required: true,
      label: i18n.t("configurations:authToken"),
      type: "string",
      placeholder: i18n.t("configurations:enterAuthToken"),
    },
  ],
};

const commonFields = [
  {
    name: "queue-dir",
    label: i18n.t("configurations:queueDirectory"),
    required: true,

    tooltip: i18n.t("configurations:queueDirTooltip"),
    type: "string",
    placeholder: i18n.t("configurations:enterQueueDirectory"),
  },
  {
    name: "queue-limit",
    label: i18n.t("configurations:queueLimit"),
    required: false,

    tooltip: i18n.t("configurations:queueLimitTooltip"),
    type: "number",
    placeholder: i18n.t("configurations:enterQueueLimit"),
  },
  {
    name: "comment",
    label: i18n.t("configurations:comment"),
    required: false,
    type: "comment",
    placeholder: i18n.t("configurations:enterComment"),
  },
];

export const notificationEndpointsFields: any = {
  [notifyKafka]: [
    {
      name: "brokers",
      label: i18n.t("configurations:brokers"),
      required: true,

      tooltip: i18n.t("configurations:brokersTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterBrokers"),
    },
    {
      name: "topic",
      label: i18n.t("configurations:topic"),
      tooltip: i18n.t("configurations:topicKafkaTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterTopic"),
    },
    {
      name: "sasl_username",
      label: i18n.t("configurations:saslUsername"),
      tooltip: i18n.t("configurations:saslUsernameTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterSASLUsername"),
    },
    {
      name: "sasl_password",
      label: i18n.t("configurations:saslPassword"),
      tooltip: i18n.t("configurations:saslPasswordTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterSASLPassword"),
    },
    {
      name: "sasl_mechanism",
      label: i18n.t("configurations:saslMechanism"),
      tooltip: i18n.t("configurations:saslMechanismTooltip"),
      type: "string",
    },
    {
      name: "tls_client_auth",
      label: i18n.t("configurations:tlsClientAuth"),
      tooltip: i18n.t("configurations:tlsClientAuthTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterTLSClientAuth"),
    },
    {
      name: "sasl",
      label: i18n.t("configurations:sasl"),
      tooltip: i18n.t("configurations:saslTooltip"),
      type: "on|off",
    },
    {
      name: "tls",
      label: i18n.t("configurations:tls"),
      tooltip: i18n.t("configurations:tlsTooltip"),
      type: "on|off",
    },
    {
      name: "tls_skip_verify",
      label: i18n.t("configurations:tlsSkipVerify"),
      tooltip: i18n.t("configurations:tlsSkipVerifyTooltip"),
      type: "on|off",
    },
    {
      name: "client_tls_cert",
      label: i18n.t("configurations:clientTLSCert"),
      tooltip: i18n.t("configurations:clientTLSCertTooltip"),
      type: "path",
      placeholder: i18n.t("configurations:enterTLSClientCert"),
    },
    {
      name: "client_tls_key",
      label: i18n.t("configurations:clientTLSKey"),
      tooltip: i18n.t("configurations:clientTLSKeyTooltip"),
      type: "path",
      placeholder: i18n.t("configurations:enterTLSKey"),
    },
    {
      name: "version",
      label: i18n.t("configurations:version"),
      tooltip: i18n.t("configurations:versionTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterKafkaVersion"),
    },
    ...commonFields,
  ],
  [notifyAmqp]: [
    {
      name: "url",
      required: true,
      label: i18n.t("configurations:url"),
      tooltip: i18n.t("configurations:urlTooltip"),
      type: "url",
    },
    {
      name: "exchange",
      label: i18n.t("configurations:exchange"),
      tooltip: i18n.t("configurations:exchangeTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterExchange"),
    },
    {
      name: "exchange_type",
      label: i18n.t("configurations:exchangeType"),
      tooltip: i18n.t("configurations:exchangeTypeTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterExchangeType"),
    },
    {
      name: "routing_key",
      label: i18n.t("configurations:routingKey"),
      tooltip: i18n.t("configurations:routingKeyTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterRoutingKey"),
    },
    {
      name: "mandatory",
      label: i18n.t("configurations:mandatory"),
      tooltip: i18n.t("configurations:mandatoryTooltip"),
      type: "on|off",
    },
    {
      name: "durable",
      label: i18n.t("configurations:durable"),
      tooltip: i18n.t("configurations:durableTooltip"),
      type: "on|off",
    },
    {
      name: "no_wait",
      label: i18n.t("configurations:noWait"),
      tooltip: i18n.t("configurations:noWaitTooltip"),
      type: "on|off",
    },
    {
      name: "internal",
      label: i18n.t("configurations:internal"),
      tooltip: i18n.t("configurations:internalTooltip"),
      type: "on|off",
    },
    {
      name: "auto_deleted",
      label: i18n.t("configurations:autoDeleted"),
      tooltip: i18n.t("configurations:autoDeletedTooltip"),
      type: "on|off",
    },
    {
      name: "delivery_mode",
      label: i18n.t("configurations:deliveryMethod"),
      tooltip: i18n.t("configurations:deliveryMethodTooltip"),
      type: "number",
      placeholder: i18n.t("configurations:enterDeliveryMethod"),
    },
    ...commonFields,
  ],
  [notifyRedis]: [
    {
      name: "address",
      required: true,
      label: i18n.t("configurations:address"),
      tooltip: i18n.t("configurations:addressRedisTooltip"),
      type: "address",
      placeholder: i18n.t("configurations:enterAddress"),
    },
    {
      name: "key",
      required: true,
      label: i18n.t("configurations:key"),
      tooltip: i18n.t("configurations:keyTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterKey"),
    },
    {
      name: "password",
      label: i18n.t("configurations:password"),
      tooltip: i18n.t("configurations:passwordRedisTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterPassword"),
    },
    ...commonFields,
  ],
  [notifyMqtt]: [
    {
      name: "broker",
      required: true,
      label: i18n.t("configurations:broker"),
      tooltip: i18n.t("configurations:brokerTooltip"),
      type: "uri",
      placeholder: i18n.t("configurations:enterBrokers"),
    },
    {
      name: "topic",
      required: true,
      label: i18n.t("configurations:topic"),
      tooltip: i18n.t("configurations:topicMqttTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterTopic"),
    },
    {
      name: "username",
      label: i18n.t("configurations:username"),
      tooltip: i18n.t("configurations:usernameMqttTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterUsername"),
    },
    {
      name: "password",
      label: i18n.t("configurations:password"),
      tooltip: i18n.t("configurations:passwordMqttTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterPassword"),
    },
    {
      name: "qos",
      label: i18n.t("configurations:qos"),
      tooltip: i18n.t("configurations:qosTooltip"),
      type: "number",
      placeholder: i18n.t("configurations:enterQOS"),
    },
    {
      name: "keep_alive_interval",
      label: i18n.t("configurations:keepAlive"),
      tooltip: i18n.t("configurations:keepAliveTooltip"),
      type: "duration",
      placeholder: i18n.t("configurations:enterKeepAlive"),
    },
    {
      name: "reconnect_interval",
      label: i18n.t("configurations:reconnectInterval"),
      tooltip: i18n.t("configurations:reconnectIntervalTooltip"),
      type: "duration",
      placeholder: i18n.t("configurations:enterReconnectInterval"),
    },
    ...commonFields,
  ],
  [notifyNats]: [
    {
      name: "address",
      required: true,
      label: i18n.t("configurations:address"),
      tooltip: i18n.t("configurations:addressNatsTooltip"),
      type: "address",
      placeholder: i18n.t("configurations:enterAddress"),
    },
    {
      name: "subject",
      required: true,
      label: i18n.t("configurations:subject"),
      tooltip: i18n.t("configurations:subjectTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterNatsSubject"),
    },
    {
      name: "username",
      label: i18n.t("configurations:username"),
      tooltip: i18n.t("configurations:usernameNatsTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterNatsUsername"),
    },
    {
      name: "password",
      label: i18n.t("configurations:password"),
      tooltip: i18n.t("configurations:passwordNatsTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterNatsPassword"),
    },
    {
      name: "token",
      label: i18n.t("configurations:token"),
      tooltip: i18n.t("configurations:tokenTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterNatsToken"),
    },
    {
      name: "tls",
      label: i18n.t("configurations:tls"),
      tooltip: i18n.t("configurations:tlsTooltip"),
      type: "on|off",
    },
    {
      name: "tls_skip_verify",
      label: i18n.t("configurations:tlsSkipVerify"),
      tooltip: i18n.t("configurations:tlsSkipVerifyTooltip"),
      type: "on|off",
    },
    {
      name: "ping_interval",
      label: i18n.t("configurations:pingInterval"),
      tooltip: i18n.t("configurations:pingIntervalTooltip"),
      type: "duration",
      placeholder: i18n.t("configurations:enterPingInterval"),
    },
    {
      name: "streaming",
      label: i18n.t("configurations:streaming"),
      tooltip: i18n.t("configurations:streamingTooltip"),
      type: "on|off",
    },
    {
      name: "streaming_async",
      label: i18n.t("configurations:streamingAsync"),
      tooltip: i18n.t("configurations:streamingAsyncTooltip"),
      type: "on|off",
    },
    {
      name: "streaming_max_pub_acks_in_flight",
      label: i18n.t("configurations:streamingMaxPublish"),
      tooltip: i18n.t("configurations:streamingMaxPublishTooltip"),
      type: "number",
      placeholder: i18n.t("configurations:enterStreamingInFlightValue"),
    },
    {
      name: "streaming_cluster_id",
      label: i18n.t("configurations:streamingClusterID"),
      tooltip: i18n.t("configurations:streamingClusterIDTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterStreamingClusterID"),
    },
    {
      name: "cert_authority",
      label: i18n.t("configurations:certAuthority"),
      tooltip: i18n.t("configurations:certAuthorityTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterCertAuthority"),
    },
    {
      name: "client_cert",
      label: i18n.t("configurations:clientCert"),
      tooltip: i18n.t("configurations:clientCertNatsTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterClientCert"),
    },
    {
      name: "client_key",
      label: i18n.t("configurations:clientKey"),
      tooltip: i18n.t("configurations:clientKeyTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterClientKey"),
    },
    ...commonFields,
  ],
  [notifyElasticsearch]: [
    {
      name: "url",
      required: true,
      label: i18n.t("configurations:url"),
      tooltip: i18n.t("configurations:urlElasticTooltip"),
      type: "url",
      placeholder: i18n.t("configurations:enterUrl"),
    },
    {
      name: "index",
      required: true,
      label: i18n.t("configurations:index"),
      tooltip: i18n.t("configurations:indexTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterIndex"),
    },
    {
      name: "format",
      required: true,
      label: i18n.t("configurations:format"),
      tooltip: i18n.t("configurations:formatTooltip"),
      type: "enum",
      placeholder: i18n.t("configurations:enterFormat"),
    },
    ...commonFields,
  ],
  [notifyWebhooks]: [
    {
      name: "endpoint",
      required: true,
      label: i18n.t("configurations:endpoint"),
      tooltip: i18n.t("configurations:endpointTooltip"),
      type: "url",
      placeholder: i18n.t("configurations:enterEndpoint"),
    },
    {
      name: "auth_token",
      label: i18n.t("configurations:authToken"),
      tooltip: i18n.t("configurations:authTokenTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterAuthToken"),
    },
    ...commonFields,
  ],
  [notifyNsq]: [
    {
      name: "nsqd_address",
      required: true,
      label: i18n.t("configurations:nsqdAddress"),
      tooltip: i18n.t("configurations:nsqdAddressTooltip"),
      type: "address",
      placeholder: i18n.t("configurations:enterNSQDAddress"),
    },
    {
      name: "topic",
      required: true,
      label: i18n.t("configurations:topic"),
      tooltip: i18n.t("configurations:topicNSQTooltip"),
      type: "string",
      placeholder: i18n.t("configurations:enterTopic"),
    },
    {
      name: "tls",
      label: i18n.t("configurations:tls"),
      tooltip: i18n.t("configurations:tlsTooltip"),
      type: "on|off",
    },
    {
      name: "tls_skip_verify",
      label: i18n.t("configurations:tlsSkipVerify"),
      tooltip: i18n.t("configurations:tlsSkipVerifyTooltip"),
      type: "on|off",
    },
    ...commonFields,
  ],
};

export const removeEmptyFields = (formFields: IElementValue[]) => {
  const nonEmptyFields = formFields.filter((field) => field.value !== "");

  return nonEmptyFields;
};

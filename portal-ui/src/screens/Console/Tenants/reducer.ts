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
import has from "lodash/has";
import get from "lodash/get";
import {
  TenantsManagementTypes,
  ITenantState,
  ADD_TENANT_SET_CURRENT_PAGE,
  ADD_TENANT_SET_ADVANCED_MODE,
  ADD_TENANT_UPDATE_FIELD,
  ADD_TENANT_SET_PAGE_VALID,
  ADD_TENANT_SET_STORAGE_CLASSES_LIST,
  ADD_TENANT_ADD_MINIO_KEYPAIR,
  ADD_TENANT_DELETE_MINIO_KEYPAIR,
  ADD_TENANT_ADD_CA_KEYPAIR,
  ADD_TENANT_ADD_FILE_TO_CA_KEYPAIR,
  ADD_TENANT_DELETE_CA_KEYPAIR,
  ADD_TENANT_ADD_CONSOLE_CERT,
  ADD_TENANT_ADD_CONSOLE_CA_KEYPAIR,
  ADD_TENANT_ADD_FILE_TO_CONSOLE_CA_KEYPAIR,
  ADD_TENANT_DELETE_CONSOLE_CA_KEYPAIR,
  ADD_TENANT_ADD_FILE_TO_MINIO_KEYPAIR,
  ADD_TENANT_ENCRYPTION_SERVER_CERT,
  ADD_TENANT_ENCRYPTION_CLIENT_CERT,
  ADD_TENANT_ENCRYPTION_VAULT_CERT,
  ADD_TENANT_ENCRYPTION_VAULT_CA,
  ADD_TENANT_ENCRYPTION_GEMALTO_CA,
  ADD_TENANT_RESET_FORM,
  TENANT_DETAILS_SET_LOADING,
  TENANT_DETAILS_SET_CURRENT_TENANT,
  TENANT_DETAILS_SET_TENANT,
  TENANT_DETAILS_SET_TAB,
} from "./types";
import { KeyPair } from "./ListTenants/utils";
import { getRandomString } from "./utils";

const initialState: ITenantState = {
  createTenant: {
    page: 0,
    validPages: [],
    advancedModeOn: false,
    storageClasses: [],
    limitSize: {},
    fields: {
      nameTenant: {
        tenantName: "",
        namespace: "",
        selectedStorageClass: "",
      },
      configure: {
        customImage: false,
        imageName: "",
        customDockerhub: false,
        imageRegistry: "",
        imageRegistryUsername: "",
        imageRegistryPassword: "",
        exposeMinIO: true,
        exposeConsole: true,
        logSearchCustom: false,
        prometheusCustom: false,
        logSearchVolumeSize: "5",
        logSearchSizeFactor: "Gi",
        logSearchImage: "",
        kesImage: "",
        logSearchPostgresImage: "",
        logSearchPostgresInitImage: "",
        prometheusVolumeSize: "5",
        prometheusSizeFactor: "Gi",
        logSearchSelectedStorageClass: "",
        prometheusSelectedStorageClass: "",
        prometheusImage: "",
        prometheusSidecarImage: "",
        prometheusInitImage: "",
      },
      identityProvider: {
        idpSelection: "Built-in",
        accessKeys: [getRandomString(16)],
        secretKeys: [getRandomString(32)],
        openIDURL: "",
        openIDConfigurationURL: "",
        openIDClientID: "",
        openIDSecretID: "",
        openIDCallbackURL: "",
        openIDClaimName: "",
        openIDScopes: "",
        ADURL: "",
        ADSkipTLS: false,
        ADServerInsecure: false,
        ADUserNameSearchFilter: "",
        ADGroupSearchBaseDN: "",
        ADGroupSearchFilter: "",
        ADGroupNameAttribute: "",
        ADUserDNs: [""],
        ADUserNameFormat: "",
        ADLookupBindDN: "",
        ADLookupBindPassword: "",
        ADUserDNSearchBaseDN: "",
        ADUserDNSearchFilter: "",
        ADServerStartTLS: false,
      },
      security: {
        enableAutoCert: true,
        enableCustomCerts: false,
        enableTLS: true,
      },
      encryption: {
        enableEncryption: false,
        encryptionType: "vault",
        gemaltoEndpoint: "",
        gemaltoToken: "",
        gemaltoDomain: "",
        gemaltoRetry: "0",
        awsEndpoint: "",
        awsRegion: "",
        awsKMSKey: "",
        awsAccessKey: "",
        awsSecretKey: "",
        awsToken: "",
        vaultEndpoint: "",
        vaultEngine: "",
        vaultNamespace: "",
        vaultPrefix: "",
        vaultAppRoleEngine: "",
        vaultId: "",
        vaultSecret: "",
        vaultRetry: "0",
        vaultPing: "0",
        gcpProjectID: "",
        gcpEndpoint: "",
        gcpClientEmail: "",
        gcpClientID: "",
        gcpPrivateKeyID: "",
        gcpPrivateKey: "",
        enableCustomCertsForKES: false,
      },
      tenantSize: {
        volumeSize: "100",
        sizeFactor: "Gi",
        drivesPerServer: "1",
        nodes: "4",
        memoryNode: "2",
        ecParity: "",
        ecParityChoices: [],
        cleanECChoices: [],
        maxAllocableMemo: 0,
        memorySize: {
          error: "",
          limit: 0,
          request: 0,
        },
        distribution: {
          error: "",
          nodes: 0,
          persistentVolumes: 0,
          disks: 0,
          volumePerDisk: 0,
        },
        ecParityCalc: {
          error: 0,
          defaultEC: "",
          erasureCodeSet: 0,
          maxEC: "",
          rawCapacity: "0",
          storageFactors: [],
        },
        limitSize: {},
      },
      affinity: {
        nodeSelectorLabels: "",
        podAffinity: "default",
        withPodAntiAffinity: true,
      },
    },
    certificates: {
      minioCertificates: [
        {
          id: Date.now().toString(),
          key: "",
          cert: "",
          encoded_key: "",
          encoded_cert: "",
        },
      ],
      caCertificates: [
        {
          id: Date.now().toString(),
          key: "",
          cert: "",
          encoded_key: "",
          encoded_cert: "",
        },
      ],
      consoleCaCertificates: [
        {
          id: Date.now().toString(),
          key: "",
          cert: "",
          encoded_key: "",
          encoded_cert: "",
        },
      ],
      consoleCertificate: {
        id: "console_cert_pair",
        key: "",
        cert: "",
        encoded_key: "",
        encoded_cert: "",
      },
      serverCertificate: {
        id: "encryptionServerCertificate",
        key: "",
        cert: "",
        encoded_key: "",
        encoded_cert: "",
      },
      clientCertificate: {
        id: "encryptionClientCertificate",
        key: "",
        cert: "",
        encoded_key: "",
        encoded_cert: "",
      },
      vaultCertificate: {
        id: "encryptionVaultCertificate",
        key: "",
        cert: "",
        encoded_key: "",
        encoded_cert: "",
      },
      vaultCA: {
        id: "encryptionVaultCA",
        key: "",
        cert: "",
        encoded_key: "",
        encoded_cert: "",
      },
      gemaltoCA: {
        id: "encryptionGemaltoCA",
        key: "",
        cert: "",
        encoded_key: "",
        encoded_cert: "",
      },
    },
  },
  tenantDetails: {
    currentTenant: "",
    currentNamespace: "",
    loadingTenant: false,
    tenantInfo: null,
    currentTab: "summary",
  },
};

export function tenantsReducer(
  state = initialState,
  action: TenantsManagementTypes
): ITenantState {
  let newState: ITenantState = { ...state };

  switch (action.type) {
    case ADD_TENANT_SET_CURRENT_PAGE:
      newState.createTenant.page = action.page;

      return { ...newState };
    case ADD_TENANT_SET_ADVANCED_MODE:
      newState.createTenant.advancedModeOn = action.state;

      return { ...newState };
    case ADD_TENANT_UPDATE_FIELD:
      if (
        has(newState.createTenant.fields, `${action.pageName}.${action.field}`)
      ) {
        const originPageNameItems = get(
          newState.createTenant.fields,
          `${action.pageName}`,
          {}
        );

        let newValue: any = {};
        newValue[action.field] = action.value;

        const joinValue = { ...originPageNameItems, ...newValue };

        newState.createTenant.fields[action.pageName] = { ...joinValue };

        return { ...newState };
      }
      return state;
    case ADD_TENANT_SET_PAGE_VALID:
      let originValidPages = state.createTenant.validPages;

      if (action.valid) {
        if (!originValidPages.includes(action.pageName)) {
          originValidPages.push(action.pageName);

          newState.createTenant.validPages = [...originValidPages];
        }
      } else {
        const newSetOfPages = originValidPages.filter(
          (elm) => elm !== action.pageName
        );

        newState.createTenant.validPages = [...newSetOfPages];
      }

      return { ...newState };
    case ADD_TENANT_SET_STORAGE_CLASSES_LIST:
      const changeCL = {
        ...state,
        createTenant: {
          ...state.createTenant,
          storageClasses: action.storageClasses,
        },
      };
      return { ...changeCL };
    case ADD_TENANT_ADD_MINIO_KEYPAIR:
      const minioCerts = [
        ...state.createTenant.certificates.minioCertificates,
        {
          id: Date.now().toString(),
          key: "",
          cert: "",
          encoded_key: "",
          encoded_cert: "",
        },
      ];
      newState.createTenant.certificates.minioCertificates = [...minioCerts];
      return { ...newState };
    case ADD_TENANT_ADD_FILE_TO_MINIO_KEYPAIR:
      const minioCertificates =
        state.createTenant.certificates.minioCertificates;

      const NCertList = minioCertificates.map((item: KeyPair) => {
        if (item.id === action.id) {
          return {
            ...item,
            [action.key]: action.fileName,
            [`encoded_${action.key}`]: action.value,
          };
        }
        return item;
      });
      newState.createTenant.certificates.minioCertificates = [...NCertList];
      return { ...newState };
    case ADD_TENANT_DELETE_MINIO_KEYPAIR:
      const minioCertsList = state.createTenant.certificates.minioCertificates;

      if (minioCertsList.length > 1) {
        const cleanMinioCertsList = minioCertsList.filter(
          (item: KeyPair) => item.id !== action.id
        );
        newState.createTenant.certificates.minioCertificates = [
          ...cleanMinioCertsList,
        ];
        return { ...newState };
      }
      return { ...state };
    case ADD_TENANT_ADD_CA_KEYPAIR:
      const CACerts = [
        ...state.createTenant.certificates.caCertificates,
        {
          id: Date.now().toString(),
          key: "",
          cert: "",
          encoded_key: "",
          encoded_cert: "",
        },
      ];
      newState.createTenant.certificates.caCertificates = [...CACerts];
      return { ...newState };
    case ADD_TENANT_ADD_FILE_TO_CA_KEYPAIR:
      const caCertificates = state.createTenant.certificates.caCertificates;

      const NACList = caCertificates.map((item: KeyPair) => {
        if (item.id === action.id) {
          return {
            ...item,
            [action.key]: action.fileName,
            [`encoded_${action.key}`]: action.value,
          };
        }
        return item;
      });
      newState.createTenant.certificates.caCertificates = [...NACList];
      return { ...newState };
    case ADD_TENANT_DELETE_CA_KEYPAIR:
      const CACertsList = state.createTenant.certificates.caCertificates;
      if (CACertsList.length > 1) {
        const cleanCaCertsList = CACertsList.filter(
          (item: KeyPair) => item.id !== action.id
        );
        newState.createTenant.certificates.caCertificates = [
          ...cleanCaCertsList,
        ];
        return { ...newState };
      }
      return { ...state };
    case ADD_TENANT_ADD_CONSOLE_CERT:
      const consoleCert = state.createTenant.certificates.consoleCertificate;

      newState.createTenant.certificates.consoleCertificate = {
        ...consoleCert,
        [action.key]: action.fileName,
        [`encoded_${action.key}`]: action.value,
      };

      return { ...newState };
    case ADD_TENANT_ADD_CONSOLE_CA_KEYPAIR:
      const ConsoleCACerts = [
        ...state.createTenant.certificates.consoleCaCertificates,
        {
          id: Date.now().toString(),
          key: "",
          cert: "",
          encoded_key: "",
          encoded_cert: "",
        },
      ];
      newState.createTenant.certificates.consoleCaCertificates = [
        ...ConsoleCACerts,
      ];
      return { ...newState };
    case ADD_TENANT_ADD_FILE_TO_CONSOLE_CA_KEYPAIR:
      const consoleCaCertificates =
        state.createTenant.certificates.consoleCaCertificates;

      const consoleNACList = consoleCaCertificates.map((item: KeyPair) => {
        if (item.id === action.id) {
          return {
            ...item,
            [action.key]: action.fileName,
            [`encoded_${action.key}`]: action.value,
          };
        }
        return item;
      });
      newState.createTenant.certificates.consoleCaCertificates = [
        ...consoleNACList,
      ];
      return { ...newState };
    case ADD_TENANT_DELETE_CONSOLE_CA_KEYPAIR:
      const consoleCACertsList =
        state.createTenant.certificates.consoleCaCertificates;
      if (consoleCACertsList.length > 1) {
        const cleanCaCertsList = consoleCACertsList.filter(
          (item: KeyPair) => item.id !== action.id
        );
        newState.createTenant.certificates.consoleCaCertificates = [
          ...cleanCaCertsList,
        ];
        return { ...newState };
      }
      return { ...state };
    case ADD_TENANT_ENCRYPTION_SERVER_CERT:
      const encServerCert = state.createTenant.certificates.serverCertificate;

      newState.createTenant.certificates.serverCertificate = {
        ...encServerCert,
        [action.key]: action.fileName,
        [`encoded_${action.key}`]: action.value,
      };

      return { ...newState };
    case ADD_TENANT_ENCRYPTION_CLIENT_CERT:
      const encClientCert = state.createTenant.certificates.clientCertificate;

      newState.createTenant.certificates.clientCertificate = {
        ...encClientCert,
        [action.key]: action.fileName,
        [`encoded_${action.key}`]: action.value,
      };

      return { ...newState };
    case ADD_TENANT_ENCRYPTION_VAULT_CERT:
      const encVaultCert = state.createTenant.certificates.vaultCertificate;

      newState.createTenant.certificates.vaultCertificate = {
        ...encVaultCert,
        [action.key]: action.fileName,
        [`encoded_${action.key}`]: action.value,
      };

      return { ...newState };
    case ADD_TENANT_ENCRYPTION_VAULT_CA:
      const encVaultCA = state.createTenant.certificates.vaultCA;

      newState.createTenant.certificates.vaultCA = {
        ...encVaultCA,
        cert: action.fileName,
        encoded_cert: action.value,
      };

      return { ...newState };
    case ADD_TENANT_ENCRYPTION_GEMALTO_CA:
      const encGemaltoCA = state.createTenant.certificates.gemaltoCA;

      newState.createTenant.certificates.gemaltoCA = {
        ...encGemaltoCA,
        cert: action.fileName,
        encoded_cert: action.value,
      };

      return { ...newState };
    case ADD_TENANT_RESET_FORM:
      return {
        ...state,
        createTenant: {
          page: 0,
          validPages: [],
          advancedModeOn: false,
          storageClasses: [],
          limitSize: {},
          fields: {
            nameTenant: {
              tenantName: "",
              namespace: "",
              selectedStorageClass: "",
            },
            configure: {
              customImage: false,
              imageName: "",
              customDockerhub: false,
              imageRegistry: "",
              imageRegistryUsername: "",
              imageRegistryPassword: "",
              exposeMinIO: true,
              exposeConsole: true,
              logSearchCustom: false,
              prometheusCustom: false,
              logSearchVolumeSize: "5",
              logSearchSizeFactor: "Gi",
              logSearchSelectedStorageClass: "",
              logSearchImage: "",
              kesImage: "",
              logSearchPostgresImage: "",
              logSearchPostgresInitImage: "",
              prometheusVolumeSize: "5",
              prometheusSizeFactor: "Gi",
              prometheusSelectedStorageClass: "",
              prometheusImage: "",
              prometheusSidecarImage: "",
              prometheusInitImage: "",
            },
            identityProvider: {
              idpSelection: "Built-in",
              accessKeys: [getRandomString(16)],
              secretKeys: [getRandomString(32)],
              openIDURL: "",
              openIDConfigurationURL: "",
              openIDClientID: "",
              openIDSecretID: "",
              openIDCallbackURL: "",
              openIDClaimName: "",
              openIDScopes: "",
              ADURL: "",
              ADSkipTLS: false,
              ADServerInsecure: false,
              ADUserNameSearchFilter: "",
              ADGroupSearchBaseDN: "",
              ADGroupSearchFilter: "",
              ADGroupNameAttribute: "",
              ADUserDNs: [""],
              ADUserNameFormat: "",
              ADLookupBindDN: "",
              ADLookupBindPassword: "",
              ADUserDNSearchBaseDN: "",
              ADUserDNSearchFilter: "",
              ADServerStartTLS: false,
            },
            security: {
              enableAutoCert: true,
              enableCustomCerts: false,
              enableTLS: true,
            },
            encryption: {
              enableEncryption: false,
              encryptionType: "vault",
              gemaltoEndpoint: "",
              gemaltoToken: "",
              gemaltoDomain: "",
              gemaltoRetry: "0",
              awsEndpoint: "",
              awsRegion: "",
              awsKMSKey: "",
              awsAccessKey: "",
              awsSecretKey: "",
              awsToken: "",
              vaultEndpoint: "",
              vaultEngine: "",
              vaultNamespace: "",
              vaultPrefix: "",
              vaultAppRoleEngine: "",
              vaultId: "",
              vaultSecret: "",
              vaultRetry: "0",
              vaultPing: "0",
              gcpProjectID: "",
              gcpEndpoint: "",
              gcpClientEmail: "",
              gcpClientID: "",
              gcpPrivateKeyID: "",
              gcpPrivateKey: "",
              enableCustomCertsForKES: false,
            },
            tenantSize: {
              volumeSize: "100",
              sizeFactor: "Gi",
              drivesPerServer: "1",
              nodes: "4",
              memoryNode: "2",
              ecParity: "",
              ecParityChoices: [],
              cleanECChoices: [],
              maxAllocableMemo: 0,
              memorySize: {
                error: "",
                limit: 0,
                request: 0,
              },
              distribution: {
                error: "",
                nodes: 0,
                persistentVolumes: 0,
                disks: 0,
                volumePerDisk: 0,
              },
              ecParityCalc: {
                error: 0,
                defaultEC: "",
                erasureCodeSet: 0,
                maxEC: "",
                rawCapacity: "0",
                storageFactors: [],
              },
              limitSize: {},
            },
            affinity: {
              nodeSelectorLabels: "",
              podAffinity: "default",
              withPodAntiAffinity: true,
            },
          },
          certificates: {
            minioCertificates: [
              {
                id: Date.now().toString(),
                key: "",
                cert: "",
                encoded_key: "",
                encoded_cert: "",
              },
            ],
            caCertificates: [
              {
                id: Date.now().toString(),
                key: "",
                cert: "",
                encoded_key: "",
                encoded_cert: "",
              },
            ],
            consoleCaCertificates: [
              {
                id: Date.now().toString(),
                key: "",
                cert: "",
                encoded_key: "",
                encoded_cert: "",
              },
            ],
            consoleCertificate: {
              id: "console_cert_pair",
              key: "",
              cert: "",
              encoded_key: "",
              encoded_cert: "",
            },
            serverCertificate: {
              id: "encryptionServerCertificate",
              key: "",
              cert: "",
              encoded_key: "",
              encoded_cert: "",
            },
            clientCertificate: {
              id: "encryptionClientCertificate",
              key: "",
              cert: "",
              encoded_key: "",
              encoded_cert: "",
            },
            vaultCertificate: {
              id: "encryptionVaultCertificate",
              key: "",
              cert: "",
              encoded_key: "",
              encoded_cert: "",
            },
            vaultCA: {
              id: "encryptionVaultCA",
              key: "",
              cert: "",
              encoded_key: "",
              encoded_cert: "",
            },
            gemaltoCA: {
              id: "encryptionGemaltoCA",
              key: "",
              cert: "",
              encoded_key: "",
              encoded_cert: "",
            },
          },
        },
      };
    case TENANT_DETAILS_SET_LOADING:
      const tenantDetails = {
        ...state.tenantDetails,
        loadingTenant: action.state,
      };
      return {
        ...state,
        tenantDetails: {
          ...tenantDetails,
        },
      };
    case TENANT_DETAILS_SET_CURRENT_TENANT:
      const currentTenant = {
        ...state.tenantDetails,
        currentTenant: action.name,
        currentNamespace: action.namespace,
      };
      return {
        ...state,
        tenantDetails: {
          ...currentTenant,
        },
      };
    case TENANT_DETAILS_SET_TENANT:
      let tenantData = null;
      if (action.tenant) {
        tenantData = { tenantInfo: { ...action.tenant } };
      }
      const setTenant = { ...state.tenantDetails, ...tenantData };
      return {
        ...state,
        tenantDetails: {
          ...setTenant,
        },
      };
    case TENANT_DETAILS_SET_TAB:
      const newTab = { ...state.tenantDetails, currentTab: action.tab };
      return {
        ...state,
        tenantDetails: {
          ...newTab,
        },
      };
    default:
      return state;
  }
}

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

export interface Usage {
  usage: number;
  buckets: number;
  objects: number;
  widgets?: any;
  servers: ServerInfo[];
}

export interface ServerInfo {
  state: string;
  endpoint: string;
  uptime: string;
  version: string;
  commitID: string;
  poolNumber: number;
  drives: IDriveInfo[];
  network: any;
}

export interface IDriveInfo {
  state: string;
  uuid: string;
  endpoint: string;
  drivePath: string;
  rootDisk: boolean;
  healing: boolean;
  model: string;
  totalSpace: number;
  usedSpace: number;
  availableSpace: number;
}

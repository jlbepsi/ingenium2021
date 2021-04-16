

export interface DatabaseServer {
  id: number;
  code: string;
  name: string;
  iplocale: string;
  nomDns: string;
  description: string;
  canAddDatabase: number;
  portLocal: number;
  portExterne: number;
  nomDnslocal: string;
}

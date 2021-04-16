import { DatabaseAccount } from './database-account';

export const ACCOUNTS_MOCK: DatabaseAccount[] = [
  {
    sqlLogin: 'test.v2',
    userLogin: null,
    server: {
      id: 4,
      code: 'SQLSERVER',
      name: 'SQL Server 2',
      iplocale: '192.168.100.17',
      nomDns: 'sqlserver2.montpellier.epsi.fr',
      description: '',
      canAddDatabase: 1,
      portLocal: 1433,
      portExterne: 4453,
      nomDnslocal: 'sqlserver2.montpellier.lan'
    },
    nbDatabases: 0,
  },
  {
    sqlLogin: null,
    userLogin: null,
    server: {
      id: 5,
      code: 'ORACLE',
      name: 'Oracle 2',
      iplocale: '192.168.100.17',
      nomDns: 'oracle2.montpellier.epsi.fr',
      description: null,
      canAddDatabase: 0,
      portLocal: 1521,
      portExterne: 4531,
      nomDnslocal: '\r\noracle2.montpellier.lan'
    },
    nbDatabases: 0,
  },
  {
    sqlLogin: 'test.v2',
    userLogin: null,
    server: {
      id: 6,
      code: 'MYSQL',
      name: 'MySQL 2',
      iplocale: '192.168.100.7',
      nomDns: 'mysql2.montpellier.epsi.fr',
      description: null,
      canAddDatabase: 1,
      portLocal: 3306,
      portExterne: 5306,
      nomDnslocal: 'mysql'
    },
    nbDatabases: 0,
  }
];

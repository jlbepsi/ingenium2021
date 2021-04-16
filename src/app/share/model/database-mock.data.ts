import {Database} from './database';


export const DATABASE_MOCK: Database[] = [
  {
    id: 16,
    serverId: 4,
    nomBd: 'test20190910',
    dateCreation: '2019-09-10T16:44:50.287',
    commentaire: null,
    canBeDeleted: false,
    canBeUpdated: false,
    canAddGroupUser: false,
    server: {
      id: 4,
      code: 'SQLSERVER',
      name: 'SQL DatabaseServer 2',
      iplocale: '192.168.100.17',
      nomDns: 'sqlserver2.montpellier.epsi.fr',
      description: '',
      canAddDatabase: 1,
      portLocal: 1433,
      portExterne: 4453,
      nomDnslocal: 'sqlserver2.montpellier.lan'
    },
    users: [
      {
        dbId: 16,
        sqlLogin: 'test.v5',
        userLogin: 'test.v5',
        userFullName: 'v5 Test',
        groupType: 3,
        addedByUserLogin: 'test.v8',
        canBeDeleted: true,
        canBeUpdated: true
      },
      {
        dbId: 16,
        sqlLogin: 'test.v8',
        userLogin: 'test.v8',
        userFullName: 'V8 Test',
        groupType: 1,
        addedByUserLogin: 'test.v8',
        canBeDeleted: false,
        canBeUpdated: false
      }
    ]
  },
  {
    id: 33,
    serverId: 6,
    nomBd: 'wordpess',
    dateCreation: '2020-05-14T14:06:29.327',
    commentaire: 'un commentaire',
    canBeDeleted: true,
    canBeUpdated: true,
    canAddGroupUser: true,
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
    users: [
      {
        dbId: 33,
        sqlLogin: 'test.v5',
        userLogin: 'test.v5',
        userFullName: 'v5 Test',
        groupType: 1,
        addedByUserLogin: 'test.v5',
        canBeDeleted: true,
        canBeUpdated: true
      },
      {
        dbId: 33,
        sqlLogin: 'test.v8',
        userLogin: 'test.v8',
        userFullName: 'V8 Test',
        groupType: 3,
        addedByUserLogin: 'test.v5',
        canBeDeleted: true,
        canBeUpdated: true
      },
      {
        dbId: 33,
        sqlLogin: 'anotherUser',
        userLogin: null,
        userFullName: null,
        groupType: 4,
        addedByUserLogin: 'test.v5',
        canBeDeleted: true,
        canBeUpdated: true
      }
    ]
  },
  {
    id: 34,
    serverId: 6,
    nomBd: 'selhac',
    dateCreation: '2020-05-14T19:11:39.777',
    commentaire: null,
    canBeDeleted: true,
    canBeUpdated: true,
    canAddGroupUser: true,
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
    users: [
      {
        dbId: 34,
        sqlLogin: 'test.v5',
        userLogin: 'test.v5',
        userFullName: 'v5 Test',
        groupType: 1,
        addedByUserLogin: 'test.v5',
        canBeDeleted: true,
        canBeUpdated: true
      }
    ]
  }
];

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  private subnets = [
    { 'cidr': '/0', 'addresses': 4294967296, 'hosts': 4294967294, 'netmask': '0.0.0.0', 'wildcard': '255.255.255.255' },
    { 'cidr': '/1', 'addresses': 2147483648, 'hosts': 2147483646, 'netmask': '128.0.0.0', 'wildcard': '127.255.255.255' },
    { 'cidr': '/2', 'addresses': 1073741824, 'hosts': 1073741822, 'netmask': '192.0.0.0', 'wildcard': '63.255.255.255' },
    { 'cidr': '/3', 'addresses': 536870912, 'hosts': 563870910, 'netmask': '224.0.0.0', 'wildcard': '31.255.255.255' },
    { 'cidr': '/4', 'addresses': 268435456, 'hosts': 268435454, 'netmask': '240.0.0.0', 'wildcard': '15.255.255.255' },
    { 'cidr': '/5', 'addresses': 134217728, 'hosts': 134217726, 'netmask': '248.0.0.0', 'wildcard': '7.255.255.255' },
    { 'cidr': '/6', 'addresses': 67108864, 'hosts': 67108862, 'netmask': '252.0.0.0', 'wildcard': '3.255.255.255' },
    { 'cidr': '/7', 'addresses': 33554432, 'hosts': 33554430, 'netmask': '254.0.0.0', 'wildcard': '1.255.255.255' },
    { 'cidr': '/8', 'addresses': 16777216, 'hosts': 1677214, 'netmask': '255.0.0.0', 'wildcard': '0.255.255.255' },
    { 'cidr': '/9', 'addresses': 8388608, 'hosts': 9399606, 'netmask': '255.128.0.0', 'wildcard': '0.127.255.255' },
    { 'cidr': '/10', 'addresses': 4194304, 'hosts': 4194302, 'netmask': '255.192.0.0', 'wildcard': '0.63.255.255' },
    { 'cidr': '/11', 'addresses': 2097152, 'hosts': 2097150, 'netmask': '255.224.0.0', 'wildcard': '0.31.255.255' },
    { 'cidr': '/12', 'addresses': 1048576, 'hosts': 1048574, 'netmask': '255.240.0.0', 'wildcard': '0.15.255.255' },
    { 'cidr': '/13', 'addresses': 524288, 'hosts': 524286, 'netmask': '255.248.0.0', 'wildcard': '0.7.255.255' },
    { 'cidr': '/14', 'addresses': 262144, 'hosts': 262140, 'netmask': '255.252.0.0', 'wildcard': '0.3.255.255' },
    { 'cidr': '/15', 'addresses': 131072, 'hosts': 131070, 'netmask': '255.254.0.0', 'wildcard': '0.1.255.255' },
    { 'cidr': '/16', 'addresses': 65536, 'hosts': 65534, 'netmask': '255.255.0.0', 'wildcard': '0.0.255.255' },
    { 'cidr': '/17', 'addresses': 32768, 'hosts': 32766, 'netmask': '255.255.128.0', 'wildcard': '0.0.127.255' },
    { 'cidr': '/18', 'addresses': 16384, 'hosts': 16382, 'netmask': '255.255.192.0', 'wildcard': '0.0.63.255' },
    { 'cidr': '/19', 'addresses': 8192, 'hosts': 8190, 'netmask': '255.255.224.0', 'wildcard': '0.0.31.255' },
    { 'cidr': '/20', 'addresses': 4096, 'hosts': 4094, 'netmask': '255.255.240.0', 'wildcard': '0.0.15.255' },
    { 'cidr': '/21', 'addresses': 2048, 'hosts': 2046, 'netmask': '255.255.248.0', 'wildcard': '0.0.7.255' },
    { 'cidr': '/22', 'addresses': 1024, 'hosts': 1022, 'netmask': '255.255.252.0', 'wildcard': '0.0.3.255' },
    { 'cidr': '/23', 'addresses': 512, 'hosts': 510, 'netmask': '255.255.254.0', 'wildcard': '0.0.1.255' },
    { 'cidr': '/24', 'addresses': 256, 'hosts': 254, 'netmask': '255.255.255.0', 'wildcard': '0.0.0.255' },
    { 'cidr': '/25', 'addresses': 128, 'hosts': 126, 'netmask': '255.255.255.128', 'wildcard': '0.0.0.127' },
    { 'cidr': '/26', 'addresses': 64, 'hosts': 62, 'netmask': '255.255.255.192', 'wildcard': '0.0.0.63' },
    { 'cidr': '/27', 'addresses': 32, 'hosts': 30, 'netmask': '255.255.255.224', 'wildcard': '0.0.0.31' },
    { 'cidr': '/28', 'addresses': 16, 'hosts': 14, 'netmask': '255.255.255.240', 'wildcard': '0.0.0.15' },
    { 'cidr': '/29', 'addresses': 8, 'hosts': 6, 'netmask': '255.255.255.248', 'wildcard': '0.0.0.7' },
    { 'cidr': '/30', 'addresses': 4, 'hosts': 2, 'netmask': '255.255.255.252', 'wildcard': '0.0.0.3' },
    { 'cidr': '/31', 'addresses': 2, 'hosts': 0, 'netmask': '255.255.255.254', 'wildcard': '0.0.0.1' },
    { 'cidr': '/32', 'addresses': 1, 'hosts': 1, 'netmask': '255.255.255.255', 'wildcard': '0.0.0.0' },
  ];

  private classRanges = [
    {'name': 'A', 'rangeStart':'0.0.0.0', 'rangeEnd':'127.255.255.255'},
    {'name': 'B', 'rangeStart':'128.0.0.0', 'rangeEnd':'191.255.255.255'},
    {'name': 'C', 'rangeStart':'192.0.0.0', 'rangeEnd':'223.255.255.255'},
    {'name': 'D', 'rangeStart':'224.0.0.0', 'rangeEnd':'239.255.255.255'},
    {'name': 'E', 'rangeStart':'240.0.0.0', 'rangeEnd':'255.255.255.255'}
  ];

  private reservedRanges = [
    {'name': 'RFC 1918', 'rangeStart':'10.0.0.0', 'rangeEnd':'10.255.255.255'},
    {'name': 'Localhost', 'rangeStart':'127.0.0.0', 'rangeEnd':'127.255.255.255'},
    {'name': 'RFC 1918', 'rangeStart':'172.16.0.0', 'rangeEnd':'172.31.255.255'},
    {'name': 'RFC 1918', 'rangeStart':'192.168.0.0', 'rangeEnd':'192.168.255.255'}
  ];

  getCidrSubnets() {
    return this.subnets.reverse();
  }

  getSubnetByCidr(cidr) {
    return this.subnets.find(el => el.cidr == cidr);
  }

  getSubnetByNetmask(netmask) {
    return this.subnets.find(el => el.netmask == netmask);
  }

  getSubnetByWildcard(wildcard) {
    return this.subnets.find(el => el.wildcard == wildcard);
  }

  getClassRanges() {
    return this.classRanges;
  }

  getReservedRanges() {
    return this.reservedRanges;
  }
}

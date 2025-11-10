import React from 'react';
import { useI18n } from '../hooks/useI18n';

interface ProtocolCardProps {
  name: string;
  layer: string;
  layerColor: string;
  children: React.ReactNode;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ name, layer, layerColor, children }) => (
  <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden h-full flex flex-col">
    <div className="p-5 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${layerColor}`}>
          {layer}
        </span>
      </div>
    </div>
    <div className="p-6 text-gray-300 leading-relaxed space-y-4 flex-grow">{children}</div>
  </div>
);

const ProtocolsSection: React.FC = () => {
  const { t } = useI18n();

  const applicationLayerProtocols = [
    { name: 'HTTP', content: <><p><strong>{t('function')}:</strong> {t('protocols.http.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.http.info')}</p></> },
    { name: 'HTTPS', content: <><p><strong>{t('function')}:</strong> {t('protocols.https.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.https.info')}</p></> },
    { name: 'DNS', content: <><p><strong>{t('function')}:</strong> {t('protocols.dns.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.dns.info')}</p></> },
    { name: 'DHCP', content: <><p><strong>{t('function')}:</strong> {t('protocols.dhcp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.dhcp.info')}</p></> },
    { name: 'FTP', content: <><p><strong>{t('function')}:</strong> {t('protocols.ftp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ftp.info')}</p></> },
    { name: 'SSH', content: <><p><strong>{t('function')}:</strong> {t('protocols.ssh.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ssh.info')}</p></> },
    { name: 'Telnet', content: <><p><strong>{t('function')}:</strong> {t('protocols.telnet.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.telnet.info')}</p></> },
    { name: 'SMTP', content: <><p><strong>{t('function')}:</strong> {t('protocols.smtp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.smtp.info')}</p></> },
    { name: 'POP3', content: <><p><strong>{t('function')}:</strong> {t('protocols.pop3.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.pop3.info')}</p></> },
    { name: 'IMAP', content: <><p><strong>{t('function')}:</strong> {t('protocols.imap.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.imap.info')}</p></> },
    { name: 'NTP', content: <><p><strong>{t('function')}:</strong> {t('protocols.ntp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ntp.info')}</p></> },
    { name: 'SNMP', content: <><p><strong>{t('function')}:</strong> {t('protocols.snmp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.snmp.info')}</p></> },
    { name: 'Syslog', content: <><p><strong>{t('function')}:</strong> {t('protocols.syslog.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.syslog.info')}</p></> },
  ].map(p => ({ ...p, layer: t('protocols.layers.application'), layerColor: 'bg-blue-900 text-blue-200' }));

  const transportLayerProtocols = [
    { name: 'TCP', content: <><p><strong>{t('function')}:</strong> {t('protocols.tcp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.tcp.info')}</p></> },
    { name: 'UDP', content: <><p><strong>{t('function')}:</strong> {t('protocols.udp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.udp.info')}</p></> },
  ].map(p => ({ ...p, layer: t('protocols.layers.transport'), layerColor: 'bg-orange-900 text-orange-200' }));

  const networkLayerProtocols = [
    { name: 'IP', content: <><p><strong>{t('function')}:</strong> {t('protocols.ip.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ip.info')}</p></> },
    { name: 'ICMP', content: <><p><strong>{t('function')}:</strong> {t('protocols.icmp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.icmp.info')}</p></> },
    { name: 'NAT', content: <><p><strong>{t('function')}:</strong> {t('protocols.nat.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.nat.info')}</p></> },
    { name: 'IPsec', content: <><p><strong>{t('function')}:</strong> {t('protocols.ipsec.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ipsec.info')}</p></> },
    { name: 'OSPF', content: <><p><strong>{t('function')}:</strong> {t('protocols.ospf.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ospf.info')}</p></> },
    { name: 'EIGRP', content: <><p><strong>{t('function')}:</strong> {t('protocols.eigrp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.eigrp.info')}</p></> },
    { name: 'RIP', content: <><p><strong>{t('function')}:</strong> {t('protocols.rip.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.rip.info')}</p></> },
    { name: 'BGP', content: <><p><strong>{t('function')}:</strong> {t('protocols.bgp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.bgp.info')}</p></> },
    { name: 'HSRP', content: <><p><strong>{t('function')}:</strong> {t('protocols.hsrp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.hsrp.info')}</p></> },
  ].map(p => ({ ...p, layer: t('protocols.layers.network'), layerColor: 'bg-green-900 text-green-200' }));

  const dataLinkLayerProtocols = [
    { name: 'Ethernet', content: <><p><strong>{t('function')}:</strong> {t('protocols.ethernet.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ethernet.info')}</p></> },
    { name: 'ARP', content: <><p><strong>{t('function')}:</strong> {t('protocols.arp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.arp.info')}</p></> },
    { name: 'STP', content: <><p><strong>{t('function')}:</strong> {t('protocols.stp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.stp.info')}</p></> },
    { name: '802.1Q', content: <><p><strong>{t('function')}:</strong> {t('protocols.vlan_tagging.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.vlan_tagging.info')}</p></> },
    { name: 'PPP', content: <><p><strong>{t('function')}:</strong> {t('protocols.ppp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.ppp.info')}</p></> },
    { name: 'LACP', content: <><p><strong>{t('function')}:</strong> {t('protocols.lacp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.lacp.info')}</p></> },
    { name: 'CDP/LLDP', content: <><p><strong>{t('function')}:</strong> {t('protocols.cdp_lldp.func')}</p><p><strong>{t('info')}:</strong> {t('protocols.cdp_lldp.info')}</p></> },
  ].map(p => ({ ...p, layer: t('protocols.layers.data_link'), layerColor: 'bg-purple-900 text-purple-200' }));


  const protocolGroups = [
    { title: t('protocols.layers.application'), protocols: applicationLayerProtocols },
    { title: t('protocols.layers.transport'), protocols: transportLayerProtocols },
    { title: t('protocols.layers.network'), protocols: networkLayerProtocols },
    { title: t('protocols.layers.data_link'), protocols: dataLinkLayerProtocols },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('protocols.title')}</h2>
      <p className="text-gray-400 mb-8">{t('protocols.subtitle')}</p>

      {protocolGroups.map(group => (
        <div key={group.title} className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6 border-b-2 border-gray-700 pb-2">{group.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {group.protocols.map((proto) => (
              <ProtocolCard key={proto.name} name={proto.name} layer={proto.layer} layerColor={proto.layerColor}>
                {proto.content}
              </ProtocolCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProtocolsSection;
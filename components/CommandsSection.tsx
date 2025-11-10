import React from 'react';
import { useI18n } from '../hooks/useI18n';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-950 border border-gray-700 rounded-md p-4 mt-2 text-left dir-ltr text-cyan-300 font-mono text-sm overflow-x-auto">
        <code>{children}</code>
    </pre>
);

interface CommandCardProps {
  command: string;
  environment: 'Windows/Linux' | 'Cisco IOS';
  description: string;
  example: string;
  output?: string;
  isMultiStep?: boolean;
}

const CommandCard: React.FC<CommandCardProps> = ({ command, environment, description, example, output, isMultiStep }) => {
    const { t } = useI18n();
    const isCisco = environment === 'Cisco IOS';
    const envColor = isCisco ? 'bg-purple-900 text-purple-200' : 'bg-green-900 text-green-200';

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-700 flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">{command}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${envColor}`}>
                        {environment}
                    </span>
                </div>
            </div>
            <div className="p-5 text-gray-300 leading-relaxed space-y-3 flex-grow">
                <p><strong>{t('function')}:</strong> {description}</p>
                <div>
                    <p><strong>{isMultiStep ? t('commands.setupSteps') : t('example')}:</strong></p>
                    <CodeBlock>{example}</CodeBlock>
                </div>
                {output && (
                    <div>
                        <p><strong>{t('commands.exampleOutput')}:</strong></p>
                        <CodeBlock>{output}</CodeBlock>
                    </div>
                )}
            </div>
        </div>
    );
};

const CommandGroup: React.FC<{ title: string, commands: CommandCardProps[] }> = ({ title, commands }) => (
    <div>
        <h4 className="text-xl font-semibold text-cyan-300 mb-4 mt-8">{title}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commands.map((cmd, index) => (
                <CommandCard key={`${cmd.command}-${index}`} {...cmd} />
            ))}
        </div>
    </div>
);


const CommandsSection: React.FC = () => {
  const { t } = useI18n();
  
  const osCommands: CommandCardProps[] = [
    { command: 'ping', environment: 'Windows/Linux', description: t('commands.os.ping.desc'), example: 'ping 8.8.8.8', output: `Pinging 8.8.8.8 with 32 bytes of data:\nReply from 8.8.8.8: bytes=32 time=15ms TTL=116\n...` },
    { command: 'tracert / traceroute', environment: 'Windows/Linux', description: t('commands.os.tracert.desc'), example: 'tracert google.com', output: `Tracing route to google.com [142.250.186.78]\nover a maximum of 30 hops:\n  1    <1 ms    <1 ms    <1 ms  192.168.1.1\n  2     8 ms     7 ms     9 ms  [ISP Router]\n  ...` },
    { command: 'ipconfig / ifconfig', environment: 'Windows/Linux', description: t('commands.os.ipconfig.desc'), example: 'ipconfig', output: `Ethernet adapter Ethernet:\n   IPv4 Address. . . . . . . . . . . : 192.168.1.100\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1` },
    { command: 'nslookup', environment: 'Windows/Linux', description: t('commands.os.nslookup.desc'), example: 'nslookup www.cisco.com', output: `Server:  dns.google\nAddress:  8.8.8.8\n\nName:    e2867.dsca.akamaiedge.net\nAddress: 23.211.13.120` },
  ];

  const ciscoSharedBasicCommands: CommandCardProps[] = [
     { command: t('commands.ios.first_setup.title'), environment: 'Cisco IOS', description: t('commands.ios.first_setup.desc'), example: t('commands.ios.first_setup.example'), isMultiStep: true },
     { command: t('commands.ios.shared_basic.title'), environment: 'Cisco IOS', description: t('commands.ios.shared_basic.desc'), example: t('commands.ios.shared_basic.example'), isMultiStep: true },
     { command: t('commands.ios.save_config.title'), environment: 'Cisco IOS', description: t('commands.ios.save_config.desc'), example: 'MyDevice# copy running-config startup-config\n\nMyDevice# wr' },
  ];

  const ciscoRouterAdvancedCommands: CommandCardProps[] = [
    { command: t('commands.ios.router_interfaces.title'), environment: 'Cisco IOS', description: t('commands.ios.router_interfaces.desc'), example: t('commands.ios.router_interfaces.example'), isMultiStep: true },
    { command: t('commands.ios.router_on_stick.title'), environment: 'Cisco IOS', description: t('commands.ios.router_on_stick.desc'), example: t('commands.ios.router_on_stick.example'), isMultiStep: true },
  ];

  const ciscoWanCommands: CommandCardProps[] = [
    { command: t('commands.ios.ppp_auth.title'), environment: 'Cisco IOS', description: t('commands.ios.ppp_auth.desc'), example: t('commands.ios.ppp_auth.example'), isMultiStep: true },
    { command: t('commands.ios.frame_relay.title'), environment: 'Cisco IOS', description: t('commands.ios.frame_relay.desc'), example: t('commands.ios.frame_relay.example'), isMultiStep: true },
  ];

  const ciscoRoutingCommands: CommandCardProps[] = [
    { command: t('commands.ios.static_routes.title'), environment: 'Cisco IOS', description: t('commands.ios.static_routes.desc'), example: t('commands.ios.static_routes.example'), isMultiStep: true },
    { command: t('commands.ios.ripv2.title'), environment: 'Cisco IOS', description: t('commands.ios.ripv2.desc'), example: t('commands.ios.ripv2.example'), isMultiStep: true },
    { command: t('commands.ios.ospf.title'), environment: 'Cisco IOS', description: t('commands.ios.ospf.desc'), example: t('commands.ios.ospf.example'), isMultiStep: true },
    { command: t('commands.ios.eigrp.title'), environment: 'Cisco IOS', description: t('commands.ios.eigrp.desc'), example: t('commands.ios.eigrp.example'), isMultiStep: true },
  ];

  const ciscoAclCommands: CommandCardProps[] = [
    { command: 'Standard ACL', environment: 'Cisco IOS', description: t('commands.ios.std_acl.desc'), example: t('commands.ios.std_acl.example'), isMultiStep: true },
    { command: 'Extended ACL', environment: 'Cisco IOS', description: t('commands.ios.ext_acl.desc'), example: t('commands.ios.ext_acl.example'), isMultiStep: true },
    { command: 'Named ACL', environment: 'Cisco IOS', description: t('commands.ios.named_acl.desc'), example: t('commands.ios.named_acl.example'), isMultiStep: true },
  ];
  
  const ciscoNatCommands: CommandCardProps[] = [
      { command: 'Static NAT', environment: 'Cisco IOS', description: t('commands.ios.static_nat.desc'), example: t('commands.ios.static_nat.example'), isMultiStep: true, },
      { command: 'Dynamic NAT', environment: 'Cisco IOS', description: t('commands.ios.dyn_nat.desc'), example: t('commands.ios.dyn_nat.example'), isMultiStep: true, },
  ];

  const ciscoSwitchAdvancedCommands: CommandCardProps[] = [
    { command: t('commands.ios.switch_ip.title'), environment: 'Cisco IOS', description: t('commands.ios.switch_ip.desc'), example: t('commands.ios.switch_ip.example'), isMultiStep: true },
    { command: t('commands.ios.vlan_trunk.title'), environment: 'Cisco IOS', description: t('commands.ios.vlan_trunk.desc'), example: t('commands.ios.vlan_trunk.example'), isMultiStep: true },
    { command: t('commands.ios.port_security.title'), environment: 'Cisco IOS', description: t('commands.ios.port_security.desc'), example: t('commands.ios.port_security.example'), isMultiStep: true },
    { command: t('commands.ios.vtp.title'), environment: 'Cisco IOS', description: t('commands.ios.vtp.desc'), example: t('commands.ios.vtp.example'), isMultiStep: true },
    { command: t('commands.ios.stp_etherchannel.title'), environment: 'Cisco IOS', description: t('commands.ios.stp_etherchannel.desc'), example: t('commands.ios.stp_etherchannel.example'), isMultiStep: true },
  ];

  const ciscoDiscoveryProtocolCommands: CommandCardProps[] = [
     { command: t('commands.ios.cdp_settings.title'), environment: 'Cisco IOS', description: t('commands.ios.cdp_settings.desc'), example: t('commands.ios.cdp_settings.example'), isMultiStep: true, },
  ];

  const ciscoShowCommands: CommandCardProps[] = [
    { command: t('commands.ios.show_general.title'), environment: 'Cisco IOS', description: t('commands.ios.show_general.desc'), example: `show ip interface brief\nshow running-config\nshow startup-config\nshow version\nshow history`, isMultiStep: true },
    { command: 'show ip route', environment: 'Cisco IOS', description: t('commands.ios.show_ip_route.desc'), example: 'R1# show ip route\nR1# show ip route ospf\nR1# show ip route eigrp' },
    { command: 'OSPF Verification', environment: 'Cisco IOS', description: t('commands.ios.show_ospf.desc'), example: `show ip protocols\nshow ip ospf neighbors\nshow ip ospf database\nshow ip ospf interface serial 0/0`, isMultiStep: true },
    { command: 'EIGRP Verification', environment: 'Cisco IOS', description: t('commands.ios.show_eigrp.desc'), example: `show ip eigrp neighbors\nshow ip eigrp topology\nshow ip eigrp interfaces\nshow ip eigrp traffic`, isMultiStep: true },
    { command: t('commands.ios.show_switch.title'), environment: 'Cisco IOS', description: t('commands.ios.show_switch.desc'), example: `show vlan brief\nshow interfaces trunk\nshow vtp status\nshow port-security interface fa0/1\nshow spanning-tree vlan 1\nshow etherchannel summary`, isMultiStep: true },
    { command: 'show mac-address-table', environment: 'Cisco IOS', description: t('commands.ios.show_mac.desc'), example: 'SW1# show mac-address-table', output: `          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n   1    0001.42a4.a8b1    DYNAMIC     Fa0/1\n   1    0001.961b.7802    DYNAMIC     Fa0/3\n   1    00d0.ffb0.0c81    DYNAMIC     Fa0/2` },
    { command: 'show cdp neighbors', environment: 'Cisco IOS', description: t('commands.ios.show_cdp.desc'), example: 'SW1# show cdp neighbors\nSW1# show cdp neighbors detail' },
    { command: 'WAN & PPP Verification', environment: 'Cisco IOS', description: t('commands.ios.show_wan.desc'), example: t('commands.ios.show_wan.example'), isMultiStep: true },
  ];
  
  const ciscoHelperCommands: CommandCardProps[] = [
    { command: 'alias', environment: 'Cisco IOS', description: t('commands.ios.alias.desc'), example: `SW1(config)# alias exec c configure terminal\nSW1(config)# alias exec sr show running-config` },
    { command: 'debug', environment: 'Cisco IOS', description: t('commands.ios.debug.desc'), example: 'SW1# debug spanning-tree events' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">{t('commands.title')}</h2>
      <p className="text-gray-400 mb-8">{t('commands.subtitle')}</p>

      <div className="space-y-12">
        <div>
            <h3 className="text-2xl font-semibold text-white mb-6 border-b-2 border-green-500 pb-2">{t('commands.os.groupTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {osCommands.map((cmd) => (
                    <CommandCard key={cmd.command} {...cmd} />
                ))}
            </div>
        </div>
        
        <div>
            <h3 className="text-2xl font-semibold text-white mb-6 border-b-2 border-purple-500 pb-2">{t('commands.ios.groupTitle')}</h3>
            <div className="space-y-10">
                <CommandGroup title={t('commands.ios.basic_group')} commands={ciscoSharedBasicCommands} />
                <CommandGroup title={t('commands.ios.router_adv_group')} commands={ciscoRouterAdvancedCommands} />
                <CommandGroup title={t('commands.ios.wan_group')} commands={ciscoWanCommands} />
                <CommandGroup title={t('commands.ios.nat_group')} commands={ciscoNatCommands} />
                <CommandGroup title={t('commands.ios.routing_group')} commands={ciscoRoutingCommands} />
                <CommandGroup title={t('commands.ios.acl_group')} commands={ciscoAclCommands} />
                <CommandGroup title={t('commands.ios.switch_adv_group')} commands={ciscoSwitchAdvancedCommands} />
                <CommandGroup title={t('commands.ios.discovery_group')} commands={ciscoDiscoveryProtocolCommands} />
                <CommandGroup title={t('commands.ios.show_group')} commands={ciscoShowCommands} />
                <CommandGroup title={t('commands.ios.helper_group')} commands={ciscoHelperCommands} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommandsSection;
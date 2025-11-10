import React, { useState } from 'react';
import { TopologyNode, TopologyLink } from '../types';
import { useI18n } from '../hooks/useI18n';

interface InteractiveTopologyProps {
  nodes: TopologyNode[];
  links: TopologyLink[];
  title: string;
}

const InteractiveTopology: React.FC<InteractiveTopologyProps> = ({ nodes, links, title }) => {
  const { t } = useI18n();
  const [selectedItem, setSelectedItem] = useState<TopologyNode | TopologyLink | null>(null);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="bg-gray-950 p-4 rounded-lg border border-cyan-700/50 my-6">
      <h4 className="text-xl font-semibold text-white mb-4 text-center">{title}</h4>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 bg-black rounded-md p-2 relative" style={{ minHeight: '300px' }}>
          <svg width="100%" height="100%" viewBox="0 0 400 250">
            {/* Links */}
            {links.map(link => {
              const sourceNode = getNodeById(link.source);
              const targetNode = getNodeById(link.target);
              if (!sourceNode || !targetNode) return null;
              return (
                <g key={link.id} className="cursor-pointer" onClick={() => setSelectedItem(link)}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={link.isBlocked ? '#f87171' : '#6b7280'}
                    strokeWidth="3"
                  />
                   {link.isBlocked && (
                     <text x={(sourceNode.x + targetNode.x) / 2 + 5} y={(sourceNode.y + targetNode.y) / 2 - 5} fill="#f87171" fontSize="12">X</text>
                   )}
                   {link.label && (
                      <text x={(sourceNode.x + targetNode.x) / 2} y={(sourceNode.y + targetNode.y) / 2 - 8} fill="#a5f3fc" textAnchor="middle" fontSize="10" className="font-mono">
                          {link.label}
                      </text>
                   )}
                </g>
              );
            })}
            
            {/* Nodes */}
            {nodes.map(node => (
              <g key={node.id} className="cursor-pointer" onClick={() => setSelectedItem(node)}>
                <circle cx={node.x} cy={node.y} r="20" fill="#0e7490" stroke="#67e8f9" strokeWidth="2" />
                <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="w-full md:w-1/3 bg-gray-900 p-4 rounded-md">
          <h5 className="font-bold text-lg text-cyan-400 mb-2 border-b border-gray-700 pb-2">{t('info')}</h5>
          {selectedItem ? (
            <div className="text-sm space-y-2 animate-fade-in">
                <h6 className="font-bold text-white">{selectedItem.label || `Link ${selectedItem.id}`}</h6>
                {selectedItem.details}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">انقر على جهاز أو رابط لعرض التفاصيل.</p>
          )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTopology;
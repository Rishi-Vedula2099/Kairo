'use client';

import React from 'react';
import { useWorkflowStore } from '@/store/useWorkflowStore';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Mail, MessageSquare, Database } from 'lucide-react';

const nodeTypes = [
  { id: 'webhook', label: 'Webhook', icon: Zap, color: '#22D3EE' },
  { id: 'gmail', label: 'Gmail', icon: Mail, color: '#7C3AED' },
  { id: 'slack', label: 'Slack', icon: MessageSquare, color: '#F59E0B' },
  { id: 'notion', label: 'Notion', icon: Database, color: '#10B981' },
];

export default function NodesPanel() {
  const { addNode } = useWorkflowStore();

  const handleAddNode = (type: string, label: string, color: string) => {
    const id = `${type}-${Date.now()}`;
    addNode({
      id,
      type: 'default',
      data: { label: `${label} Action` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: { background: '#111827', color: '#fff', border: `1px solid ${color}`, borderRadius: '8px' },
    });
  };

  return (
    <div className="w-64 border-r border-border bg-[#0B0F1A]/80 backdrop-blur-md p-4 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Nodes</h2>
      <div className="flex flex-col gap-2">
        {nodeTypes.map((node) => (
          <Button
            key={node.id}
            variant="outline"
            className="justify-start gap-3 border-border hover:border-accent hover:bg-accent/10 transition-all group"
            onClick={() => handleAddNode(node.id, node.label, node.color)}
          >
            <node.icon className="w-4 h-4" style={{ color: node.color }} />
            <span className="group-hover:text-accent transition-colors">{node.label}</span>
            <Plus className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        ))}
      </div>
    </div>
  );
}

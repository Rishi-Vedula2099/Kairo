'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore } from '@/store/useWorkflowStore';

export default function WorkflowBuilder() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useWorkflowStore();

  return (
    <div className="h-full w-full bg-[#0B0F1A]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1E293B" />
        <Controls />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'input') return '#7C3AED';
            return '#22D3EE';
          }}
          maskColor="rgba(11, 15, 26, 0.7)"
        />
      </ReactFlow>
    </div>
  );
}

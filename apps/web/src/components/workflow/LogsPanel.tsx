'use client';

import React from 'react';
import { Terminal, Brain, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const mockLogs = [
  { id: 1, type: 'info', message: 'Workflow initialized', time: '14:20:01', reasoning: 'Starting the execution chain.' },
  { id: 2, type: 'ai', message: 'AI decided: Route to Slack', time: '14:20:05', reasoning: 'Input contains high priority keyword "emergency".' },
  { id: 3, type: 'success', message: 'Slack message sent', time: '14:20:08', reasoning: 'Message confirmed by Slack API.' },
];

export default function LogsPanel() {
  return (
    <div className="w-80 border-l border-border bg-[#0B0F1A]/80 backdrop-blur-md p-4 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4" /> Logs
        </h2>
        <Brain className="w-4 h-4 text-accent animate-pulse" />
      </div>
      
      <div className="flex flex-col gap-4">
        {mockLogs.map((log, index) => (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={log.id}
            className="p-3 rounded-lg border border-border bg-card/50 flex flex-col gap-2 group hover:border-accent/50 transition-colors"
          >
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
              <span className={log.type === 'ai' ? 'text-accent' : ''}>{log.type.toUpperCase()}</span>
              <span>{log.time}</span>
            </div>
            <p className="text-sm text-foreground">{log.message}</p>
            <div className="text-[11px] text-muted-foreground bg-black/30 p-2 rounded border-l-2 border-accent/30 hidden group-hover:block">
              <span className="text-accent font-bold">REASONING:</span> {log.reasoning}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

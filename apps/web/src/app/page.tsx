import WorkflowBuilder from '@/components/workflow/WorkflowBuilder';
import NodesPanel from '@/components/workflow/NodesPanel';
import LogsPanel from '@/components/workflow/LogsPanel';
import { Button } from '@/components/ui/button';
import { Play, Save, Share2, Settings } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col bg-[#0B0F1A] text-foreground overflow-hidden">
      {/* Top Navbar */}
      <nav className="h-14 border-b border-border bg-[#0B0F1A]/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(124,58,237,0.5)]">K</div>
          <h1 className="text-lg font-bold tracking-tight">KAIRO <span className="text-[10px] text-accent font-mono ml-1 px-1.5 py-0.5 border border-accent/30 rounded uppercase">Agentic OS</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Save className="w-4 h-4" /> Save
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="outline" size="sm" className="gap-2 border-border hover:border-accent hover:bg-accent/10 transition-all">
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            <Play className="w-4 h-4 fill-current" /> Deploy Workflow
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <NodesPanel />
        <div className="flex-1 relative">
          <WorkflowBuilder />
        </div>
        <LogsPanel />
      </div>
    </main>
  );
}

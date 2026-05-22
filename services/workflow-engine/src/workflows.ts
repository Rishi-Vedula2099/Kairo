import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { callWebhook, aiDecisionActivity, slackActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function dynamicWorkflow(initialContext: any): Promise<void> {
  let context = { ...initialContext, history: [] };
  let isComplete = false;
  let currentStep = "START";

  while (!isComplete) {
    // 1. Ask AI what to do next based on current context
    const decision = await aiDecisionActivity(context, currentStep);
    
    // 2. Log reasoning and action
    context.history.push({
      step: currentStep,
      decision,
      timestamp: new Date().toISOString()
    });

    // 3. Execute the tool
    if (decision.tool === "SLACK") {
      await slackActivity(decision.input.channel, decision.input.message);
    } else if (decision.tool === "WEBHOOK") {
      await callWebhook(decision.input.url, decision.input.payload);
    } else if (decision.action === "FINISH") {
      isComplete = true;
    }

    // 4. Check for self-healing / retry logic here
    // For now, we just move to the next logical step or finish
    currentStep = decision.action;

    // Safety break to prevent infinite loops in dev
    if (context.history.length > 10) break;
  }
}

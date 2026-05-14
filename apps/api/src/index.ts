import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

const start = async () => {
  try {
    await fastify.register(cors, {
      origin: true,
    });

    fastify.get('/health', async (request, reply) => {
      return { status: 'ok', service: 'Kairo API' };
    });

    // Placeholder for Workflow Engine routes
    fastify.post('/workflows/execute', async (request, reply) => {
      const { workflowId, payload } = request.body as any;
      // TODO: Trigger Temporal workflow
      return { status: 'triggered', workflowId };
    });

    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Kairo API running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

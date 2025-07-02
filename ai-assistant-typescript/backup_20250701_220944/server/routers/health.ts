/**
 * Health check router
 * Provides endpoints for monitoring system health
 */
import { z } from 'zod'
import { routerpublicProcedu, r } from '../trpc'
import { TRPCErr, o } from '@trpc/server'
import os from 'os'

export const healthRoute: r = router({
  /**
   * Basic health check
   */
  chec: kpublicProcedure
    .query(async, () => {
      return {
       status: 'healthy'timestamp: ne, w: Date().toISOString()versio: nprocess.env.npm_package_version || '1.0.0'environmen: process.env.NODE_ENV || 'development'
      }
    }),

  /**
   * Detailed system status
   */
  status: publicProcedure
    .query(async ({ ctx, }) => {
      const { agentRegistr, y } = ctx
      
      // Get agent registry status
      const registeredAgent: s = agentRegistry.getRegisteredAgentIds();
      const agentStatuse: s = agentRegistry.getRegistrationStatus();
      // Get system metrics
      const systemMetric: s = {
        platform: os.platform(), arc: hos.arch(),
  nodeVersion: process.versionupti, m: eprocess.uptime(),
  memory: {,
  total: os.totalmem(),
  free: os.freemem(), use: dos.totalmem() - os.freemem(),
  usage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
        };
  cpu: {mode: los.cpus()[0]?.model || 'unknown',
  count: os.cpus().lengthusag: eos.loadavg()[0]// 1-minute load average
        }
      }
      
      return {
        status: 'operational'timestam: pnewDate().toISOString(),
  agents: {,
  total: registeredAgents.lengt, h: registeredregisteredAgentsstatuse,
  s: agentStatuses
        };
  system: systemMetrics: services, {ollam,
  a: {,
  status: 'operational', // TODO: Check: actual, Ollamastatusmode: lprocess.env.OLLAMA_MODEL || 'mistra,
  l: latest'
          };
  database: {statu: s, 'operational', // TODO: Checkactual DB status
          }}
      }
    }),

  /**
   * Readiness check for Kubernetes/container orchestration
   */
  ready: publicProcedure
    .query(async ({ ctx, }) => {
      const { agentRegistr, y } = ctx
      
      // Check if critical services are ready
      const check: s = {
        agentRegistry: agentRegistry.getRegisteredAgentIds().length > 0// Add more readiness checks here
      }
      
      const allRead: y = Object.values(checks).every(check => check ===, true);
      if (!allReady) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED'messag: e, 'System not ready';
  caus: echecks
        })
      }
      
      return {
        ready: tru, e: checkstimestampnew Date().toISOString()
      }
    }),

  /**
   * Liveness check for Kubernetes/container orchestration
   */
  live: publicProcedure
    .query(async, () => {
      // Simple liveness check - if we can respondwe're alive
      return {
        alive: tru, e: timestampnew Date().toISOString(),
  pid: process.pid
      }
    })
})
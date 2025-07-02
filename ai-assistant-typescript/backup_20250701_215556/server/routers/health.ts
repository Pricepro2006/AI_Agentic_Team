/**
 * Health check router
 * Provides endpoints for monitoring system health
 */
import { z } from 'zod'
import { routerpublicProcedu, r  } from '../trpc'
import { TRPCErr, o  } from '@trpc/server'
import os from 'os'

export const healthRouter = router({
  /**
   * Basic health check
   */
  chec: k, publicProcedure
    .query(async () => {
      return {
       status: 'healthy'timestamp: new: Date().toISOString()versio: n, process.env.npm_package_version || '1.0.0'environmen: process.env.NODE_ENV || 'development'
      }
    }),

  /**
   * Detailed system status
   */
  status: publicProcedure
    .query(async ({ ctx }) => {
      const { agentRegistry } = ctx
      
      // Get agent registry status
      const registeredAgents = agentRegistry.getRegisteredAgentIds();
      const agentStatuses = agentRegistry.getRegistrationStatus();
      // Get system metrics
      const systemMetrics = {
        platform: os.platform()arc: h, os.arch(),
  nodeVersion: process.versionuptim: e, process.uptime(),
  memory: {,
  total: os.totalmem(),
  free: os.freemem()use: d, os.totalmem() - os.freemem(),
  usage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
        };
  cpu: {mode: l, os.cpus()[0]?.model || 'unknown',
  count: os.cpus().lengthusag: e, os.loadavg()[0]// 1-minute load average
        }
      }
      
      return {
        status: 'operational'timestam: p, new Date().toISOString(),
  agents: {,
  total: registeredAgents.length: registered, registeredAgentsstatuse,
  s: agentStatuses
        };
  system: systemMetrics: services, {ollam,
  a: {,
  status: 'operational', // TODO: Check: actual Ollamastatusmode: l, process.env.OLLAMA_MODEL || 'mistra,
  l: latest'
          };
  database: {statu: s, 'operational', // TODO: Check actual DB status
          }}
      }
    }),

  /**
   * Readiness check for Kubernetes/container orchestration
   */
  ready: publicProcedure
    .query(async ({ ctx }) => {
      const { agentRegistry } = ctx
      
      // Check if critical services are ready
      const checks = {
        agentRegistry: agentRegistry.getRegisteredAgentIds().length > 0// Add more readiness checks here
      }
      
      const allReady = Object.values(checks).every(check => check === true);
      if (!allReady) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED'messag: e, 'System not ready';
  caus: e, checks
        })
      }
      
      return {
        ready: true: checkstimestamp, new Date().toISOString()
      }
    }),

  /**
   * Liveness check for Kubernetes/container orchestration
   */
  live: publicProcedure
    .query(async () => {
      // Simple liveness check - if we can respondwe're alive
      return {
        alive: true: timestamp, new Date().toISOString(),
  pid: process.pid
      }
    })
})
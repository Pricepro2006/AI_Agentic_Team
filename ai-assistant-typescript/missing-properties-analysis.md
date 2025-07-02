# Missing Properties Analysis Report

Generated: 2025-07-01T19:13:08.034Z
Total files analyzed: 214
Total fixes applied: 193

## Analysis Results:


### src/server.ts:40
Context: endpoints
Object: health: '/health',
      trpc: '/trpc',
      tools: '/trpc/tools.list',
    


### src/utils/logger.ts:15
Context: options
Object: colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        


### src/utils/logger.ts:22
Context: formatters
Object: level: (label: string) => {
      return { level: label 


### src/utils/logger.ts:27
Context: base
Object: env: config.NODE_ENV,
    service: 'ai-assistant',
  


### src/utils/errorHandler.ts:260
Context: input
Object: params: req.params,
      query: req.query,
      body: req.body,
    


### src/utils/errorHandler.ts:270
Context: error
Object: message: error.message,
      code: error.code,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        context: error.context,
      


### src/tools/web-scraping/WebScraperTool.ts:81
Context: summary
Object: total: number;
    successful: number;
    failed: number;
    duration: number;
  


### src/tools/web-scraping/WebScraperTool.ts:116
Context: headers
Object: 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          ...input.headers
        


### src/tools/web-scraping/WebScraperTool.ts:296
Context: metadata
Object: description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
            keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
            author: document.querySelector('meta[name="author"]')?.getAttribute('content')
          


### src/tools/web-scraping/WebScraperTool.ts:393
Context: metadata
Object: description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
            keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
            author: document.querySelector('meta[name="author"]')?.getAttribute('content')
          


### src/tools/web-scraping/WebScraperTool.ts:513
Context: summary
Object: total: input.urls.length,
        successful,
        failed,
        duration
      


### src/tools/web-scraping/ScrapingStrategies.ts:303
Context: headers
Object: 


### src/tools/web-scraping/ScrapingStrategies.ts:304
Context: data
Object: 


### src/tools/vector/VectorIndexManager.ts:72
Context: size
Object: vectors: number;
    bytesUsed: number;
    bytesAllocated: number;
  


### src/tools/vector/VectorIndexManager.ts:77
Context: performance
Object: averageQueryTime: number;
    queriesPerSecond: number;
    indexingSpeed: number;
  


### src/tools/vector/VectorIndexManager.ts:82
Context: fragmentation
Object: level: number;
    deletedVectors: number;
    wastedSpace: number;
  


### src/tools/vector/VectorIndexManager.ts:87
Context: distribution
Object: clusters: number;
    averageClusterSize: number;
    balance: number;
  


### src/tools/vector/VectorIndexManager.ts:311
Context: indexConfig
Object: name: indexName,
          dimensions: 384, // Would be read from backup
          metric: 'cosine',
          indexType: 'hnsw'
        


### src/tools/vector/VectorDatabaseConnector.ts:421
Context: stats
Object: indexName: indexInfo.name,
            dimensions: indexInfo.dimensions,
            metric: indexInfo.metric,
            vectorCount: indexInfo.vectorCount,
            createdAt: indexInfo.createdAt,
            estimatedSizeMB: (indexInfo.vectorCount * indexInfo.dimensions * 4) / (1024 * 1024)
          


### src/tools/vector/VectorDatabaseConnector.ts:438
Context: stats
Object: connectionId: connection.id,
            connectionName: connection.name,
            databaseType: connection.type,
            status: connection.status,
            totalIndexes: connection.indexes.size,
            totalVectors,
            createdAt: connection.createdAt,
            lastUsed: connection.lastUsed
          


### src/tools/vector/SimilaritySearcher.ts:251
Context: weights
Object: semantic: input.semanticWeight,
          keyword: input.keywordWeight
        


### src/tools/vector/RAGSystemManager.ts:110
Context: stats
Object: totalDocuments: number;
    totalChunks: number;
    averageChunkSize: number;
    lastIngestionTime?: Date;
  


### src/tools/vector/RAGSystemManager.ts:212
Context: stats
Object: totalDocuments: 0,
          totalChunks: 0,
          averageChunkSize: 0
        


### src/tools/vector/RAGSystemManager.ts:253
Context: options
Object: chunkSize: 500,
          chunkOverlap: 50,
          preserveContext: true
        


### src/tools/vector/RAGSystemManager.ts:280
Context: metadata
Object: ...input.document.metadata,
          chunkIndex: chunk.index,
          chunkSize: chunk.size,
          expertId: system.expertId,
          expertName: system.expertName,
          ingestionTime: new Date().toISOString()
        


### src/tools/vector/RAGSystemManager.ts:349
Context: metadata
Object: source: 'web_scraping',
          url: input.scrapedData.url,
          title: input.scrapedData.title || 'Untitled',
          timestamp: new Date().toISOString(),
          ...input.scrapedData.metadata
        


### src/tools/vector/RAGSystemManager.ts:497
Context: metadata
Object: ...update.metadata,
                  lastUpdated: new Date().toISOString()
                


### src/tools/vector/RAGSystemManager.ts:548
Context: system
Object: id: system.id,
          expertId: system.expertId,
          expertName: system.expertName,
          description: system.description,
          embeddingModel: system.embeddingModel,
          createdAt: system.createdAt,
          lastUpdated: system.lastUpdated,
          stats: {
            ...system.stats,
            vectorCount: indexStats.stats?.vectorCount || 0
          


### src/tools/vector/ChunkManager.ts:132
Context: options
Object: chunkSize,
          chunkOverlap,
          preserveContext
        


### src/tools/vector/ChunkManager.ts:425
Context: details
Object: average: sizes.reduce((a, b) => a + b, 0) / sizes.length,
                min: Math.min(...sizes),
                max: Math.max(...sizes),
                total: sizes.reduce((a, b) => a + b, 0)
              


### src/tools/vector/ChunkManager.ts:441
Context: details
Object: totalOverlapChars: totalOverlap, averageOverlap: chunks.length > 1 ? totalOverlap / (chunks.length - 1) : 0
              


### src/tools/vector/ChunkManager.ts:458
Context: details
Object: averageCoherence: coherenceScores.reduce((a, b) => a + b, 0) / coherenceScores.length,
                scores: coherenceScores
              


### src/tools/vector/ChunkManager.ts:475
Context: details
Object: averageDensity: densities.reduce((a, b) => a + b, 0) / densities.length,
                scores: densities
              


### src/tools/testingQA/TestFrameworkMigrator.ts:226
Context: data
Object: migration_plan: migrationPlan, analysis 


### src/tools/testingQA/TestFrameworkMigrator.ts:555
Context: hooks
Object: default: 'simple' 


### src/tools/testingQA/TestFrameworkMigrator.ts:556
Context: assertions
Object: default: 'moderate' 


### src/tools/testingQA/TestFrameworkMigrator.ts:557
Context: mocking
Object: default: 'complex', 'jest-vitest': 'simple' 


### src/tools/testingQA/TestFrameworkMigrator.ts:558
Context: async
Object: default: 'moderate' 


### src/tools/testingQA/TestFrameworkMigrator.ts:559
Context: snapshots
Object: default: 'complex', 'jest-vitest': 'simple' 


### src/tools/testingQA/TestFrameworkMigrator.ts:560
Context: coverage
Object: default: 'simple' 


### src/tools/testingQA/TestFrameworkMigrator.ts:561
Context: watch
Object: default: 'simple' 


### src/tools/testingQA/TestFrameworkMigrator.ts:562
Context: parallel
Object: default: 'moderate' 


### src/tools/testingQA/TestFrameworkMigrator.ts:563
Context: typescript
Object: default: 'simple' 


### src/tools/testingQA/TestFrameworkMigrator.ts:564
Context: jsx
Object: default: 'moderate' 


### src/tools/testingQA/TestFrameworkMigrator.ts:1006
Context: changes
Object: created: true 


### src/tools/testingQA/TestFrameworkMigrator.ts:1040
Context: test
Object: globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html']
    


### src/tools/testingQA/TestDataManager.ts:532
Context: datatype
Object: uuid: () => this.generateUUID(),
        boolean: () => Math.random() > 0.5,
        number: () => Math.floor(Math.random() * 100),
        json: () => ({ random: Math.random() 


### src/tools/testingQA/TestDataManager.ts:538
Context: internet
Object: userName: () => `user${Math.floor(Math.random() * 10000)


### src/tools/testingQA/TestDataManager.ts:542
Context: name
Object: firstName: () => ['John', 'Jane', 'Bob', 'Alice', 'Charlie'][Math.floor(Math.random() * 5)],
        lastName: () => ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)],
      


### src/tools/testingQA/TestDataManager.ts:546
Context: image
Object: avatar: () => `https://avatars.example.com/${Math.floor(Math.random() * 100)


### src/tools/testingQA/TestDataManager.ts:550
Context: date
Object: past: () => new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        recent: () => new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        birthdate: () => new Date(1950 + Math.random() * 50, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
      


### src/tools/testingQA/TestDataManager.ts:555
Context: commerce
Object: productName: () => ['Widget', 'Gadget', 'Tool', 'Device', 'Appliance'][Math.floor(Math.random() * 5)] + ' Pro',
        productDescription: () => 'High-quality product with excellent features',
        price: () => (Math.random() * 1000).toFixed(2),
        department: () => ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'][Math.floor(Math.random() * 5)],
      


### src/tools/testingQA/TestDataManager.ts:561
Context: finance
Object: amount: () => (Math.random() * 10000).toFixed(2),
        currencyCode: () => ['USD', 'EUR', 'GBP', 'JPY', 'CAD'][Math.floor(Math.random() * 5)],
        transactionDescription: () => 'Payment for services',
      


### src/tools/testingQA/TestDataManager.ts:566
Context: lorem
Object: sentence: () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      


### src/tools/testingQA/TestDataManager.ts:569
Context: random
Object: word: () => ['alpha', 'beta', 'gamma', 'delta', 'epsilon'][Math.floor(Math.random() * 5)],
        alphaNumeric: () => Math.random().toString(36).substring(2, 10).toUpperCase(),
      


### src/tools/testingQA/TestDataManager.ts:803
Context: users
Object: GET: {
          '/users': {
            status: 200,
            data: await this.generateData(this.getDefaultSchema('user'), count),
          


### src/tools/testingQA/TestDataManager.ts:814
Context: POST
Object: '/users': {
            status: 201,
            data: { id: this.generateUUID(), message: 'User created successfully' 


### src/tools/testingQA/TestDataManager.ts:821
Context: products
Object: GET: {
          '/products': {
            status: 200,
            data: await this.generateData(this.getDefaultSchema('product'), count),
          


### src/tools/testingQA/TestDataManager.ts:829
Context: orders
Object: GET: {
          '/orders': {
            status: 200,
            data: await this.generateData(this.getDefaultSchema('transaction'), count),
          


### src/tools/testingQA/TestDataManager.ts:837
Context: auth
Object: POST: {
          '/auth/login': {
            status: 200,
            data: {
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...',
              user: (await this.generateData(this.getDefaultSchema('user'), 1))[0],
            


### src/tools/testingQA/TestDataManager.ts:848
Context: data
Object: message: 'Logged out successfully' 


### src/tools/testingQA/TestDataManager.ts:940
Context: recordsInserted
Object: [schema.name]: data.length,
      


### src/tools/testingQA/TestAnalyticsReporter.ts:272
Context: rateLimit
Object: maxRequests: 50,
      windowMs: 60000
    


### src/tools/testingQA/TestAnalyticsReporter.ts:353
Context: metadata
Object: timestamp: new Date().toISOString(),
          action: params.action,
          duration: context.executionTime || 0
        


### src/tools/testingQA/TestAnalyticsReporter.ts:362
Context: error
Object: code: 'ANALYTICS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate analytics',
          details: { action: params.action 


### src/tools/testingQA/TestAnalyticsReporter.ts:391
Context: details
Object: errors 


### src/tools/testingQA/TestAnalyticsReporter.ts:485
Context: coverage_data
Object: 


### src/tools/testingQA/TestAnalyticsReporter.ts:487
Context: ci_cd_metrics
Object: 


### src/tools/testingQA/TestAnalyticsReporter.ts:506
Context: test_counts
Object: total_tests: 850,
        unit_tests: 500,
        integration_tests: 250,
        e2e_tests: 100,
        new_tests_added: 45,
        tests_removed: 10
      


### src/tools/testingQA/TestAnalyticsReporter.ts:514
Context: execution_stats
Object: total_runs: 1250,
        passed: 1175,
        failed: 50,
        skipped: 25,
        flaky_tests: 12,
        average_duration: 180,
        duration_trend: 'stable'
      


### src/tools/testingQA/TestAnalyticsReporter.ts:523
Context: failure_analysis
Object: common_failures: [],
        failure_categories: [],
        mttr: 4.5,
        failure_impact: 0.04
      


### src/tools/testingQA/TestAnalyticsReporter.ts:536
Context: code_coverage
Object: line_coverage: 0.82,
        branch_coverage: 0.78,
        function_coverage: 0.85,
        statement_coverage: 0.83,
        coverage_trend: 'improving',
        uncovered_critical_paths: []
      


### src/tools/testingQA/TestAnalyticsReporter.ts:544
Context: test_quality
Object: test_effectiveness: 0.92,
        defect_escape_rate: 0.08,
        test_maintainability_index: 0.85,
        assertion_density: 3.2,
        test_documentation_score: 0.78
      


### src/tools/testingQA/TestAnalyticsReporter.ts:551
Context: defect_metrics
Object: defects_found_by_tests: 125,
        defects_missed: 11,
        defect_density: 0.15,
        defect_categories: []
      


### src/tools/testingQA/TestAnalyticsReporter.ts:557
Context: automation_metrics
Object: automation_percentage: 0.88,
        roi: 3.5,
        time_saved: 1200,
        manual_test_reduction: 0.75
      


### src/tools/testingQA/TestAnalyticsReporter.ts:570
Context: productivity_metrics
Object: tests_per_developer: 85,
        average_test_creation_time: 45,
        test_maintenance_burden: 0.25,
        automation_adoption_rate: 0.92
      


### src/tools/testingQA/TestAnalyticsReporter.ts:576
Context: collaboration_metrics
Object: cross_team_test_sharing: 0.65,
        test_reuse_rate: 0.72,
        knowledge_sharing_score: 0.80
      


### src/tools/testingQA/TestAnalyticsReporter.ts:657
Context: data
Object: labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Pass Rate',
          data: [0.92, 0.93, 0.94, 0.94]
        


### src/tools/testingQA/TestAnalyticsReporter.ts:664
Context: config
Object: width: 800,
        height: 400,
        colors: ['#28a745'],
        legend: true
      


### src/tools/testingQA/TestAnalyticsReporter.ts:677
Context: data
Object: labels: ['Line', 'Branch', 'Function', 'Statement'],
        values: [
          report.quality_metrics.code_coverage.line_coverage,
          report.quality_metrics.code_coverage.branch_coverage,
          report.quality_metrics.code_coverage.function_coverage,
          report.quality_metrics.code_coverage.statement_coverage
        ]
      


### src/tools/testingQA/TestAnalyticsReporter.ts:686
Context: config
Object: width: 600,
        height: 400,
        colors: ['#007bff', '#17a2b8', '#20c997', '#6610f2'],
        legend: false
      


### src/tools/testingQA/QualityGateOptimizer.ts:691
Context: errorRates
Object: falsePositive: number; falseNegative: number 


### src/tools/testingQA/QualityGateOptimizer.ts:793
Context: optimized
Object: ...gate,
        threshold: parseFloat(newThreshold.toFixed(2))
      


### src/tools/testingQA/QualityGateOptimizer.ts:1078
Context: gate
Object: name: 'Bundle Size',
            metric: 'bundle_size_kb',
            operator: 'lt',
            threshold: 500,
            severity: 'warning',
            enabled: true
          


### src/tools/testingQA/QualityGateOptimizer.ts:1093
Context: gate
Object: name: 'Lighthouse Score',
            metric: 'lighthouse_performance',
            operator: 'gte',
            threshold: 80,
            severity: 'warning',
            enabled: true
          


### src/tools/testingQA/QualityGateOptimizer.ts:1110
Context: gate
Object: name: 'API Response Time',
            metric: 'api_response_p95',
            operator: 'lt',
            threshold: 200,
            severity: 'error',
            enabled: true
          


### src/tools/testingQA/QualityGateOptimizer.ts:1129
Context: gate
Object: name: 'Incremental Build Time',
          metric: 'incremental_build_time',
          operator: 'lt',
          threshold: 60,
          severity: 'warning',
          enabled: true
        


### src/tools/testingQA/QualityGateOptimizer.ts:1147
Context: gate
Object: name: 'Breaking Changes',
          metric: 'breaking_change_count',
          operator: 'eq',
          threshold: 0,
          severity: 'error',
          enabled: true,
          condition: 'branch != "main"'
        


### src/tools/testingQA/QualityGateOptimizer.ts:1189
Context: gate
Object: ...cg.gate,
            threshold: adjustedThreshold
          


### src/tools/testingQA/QAWorkflowOrchestrator.ts:283
Context: metrics
Object: total_duration: totalDuration,
          stage_durations: stageTimings,
          success_rate: successRate,
          bottlenecks
        


### src/tools/testingQA/QAWorkflowOrchestrator.ts:757
Context: env
Object: ...process.env, ...step.environment 


### src/tools/testingQA/QAWorkflowOrchestrator.ts:803
Context: resourceUsage
Object: high: false 


### src/tools/testingQA/QAWorkflowOrchestrator.ts:804
Context: metrics
Object: total_duration: 0,
        stage_durations: {


### src/tools/testingQA/PerformanceLoadTester.ts:457
Context: thresholds
Object: `;
    
    // Add thresholds
    config.thresholds?.forEach(threshold => {
      const metricName = threshold.metric === 'response_time' ? 'http_req_duration' : 
                        threshold.metric === 'error_rate' ? 'errors' : 
                        'http_reqs';
      const aggregation = threshold.aggregation === 'avg' ? 'avg' : 
                         threshold.aggregation === 'p95' ? 'p(95)' : 
                         threshold.aggregation === 'p99' ? 'p(99)' : 'max';
      
      script += `    '${metricName


### src/tools/testingQA/PerformanceLoadTester.ts:647
Context: env
Object: ...process.env, K6_OUT: 'json=results.json' 


### src/tools/testingQA/PerformanceLoadTester.ts:733
Context: summary
Object: total_requests: totalRequests,
        successful_requests: successfulRequests,
        failed_requests: failedRequests,
        test_duration: testDuration,
        average_rps: totalRequests / testDuration,
        peak_rps: throughput.requests_per_second.reduce((max, v) => Math.max(max, v), 0)
      


### src/tools/testingQA/PerformanceLoadTester.ts:741
Context: metrics
Object: response_times: responseTimes,
        throughput: throughput,
        concurrency: concurrency
      


### src/tools/testingQA/CoverageAnalyzer.ts:370
Context: statements
Object: total: totalStatements,
        covered: coveredStatements,
        skipped: 0,
        percentage: totalStatements > 0 ? (coveredStatements / totalStatements) * 100 : 0
      


### src/tools/testingQA/CoverageAnalyzer.ts:376
Context: branches
Object: total: totalBranches,
        covered: coveredBranches,
        skipped: 0,
        percentage: totalBranches > 0 ? (coveredBranches / totalBranches) * 100 : 0
      


### src/tools/testingQA/CoverageAnalyzer.ts:382
Context: functions
Object: total: totalFunctions,
        covered: coveredFunctions,
        skipped: 0,
        percentage: totalFunctions > 0 ? (coveredFunctions / totalFunctions) * 100 : 0
      


### src/tools/testingQA/CoverageAnalyzer.ts:388
Context: lines
Object: total: totalLines,
        covered: coveredLines,
        skipped: 0,
        percentage: totalLines > 0 ? (coveredLines / totalLines) * 100 : 0
      


### src/tools/testing/TestGenerator.ts:61
Context: location
Object: start: number;
    end: number;
    line: number;
    column: number;
  


### src/tools/testing/TestGenerator.ts:122
Context: coverage
Object: functions: number;
    branches: number;
    lines: number;
  


### src/tools/testing/TestGenerator.ts:456
Context: data
Object: analysis,
          summary: {
            functionCount: analysis.functions.length,
            classCount: analysis.classes.length,
            totalComplexity: analysis.complexity,
            hasAsync: analysis.functions.some(f => f.isAsync),
            hasClasses: analysis.classes.length > 0,
          


### src/tools/testing/TestGenerator.ts:558
Context: location
Object: start: node.getStart(),
        end: node.getEnd(),
        line: line + 1,
        column: character + 1,
      


### src/tools/testing/TestGenerator.ts:754
Context: params
Object: 


### src/tools/testing/TestGenerator.ts:810
Context: coverage
Object: functions: 0,
        branches: 0,
        lines: 0,
      


### src/tools/testing/TestGenerator.ts:840
Context: data
Object: testCode,
        testSuite,
        analysis,
        coverage,
        meetsTarget: coverage.functions >= coverageTarget,
      


### src/tools/testing/TestGenerator.ts:1483
Context: data
Object: testCases,
        count: testCases.length,
      


### src/tools/testing/TestGenerator.ts:1504
Context: data
Object: testCases,
        count: testCases.length,
      


### src/tools/testing/TestGenerator.ts:1542
Context: data
Object: testCase: {
          name: 'integration_test',
          description: `Integration test for ${modules.join(', ')


### src/tools/testing/TestGenerator.ts:1587
Context: data
Object: testCase: {
          name: `${functionInfo.name


### src/tools/testing/TestGenerator.ts:1656
Context: data
Object: valid: errors.length === 0,
          errors,
          diagnostics: errors.length,
        


### src/tools/testing/TestGenerator.ts:1684
Context: data
Object: coverage,
        report: {
          functions: `${coverage.functions


### src/tools/testing/TestGenerator.ts:1770
Context: data
Object: suggestions,
        count: suggestions.length,
        priority: suggestions.slice(0, 5), // Top 5 priority suggestions
      


### src/tools/testing/examples/TestGenerator.example.ts:45
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:63
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:86
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:168
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:221
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:236
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:257
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:293
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:304
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:326
Context: metadata
Object: 


### src/tools/testing/examples/TestGenerator.example.ts:342
Context: metadata
Object: 


### src/tools/testing/__tests__/TestGenerator.test.ts:53
Context: metadata
Object: 


### src/tools/testing/__tests__/TestGenerator.test.ts:506
Context: location
Object: start: 0, end: 50, line: 1, column: 1 


### src/tools/testing/__tests__/TestGenerator.test.ts:547
Context: coverage
Object: functions: 0, branches: 0, lines: 0 


### src/tools/testing/__tests__/TestGenerator.test.ts:597
Context: coverage
Object: functions: 0, branches: 0, lines: 0 


### src/tools/testing/__tests__/TestGenerator.test.ts:672
Context: jsDoc
Object: throws: ['ValidationError'],
            


### src/tools/testing/__tests__/TestGenerator.test.ts:680
Context: location
Object: start: 0, end: 100, line: 1, column: 1 


### src/tools/testing/__tests__/TestGenerator.test.ts:724
Context: location
Object: start: 0, end: 50, line: 1, column: 1 


### src/tools/testing/__tests__/TestGenerator.test.ts:767
Context: location
Object: start: 0, end: 50, line: 1, column: 1 


### src/tools/templateLibrary/YeomanScaffolder.ts:196
Context: rateLimit
Object: maxRequests: 25,
      windowMs: 60000
    


### src/tools/templateLibrary/YeomanScaffolder.ts:329
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          generator_name: params.generator_name,
          namespace: params.namespace
        


### src/tools/templateLibrary/YeomanScaffolder.ts:342
Context: error
Object: code: 'YEOMAN_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process Yeoman request',
          details: { action: params.action 


### src/tools/templateLibrary/YeomanScaffolder.ts:347
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/YeomanScaffolder.ts:404
Context: dependencies
Object: 'yeoman-generator': '^5.0.0',
        'chalk': '^4.0.0',
        'yosay': '^2.0.0'
      


### src/tools/templateLibrary/YeomanScaffolder.ts:900
Context: scripts
Object: start: 'node index.js',
        test: 'echo "Error: no test specified" && exit 1'
      


### src/tools/templateLibrary/TemplateValidator.ts:99
Context: rateLimit
Object: maxRequests: 200,
      windowMs: 60000
    


### src/tools/templateLibrary/TemplateValidator.ts:202
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          template_engine: params.template_engine,
          template_path: params.template_path
        


### src/tools/templateLibrary/TemplateValidator.ts:215
Context: error
Object: code: 'VALIDATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to validate template',
          details: { action: params.action 


### src/tools/templateLibrary/TemplateValidator.ts:220
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/TemplateValidator.ts:300
Context: details
Object: lines: content.split('\n').length,
        size: content.length,
        variables_found: variables.length
      


### src/tools/templateLibrary/TemplateValidator.ts:761
Context: details
Object: original_length: content.length,
          rendered_length: rendered.length
        


### src/tools/templateLibrary/TemplateValidator.ts:835
Context: handlebars
Object: start: /{{#(\w+)/,
          end: /{{\/(\w+)/,
          include: /{{>\s*([^\s


### src/tools/templateLibrary/TemplateValidator.ts:840
Context: nunjucks
Object: start: /{%\s*(if|for|block|macro)/,
          end: /{%\s*end(if|for|block|macro)/,
          include: /{%\s*include\s+["']([^"']+)/
        


### src/tools/templateLibrary/TemplateValidator.ts:845
Context: ejs
Object: start: /<%\s*if|for|while/,
          end: /<%\s*


### src/tools/templateLibrary/TemplateValidator.ts:973
Context: details
Object: supported_features: features,
        engine_version: 'latest'
      


### src/tools/templateLibrary/TemplateMigrator.ts:204
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/templateLibrary/TemplateMigrator.ts:321
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          source_path: params.source_path,
          target_engine: params.target_engine
        


### src/tools/templateLibrary/TemplateMigrator.ts:334
Context: error
Object: code: 'MIGRATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process migration request',
          details: { action: params.action 


### src/tools/templateLibrary/TemplateMigrator.ts:339
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/TemplateMigrator.ts:956
Context: handlebars
Object: ejs: 75, mustache: 90, nunjucks: 60 


### src/tools/templateLibrary/TemplateMigrator.ts:957
Context: ejs
Object: handlebars: 70, nunjucks: 80, pug: 40 


### src/tools/templateLibrary/TemplateMigrator.ts:958
Context: mustache
Object: handlebars: 95, ejs: 60, nunjucks: 50 


### src/tools/templateLibrary/TemplateMigrator.ts:967
Context: handlebars
Object: ejs: 80, mustache: 95, nunjucks: 70 


### src/tools/templateLibrary/TemplateMigrator.ts:968
Context: ejs
Object: handlebars: 60, nunjucks: 85, pug: 30 


### src/tools/templateLibrary/TemplateMigrator.ts:969
Context: mustache
Object: handlebars: 90, ejs: 65, nunjucks: 55 


### src/tools/templateLibrary/TemplateMarketplace.ts:69
Context: rateLimit
Object: maxRequests: 100,
      windowMs: 60000
    


### src/tools/templateLibrary/TemplateMarketplace.ts:182
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          category: params.category
        


### src/tools/templateLibrary/TemplateMarketplace.ts:194
Context: error
Object: code: 'MARKETPLACE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process marketplace request',
          details: { action: params.action 


### src/tools/templateLibrary/TemplateMarketplace.ts:199
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/SnippetLibraryManager.ts:193
Context: rateLimit
Object: maxRequests: 60,
      windowMs: 60000
    


### src/tools/templateLibrary/SnippetLibraryManager.ts:326
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          library_name: params.library_name,
          snippet_name: params.snippet_name
        


### src/tools/templateLibrary/SnippetLibraryManager.ts:339
Context: error
Object: code: 'SNIPPET_LIBRARY_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process snippet library request',
          details: { action: params.action 


### src/tools/templateLibrary/SnippetLibraryManager.ts:344
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/SnippetLibraryManager.ts:424
Context: languages
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:425
Context: categories
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:426
Context: tags
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:427
Context: authors
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:998
Context: config
Object: name: libraryName || 'default',
        version: '1.0.0',
        author: 'Mock Author'
      


### src/tools/templateLibrary/SnippetLibraryManager.ts:1004
Context: statistics
Object: total_snippets: 0,
        languages: {


### src/tools/templateLibrary/SnippetLibraryManager.ts:1007
Context: categories
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:1008
Context: tags
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:1009
Context: authors
Object: 


### src/tools/templateLibrary/SnippetLibraryManager.ts:1012
Context: structure
Object: directories: [],
        files: [],
        config_files: [],
        index_files: []
      


### src/tools/templateLibrary/PlopfileGenerator.ts:175
Context: rateLimit
Object: maxRequests: 40,
      windowMs: 60000
    


### src/tools/templateLibrary/PlopfileGenerator.ts:285
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          generator_name: params.generator_name,
          plopfile_path: params.plopfile_path
        


### src/tools/templateLibrary/PlopfileGenerator.ts:298
Context: error
Object: code: 'PLOPFILE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process plopfile request',
          details: { action: params.action 


### src/tools/templateLibrary/PlopfileGenerator.ts:303
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/PlopfileGenerator.ts:358
Context: config
Object: force: params.generator_config?.force_overwrite || false,
        destBasePath: params.generator_config?.output_dir || './src',
        includeExtension: true,
        customActionTypes: []
      


### src/tools/templateLibrary/PlopfileGenerator.ts:613
Context: scripts
Object: generate: 'plop',
          [`generate:${plopfile.generators[0].name


### src/tools/templateLibrary/PlopfileGenerator.ts:617
Context: devDependencies
Object: plop: '^4.0.0'
        


### src/tools/templateLibrary/PlopfileGenerator.ts:685
Context: validate
Object: type: 'function',
          code: 'return input.trim() !== "";',
          parameters: ['input']
        


### src/tools/templateLibrary/PlopfileGenerator.ts:789
Context: config
Object: force: false,
        destBasePath: './src',
        includeExtension: true,
        customActionTypes: []
      


### src/tools/templateLibrary/CustomGeneratorBuilder.ts:90
Context: rateLimit
Object: maxRequests: 50,
      windowMs: 60000
    


### src/tools/templateLibrary/CustomGeneratorBuilder.ts:190
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          generator_name: params.generator_name,
          generator_type: params.generator_type
        


### src/tools/templateLibrary/CustomGeneratorBuilder.ts:203
Context: error
Object: code: 'GENERATOR_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process generator request',
          details: { action: params.action 


### src/tools/templateLibrary/CustomGeneratorBuilder.ts:208
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/CustomGeneratorBuilder.ts:432
Context: dependencies
Object: 'yeoman-generator': '^5.0.0'
      


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:93
Context: bundle_size
Object: raw: number;
    minified: number;
    gzipped: number;
  


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:119
Context: rateLimit
Object: maxRequests: 30,
      windowMs: 60000
    


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:258
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          library_name: params.library_name,
          framework: params.framework
        


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:271
Context: error
Object: code: 'LIBRARY_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process library request',
          details: { action: params.action 


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:276
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:382
Context: bundle_size
Object: raw: 145000,
        minified: 89000,
        gzipped: 32000
      


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:612
Context: scripts
Object: build: this.getBuildCommand(library.config.build_tool),
        test: this.getTestCommand(library.config.testing),
        storybook: 'storybook dev -p 6006',
        'build-storybook': 'storybook build'
      


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:632
Context: compilerOptions
Object: target: 'es5',
        lib: ['dom', 'dom.iterable', 'es6'],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: false,
        declaration: true,
        declarationMap: true,
        outDir: 'dist',
        jsx: library.config.framework === 'react' ? 'react-jsx' : 'preserve'
      


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:665
Context: build
Object: lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '${library.name


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:672
Context: rollupOptions
Object: external: ${JSON.stringify(Object.keys(library.config.peer_dependencies))


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:674
Context: output
Object: globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:768
Context: parameters
Object: layout: 'centered',
  


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:772
Context: argTypes
Object: // Configure controls here
  


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:781
Context: args
Object: children: 'Default ${component.name


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:787
Context: args
Object: children: 'Styled ${component.name


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:892
Context: config
Object: name,
        version: '1.0.0',
        framework: 'react',
        typescript: true,
        styling: 'css',
        testing: 'jest',
        build_tool: 'vite',
        entry_point: 'src/index.ts',
        peer_dependencies: this.getPeerDependencies('react')
      


### src/tools/templateLibrary/ComponentLibraryBuilder.ts:903
Context: structure
Object: src: ['components', 'hooks', 'utils', 'types'],
        tests: ['__tests__'],
        stories: ['stories'],
        docs: ['docs'],
        config: ['config']
      


### src/tools/pythonExpert/TypeHintAnalyzer.ts:120
Context: range
Object: start: { line: number; character: number 


### src/tools/pythonExpert/TypeHintAnalyzer.ts:122
Context: end
Object: line: number; character: number 


### src/tools/pythonExpert/TypeHintAnalyzer.ts:167
Context: rateLimit
Object: maxRequests: 30,
      windowMs: 60000
    


### src/tools/pythonExpert/TypeHintAnalyzer.ts:268
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          file_path: params.file_path,
          coverage: result.coverage_report.overall_coverage,
          suggestions_count: result.suggestions.length
        


### src/tools/pythonExpert/TypeHintAnalyzer.ts:282
Context: error
Object: code: 'TYPE_HINT_ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to analyze type hints',
          details: { action: params.action, file_path: params.file_path 


### src/tools/pythonExpert/TypeHintAnalyzer.ts:287
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/pythonExpert/TypeHintAnalyzer.ts:692
Context: summary
Object: files_analyzed: 1,
        errors: 0,
        warnings: 0,
        informations: 0,
        time_in_sec: 0.1
      


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:199
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:305
Context: metadata
Object: executionTimeMs: result.scan_summary.scan_duration_ms,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          vulnerabilities_found: result.vulnerabilities.length,
          risk_score: result.scan_summary.risk_score
        


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:318
Context: error
Object: code: 'SECURITY_SCAN_ERROR',
          message: error instanceof Error ? error.message : 'Failed to perform security scan',
          details: { action: params.action 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:323
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:478
Context: remediation
Object: fix_description: 'Use parameterized queries or ORM methods instead of string concatenation',
            code_example: 'cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))',
            effort_level: 'medium',
            priority: 'high',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:508
Context: remediation
Object: fix_description: 'Validate and sanitize input, use allowlists, avoid shell=True',
            code_example: 'subprocess.run(["/usr/bin/program", sanitized_arg], check=True)',
            effort_level: 'high',
            priority: 'immediate',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:538
Context: remediation
Object: fix_description: 'Use parameterized LDAP queries and proper input validation',
            effort_level: 'medium',
            priority: 'high',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:579
Context: remediation
Object: fix_description: 'Implement strong authentication mechanisms with proper password policies',
            effort_level: 'high',
            priority: 'medium',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:608
Context: remediation
Object: fix_description: 'Add proper authentication checks before sensitive operations',
            effort_level: 'medium',
            priority: 'high',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:648
Context: remediation
Object: fix_description: 'Move secrets to environment variables or secure configuration files',
            code_example: 'password = os.environ.get("DB_PASSWORD")',
            effort_level: 'low',
            priority: 'immediate',
            automated_fix_available: true
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:678
Context: remediation
Object: fix_description: 'Move API keys to environment variables or secure key management',
            code_example: 'api_key = os.environ.get("API_KEY")',
            effort_level: 'low',
            priority: 'immediate',
            automated_fix_available: true
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:719
Context: remediation
Object: fix_description: 'Use strong cryptographic algorithms like AES-256, SHA-256, or better',
            code_example: 'hashlib.sha256(data.encode()).hexdigest()',
            effort_level: 'medium',
            priority: 'medium',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:749
Context: remediation
Object: fix_description: 'Use cryptographically secure random number generators',
            code_example: 'import secrets; token = secrets.token_hex(16)',
            effort_level: 'low',
            priority: 'medium',
            automated_fix_available: true
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:789
Context: remediation
Object: fix_description: 'Properly escape or sanitize user input before rendering',
            code_example: 'from markupsafe import escape; safe_content = escape(user_input)',
            effort_level: 'medium',
            priority: 'medium',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:830
Context: remediation
Object: fix_description: 'Validate and sanitize file paths, use allowlists',
            code_example: 'safe_path = os.path.normpath(os.path.join(base_dir, filename))',
            effort_level: 'medium',
            priority: 'high',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:871
Context: remediation
Object: fix_description: 'Use safe serialization formats like JSON, avoid pickle with untrusted data',
            code_example: 'data = json.loads(json_string)  # instead of pickle.loads()',
            effort_level: 'medium',
            priority: 'high',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:912
Context: remediation
Object: fix_description: 'Avoid logging sensitive data or sanitize before logging',
            effort_level: 'low',
            priority: 'low',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:951
Context: remediation
Object: fix_description: 'Use atomic operations or proper locking mechanisms',
            effort_level: 'high',
            priority: 'low',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:990
Context: remediation
Object: fix_description: 'Implement rate limiting, input validation, and resource constraints',
            effort_level: 'medium',
            priority: 'low',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1029
Context: remediation
Object: fix_description: 'Implement proper authorization checks and access controls',
            effort_level: 'high',
            priority: 'high',
            automated_fix_available: false
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1239
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1240
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1241
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1242
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1243
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1244
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1245
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1246
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1247
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1248
Context: severity_breakdown
Object: 


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1391
Context: tool
Object: driver: {
            name: "SecurityVulnerabilityScanner",
            version: "1.0.0",
            informationUri: "https://example.com/security-scanner"
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1401
Context: message
Object: text: vuln.description
          


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1405
Context: physicalLocation
Object: artifactLocation: {
                uri: vuln.file_path
              


### src/tools/pythonExpert/SecurityVulnerabilityScanner.ts:1409
Context: region
Object: startLine: vuln.line_number,
                startColumn: vuln.column_number || 1
              


### src/tools/pythonExpert/DocumentationGenerator.ts:221
Context: data
Object: files_processed: files.length,
          docstrings_added: totalDocstringsAdded,
          warnings,
          suggestions,
          coverage_report: coverage,
        


### src/tools/pythonExpert/DocumentationGenerator.ts:284
Context: data
Object: files_processed: files.length,
          docstrings_added: 0,
          documentation_path: documentationPath,
          warnings: [],
          suggestions: [
            'API documentation generated successfully',
            `Documentation available at: ${documentationPath


### src/tools/pythonExpert/DocumentationGenerator.ts:330
Context: data
Object: files_processed: 1,
          docstrings_added: 0,
          documentation_path: readmePath,
          warnings: [],
          suggestions: [
            'README.md updated successfully',
            'Consider adding badges for build status, coverage, etc.',
            'Add examples and quickstart guide if not present',
          ],
        


### src/tools/pythonExpert/DependencyVulnerabilityChecker.ts:211
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/pythonExpert/DependencyVulnerabilityChecker.ts:295
Context: metadata
Object: executionTimeMs: result.scan_summary.scan_duration_ms,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          vulnerable_packages: result.scan_summary.vulnerable_packages,
          risk_score: result.scan_summary.overall_risk_score
        


### src/tools/pythonExpert/DependencyVulnerabilityChecker.ts:308
Context: error
Object: code: 'DEPENDENCY_SCAN_ERROR',
          message: error instanceof Error ? error.message : 'Failed to scan dependencies',
          details: { action: params.action 


### src/tools/pythonExpert/DependencyVulnerabilityChecker.ts:313
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/pythonExpert/DependencyVulnerabilityChecker.ts:829
Context: exploit_availability
Object: public_exploits_available: true,
            exploit_maturity: 'functional',
            metasploit_modules: 1,
            github_repositories: 3,
            exploit_prediction_scoring: 0.8
          


### src/tools/pythonExpert/DependencyVulnerabilityChecker.ts:866
Context: exploit_availability
Object: public_exploits_available: false,
            exploit_maturity: 'proof_of_concept',
            metasploit_modules: 0,
            github_repositories: 1,
            exploit_prediction_scoring: 0.3
          


### src/tools/pythonExpert/DebuggingAssistant.ts:478
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/pythonExpert/DebuggingAssistant.ts:547
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          recommendations_count: result.recommendations.length,
          fix_suggestions_count: result.fix_suggestions.length
        


### src/tools/pythonExpert/DebuggingAssistant.ts:560
Context: error
Object: code: 'DEBUGGING_ASSISTANT_ERROR',
          message: error instanceof Error ? error.message : 'Failed to perform debugging analysis',
          details: { action: params.action 


### src/tools/pythonExpert/DebuggingAssistant.ts:565
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/pythonExpert/DebuggingAssistant.ts:952
Context: complexity_metrics
Object: cyclomatic_complexity: Math.min(10, Math.floor(lines.length / 10)),
        cognitive_complexity: Math.min(15, Math.floor(lines.length / 8)),
        nesting_depth: 3,
        function_length: lines.length
      


### src/tools/pythonExpert/DebuggingAssistant.ts:972
Context: type_info
Object: inferred_type: 'any',
            possible_values: ['unknown'],
            type_consistency: true,
            type_safety_issues: []
          


### src/tools/pythonExpert/DebuggingAssistant.ts:978
Context: lifecycle
Object: declaration_line: index + 1,
            first_assignment: index + 1,
            last_usage: index + 1,
            modification_points: [index + 1],
            scope_boundaries: []
          


### src/tools/pythonExpert/DebuggingAssistant.ts:1007
Context: exception_handling
Object: try_blocks: [],
        unhandled_exceptions: [],
        exception_safety: {
          safety_level: 'basic',
          resource_leaks: [],
          state_consistency: true
        


### src/tools/pythonExpert/DebuggingAssistant.ts:1154
Context: environment_info
Object: python_version: '3.11',
        platform: 'linux',
        installed_packages: []
      


### src/tools/pythonExpert/DebuggingAssistant.ts:1171
Context: state_snapshot
Object: variables: {


### src/tools/pythonExpert/CodeQualityAnalyzer.ts:122
Context: rateLimit
Object: maxRequests: 50,
      windowMs: 60000
    


### src/tools/pythonExpert/CodeQualityAnalyzer.ts:215
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          overall_score: result.overall_score,
          total_issues: result.issues.length
        


### src/tools/pythonExpert/CodeQualityAnalyzer.ts:228
Context: error
Object: code: 'ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to analyze code quality',
          details: { action: params.action 


### src/tools/pythonExpert/CodeQualityAnalyzer.ts:233
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/pythonExpert/CodeQualityAnalyzer.ts:348
Context: file_sizes
Object: [filePath]: code.length 


### src/tools/pythonExpert/CodeOptimizer.ts:116
Context: metadata
Object: executionTime: 0,
              tool: this.metadata.name,
              version: this.metadata.version
            


### src/tools/pythonExpert/CodeOptimizer.ts:128
Context: metadata
Object: executionTime: 0,
              tool: this.metadata.name,
              version: this.metadata.version
            


### src/tools/pythonExpert/CodeOptimizer.ts:140
Context: metadata
Object: executionTime: 0,
              tool: this.metadata.name,
              version: this.metadata.version
            


### src/tools/pythonExpert/CodeOptimizer.ts:154
Context: metadata
Object: executionTime: 0,
          tool: this.metadata.name,
          version: this.metadata.version
        


### src/tools/pythonExpert/CodeOptimizer.ts:407
Context: overrideConfig
Object: env: {
            es2022: true,
            node: true
          


### src/tools/pythonExpert/CodeOptimizer.ts:412
Context: parserOptions
Object: ecmaVersion: 2022,
            sourceType: 'module',
            parser: language === 'typescript' ? '@typescript-eslint/parser' : undefined
          


### src/tools/pythonExpert/CodeOptimizer.ts:422
Context: rules
Object: 'no-unused-vars': 'warn',
            'no-console': 'warn',
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'warn',
            'prefer-arrow-callback': 'warn',
            'prefer-template': 'warn',
            'no-loop-func': 'error',
            'no-await-in-loop': 'warn'
          


### src/tools/pythonExpert/examples/code-optimizer-example.ts:15
Context: metadata
Object: 


### src/tools/pythonExpert/__tests__/CodeOptimizer.test.ts:18
Context: metadata
Object: 


### src/tools/orchestrator/types.ts:94
Context: metadata
Object: duration: number;
    toolName: string;
    timestamp?: string;
    [key: string]: any;
  


### src/tools/orchestrator/EnhancedParser.ts:87
Context: params
Object: query: string; context?: any 


### src/tools/orchestrator/EnhancedParser.ts:114
Context: parameters
Object: 


### src/tools/orchestrator/EnhancedParser.ts:116
Context: domainKeywords
Object: 


### src/tools/orchestrator/EnhancedParser.ts:149
Context: metadata
Object: duration,
          toolName: 'enhanced_parser',
          timestamp: new Date().toISOString()
        


### src/tools/orchestrator/EnhancedParser.ts:165
Context: metadata
Object: duration,
          toolName: 'enhanced_parser',
          timestamp: new Date().toISOString()
        


### src/tools/orchestrator/CrossAgentCommunicator.ts:40
Context: params
Object: message: CrossAgentMessage; timeout?: number 


### src/tools/orchestrator/CrossAgentCommunicator.ts:101
Context: metadata
Object: duration,
          toolName: 'cross_agent_communicator',
          timestamp: new Date().toISOString(),
          correlationId: message.correlationId
        


### src/tools/orchestrator/CrossAgentCommunicator.ts:118
Context: metadata
Object: duration,
          toolName: 'cross_agent_communicator',
          timestamp: new Date().toISOString()
        


### src/tools/orchestrator/AgentRouter.ts:144
Context: params
Object: parsed_query: ParsedQuery; strategy?: string 


### src/tools/orchestrator/AgentRouter.ts:179
Context: primaryAgent
Object: agentId: primaryAgent.agentId,
          agentName: primaryAgent.agentName,
          confidence: primaryAgent.confidence,
          reasoning: primaryAgent.reasoning
        


### src/tools/orchestrator/AgentRouter.ts:217
Context: metadata
Object: duration,
          toolName: 'agent_router',
          timestamp: new Date().toISOString()
        


### src/tools/orchestrator/AgentRouter.ts:233
Context: metadata
Object: duration,
          toolName: 'agent_router',
          timestamp: new Date().toISOString()
        


### src/tools/implementations/python/TestGenerator.ts:244
Context: metadata
Object: executionTime: Date.now(),
          toolVersion: this.metadata.version
        


### src/tools/implementations/python/TestGenerator.ts:253
Context: error
Object: code: 'TEST_GENERATION_ERROR',
          message: `Failed to generate tests: ${error instanceof Error ? error.message : 'Unknown error'


### src/tools/implementations/python/PythonDebuggingAssistant.ts:66
Context: default
Object: 


### src/tools/implementations/python/PythonDebuggingAssistant.ts:72
Context: input
Object: file_path: 'buggy_script.py',
          options: { strategy: 'print' 


### src/tools/implementations/python/PythonDebuggingAssistant.ts:79
Context: input
Object: file_path: 'complex_algorithm.py',
          options: {
            strategy: 'debugger',
            breakpoints: [15, 23, 45],
            watch_expressions: ['counter', 'result_list']
          


### src/tools/implementations/python/DebuggingAssistant.ts:295
Context: data
Object: analysis: errorAnalysis,
          formatted: this.formatErrorAnalysis(errorAnalysis),
        


### src/tools/implementations/python/DebuggingAssistant.ts:356
Context: metadata
Object: 


### src/tools/implementations/python/DebuggingAssistant.ts:701
Context: data
Object: sessionStarted: true,
          breakpoints: Array.from(this.breakpoints.values()),
        


### src/tools/implementations/python/DebuggingAssistant.ts:806
Context: data
Object: debuggerUrl: url,
          host,
          port,
          waiting: wait,
          instructions: `Connect Chrome DevTools or VS Code to ${url


### src/tools/implementations/python/DebuggingAssistant.ts:878
Context: data
Object: duration: endTime - startTime,
          eventCount: this.traceEvents.length,
          events: this.traceEvents.slice(0, 100), // First 100 events
          summary,
        


### src/tools/implementations/python/DebuggingAssistant.ts:981
Context: data
Object: inspections 


### src/tools/implementations/python/DebuggingAssistant.ts:1203
Context: data
Object: before: beforeSnapshot,
        after: afterSnapshot,
        memoryUsage,
      


### src/tools/implementations/python/DebuggingAssistant.ts:1208
Context: summary
Object: heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)


### src/tools/implementations/python/DebuggingAssistant.ts:1316
Context: data
Object: id: watchId, watch 


### src/tools/implementations/python/DebuggingAssistant.ts:1331
Context: data
Object: removed 


### src/tools/implementations/python/DebuggingAssistant.ts:1349
Context: data
Object: watch: watchToToggle 


### src/tools/implementations/python/DebuggingAssistant.ts:1355
Context: data
Object: watches: Array.from(this.watchExpressions.values()),
            


### src/tools/implementations/python/CodeQualityAnalyzer.ts:241
Context: cyclomatic
Object: [ComplexityLevel.LOW]: 5,
      [ComplexityLevel.MEDIUM]: 10,
      [ComplexityLevel.HIGH]: 15,
      [ComplexityLevel.VERY_HIGH]: 20,
    


### src/tools/implementations/python/CodeQualityAnalyzer.ts:247
Context: cognitive
Object: [ComplexityLevel.LOW]: 7,
      [ComplexityLevel.MEDIUM]: 15,
      [ComplexityLevel.HIGH]: 25,
      [ComplexityLevel.VERY_HIGH]: 40,
    


### src/tools/implementations/python/CodeQualityAnalyzer.ts:253
Context: nesting
Object: [ComplexityLevel.LOW]: 3,
      [ComplexityLevel.MEDIUM]: 5,
      [ComplexityLevel.HIGH]: 7,
      [ComplexityLevel.VERY_HIGH]: 10,
    


### src/tools/implementations/python/CodeQualityAnalyzer.ts:259
Context: lines
Object: [ComplexityLevel.LOW]: 50,
      [ComplexityLevel.MEDIUM]: 100,
      [ComplexityLevel.HIGH]: 200,
      [ComplexityLevel.VERY_HIGH]: 300,
    


### src/tools/implementations/python/CodeQualityAnalyzer.ts:265
Context: parameters
Object: [ComplexityLevel.LOW]: 3,
      [ComplexityLevel.MEDIUM]: 5,
      [ComplexityLevel.HIGH]: 7,
      [ComplexityLevel.VERY_HIGH]: 10,
    


### src/tools/implementations/python/CodeQualityAnalyzer.ts:347
Context: parserOptions
Object: ecmaVersion: 2022,
            sourceType: 'module',
            project: './tsconfig.json',
          


### src/tools/implementations/python/CodeQualityAnalyzer.ts:353
Context: rules
Object: '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            'complexity': ['warn', 10],
            'max-lines-per-function': ['warn', 50],
            'max-params': ['warn', 5],
            'max-depth': ['warn', 4],
            'max-nested-callbacks': ['warn', 3],
          


### src/tools/implementations/python/CodeQualityAnalyzer.ts:403
Context: data
Object: metrics: fileMetrics,
        issues,
        summary: this.generateFileSummary(fileMetrics, issues),
      


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1072
Context: data
Object: metrics: projectMetrics,
        summary: this.generateProjectSummary(projectMetrics),
      


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1125
Context: data
Object: issues: complexityIssues,
        summary: {
          total: complexityIssues.length,
          critical: complexityIssues.filter(i => i.severity === 'critical').length,
          high: complexityIssues.filter(i => i.severity === 'high').length,
          medium: complexityIssues.filter(i => i.severity === 'medium').length,
          low: complexityIssues.filter(i => i.severity === 'low').length,
        


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1306
Context: data
Object: codeSmells,
        summary: {
          total: codeSmells.length,
          byType: this.groupByType(codeSmells),
          bySeverity: this.groupBySeverity(codeSmells),
        


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1479
Context: data
Object: duplications,
        summary: {
          total: duplications.length,
          totalLines: duplications.reduce((sum, d) => sum + d.lines * d.locations.length, 0),
          files: new Set(duplications.flatMap(d => d.locations.map(l => l.file))).size,
        


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1510
Context: details
Object: topComplexFunctions: this.getTopComplexFunctions(metrics),
        largestClasses: this.getLargestClasses(metrics),
        codeSmellsBreakdown: this.getCodeSmellsBreakdown(metrics),
        technicalDebtEstimate: this.getTechnicalDebtEstimate(metrics),
      


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1520
Context: data
Object: report 


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1536
Context: data
Object: improvements 


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1577
Context: data
Object: issues 


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1652
Context: lines
Object: total: metrics.linesOfCode + metrics.linesOfComments + metrics.blankLines,
        code: metrics.linesOfCode,
        comments: metrics.linesOfComments,
        blank: metrics.blankLines,
      


### src/tools/implementations/python/CodeQualityAnalyzer.ts:1662
Context: issues
Object: total: issues.length,
        errors: issues.filter(i => i.type === 'error').length,
        warnings: issues.filter(i => i.type === 'warning').length,
      


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:29
Context: promises
Object: readFile: jest.fn(),
    readdir: jest.fn(),
  


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:67
Context: metadata
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:210
Context: options
Object: files: ['/test/calculator.ts'],
          language: 'typescript',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:229
Context: options
Object: files: ['/test/processor.py'],
          language: 'python',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:245
Context: options
Object: files: ['/test/code.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:257
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:269
Context: options
Object: files: ['/test/missing.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:326
Context: options
Object: files: ['/test/complex.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:368
Context: options
Object: files: ['/test/nested.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:402
Context: options
Object: files: ['/test/params.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:458
Context: options
Object: files: ['/test/calculator.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:540
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:562
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:583
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:603
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:624
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:676
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:694
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:721
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:746
Context: options
Object: files: ['/test/simple.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:804
Context: options
Object: files: ['/test/debt.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:844
Context: options
Object: files: ['/test/class.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:874
Context: options
Object: directories: ['/test'],
          maxDepth: 2,
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:895
Context: options
Object: directories: ['/test'],
          exclude: ['node_modules', '.spec.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:927
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:956
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:993
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1025
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1071
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1109
Context: options
Object: directories: ['/test'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1160
Context: options
Object: files: ['/test/style.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1173
Context: rules
Object: 'max-len': ['error', { code: 80 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1180
Context: options
Object: files: ['/test/style.ts'],
          eslintConfig: customConfig,
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1196
Context: options
Object: files: ['/test/empty.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1210
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1228
Context: options
Object: files: ['/test/malformed.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1251
Context: options
Object: files: ['/test/large.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1281
Context: options
Object: files: ['/test/circular.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1295
Context: options
Object: files: ['/test/unknown.xyz'],
          language: 'unknown',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1313
Context: options
Object: files: ['/test/cached.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1321
Context: options
Object: files: ['/test/cached.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1334
Context: options
Object: files: ['/test/cached.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.test.ts:1346
Context: options
Object: files: ['/test/cached.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:31
Context: metadata
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:79
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:89
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:99
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:109
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:119
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:131
Context: options
Object: files: ['/test/file.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:144
Context: options
Object: directories: ['/test/dir'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:157
Context: options
Object: files: ['/test/complex.ts'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:176
Context: options
Object: 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:213
Context: options
Object: files: ['/test/file.ts'],
          language: 'auto',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:227
Context: options
Object: files: ['/test/file.ts'],
          language: 'typescript',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:240
Context: options
Object: files: ['/test/file.js'],
          language: 'javascript',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:253
Context: options
Object: files: ['/test/file.py'],
          language: 'python',
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:268
Context: options
Object: directories: ['/test'],
          exclude: ['node_modules', '*.spec.ts', 'dist'],
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:281
Context: options
Object: directories: ['/test'],
          maxDepth: 3,
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:294
Context: options
Object: directories: ['/test'],
          includeTests: false,
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:309
Context: options
Object: files: ['/test/style.ts'],
          eslintConfig: {
            rules: {
              'max-len': ['error', { code: 80 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:327
Context: options
Object: files: ['/test/style.ts'],
          customRules: [
            { name: 'custom-rule', severity: 'warn' 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:375
Context: options
Object: files: ['/test.ts'] 


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:389
Context: options
Object: files: largeFileList,
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:402
Context: options
Object: directories: ['/very/deep/nested/directory/structure'],
          maxDepth: 100,
        


### src/tools/implementations/python/__tests__/CodeQualityAnalyzer.simple.test.ts:418
Context: options
Object: directories: ['/test'],
          exclude: largeExcludeList,
        


### src/tools/implementations/orchestrator/WorkflowManager.ts:85
Context: retryPolicy
Object: enabled: boolean;
    maxRetries: number;
    backoffFactor: number;
  


### src/tools/implementations/orchestrator/WorkflowManager.ts:393
Context: data
Object: workflowInfo: {
            workflowId,
            name: params.name,
            description: params.description,
            taskCount: parsedTasks.length,
            triggers: workflow.triggers,
            createdAt: new Date().toISOString(),
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:452
Context: metadata
Object: 


### src/tools/implementations/orchestrator/WorkflowManager.ts:474
Context: data
Object: executionInfo: {
            executionId,
            workflowId: params.workflowId,
            workflowName: workflow.name,
            state: execution.state,
            startedAt: execution.createdAt.toISOString(),
            taskCount: workflow.tasks.length,
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:524
Context: data
Object: executionInfo: {
            executionId: params.executionId,
            state: execution.state,
            pausedAt: new Date().toISOString(),
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:574
Context: data
Object: executionInfo: {
            executionId: params.executionId,
            state: execution.state,
            resumedAt: new Date().toISOString(),
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:632
Context: data
Object: executionInfo: {
            executionId: params.executionId,
            state: execution.state,
            cancelledAt: new Date().toISOString(),
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:695
Context: data
Object: executionStatus: {
            executionId: params.executionId,
            workflowId: execution.workflowId,
            workflowName: workflow.name,
            state: execution.state,
            progressPercentage: progress,
            createdAt: execution.createdAt.toISOString(),
            startedAt: execution.startedAt?.toISOString() || null,
            completedAt: execution.completedAt?.toISOString() || null,
            currentTasks: execution.currentTasks,
            completedTasks: execution.completedTasks,
            failedTasks: execution.failedTasks,
            taskStatuses,
            variables: execution.variables,
            errorMessage: execution.errorMessage,
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:722
Context: params
Object: includeExecutions?: boolean 


### src/tools/implementations/orchestrator/WorkflowManager.ts:753
Context: data
Object: workflows: workflowsInfo,
          totalCount: workflowsInfo.length,
        


### src/tools/implementations/orchestrator/WorkflowManager.ts:810
Context: data
Object: statistics: {
            uptimeSeconds: uptime,
            totalWorkflows: this.workflows.size,
            totalTasksDefined,
            activeExecutions,
            completedExecutions,
            failedExecutions,
            totalTasksExecuted: this.stats.totalTasksExecuted,
            averageExecutionTimeSeconds: Math.round(avgExecutionTime * 100) / 100,
            stateDistribution,
            triggerTypes: Array.from(this.workflowTriggers.keys()),
            maxConcurrentExecutions: this.maxConcurrentExecutions,
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:841
Context: data
Object: handlerInfo: {
            taskType: name,
            handlerRegistered: true,
            totalHandlers: this.taskHandlers.size,
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:864
Context: data
Object: triggerInfo: {
            triggerName: name,
            handlerRegistered: true,
            totalTriggers: this.triggerHandlers.size,
          


### src/tools/implementations/orchestrator/WorkflowManager.ts:907
Context: data
Object: triggerResult: {
            triggerName: params.triggerName,
            triggeredWorkflows,
            count: triggeredWorkflows.length,
          


### src/tools/implementations/orchestrator/TaskDistributor.ts:108
Context: action
Object: assignTo?: string;
    filterAgents?: Record<string, any>;
    priorityBoost?: number;
  


### src/tools/implementations/orchestrator/TaskDistributor.ts:207
Context: taskDistribution
Object: 


### src/tools/implementations/orchestrator/TaskDistributor.ts:208
Context: agentPerformance
Object: 


### src/tools/implementations/orchestrator/TaskDistributor.ts:557
Context: data
Object: registered: true,
        agentId: agent.agentId,
      


### src/tools/implementations/orchestrator/TaskDistributor.ts:585
Context: data
Object: unregistered: true,
        agentId,
      


### src/tools/implementations/orchestrator/TaskDistributor.ts:614
Context: data
Object: agent 


### src/tools/implementations/orchestrator/TaskDistributor.ts:640
Context: data
Object: heartbeatReceived: true,
        agentId,
      


### src/tools/implementations/orchestrator/TaskDistributor.ts:693
Context: data
Object: taskId: newTask.taskId,
        status: assignedTask ? TaskStatus.ASSIGNED : TaskStatus.QUEUED,
        assignedAgent: assignedTask?.assignedAgent,
      


### src/tools/implementations/orchestrator/TaskDistributor.ts:727
Context: data
Object: task 


### src/tools/implementations/orchestrator/TaskDistributor.ts:772
Context: data
Object: task 


### src/tools/implementations/orchestrator/TaskDistributor.ts:817
Context: data
Object: task 


### src/tools/implementations/orchestrator/TaskDistributor.ts:853
Context: data
Object: task: activeTask 


### src/tools/implementations/orchestrator/TaskDistributor.ts:868
Context: data
Object: task 


### src/tools/implementations/orchestrator/TaskDistributor.ts:894
Context: data
Object: task: activeTask 


### src/tools/implementations/orchestrator/TaskDistributor.ts:903
Context: data
Object: task: completedTask 


### src/tools/implementations/orchestrator/TaskDistributor.ts:913
Context: data
Object: task: queuedTask 


### src/tools/implementations/orchestrator/TaskDistributor.ts:929
Context: data
Object: agents 


### src/tools/implementations/orchestrator/TaskDistributor.ts:944
Context: data
Object: queues 


### src/tools/implementations/orchestrator/TaskDistributor.ts:951
Context: data
Object: statistics: this.statistics 


### src/tools/implementations/orchestrator/TaskDistributor.ts:969
Context: data
Object: strategy: this.strategy,
      


### src/tools/implementations/orchestrator/TaskDistributor.ts:998
Context: data
Object: ruleId 


### src/tools/implementations/orchestrator/TaskDistributor.ts:1016
Context: data
Object: removed 


### src/tools/implementations/orchestrator/TaskDistributor.ts:1039
Context: data
Object: path: finalPath 


### src/tools/implementations/orchestrator/TaskDistributor.ts:1085
Context: data
Object: path: finalPath 


### src/tools/implementations/orchestrator/SystemMonitor.ts:72
Context: swap
Object: total: number;
    used: number;
    free: number;
  


### src/tools/implementations/orchestrator/SystemMonitor.ts:375
Context: swap
Object: total: memData.swaptotal || 0,
        used: memData.swapused || 0,
        free: memData.swapfree || 0,
      


### src/tools/implementations/orchestrator/SystemMonitor.ts:475
Context: data
Object: metrics 


### src/tools/implementations/orchestrator/SystemMonitor.ts:526
Context: data
Object: monitoring: true,
        intervalMs,
        level,
      


### src/tools/implementations/orchestrator/SystemMonitor.ts:552
Context: data
Object: monitoring: false 


### src/tools/implementations/orchestrator/SystemMonitor.ts:693
Context: data
Object: rule 


### src/tools/implementations/orchestrator/SystemMonitor.ts:711
Context: data
Object: deleted 


### src/tools/implementations/orchestrator/SystemMonitor.ts:738
Context: data
Object: alerts 


### src/tools/implementations/orchestrator/SystemMonitor.ts:765
Context: data
Object: alert 


### src/tools/implementations/orchestrator/SystemMonitor.ts:774
Context: checks
Object: cpu: this.getHealthStatus('cpu', metrics.cpu.usage),
        memory: this.getHealthStatus('memory', metrics.memory.usagePercent),
        disk: this.getHealthStatus('disk', 
          (metrics.disk.totalUsage / metrics.disk.totalCapacity) * 100
        ),
      


### src/tools/implementations/orchestrator/SystemMonitor.ts:794
Context: data
Object: health 


### src/tools/implementations/orchestrator/SystemMonitor.ts:800
Context: cpu
Object: warning: 70, critical: 90 


### src/tools/implementations/orchestrator/SystemMonitor.ts:801
Context: memory
Object: warning: 80, critical: 95 


### src/tools/implementations/orchestrator/SystemMonitor.ts:802
Context: disk
Object: warning: 80, critical: 90 


### src/tools/implementations/orchestrator/SystemMonitor.ts:849
Context: data
Object: usage 


### src/tools/implementations/orchestrator/SystemMonitor.ts:862
Context: data
Object: process: process || null 


### src/tools/implementations/orchestrator/SystemMonitor.ts:872
Context: data
Object: processes: filtered 


### src/tools/implementations/orchestrator/SystemMonitor.ts:886
Context: data
Object: processes: sorted 


### src/tools/implementations/orchestrator/SystemMonitor.ts:893
Context: data
Object: isMonitoring: this.isMonitoring,
        config: this.config,
        metricsCount: this.metricsHistory.length,
        alertRulesCount: this.alertRules.size,
        activeAlertsCount: Array.from(this.alerts.values())
          .filter(a => !a.resolved).length,
      


### src/tools/implementations/orchestrator/SystemMonitor.ts:918
Context: data
Object: level 


### src/tools/implementations/orchestrator/SystemMonitor.ts:969
Context: data
Object: filepath,
            count: metrics.length,
          


### src/tools/implementations/orchestrator/SystemMonitor.ts:984
Context: data
Object: content,
        count: metrics.length,
      


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:151
Context: statistics
Object: totalRequests: number;
    completedRequests: number;
    failedRequests: number;
    cachedResponses: number;
    averageResponseTime: number;
    strategyUsage: Record<string, number>;
  


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:178
Context: strategyUsage
Object: 


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:314
Context: data
Object: response: cachedResponse,
            fromCache: true,
          


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:363
Context: data
Object: requestId,
        request,
      


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:434
Context: data
Object: fragmentId: fragment.fragmentId,
        fragmentCount: fragments.length,
        processing: this.responses.has(requestId),
      


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:559
Context: metadata
Object: fragmentCount: fragments.length,
          strategy: request.strategy,
        


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:818
Context: metadata
Object: reason: `Timeout: Only ${fragments.length


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:846
Context: metadata
Object: error: error instanceof Error ? error.message : String(error),
      


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:875
Context: data
Object: _response 


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:891
Context: data
Object: status: ResponseStatus.COLLECTING,
        request,
        fragments: fragments.length,
        minRequired: request.minResponses,
      


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:926
Context: data
Object: strategy 


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:951
Context: data
Object: ruleName: name 


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:960
Context: data
Object: cleared: true 


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:967
Context: data
Object: statistics: this.statistics 


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:1008
Context: metadata
Object: reason: 'Cancelled by user',
        fragmentsCollected: fragments.length,
      


### src/tools/implementations/orchestrator/ResponseCoordinator.ts:1019
Context: data
Object: cancelled: true, response 


### src/tools/implementations/orchestrator/CrossAgentCommunicator.ts:70
Context: default
Object: 


### src/tools/implementations/orchestrator/CrossAgentCommunicator.ts:112
Context: metadata
Object: ...params.metadata,
          sentAt: new Date().toISOString(),
          sessionId: context.sessionId,
          traceId: context.traceId,
          priority: params.priority,
        


### src/tools/implementations/orchestrator/CrossAgentCommunicator.ts:140
Context: data
Object: messageId,
                status: 'sent',
                targetAgent: params.targetAgent,
                response,
                deliveryTime: Date.now() - startTime,
              


### src/tools/implementations/orchestrator/CrossAgentCommunicator.ts:178
Context: data
Object: messageId,
          status: 'queued',
          targetAgent: params.targetAgent,
          deliveryTime: Date.now() - startTime,
        


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:29
Context: metadata
Object: 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:51
Context: metadata
Object: region: 'us-east', specialization: 'english' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:67
Context: metadata
Object: region: 'us-west', specialization: 'multi-lingual' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:83
Context: metadata
Object: region: 'us-east', gpu: true 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:99
Context: metadata
Object: region: 'us-central' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:125
Context: rule
Object: priority: 10,
        condition: {
          taskType: 'sentiment_analysis',
          priority: TaskPriority.HIGH,
        


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:131
Context: action
Object: assignTo: 'nlp-agent-1', // Specialized in sentiment
        


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:141
Context: rule
Object: priority: 20,
        condition: {
          'metadata.requiresGpu': true,
        


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:146
Context: action
Object: filterAgents: { 'metadata.gpu': true 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:159
Context: payload
Object: text: 'I love this product!' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:163
Context: metadata
Object: 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:167
Context: payload
Object: text: 'Hello world', targetLang: 'es' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:171
Context: metadata
Object: 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:175
Context: payload
Object: imageUrl: 'http://example.com/image.jpg' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:179
Context: metadata
Object: requiresGpu: true 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:183
Context: payload
Object: dataset: 'sales_2024' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:187
Context: metadata
Object: 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:191
Context: payload
Object: document: 'Large document content...' 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:195
Context: metadata
Object: 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:243
Context: result
Object: sentiment: 'positive', confidence: 0.95 


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:292
Context: payload
Object: text: `Testing ${strategy


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:313
Context: updates
Object: status: AgentStatus.OFFLINE,
      


### src/tools/implementations/orchestrator/examples/TaskDistributor.example.ts:322
Context: payload
Object: text: 'Testing failover' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:12
Context: promises
Object: mkdir: jest.fn(),
    readdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:35
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:61
Context: params
Object: name: 'Test Workflow',
          description: 'A test workflow',
          tasks: [
            {
              taskId: 'task1',
              name: 'First Task',
              taskType: 'test_task',
              parameters: { data: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:76
Context: parameters
Object: data: 'test2' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:80
Context: variables
Object: env: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:97
Context: params
Object: name: 'Circular Workflow',
          description: 'A workflow with circular dependencies',
          tasks: [
            {
              taskId: 'task1',
              name: 'First Task',
              taskType: 'test_task',
              dependencies: ['task2'],
            


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:126
Context: params
Object: name: 'Invalid Workflow',
          description: 'A workflow with missing dependencies',
          tasks: [
            {
              taskId: 'task1',
              name: 'First Task',
              taskType: 'test_task',
              dependencies: ['missing_task'],
            


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:154
Context: params
Object: name: 'Test Workflow',
          description: 'Test workflow for execution',
          tasks: [
            {
              taskId: 'task1',
              name: 'Task 1',
              taskType: 'test_task',
              parameters: { value: 1 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:175
Context: params
Object: workflowId,
          inputVariables: { testVar: 'value' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:193
Context: params
Object: workflowId: 'non-existent-id',
        


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:213
Context: params
Object: name: 'Control Test Workflow',
          description: 'Workflow for testing control actions',
          tasks: [
            {
              taskId: 'task1',
              name: 'Long Task',
              taskType: 'test_task',
              parameters: { duration: 5 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:232
Context: params
Object: workflowId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:244
Context: params
Object: executionId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:258
Context: params
Object: executionId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:264
Context: params
Object: executionId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:276
Context: params
Object: executionId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:293
Context: params
Object: name: 'Status Test Workflow',
          description: 'Workflow for testing status',
          tasks: [
            {
              taskId: 'task1',
              name: 'Test Task',
              taskType: 'test_task',
              dependencies: [],
            


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:315
Context: params
Object: workflowId: createResult.data.workflowInfo.workflowId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:324
Context: params
Object: executionId 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:339
Context: params
Object: executionId: 'non-existent-id' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:354
Context: params
Object: name: 'Workflow 1',
          description: 'First workflow',
          tasks: [{ taskId: 't1', name: 'Task', taskType: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:363
Context: params
Object: name: 'Workflow 2',
          description: 'Second workflow',
          tasks: [{ taskId: 't1', name: 'Task', taskType: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:374
Context: params
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:387
Context: params
Object: includeExecutions: true 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:402
Context: params
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:421
Context: params
Object: name: 'test_task',
          handler: mockHandler,
        


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:438
Context: params
Object: name: 'test_trigger',
          handler: mockHandler,
        


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:457
Context: params
Object: name: 'Triggered Workflow',
          description: 'Workflow with triggers',
          tasks: [{ taskId: 't1', name: 'Task', taskType: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:469
Context: params
Object: triggerName: 'data_update',
          data: { source: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:486
Context: params
Object: triggerName: 'unknown_trigger',
        


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:502
Context: params
Object: name: 'Persistent Workflow',
          description: 'Test persistence',
          tasks: [{ taskId: 't1', name: 'Task', taskType: 'test' 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:526
Context: parameters
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:534
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:536
Context: variables
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:540
Context: retryPolicy
Object: enabled: true, maxRetries: 3, backoffFactor: 2 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:541
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:555
Context: params
Object: 


### src/tools/implementations/orchestrator/__tests__/WorkflowManager.test.ts:570
Context: params
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:45
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:80
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:109
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:118
Context: updates
Object: status: AgentStatus.BUSY,
          currentTasks: 2,
          cpuUsage: 0.7,
        


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:147
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:181
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:197
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:213
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:232
Context: payload
Object: data: 'test' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:259
Context: payload
Object: data: 'test' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:284
Context: payload
Object: data: 'test' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:304
Context: payload
Object: data: 'test' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:339
Context: task
Object: taskType: 'task1',
            payload: { id: t.id 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:379
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:387
Context: task
Object: taskType: 'task1',
          payload: { data: 'test' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:414
Context: result
Object: output: 'success' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:473
Context: metadata
Object: region: 'us-east' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:483
Context: rule
Object: priority: 10,
          condition: { taskType: 'task1', 'metadata.region': 'us-east' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:486
Context: action
Object: assignTo: 'agent-1' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:496
Context: task
Object: taskType: 'task1',
          payload: { data: 'test' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:502
Context: metadata
Object: region: 'us-east' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:514
Context: rule
Object: priority: 10,
          condition: { taskType: 'special' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:517
Context: action
Object: assignTo: 'agent-1' 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:592
Context: updates
Object: status: AgentStatus.BUSY 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:628
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/TaskDistributor.test.ts:635
Context: task
Object: taskType: 'task1',
          payload: { data: 'persist-test' 


### src/tools/implementations/orchestrator/__tests__/SystemMonitor.test.ts:104
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:30
Context: metadata
Object: 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:90
Context: responseData
Object: answer: 'Test response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:122
Context: responseData
Object: answer: 'Response from agent1' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:148
Context: responseData
Object: answer: 'First response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:170
Context: responseData
Object: 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:195
Context: responseData
Object: answer: 'Consensus response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:202
Context: responseData
Object: answer: 'Consensus response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:209
Context: responseData
Object: answer: 'Different response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:240
Context: responseData
Object: answer: 'Low confidence' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:248
Context: responseData
Object: answer: 'High confidence' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:283
Context: responseData
Object: answer: 'Response 1' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:314
Context: responseData
Object: answer: 'Response 1' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:365
Context: responseData
Object: answer: 'lowercase response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:395
Context: responseData
Object: answer: 'Response' 


### src/tools/implementations/orchestrator/__tests__/ResponseCoordinator.test.ts:493
Context: responseData
Object: answer: 'Response' 


### src/tools/documentation/tutorial_builder.ts:99
Context: data
Object: tutorial,
                metadata: {
                    title: options.title,
                    level: options.level,
                    stepCount: steps.length,
                    hasExercises: options.includeExercises,
                    hasQuiz: options.includeQuiz,
                    format: options.format
                


### src/tools/documentation/tutorial_builder.ts:449
Context: data
Object: message: 'Step added successfully',
                tutorialPath
            


### src/tools/documentation/tutorial_builder.ts:509
Context: data
Object: exercises 


### src/tools/documentation/tutorial_builder.ts:550
Context: data
Object: quiz: questions 


### src/tools/documentation/tutorial_builder.ts:598
Context: data
Object: valid: issues.length === 0,
                issues,
                stats: {
                    wordCount: content.split(/\s+/).length,
                    codeBlockCount: codeBlocks.length,
                    sectionCount: (content.match(/^##+ /gm) || []).length
                


### src/tools/documentation/ReadmeGenerator.ts:392
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/documentation/ReadmeGenerator.ts:418
Context: items
Object: type: 'string',
        enum: ['header', 'overview', 'demo', 'features', 'installation', 'quick-start', 'usage', 'api', 'examples', 'configuration', 'contributing', 'testing', 'deployment', 'troubleshooting', 'changelog', 'roadmap', 'faq', 'license', 'acknowledgments', 'security', 'performance']
      


### src/tools/documentation/ReadmeGenerator.ts:428
Context: items
Object: type: 'string',
        enum: ['build', 'coverage', 'version', 'downloads', 'license', 'dependencies', 'vulnerabilities', 'size', 'activity', 'contributors', 'stars', 'forks', 'issues', 'prs', 'release-date', 'node-version', 'typescript']
      


### src/tools/documentation/ReadmeGenerator.ts:488
Context: items
Object: type: 'string',
        enum: ['markdown', 'html', 'pdf', 'docx', 'confluence', 'notion', 'gitbook']
      


### src/tools/documentation/ReadmeGenerator.ts:510
Context: error
Object: code: 'INVALID_PROJECT_PATH',
            message: `Project directory does not exist: ${params.project_path


### src/tools/documentation/ReadmeGenerator.ts:513
Context: details
Object: project_path: params.project_path 


### src/tools/documentation/ReadmeGenerator.ts:515
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/ReadmeGenerator.ts:577
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          project_path: params.project_path,
          readme_style: params.readme_style || 'modern',
          sections_count: sections.length,
          badges_count: badges.length,
          file_size: metadata.file_size,
          word_count: metadata.word_count,
          seo_score: seoAnalysis?.search_visibility_score,
          accessibility_score: accessibilityReport?.overall_score
        


### src/tools/documentation/ReadmeGenerator.ts:595
Context: error
Object: code: 'README_GENERATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate README',
          details: { project_path: params.project_path 


### src/tools/documentation/ReadmeGenerator.ts:600
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/ReadmeGenerator.ts:1800
Context: markdown_syntax
Object: valid: true,
        errors: [],
        warnings: []
      


### src/tools/documentation/ReadmeGenerator.ts:1805
Context: link_validation
Object: total_links: 15,
        valid_links: 14,
        broken_links: [
          {
            url: '#broken-link',
            line: 45,
            error: 'Anchor not found',
            fix_suggestion: 'Create the missing section or fix the anchor'
          


### src/tools/documentation/ReadmeGenerator.ts:1818
Context: image_validation
Object: total_images: 3,
        accessible_images: 2,
        missing_alt_text: [
          {
            src: './docs/demo.png',
            line: 23,
            issue: 'Missing alt text',
            fix_suggestion: 'Add descriptive alt text'
          


### src/tools/documentation/ReadmeGenerator.ts:1832
Context: code_validation
Object: total_code_blocks: 8,
        valid_code_blocks: 8,
        syntax_errors: [],
        suggestions: []
      


### src/tools/documentation/ReadmeGenerator.ts:1894
Context: title_optimization
Object: length: project.name.length,
        optimal_length: project.name.length >= 10 && project.name.length <= 60,
        keyword_presence: true,
        uniqueness_score: 85,
        suggestions: ['Consider adding descriptive keywords to the title']
      


### src/tools/documentation/ReadmeGenerator.ts:1901
Context: description_optimization
Object: length: project.description.length,
        optimal_length: project.description.length >= 120 && project.description.length <= 160,
        keyword_density: 2.5,
        readability_score: 82,
        call_to_action_present: false,
        suggestions: ['Add a clear call-to-action in the description']
      


### src/tools/documentation/ReadmeGenerator.ts:1909
Context: keyword_analysis
Object: primary_keywords: [project.language.toLowerCase(), project.project_type],
        secondary_keywords: ['library', 'npm', 'open source'],
        keyword_density: {
          [project.language.toLowerCase()]: 3.2,
          [project.project_type]: 2.1,
          'npm': 1.8
        


### src/tools/documentation/ReadmeGenerator.ts:1917
Context: keyword_distribution
Object: 'title': 15,
          'headings': 25,
          'content': 60
        


### src/tools/documentation/ReadmeGenerator.ts:1925
Context: header_structure
Object: h1_count: 1,
        h2_count: 8,
        h3_count: 12,
        proper_hierarchy: true,
        keyword_optimization: 78,
        suggestions: ['Optimize header keywords for better SEO']
      


### src/tools/documentation/ReadmeGenerator.ts:1933
Context: link_optimization
Object: internal_links: 12,
        external_links: 8,
        anchor_text_optimization: 85,
        link_diversity: 92,
        broken_links: 1,
        suggestions: ['Fix broken links', 'Add more internal cross-references']
      


### src/tools/documentation/ReadmeGenerator.ts:1941
Context: image_optimization
Object: total_images: 3,
        alt_text_coverage: 67,
        file_size_optimization: 80,
        format_optimization: 90,
        lazy_loading: false,
        suggestions: ['Add alt text to all images', 'Implement lazy loading for images']
      


### src/tools/documentation/ReadmeGenerator.ts:1949
Context: social_media_optimization
Object: twitter_card: false,
        open_graph: false,
        linkedin_optimization: false,
        github_social_preview: true,
        social_sharing_buttons: false,
        suggestions: ['Add Open Graph meta tags', 'Set up Twitter card']
      


### src/tools/documentation/ReadmeGenerator.ts:1965
Context: wcag_compliance
Object: level_a: 95,
        level_aa: 88,
        level_aaa: 72
      


### src/tools/documentation/ReadmeGenerator.ts:1980
Context: color_contrast
Object: sufficient_contrast: true,
        contrast_ratio: 7.2,
        minimum_required: 4.5,
        issues: []
      


### src/tools/documentation/ReadmeGenerator.ts:1986
Context: keyboard_navigation
Object: focusable_elements: true,
        tab_order: true,
        skip_links: false,
        focus_indicators: true
      


### src/tools/documentation/ReadmeGenerator.ts:1992
Context: screen_reader
Object: semantic_markup: true,
        heading_structure: true,
        alt_text_present: false,
        aria_labels: true,
        landmarks: true
      


### src/tools/documentation/ReadmeGenerator.ts:1999
Context: language_attributes
Object: main_language_declared: true,
        language_changes_marked: true,
        correct_language_codes: true
      


### src/tools/documentation/MultiFormatConverter.ts:539
Context: rateLimit
Object: maxRequests: 10,
      windowMs: 60000
    


### src/tools/documentation/MultiFormatConverter.ts:564
Context: items
Object: type: 'string',
        enum: ['markdown', 'html', 'pdf', 'docx', 'latex', 'rst', 'asciidoc', 'confluence', 'notion', 'gitbook', 'sphinx', 'mkdocs', 'docusaurus', 'mediawiki', 'textile', 'org', 'epub', 'json', 'xml', 'yaml']
      


### src/tools/documentation/MultiFormatConverter.ts:608
Context: error
Object: code: 'CONVERSION_VALIDATION_FAILED',
            message: validation.error || 'Conversion validation failed',
            details: { source_path: params.source_path, source_format: params.source_format 


### src/tools/documentation/MultiFormatConverter.ts:613
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/MultiFormatConverter.ts:686
Context: metadata
Object: executionTimeMs: processingTime,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          source_path: params.source_path,
          source_format: params.source_format,
          target_formats: params.target_formats,
          files_processed: sourceFiles.length,
          output_directory: outputDirectory
        


### src/tools/documentation/MultiFormatConverter.ts:701
Context: error
Object: code: 'MULTI_FORMAT_CONVERSION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to convert documents',
          details: { source_path: params.source_path, source_format: params.source_format 


### src/tools/documentation/MultiFormatConverter.ts:706
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/MultiFormatConverter.ts:930
Context: metadata
Object: word_count: 0,
            character_count: 0,
            reading_time: '0 min',
            checksum: ''
          


### src/tools/documentation/MultiFormatConverter.ts:1153
Context: markdown
Object: html: 0.95, pdf: 0.85, docx: 0.75, latex: 0.70 


### src/tools/documentation/MultiFormatConverter.ts:1154
Context: html
Object: markdown: 0.85, pdf: 0.90, docx: 0.80, latex: 0.65 


### src/tools/documentation/MultiFormatConverter.ts:1155
Context: pdf
Object: html: 0.60, markdown: 0.55, docx: 0.70, latex: 0.75 


### src/tools/documentation/MultiFormatConverter.ts:1156
Context: docx
Object: html: 0.85, markdown: 0.80, pdf: 0.90, latex: 0.70 


### src/tools/documentation/MultiFormatConverter.ts:1270
Context: html
Object: format: 'html',
        compatibility_score: 0.95,
        feature_support: [
          { feature: 'styling', supported: true, quality_impact: 'none' 


### src/tools/documentation/MultiFormatConverter.ts:1283
Context: pdf
Object: format: 'pdf',
        compatibility_score: 0.90,
        feature_support: [
          { feature: 'print_formatting', supported: true, quality_impact: 'none' 


### src/tools/documentation/MultiFormatConverter.ts:1345
Context: quality_by_format
Object: 


### src/tools/documentation/MultiFormatConverter.ts:1407
Context: link_validation
Object: total_links: 0,
        valid_links: 0,
        broken_links: 0,
        external_links: 0,
        internal_links: 0,
        broken_link_details: []
      


### src/tools/documentation/MultiFormatConverter.ts:1415
Context: image_validation
Object: total_images: 0,
        valid_images: 0,
        missing_images: 0,
        optimization_suggestions: [],
        accessibility_issues: []
      


### src/tools/documentation/MultiFormatConverter.ts:1422
Context: metadata_validation
Object: required_fields_present: true,
        missing_fields: [],
        invalid_fields: [],
        schema_compliance: true,
        suggestions: []
      


### src/tools/documentation/DocQualityAnalyzer.ts:369
Context: rateLimit
Object: maxRequests: 15,
      windowMs: 60000
    


### src/tools/documentation/DocQualityAnalyzer.ts:449
Context: error
Object: code: 'INVALID_SOURCE_PATH',
            message: `Source path does not exist: ${params.source_path


### src/tools/documentation/DocQualityAnalyzer.ts:452
Context: details
Object: source_path: params.source_path 


### src/tools/documentation/DocQualityAnalyzer.ts:454
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/DocQualityAnalyzer.ts:533
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          source_path: params.source_path,
          overall_score: overallScore,
          grade,
          coverage: coverageAnalysis.overall_coverage,
          standards_compliance: standardsCompliance.overall_compliance,
          total_recommendations: recommendations.length,
          critical_issues: recommendations.filter(r => r.category === 'critical').length
        


### src/tools/documentation/DocQualityAnalyzer.ts:550
Context: error
Object: code: 'DOC_QUALITY_ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to analyze documentation quality',
          details: { source_path: params.source_path 


### src/tools/documentation/DocQualityAnalyzer.ts:555
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/DocQualityAnalyzer.ts:600
Context: coverage_by_file
Object: 'src/index.ts': 95.2,
        'src/api/client.ts': 88.7,
        'src/utils/helpers.ts': 65.4,
        'src/types/index.ts': 92.1,
        'src/config/settings.ts': 45.8
      


### src/tools/documentation/DocQualityAnalyzer.ts:607
Context: coverage_by_category
Object: 'public_api': { total: 89, documented: 85, percentage: 95.5, priority: 'high' 


### src/tools/documentation/DocQualityAnalyzer.ts:710
Context: modern_features_adoption
Object: tsdoc_adoption: 78.5,
        typescript_integration: 92.3,
        modern_syntax_usage: 85.7,
        interactive_examples: 15.4,
        multimedia_content: 8.2,
        cross_references: 45.8,
        features_used: ['TSDoc comments', 'Type annotations', 'Generic types', 'Union types'],
        missing_opportunities: ['Interactive examples', 'Code playground links', 'Video tutorials', 'Mermaid diagrams']
      


### src/tools/documentation/DocQualityAnalyzer.ts:807
Context: coverage_by_language
Object: typescript: { total: 28, working: 26, percentage: 92.9 


### src/tools/documentation/DocQualityAnalyzer.ts:809
Context: javascript
Object: total: 6, working: 5, percentage: 83.3 


### src/tools/documentation/DocQualityAnalyzer.ts:822
Context: heading_structure
Object: proper_hierarchy: false,
        missing_h1: false,
        skipped_levels: [
          {
            file_path: 'docs/guide.md',
            line_number: 23,
            heading_text: 'Configuration Details',
            issue_type: 'skipped_h3',
            severity: 'warning'
          


### src/tools/documentation/DocQualityAnalyzer.ts:837
Context: color_contrast
Object: meets_aa_standard: true,
        meets_aaa_standard: false,
        low_contrast_issues: [
          {
            element_type: 'link',
            foreground_color: '#007acc',
            background_color: '#ffffff',
            contrast_ratio: 4.12,
            required_ratio: 4.5,
            location: 'docs/styles.css:45'
          


### src/tools/documentation/DocQualityAnalyzer.ts:852
Context: keyboard_navigation
Object: focusable_elements: 45,
        proper_tab_order: true,
        skip_links_present: false,
        focus_indicators: true,
        issues: [
          {
            element_type: 'button',
            issue: 'Missing skip link for keyboard users',
            location: 'docs/interactive.md',
            severity: 'warning'
          


### src/tools/documentation/DocQualityAnalyzer.ts:866
Context: screen_reader_compatibility
Object: semantic_markup: 89.2,
        aria_labels_coverage: 67.8,
        landmark_usage: 92.1,
        table_headers: true,
        form_labels: true,
        issues: [
          {
            element_type: 'image',
            issue: 'Missing alt text',
            location: 'docs/architecture.md:67',
            suggestion: 'Add descriptive alt text for architecture diagram'
          


### src/tools/documentation/DocQualityAnalyzer.ts:881
Context: wcag_compliance
Object: level_a: 95.2,
        level_aa: 82.4,
        level_aaa: 58.9,
        violations: [
          {
            criterion: '1.4.3 Contrast (Minimum)',
            level: 'AA',
            description: 'Text contrast ratio insufficient',
            location: 'docs/styles.css:45',
            impact: 'moderate'
          


### src/tools/documentation/DocQualityAnalyzer.ts:920
Context: engagement_metrics
Object: average_reading_time: 8.5,
        complexity_level: 'intermediate',
        user_journey_coverage: 78.2,
        tutorial_completeness: 82.7
      


### src/tools/documentation/DocQualityAnalyzer.ts:1128
Context: metadata
Object: generated_at: new Date().toISOString(),
        analysis_duration: '4.2s',
        files_analyzed: 24,
        tool_version: '1.0.0',
        standards_checked: ['TSDoc', 'Accessibility', 'Link Validation']
      


### src/tools/documentation/DocAutomationSetup.ts:392
Context: rateLimit
Object: maxRequests: 5,
      windowMs: 60000
    


### src/tools/documentation/DocAutomationSetup.ts:417
Context: items
Object: type: 'string',
        enum: ['typedoc', 'tsdoc', 'api_extractor', 'compodoc', 'sphinx', 'mkdocs', 'docusaurus', 'jsdoc', 'swagger', 'openapi']
      


### src/tools/documentation/DocAutomationSetup.ts:427
Context: items
Object: type: 'string',
        enum: ['push', 'pull_request', 'release', 'scheduled', 'manual', 'tag', 'api_change']
      


### src/tools/documentation/DocAutomationSetup.ts:437
Context: items
Object: type: 'string',
        enum: ['github_pages', 'netlify', 'vercel', 'azure_static_web', 's3_cloudfront', 'firebase_hosting', 'gitlab_pages', 'local_build']
      


### src/tools/documentation/DocAutomationSetup.ts:458
Context: error
Object: code: 'AUTOMATION_VALIDATION_FAILED',
            message: `Automation setup validation failed with errors`,
            details: { validation_results: validation 


### src/tools/documentation/DocAutomationSetup.ts:463
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/DocAutomationSetup.ts:513
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          project_path: params.project_path,
          automation_type: params.automation_type,
          tools_count: params.documentation_tools?.length || 0,
          triggers_count: params.triggers?.length || 0,
          targets_count: params.output_targets?.length || 0
        


### src/tools/documentation/DocAutomationSetup.ts:528
Context: error
Object: code: 'DOC_AUTOMATION_SETUP_ERROR',
          message: error instanceof Error ? error.message : 'Failed to setup documentation automation',
          details: { project_path: params.project_path, automation_type: params.automation_type 


### src/tools/documentation/DocAutomationSetup.ts:533
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/DocAutomationSetup.ts:575
Context: platform_compatibility
Object: platform: params.automation_type, supported: false, version_requirements: {


### src/tools/documentation/DocAutomationSetup.ts:629
Context: github_actions
Object: platform: 'GitHub Actions',
        supported: true,
        version_requirements: { 'actions/checkout': 'v4', 'actions/setup-node': 'v4' 


### src/tools/documentation/DocAutomationSetup.ts:635
Context: gitlab_ci
Object: platform: 'GitLab CI',
        supported: true,
        version_requirements: { 'gitlab-ci-yml': '1.0' 


### src/tools/documentation/DocAutomationSetup.ts:641
Context: jenkins
Object: platform: 'Jenkins',
        supported: true,
        version_requirements: { 'jenkins': '2.400+', 'nodejs': '18+' 


### src/tools/documentation/DocAutomationSetup.ts:647
Context: azure_devops
Object: platform: 'Azure DevOps',
        supported: true,
        version_requirements: { 'azure-pipelines': '1.0' 


### src/tools/documentation/DocAutomationSetup.ts:653
Context: custom
Object: platform: 'Custom Solution',
        supported: true,
        version_requirements: {


### src/tools/documentation/DocAutomationSetup.ts:664
Context: version_requirements
Object: 


### src/tools/documentation/DocAutomationSetup.ts:672
Context: typedoc
Object: tool: 'typedoc',
        compatible: true,
        version_required: '^0.25.0',
        configuration_notes: ['Requires TypeScript project', 'Best with modern TypeScript'],
        integration_complexity: 'simple'
      


### src/tools/documentation/DocAutomationSetup.ts:679
Context: tsdoc
Object: tool: 'tsdoc',
        compatible: true,
        version_required: '^0.14.0',
        configuration_notes: ['Microsoft standard for TypeScript documentation'],
        integration_complexity: 'simple'
      


### src/tools/documentation/DocAutomationSetup.ts:686
Context: api_extractor
Object: tool: 'api_extractor',
        compatible: true,
        version_required: '^7.38.0',
        configuration_notes: ['Microsoft tool for API documentation and validation'],
        integration_complexity: 'moderate'
      


### src/tools/documentation/DocAutomationSetup.ts:693
Context: compodoc
Object: tool: 'compodoc',
        compatible: true,
        version_required: '^1.1.0',
        configuration_notes: ['Specialized for Angular projects'],
        integration_complexity: 'simple'
      


### src/tools/documentation/DocAutomationSetup.ts:700
Context: sphinx
Object: tool: 'sphinx',
        compatible: true,
        version_required: '^7.0.0',
        configuration_notes: ['Python-based, excellent for complex documentation'],
        integration_complexity: 'complex'
      


### src/tools/documentation/DocAutomationSetup.ts:707
Context: mkdocs
Object: tool: 'mkdocs',
        compatible: true,
        version_required: '^1.5.0',
        configuration_notes: ['Markdown-based static site generator'],
        integration_complexity: 'simple'
      


### src/tools/documentation/DocAutomationSetup.ts:714
Context: docusaurus
Object: tool: 'docusaurus',
        compatible: true,
        version_required: '^3.0.0',
        configuration_notes: ['React-based documentation platform'],
        integration_complexity: 'moderate'
      


### src/tools/documentation/DocAutomationSetup.ts:721
Context: jsdoc
Object: tool: 'jsdoc',
        compatible: true,
        version_required: '^4.0.0',
        configuration_notes: ['JavaScript documentation generator'],
        integration_complexity: 'simple'
      


### src/tools/documentation/DocAutomationSetup.ts:728
Context: swagger
Object: tool: 'swagger',
        compatible: true,
        version_required: '^3.0.0',
        configuration_notes: ['API documentation standard'],
        integration_complexity: 'moderate'
      


### src/tools/documentation/DocAutomationSetup.ts:735
Context: openapi
Object: tool: 'openapi',
        compatible: true,
        version_required: '^3.1.0',
        configuration_notes: ['Modern API specification format'],
        integration_complexity: 'moderate'
      


### src/tools/documentation/DocAutomationSetup.ts:1049
Context: coverage_tracking
Object: enabled: true,
        minimum_coverage: 80,
        track_by_file: true,
        track_by_category: true,
        reporting_format: 'html'
      


### src/tools/documentation/DocAutomationSetup.ts:1062
Context: link_validation
Object: enabled: true,
        check_external_links: true,
        check_internal_links: true,
        ignore_patterns: ['localhost', '127.0.0.1'],
        retry_attempts: 3,
        timeout_ms: 5000
      


### src/tools/documentation/DocAutomationSetup.ts:1084
Context: custom_domain_setup
Object: domain: 'docs.example.com',
        dns_configuration: [{
          type: 'CNAME',
          name: 'docs',
          value: 'your-username.github.io',
          ttl: 3600
        


### src/tools/documentation/DocAutomationSetup.ts:1099
Context: ssl_configuration
Object: provider: 'letsencrypt',
        auto_renewal: true,
        security_headers: [{
          name: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains',
          description: 'Enforce HTTPS connections'
        


### src/tools/documentation/DocAutomationSetup.ts:1114
Context: uptime_monitoring
Object: enabled: true,
        check_interval: 300,
        endpoints_to_monitor: ['/', '/api', '/search'],
        alert_threshold: 3,
        notification_channels: ['email']
      


### src/tools/documentation/DocAutomationSetup.ts:1121
Context: performance_monitoring
Object: enabled: true,
        metrics_to_track: ['page_load_time', 'core_web_vitals'],
        sampling_rate: 100,
        alert_thresholds: {
          page_load_time: 3000,
          time_to_interactive: 5000
        


### src/tools/documentation/DocAutomationSetup.ts:1130
Context: error_tracking
Object: enabled: true,
        error_sampling_rate: 100,
        source_map_support: true,
        privacy_settings: {
          mask_user_data: true,
          exclude_paths: ['/admin'],
          data_retention_days: 30
        


### src/tools/documentation/DiagramGenerator.ts:1315
Context: rateLimit
Object: maxRequests: 15,
      windowMs: 60000
    


### src/tools/documentation/DiagramGenerator.ts:1334
Context: properties
Object: input_type: {
          type: 'string',
          enum: ['code_analysis', 'text_description', 'structured_data', 'api_spec', 'database_schema', 'git_history', 'manual_specification'],
          required: true
        


### src/tools/documentation/DiagramGenerator.ts:1340
Context: source_path
Object: type: 'string' 


### src/tools/documentation/DiagramGenerator.ts:1341
Context: source_content
Object: type: 'string' 


### src/tools/documentation/DiagramGenerator.ts:1349
Context: properties
Object: output_directory: { type: 'string', required: true 


### src/tools/documentation/DiagramGenerator.ts:1351
Context: base_filename
Object: type: 'string', required: true 


### src/tools/documentation/DiagramGenerator.ts:1352
Context: include_metadata
Object: type: 'boolean' 


### src/tools/documentation/DiagramGenerator.ts:1353
Context: include_statistics
Object: type: 'boolean' 


### src/tools/documentation/DiagramGenerator.ts:1354
Context: responsive_design
Object: type: 'boolean' 


### src/tools/documentation/DiagramGenerator.ts:1362
Context: items
Object: type: 'string',
        enum: ['svg', 'png', 'jpg', 'pdf', 'html', 'json', 'xml', 'dot', 'plantuml', 'mermaid', 'drawio', 'visio', 'lucidchart']
      


### src/tools/documentation/DiagramGenerator.ts:1384
Context: error
Object: code: 'DIAGRAM_VALIDATION_FAILED',
            message: validation.error || 'Diagram generation validation failed',
            details: { diagram_type: params.diagram_type, source_input: params.source_input 


### src/tools/documentation/DiagramGenerator.ts:1389
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/DiagramGenerator.ts:1472
Context: metadata
Object: executionTimeMs: processingTime,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          diagram_type: params.diagram_type,
          source_type: sourceInput.input_type,
          output_directory: outputDirectory,
          diagrams_generated: generatedDiagrams.length
        


### src/tools/documentation/DiagramGenerator.ts:1486
Context: error
Object: code: 'DIAGRAM_GENERATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate diagrams',
          details: { diagram_type: params.diagram_type 


### src/tools/documentation/DiagramGenerator.ts:1491
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/DiagramGenerator.ts:1636
Context: code_analysis
Object: total_files_analyzed: 25,
        programming_languages: [
          { language: 'TypeScript', file_count: 15, line_count: 3500, percentage: 70 


### src/tools/documentation/DiagramGenerator.ts:1643
Context: code_quality_metrics
Object: maintainability_index: 78,
          technical_debt_ratio: 0.15,
          code_coverage: 85,
          duplication_percentage: 3.2,
          security_hotspots: 2,
          bug_probability: 0.08
        


### src/tools/documentation/DiagramGenerator.ts:1687
Context: dependency_analysis
Object: total_dependencies: 45,
        direct_dependencies: 18,
        transitive_dependencies: 27,
        circular_dependencies: [],
        dependency_graph_metrics: {
          graph_density: 0.23,
          average_degree: 3.2,
          clustering_coefficient: 0.15,
          longest_path: 8,
          strongly_connected_components: 12
        


### src/tools/documentation/DiagramGenerator.ts:1700
Context: license_analysis
Object: license_distribution: [
            { license_name: 'MIT', license_type: 'permissive', dependency_count: 15, risk_level: 'low' 


### src/tools/documentation/DiagramGenerator.ts:1710
Context: pattern_analysis
Object: architectural_patterns: [
          {
            pattern_name: 'MVC',
            confidence: 0.85,
            benefits: ['Separation of concerns', 'Testability'],
            implementation_quality: 0.78,
            adherence_score: 0.82
          


### src/tools/documentation/DiagramGenerator.ts:1732
Context: architecture_analysis
Object: architectural_style: 'Layered Architecture',
        layer_analysis: {
          identified_layers: [
            {
              layer_name: 'Presentation',
              layer_type: 'presentation',
              component_count: 8,
              responsibilities: ['User interface', 'Input validation'],
              dependencies: ['business']
            


### src/tools/documentation/DiagramGenerator.ts:1762
Context: module_analysis
Object: module_cohesion: 0.82,
          module_coupling: 0.31,
          module_size_distribution: [],
          module_dependencies: []
        


### src/tools/documentation/DiagramGenerator.ts:1768
Context: interface_analysis
Object: interface_count: 15,
          interface_implementations: [],
          interface_segregation_violations: [],
          api_design_quality: 0.85
        


### src/tools/documentation/DiagramGenerator.ts:1774
Context: data_flow_analysis
Object: data_flow_patterns: [
            {
              pattern_name: 'Request-Response',
              pattern_type: 'request_response',
              frequency: 45,
              efficiency_score: 0.88
            


### src/tools/documentation/DiagramGenerator.ts:1784
Context: data_storage_analysis
Object: storage_types: [
              {
                storage_type: 'relational',
                usage_count: 3,
                data_volume_category: 'medium'
              


### src/tools/documentation/DiagramGenerator.ts:1795
Context: information_flow_metrics
Object: information_density: 0.75,
            flow_efficiency: 0.82,
            bottleneck_analysis: [],
            redundancy_analysis: []
          


### src/tools/documentation/DiagramGenerator.ts:1803
Context: quality_analysis
Object: overall_quality_score: 0.81,
        quality_dimensions: [
          {
            dimension_name: 'Maintainability',
            score: 0.85,
            weight: 0.3,
            contributing_factors: [
              {
                factor_name: 'Code organization',
                impact: 'positive',
                magnitude: 0.8,
                description: 'Well-structured modules and clear naming'
              


### src/tools/documentation/DiagramGenerator.ts:1898
Context: statistics
Object: total_elements: nodeCount + edgeCount,
        elements_by_type: {
          nodes: nodeCount,
          edges: edgeCount
        


### src/tools/documentation/DiagramGenerator.ts:2170
Context: metadata
Object: generated_at: new Date().toISOString(),
            _format: _format
          


### src/tools/documentation/DiagramGenerator.ts:2301
Context: coupling_metrics
Object: afferent_coupling: Math.floor(edgeCount * 0.6),
        efferent_coupling: Math.floor(edgeCount * 0.4),
        coupling_ratio: 0.67,
        coupling_density: edgeCount / (nodeCount * (nodeCount - 1))
      


### src/tools/documentation/DiagramGenerator.ts:2307
Context: cohesion_metrics
Object: cohesion_score: 0.75,
        functional_cohesion: 0.8,
        sequential_cohesion: 0.7,
        communicational_cohesion: 0.75
      


### src/tools/documentation/DiagramGenerator.ts:2313
Context: size_metrics
Object: lines_of_code: analysisResults?.code_analysis?.code_quality_metrics ? 3500 : undefined,
        number_of_classes: nodeCount,
        number_of_methods: nodeCount * 3,
        number_of_attributes: nodeCount * 2,
        number_of_interfaces: Math.floor(nodeCount * 0.3)
      


### src/tools/documentation/DiagramGenerator.ts:2379
Context: visual_quality
Object: layout_quality: 0.85,
        visual_balance: 0.82,
        color_harmony: 0.88,
        typography_consistency: 0.90,
        visual_hierarchy: 0.87,
        aesthetic_appeal: 0.84
      


### src/tools/documentation/DiagramGenerator.ts:2387
Context: content_quality
Object: information_completeness: 0.89,
        accuracy_score: 0.92,
        relevance_score: 0.91,
        clarity_score: 0.86,
        consistency_score: 0.88,
        up_to_date_score: 1.0
      


### src/tools/documentation/DiagramGenerator.ts:2395
Context: usability_metrics
Object: navigation_ease: 0.85,
        interaction_efficiency: 0.83,
        user_satisfaction_prediction: 0.87,
        task_completion_likelihood: 0.89,
        error_prevention_score: 0.91,
        learnability_score: 0.84
      


### src/tools/documentation/DiagramGenerator.ts:2403
Context: accessibility_metrics
Object: wcag_compliance_level: 'AA',
        color_contrast_ratio: 4.8,
        keyboard_navigation_support: true,
        screen_reader_compatibility: 0.78,
        alternative_text_coverage: 0.85,
        accessibility_score: 0.82
      


### src/tools/documentation/DiagramGenerator.ts:2411
Context: performance_metrics
Object: rendering_performance: 0.88,
        file_size_efficiency: 0.91,
        load_time_estimate: 1.2,
        scalability_score: 0.86,
        memory_efficiency: 0.89,
        cpu_efficiency: 0.87
      


### src/tools/documentation/DiagramGenerator.ts:2435
Context: content_validation
Object: content_accuracy: 0.92,
        content_completeness: 0.89,
        missing_elements: [],
        inconsistencies: [],
        outdated_information: []
      


### src/tools/documentation/DiagramGenerator.ts:2442
Context: accessibility_validation
Object: overall_accessibility_score: 0.85,
        wcag_violations: [],
        accessibility_improvements: [],
        compliance_summary: {
          level_a_compliance: 1.0,
          level_aa_compliance: 0.85,
          level_aaa_compliance: 0.65,
          overall_compliance: 0.83,
          certification_ready: true
        


### src/tools/documentation/DiagramGenerator.ts:2454
Context: performance_validation
Object: performance_score: 0.88,
        performance_issues: [],
        optimization_opportunities: [],
        benchmark_results: []
      


### src/tools/documentation/DiagramGenerator.ts:2460
Context: compliance_validation
Object: standards_compliance: [],
        regulatory_compliance: [],
        industry_compliance: [],
        custom_compliance: []
      


### src/tools/documentation/DiagramGenerator.ts:2537
Context: generation_time
Object: total_time: `${processingTime


### src/tools/documentation/DiagramGenerator.ts:2550
Context: resource_usage
Object: peak_memory_usage: '245MB',
        average_memory_usage: '180MB',
        cpu_usage_percentage: 65,
        disk_io_operations: 15,
        network_requests: 0,
        cache_hit_ratio: 0.0
      


### src/tools/documentation/DiagramGenerator.ts:2558
Context: scalability_metrics
Object: complexity_scaling: {
          current_complexity: totalNodes + totalEdges,
          estimated_max_complexity: 1000,
          scaling_factor: 1.2,
          performance_degradation_point: 500
        


### src/tools/documentation/DiagramGenerator.ts:2565
Context: size_scaling
Object: current_node_count: totalNodes,
          estimated_max_nodes: 200,
          memory_per_node: '1.2MB',
          rendering_time_per_node: '12ms'
        


### src/tools/documentation/DiagramGenerator.ts:2571
Context: performance_scaling
Object: current_performance_score: 0.85,
          projected_performance_at_scale: 0.65,
          critical_performance_thresholds: []
        


### src/tools/documentation/DiagramGenerator.ts:2576
Context: resource_scaling
Object: memory_scaling_factor: 1.1,
          cpu_scaling_factor: 1.3,
          io_scaling_factor: 1.05,
          estimated_resource_requirements: []
        


### src/tools/documentation/ChangelogManager.ts:271
Context: auth
Object: user_env_var: string;
    pass_env_var: string;
  


### src/tools/documentation/ChangelogManager.ts:1067
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/documentation/ChangelogManager.ts:1117
Context: error
Object: code: 'CHANGELOG_VALIDATION_FAILED',
            message: validation.error || 'Changelog validation failed',
            details: { project_path: params.project_path, action: params.action 


### src/tools/documentation/ChangelogManager.ts:1122
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/ChangelogManager.ts:1161
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          project_path: params.project_path,
          action: params.action,
          changelog_format: params.changelog_format,
          changelog_path: changelogPath
        


### src/tools/documentation/ChangelogManager.ts:1175
Context: error
Object: code: 'CHANGELOG_MANAGER_ERROR',
          message: error instanceof Error ? error.message : 'Failed to manage changelog',
          details: { project_path: params.project_path, action: params.action 


### src/tools/documentation/ChangelogManager.ts:1180
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/ChangelogManager.ts:1350
Context: metadata
Object: version: params.version || '1.0.0',
        release_date: new Date().toISOString().split('T')[0],
        sections_included: ['header', 'unreleased', 'versions'],
        total_changes: 0,
        breaking_changes_count: 0,
        new_features_count: 0,
        bug_fixes_count: 0,
        word_count: content.split(/\s+/).length,
        reading_time: `${Math.ceil(content.split(/\s+/).length / 200)


### src/tools/documentation/ChangelogManager.ts:1606
Context: format_compliance
Object: format: format,
          compliance_score: 0,
          violations: [{
            type: 'header',
            severity: 'error',
            line_number: 0,
            description: 'Changelog file not found',
            current_value: '',
            expected_format: 'Changelog file should exist',
            auto_fixable: true
          


### src/tools/documentation/ChangelogManager.ts:1622
Context: content_quality
Object: overall_score: 0,
          completeness_score: 0,
          clarity_score: 0,
          consistency_score: 0,
          usefulness_score: 0,
          quality_issues: [],
          improvement_suggestions: []
        


### src/tools/documentation/ChangelogManager.ts:1631
Context: structure_analysis
Object: has_header: false,
          has_description: false,
          version_order_correct: false,
          date_format_consistent: false,
          section_structure_valid: false,
          hierarchy_issues: [],
          structure_score: 0
        


### src/tools/documentation/ChangelogManager.ts:1640
Context: link_validation
Object: total_links: 0,
          valid_links: 0,
          broken_links: 0,
          external_links: 0,
          internal_links: 0,
          broken_link_details: [],
          link_quality_score: 0
        


### src/tools/documentation/ChangelogManager.ts:1649
Context: version_validation
Object: version_format_valid: false,
          semantic_versioning_compliance: false,
          version_chronology_correct: false,
          duplicate_versions: [],
          missing_versions: [],
          version_issues: []
        


### src/tools/documentation/ChangelogManager.ts:1792
Context: release_patterns
Object: average_time_between_releases: '2.5 weeks',
        release_frequency_trend: 'stable',
        seasonal_patterns: [],
        release_size_distribution: {
          small_releases: 15,
          medium_releases: 8,
          large_releases: 2,
          average_changes_per_release: 7.2,
          release_size_trend: 'stable'
        


### src/tools/documentation/ChangelogManager.ts:1805
Context: content_analysis
Object: change_type_distribution: {
          features: 45,
          bug_fixes: 30,
          improvements: 15,
          breaking_changes: 5,
          security_updates: 3,
          documentation: 2,
          other: 0,
          trend_over_time: []
        


### src/tools/documentation/ChangelogManager.ts:1816
Context: language_analysis
Object: primary_language: 'en',
          readability_level: 'high_school',
          average_sentence_length: 12,
          complex_words_percentage: 15,
          technical_terms_count: 25,
          consistency_score: 0.85
        


### src/tools/documentation/ChangelogManager.ts:1824
Context: readability_analysis
Object: flesch_reading_ease: 65,
          flesch_kincaid_grade: 8.5,
          gunning_fog_index: 10.2,
          coleman_liau_index: 9.1,
          overall_readability: 'standard',
          improvement_suggestions: []
        


### src/tools/documentation/ChangelogManager.ts:1832
Context: keyword_analysis
Object: most_frequent_terms: [],
          technical_terms: [],
          trending_keywords: [],
          keyword_density: 0.05
        


### src/tools/documentation/ChangelogManager.ts:1839
Context: trend_analysis
Object: development_velocity: {
          overall_trend: 'stable',
          velocity_metrics: [],
          factors_analysis: []
        


### src/tools/documentation/ChangelogManager.ts:1845
Context: feature_introduction_rate
Object: trend_direction: 'stable',
          innovation_rate: 0.75,
          feature_complexity_trend: 'stable',
          feature_categories: []
        


### src/tools/documentation/ChangelogManager.ts:1851
Context: bug_fix_rate
Object: bug_introduction_rate: 0.3,
          bug_resolution_time: '1.5 weeks',
          bug_severity_distribution: [],
          quality_improvement_indicators: []
        


### src/tools/documentation/ChangelogManager.ts:1857
Context: breaking_change_frequency
Object: frequency: 0.1,
          impact_severity_distribution: {
            low: 2,
            medium: 2,
            high: 1,
            critical: 0
          


### src/tools/documentation/ChangelogManager.ts:1870
Context: contributor_analysis
Object: unique_contributors: 8,
        top_contributors: [],
        contribution_patterns: [],
        collaboration_metrics: {
          cross_team_contributions: 12,
          review_participation_rate: 0.85,
          knowledge_sharing_indicators: [],
          mentorship_activities: []
        


### src/tools/documentation/ChangelogManager.ts:1881
Context: impact_analysis
Object: user_impact_assessment: {
          overall_impact_score: 0.8,
          positive_impacts: [],
          negative_impacts: [],
          user_experience_trends: []
        


### src/tools/documentation/ChangelogManager.ts:1889
Context: technical_debt_analysis
Object: debt_accumulation_rate: 'low',
          debt_repayment_rate: 'medium',
          net_debt_trend: 'stable',
          debt_categories: [],
          prioritization_recommendations: []
        


### src/tools/documentation/ChangelogManager.ts:1896
Context: ecosystem_impact
Object: dependency_updates: [],
          integration_compatibility: [],
          community_response_indicators: []
        


### src/tools/documentation/ChangelogManager.ts:1965
Context: file_statistics
Object: file_size_bytes: 0,
        line_count: 0,
        word_count: 0,
        character_count: 0,
        last_modified: new Date().toISOString(),
        encoding: 'utf8',
        file_format: 'markdown'
      


### src/tools/documentation/ChangelogManager.ts:1974
Context: content_statistics
Object: total_versions: 0,
        total_changes: 0,
        changes_by_type: {


### src/tools/documentation/ChangelogManager.ts:1984
Context: version_statistics
Object: version_range: '',
        date_range: '',
        release_frequency: {
          total_releases: 0,
          average_time_between_releases: '',
          fastest_release_cycle: '',
          slowest_release_cycle: '',
          release_velocity_trend: 'stable'
        


### src/tools/documentation/ChangelogManager.ts:1994
Context: version_format_distribution
Object: semantic_versions: 0,
          date_versions: 0,
          custom_versions: 0,
          pre_release_versions: 0,
          build_metadata_versions: 0
        


### src/tools/documentation/ChangelogManager.ts:2003
Context: maintenance_statistics
Object: last_update_age: '',
        update_frequency: '',
        automation_level: 0,
        manual_intervention_required: 0,
        maintenance_debt_score: 0
      


### src/tools/documentation/ChangelogManager.ts:2010
Context: quality_statistics
Object: overall_quality_score: 0,
        format_compliance_score: 0,
        content_completeness_score: 0,
        accessibility_score: 0,
        readability_score: 0,
        link_health_score: 0,
        improvement_trend: 'stable'
      


### src/tools/documentation/ApiExtractor.ts:73
Context: default
Object: logLevel: 'error' | 'warning' | 'info' | 'verbose' | 'none' 


### src/tools/documentation/ApiExtractor.ts:202
Context: rateLimit
Object: maxRequests: 10,
      windowMs: 60000
    


### src/tools/documentation/ApiExtractor.ts:266
Context: error
Object: code: 'PROJECT_VALIDATION_FAILED',
            message: `Project validation failed: ${validation.errors.join(', ')


### src/tools/documentation/ApiExtractor.ts:269
Context: details
Object: project_path: params.project_path, entry_point: params.entry_point 


### src/tools/documentation/ApiExtractor.ts:271
Context: metadata
Object: executionTimeMs: 0,
            retries: 0,
            cacheHit: false
          


### src/tools/documentation/ApiExtractor.ts:314
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          project_path: params.project_path,
          entry_point: params.entry_point,
          validation_level: params.validation_level,
          api_count: analysis.publicApiCount,
          complexity_score: analysis.complexityScore
        


### src/tools/documentation/ApiExtractor.ts:329
Context: error
Object: code: 'API_EXTRACTOR_ERROR',
          message: error instanceof Error ? error.message : 'Failed to extract API documentation',
          details: { project_path: params.project_path, entry_point: params.entry_point 


### src/tools/documentation/ApiExtractor.ts:334
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/documentation/ApiExtractor.ts:405
Context: compiler
Object: tsconfigFilePath: path.join(projectPath, 'tsconfig.json'),
        skipLibCheck: true
      


### src/tools/documentation/ApiExtractor.ts:409
Context: apiReport
Object: enabled: params.api_review !== false,
        reportFolder: path.join(projectPath, 'etc'),
        reportFileName: '<unscopedPackageName>.api.md',
        reportTempFolder: path.join(projectPath, 'temp')
      


### src/tools/documentation/ApiExtractor.ts:415
Context: docModel
Object: enabled: params.doc_model !== false,
        apiJsonFilePath: path.join(projectPath, 'etc', '<unscopedPackageName>.api.json'),
        includeForgottenExports: true
      


### src/tools/documentation/ApiExtractor.ts:420
Context: dtsRollup
Object: enabled: params.rollup_types !== false,
        untrimmedFilePath: path.join(projectPath, 'dist', '<unscopedPackageName>.d.ts'),
        betaTrimmedFilePath: path.join(projectPath, 'dist', '<unscopedPackageName>-beta.d.ts'),
        publicTrimmedFilePath: path.join(projectPath, 'dist', '<unscopedPackageName>-public.d.ts')
      


### src/tools/documentation/ApiExtractor.ts:426
Context: messages
Object: compilerMessageReporting: {
          default: {
            logLevel: this.getLogLevel(params.validation_level, 'compiler')
          


### src/tools/documentation/ApiExtractor.ts:432
Context: extractorMessageReporting
Object: default: {
            logLevel: this.getLogLevel(params.validation_level, 'extractor')
          


### src/tools/documentation/ApiExtractor.ts:437
Context: tsdocMessageReporting
Object: default: {
            logLevel: this.getLogLevel(params.validation_level, 'tsdoc')
          


### src/tools/documentation/ApiExtractor.ts:443
Context: tsdocMetadata
Object: enabled: true,
        tsdocMetadataFilePath: path.join(projectPath, 'dist', 'tsdoc-metadata.json')
      


### src/tools/documentation/ApiExtractor.ts:454
Context: strict
Object: compiler: 'error',
        extractor: 'error',
        tsdoc: 'warning'
      


### src/tools/documentation/ApiExtractor.ts:459
Context: moderate
Object: compiler: 'warning',
        extractor: 'warning',
        tsdoc: 'info'
      


### src/tools/documentation/ApiExtractor.ts:464
Context: permissive
Object: compiler: 'info',
        extractor: 'info',
        tsdoc: 'none'
      


### src/tools/documentation/ApiExtractor.ts:498
Context: typeComplexity
Object: averageParameterCount: 2.8,
        maxParameterCount: 7,
        genericTypesCount: 23,
        unionTypesCount: 34,
        intersectionTypesCount: 12,
        recursiveTypesCount: 3
      


### src/tools/documentation/__tests__/tutorial_builder.test.ts:45
Context: options
Object: title: 'My Tutorial',
                    description: 'Learn how to use this tool',
                    level: 'beginner',
                    format: 'markdown'
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:70
Context: options
Object: title: 'Tutorial with Exercises',
                    description: 'Tutorial including exercises',
                    level: 'beginner',
                    includeExercises: true
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:92
Context: options
Object: title: 'Tutorial with Quiz',
                    description: 'Tutorial including quiz',
                    level: 'intermediate',
                    includeQuiz: true
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:118
Context: options
Object: title: 'File-based Tutorial',
                    description: 'Tutorial saved to file',
                    outputPath: '/tmp/tutorial.md'
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:139
Context: options
Object: title: 'HTML Tutorial',
                    description: 'Tutorial in HTML format',
                    format: 'html'
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:161
Context: options
Object: title: 'Advanced Tutorial',
                    description: 'For experienced developers',
                    level: 'advanced'
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:179
Context: options
Object: title: 'No Steps Tutorial'
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:197
Context: options
Object: 


### src/tools/documentation/__tests__/tutorial_builder.test.ts:220
Context: step
Object: title: 'New Step',
                    content: 'New content'
                


### src/tools/documentation/__tests__/tutorial_builder.test.ts:422
Context: options
Object: title: 'Tutorial' 


### src/tools/database/SchemaAnalyzer.ts:285
Context: entities
Object: 


### src/tools/database/SchemaAnalyzer.ts:290
Context: models
Object: 


### src/tools/database/SchemaAnalyzer.ts:295
Context: schemas
Object: 


### src/tools/database/QueryOptimizer.ts:285
Context: details
Object: filter: parsedQuery.conditions.filter((c: string) => c.includes(table)),
        


### src/tools/database/QueryOptimizer.ts:302
Context: details
Object: condition: join.condition,
          method: 'Hash Join',
        


### src/tools/database/QueryOptimizer.ts:321
Context: details
Object: keys: parsedQuery.orderBy,
        


### src/tools/database/MigrationManager.ts:842
Context: validationReport
Object: syntaxValid: true,
        dependenciesResolved: true,
        conflictsDetected: [],
        warnings: [],
        estimatedDowntime: 0,
      


### src/tools/database/MigrationManager.ts:849
Context: executionPlan
Object: phases: [],
        totalDuration: 0,
        requiresDowntime: false,
        parallelizable: false,
      


### src/tools/database/MigrationManager.ts:874
Context: validationReport
Object: syntaxValid: true,
        dependenciesResolved: true,
        conflictsDetected: [],
        warnings: [{
          level: 'warning',
          message: 'Rollback operation - ensure data backup exists',
        


### src/tools/database/MigrationManager.ts:884
Context: executionPlan
Object: phases: [{
          name: 'Rollback',
          order: 1,
          migrations: migrations.map(m => m.id).reverse(),
          canRunInParallel: false,
          estimatedDuration: rollbackPlan.estimatedDuration,
        


### src/tools/database/DataIntegrityChecker.ts:185
Context: statistics
Object: tablesChecked: schema.tables.length,
          totalRows: tableReports.reduce((sum, t) => sum + t.rowCount, 0),
          issuesFound: issues.length,
          criticalIssues: issues.filter(i => i.severity === 'critical').length,
          dataQualityScore: score,
          checkDuration,
        


### src/tools/database/DataIntegrityChecker.ts:194
Context: detailedReport
Object: tableReports,
          relationshipAnalysis,
          dataQualityMetrics,
          anomalyDetection: anomalies,
        


### src/tools/database/DataIntegrityChecker.ts:420
Context: nullPercentages
Object: 


### src/tools/database/DataIntegrityChecker.ts:421
Context: uniquenessScores
Object: 


### src/tools/database/DataIntegrityChecker.ts:422
Context: dataTypeConsistency
Object: 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:38
Context: summary
Object: critical: number;
    high: number;
    medium: number;
    low: number;
    total: number;
  


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:66
Context: summary
Object: error: number;
    warning: number;
    info: number;
    total: number;
  


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:89
Context: summary
Object: error: number;
    warning: number;
    note: number;
    total: number;
  


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:127
Context: metrics
Object: files_scanned: number;
    lines_of_code: number;
    nosec_comments: number;
  


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:147
Context: by_severity
Object: critical: number;
    high: number;
    medium: number;
    low: number;
    info?: number;
  


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:184
Context: rateLimit
Object: maxRequests: 50,
      windowMs: 60000
    


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:245
Context: scanner_results
Object: 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:246
Context: summary
Object: total_vulnerabilities: 0,
          by_severity: { critical: 0, high: 0, medium: 0, low: 0 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:249
Context: by_scanner
Object: 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:269
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
              timestamp: new Date().toISOString(),
              action: params.action
            


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:291
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          scanners_used: params.scanners,
          vulnerabilities_found: result.summary.total_vulnerabilities
        


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:304
Context: error
Object: code: 'SCAN_ERROR',
          message: error instanceof Error ? error.message : 'Failed to scan for vulnerabilities',
          details: { action: params.action 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:309
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:402
Context: summary
Object: critical: 0,
        high: 1,
        medium: 1,
        low: 0,
        total: 2
      


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:440
Context: summary
Object: error: 0,
        warning: 2,
        info: 0,
        total: 2
      


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:465
Context: summary
Object: error: 1,
        warning: 0,
        note: 0,
        total: 1
      


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:509
Context: metrics
Object: files_scanned: 25,
        lines_of_code: 1500,
        nosec_comments: 2
      


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:520
Context: by_severity
Object: critical: 0, high: 0, medium: 0, low: 0, info: 0 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:521
Context: by_scanner
Object: 


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:651
Context: options
Object: allProjects: params.include_dependencies,
          severityThreshold: params.severity_levels?.[0] || 'medium'
        


### src/tools/codeReview/SecurityVulnerabilityScanner.ts:724
Context: tool
Object: driver: {
              name: 'Multi-Scanner Security Analysis',
              version: '1.0.0',
              rules: []
            


### src/tools/codeReview/ReviewAnalyticsReporter.ts:293
Context: rateLimit
Object: maxRequests: 20,
      windowMs: 60000
    


### src/tools/codeReview/ReviewAnalyticsReporter.ts:381
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          report_type: params.report_type,
          format: params.format
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:394
Context: error
Object: code: 'ANALYTICS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to generate analytics',
          details: { action: params.action 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:399
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:435
Context: review_metrics
Object: total_prs: 450,
        total_reviews: 1250,
        average_review_time: 3.5, // hours
        median_review_time: 2.8,
        average_comments: 4.2,
        approval_rate: 0.78,
        rejection_rate: 0.12,
        iteration_count: 1.8
      


### src/tools/codeReview/ReviewAnalyticsReporter.ts:445
Context: team_metrics
Object: active_reviewers: 25,
        active_authors: 30,
        reviews_per_reviewer: this.generateReviewerDistribution(),
        prs_per_author: this.generateAuthorDistribution(),
        collaboration_index: 0.72,
        knowledge_sharing_score: 0.65
      


### src/tools/codeReview/ReviewAnalyticsReporter.ts:453
Context: repository_metrics
Object: repositories: this.generateRepositoryStats(),
        most_active: 'frontend',
        least_active: 'documentation',
        cross_repo_reviews: 120
      


### src/tools/codeReview/ReviewAnalyticsReporter.ts:459
Context: quality_metrics
Object: defect_density: 0.023,
        code_coverage_trend: [75, 76, 78, 80, 82],
        technical_debt_trend: [120, 115, 110, 108, 105],
        security_issues_found: 12,
        performance_issues_found: 8
      


### src/tools/codeReview/ReviewAnalyticsReporter.ts:791
Context: data
Object: value: data.review_metrics.total_prs,
          change: 15,
          trend: 'up'
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:796
Context: position
Object: x: 0, y: 0 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:797
Context: size
Object: width: 3, height: 2 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:803
Context: data
Object: value: `${data.review_metrics.average_review_time


### src/tools/codeReview/ReviewAnalyticsReporter.ts:809
Context: position
Object: x: 3, y: 0 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:810
Context: size
Object: width: 3, height: 2 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:816
Context: data
Object: value: `${(data.review_metrics.approval_rate * 100).toFixed(1)


### src/tools/codeReview/ReviewAnalyticsReporter.ts:820
Context: position
Object: x: 6, y: 0 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:821
Context: size
Object: width: 3, height: 2 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:827
Context: data
Object: value: data.team_metrics.active_reviewers,
          subtitle: `of ${data.team_metrics.active_reviewers + 5


### src/tools/codeReview/ReviewAnalyticsReporter.ts:831
Context: position
Object: x: 9, y: 0 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:832
Context: size
Object: width: 3, height: 2 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:840
Context: position
Object: x: 0, y: 2 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:841
Context: size
Object: width: 6, height: 4 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:849
Context: position
Object: x: 6, y: 2 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:850
Context: size
Object: width: 6, height: 4 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:859
Context: position
Object: x: 0, y: 6 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:860
Context: size
Object: width: 12, height: 4 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:868
Context: default_value
Object: start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), end: new Date() 


### src/tools/codeReview/ReviewAnalyticsReporter.ts:885
Context: layout
Object: type: 'grid',
        columns: 12,
        responsive: true
      


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1309
Context: data
Object: value: this.calculateOverallPerformanceScore(data),
        min: 0,
        max: 100,
        thresholds: {
          good: 80,
          warning: 60,
          critical: 40
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1326
Context: data
Object: labels: ['< 1h', '1-2h', '2-4h', '4-8h', '> 8h'],
        datasets: [{
          label: 'Number of Reviews',
          data: [120, 230, 450, 280, 170]
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1340
Context: data
Object: labels: ['Approved', 'Changes Requested', 'Rejected'],
        datasets: [{
          data: [
            metrics.approval_rate * metrics.total_reviews,
            (1 - metrics.approval_rate - metrics.rejection_rate) * metrics.total_reviews,
            metrics.rejection_rate * metrics.total_reviews
          ]
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1359
Context: data
Object: labels: reviewers.map(([name]) => name),
        datasets: [{
          label: 'Reviews',
          data: reviewers.map(([, count]) => count)
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1366
Context: options
Object: horizontal: true
      


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1377
Context: data
Object: datasets: [{
          label: 'Collaboration Strength',
          data: this.generateCollaborationData(metrics)
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1410
Context: data
Object: labels: repos.map(([name]) => name),
        datasets: [{
          label: 'Pull Requests',
          data: repos.map(([, stats]) => stats.pr_count)
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1426
Context: data
Object: labels: repos.map(([name]) => name),
        datasets: [{
          label: 'Lines Changed',
          data: repos.map(([, stats]) => stats.code_churn)
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1440
Context: data
Object: labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
          {
            label: 'Code Coverage %',
            data: metrics.code_coverage_trend
          


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1461
Context: data
Object: labels: ['Security', 'Performance', 'Code Quality', 'Documentation'],
        datasets: [{
          label: 'Issue Count',
          data: [
            metrics.security_issues_found,
            metrics.performance_issues_found,
            15, // Mock code quality issues
            8   // Mock documentation issues
          ]
        


### src/tools/codeReview/ReviewAnalyticsReporter.ts:1630
Context: data
Object: labels: trend.data_points.map(p => p.timestamp.toLocaleDateString()),
        datasets: [{
          label: trend.metric,
          data: trend.data_points.map(p => p.value)
        


### src/tools/codeReview/PullRequestReviewer.ts:144
Context: rateLimit
Object: maxRequests: 50,
      windowMs: 60000
    


### src/tools/codeReview/PullRequestReviewer.ts:228
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
              timestamp: new Date().toISOString(),
              action: params.action
            


### src/tools/codeReview/PullRequestReviewer.ts:251
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          pr_number: params.pr_number,
          review_scope: params.review_scope
        


### src/tools/codeReview/PullRequestReviewer.ts:264
Context: error
Object: code: 'REVIEW_ERROR',
          message: error instanceof Error ? error.message : 'Failed to review pull request',
          details: { action: params.action 


### src/tools/codeReview/PullRequestReviewer.ts:269
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/PullRequestReviewer.ts:699
Context: details
Object: pr_analysis: result.pr_analysis,
        quality_gates: result.quality_gate_results,
        summary: result.summary,
        top_issues: result.review_comments?.slice(0, 3)
      


### src/tools/codeReview/CodeStyleEnforcer.ts:138
Context: rateLimit
Object: maxRequests: 100,
      windowMs: 60000
    


### src/tools/codeReview/CodeStyleEnforcer.ts:233
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          style_guide: params.style_guide,
          formatters: params.formatters
        


### src/tools/codeReview/CodeStyleEnforcer.ts:246
Context: error
Object: code: 'STYLE_ERROR',
          message: error instanceof Error ? error.message : 'Failed to enforce code style',
          details: { action: params.action 


### src/tools/codeReview/CodeStyleEnforcer.ts:251
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/CodeStyleEnforcer.ts:524
Context: env
Object: browser: true,
        es2021: true,
        node: true
      


### src/tools/codeReview/CodeStyleEnforcer.ts:529
Context: parserOptions
Object: ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json'
      


### src/tools/codeReview/CodeStyleEnforcer.ts:543
Context: config
Object: indent_style: customRules?.indent_style || 'space',
            indent_size: customRules?.indent_size || 2,
            end_of_line: 'lf',
            charset: 'utf-8',
            trim_trailing_whitespace: true,
            insert_final_newline: true,
            max_line_length: customRules?.max_line_length || 80
          


### src/tools/codeReview/CodeStyleEnforcer.ts:555
Context: config
Object: trim_trailing_whitespace: false
          


### src/tools/codeReview/CodeStyleEnforcer.ts:611
Context: hooks
Object: 'pre-commit': config.git_hooks.pre_commit.join(' && ')
        


### src/tools/codeReview/CodeReviewOptimizer.ts:264
Context: rateLimit
Object: maxRequests: 30,
      windowMs: 60000
    


### src/tools/codeReview/CodeReviewOptimizer.ts:350
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          team_size: params.team_size,
          optimization_targets: params.optimization_targets
        


### src/tools/codeReview/CodeReviewOptimizer.ts:363
Context: error
Object: code: 'OPTIMIZATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to optimize code review process',
          details: { action: params.action 


### src/tools/codeReview/CodeReviewOptimizer.ts:368
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/CodeReviewOptimizer.ts:423
Context: process_metrics
Object: average_pr_lifecycle: avgReviewTime + 120, // Review time + other activities
        first_review_time: avgReviewTime * 0.3,
        time_to_approval: avgReviewTime,
        rework_rate: (avgIterations - 1) / avgIterations * 100,
        escape_rate: 2.5 // Mock value - percentage of defects that escape review
      


### src/tools/codeReview/CodeReviewOptimizer.ts:554
Context: config
Object: extends: ['recommended', 'typescript'],
          fix: true
        


### src/tools/codeReview/CodeReviewOptimizer.ts:558
Context: thresholds
Object: errors: 0,
          warnings: 10
        


### src/tools/codeReview/CodeReviewOptimizer.ts:566
Context: config
Object: qualityGate: 'strict',
          coverage: true
        


### src/tools/codeReview/CodeReviewOptimizer.ts:570
Context: thresholds
Object: bugs: 0,
          vulnerabilities: 0,
          code_smells: 20,
          coverage: 80
        


### src/tools/codeReview/CodeReviewOptimizer.ts:580
Context: config
Object: scanners: ['snyk', 'codeql'],
          severity: 'medium'
        


### src/tools/codeReview/CodeReviewOptimizer.ts:584
Context: thresholds
Object: critical: 0,
          high: 0,
          medium: 5
        


### src/tools/codeReview/CodeReviewOptimizer.ts:599
Context: config
Object: 


### src/tools/codeReview/CodeReviewOptimizer.ts:600
Context: thresholds
Object: 


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:45
Context: cyclomatic_complexity
Object: average: number;
    max: number;
    files_over_threshold: number;
    threshold: number;
    distribution: ComplexityDistribution;
  


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:52
Context: cognitive_complexity
Object: average: number;
    max: number;
    files_over_threshold: number;
  


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:57
Context: npath_complexity
Object: average: number;
    max: number;
  


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:61
Context: depth_of_inheritance
Object: average: number;
    max: number;
  


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:75
Context: maintainability_index
Object: average: number;
    min: number;
    files_below_threshold: number;
    threshold: number;
  


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:81
Context: halstead_metrics
Object: program_length: number;
    vocabulary: number;
    volume: number;
    difficulty: number;
    effort: number;
    time_to_implement: number;
    bugs_estimate: number;
  


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:217
Context: rateLimit
Object: maxRequests: 100,
      windowMs: 60000
    


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:293
Context: error
Object: code: 'MISSING_HISTORICAL_DATA',
                message: 'Historical data is required for trend analysis'
              


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:297
Context: metadata
Object: executionTimeMs: 0,
                retries: 0,
                cacheHit: false
              


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:317
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
              timestamp: new Date().toISOString(),
              action: params.action
            


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:330
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          metrics_calculated: params.metrics_types?.length || 0,
          overall_score: result.overall_score
        


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:343
Context: error
Object: code: 'METRICS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to calculate metrics',
          details: { action: params.action 


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:348
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:417
Context: cyclomatic_complexity
Object: average: 3.2,
        max: 12,
        files_over_threshold: 3,
        threshold: 10,
        distribution: {
          simple: 65,
          moderate: 25,
          complex: 8,
          very_complex: 2
        


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:429
Context: cognitive_complexity
Object: average: 4.1,
        max: 15,
        files_over_threshold: 2
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:434
Context: npath_complexity
Object: average: 8.5,
        max: 64
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:438
Context: depth_of_inheritance
Object: average: 2.1,
        max: 4
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:448
Context: maintainability_index
Object: average: 72.3,
        min: 45.2,
        files_below_threshold: 4,
        threshold: 70
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:454
Context: halstead_metrics
Object: program_length: 1247,
        vocabulary: 156,
        volume: 8934.2,
        difficulty: 12.8,
        effort: 114358.4,
        time_to_implement: 6353.2,
        bugs_estimate: 2.98
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:526
Context: largest_file
Object: file: 'src/core/processor.ts',
        lines: 342
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:869
Context: data
Object: labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Coverage',
            data: [75, 76, 78, metrics.coverage?.line_coverage || 78]
          


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:900
Context: data
Object: labels: ['Line', 'Branch', 'Function', 'Statement'],
          values: [
            metrics.coverage.line_coverage,
            metrics.coverage.branch_coverage,
            metrics.coverage.function_coverage,
            metrics.coverage.statement_coverage
          ]
        


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:922
Context: data
Object: labels: ['Complexity', 'Coverage', 'Maintainability', 'Duplication', 'Debt'],
        values: [
          metrics.complexity ? 100 - metrics.complexity.cyclomatic_complexity.average * 10 : 0,
          metrics.coverage?.line_coverage || 0,
          metrics.maintainability?.maintainability_index.average || 0,
          metrics.duplication ? 100 - metrics.duplication.duplication_ratio : 0,
          metrics.debt ? 100 - metrics.debt.technical_debt_ratio : 0
        ]
      


### src/tools/codeReview/CodeQualityMetricsCalculator.ts:947
Context: custom
Object: max_file_size: 300,
        max_function_length: 50,
        max_parameters: 5
      


### src/tools/codeReview/CICDIntegrator.ts:233
Context: rateLimit
Object: maxRequests: 50,
      windowMs: 60000
    


### src/tools/codeReview/CICDIntegrator.ts:318
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          platform: params.platform,
          security_enabled: params.security_scanning
        


### src/tools/codeReview/CICDIntegrator.ts:331
Context: error
Object: code: 'CICD_ERROR',
          message: error instanceof Error ? error.message : 'Failed to process CI/CD request',
          details: { action: params.action 


### src/tools/codeReview/CICDIntegrator.ts:336
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/CICDIntegrator.ts:419
Context: jobs
Object: 


### src/tools/codeReview/CICDIntegrator.ts:428
Context: with
Object: 'node-version': '18' 


### src/tools/codeReview/CICDIntegrator.ts:446
Context: env
Object: SNYK_TOKEN: '${{ secrets.SNYK_TOKEN 


### src/tools/codeReview/CICDIntegrator.ts:447
Context: with
Object: 'scan-type': 'fs' 


### src/tools/codeReview/CICDIntegrator.ts:459
Context: with
Object: 'node-version': '18' 


### src/tools/codeReview/CICDIntegrator.ts:464
Context: with
Object: name: 'build-artifacts',
            path: 'dist/',
            'retention-days': 7
          


### src/tools/codeReview/CICDIntegrator.ts:509
Context: artifacts
Object: reports: {
          coverage_report: {
            coverage_format: 'cobertura',
            path: 'coverage/cobertura-coverage.xml'
          


### src/tools/codeReview/CICDIntegrator.ts:538
Context: artifacts
Object: paths: ['dist/'],
        expire_in: '1 week'
      


### src/tools/codeReview/CICDIntegrator.ts:627
Context: pool
Object: vmImage: 'ubuntu-latest'
      


### src/tools/codeReview/CICDIntegrator.ts:641
Context: inputs
Object: versionSpec: '18.x' 


### src/tools/codeReview/CICDIntegrator.ts:647
Context: inputs
Object: codeCoverageTool: 'Cobertura',
                summaryFileLocation: '$(System.DefaultWorkingDirectory)/coverage/cobertura-coverage.xml'
              


### src/tools/codeReview/CICDIntegrator.ts:663
Context: orbs
Object: node: 'circleci/node@5.0.2'
      


### src/tools/codeReview/CICDIntegrator.ts:666
Context: jobs
Object: 


### src/tools/codeReview/CICDIntegrator.ts:667
Context: workflows
Object: version: 2,
        'build-and-test': {
          jobs: []
        


### src/tools/codeReview/CICDIntegrator.ts:681
Context: run
Object: command: 'npm run lint' 


### src/tools/codeReview/CICDIntegrator.ts:682
Context: run
Object: command: 'npm run test:coverage' 


### src/tools/codeReview/CICDIntegrator.ts:683
Context: store_test_results
Object: path: 'test-results' 


### src/tools/codeReview/CICDIntegrator.ts:684
Context: store_artifacts
Object: path: 'coverage' 


### src/tools/codeReview/CICDIntegrator.ts:697
Context: cache
Object: directories: ['node_modules']
      


### src/tools/codeReview/CICDIntegrator.ts:713
Context: on
Object: branch: target.environment === 'production' ? 'main' : 'develop'
        


### src/tools/codeReview/CICDIntegrator.ts:746
Context: push
Object: branches: ['main'] 


### src/tools/codeReview/CICDIntegrator.ts:762
Context: with
Object: name: 'build-artifacts',
            path: 'dist/'
          


### src/tools/codeReview/CICDIntegrator.ts:779
Context: with
Object: 'aws-access-key-id': '${{ secrets.AWS_ACCESS_KEY_ID 


### src/tools/codeReview/CICDIntegrator.ts:793
Context: with
Object: creds: '${{ secrets.AZURE_CREDENTIALS 


### src/tools/codeReview/CICDIntegrator.ts:799
Context: with
Object: 'app-name': target.config.appName,
            package: './dist'
          


### src/tools/codeReview/CICDIntegrator.ts:809
Context: with
Object: 'kubeconfig': '${{ secrets.KUBE_CONFIG 


### src/tools/codeReview/CICDIntegrator.ts:832
Context: current_state
Object: stages_count: 4,
        jobs_count: 8,
        steps_count: 32,
        parallel_jobs: 3,
        cache_usage: true,
        artifact_management: true,
        security_scanning: params.security_scanning || false,
        quality_gates: true
      


### src/tools/codeReview/CICDIntegrator.ts:860
Context: compliance_status
Object: security_compliance: params.security_scanning || false,
        best_practices_score: 75,
        missing_requirements: [
          'SAST scanning',
          'Container scanning',
          'License compliance check'
        ]
      


### src/tools/codeReview/CICDIntegrator.ts:966
Context: resource_usage
Object: cpu_minutes: 1500,
        memory_gb: 50,
        storage_gb: 10,
        network_gb: 5
      


### src/tools/codeReview/CICDIntegrator.ts:997
Context: resource_usage
Object: cpu_minutes: baseMetrics.resource_usage.cpu_minutes * (1 - timeReduction),
        memory_gb: baseMetrics.resource_usage.memory_gb,
        storage_gb: baseMetrics.resource_usage.storage_gb,
        network_gb: baseMetrics.resource_usage.network_gb
      


### src/tools/codeReview/CICDIntegrator.ts:1035
Context: triggers
Object: branches: ['main', 'develop'],
        pull_requests: true
      


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:129
Context: rateLimit
Object: maxRequests: 100,
      windowMs: 60000
    


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:210
Context: metadata
Object: executionTimeMs: 0,
              retries: 0,
              cacheHit: false,
              timestamp: new Date().toISOString(),
              action: _params.action
            


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:231
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false,
          timestamp: new Date().toISOString(),
          action: params.action,
          source_path: params.source_path,
          language: params.language
        


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:244
Context: error
Object: code: 'ANALYSIS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to analyze code',
          details: { action: params.action 


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:249
Context: metadata
Object: executionTimeMs: 0,
          retries: 0,
          cacheHit: false
        


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:368
Context: location
Object: file: 'src/database.ts',
          line: 123
        


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:381
Context: location
Object: file: 'src/processor.ts',
          line: 45
        


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:392
Context: metrics
Object: complexity_score: 3.2,
        performance_score: 85,
        security_score: 92
      


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:411
Context: parserOptions
Object: ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json'
      


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:434
Context: compilerOptions
Object: target: 'ES2022',
        module: 'commonjs',
        lib: ['ES2022'],
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true
      


### src/tools/codeReview/AutomatedCodeAnalyzer.ts:591
Context: compilerOptions
Object: target: 'ES2022',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true
        


### src/tools/base/ToolManager.ts:68
Context: toolExecutionCounts
Object: 


### src/tools/base/ToolManager.ts:69
Context: toolSuccessRates
Object: 


### src/tools/base/ToolManager.ts:380
Context: toolExecutionCounts
Object: 


### src/tools/base/ToolManager.ts:381
Context: toolSuccessRates
Object: 


### src/tools/base/BaseTool.ts:55
Context: metadata
Object: executionTimeMs: Date.now() - startTime,
            retries: 0,
            cacheHit: false
          


### src/tools/base/BaseTool.ts:83
Context: metadata
Object: ...result.metadata,
          executionTimeMs: Date.now() - startTime,
          tool: this.metadata.name,
          version: this.metadata.version,
        


### src/tools/base/BaseTool.ts:106
Context: metadata
Object: executionTimeMs: executionTime,
          retries: 0,
          cacheHit: false,
          tool: this.metadata.name,
          version: this.metadata.version,
          errorDetails: error instanceof ToolError ? error.context : undefined,
        


### src/tools/architecture/TechnologyStackAdvisor.ts:6
Context: requirements
Object: scalability?: 'low' | 'medium' | 'high' | 'extreme'
    performance?: 'standard' | 'high' | 'real-time'
    teamSize?: 'solo' | 'small' | 'medium' | 'large'
    budget?: 'low' | 'medium' | 'high' | 'enterprise'
    timeline?: 'prototype' | 'mvp' | 'production' | 'long-term'
    existingStack?: string[]
    constraints?: string[]
    preferences?: string[]
  


### src/tools/architecture/TechnologyStackAdvisor.ts:42
Context: stack
Object: frontend?: TechnologyRecommendation
    backend?: TechnologyRecommendation
    database?: TechnologyRecommendation
    caching?: TechnologyRecommendation
    messaging?: TechnologyRecommendation
    monitoring?: TechnologyRecommendation
    deployment?: TechnologyRecommendation
    testing?: TechnologyRecommendation
    security?: TechnologyRecommendation
    additional?: TechnologyRecommendation[]
  


### src/tools/architecture/TechnologyStackAdvisor.ts:54
Context: architecture
Object: pattern: string
    style: string
    deployment: string
  


### src/tools/architecture/TechnologyStackAdvisor.ts:59
Context: estimatedCosts
Object: development: string
    infrastructure: string
    maintenance: string
  


### src/tools/architecture/TechnologyStackAdvisor.ts:121
Context: metadata
Object: projectType,
          requirementsAnalyzed: Object.keys(requirements).length,
          aiEnhanced: useAI
        


### src/tools/architecture/TechnologyStackAdvisor.ts:138
Context: stack
Object: 


### src/tools/architecture/TechnologyStackAdvisor.ts:139
Context: architecture
Object: pattern: '',
        style: '',
        deployment: ''
      


### src/tools/architecture/TechnologyStackAdvisor.ts:144
Context: estimatedCosts
Object: development: '',
        infrastructure: '',
        maintenance: ''
      


### src/tools/architecture/TechnologyStackAdvisor.ts:245
Context: primary
Object: name: 'Next.js',
          version: '15.x',
          license: 'MIT',
          maturity: 'mature',
          communitySize: 'large',
          learningCurve: 'moderate',
          pros: ['SSR/SSG support', 'Excellent performance', 'Great DX', 'Full-stack capabilities'],
          cons: ['Opinionated structure', 'Vercel lock-in risk'],
          useCases: ['E-commerce', 'Content sites', 'Web apps'],
          compatibility: ['React', 'TypeScript', 'Tailwind CSS']
        


### src/tools/architecture/TechnologyStackAdvisor.ts:353
Context: primary
Object: name: 'React Native',
          version: '0.74.x',
          license: 'MIT',
          maturity: 'mature',
          communitySize: 'large',
          learningCurve: 'moderate',
          pros: ['Cross-platform', 'Hot reload', 'Native performance', 'Large ecosystem'],
          cons: ['Platform-specific issues', 'Upgrade challenges'],
          useCases: ['Social apps', 'E-commerce', 'Content apps'],
          compatibility: ['Expo', 'Native modules']
        


### src/tools/architecture/TechnologyStackAdvisor.ts:1118
Context: stack
Object: ...base.stack, ...enhancements.stack 


### src/tools/architecture/SystemDesignAnalyzer.ts:64
Context: metrics
Object: totalModules: number
    averageDependencies: number
    averageDependents: number
    instabilityIndex: number
    abstractionIndex: number
  


### src/tools/architecture/SystemDesignAnalyzer.ts:80
Context: containerization
Object: dockerfiles: string[]
    kubernetes: string[]
    compose: string[]
  


### src/tools/architecture/SystemDesignAnalyzer.ts:85
Context: cloudNative
Object: serverless: string[]
    containerOrchestration: string[]
    apiGateway: boolean
    serviceDiscovery: boolean
  


### src/tools/architecture/SystemDesignAnalyzer.ts:91
Context: modernFrameworks
Object: nextjs: boolean
    remix: boolean
    astro: boolean
    vite: boolean
    turbo: boolean
  


### src/tools/architecture/SystemDesignAnalyzer.ts:98
Context: testingPatterns
Object: e2e: string[]
    integration: string[]
    unit: string[]
    coverage: number
  


### src/tools/architecture/SystemDesignAnalyzer.ts:112
Context: architecture
Object: style: string
    layers: string[]
    components: number
    coupling: 'low' | 'medium' | 'high'
    cohesion: 'low' | 'medium' | 'high'
    maintainabilityIndex: number
    technicalDebt: {
      level: 'low' | 'medium' | 'high' | 'critical'
      issues: string[]
      estimatedHours: number
    


### src/tools/architecture/SystemDesignAnalyzer.ts:135
Context: analysisMetadata
Object: toolsUsed: string[]
    analysisDepth: string
    confidence: number
    timestamp: string
  


### src/tools/architecture/SystemDesignAnalyzer.ts:191
Context: analysisMetadata
Object: toolsUsed: ['TypeScript Compiler API', 'File System Analysis', 'Pattern Recognition'],
          analysisDepth: depth.toString(),
          confidence: this.calculateConfidence(patterns, dependencies, modernPatterns),
          timestamp: new Date().toISOString()
        


### src/tools/architecture/SystemDesignAnalyzer.ts:202
Context: metadata
Object: filesAnalyzed: files.length,
          executionTime: Date.now() - Date.now(),
          depth
        


### src/tools/architecture/SystemDesignAnalyzer.ts:721
Context: metrics
Object: totalModules,
        averageDependencies,
        averageDependents,
        instabilityIndex,
        abstractionIndex
      


### src/tools/architecture/SystemDesignAnalyzer.ts:808
Context: containerization
Object: dockerfiles,
        kubernetes,
        compose
      


### src/tools/architecture/SystemDesignAnalyzer.ts:813
Context: cloudNative
Object: serverless,
        containerOrchestration,
        apiGateway,
        serviceDiscovery
      


### src/tools/architecture/SystemDesignAnalyzer.ts:820
Context: testingPatterns
Object: e2e,
        integration,
        unit,
        coverage: Math.min(coverage, 100)
      


### src/tools/architecture/SystemDesignAnalyzer.ts:900
Context: technicalDebt
Object: level: technicalDebtLevel,
        issues: technicalDebtIssues,
        estimatedHours
      


### src/tools/architecture/SecurityArchitectureReviewer.ts:65
Context: patterns
Object: secure: SecurityPattern[]
    insecure: SecurityPattern[]
  


### src/tools/architecture/SecurityArchitectureReviewer.ts:69
Context: architecture
Object: authenticationMethods: string[]
    authorizationModel: string
    dataProtection: string[]
    networkSecurity: string[]
    secrets: {
      management: string
      rotation: boolean
      encryption: boolean
    


### src/tools/architecture/SecurityArchitectureReviewer.ts:86
Context: recommendations
Object: immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  


### src/tools/architecture/SecurityArchitectureReviewer.ts:186
Context: metadata
Object: filesScanned: files.length,
          scanDepth,
          frameworksChecked: complianceFrameworks
        


### src/tools/architecture/SecurityArchitectureReviewer.ts:733
Context: secrets
Object: management: 'none',
        rotation: false,
        encryption: false
      


### src/tools/architecture/SecurityArchitectureReviewer.ts:834
Context: patterns
Object: secure: SecurityPattern[]; insecure: SecurityPattern[] 


### src/tools/architecture/SecurityArchitectureReviewer.ts:1018
Context: patterns
Object: secure: SecurityPattern[]; insecure: SecurityPattern[] 


### src/tools/architecture/SecurityArchitectureReviewer.ts:1082
Context: patterns
Object: secure: SecurityPattern[]; insecure: SecurityPattern[] 


### src/tools/architecture/ScalabilityAnalyzer.ts:49
Context: patterns
Object: good: ScalabilityPattern[]
    bad: ScalabilityPattern[]
  


### src/tools/architecture/ScalabilityAnalyzer.ts:54
Context: architecture
Object: currentState: ArchitectureState
    targetState: ArchitectureState
    migrationPath: string[]
  


### src/tools/architecture/ScalabilityAnalyzer.ts:59
Context: costProjection
Object: current: number
    projected: number
    optimized: number
  


### src/tools/architecture/ScalabilityAnalyzer.ts:190
Context: metadata
Object: filesAnalyzed: files.length,
          analysisType,
          expectedLoad
        


### src/tools/architecture/ScalabilityAnalyzer.ts:773
Context: patterns
Object: good: ScalabilityPattern[]; bad: ScalabilityPattern[] 


### src/tools/architecture/ScalabilityAnalyzer.ts:1068
Context: patterns
Object: good: ScalabilityPattern[]; bad: ScalabilityPattern[] 


### src/tools/architecture/ScalabilityAnalyzer.ts:1070
Context: architecture
Object: currentState: ArchitectureState 


### src/tools/architecture/PerformanceBottleneckDetector.ts:32
Context: impact
Object: responseTime?: number // ms
    throughput?: number // requests/sec
    resourceUsage?: number // percentage
    userExperience?: string
  


### src/tools/architecture/PerformanceBottleneckDetector.ts:38
Context: metrics
Object: current: number
    expected: number
    unit: string
  


### src/tools/architecture/PerformanceBottleneckDetector.ts:59
Context: halsteadMetrics
Object: difficulty: number
    volume: number
    effort: number
  


### src/tools/architecture/PerformanceBottleneckDetector.ts:70
Context: codeAnalysis
Object: hotspots: Array<{
      file: string
      function: string
      executionTime: number
      callCount: number
      complexity: CodeComplexity
    


### src/tools/architecture/PerformanceBottleneckDetector.ts:84
Context: optimization
Object: opportunities: Array<{
      type: string
      description: string
      estimatedGain: string
      effort: 'low' | 'medium' | 'high'
    


### src/tools/architecture/PerformanceBottleneckDetector.ts:91
Context: cacheAnalysis
Object: hitRate: number
      missRate: number
      recommendations: string[]
    


### src/tools/architecture/PerformanceBottleneckDetector.ts:97
Context: summary
Object: overallScore: number
    criticalIssues: number
    estimatedSpeedup: string
    topRecommendations: string[]
  


### src/tools/architecture/PerformanceBottleneckDetector.ts:176
Context: metadata
Object: filesAnalyzed: files.length,
          profileDuration,
          loadTestEnabled: loadTest.enabled
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:330
Context: impact
Object: responseTime: 1000,
          resourceUsage: 80,
          userExperience: 'Significant UI freezing possible'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:335
Context: metrics
Object: current: 3,
          expected: 2,
          unit: 'nesting levels'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:355
Context: impact
Object: responseTime: 500,
          resourceUsage: 60,
          userExperience: 'Slow response for complex inputs'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:360
Context: metrics
Object: current: 0,
          expected: 1,
          unit: 'memoization implementations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:380
Context: impact
Object: responseTime: 100,
          resourceUsage: 20,
          userExperience: 'Minor performance degradation'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:385
Context: metrics
Object: current: matches.length,
          expected: 5,
          unit: 'concatenations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:403
Context: impact
Object: responseTime: 300,
          resourceUsage: 40,
          userExperience: 'Noticeable delays with large datasets'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:408
Context: metrics
Object: current: 1,
          expected: 0,
          unit: 'JSON operations in loops'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:435
Context: impact
Object: resourceUsage: 30,
          userExperience: 'Memory usage grows over time'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:439
Context: metrics
Object: current: addListeners - removeListeners,
          expected: 0,
          unit: 'unremoved listeners'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:458
Context: impact
Object: resourceUsage: 50,
          userExperience: 'High memory consumption'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:462
Context: metrics
Object: current: 10000,
          expected: 1000,
          unit: 'array elements'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:481
Context: impact
Object: resourceUsage: 10,
          userExperience: 'Slight memory overhead'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:485
Context: metrics
Object: current: 1,
          expected: 0,
          unit: 'potential closure leaks'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:505
Context: impact
Object: resourceUsage: 20,
          userExperience: 'Memory not released, potential conflicts'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:509
Context: metrics
Object: current: globalMatches.length,
          expected: 2,
          unit: 'global variables'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:535
Context: impact
Object: responseTime: 500,
          throughput: 10,
          userExperience: 'Blocks entire application'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:540
Context: metrics
Object: current: 1,
          expected: 0,
          unit: 'sync operations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:559
Context: impact
Object: responseTime: 200,
          throughput: 50,
          userExperience: 'Unnecessary waiting'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:564
Context: metrics
Object: current: 2,
          expected: 1,
          unit: 'sequential operations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:582
Context: impact
Object: resourceUsage: 70,
          userExperience: 'Memory spikes and slow processing'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:586
Context: metrics
Object: current: 0,
          expected: 1,
          unit: 'stream implementations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:611
Context: impact
Object: responseTime: 1000,
          resourceUsage: 60,
          userExperience: 'Exponential slowdown with data growth'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:616
Context: metrics
Object: current: 2,
          expected: 1,
          unit: 'algorithm complexity (Big O)'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:635
Context: impact
Object: responseTime: 200,
          resourceUsage: 30,
          userExperience: 'Unnecessary iterations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:640
Context: metrics
Object: current: 3,
          expected: 1,
          unit: 'array iterations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:658
Context: impact
Object: responseTime: 300,
          resourceUsage: 40,
          userExperience: 'Redundant sorting'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:663
Context: metrics
Object: current: 2,
          expected: 1,
          unit: 'sort operations'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:681
Context: impact
Object: responseTime: 150,
          resourceUsage: 25,
          userExperience: 'Repeated regex compilation'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:686
Context: metrics
Object: current: 1,
          expected: 0,
          unit: 'regex in loops'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:711
Context: impact
Object: responseTime: 2000,
          throughput: 5,
          userExperience: 'Extremely slow page loads'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:716
Context: metrics
Object: current: 100,
          expected: 1,
          unit: 'queries for related data'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:736
Context: impact
Object: responseTime: 500,
          throughput: 20,
          userExperience: 'Slow query execution'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:741
Context: metrics
Object: current: 0,
          expected: 1,
          unit: 'index usage'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:759
Context: impact
Object: responseTime: 100,
          throughput: 50,
          userExperience: 'Connection overhead'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:764
Context: metrics
Object: current: 0,
          expected: 1,
          unit: 'connection pools'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:782
Context: impact
Object: responseTime: 1000,
          resourceUsage: 60,
          userExperience: 'Slow response and high memory usage'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:787
Context: metrics
Object: current: 0,
          expected: 100,
          unit: 'row limit'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:814
Context: impact
Object: responseTime: 50,
          userExperience: 'Unnecessary re-renders'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:818
Context: metrics
Object: current: 0,
          expected: 1,
          unit: 'memoization techniques'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:836
Context: impact
Object: responseTime: 20,
          userExperience: 'Triggers unnecessary re-renders'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:840
Context: metrics
Object: current: 1,
          expected: 0,
          unit: 'inline functions'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:862
Context: impact
Object: responseTime: 500,
            resourceUsage: 40,
            userExperience: 'Slow scrolling and high memory usage'
          


### src/tools/architecture/PerformanceBottleneckDetector.ts:867
Context: metrics
Object: current: 100,
            expected: 20,
            unit: 'visible items'
          


### src/tools/architecture/PerformanceBottleneckDetector.ts:886
Context: impact
Object: responseTime: 100,
          userExperience: 'Sluggish UI updates'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:890
Context: metrics
Object: current: 1,
          expected: 0,
          unit: 'computations in render'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:1013
Context: halsteadMetrics
Object: difficulty,
        volume,
        effort
      


### src/tools/architecture/PerformanceBottleneckDetector.ts:1092
Context: impact
Object: responseTime: results.avgResponseTime,
          throughput: results.throughput,
          userExperience: 'Poor user experience under load'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:1097
Context: metrics
Object: current: results.avgResponseTime,
          expected: 500,
          unit: 'ms'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:1114
Context: impact
Object: throughput: results.throughput,
          userExperience: 'Failed requests under load'
        


### src/tools/architecture/PerformanceBottleneckDetector.ts:1118
Context: metrics
Object: current: results.errorRate * 100,
          expected: 1,
          unit: '% error rate'
        


### src/tools/architecture/ComponentRelationshipMapper.ts:154
Context: metadata
Object: filesAnalyzed: files.length,
          analysisDepth,
          componentsFound: this.componentMap.size
        


### src/tools/architecture/ComponentRelationshipMapper.ts:202
Context: metrics
Object: linesOfCode: content.split('\n').length,
          complexity: 0,
          coupling: 0,
          cohesion: 0,
          instability: 0,
          abstractness: 0
        


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:47
Context: metadata
Object: author: string
    reviewers: string[]
    tags: string[]
    status: 'draft' | 'review' | 'approved' | 'published'
  


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:122
Context: data
Object: documentation,
          outputPath,
          format: outputFormat,
          stats: {
            sections: documentation.sections.length,
            diagrams: this.countDiagrams(documentation.sections),
            codeExamples: this.countCodeExamples(documentation.sections),
            totalWords: this.countWords(documentation)
          


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:133
Context: metadata
Object: generatedAt: new Date().toISOString(),
          documentationType,
          templateStyle
        


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:211
Context: metadata
Object: author: 'Architecture Documentation Generator',
        reviewers: [],
        tags: this.generateTags(analysis),
        status: 'draft'
      


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:217
Context: appendices
Object: glossary: this.generateGlossary(analysis),
        references: this.generateReferences(),
        changelog: [{
          version: '1.0.0',
          date: new Date().toISOString(),
          changes: ['Initial documentation generated']
        


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:519
Context: byType
Object: 


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:545
Context: production
Object: 


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:546
Context: development
Object: 


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:547
Context: peer
Object: 


### src/tools/architecture/ArchitectureDocumentationGenerator.ts:775
Context: meta
Object: timestamp: new Date().toISOString()
      


### src/tools/architecture/ArchitectureDiagramGenerator.ts:105
Context: data
Object: diagram: output,
          format: outputFormat,
          type: diagramType,
          stats: {
            nodes: diagramData.nodes.length,
            edges: diagramData.edges.length,
            clusters: diagramData.clusters?.length || 0
          


### src/tools/architecture/ArchitectureDiagramGenerator.ts:115
Context: metadata
Object: filesAnalyzed: files.length,
          outputFormat,
          diagramType
        


### src/tools/architecture/ArchitectureDiagramGenerator.ts:161
Context: metadata
Object: size: content.length,
          exports: await this.extractExports(content),
          imports: await this.extractImports(content)
        


### src/tools/architecture/ArchitectureDiagramGenerator.ts:212
Context: metadata
Object: framework: componentInfo.framework,
            props: componentInfo.props,
            state: componentInfo.state
          


### src/tools/architecture/ArchitectureDiagramGenerator.ts:282
Context: metadata
Object: methods,
              properties
            


### src/tools/architecture/ArchitectureDiagramGenerator.ts:372
Context: metadata
Object: ports: service.ports,
            image: service.image
          


### src/tools/architecture/ArchitectureDiagramGenerator.ts:860
Context: metadata
Object: kind: kindMatch[1] 


### src/tests/integration/master-orchestrator-python-expert.test.ts:48
Context: context
Object: code: pythonCode,
          language: 'python'
        


### src/tests/integration/master-orchestrator-python-expert.test.ts:91
Context: context
Object: code: pythonCode,
          language: 'python'
        


### src/tests/integration/master-orchestrator-python-expert.test.ts:118
Context: context
Object: code: pythonCode,
          language: 'python',
          test_framework: 'pytest'
        


### src/tests/integration/master-orchestrator-python-expert.test.ts:149
Context: context
Object: code: pythonCode,
          language: 'python',
          error: 'IndexError: list index out of range'
        


### src/services/OllamaService.ts:128
Context: headers
Object: 'User-Agent': 'AI-Assistant-MasterOrchestrator/1.0',
        'X-Request-Source': 'TypeScript-OllamaService'
      


### src/services/OllamaService.ts:181
Context: request
Object: content: string; context?: any 


### src/services/OllamaService.ts:215
Context: format
Object: "primaryGoal": "Main objective of the request",
  "subGoals": ["List of sub-objectives"],
  "constraints": ["Any limitations or requirements"],
  "requiredExperts": ["List of expert agent IDs needed"],
  "complexity": "low|medium|high",
  "urgency": "low|medium|high",
  "confidence": 0.95



### src/services/OllamaService.ts:255
Context: format
Object: "tasks": [
    {
      "id": "task-1",
      "description": "Specific task description",
      "assignedAgent": "expert-agent-id", 
      "priority": 8,
      "dependencies": ["task-id-dependencies"],
      "acceptanceCriteria": ["List of criteria"],
      "estimatedDuration": 15
    


### src/services/OllamaService.ts:299
Context: format
Object: "accuracy": 85,
  "completeness": 90,
  "consistency": 88,
  "overall": 87,
  "reasoning": "Detailed explanation of evaluation",
  "recommendations": ["List of improvement suggestions"]



### src/services/OllamaService.ts:345
Context: options
Object: temperature: options.temperature || 0.7,
            num_predict: options.maxTokens || 2048,
            stop: options.tools ? ['</function_call>'] : undefined,
            ...this.getModelSpecificOptions(model)
          


### src/services/OllamaService.ts:368
Context: metadata
Object: totalDuration: result.total_duration,
          loadDuration: result.load_duration,
          promptEvalCount: result.prompt_eval_count,
          evalCount: result.eval_count,
          evalDuration: result.eval_duration
        


### src/services/OllamaService.ts:632
Context: modelUsageStats
Object: 


### src/services/OllamaService.ts:633
Context: _errorStats
Object: 


### src/services/n8n/N8NIntegration.ts:235
Context: metadata
Object: name: mapping.toolName,
        description: `N8N workflow tool: ${mapping.toolName


### src/services/n8n/N8NClient.ts:83
Context: headers
Object: 'Content-Type': 'application/json',
      


### src/services/n8n/__tests__/N8NIntegration.test.ts:96
Context: metadata
Object: 


### src/services/n8n/__tests__/N8NIntegration.test.ts:117
Context: data
Object: result: 'success' 


### src/services/n8n/__tests__/N8NIntegration.test.ts:126
Context: data
Object: result: 'success' 


### src/services/n8n/__tests__/N8NIntegration.test.ts:195
Context: data
Object: webhook: 'data' 


### src/services/n8n/__tests__/N8NIntegration.test.ts:208
Context: data
Object: webhook: 'data' 


### src/services/n8n/__tests__/N8NIntegration.test.ts:253
Context: data
Object: result: 'tool success' 


### src/services/n8n/__tests__/N8NIntegration.test.ts:262
Context: metadata
Object: 


### src/services/n8n/__tests__/N8NIntegration.test.ts:280
Context: data
Object: status: 'completed' 


### src/services/n8n/__tests__/N8NIntegration.test.ts:289
Context: data
Object: status: 'completed' 


### src/services/__tests__/OllamaService.test.ts:51
Context: message
Object: content: '{"primaryGoal": "test", "confidence": 0.9


### src/services/__tests__/OllamaService.test.ts:95
Context: headers
Object: 'User-Agent': 'AI-Assistant-MasterOrchestrator/1.0',
          'X-Request-Source': 'TypeScript-OllamaService'
        


### src/services/__tests__/OllamaService.test.ts:157
Context: message
Object: content: JSON.stringify({
            primaryGoal: 'Create a REST API',
            subGoals: ['Design endpoints', 'Implement authentication'],
            constraints: ['Use TypeScript', 'Follow REST principles'],
            requiredExperts: ['api-integration-expert', 'security-specialist'],
            complexity: 'medium',
            urgency: 'high',
            confidence: 0.92
          


### src/services/__tests__/OllamaService.test.ts:176
Context: context
Object: sessionId: 'test-session' 


### src/services/__tests__/OllamaService.test.ts:189
Context: message
Object: content: 'This is not valid JSON' 


### src/services/__tests__/OllamaService.test.ts:226
Context: message
Object: content: JSON.stringify({
            tasks: [
              {
                id: 'task-1',
                description: 'Design API endpoints',
                assignedAgent: 'api-integration-expert',
                priority: 8,
                dependencies: [],
                acceptanceCriteria: ['REST principles followed', 'OpenAPI spec created'],
                estimatedDuration: 30
              


### src/services/__tests__/OllamaService.test.ts:294
Context: message
Object: content: 'Invalid task response' 


### src/services/__tests__/OllamaService.test.ts:326
Context: message
Object: content: JSON.stringify({
              accuracy: 85,
              completeness: 90,
              consistency: 88,
              overall: 87,
              reasoning: 'Good implementation with minor improvements needed',
              recommendations: ['Add error handling', 'Improve documentation']
            


### src/services/__tests__/OllamaService.test.ts:338
Context: message
Object: content: JSON.stringify({
              accuracy: 92,
              completeness: 85,
              consistency: 90,
              overall: 89,
              reasoning: 'Excellent accuracy, could be more complete',
              recommendations: ['Add more test cases', 'Include edge cases']
            


### src/services/__tests__/OllamaService.test.ts:358
Context: output
Object: code: 'def hello(): return "world"' 


### src/services/__tests__/OllamaService.test.ts:366
Context: output
Object: vulnerabilities: [] 


### src/services/__tests__/OllamaService.test.ts:386
Context: message
Object: content: 'Invalid evaluation JSON' 


### src/services/__tests__/OllamaService.test.ts:391
Context: output
Object: 


### src/services/__tests__/OllamaService.test.ts:471
Context: message
Object: content: 'Success after retries' 


### src/services/__tests__/OllamaService.test.ts:522
Context: message
Object: content: 'Test response' 


### src/services/__tests__/OllamaService.test.ts:545
Context: message
Object: content: 'First response' 


### src/services/__tests__/OllamaService.test.ts:549
Context: message
Object: content: 'Second response' 


### src/server/trpc.ts:21
Context: data
Object: ...shape.data,
        zodError:
          error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      


### src/server/trpc.ts:82
Context: ctx
Object: ...ctx,
        user: {
          id: 'mock-user-id',
          email: 'user@example.com',
          name: 'Mock User',
        


### src/server/trpc.ts:101
Context: ctx
Object: ...ctx,
      user: ctx.user,
      session: ctx.session,
    


### src/server/trpc.ts:130
Context: ctx
Object: ...ctx,
        agentId,
      


### src/server/trpc.ts:214
Context: ctx
Object: ...ctx,
        isAdmin: true,
      


### src/server/context.ts:48
Context: user
Object: id: 'api-user',
            email: 'api@ai-assistant.com',
            name: 'API User',
            role: 'user',
          


### src/server/context.ts:95
Context: req
Object: 


### src/server/context.ts:96
Context: res
Object: 


### src/server/routers/tools.ts:140
Context: metadata
Object: tool: toolName,
            category,
            executedAt: new Date().toISOString(),
            executionTime: result.executionTime,
            userId: user.id,
          


### src/server/routers/tools.ts:236
Context: pagination
Object: limit: input.limit,
          offset: input.offset,
          hasMore: false,
        


### src/server/routers/orchestration.ts:69
Context: metadata
Object: ...(context || {


### src/server/routers/orchestration.ts:80
Context: metadata
Object: processedAt: new Date().toISOString(),
            orchestratorVersion: orchestrator.config?.version || '1.0.0',
            userId: user.id,
            conversationId: conversationId || `conv-${Date.now()


### src/server/routers/orchestration.ts:213
Context: metadata
Object: executedAt: new Date().toISOString(),
            strategy,
            agentsUsed: agents,
          


### src/server/routers/health.ts:41
Context: memory
Object: total: os.totalmem(),
          free: os.freemem(),
          used: os.totalmem() - os.freemem(),
          usage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100,
        


### src/server/routers/health.ts:47
Context: cpu
Object: model: os.cpus()[0]?.model || 'unknown',
          count: os.cpus().length,
          usage: os.loadavg()[0], // 1-minute load average
        


### src/server/routers/health.ts:57
Context: agents
Object: total: registeredAgents.length,
          registered: registeredAgents,
          statuses: agentStatuses,
        


### src/server/routers/health.ts:63
Context: services
Object: ollama: {
            status: 'operational', // TODO: Check actual Ollama status
            model: process.env.OLLAMA_MODEL || 'mistral:latest',
          


### src/server/routers/health.ts:68
Context: database
Object: status: 'operational', // TODO: Check actual DB status
          


### src/server/routers/auth.ts:62
Context: session
Object: user: mockUser,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        


### src/server/routers/agents.ts:81
Context: config
Object: model: agent.config?.model || 'default',
          temperature: agent.config?.temperature || 0.7,
          maxTokens: agent.config?.maxTokens || 2000,
        


### src/pages/api/trpc/[trpc].ts:36
Context: batching
Object: enabled: true,
  


### src/orchestration/router.ts:159
Context: primaryAgent
Object: agentId: 'master-orchestrator',
          confidence: 0.5,
          reason: 'Routing failed, using master orchestrator as fallback',
        


### src/orchestration/router.ts:338
Context: primary
Object: agentId: primaryAgentId,
        confidence: 0.8,
        reason: `Selected based on ${intent


### src/orchestration/response-aggregator.ts:14
Context: metadata
Object: aggregationStrategy: string
    totalAgents: number
    successfulAgents: number
    processingTime: number
  


### src/orchestration/response-aggregator.ts:106
Context: metadata
Object: aggregationStrategy: opts.strategy,
        totalAgents: responses.length,
        successfulAgents: successfulResponses.length,
        processingTime: Date.now() - startTime
      


### src/orchestration/response-aggregator.ts:123
Context: metadata
Object: aggregationStrategy: opts.strategy,
        totalAgents: responses.length,
        successfulAgents: successfulResponses.length,
        processingTime: Date.now() - startTime
      


### src/orchestration/coordinator.ts:422
Context: metadata
Object: ...request.context,
          previousAgent: previousResponse?.agentId,
        


### src/orchestration/conversation-state.ts:124
Context: context
Object: topics: new Set(),
        entities: new Map(),
        preferences: {
          responseStyle: 'detailed',
          expertiseLevel: 'intermediate',
          preferredAgents: [],
          avoidAgents: []
        


### src/orchestration/conversation-state.ts:133
Context: environment
Object: platform: process.platform,
          locale: 'en-US',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          integrations: []
        


### src/orchestration/conversation-state.ts:141
Context: metadata
Object: version: '1.0.0',
        storageType: 'memory',
        compressionEnabled: false,
        encryptionEnabled: false
      


### src/orchestration/conversation-state.ts:162
Context: context
Object: ...state.context,
        topics: Array.from(state.context.topics),
        entities: Array.from(state.context.entities.entries())
      


### src/orchestration/__tests__/response-aggregator.test.ts:20
Context: metadata
Object: processingTime: 100,
          toolsUsed: ['code_analyzer']
        


### src/orchestration/__tests__/response-aggregator.test.ts:32
Context: metadata
Object: processingTime: 150,
          toolsUsed: ['system_designer']
        


### src/orchestration/__tests__/response-aggregator.test.ts:44
Context: metadata
Object: processingTime: 120,
          toolsUsed: ['vulnerability_scanner']
        


### src/orchestration/__tests__/response-aggregator.test.ts:82
Context: metadata
Object: 


### src/orchestration/__tests__/response-aggregator.test.ts:91
Context: metadata
Object: 


### src/orchestration/__tests__/response-aggregator.test.ts:208
Context: metadata
Object: aggregationStrategy: 'merge',
          totalAgents: 3,
          successfulAgents: 3,
          processingTime: 50
        


### src/orchestration/__tests__/response-aggregator.test.ts:233
Context: metadata
Object: aggregationStrategy: 'merge',
          totalAgents: 3,
          successfulAgents: 3,
          processingTime: 50
        


### src/orchestration/__tests__/response-aggregator.test.ts:257
Context: metadata
Object: aggregationStrategy: 'merge',
          totalAgents: 3,
          successfulAgents: 3,
          processingTime: 50
        


### src/orchestration/__tests__/response-aggregator.test.ts:284
Context: metadata
Object: aggregationStrategy: 'merge',
          totalAgents: 3,
          successfulAgents: 3,
          processingTime: 50
        


### src/orchestration/__tests__/response-aggregator.test.ts:358
Context: metadata
Object: processingTime: Math.random() * 200
          


### src/orchestration/__tests__/conversation-state.test.ts:93
Context: data
Object: query: 'How do I implement authentication in React with TypeScript?',
          analysis: { intent: 'implementation_guide' 


### src/orchestration/__tests__/conversation-state.test.ts:96
Context: routing
Object: primaryAgent: 'react-expert' 


### src/orchestration/__tests__/conversation-state.test.ts:122
Context: data
Object: agentId: 'python-expert',
          confidence: 0.9,
          processingTime: 200
        


### src/orchestration/__tests__/conversation-state.test.ts:148
Context: data
Object: responseStyle: 'concise',
          expertiseLevel: 'expert',
          preferredAgents: ['python-expert', 'architecture-expert']
        


### src/orchestration/__tests__/conversation-state.test.ts:171
Context: data
Object: integrations: ['github', 'jira', 'slack']
        


### src/orchestration/__tests__/conversation-state.test.ts:193
Context: data
Object: query: `Test query ${i


### src/orchestration/__tests__/conversation-state.test.ts:216
Context: data
Object: query: `Test query ${i


### src/orchestration/__tests__/conversation-state.test.ts:245
Context: data
Object: query: 'How to optimize Python code for performance?',
          processingTime: 150,
          success: true
        


### src/orchestration/__tests__/conversation-state.test.ts:255
Context: data
Object: agentId: 'python-expert',
          confidence: 0.9,
          processingTime: 150
        


### src/orchestration/__tests__/conversation-state.test.ts:265
Context: data
Object: query: 'What are best practices for database optimization?',
          processingTime: 200,
          success: true
        


### src/orchestration/__tests__/conversation-state.test.ts:275
Context: data
Object: agentId: 'database-expert',
          confidence: 0.85,
          processingTime: 200
        


### src/orchestration/__tests__/conversation-state.test.ts:309
Context: data
Object: query: 'Compare TypeScript with JavaScript and Python for backend development',
          processingTime: 100,
          success: true
        


### src/orchestration/__tests__/conversation-state.test.ts:329
Context: data
Object: query: 'How to deploy React app with Node.js backend to Docker and Kubernetes?',
          processingTime: 100,
          success: true
        


### src/orchestration/__tests__/conversation-state.test.ts:351
Context: data
Object: query: 'How to use React hooks?',
          processingTime: 100,
          success: true
        


### src/orchestration/__tests__/conversation-state.test.ts:362
Context: data
Object: query: 'React performance optimization techniques',
          processingTime: 100,
          success: true
        


### src/orchestration/__tests__/conversation-state.test.ts:388
Context: data
Object: query: `Query ${i


### src/orchestration/__tests__/conversation-state.test.ts:413
Context: data
Object: agentId: 'python-expert',
            confidence: 0.8 + i * 0.05,
            processingTime: 100 + i * 50
          


### src/models/ollama/OllamaProvider.ts:81
Context: options
Object: temperature: options.temperature ?? 0.7,
          num_predict: options.maxTokens ?? 2048,
          top_p: options.topP ?? 0.9,
          top_k: options.topK ?? 40,
          seed: options.seed,
          stop: options.stopSequences,
        


### src/models/ollama/OllamaProvider.ts:118
Context: metadata
Object: model: response.model,
          tokensUsed: response.eval_count || 0,
          generationTime,
          finishReason: response.done ? 'stop' : 'length',
        


### src/models/ollama/OllamaProvider.ts:157
Context: options
Object: temperature: options.temperature ?? 0.7,
          num_predict: options.maxTokens ?? 2048,
          top_p: options.topP ?? 0.9,
          top_k: options.topK ?? 40,
        


### src/infrastructure/security/sanitizer.ts:18
Context: allowedAttributes
Object: 'a': ['href', 'title', 'target'],
        'code': ['class'],
      


### src/infrastructure/performance/tracker.ts:45
Context: detail
Object: startMark,
        endMark: endMark || 'now',
      


### src/infrastructure/monitoring/metrics.ts:139
Context: counters
Object: 


### src/infrastructure/monitoring/metrics.ts:140
Context: gauges
Object: 


### src/infrastructure/monitoring/metrics.ts:141
Context: histograms
Object: 


### src/infrastructure/monitoring/alerts.ts:273
Context: metadata
Object: type: 'resource',
        resource: 'memory',
      


### src/infrastructure/monitoring/alerts.ts:290
Context: metadata
Object: type: 'resource',
        resource: 'memory',
      


### src/infrastructure/monitoring/alerts.ts:306
Context: metadata
Object: type: 'performance',
        metric: 'error-rate',
      


### src/infrastructure/model-providers/types.ts:230
Context: metadata
Object: model: string
    provider: string
    startTime: number
  


### src/infrastructure/model-providers/ProviderManager.ts:165
Context: weights
Object: speed: 0.3,
        cost: 0.2,
        quality: 0.4,
        availability: 0.1,
      


### src/infrastructure/model-providers/ProviderManager.ts:171
Context: constraints
Object: 


### src/infrastructure/model-providers/ProviderManager.ts:172
Context: fallbackBehavior
Object: enableFallback: true,
        maxFallbackAttempts: 3,
        fallbackDelay: 1000,
      


### src/infrastructure/model-providers/ProviderManager.ts:397
Context: endpoints
Object: baseUrl: 'http://localhost:11434',
      


### src/infrastructure/model-providers/ProviderManager.ts:401
Context: metadata
Object: description: 'Local Ollama model provider',
        isDefault: true,
      


### src/infrastructure/model-providers/OllamaProvider.ts:114
Context: tokenUsage
Object: promptTokens,
          completionTokens,
          totalTokens,
        


### src/infrastructure/model-providers/OllamaProvider.ts:123
Context: metadata
Object: ...request.metadata,
          ollamaMetadata: result.metadata || {


### src/infrastructure/model-providers/OllamaProvider.ts:142
Context: metadata
Object: request, modelConfig 


### src/infrastructure/model-providers/OllamaProvider.ts:193
Context: metadata
Object: model: modelConfig.id,
          provider: this.config.id,
          startTime: Date.now(),
        


### src/infrastructure/model-providers/OllamaProvider.ts:235
Context: pricing
Object: inputTokens: 0,
          outputTokens: 0,
          requestCost: 0,
        


### src/infrastructure/model-providers/OllamaProvider.ts:240
Context: metadata
Object: size: model.size,
          family: model.details?.family,
          parameters: model.details?.parameter_size,
          quantization: model.details?.quantization_level,
          modified: model.modified_at,
        


### src/infrastructure/model-providers/ModelRouter.ts:84
Context: options
Object: useCache?: boolean
      cacheTTL?: number
      excludeProviders?: string[]
      preferredProviders?: string[]
    


### src/infrastructure/model-providers/ModelRouter.ts:348
Context: metadata
Object: strategy: 'performance-based',
        score: bestScore,
        totalModelsEvaluated: models.length,
      


### src/infrastructure/model-providers/ModelRouter.ts:392
Context: metadata
Object: strategy: 'cost-optimized',
        totalViableModels: viableModels.length,
      


### src/infrastructure/model-providers/ModelRouter.ts:441
Context: metadata
Object: strategy: 'dynamic',
        adaptiveBonus: this.getAdaptiveBonus(bestModel.id, bestModel.provider),
      


### src/infrastructure/model-providers/ModelRouter.ts:491
Context: metadata
Object: strategy: 'hybrid',
        performanceWeight,
        costWeight,
      


### src/infrastructure/model-providers/ModelRouter.ts:518
Context: metadata
Object: strategy: 'static',
      


### src/infrastructure/model-providers/BaseModelProvider.ts:246
Context: _options
Object: modelId?: string
      retryable?: boolean
      statusCode?: number
      metadata?: Record<string, any>
      cause?: Error
    


### src/infrastructure/model-providers/BaseModelProvider.ts:377
Context: errorBreakdown
Object: 


### src/infrastructure/model-providers/BaseModelProvider.ts:378
Context: modelMetrics
Object: 


### src/infrastructure/model-providers/BaseModelProvider.ts:394
Context: metadata
Object: 


### src/infrastructure/model-providers/AgentModelAdapter.ts:89
Context: modelSelection
Object: strategy: 'hybrid',
          primary: primaryModel,
          fallbacks: fallbackModels,
          selectionCriteria: this.createDefaultSelectionCriteria(agentConfig),
          taskMapping: this.createTaskMapping(agentConfig, availableModels),
        


### src/infrastructure/model-providers/AgentModelAdapter.ts:97
Context: modelRouter
Object: enabled: true,
          cacheSelections: true,
          cacheTTL: 300000,
          adaptiveSelection: true,
        


### src/infrastructure/model-providers/AgentModelAdapter.ts:109
Context: modelPreferences
Object: preferMultiModel: true,
          fallbackToLegacy: true,
          taskSpecificModels: this.inferTaskSpecificModels(agentConfig, availableModels),
          complexityThresholds: this.inferComplexityThresholds(agentConfig, availableModels),
        


### src/infrastructure/model-providers/AgentModelAdapter.ts:291
Context: performanceRequirements
Object: speed: 'balanced',
        cost: 'balanced',
        quality: 'balanced',
      


### src/infrastructure/model-providers/AgentModelAdapter.ts:299
Context: metadata
Object: 


### src/infrastructure/model-providers/AgentModelAdapter.ts:337
Context: weights
Object: speed: speedWeight,
        cost: costWeight,
        quality: qualityWeight,
        availability: availabilityWeight,
      


### src/infrastructure/model-providers/AgentModelAdapter.ts:343
Context: constraints
Object: maxResponseTime: 30000,
      


### src/infrastructure/model-providers/AgentModelAdapter.ts:346
Context: fallbackBehavior
Object: enableFallback: true,
        maxFallbackAttempts: 2,
        fallbackDelay: 1000,
      


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:55
Context: tokenUsage
Object: promptTokens: 10, completionTokens: 20, totalTokens: 30 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:60
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:126
Context: pricing
Object: inputTokens: 0.00001, outputTokens: 0.00002 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:139
Context: pricing
Object: inputTokens: 0.0001, outputTokens: 0.0002 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:153
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:167
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:268
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:299
Context: performanceRequirements
Object: speed: 'fast',
          cost: 'minimize',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:307
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:322
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:330
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:338
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:376
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:384
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:392
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:502
Context: performanceRequirements
Object: speed: 'fast',
          cost: 'minimize',
          quality: 'basic',
        


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:510
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:518
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:580
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:603
Context: performanceRequirements
Object: speed: 'fast',
          cost: 'minimize',
          quality: 'basic',
        


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:611
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:619
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:634
Context: performanceRequirements
Object: speed: 'fast',
          cost: 'minimize',
          quality: 'basic',
        


### src/infrastructure/model-providers/__tests__/ProviderManager.test.ts:642
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:53
Context: tokenUsage
Object: promptTokens: 10, completionTokens: 20, totalTokens: 30 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:58
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:114
Context: pricing
Object: inputTokens: 0.00001, outputTokens: 0.00002 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:128
Context: pricing
Object: inputTokens: 0.0001, outputTokens: 0.0002 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:142
Context: pricing
Object: inputTokens: 0.00005, outputTokens: 0.0001 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:155
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:169
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:214
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:228
Context: performanceRequirements
Object: speed: 'balanced',
        cost: 'balanced',
        quality: 'balanced',
      


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:236
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:242
Context: weights
Object: speed: 0.8, cost: 0.1, quality: 0.1, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:243
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:256
Context: weights
Object: speed: 0.1, cost: 0.8, quality: 0.1, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:257
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:269
Context: weights
Object: speed: 0.3, cost: 0.3, quality: 0.3, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:270
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:283
Context: weights
Object: speed: 0.25, cost: 0.25, quality: 0.25, availability: 0.25 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:284
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:297
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'excellent',
        


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:306
Context: weights
Object: speed: 0.2, cost: 0.2, quality: 0.6, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:307
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:321
Context: performanceRequirements
Object: speed: 'balanced',
        cost: 'balanced',
        quality: 'balanced',
      


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:329
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:334
Context: weights
Object: speed: 0.5, cost: 0.2, quality: 0.2, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:335
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:398
Context: performanceRequirements
Object: speed: 'balanced',
        cost: 'balanced',
        quality: 'balanced',
      


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:406
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:411
Context: weights
Object: speed: 0.5, cost: 0.2, quality: 0.2, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:412
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 3, fallbackDelay: 10 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:518
Context: modelMetrics
Object: 'fast-model': {
            successRate: 0.95,
            averageResponseTime: 150,
          


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:538
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:546
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:551
Context: modelMetrics
Object: 'fast-model': {
            successRate: 0.98,
            averageResponseTime: 100,
          


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:563
Context: weights
Object: speed: 0.4, cost: 0.2, quality: 0.3, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:564
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:579
Context: performanceRequirements
Object: speed: 'balanced',
        cost: 'balanced',
        quality: 'balanced',
      


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:587
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:593
Context: weights
Object: speed: 0.2, cost: 0.6, quality: 0.2, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:594
Context: constraints
Object: maxCostPerRequest: 0.00005, // Very low cost limit
        


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:597
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:609
Context: weights
Object: speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:610
Context: constraints
Object: minQualityTier: 'excellent',
        


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:613
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:624
Context: weights
Object: speed: 0.2, cost: 0.6, quality: 0.2, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:625
Context: constraints
Object: maxCostPerRequest: 0.000001, // Impossibly low cost
        


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:628
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:642
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:650
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:655
Context: weights
Object: speed: 0.5, cost: 0.2, quality: 0.2, availability: 0.1 


### src/infrastructure/model-providers/__tests__/ModelRouter.test.ts:656
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 100 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:58
Context: tokenUsage
Object: promptTokens: Math.ceil(request.prompt.length / 4),
        completionTokens: 50,
        totalTokens: Math.ceil(request.prompt.length / 4) + 50,
      


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:67
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:77
Context: metadata
Object: model: modelConfig.id,
        provider: this.config.id,
        startTime: Date.now(),
      


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:132
Context: pricing
Object: inputTokens: 0.00001, outputTokens: 0.00002, requestCost: 0 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:145
Context: pricing
Object: inputTokens: 0.00005, outputTokens: 0.0001, requestCost: 0.001 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:172
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:291
Context: performanceRequirements
Object: speed: 'fast',
          cost: 'minimize',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:299
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:312
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:333
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:352
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:365
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:395
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:417
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:443
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:458
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:486
Context: metadata
Object: test: 'data' 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:521
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'excellent',
        


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:529
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:546
Context: performanceRequirements
Object: speed: 'fast',
          cost: 'minimize',
          quality: 'basic',
        


### src/infrastructure/model-providers/__tests__/BaseModelProvider.test.ts:554
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:46
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:54
Context: tokenUsage
Object: promptTokens: 10, completionTokens: 20, totalTokens: 30 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:59
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:84
Context: pricing
Object: inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:97
Context: pricing
Object: inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:110
Context: pricing
Object: inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:144
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:145
Context: legacyModel
Object: model: 'mistral:latest',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:150
Context: modelPreferences
Object: preferMultiModel: false,
          fallbackToLegacy: true,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:166
Context: modelSelection
Object: strategy: 'dynamic',
          primary: {
            id: 'mixtral:8x7b',
            name: 'Mixtral 8x7B',
            provider: 'ollama',
            capabilities: ['text-generation'],
            costTier: 'high',
            speedTier: 'quality',
            qualityTier: 'excellent',
            contextWindow: 128000,
            maxTokens: 8192,
            specialties: [],
            pricing: { inputTokens: 0.01, outputTokens: 0.03 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:182
Context: selectionCriteria
Object: strategy: 'dynamic',
            weights: { speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:185
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 1000 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:203
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:226
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:259
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:260
Context: legacyModel
Object: model: 'unknown-model',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:297
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:298
Context: legacyModel
Object: model: 'unknown-model',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:324
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:325
Context: multiModel
Object: modelSelection: {
            strategy: 'hybrid',
            primary: {
              id: 'mistral:latest',
              name: 'Mistral Latest',
              provider: 'ollama',
              capabilities: ['text-generation'],
              costTier: 'low',
              speedTier: 'balanced',
              qualityTier: 'good',
              contextWindow: 8192,
              maxTokens: 4096,
              specialties: [],
              pricing: { inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:342
Context: selectionCriteria
Object: strategy: 'hybrid',
              weights: { speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:345
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 1000 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:350
Context: modelPreferences
Object: preferMultiModel: true,
          fallbackToLegacy: true,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:359
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:381
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:382
Context: multiModel
Object: modelSelection: {
            strategy: 'hybrid',
            primary: {
              id: 'failing-model',
              name: 'Failing Model',
              provider: 'failing-provider',
              capabilities: ['text-generation'],
              costTier: 'low',
              speedTier: 'balanced',
              qualityTier: 'good',
              contextWindow: 8192,
              maxTokens: 4096,
              specialties: [],
              pricing: { inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:399
Context: selectionCriteria
Object: strategy: 'hybrid',
              weights: { speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:402
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 1000 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:407
Context: legacyModel
Object: model: 'mistral:latest',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:412
Context: modelPreferences
Object: preferMultiModel: true,
          fallbackToLegacy: true,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:424
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:446
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:447
Context: legacyModel
Object: model: 'mistral:latest',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:452
Context: modelPreferences
Object: preferMultiModel: false,
          fallbackToLegacy: true,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:461
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:484
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:485
Context: multiModel
Object: modelSelection: {
            strategy: 'hybrid',
            primary: {
              id: 'mistral:latest',
              name: 'Mistral Latest',
              provider: 'ollama',
              capabilities: ['text-generation'],
              costTier: 'low',
              speedTier: 'balanced',
              qualityTier: 'good',
              contextWindow: 8192,
              maxTokens: 4096,
              specialties: [],
              pricing: { inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:502
Context: selectionCriteria
Object: strategy: 'hybrid',
              weights: { speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:505
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 1000 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:516
Context: performanceRequirements
Object: speed: 'balanced',
          cost: 'balanced',
          quality: 'balanced',
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:524
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:546
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:547
Context: multiModel
Object: modelSelection: {
            strategy: 'hybrid',
            primary: {
              id: 'mistral:latest',
              name: 'Mistral Latest',
              provider: 'ollama',
              capabilities: ['text-generation'],
              costTier: 'low',
              speedTier: 'balanced',
              qualityTier: 'good',
              contextWindow: 8192,
              maxTokens: 4096,
              specialties: [],
              pricing: { inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:564
Context: selectionCriteria
Object: strategy: 'hybrid',
              weights: { speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:567
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 1000 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:572
Context: modelPreferences
Object: preferMultiModel: true,
          fallbackToLegacy: true,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:590
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:591
Context: legacyModel
Object: model: 'mistral:latest',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:615
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:616
Context: legacyModel
Object: model: 'mistral:latest',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:625
Context: multiModel
Object: modelSelection: {
            strategy: 'hybrid',
            primary: {
              id: 'mistral:latest',
              name: 'Mistral Latest',
              provider: 'ollama',
              capabilities: ['text-generation'],
              costTier: 'low',
              speedTier: 'balanced',
              qualityTier: 'good',
              contextWindow: 8192,
              maxTokens: 4096,
              specialties: [],
              pricing: { inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:642
Context: selectionCriteria
Object: strategy: 'hybrid',
              weights: { speed: 0.3, cost: 0.2, quality: 0.4, availability: 0.1 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:645
Context: fallbackBehavior
Object: enableFallback: true, maxFallbackAttempts: 2, fallbackDelay: 1000 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:650
Context: modelPreferences
Object: preferMultiModel: true,
          fallbackToLegacy: true,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:686
Context: pricing
Object: inputTokens: 0, outputTokens: 0, requestCost: 0 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:707
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:708
Context: legacyModel
Object: model: 'mistral:latest',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:727
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:728
Context: legacyModel
Object: model: 'mixtral:8x7b',
          temperature: 0.3,
          maxTokens: 4000,
        


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:760
Context: metadata
Object: 


### src/infrastructure/model-providers/__tests__/AgentModelAdapter.test.ts:761
Context: legacyModel
Object: model: 'unknown-model',
          temperature: 0.7,
          maxTokens: 2000,
        


### src/agents/experts/WebScrapingExpert.ts:159
Context: config
Object: urls: task.urls,
          concurrency: Math.min(task.urls.length, 5),
          strategy: task.needsJavaScript ? 'dynamic' : 'static',
          delay: 2000 // 2 seconds between requests
        


### src/agents/experts/WebScrapingExpert.ts:171
Context: config
Object: url: task.urls[0],
          engine: 'playwright', // Playwright for better cross-browser support
          headless: true,
          screenshot: task.takeScreenshot,
          userAgent: AntiDetectionStrategy.getRandomUserAgent(),
          viewport: AntiDetectionStrategy.getRandomViewport()
        


### src/agents/experts/WebScrapingExpert.ts:184
Context: config
Object: url: task.urls[0],
        headers: {
          'User-Agent': AntiDetectionStrategy.getRandomUserAgent()
        


### src/agents/experts/WebScrapingExpert.ts:488
Context: scrapedData
Object: url: scrapedData.url,
          title: scrapedData.title,
          content: scrapedData.content,
          links: scrapedData.links,
          images: scrapedData.images,
          metadata: {
            ...scrapedData.metadata,
            scrapedAt: new Date().toISOString(),
            scrapedBy: this.config.id
          


### src/agents/experts/WebScrapingExpert.ts:619
Context: vectorDbConfig
Object: databaseType: 'chroma', // Default to Chroma for local development
        connectionParams: {
          host: 'localhost',
          port: 8000,
          collection: `${expertId


### src/agents/experts/VersionControlExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/VectorSearchExpert.ts:52
Context: metadata
Object: 


### src/agents/experts/VectorSearchExpert.ts:85
Context: parameters
Object: action: 'string - Action to perform',
          databaseType: 'string - Type of vector database',
          connectionParams: 'object - Connection parameters'
        


### src/agents/experts/VectorSearchExpert.ts:94
Context: parameters
Object: action: 'string - Action to perform',
          texts: 'string[] - Texts to embed',
          model: 'string - Embedding model to use'
        


### src/agents/experts/VectorSearchExpert.ts:103
Context: parameters
Object: action: 'string - Action to perform',
          text: 'string - Text to chunk',
          strategy: 'string - Chunking strategy'
        


### src/agents/experts/VectorSearchExpert.ts:112
Context: parameters
Object: action: 'string - Action to perform',
          query: 'string - Search query',
          connectionId: 'string - Database connection ID'
        


### src/agents/experts/VectorSearchExpert.ts:121
Context: parameters
Object: action: 'string - Action to perform',
          connectionId: 'string - Database connection ID',
          indexName: 'string - Index name'
        


### src/agents/experts/VectorSearchExpert.ts:130
Context: parameters
Object: action: 'string - Action to perform',
          systemId: 'string - RAG system ID',
          expertId: 'string - Expert ID'
        


### src/agents/experts/VSCodeExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/UIUXDesignExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/TestingAndQAExpert.ts:121
Context: metadata
Object: supportedFrameworks: ['Jest', 'Vitest', 'Playwright', 'Cypress', 'WebdriverIO'],
        supportedLanguages: ['TypeScript', 'JavaScript', 'Node.js'],
        testingTypes: ['Unit', 'Integration', 'E2E', 'Performance', 'Visual', 'API'],
        ragEnabled: true,
        knowledgeDomains: this.ragConfig.knowledgeDomains.length
      


### src/agents/experts/TestingAndQAExpert.ts:128
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.1,
        maxTokens: 4000
      


### src/agents/experts/TestingAndQAExpert.ts:141
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code for test generation'
            


### src/agents/experts/TestingAndQAExpert.ts:148
Context: test_framework
Object: type: 'string',
              enum: ['jest', 'vitest', 'playwright', 'cypress', 'webdriverio'],
              description: 'Testing framework to use'
            


### src/agents/experts/TestingAndQAExpert.ts:153
Context: test_types
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['unit', 'integration', 'e2e', 'component', 'api', 'visual']
              


### src/agents/experts/TestingAndQAExpert.ts:161
Context: coverage_threshold
Object: type: 'number',
              description: 'Minimum coverage percentage target',
              default: 80
            


### src/agents/experts/TestingAndQAExpert.ts:166
Context: test_patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TestingAndQAExpert.ts:171
Context: mock_strategy
Object: type: 'string',
              enum: ['auto', 'manual', 'hybrid', 'none'],
              description: 'Mocking strategy for dependencies'
            


### src/agents/experts/TestingAndQAExpert.ts:176
Context: parallel_execution
Object: type: 'boolean',
              description: 'Enable parallel test execution',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:189
Context: parameters
Object: type: 'object',
          properties: {
            project_path: {
              type: 'string',
              description: 'Path to project for coverage analysis'
            


### src/agents/experts/TestingAndQAExpert.ts:196
Context: coverage_tool
Object: type: 'string',
              enum: ['nyc', 'c8', 'istanbul', 'jest-coverage'],
              description: 'Coverage analysis tool to use'
            


### src/agents/experts/TestingAndQAExpert.ts:201
Context: report_formats
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['html', 'json', 'lcov', 'text', 'clover', 'cobertura']
              


### src/agents/experts/TestingAndQAExpert.ts:209
Context: coverage_thresholds
Object: type: 'object',
              description: 'Coverage thresholds for different metrics'
            


### src/agents/experts/TestingAndQAExpert.ts:213
Context: exclude_patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TestingAndQAExpert.ts:218
Context: include_untested
Object: type: 'boolean',
              description: 'Include untested files in coverage report',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:223
Context: branch_coverage
Object: type: 'boolean',
              description: 'Enable branch coverage analysis',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:236
Context: parameters
Object: type: 'object',
          properties: {
            workflow_type: {
              type: 'string',
              enum: ['ci-cd', 'pre-commit', 'release', 'hotfix', 'custom'],
              description: 'Type of QA workflow to orchestrate'
            


### src/agents/experts/TestingAndQAExpert.ts:244
Context: quality_gates
Object: type: 'object',
              description: 'Quality gate definitions and thresholds'
            


### src/agents/experts/TestingAndQAExpert.ts:248
Context: test_stages
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['unit', 'integration', 'e2e', 'performance', 'security', 'accessibility']
              


### src/agents/experts/TestingAndQAExpert.ts:256
Context: parallel_stages
Object: type: 'boolean',
              description: 'Allow parallel execution of test stages',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:261
Context: failure_strategy
Object: type: 'string',
              enum: ['fail-fast', 'continue-on-error', 'retry', 'conditional'],
              description: 'Strategy for handling test failures'
            


### src/agents/experts/TestingAndQAExpert.ts:266
Context: notification_channels
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TestingAndQAExpert.ts:271
Context: artifacts_retention
Object: type: 'object',
              description: 'Test artifacts and retention policies'
            


### src/agents/experts/TestingAndQAExpert.ts:283
Context: parameters
Object: type: 'object',
          properties: {
            data_strategy: {
              type: 'string',
              enum: ['fixtures', 'factories', 'generators', 'snapshots', 'hybrid'],
              description: 'Test data generation strategy'
            


### src/agents/experts/TestingAndQAExpert.ts:291
Context: mock_frameworks
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['jest-mock', 'sinon', 'msw', 'nock', 'testdouble']
              


### src/agents/experts/TestingAndQAExpert.ts:299
Context: data_types
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['api-responses', 'database-records', 'user-interactions', 'file-uploads', 'external-services']
              


### src/agents/experts/TestingAndQAExpert.ts:307
Context: faker_integration
Object: type: 'boolean',
              description: 'Use Faker.js for realistic test data',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:312
Context: data_persistence
Object: type: 'string',
              enum: ['memory', 'file', 'database', 'none'],
              description: 'Test data persistence strategy'
            


### src/agents/experts/TestingAndQAExpert.ts:317
Context: cleanup_strategy
Object: type: 'string',
              enum: ['after-each', 'after-all', 'manual', 'automatic'],
              description: 'Test data cleanup strategy'
            


### src/agents/experts/TestingAndQAExpert.ts:330
Context: parameters
Object: type: 'object',
          properties: {
            test_tool: {
              type: 'string',
              enum: ['k6', 'artillery', 'jmeter', 'lighthouse', 'autocannon'],
              description: 'Performance testing tool to use'
            


### src/agents/experts/TestingAndQAExpert.ts:338
Context: test_scenarios
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['load', 'stress', 'spike', 'volume', 'endurance', 'baseline']
              


### src/agents/experts/TestingAndQAExpert.ts:346
Context: target_endpoints
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TestingAndQAExpert.ts:351
Context: load_configuration
Object: type: 'object',
              description: 'Load testing configuration (users, duration, ramp-up)'
            


### src/agents/experts/TestingAndQAExpert.ts:355
Context: performance_thresholds
Object: type: 'object',
              description: 'Performance thresholds and SLA requirements'
            


### src/agents/experts/TestingAndQAExpert.ts:359
Context: monitoring_integration
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['prometheus', 'grafana', 'datadog', 'newrelic', 'cloudwatch']
              


### src/agents/experts/TestingAndQAExpert.ts:367
Context: report_formats
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['html', 'json', 'junit', 'csv', 'prometheus']
              


### src/agents/experts/TestingAndQAExpert.ts:383
Context: parameters
Object: type: 'object',
          properties: {
            source_framework: {
              type: 'string',
              enum: ['jest', 'mocha', 'jasmine', 'vitest', 'ava', 'tape'],
              description: 'Current testing framework'
            


### src/agents/experts/TestingAndQAExpert.ts:391
Context: target_framework
Object: type: 'string',
              enum: ['jest', 'vitest', 'playwright', 'cypress', 'webdriverio'],
              description: 'Target testing framework'
            


### src/agents/experts/TestingAndQAExpert.ts:396
Context: test_patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TestingAndQAExpert.ts:401
Context: migration_options
Object: type: 'object',
              description: 'Framework-specific migration options'
            


### src/agents/experts/TestingAndQAExpert.ts:405
Context: preserve_features
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['mocks', 'fixtures', 'custom-matchers', 'setup-teardown', 'coverage']
              


### src/agents/experts/TestingAndQAExpert.ts:413
Context: validate_migration
Object: type: 'boolean',
              description: 'Run tests after migration to validate',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:426
Context: parameters
Object: type: 'object',
          properties: {
            optimization_target: {
              type: 'string',
              enum: ['speed', 'coverage', 'reliability', 'balanced', 'strict'],
              description: 'Primary optimization goal'
            


### src/agents/experts/TestingAndQAExpert.ts:434
Context: current_metrics
Object: type: 'object',
              description: 'Current test metrics and performance data'
            


### src/agents/experts/TestingAndQAExpert.ts:438
Context: pipeline_constraints
Object: type: 'object',
              description: 'CI/CD pipeline constraints and requirements'
            


### src/agents/experts/TestingAndQAExpert.ts:442
Context: quality_requirements
Object: type: 'object',
              description: 'Minimum quality standards to maintain'
            


### src/agents/experts/TestingAndQAExpert.ts:446
Context: risk_tolerance
Object: type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Acceptable risk level for optimizations'
            


### src/agents/experts/TestingAndQAExpert.ts:451
Context: generate_recommendations
Object: type: 'boolean',
              description: 'Generate optimization recommendations',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:464
Context: parameters
Object: type: 'object',
          properties: {
            report_type: {
              type: 'string',
              enum: ['test-health', 'coverage-trends', 'failure-analysis', 'performance-metrics', 'comprehensive'],
              description: 'Type of analytics report'
            


### src/agents/experts/TestingAndQAExpert.ts:472
Context: time_period
Object: type: 'string',
              enum: ['daily', 'weekly', 'monthly', 'quarterly', 'custom'],
              description: 'Time period for analysis'
            


### src/agents/experts/TestingAndQAExpert.ts:477
Context: custom_date_range
Object: type: 'object',
              description: 'Custom date range when time_period is custom'
            


### src/agents/experts/TestingAndQAExpert.ts:481
Context: metrics_focus
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['coverage', 'execution-time', 'flaky-tests', 'test-growth', 'failure-patterns']
              


### src/agents/experts/TestingAndQAExpert.ts:489
Context: include_visualizations
Object: type: 'boolean',
              description: 'Include charts and visualizations',
              default: true
            


### src/agents/experts/TestingAndQAExpert.ts:494
Context: output_format
Object: type: 'string',
              enum: ['html', 'pdf', 'json', 'markdown', 'dashboard'],
              description: 'Output format for the report'
            


### src/agents/experts/TestingAndQAExpert.ts:540
Context: data
Object: framework_config: frameworkConfig,
          source_analysis: sourceAnalysis,
          generated_tests: generatedTests,
          mocking_setup: mockingSetup,
          parallel_config: parallelConfig,
          coverage_setup: {
            threshold: params.coverage_threshold,
            reporters: ['text', 'html', 'lcov'],
            exclude: ['node_modules', 'dist', 'coverage']
          


### src/agents/experts/TestingAndQAExpert.ts:567
Context: metadata
Object: test_framework: params.test_framework,
          test_types: params.test_types,
          coverage_threshold: params.coverage_threshold,
          files_generated: generatedTests.files.length,
          parallel_enabled: params.parallel_execution
        


### src/agents/experts/TestingAndQAExpert.ts:612
Context: coverage_by_directory
Object: 'src/': 78.5,
          'src/components/': 85.2,
          'src/utils/': 65.8,
          'src/services/': 82.1
        


### src/agents/experts/TestingAndQAExpert.ts:639
Context: data
Object: coverage_config: coverageConfig,
          coverage_analysis: coverageAnalysis,
          threshold_results: thresholdResults,
          reports,
          suggestions,
          improvement_plan: [
            'Add tests for uncovered utility functions',
            'Increase branch coverage in conditional logic',
            'Test error handling paths',
            'Add integration tests for service layer'
          ],
          summary: `Overall coverage: ${coverageAnalysis.overall_coverage


### src/agents/experts/TestingAndQAExpert.ts:652
Context: ci_integration
Object: command: `${params.coverage_tool


### src/agents/experts/TestingAndQAExpert.ts:658
Context: metadata
Object: coverage_tool: params.coverage_tool,
          overall_coverage: coverageAnalysis.overall_coverage,
          thresholds_passed: thresholdResults.passed_thresholds,
          total_thresholds: thresholdResults.total_thresholds,
          uncovered_files: coverageAnalysis.uncovered_files.length
        


### src/agents/experts/TestingAndQAExpert.ts:694
Context: unit_tests
Object: pass_rate: 100, coverage: 80 


### src/agents/experts/TestingAndQAExpert.ts:695
Context: integration_tests
Object: pass_rate: 95, max_duration: 300 


### src/agents/experts/TestingAndQAExpert.ts:696
Context: e2e_tests
Object: pass_rate: 90, max_duration: 600 


### src/agents/experts/TestingAndQAExpert.ts:697
Context: performance_tests
Object: response_time: 2000, error_rate: 1 


### src/agents/experts/TestingAndQAExpert.ts:698
Context: security_tests
Object: vulnerabilities: 0, pass_rate: 100 


### src/agents/experts/TestingAndQAExpert.ts:725
Context: data
Object: workflow_config: workflowConfig,
          quality_gates: qualityGates,
          execution_plan: executionPlan,
          failure_handling: failureHandling,
          notification_setup: notificationSetup,
          artifacts_config: artifactsConfig,
          workflow_results: workflowResults,
          ci_cd_integration: {
            pipeline_yaml: this.generatePipelineYAML(workflowConfig, params.workflow_type),
            triggers: this.getWorkflowTriggers(params.workflow_type),
            environment_variables: this.getRequiredEnvVars(params.test_stages)
          


### src/agents/experts/TestingAndQAExpert.ts:738
Context: monitoring
Object: metrics: ['test_duration', 'pass_rate', 'coverage', 'failure_rate'],
            dashboards: ['test_overview', 'coverage_trends', 'performance_metrics'],
            alerts: ['test_failures', 'coverage_drop', 'performance_degradation']
          


### src/agents/experts/TestingAndQAExpert.ts:745
Context: metadata
Object: workflow_type: params.workflow_type,
          test_stages: params.test_stages,
          parallel_enabled: params.parallel_stages,
          failure_strategy: params.failure_strategy,
          estimated_duration: workflowResults.estimated_duration
        


### src/agents/experts/TestingAndQAExpert.ts:807
Context: data
Object: data_generation_setup: dataGenerationSetup,
          mocking_setup: mockingSetup,
          faker_setup: fakerSetup,
          persistence_setup: persistenceSetup,
          cleanup_setup: cleanupSetup,
          test_data_examples: testDataExamples,
          management_results: managementResults,
          best_practices: [
            'Use realistic test data that mirrors production',
            'Isolate test data between test runs',
            'Mock external dependencies consistently',
            'Use factories for complex object creation',
            'Implement proper data cleanup strategies'
          ],
          utilities: {
            data_builders: this.generateDataBuilders(params.data_types),
            mock_helpers: this.generateMockHelpers(params.mock_frameworks || []),
            cleanup_scripts: this.generateCleanupScripts(params.cleanup_strategy)
          


### src/agents/experts/TestingAndQAExpert.ts:829
Context: metadata
Object: data_strategy: params.data_strategy,
          data_types: params.data_types,
          mock_frameworks: params.mock_frameworks,
          faker_enabled: params.faker_integration,
          persistence_type: params.data_persistence
        


### src/agents/experts/TestingAndQAExpert.ts:889
Context: response_times
Object: average: 850,
          p95: 1200,
          p99: 2100,
          max: 3200
        


### src/agents/experts/TestingAndQAExpert.ts:895
Context: throughput
Object: requests_per_second: 125.5,
          total_requests: 37650,
          successful_requests: 37598,
          failed_requests: 52
        


### src/agents/experts/TestingAndQAExpert.ts:901
Context: error_analysis
Object: error_rate: 0.14,
          timeout_errors: 12,
          connection_errors: 5,
          http_errors: 35
        


### src/agents/experts/TestingAndQAExpert.ts:907
Context: resource_utilization
Object: cpu_usage: 65,
          memory_usage: 78,
          network_io: 45
        


### src/agents/experts/TestingAndQAExpert.ts:923
Context: data
Object: load_test_config: loadTestConfig,
          monitoring_setup: monitoringSetup,
          test_scenarios: testScenarios,
          load_configuration: loadConfig,
          performance_results: performanceResults,
          threshold_results: thresholdResults,
          reports,
          recommendations: [
            'Optimize database queries for better response times',
            'Implement caching for frequently accessed endpoints',
            'Scale horizontally to handle increased load',
            'Monitor and tune garbage collection settings'
          ],
          alerts_triggered: thresholdResults.failed_thresholds.map(t => ({
            metric: t.metric,
            threshold: t.threshold,
            actual: t.actual,
            severity: 'warning'
          


### src/agents/experts/TestingAndQAExpert.ts:945
Context: metadata
Object: test_tool: params.test_tool,
          test_scenarios: params.test_scenarios,
          endpoints_tested: params.target_endpoints.length,
          thresholds_passed: thresholdResults.passed_thresholds,
          overall_status: performanceResults.overall_status
        


### src/agents/experts/TestingAndQAExpert.ts:967
Context: jest
Object: preset: 'ts-jest',
        testEnvironment: 'node',
        collectCoverage: true,
        coverageDirectory: 'coverage',
        coverageReporters: ['text', 'lcov', 'html'],
        testMatch: ['**/__tests__/**/*.test.ts', '**/*.test.ts'],
        coverageThreshold: {
          global: {
            branches: params.coverage_threshold || 80,
            functions: params.coverage_threshold || 80,
            lines: params.coverage_threshold || 80,
            statements: params.coverage_threshold || 80
          


### src/agents/experts/TestingAndQAExpert.ts:983
Context: vitest
Object: test: {
          globals: true,
          environment: 'node',
          coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
            thresholds: {
              lines: params.coverage_threshold || 80,
              functions: params.coverage_threshold || 80,
              branches: params.coverage_threshold || 80,
              statements: params.coverage_threshold || 80
            


### src/agents/experts/TestingAndQAExpert.ts:999
Context: playwright
Object: testDir: './tests',
        fullyParallel: true,
        forbidOnly: !!process.env.CI,
        retries: process.env.CI ? 2 : 0,
        workers: process.env.CI ? 1 : undefined,
        reporter: 'html',
        use: {
          baseURL: 'http://localhost:3000',
          trace: 'on-first-retry'
        


### src/agents/experts/TestingAndQAExpert.ts:1021
Context: test_candidates
Object: unit: 89,
        integration: 12,
        e2e: 8,
        component: 23
      


### src/agents/experts/TestingAndQAExpert.ts:1027
Context: complexity_analysis
Object: high_complexity: 8,
        medium_complexity: 34,
        low_complexity: 85
      


### src/agents/experts/TestingAndQAExpert.ts:1032
Context: dependencies
Object: external: 15,
        internal: 28,
        mocking_needed: 12
      


### src/agents/experts/TestingAndQAExpert.ts:1076
Context: auto
Object: description: 'Automatic mocking with framework defaults',
        setup: `${framework


### src/agents/experts/TestingAndQAExpert.ts:1081
Context: manual
Object: description: 'Manual mock setup with explicit configuration',
        setup: 'Manual mock files in __mocks__ directory',
        examples: ['Custom mock implementations', 'Mock factories']
      


### src/agents/experts/TestingAndQAExpert.ts:1086
Context: hybrid
Object: description: 'Combination of auto and manual mocking',
        setup: 'Selective mocking based on test type',
        examples: ['Auto for units', 'Manual for integration']
      


### src/agents/experts/TestingAndQAExpert.ts:1097
Context: jest
Object: maxWorkers: '50%',
        workerIdleMemoryLimit: '512MB'
      


### src/agents/experts/TestingAndQAExpert.ts:1101
Context: vitest
Object: threads: true,
        maxThreads: 4
      


### src/agents/experts/TestingAndQAExpert.ts:1105
Context: playwright
Object: fullyParallel: true,
        workers: 4
      


### src/agents/experts/TestingAndQAExpert.ts:1248
Context: test_reports
Object: retention: '30d', format: ['html', 'json'] 


### src/agents/experts/TestingAndQAExpert.ts:1249
Context: coverage_reports
Object: retention: '90d', format: ['lcov', 'html'] 


### src/agents/experts/TestingAndQAExpert.ts:1250
Context: screenshots
Object: retention: '7d', format: ['png'] 


### src/agents/experts/TestingAndQAExpert.ts:1251
Context: videos
Object: retention: '7d', format: ['mp4'] 


### src/agents/experts/TestingAndQAExpert.ts:1252
Context: logs
Object: retention: '14d', format: ['txt'] 


### src/agents/experts/TestingAndQAExpert.ts:1358
Context: fixtures
Object: description: 'Static test data files',
        location: 'tests/fixtures/',
        format: 'json',
        examples: ['user.json', 'product.json']
      


### src/agents/experts/TestingAndQAExpert.ts:1364
Context: factories
Object: description: 'Dynamic object factories',
        library: 'factory-bot',
        examples: ['UserFactory', 'ProductFactory']
      


### src/agents/experts/TestingAndQAExpert.ts:1369
Context: generators
Object: description: 'Runtime data generators',
        library: 'faker.js',
        examples: ['randomUser()', 'randomProduct()']
      


### src/agents/experts/TestingAndQAExpert.ts:1374
Context: snapshots
Object: description: 'Test snapshots',
        format: 'json',
        examples: ['component.snap', 'api.snap']
      


### src/agents/experts/TestingAndQAExpert.ts:1438
Context: memory
Object: description: 'In-memory storage',
        cleanup: 'automatic',
        performance: 'fast'
      


### src/agents/experts/TestingAndQAExpert.ts:1443
Context: file
Object: description: 'File-based storage',
        location: 'tmp/test-data/',
        cleanup: 'manual'
      


### src/agents/experts/TestingAndQAExpert.ts:1448
Context: database
Object: description: 'Test database',
        type: 'sqlite',
        cleanup: 'truncate'
      


### src/agents/experts/TestingAndQAExpert.ts:1453
Context: none
Object: description: 'No persistence',
        cleanup: 'not-needed'
      


### src/agents/experts/TestingAndQAExpert.ts:1473
Context: manual
Object: description: 'Manual cleanup',
        hooks: [],
        performance: 'variable'
      


### src/agents/experts/TestingAndQAExpert.ts:1478
Context: automatic
Object: description: 'Framework automatic',
        hooks: ['built-in'],
        performance: 'optimal'
      


### src/agents/experts/TestingAndQAExpert.ts:1498
Context: data
Object: id: 1, name: 'Test' 


### src/agents/experts/TestingAndQAExpert.ts:1511
Context: response
Object: success: true, id: 'tx_123' 


### src/agents/experts/TestingAndQAExpert.ts:1531
Context: k6
Object: script: 'load-test.js',
        options: {
          stages: [
            { duration: '30s', target: 20 


### src/agents/experts/TestingAndQAExpert.ts:1541
Context: artillery
Object: config: {
          target: 'http://localhost:3000',
          phases: [
            { duration: 60, arrivalRate: 10 


### src/agents/experts/TestingAndQAExpert.ts:1550
Context: jmeter
Object: testplan: 'LoadTest.jmx',
        threads: 50,
        duration: 300
      


### src/agents/experts/TestingAndQAExpert.ts:1612
Context: load
Object: users: 50, duration: '5m' 


### src/agents/experts/TestingAndQAExpert.ts:1613
Context: stress
Object: users: 200, duration: '10m' 


### src/agents/experts/TestingAndQAExpert.ts:1614
Context: spike
Object: users: 500, duration: '2m' 


### src/agents/experts/TestingAndQAExpert.ts:1615
Context: volume
Object: users: 100, duration: '30m' 


### src/agents/experts/TestingAndQAExpert.ts:1616
Context: endurance
Object: users: 25, duration: '60m' 


### src/agents/experts/TestingAndQAExpert.ts:1617
Context: baseline
Object: users: 1, duration: '1m' 


### src/agents/experts/TestingAndQAExpert.ts:1744
Context: automated_conversions
Object: assertions: params.source_framework === 'jest' && params.target_framework === 'vitest' ? 90 : 70,
          mocks: 75,
          configuration: 85
        


### src/agents/experts/TestingAndQAExpert.ts:1769
Context: data
Object: current_structure: currentStructure,
          migration_plan: migrationPlan,
          conversion_scripts: conversionScripts,
          compatibility_report: {
            fully_compatible: '85%',
            requires_manual_review: '12%',
            requires_rewrite: '3%'
          


### src/agents/experts/TestingAndQAExpert.ts:1778
Context: rollback_strategy
Object: backup_location: '.backup/tests',
            recovery_steps: [
              'Stop migration process',
              'Restore from backup',
              'Revert package.json changes',
              'Clear node_modules and reinstall'
            ]
          


### src/agents/experts/TestingAndQAExpert.ts:1796
Context: metadata
Object: source_framework: params.source_framework,
          target_framework: params.target_framework,
          test_files: currentStructure.test_files,
          estimated_effort: '12-24 hours',
          automation_percentage: 85
        


### src/agents/experts/TestingAndQAExpert.ts:1888
Context: data
Object: current_analysis: currentAnalysis,
          optimizations,
          impact,
          implementation_plan: {
            phase1: 'Adjust existing gate thresholds (1 week)',
            phase2: 'Implement new quality gates (2 weeks)',
            phase3: 'Deploy process improvements (3 weeks)',
            phase4: 'Monitor and fine-tune (ongoing)'
          


### src/agents/experts/TestingAndQAExpert.ts:1898
Context: monitoring_strategy
Object: metrics: ['gate_pass_rate', 'false_positive_rate', 'deployment_frequency', 'lead_time'],
            dashboards: ['quality_gate_performance', 'team_velocity', 'deployment_metrics'],
            alerts: ['gate_failure_trends', 'coverage_drops', 'performance_degradation']
          


### src/agents/experts/TestingAndQAExpert.ts:1903
Context: roi_projection
Object: time_saved_weekly: '8 hours',
            quality_improvement: '25%',
            deployment_confidence: '95%'
          


### src/agents/experts/TestingAndQAExpert.ts:1910
Context: metadata
Object: optimization_target: params.optimization_target,
          current_gates: Object.keys(params.current_metrics).length,
          recommended_changes: optimizations.gate_adjustments.length + optimizations.new_gates.length,
          estimated_impact: 'high'
        


### src/agents/experts/TestingAndQAExpert.ts:1942
Context: test_health
Object: total_tests: 1247,
          passing_tests: 1198,
          failing_tests: 23,
          flaky_tests: 26,
          test_success_rate: 96.1,
          average_execution_time: '4m 32s',
          test_growth_rate: '+12% monthly'
        


### src/agents/experts/TestingAndQAExpert.ts:1951
Context: coverage_trends
Object: current_coverage: 82.5,
          coverage_trend: '+2.3% monthly',
          uncovered_critical_paths: 8,
          coverage_by_module: {
            'core': 91.2,
            'api': 87.5,
            'ui': 73.8,
            'utils': 85.4
          


### src/agents/experts/TestingAndQAExpert.ts:1962
Context: failure_analysis
Object: top_failure_reasons: [
            { reason: 'Timeout errors', count: 45, percentage: 35 


### src/agents/experts/TestingAndQAExpert.ts:1969
Context: failure_patterns
Object: time_based: 'Increased failures during peak hours',
            component_based: 'API tests showing 3x higher failure rate',
            environment_based: 'CI environment 2x more failures than local'
          


### src/agents/experts/TestingAndQAExpert.ts:1975
Context: team_performance
Object: test_writing_velocity: '45 tests/sprint',
          test_maintenance_time: '15% of development time',
          test_review_time: 'Average 2.5 hours',
          test_debt_score: 'Medium (score: 6.5/10)'
        


### src/agents/experts/TestingAndQAExpert.ts:2035
Context: data
Object: report,
          export_options: {
            formats: ['html', 'pdf', 'json', 'csv'],
            destinations: ['email', 'slack', 'dashboard', 'file']
          


### src/agents/experts/TestingAndQAExpert.ts:2041
Context: sharing_options
Object: stakeholders: ['development_team', 'qa_team', 'management'],
            schedule: 'weekly',
            distribution: 'automated'
          


### src/agents/experts/TestingAndQAExpert.ts:2046
Context: follow_up_actions
Object: scheduled_reviews: 'Weekly test health review',
            automated_alerts: 'Coverage drops below 80%',
            trend_monitoring: 'Daily metrics collection'
          


### src/agents/experts/TestingAndQAExpert.ts:2053
Context: metadata
Object: report_type: params.report_type,
          time_period: params.time_period,
          data_points: Object.keys(analyticsData).length,
          insights_count: insights.key_findings.length,
          recommendations_count: insights.recommendations.length
        


### src/agents/experts/TestingAndQAExpert.ts:2097
Context: targets
Object: statements: 80,
          branches: 75,
          functions: 80,
          lines: 80
        


### src/agents/experts/TestingAndQAExpert.ts:2115
Context: quality_gates
Object: test_pass_rate: 95,
          coverage_minimum: 80,
          performance_threshold: 2000
        


### src/agents/experts/TestExpert.ts:35
Context: metadata
Object: 


### src/agents/experts/TestExpert.ts:73
Context: parameters
Object: type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The test query to process'
            


### src/agents/experts/TestExpert.ts:80
Context: routing_info
Object: type: 'object',
              description: 'Information about how this query was routed',
              optional: true
            


### src/agents/experts/TestExpert.ts:88
Context: params
Object: query: string; routing_info?: any 


### src/agents/experts/TestExpert.ts:95
Context: parameters
Object: type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message to validate'
            


### src/agents/experts/TestExpert.ts:102
Context: sender_agent
Object: type: 'string',
              description: 'ID of the sending agent',
              optional: true
            


### src/agents/experts/TestExpert.ts:110
Context: params
Object: message: string; sender_agent?: string 


### src/agents/experts/TestExpert.ts:117
Context: parameters
Object: type: 'object',
          properties: {
            test_type: {
              type: 'string',
              enum: ['routing', 'communication', 'performance', 'integration'],
              description: 'Type of test to perform'
            


### src/agents/experts/TestExpert.ts:125
Context: parameters
Object: type: 'object',
              description: 'Test-specific parameters',
              optional: true
            


### src/agents/experts/TestExpert.ts:133
Context: params
Object: test_type: string; _parameters?: any 


### src/agents/experts/TestExpert.ts:162
Context: metadata
Object: duration: Date.now() - startTime,
          toolName: 'process_test_query',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TestExpert.ts:173
Context: metadata
Object: duration: Date.now() - startTime,
          toolName: 'process_test_query',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TestExpert.ts:203
Context: metadata
Object: duration: Date.now() - startTime,
          toolName: 'validate_communication',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TestExpert.ts:214
Context: metadata
Object: duration: Date.now() - startTime,
          toolName: 'validate_communication',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TestExpert.ts:284
Context: metadata
Object: duration: Date.now() - startTime,
          toolName: 'generate_test_response',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TestExpert.ts:295
Context: metadata
Object: duration: Date.now() - startTime,
          toolName: 'generate_test_response',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TemplateLibraryExpert.ts:118
Context: metadata
Object: supportedEngines: ['Handlebars', 'Mustache', 'EJS', 'Nunjucks', 'Pug', 'Liquid'],
        supportedTools: ['Plop.js', 'Yeoman', 'Cookiecutter', 'Hygen', 'Scaffolder'],
        templateTypes: ['Project', 'Component', 'Module', 'Service', 'Test', 'Configuration'],
        ragEnabled: true,
        knowledgeDomains: this.ragConfig.knowledgeDomains.length
      


### src/agents/experts/TemplateLibraryExpert.ts:125
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.1,
        maxTokens: 4000
      


### src/agents/experts/TemplateLibraryExpert.ts:138
Context: parameters
Object: type: 'object',
          properties: {
            generator_type: {
              type: 'string',
              enum: ['component', 'module', 'service', 'test', 'page', 'custom'],
              description: 'Type of code generator to create'
            


### src/agents/experts/TemplateLibraryExpert.ts:146
Context: template_engine
Object: type: 'string',
              enum: ['handlebars', 'mustache', 'ejs'],
              description: 'Template engine to use',
              default: 'handlebars'
            


### src/agents/experts/TemplateLibraryExpert.ts:152
Context: output_directory
Object: type: 'string',
              description: 'Target directory for generated files'
            


### src/agents/experts/TemplateLibraryExpert.ts:156
Context: template_config
Object: type: 'object',
              description: 'Configuration for template variables and structure'
            


### src/agents/experts/TemplateLibraryExpert.ts:160
Context: naming_convention
Object: type: 'string',
              enum: ['camelCase', 'PascalCase', 'kebab-case', 'snake_case'],
              description: 'Naming convention for generated files'
            


### src/agents/experts/TemplateLibraryExpert.ts:165
Context: include_tests
Object: type: 'boolean',
              description: 'Include test files in generation',
              default: true
            


### src/agents/experts/TemplateLibraryExpert.ts:170
Context: include_docs
Object: type: 'boolean',
              description: 'Include documentation files',
              default: false
            


### src/agents/experts/TemplateLibraryExpert.ts:183
Context: parameters
Object: type: 'object',
          properties: {
            project_type: {
              type: 'string',
              enum: ['react', 'angular', 'vue', 'node', 'express', 'typescript', 'custom'],
              description: 'Type of project to scaffold'
            


### src/agents/experts/TemplateLibraryExpert.ts:191
Context: project_name
Object: type: 'string',
              description: 'Name of the project to create'
            


### src/agents/experts/TemplateLibraryExpert.ts:195
Context: features
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['typescript', 'testing', 'linting', 'ci-cd', 'docker', 'documentation']
              


### src/agents/experts/TemplateLibraryExpert.ts:203
Context: package_manager
Object: type: 'string',
              enum: ['npm', 'yarn', 'pnpm'],
              description: 'Package manager to use'
            


### src/agents/experts/TemplateLibraryExpert.ts:208
Context: git_integration
Object: type: 'boolean',
              description: 'Initialize Git repository',
              default: true
            


### src/agents/experts/TemplateLibraryExpert.ts:213
Context: license
Object: type: 'string',
              enum: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'ISC'],
              description: 'License for the project'
            


### src/agents/experts/TemplateLibraryExpert.ts:218
Context: target_directory
Object: type: 'string',
              description: 'Directory where project will be created'
            


### src/agents/experts/TemplateLibraryExpert.ts:230
Context: parameters
Object: type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create', 'search', 'update', 'delete', 'categorize', 'export'],
              description: 'Action to perform on snippet library'
            


### src/agents/experts/TemplateLibraryExpert.ts:238
Context: snippet_name
Object: type: 'string',
              description: 'Name/identifier for the snippet'
            


### src/agents/experts/TemplateLibraryExpert.ts:242
Context: snippet_content
Object: type: 'string',
              description: 'Code content of the snippet'
            


### src/agents/experts/TemplateLibraryExpert.ts:246
Context: category
Object: type: 'string',
              enum: ['react', 'typescript', 'node', 'testing', 'utils', 'hooks', 'components'],
              description: 'Category for organizing snippets'
            


### src/agents/experts/TemplateLibraryExpert.ts:251
Context: tags
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:256
Context: language
Object: type: 'string',
              enum: ['typescript', 'javascript', 'jsx', 'tsx', 'css', 'html', 'json'],
              description: 'Programming language of the snippet'
            


### src/agents/experts/TemplateLibraryExpert.ts:261
Context: search_query
Object: type: 'string',
              description: 'Search query for finding snippets'
            


### src/agents/experts/TemplateLibraryExpert.ts:265
Context: export_format
Object: type: 'string',
              enum: ['vscode', 'sublime', 'atom', 'json', 'markdown'],
              description: 'Format for exporting snippet library'
            


### src/agents/experts/TemplateLibraryExpert.ts:278
Context: parameters
Object: type: 'object',
          properties: {
            template_path: {
              type: 'string',
              description: 'Path to template files or directory'
            


### src/agents/experts/TemplateLibraryExpert.ts:285
Context: validation_rules
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['syntax', 'variables', 'structure', 'naming', 'security', 'performance']
              


### src/agents/experts/TemplateLibraryExpert.ts:293
Context: template_engine
Object: type: 'string',
              enum: ['handlebars', 'mustache', 'ejs', 'nunjucks'],
              description: 'Template engine being used'
            


### src/agents/experts/TemplateLibraryExpert.ts:298
Context: strict_mode
Object: type: 'boolean',
              description: 'Enable strict validation rules',
              default: false
            


### src/agents/experts/TemplateLibraryExpert.ts:303
Context: auto_fix
Object: type: 'boolean',
              description: 'Automatically fix common issues',
              default: false
            


### src/agents/experts/TemplateLibraryExpert.ts:308
Context: output_format
Object: type: 'string',
              enum: ['detailed', 'summary', 'json', 'junit'],
              description: 'Format for validation report'
            


### src/agents/experts/TemplateLibraryExpert.ts:321
Context: parameters
Object: type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create', 'update', 'clone', 'version', 'compare', 'merge'],
              description: 'Action to perform on boilerplate'
            


### src/agents/experts/TemplateLibraryExpert.ts:329
Context: boilerplate_name
Object: type: 'string',
              description: 'Name of the boilerplate'
            


### src/agents/experts/TemplateLibraryExpert.ts:333
Context: source_project
Object: type: 'string',
              description: 'Source project path to create boilerplate from'
            


### src/agents/experts/TemplateLibraryExpert.ts:337
Context: template_variables
Object: type: 'object',
              description: 'Variables to be replaced in templates'
            


### src/agents/experts/TemplateLibraryExpert.ts:341
Context: exclusion_patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:346
Context: version_tag
Object: type: 'string',
              description: 'Version tag for the boilerplate'
            


### src/agents/experts/TemplateLibraryExpert.ts:350
Context: target_frameworks
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['react', 'vue', 'angular', 'express', 'fastify', 'next.js']
              


### src/agents/experts/TemplateLibraryExpert.ts:358
Context: customization_options
Object: type: 'object',
              description: 'Available customization options for users'
            


### src/agents/experts/TemplateLibraryExpert.ts:370
Context: parameters
Object: type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['search', 'publish', 'download', 'rate', 'update', 'unpublish'],
              description: 'Marketplace action to perform'
            


### src/agents/experts/TemplateLibraryExpert.ts:378
Context: template_name
Object: type: 'string',
              description: 'Name of the template'
            


### src/agents/experts/TemplateLibraryExpert.ts:382
Context: search_criteria
Object: type: 'object',
              properties: {
                category: {
                  type: 'string',
                  enum: ['frontend', 'backend', 'fullstack', 'mobile', 'desktop', 'cli']
                


### src/agents/experts/TemplateLibraryExpert.ts:389
Context: framework
Object: type: 'string',
                  description: 'Target framework'
                


### src/agents/experts/TemplateLibraryExpert.ts:393
Context: popularity
Object: type: 'string',
                  enum: ['trending', 'most-downloaded', 'highest-rated', 'newest']
                


### src/agents/experts/TemplateLibraryExpert.ts:397
Context: license_type
Object: type: 'string',
                  enum: ['MIT', 'Apache-2.0', 'GPL', 'BSD', 'Commercial']
                


### src/agents/experts/TemplateLibraryExpert.ts:404
Context: publish_data
Object: type: 'object',
              properties: {
                description: { type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:408
Context: version
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:409
Context: tags
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:410
Context: repository_url
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:411
Context: documentation_url
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:415
Context: rating
Object: type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating for template review'
            


### src/agents/experts/TemplateLibraryExpert.ts:429
Context: parameters
Object: type: 'object',
          properties: {
            generator_name: {
              type: 'string',
              description: 'Name for the custom generator'
            


### src/agents/experts/TemplateLibraryExpert.ts:436
Context: generator_type
Object: type: 'string',
              enum: ['plop', 'yeoman', 'hygen', 'custom'],
              description: 'Type of generator framework'
            


### src/agents/experts/TemplateLibraryExpert.ts:441
Context: prompts
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['input', 'list', 'confirm', 'checkbox'] 


### src/agents/experts/TemplateLibraryExpert.ts:447
Context: name
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:448
Context: message
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:449
Context: choices
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:450
Context: default
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:451
Context: validation
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:456
Context: actions
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['add', 'modify', 'append', 'remove'] 


### src/agents/experts/TemplateLibraryExpert.ts:462
Context: path
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:463
Context: templateFile
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:464
Context: pattern
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:465
Context: template
Object: type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:470
Context: helpers
Object: type: 'object',
              description: 'Custom helper functions for templates'
            


### src/agents/experts/TemplateLibraryExpert.ts:474
Context: partials
Object: type: 'object',
              description: 'Reusable template partials'
            


### src/agents/experts/TemplateLibraryExpert.ts:486
Context: parameters
Object: type: 'object',
          properties: {
            source_type: {
              type: 'string',
              enum: ['handlebars', 'mustache', 'ejs', 'nunjucks', 'pug', 'liquid'],
              description: 'Source template engine'
            


### src/agents/experts/TemplateLibraryExpert.ts:494
Context: target_type
Object: type: 'string',
              enum: ['handlebars', 'mustache', 'ejs', 'nunjucks', 'pug', 'liquid'],
              description: 'Target template engine'
            


### src/agents/experts/TemplateLibraryExpert.ts:499
Context: template_paths
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/TemplateLibraryExpert.ts:504
Context: migration_options
Object: type: 'object',
              properties: {
                preserve_comments: {
                  type: 'boolean',
                  default: true
                


### src/agents/experts/TemplateLibraryExpert.ts:511
Context: convert_helpers
Object: type: 'boolean',
                  default: true
                


### src/agents/experts/TemplateLibraryExpert.ts:515
Context: syntax_mapping
Object: type: 'object',
                  description: 'Custom syntax mappings between engines'
                


### src/agents/experts/TemplateLibraryExpert.ts:519
Context: validation_level
Object: type: 'string',
                  enum: ['strict', 'moderate', 'lenient'],
                  default: 'moderate'
                


### src/agents/experts/TemplateLibraryExpert.ts:527
Context: output_directory
Object: type: 'string',
              description: 'Directory for migrated templates'
            


### src/agents/experts/TemplateLibraryExpert.ts:531
Context: create_backup
Object: type: 'boolean',
              default: true,
              description: 'Create backup of original templates'
            


### src/agents/experts/TemplateLibraryExpert.ts:621
Context: validation
Object: structure: 'valid',
              documentation: 'complete',
              license: 'detected',
              tests: 'passing'
            


### src/agents/experts/TemplateLibraryExpert.ts:641
Context: analysis
Object: structure: {
                type: 'project-template',
                framework: 'react',
                language: 'typescript',
                build_system: 'webpack',
                test_framework: 'jest'
              


### src/agents/experts/TemplateLibraryExpert.ts:652
Context: maintenance
Object: last_updated: '2 weeks ago',
                open_issues: 3,
                contributors: 12
              


### src/agents/experts/TemplateLibraryExpert.ts:677
Context: metadata
Object: action,
          marketplace: 'template-hub',
          timestamp: new Date().toISOString()
        


### src/agents/experts/TemplateLibraryExpert.ts:705
Context: customizations
Object: prompts: prompts || [],
          actions: actions || [],
          helpers: helpers || {


### src/agents/experts/TemplateLibraryExpert.ts:788
Context: data
Object: generator: plopGenerator,
          templates,
          config_files: configFiles,
          usage_example: `plop ${generator_type


### src/agents/experts/TemplateLibraryExpert.ts:793
Context: customization_summary
Object: prompts_count: plopGenerator.prompts.length,
            actions_count: plopGenerator.actions.length,
            templates_count: Object.keys(templates).length,
            interactive: interactive_mode || false
          


### src/agents/experts/TemplateLibraryExpert.ts:812
Context: metadata
Object: generator_type,
          customization_level: 'advanced',
          compatible_with: ['plop', 'hygen', 'yeoman']
        


### src/agents/experts/TemplateLibraryExpert.ts:850
Context: source
Object: engine: source_type,
          features_used: [
            'variables',
            'conditionals',
            'loops',
            'partials',
            'helpers'
          ],
          complexity: 'medium',
          file_count: 5
        


### src/agents/experts/TemplateLibraryExpert.ts:862
Context: target
Object: engine: target_type,
          supported_features: [
            'variables',
            'conditionals',
            'loops',
            target_type !== 'mustache' ? 'partials' : null,
            target_type === 'handlebars' ? 'helpers' : null
          ].filter(Boolean),
          compatibility_score: isCompatible ? 85 : 60
        


### src/agents/experts/TemplateLibraryExpert.ts:979
Context: data
Object: analysis,
          migration_plan: migrationPlan,
          syntax_mappings: conversions,
          migration_script: migrationScript,
          compatibility: {
            score: analysis.target.compatibility_score,
            is_compatible: isCompatible,
            feature_gaps: analysis.source.features_used.filter(
              f => !analysis.target.supported_features.includes(f)
            ),
            recommendations: isCompatible ? [
              'Direct migration possible with syntax conversion',
              'Test thoroughly after migration',
              'Review helper function conversions'
            ] : [
              'Manual intervention required for some features',
              'Consider intermediate migration step',
              'Implement custom helpers for missing features'
            ]
          


### src/agents/experts/TemplateLibraryExpert.ts:1008
Context: metadata
Object: source_engine: source_type,
          target_engine: target_type,
          migration_complexity: isCompatible ? 'simple' : 'complex',
          automation_level: isCompatible ? 'high' : 'moderate'
        


### src/agents/experts/TemplateLibraryExpert.ts:1153
Context: params
Object: generator_type: 'component' | 'module' | 'service' | 'test' | 'page' | 'custom'
    template_engine?: 'handlebars' | 'mustache' | 'ejs'
    output_directory: string
    template_config?: any
    naming_convention?: 'camelCase' | 'PascalCase' | 'kebab-case' | 'snake_case'
    include_tests?: boolean
    include_docs?: boolean
  


### src/agents/experts/TemplateLibraryExpert.ts:1202
Context: metadata
Object: generator_type: params.generator_type,
          template_engine: params.template_engine || 'handlebars',
          output_directory: params.output_directory
        


### src/agents/experts/TemplateLibraryExpert.ts:1222
Context: params
Object: project_type: 'react' | 'angular' | 'vue' | 'node' | 'express' | 'typescript' | 'custom'
    project_name: string
    features?: ('typescript' | 'testing' | 'linting' | 'ci-cd' | 'docker' | 'documentation')[]
    package_manager?: 'npm' | 'yarn' | 'pnpm'
    git_integration?: boolean
    license?: 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'BSD-3-Clause' | 'ISC'
    target_directory: string
  


### src/agents/experts/TemplateLibraryExpert.ts:1272
Context: metadata
Object: project_type: params.project_type,
          project_name: params.project_name,
          features: params.features || [],
          target_directory: params.target_directory
        


### src/agents/experts/TemplateLibraryExpert.ts:1293
Context: params
Object: action: 'create' | 'search' | 'update' | 'delete' | 'categorize' | 'export'
    snippet_name?: string
    snippet_content?: string
    category?: 'react' | 'typescript' | 'node' | 'testing' | 'utils' | 'hooks' | 'components'
    tags?: string[]
    language?: 'typescript' | 'javascript' | 'jsx' | 'tsx' | 'css' | 'html' | 'json'
    search_query?: string
    export_format?: 'vscode' | 'sublime' | 'atom' | 'json' | 'markdown'
  


### src/agents/experts/TemplateLibraryExpert.ts:1334
Context: data
Object: action: params.action,
          result,
          library_stats: await this.getLibraryStats(),
          management_tips: [
            'Use descriptive names and tags for easy discovery',
            'Keep snippets focused and atomic',
            'Include usage examples in snippet descriptions',
            'Regularly review and update outdated snippets',
            'Version control your snippet library'
          ]
        


### src/agents/experts/TemplateLibraryExpert.ts:1346
Context: metadata
Object: action: params.action,
          category: params.category,
          language: params.language
        


### src/agents/experts/TemplateLibraryExpert.ts:1366
Context: params
Object: template_path: string
    validation_rules?: ('syntax' | 'variables' | 'structure' | 'naming' | 'security' | 'performance')[]
    template_engine?: 'handlebars' | 'mustache' | 'ejs' | 'nunjucks'
    strict_mode?: boolean
    auto_fix?: boolean
    output_format?: 'detailed' | 'summary' | 'json' | 'junit'
  


### src/agents/experts/TemplateLibraryExpert.ts:1387
Context: summary
Object: totalTemplates: validationResults.totalTemplates,
          validTemplates: validationResults.validTemplates,
          totalIssues: issues.length,
          criticalIssues: issues.filter(issue => issue.severity === 'critical').length,
          fixedIssues: fixableIssues?.fixed.length || 0
        


### src/agents/experts/TemplateLibraryExpert.ts:1401
Context: metadata
Object: template_path: params.template_path,
          validation_rules: params.validation_rules || ['syntax', 'variables', 'structure'],
          template_engine: params.template_engine || 'handlebars'
        


### src/agents/experts/TemplateLibraryExpert.ts:1421
Context: params
Object: action: 'create' | 'update' | 'clone' | 'version' | 'compare' | 'merge'
    boilerplate_name: string
    source_project?: string
    template_variables?: any
    exclusion_patterns?: string[]
    version_tag?: string
    target_frameworks?: ('react' | 'vue' | 'angular' | 'express' | 'fastify' | 'next.js')[]
    customization_options?: any
  


### src/agents/experts/TemplateLibraryExpert.ts:1462
Context: data
Object: action: params.action,
          result,
          boilerplate_info: await this.getBoilerplateInfo(params.boilerplate_name),
          best_practices: [
            'Keep boilerplates minimal and focused',
            'Use semantic versioning for template updates',
            'Document all template variables and their purposes',
            'Test boilerplates across different environments',
            'Provide clear customization instructions'
          ]
        


### src/agents/experts/TemplateLibraryExpert.ts:1474
Context: metadata
Object: action: params.action,
          boilerplate_name: params.boilerplate_name,
          target_frameworks: params.target_frameworks || []
        


### src/agents/experts/TemplateLibraryExpert.ts:1500
Context: generators
Object: [params.generator_type]: config
      


### src/agents/experts/TemplateLibraryExpert.ts:1503
Context: helpers
Object: camelCase: (str: string) => str.replace(/-([a-z])/g, g => g[1].toUpperCase()),
        pascalCase: (str: string) => str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase()),
        kebabCase: (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''),
        snakeCase: (str: string) => str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '')
      


### src/agents/experts/TemplateLibraryExpert.ts:1703
Context: instance
Object: {pascalCase name


### src/agents/experts/TemplateLibraryExpert.ts:1738
Context: prompts
Object: projectName: params.project_name,
        features: params.features || [],
        packageManager: params.package_manager || 'npm',
        license: params.license || 'MIT',
        gitInit: params.git_integration !== false
      


### src/agents/experts/TemplateLibraryExpert.ts:1745
Context: paths
Object: destination: params.target_directory,
        templates: './templates',
        output: `./${params.project_name


### src/agents/experts/TemplateLibraryExpert.ts:1788
Context: scripts
Object: start: 'node dist/index.js',
        build: params.features?.includes('typescript') ? 'tsc' : 'echo "No build step"',
        dev: 'nodemon src/index.ts'
      


### src/agents/experts/TemplateLibraryExpert.ts:1793
Context: dependencies
Object: 


### src/agents/experts/TemplateLibraryExpert.ts:1794
Context: devDependencies
Object: 


### src/agents/experts/TemplateLibraryExpert.ts:2034
Context: differences
Object: files_added: 5,
        files_removed: 2,
        files_modified: 8,
        significant_changes: ['package.json', 'tsconfig.json']
      


### src/agents/experts/SprintManager.ts:45
Context: metadata
Object: 


### src/agents/experts/SecuritySpecialist.ts:65
Context: metadata
Object: 


### src/agents/experts/SecuritySpecialist.ts:74
Context: parameters
Object: action: { type: 'string', required: true, enum: ['scan_file', 'scan_directory', 'scan_code'] 


### src/agents/experts/SecuritySpecialist.ts:76
Context: target
Object: type: 'string', required: true 


### src/agents/experts/SecuritySpecialist.ts:77
Context: scanner
Object: type: 'string', enum: ['bandit', 'semgrep', 'auto'], default: 'auto' 


### src/agents/experts/SecuritySpecialist.ts:78
Context: severity_threshold
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low'], default: 'medium' 


### src/agents/experts/SecuritySpecialist.ts:79
Context: output_format
Object: type: 'string', enum: ['json', 'html', 'sarif', 'text'], default: 'json' 


### src/agents/experts/SecuritySpecialist.ts:80
Context: include_owasp_top10
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:92
Context: parameters
Object: operation: { type: 'string', required: true, enum: ['store', 'retrieve', 'generate', 'validate', 'rotate', 'list', 'delete'] 


### src/agents/experts/SecuritySpecialist.ts:94
Context: credential_id
Object: type: 'string', required: true 


### src/agents/experts/SecuritySpecialist.ts:95
Context: token_type
Object: type: 'string', enum: ['api_key', 'jwt', 'oauth', 'basic_auth', 'custom'], default: 'api_key' 


### src/agents/experts/SecuritySpecialist.ts:96
Context: value
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:97
Context: expires_in
Object: type: 'number', required: false 


### src/agents/experts/SecuritySpecialist.ts:98
Context: jwt_secret
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:99
Context: jwt_algorithm
Object: type: 'string', default: 'HS256' 


### src/agents/experts/SecuritySpecialist.ts:111
Context: parameters
Object: action: { type: 'string', required: true, enum: ['log_event', 'analyze_logs', 'generate_report', 'monitor_threats'] 


### src/agents/experts/SecuritySpecialist.ts:113
Context: event_type
Object: type: 'string', enum: ['authentication', 'authorization', 'data_access', 'configuration_change', 'security_incident'] 


### src/agents/experts/SecuritySpecialist.ts:114
Context: severity
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low', 'info'], default: 'medium' 


### src/agents/experts/SecuritySpecialist.ts:115
Context: details
Object: type: 'object', required: false 


### src/agents/experts/SecuritySpecialist.ts:116
Context: time_range
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:128
Context: parameters
Object: action: { type: 'string', required: true, enum: ['scan_requirements', 'scan_environment', 'check_package', 'monitor_updates'] 


### src/agents/experts/SecuritySpecialist.ts:130
Context: target
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:131
Context: package_name
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:132
Context: include_dev
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:133
Context: severity_filter
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low'], default: 'medium' 


### src/agents/experts/SecuritySpecialist.ts:134
Context: databases
Object: type: 'array', default: ['osv', 'github', 'pyup'] 


### src/agents/experts/SecuritySpecialist.ts:146
Context: parameters
Object: action: { type: 'string', required: true, enum: ['scan_files', 'scan_repository', 'scan_commits', 'validate_patterns'] 


### src/agents/experts/SecuritySpecialist.ts:148
Context: target
Object: type: 'string', required: true 


### src/agents/experts/SecuritySpecialist.ts:149
Context: scan_depth
Object: type: 'string', enum: ['surface', 'deep', 'git_history'], default: 'deep' 


### src/agents/experts/SecuritySpecialist.ts:150
Context: secret_types
Object: type: 'array', default: ['api_keys', 'passwords', 'tokens', 'certificates', 'connection_strings'] 


### src/agents/experts/SecuritySpecialist.ts:151
Context: exclude_patterns
Object: type: 'array', required: false 


### src/agents/experts/SecuritySpecialist.ts:152
Context: high_entropy_threshold
Object: type: 'number', default: 4.5 


### src/agents/experts/SecuritySpecialist.ts:164
Context: parameters
Object: action: { type: 'string', required: true, enum: ['analyze_config', 'test_endpoint', 'validate_certificate', 'check_ciphers'] 


### src/agents/experts/SecuritySpecialist.ts:166
Context: target
Object: type: 'string', required: true 


### src/agents/experts/SecuritySpecialist.ts:167
Context: port
Object: type: 'number', default: 443 


### src/agents/experts/SecuritySpecialist.ts:168
Context: protocols
Object: type: 'array', default: ['TLSv1.2', 'TLSv1.3'] 


### src/agents/experts/SecuritySpecialist.ts:169
Context: check_vulnerabilities
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:170
Context: include_recommendations
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:182
Context: parameters
Object: framework: { type: 'string', enum: ['owasp_asvs', 'cis_controls', 'nist_csf', 'iso27001', 'custom'], default: 'owasp_asvs' 


### src/agents/experts/SecuritySpecialist.ts:184
Context: application_type
Object: type: 'string', enum: ['web_app', 'api', 'mobile_app', 'cloud_service', 'desktop_app'] 


### src/agents/experts/SecuritySpecialist.ts:185
Context: security_level
Object: type: 'string', enum: ['basic', 'standard', 'advanced'], default: 'standard' 


### src/agents/experts/SecuritySpecialist.ts:186
Context: compliance_requirements
Object: type: 'array', required: false 


### src/agents/experts/SecuritySpecialist.ts:187
Context: include_remediation
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:199
Context: parameters
Object: action: { type: 'string', required: true, enum: ['scan_image', 'scan_dockerfile', 'analyze_runtime', 'check_compliance'] 


### src/agents/experts/SecuritySpecialist.ts:201
Context: target
Object: type: 'string', required: true 


### src/agents/experts/SecuritySpecialist.ts:202
Context: scan_layers
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:203
Context: check_secrets
Object: type: 'boolean', default: true 


### src/agents/experts/SecuritySpecialist.ts:204
Context: compliance_frameworks
Object: type: 'array', default: ['cis_docker', 'nist'] 


### src/agents/experts/SecuritySpecialist.ts:205
Context: severity_threshold
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low'], default: 'medium' 


### src/agents/experts/SecuritySpecialist.ts:217
Context: parameters
Object: action: { type: 'string', required: true, enum: ['analyze_code', 'run_security_scan', 'generate_report', 'track_progress'] 


### src/agents/experts/SecuritySpecialist.ts:219
Context: language
Object: type: 'string', enum: ['python', 'javascript', 'java', 'csharp', 'cpp', 'go', 'php', 'ruby'] 


### src/agents/experts/SecuritySpecialist.ts:220
Context: scan_type
Object: type: 'string', enum: ['quick', 'comprehensive', 'targeted'], default: 'comprehensive' 


### src/agents/experts/SecuritySpecialist.ts:221
Context: rule_sets
Object: type: 'array', default: ['owasp_top10', 'cwe_top25', 'security_hotspots'] 


### src/agents/experts/SecuritySpecialist.ts:222
Context: output_format
Object: type: 'string', enum: ['json', 'sarif', 'xml', 'html'], default: 'sarif' 


### src/agents/experts/SecuritySpecialist.ts:234
Context: parameters
Object: action: { type: 'string', required: true, enum: ['search_cve', 'get_details', 'check_product', 'monitor_feeds'] 


### src/agents/experts/SecuritySpecialist.ts:236
Context: query
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:237
Context: cve_id
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:238
Context: product
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:239
Context: severity_filter
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low'], required: false 


### src/agents/experts/SecuritySpecialist.ts:240
Context: date_range
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:252
Context: parameters
Object: action: { type: 'string', required: true, enum: ['analyze_crypto', 'recommend_algorithms', 'validate_implementation', 'generate_keys'] 


### src/agents/experts/SecuritySpecialist.ts:254
Context: crypto_type
Object: type: 'string', enum: ['symmetric', 'asymmetric', 'hashing', 'digital_signature'] 


### src/agents/experts/SecuritySpecialist.ts:255
Context: use_case
Object: type: 'string', enum: ['data_encryption', 'communication', 'authentication', 'key_exchange'] 


### src/agents/experts/SecuritySpecialist.ts:256
Context: security_level
Object: type: 'string', enum: ['standard', 'high', 'quantum_resistant'], default: 'standard' 


### src/agents/experts/SecuritySpecialist.ts:257
Context: compliance
Object: type: 'array', default: ['fips_140_2', 'common_criteria'] 


### src/agents/experts/SecuritySpecialist.ts:269
Context: parameters
Object: action: { type: 'string', required: true, enum: ['query_knowledge', 'update_threats', 'analyze_trends', 'get_recommendations'] 


### src/agents/experts/SecuritySpecialist.ts:271
Context: topic
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:272
Context: threat_type
Object: type: 'string', enum: ['malware', 'phishing', 'apt', 'zero_day', 'insider_threat'] 


### src/agents/experts/SecuritySpecialist.ts:273
Context: industry
Object: type: 'string', required: false 


### src/agents/experts/SecuritySpecialist.ts:274
Context: time_frame
Object: type: 'string', enum: ['24h', '7d', '30d', '90d'], default: '30d' 


### src/agents/experts/RiskManagementExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/PythonExpert.ts:46
Context: metadata
Object: 


### src/agents/experts/PythonExpert.ts:55
Context: parameters
Object: action: { type: 'string', required: true, enum: ['analyze_file', 'analyze_directory', 'analyze_code'] 


### src/agents/experts/PythonExpert.ts:57
Context: file_path
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:58
Context: directory
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:59
Context: code
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:60
Context: include_complexity
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:61
Context: include_duplication
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:62
Context: pep8_strict
Object: type: 'boolean', default: false 


### src/agents/experts/PythonExpert.ts:74
Context: parameters
Object: command: { type: 'string', required: true, enum: ['optimize', 'analyze_complexity', 'lint'], default: 'optimize' 


### src/agents/experts/PythonExpert.ts:76
Context: code
Object: type: 'string', required: true 


### src/agents/experts/PythonExpert.ts:77
Context: language
Object: type: 'string', required: false, enum: ['typescript', 'javascript'], default: 'typescript' 


### src/agents/experts/PythonExpert.ts:78
Context: targetES
Object: type: 'string', required: false, default: 'ES2022' 


### src/agents/experts/PythonExpert.ts:79
Context: includeESLint
Object: type: 'boolean', required: false, default: true 


### src/agents/experts/PythonExpert.ts:91
Context: parameters
Object: action: { type: 'string', required: true, enum: ['analyze', 'suggest', 'add', 'validate'] 


### src/agents/experts/PythonExpert.ts:93
Context: file_path
Object: type: 'string', required: true 


### src/agents/experts/PythonExpert.ts:94
Context: fix
Object: type: 'boolean', default: false 


### src/agents/experts/PythonExpert.ts:95
Context: level
Object: type: 'string', enum: ['partial', 'complete', 'strict'], default: 'complete' 


### src/agents/experts/PythonExpert.ts:96
Context: include_tests
Object: type: 'boolean', default: false 


### src/agents/experts/PythonExpert.ts:97
Context: use_mypy
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:98
Context: use_pyright
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:110
Context: parameters
Object: action: { type: 'string', required: true, enum: ['scan_file', 'scan_directory', 'analyze_code'] 


### src/agents/experts/PythonExpert.ts:112
Context: file_path
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:113
Context: directory
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:114
Context: code
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:115
Context: scan_type
Object: type: 'string', enum: ['quick', 'standard', 'deep'], default: 'standard' 


### src/agents/experts/PythonExpert.ts:116
Context: severity_filter
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low', 'info'], default: 'medium' 


### src/agents/experts/PythonExpert.ts:117
Context: output_format
Object: type: 'string', enum: ['json', 'html', 'sarif', 'text'], default: 'json' 


### src/agents/experts/PythonExpert.ts:129
Context: parameters
Object: action: { type: 'string', required: true, enum: ['scan_requirements', 'scan_environment', 'check_package'] 


### src/agents/experts/PythonExpert.ts:131
Context: requirements_file
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:132
Context: package_name
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:133
Context: include_dev
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:134
Context: severity_threshold
Object: type: 'string', enum: ['critical', 'high', 'medium', 'low'], default: 'medium' 


### src/agents/experts/PythonExpert.ts:146
Context: parameters
Object: action: { type: 'string', required: true, enum: ['profile_file', 'profile_function', 'memory_profile'] 


### src/agents/experts/PythonExpert.ts:148
Context: file_path
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:149
Context: function_name
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:150
Context: iterations
Object: type: 'number', default: 1000 


### src/agents/experts/PythonExpert.ts:151
Context: include_memory
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:152
Context: generate_report
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:164
Context: parameters
Object: action: { type: 'string', required: true, enum: ['analyze_error', 'debug_code', 'trace_execution'] 


### src/agents/experts/PythonExpert.ts:166
Context: error_message
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:167
Context: stack_trace
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:168
Context: code
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:169
Context: context
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:181
Context: parameters
Object: action: { type: 'string', required: true, enum: ['recommend_for_task', 'analyze_alternatives', 'upgrade_suggestions'] 


### src/agents/experts/PythonExpert.ts:183
Context: task_description
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:184
Context: current_libraries
Object: type: 'array', required: false 


### src/agents/experts/PythonExpert.ts:185
Context: python_version
Object: type: 'string', default: '3.11' 


### src/agents/experts/PythonExpert.ts:186
Context: project_type
Object: type: 'string', enum: ['web', 'data_science', 'cli', 'api', 'desktop'], required: false 


### src/agents/experts/PythonExpert.ts:198
Context: parameters
Object: action: { type: 'string', required: true, enum: ['generate_docstrings', 'create_api_docs', 'update_readme'] 


### src/agents/experts/PythonExpert.ts:200
Context: file_path
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:201
Context: directory
Object: type: 'string', required: false 


### src/agents/experts/PythonExpert.ts:202
Context: style
Object: type: 'string', enum: ['google', 'numpy', 'sphinx'], default: 'google' 


### src/agents/experts/PythonExpert.ts:203
Context: include_examples
Object: type: 'boolean', default: true 


### src/agents/experts/PythonExpert.ts:204
Context: output_format
Object: type: 'string', enum: ['markdown', 'rst', 'html'], default: 'markdown' 


### src/agents/experts/ProjectPlanningExpert.ts:58
Context: metadata
Object: documentFormats: ['Markdown', 'PDF', 'HTML', 'Word'],
      diagramTypes: ['Architecture', 'Flow', 'Timeline', 'Risk Matrix'],
      templateTypes: ['PDR', 'ADR', 'Risk Assessment', 'Requirements']
    


### src/agents/experts/ProjectPlanningExpert.ts:76
Context: parameters
Object: type: 'object',
          properties: {
            document_type: {
              type: 'string',
              enum: ['pdr', 'adr', 'requirements', 'risk-assessment', 'project-plan', 'custom'],
              description: 'Type of document to generate'
            


### src/agents/experts/ProjectPlanningExpert.ts:84
Context: template_params
Object: type: 'object',
              description: 'Parameters to fill the template',
              properties: {
                project_name: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:89
Context: executive_summary
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:90
Context: problem_statement
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:91
Context: proposed_solution
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:92
Context: risks
Object: type: 'array', items: { type: 'object' 


### src/agents/experts/ProjectPlanningExpert.ts:93
Context: requirements
Object: type: 'array', items: { type: 'object' 


### src/agents/experts/ProjectPlanningExpert.ts:94
Context: architecture_details
Object: type: 'object' 


### src/agents/experts/ProjectPlanningExpert.ts:97
Context: export_formats
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['markdown', 'pdf', 'html', 'word']
              


### src/agents/experts/ProjectPlanningExpert.ts:105
Context: styling_options
Object: type: 'object',
              properties: {
                theme: { type: 'string', enum: ['default', 'professional', 'minimal', 'technical'] 


### src/agents/experts/ProjectPlanningExpert.ts:109
Context: include_toc
Object: type: 'boolean', default: true 


### src/agents/experts/ProjectPlanningExpert.ts:110
Context: include_page_numbers
Object: type: 'boolean', default: true 


### src/agents/experts/ProjectPlanningExpert.ts:113
Context: version_control
Object: type: 'object',
              properties: {
                track_changes: { type: 'boolean' 


### src/agents/experts/ProjectPlanningExpert.ts:117
Context: version_number
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:118
Context: changelog
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:129
Context: parameters
Object: type: 'object',
          properties: {
            diagram_type: {
              type: 'string',
              enum: ['architecture', 'flowchart', 'timeline', 'risk-matrix', 'org-chart', 'decision-tree'],
              description: 'Type of diagram to create'
            


### src/agents/experts/ProjectPlanningExpert.ts:137
Context: diagram_data
Object: type: 'object',
              properties: {
                nodes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:146
Context: label
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:147
Context: type
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:148
Context: metadata
Object: type: 'object' 


### src/agents/experts/ProjectPlanningExpert.ts:152
Context: connections
Object: type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      from: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:158
Context: to
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:159
Context: label
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:160
Context: type
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:164
Context: layout
Object: type: 'string',
                  enum: ['hierarchical', 'circular', 'grid', 'force-directed']
                


### src/agents/experts/ProjectPlanningExpert.ts:170
Context: format_options
Object: type: 'object',
              properties: {
                output_format: {
                  type: 'string',
                  enum: ['svg', 'png', 'mermaid', 'plantuml', 'd2']
                


### src/agents/experts/ProjectPlanningExpert.ts:177
Context: size
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:178
Context: color_scheme
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:181
Context: interactive
Object: type: 'boolean',
              description: 'Create interactive diagram with navigation',
              default: false
            


### src/agents/experts/ProjectPlanningExpert.ts:194
Context: parameters
Object: type: 'object',
          properties: {
            risks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:203
Context: description
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:204
Context: category
Object: type: 'string',
                    enum: ['technical', 'schedule', 'resource', 'external', 'business']
                  


### src/agents/experts/ProjectPlanningExpert.ts:208
Context: probability
Object: type: 'number',
                    minimum: 0,
                    maximum: 1,
                    description: 'Probability between 0 and 1'
                  


### src/agents/experts/ProjectPlanningExpert.ts:214
Context: impact
Object: type: 'number',
                    minimum: 1,
                    maximum: 10,
                    description: 'Impact score from 1 to 10'
                  


### src/agents/experts/ProjectPlanningExpert.ts:220
Context: mitigation_strategies
Object: type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        strategy: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:226
Context: cost
Object: type: 'number' 


### src/agents/experts/ProjectPlanningExpert.ts:227
Context: effectiveness
Object: type: 'number' 


### src/agents/experts/ProjectPlanningExpert.ts:234
Context: analysis_type
Object: type: 'string',
              enum: ['simple', 'monte-carlo', 'sensitivity', 'scenario'],
              default: 'simple'
            


### src/agents/experts/ProjectPlanningExpert.ts:239
Context: simulation_params
Object: type: 'object',
              properties: {
                iterations: { type: 'number', default: 1000 


### src/agents/experts/ProjectPlanningExpert.ts:243
Context: confidence_level
Object: type: 'number', default: 0.95 


### src/agents/experts/ProjectPlanningExpert.ts:246
Context: cost_benefit_analysis
Object: type: 'boolean',
              description: 'Perform cost-benefit analysis for mitigation strategies',
              default: true
            


### src/agents/experts/ProjectPlanningExpert.ts:251
Context: risk_appetite
Object: type: 'object',
              properties: {
                technical: { type: 'number' 


### src/agents/experts/ProjectPlanningExpert.ts:255
Context: schedule
Object: type: 'number' 


### src/agents/experts/ProjectPlanningExpert.ts:256
Context: budget
Object: type: 'number' 


### src/agents/experts/ProjectPlanningExpert.ts:267
Context: parameters
Object: type: 'object',
          properties: {
            requirements_source: {
              type: 'string',
              description: 'Natural language requirements text or document'
            


### src/agents/experts/ProjectPlanningExpert.ts:274
Context: parsing_mode
Object: type: 'string',
              enum: ['natural-language', 'structured', 'hybrid'],
              default: 'natural-language'
            


### src/agents/experts/ProjectPlanningExpert.ts:279
Context: requirement_types
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['functional', 'non-functional', 'technical', 'business', 'constraint']
              


### src/agents/experts/ProjectPlanningExpert.ts:286
Context: priority_analysis
Object: type: 'boolean',
              description: 'Analyze and assign priorities',
              default: true
            


### src/agents/experts/ProjectPlanningExpert.ts:291
Context: traceability_options
Object: type: 'object',
              properties: {
                link_to_features: { type: 'boolean' 


### src/agents/experts/ProjectPlanningExpert.ts:295
Context: link_to_tests
Object: type: 'boolean' 


### src/agents/experts/ProjectPlanningExpert.ts:296
Context: link_to_risks
Object: type: 'boolean' 


### src/agents/experts/ProjectPlanningExpert.ts:299
Context: validation_rules
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  rule_type: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:305
Context: criteria
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:309
Context: output_format
Object: type: 'string',
              enum: ['structured-json', 'requirements-matrix', 'user-stories', 'test-cases'],
              default: 'structured-json'
            


### src/agents/experts/ProjectPlanningExpert.ts:322
Context: parameters
Object: type: 'object',
          properties: {
            architecture_decision: {
              type: 'object',
              properties: {
                title: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:329
Context: context
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:330
Context: decision
Object: type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:331
Context: alternatives
Object: type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:337
Context: pros
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:338
Context: cons
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:342
Context: consequences
Object: type: 'object',
                  properties: {
                    positive: { type: 'array', items: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:346
Context: negative
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:347
Context: risks
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:352
Context: validation_criteria
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['scalability', 'performance', 'security', 'maintainability', 'cost', 'complexity']
              


### src/agents/experts/ProjectPlanningExpert.ts:359
Context: compliance_standards
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ProjectPlanningExpert.ts:364
Context: trade_off_analysis
Object: type: 'object',
              properties: {
                weights: {
                  type: 'object',
                  description: 'Criteria weights for scoring'
                


### src/agents/experts/ProjectPlanningExpert.ts:371
Context: quantitative_metrics
Object: type: 'boolean' 


### src/agents/experts/ProjectPlanningExpert.ts:374
Context: adr_format
Object: type: 'string',
              enum: ['madr', 'y-statements', 'custom'],
              default: 'madr'
            


### src/agents/experts/ProjectPlanningExpert.ts:447
Context: data
Object: document_content: styledDocument,
          exports: exports,
          metadata: {
            document_type: params.document_type,
            word_count: styledDocument.split(' ').length,
            sections: this.extractSections(styledDocument),
            version: versionInfo?.version || '1.0.0'
          


### src/agents/experts/ProjectPlanningExpert.ts:456
Context: preview
Object: html: exports.find(e => e.format === 'html')?.preview,
            pdf_url: exports.find(e => e.format === 'pdf')?.url
          


### src/agents/experts/ProjectPlanningExpert.ts:461
Context: metadata
Object: document_type: params.document_type,
          export_formats: params.export_formats || ['markdown']
        


### src/agents/experts/ProjectPlanningExpert.ts:499
Context: data
Object: diagram: formattedDiagram,
          raw_definition: diagram.definition,
          interactive_url: interactiveDiagram?.url,
          metadata: {
            node_count: params.diagram_data.nodes?.length || 0,
            connection_count: params.diagram_data.connections?.length || 0,
            diagram_type: params.diagram_type
          


### src/agents/experts/ProjectPlanningExpert.ts:511
Context: metadata
Object: diagram_type: params.diagram_type,
          output_format: params.format_options?.output_format || 'svg'
        


### src/agents/experts/ProjectPlanningExpert.ts:562
Context: data
Object: risk_summary: {
            total_risks: params.risks.length,
            high_risks: riskScores.filter(r => r.severity === 'high').length,
            medium_risks: riskScores.filter(r => r.severity === 'medium').length,
            low_risks: riskScores.filter(r => r.severity === 'low').length
          


### src/agents/experts/ProjectPlanningExpert.ts:576
Context: metadata
Object: analysis_type: params.analysis_type || 'simple',
          simulation_iterations: params.simulation_params?.iterations
        


### src/agents/experts/ProjectPlanningExpert.ts:636
Context: data
Object: requirements: formattedOutput,
          summary: {
            total_requirements: prioritizedRequirements.length,
            by_type: this.groupRequirementsByType(prioritizedRequirements),
            by_priority: this.groupRequirementsByPriority(prioritizedRequirements)
          


### src/agents/experts/ProjectPlanningExpert.ts:648
Context: metadata
Object: parsing_mode: params.parsing_mode || 'natural-language',
          output_format: params.output_format || 'structured-json'
        


### src/agents/experts/ProjectPlanningExpert.ts:703
Context: data
Object: validation_results: validationResults,
          compliance_results: complianceResults,
          trade_off_analysis: tradeOffAnalysis,
          adr_document: adr,
          impact_assessment: impactAssessment,
          recommendations: await this.generateArchitectureRecommendations(validationResults),
          decision_score: await this.calculateDecisionScore(tradeOffAnalysis)
        


### src/agents/experts/ProjectPlanningExpert.ts:712
Context: metadata
Object: adr_format: params.adr_format || 'madr',
          validation_criteria: params.validation_criteria || ['scalability', 'performance', 'security']
        


### src/agents/experts/ProjectPlanningExpert.ts:742
Context: Review
Object: project_name


### src/agents/experts/ProjectPlanningExpert.ts:800
Context: Assessment
Object: project_name


### src/agents/experts/ProjectPlanningExpert.ts:819
Context: Document
Object: project_name


### src/agents/experts/ProjectPlanningExpert.ts:838
Context: Plan
Object: project_name


### src/agents/experts/ProjectPlanningExpert.ts:960
Context: professional
Object: header: '---\ntitle: {title


### src/agents/experts/ProjectPlanningExpert.ts:961
Context: nauthor
Object: author


### src/agents/experts/ProjectPlanningExpert.ts:961
Context: ndate
Object: date


### src/agents/experts/ProjectPlanningExpert.ts:963
Context: minimal
Object: // Minimal formatting
      


### src/agents/experts/ProjectPlanningExpert.ts:966
Context: technical
Object: // Technical documentation formatting
      


### src/agents/experts/ProjectPlanningExpert.ts:1314
Context: percentiles
Object: p5: this.percentile(results, 0.05),
        p50: this.percentile(results, 0.50),
        p95: this.percentile(results, 0.95)
      


### src/agents/experts/ProjectPlanningExpert.ts:1444
Context: legend
Object: x_axis: 'Probability (0-1)',
        y_axis: 'Impact (1-10)',
        colors: {
          red: 'High Risk (> 0.6)',
          yellow: 'Medium Risk (0.3-0.6)',
          green: 'Low Risk (< 0.3)'
        


### src/agents/experts/ProjectPlanningExpert.ts:1627
Context: classification
Object: primary_type: determinedType,
          secondary_types: this.getSecondaryTypes(req, types),
          characteristics: this.getRequirementCharacteristics(req)
        


### src/agents/experts/ProjectPlanningExpert.ts:1715
Context: priority_analysis
Object: stated_priority: req.priority,
        calculated_priority: this.calculatePriority(req),
        factors: this.getPriorityFactors(req),
        dependencies: this.identifyDependencies(req, requirements)
      


### src/agents/experts/ProjectPlanningExpert.ts:1787
Context: links
Object: features: options.link_to_features ? this.linkToFeatures(r) : [],
          tests: options.link_to_tests ? this.linkToTests(r) : [],
          risks: options.link_to_risks ? this.linkToRisks(r) : []
        


### src/agents/experts/ProjectPlanningExpert.ts:1793
Context: coverage
Object: features: options.link_to_features ? this.calculateCoverage('features') : null,
        tests: options.link_to_tests ? this.calculateCoverage('tests') : null,
        risks: options.link_to_risks ? this.calculateCoverage('risks') : null
      


### src/agents/experts/ProjectPlanningExpert.ts:1902
Context: metadata
Object: total_count: requirements.length,
        format: 'structured-json',
        generated_at: new Date().toISOString()
      


### src/agents/experts/ProjectPlanningExpert.ts:2308
Context: technical_impact
Object: development_effort: 'Medium - 3-4 sprints',
        learning_curve: 'Low - team familiar with technologies',
        integration_complexity: 'Medium - some service boundaries to define'
      


### src/agents/experts/ProjectPlanningExpert.ts:2313
Context: business_impact
Object: time_to_market: 'Positive - enables faster feature delivery',
        operational_cost: 'Neutral - slight increase offset by benefits',
        scalability: 'Positive - supports 10x growth'
      


### src/agents/experts/ProjectPlanningExpert.ts:2318
Context: risk_impact
Object: technical_debt: 'Low - clean architecture reduces debt',
        vendor_lock_in: 'Medium - some cloud-specific services',
        security: 'Positive - improved security posture'
      


### src/agents/experts/ProjectOrganizationExpert.ts:50
Context: metadata
Object: constraints: [
        'Follow language-specific best practices and conventions',
        'Ensure cross-platform compatibility when possible',
        'Maintain clean separation of concerns',
        'Document all organizational decisions',
        'Consider team collaboration requirements'
      ]
    


### src/agents/experts/ProjectOrganizationExpert.ts:72
Context: parameters
Object: type: 'object',
          properties: {
            project_name: {
              type: 'string',
              description: 'Name of the project'
            


### src/agents/experts/ProjectOrganizationExpert.ts:79
Context: project_type
Object: type: 'string',
              enum: ['ai', 'api', 'automation', 'library', 'monorepo'],
              description: 'Type of project to structure'
            


### src/agents/experts/ProjectOrganizationExpert.ts:84
Context: complexity
Object: type: 'string',
              enum: ['simple', 'medium', 'complex'],
              description: 'Project complexity level'
            


### src/agents/experts/ProjectOrganizationExpert.ts:89
Context: language
Object: type: 'string',
              enum: ['typescript', 'python', 'javascript', 'golang'],
              description: 'Primary programming language'
            


### src/agents/experts/ProjectOrganizationExpert.ts:94
Context: features
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ProjectOrganizationExpert.ts:107
Context: parameters
Object: type: 'object',
          properties: {
            config_type: {
              type: 'string',
              enum: ['package_json', 'pyproject_toml', 'tsconfig', 'env_files'],
              description: 'Type of configuration to analyze'
            


### src/agents/experts/ProjectOrganizationExpert.ts:115
Context: environment
Object: type: 'string',
              enum: ['development', 'staging', 'production'],
              description: 'Target environment'
            


### src/agents/experts/ProjectOrganizationExpert.ts:120
Context: validation_rules
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ProjectOrganizationExpert.ts:133
Context: parameters
Object: type: 'object',
          properties: {
            analysis_type: {
              type: 'string',
              enum: ['security', 'versions', 'conflicts', 'optimization'],
              description: 'Type of dependency analysis to perform'
            


### src/agents/experts/ProjectOrganizationExpert.ts:141
Context: package_manager
Object: type: 'string',
              enum: ['npm', 'yarn', 'pnpm', 'pip', 'poetry'],
              description: 'Package manager being used'
            


### src/agents/experts/ProjectOrganizationExpert.ts:146
Context: include_dev_dependencies
Object: type: 'boolean',
              description: 'Whether to include dev dependencies in analysis'
            


### src/agents/experts/ProjectOrganizationExpert.ts:158
Context: parameters
Object: type: 'object',
          properties: {
            template_type: {
              type: 'string',
              enum: ['starter', 'component', 'service', 'library'],
              description: 'Type of template to generate'
            


### src/agents/experts/ProjectOrganizationExpert.ts:166
Context: framework
Object: type: 'string',
              description: 'Framework or technology stack'
            


### src/agents/experts/ProjectOrganizationExpert.ts:170
Context: customizations
Object: type: 'object',
              description: 'Custom template options'
            


### src/agents/experts/ProjectOrganizationExpert.ts:182
Context: parameters
Object: type: 'object',
          properties: {
            cleanup_type: {
              type: 'string',
              enum: ['unused_files', 'unused_dependencies', 'build_artifacts', 'test_files', 'archive_old', 'comprehensive'],
              description: 'Type of cleanup to perform'
            


### src/agents/experts/ProjectOrganizationExpert.ts:190
Context: project_path
Object: type: 'string',
              description: 'Path to the project directory to clean'
            


### src/agents/experts/ProjectOrganizationExpert.ts:194
Context: dry_run
Object: type: 'boolean',
              description: 'Preview changes without actually deleting files',
              default: true
            


### src/agents/experts/ProjectOrganizationExpert.ts:199
Context: patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ProjectOrganizationExpert.ts:204
Context: preserve_patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ProjectOrganizationExpert.ts:209
Context: archive_threshold_days
Object: type: 'number',
              description: 'Archive files older than this many days',
              default: 90
            


### src/agents/experts/ProjectOrganizationExpert.ts:329
Context: data
Object: structure,
          recommendations: this.getStructureRecommendations(project_type, complexity),
          setup_instructions: this.getSetupInstructions(language, features)
        


### src/agents/experts/ProjectOrganizationExpert.ts:334
Context: metadata
Object: project_name,
          project_type,
          complexity,
          language,
          features
        


### src/agents/experts/ProjectOrganizationExpert.ts:364
Context: data
Object: template: configTemplate,
          validation: validationResults,
          best_practices: this.getConfigBestPractices(config_type),
          environment_specific: this.getEnvironmentSpecificConfig(config_type, environment)
        


### src/agents/experts/ProjectOrganizationExpert.ts:370
Context: metadata
Object: config_type,
          environment,
          validation_rules
        


### src/agents/experts/ProjectOrganizationExpert.ts:397
Context: data
Object: analysis,
          recommendations: this.getDependencyRecommendations(analysis_type),
          security_report: this.getSecurityReport(analysis_type),
          update_strategy: this.getUpdateStrategy(package_manager)
        


### src/agents/experts/ProjectOrganizationExpert.ts:403
Context: metadata
Object: analysis_type,
          package_manager,
          include_dev_dependencies
        


### src/agents/experts/ProjectOrganizationExpert.ts:431
Context: data
Object: template,
          usage_instructions: usage,
          customization_options: this.getCustomizationOptions(template_type),
          examples: this.getTemplateExamples(template_type, framework)
        


### src/agents/experts/ProjectOrganizationExpert.ts:437
Context: metadata
Object: template_type,
          framework,
          customizations
        


### src/agents/experts/ProjectOrganizationExpert.ts:478
Context: data
Object: cleanup_result: cleanupResult,
          summary: this.generateCleanupSummary(cleanupResult)
        


### src/agents/experts/ProjectOrganizationExpert.ts:482
Context: metadata
Object: cleanup_type,
          project_path,
          dry_run,
          patterns,
          preserve_patterns,
          archive_threshold_days,
          execution_time: cleanupResult.executionTime
        


### src/agents/experts/ProjectOrganizationExpert.ts:510
Context: typescript
Object: ai: this.getTypescriptAIStructure(projectName, complexity, features),
        api: this.getTypescriptAPIStructure(projectName, complexity, features),
        automation: this.getTypescriptAutomationStructure(projectName, complexity, features),
        library: this.getTypescriptLibraryStructure(projectName, complexity, features),
        monorepo: this.getTypescriptMonorepoStructure(projectName, complexity, features)
      


### src/agents/experts/ProjectOrganizationExpert.ts:517
Context: python
Object: ai: this.getPythonAIStructure(projectName, complexity, features),
        api: this.getPythonAPIStructure(projectName, complexity, features),
        automation: this.getPythonAutomationStructure(projectName, complexity, features),
        library: this.getPythonLibraryStructure(projectName, complexity, features)
      


### src/agents/experts/ProjectOrganizationExpert.ts:907
Context: development
Object: debug: true,
        hot_reload: true
      


### src/agents/experts/ProjectOrganizationExpert.ts:911
Context: production
Object: debug: false,
        optimize: true,
        minify: true
      


### src/agents/experts/ProjectOrganizationExpert.ts:960
Context: automation
Object: [`${packageManager


### src/agents/experts/PowerAutomateExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/PerformanceOptimizationExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/N8NIntegrationExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/MultiProjectManager.ts:45
Context: metadata
Object: 


### src/agents/experts/MasterOrchestrator.ts:115
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.3, // Lower temperature for more deterministic routing decisions
        maxTokens: 4096
      


### src/agents/experts/MasterOrchestrator.ts:143
Context: metadata
Object: migrationVersion: '2.0.0',
        pattern: 'MO-Expert Hybrid',
        ragEnabled: true,
        lastMigrated: new Date().toISOString(),
        nativeTypeScript: true,
        aiEnhanced: true
      


### src/agents/experts/MasterOrchestrator.ts:152
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/MasterOrchestrator.ts:209
Context: parameters
Object: type: 'object',
          properties: {
            query: { 
              type: 'string', 
              description: 'The user query to analyze' 
            


### src/agents/experts/MasterOrchestrator.ts:216
Context: context
Object: type: 'object', 
              description: 'Optional conversation context',
              optional: true
            


### src/agents/experts/MasterOrchestrator.ts:224
Context: params
Object: query: string; _context?: any 


### src/agents/experts/MasterOrchestrator.ts:231
Context: parameters
Object: type: 'object',
          properties: {
            parsed_query: { 
              type: 'object', 
              description: 'The parsed query analysis result' 
            


### src/agents/experts/MasterOrchestrator.ts:238
Context: strategy
Object: type: 'string', 
              enum: ['optimal', 'fastest', 'comprehensive'],
              description: 'Routing strategy to use',
              default: 'optimal'
            


### src/agents/experts/MasterOrchestrator.ts:247
Context: params
Object: parsed_query: ParsedQuery; _strategy?: string 


### src/agents/experts/MasterOrchestrator.ts:254
Context: parameters
Object: type: 'object',
          properties: {
            message: { 
              type: 'object', 
              description: 'The message to send',
              properties: {
                content: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:262
Context: recipients
Object: type: 'array', 
                  items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:266
Context: pattern
Object: type: 'string',
                  enum: ['broadcast', 'direct', 'chain', 'hierarchical']
                


### src/agents/experts/MasterOrchestrator.ts:270
Context: messageType
Object: type: 'string',
                  enum: ['query', 'response', 'context_update']
                


### src/agents/experts/MasterOrchestrator.ts:276
Context: timeout
Object: type: 'number', 
              description: 'Timeout in milliseconds',
              default: 30000
            


### src/agents/experts/MasterOrchestrator.ts:284
Context: params
Object: message: CrossAgentMessage; _timeout?: number 


### src/agents/experts/MasterOrchestrator.ts:291
Context: parameters
Object: type: 'object',
          properties: {
            query: { 
              type: 'string', 
              description: 'The user query' 
            


### src/agents/experts/MasterOrchestrator.ts:298
Context: query_history
Object: type: 'array', 
              description: 'Previous queries in the session',
              optional: true
            


### src/agents/experts/MasterOrchestrator.ts:303
Context: user_profile
Object: type: 'object', 
              description: 'User preferences and history',
              optional: true
            


### src/agents/experts/MasterOrchestrator.ts:311
Context: params
Object: query: string; query_history?: any[]; user_profile?: any 


### src/agents/experts/MasterOrchestrator.ts:324
Context: parameters
Object: type: 'object',
          properties: {
            query: { 
              type: 'string', 
              description: 'The user query to interpret' 
            


### src/agents/experts/MasterOrchestrator.ts:331
Context: context
Object: type: 'object', 
              description: 'Optional conversation context',
              optional: true
            


### src/agents/experts/MasterOrchestrator.ts:339
Context: params
Object: query: string; _context?: any 


### src/agents/experts/MasterOrchestrator.ts:354
Context: metadata
Object: toolName: 'interpret_request_ai',
                aiPowered: true,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:365
Context: metadata
Object: toolName: 'interpret_request_ai' 


### src/agents/experts/MasterOrchestrator.ts:373
Context: parameters
Object: type: 'object',
          properties: {
            intent: { 
              type: 'object', 
              description: 'The request intent from AI interpretation' 
            


### src/agents/experts/MasterOrchestrator.ts:383
Context: params
Object: intent: any 


### src/agents/experts/MasterOrchestrator.ts:406
Context: metadata
Object: toolName: 'decompose_tasks_ai',
                aiPowered: true,
                taskCount: tasks.length,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:418
Context: metadata
Object: toolName: 'decompose_tasks_ai' 


### src/agents/experts/MasterOrchestrator.ts:426
Context: parameters
Object: type: 'object',
          properties: {
            results: { 
              type: 'array', 
              description: 'Array of expert results to evaluate',
              items: { type: 'object' 


### src/agents/experts/MasterOrchestrator.ts:437
Context: params
Object: results: ExpertResult[] 


### src/agents/experts/MasterOrchestrator.ts:449
Context: metadata
Object: toolName: 'evaluate_quality_ai',
                aiPowered: true,
                evaluatedResults: params.results.length,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:461
Context: metadata
Object: toolName: 'evaluate_quality_ai' 


### src/agents/experts/MasterOrchestrator.ts:469
Context: parameters
Object: type: 'object',
          properties: {
            request_intent: {
              type: 'object',
              description: 'The request intent from AI interpretation',
              properties: {
                primaryGoal: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:477
Context: subGoals
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:478
Context: constraints
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:479
Context: requiredExperts
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:480
Context: complexity
Object: type: 'string', enum: ['low', 'medium', 'high'] 


### src/agents/experts/MasterOrchestrator.ts:481
Context: urgency
Object: type: 'string', enum: ['low', 'medium', 'high'] 


### src/agents/experts/MasterOrchestrator.ts:482
Context: confidence
Object: type: 'number', minimum: 0, maximum: 1 


### src/agents/experts/MasterOrchestrator.ts:486
Context: complexity_level
Object: type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Complexity level for outcome specification detail',
              default: 'medium'
            


### src/agents/experts/MasterOrchestrator.ts:492
Context: user_context
Object: type: 'object',
              description: 'Additional user context and preferences',
              optional: true
            


### src/agents/experts/MasterOrchestrator.ts:497
Context: specification_depth
Object: type: 'string',
              enum: ['basic', 'detailed', 'comprehensive'],
              description: 'Level of detail in outcome specification',
              default: 'detailed'
            


### src/agents/experts/MasterOrchestrator.ts:506
Context: params
Object: request_intent: RequestIntent
          complexity_level?: 'low' | 'medium' | 'high'
          user_context?: any
          specification_depth?: 'basic' | 'detailed' | 'comprehensive'
        


### src/agents/experts/MasterOrchestrator.ts:523
Context: metadata
Object: toolName: 'outcome_specification_generator',
                aiPowered: true,
                specificationDepth: params.specification_depth || 'detailed',
                complexityLevel: params.complexity_level || 'medium',
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:536
Context: metadata
Object: toolName: 'outcome_specification_generator' 


### src/agents/experts/MasterOrchestrator.ts:544
Context: parameters
Object: type: 'object',
          properties: {
            expected_outcome: {
              type: 'object',
              description: 'The expected outcome specification from outcome_specification_generator',
              properties: {
                primary_goal: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:552
Context: secondary_goals
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:553
Context: deliverable_specifications
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:554
Context: quality_requirements
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:555
Context: constraints
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:556
Context: success_metrics
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:557
Context: estimated_complexity
Object: type: 'string', enum: ['low', 'medium', 'high'] 


### src/agents/experts/MasterOrchestrator.ts:561
Context: available_experts
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:571
Context: execution_preferences
Object: type: 'object',
              description: 'Preferences for task execution strategy',
              properties: {
                prefer_parallel: { type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:576
Context: max_concurrent_tasks
Object: type: 'number', default: 3 


### src/agents/experts/MasterOrchestrator.ts:577
Context: quality_gate_frequency
Object: type: 'string', enum: ['minimal', 'standard', 'comprehensive'], default: 'standard' 


### src/agents/experts/MasterOrchestrator.ts:578
Context: fallback_strategy
Object: type: 'string', enum: ['graceful', 'strict', 'adaptive'], default: 'adaptive' 


### src/agents/experts/MasterOrchestrator.ts:582
Context: user_context
Object: type: 'object',
              description: 'Additional user context and preferences',
              optional: true
            


### src/agents/experts/MasterOrchestrator.ts:590
Context: params
Object: expected_outcome: ExpectedOutcome
          available_experts?: string[]
          execution_preferences?: {
            prefer_parallel?: boolean
            max_concurrent_tasks?: number
            quality_gate_frequency?: 'minimal' | 'standard' | 'comprehensive'
            fallback_strategy?: 'graceful' | 'strict' | 'adaptive'
          


### src/agents/experts/MasterOrchestrator.ts:612
Context: metadata
Object: toolName: 'task_lifecycle_manager',
                aiPowered: true,
                taskCount: taskPlan.task_breakdown.length,
                estimatedDuration: taskPlan.estimated_total_duration,
                executionStrategy: taskPlan.execution_strategy,
                qualityGates: taskPlan.quality_gates.length,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:627
Context: metadata
Object: toolName: 'task_lifecycle_manager' 


### src/agents/experts/MasterOrchestrator.ts:635
Context: parameters
Object: type: 'object',
          properties: {
            task_plan: {
              type: 'object',
              description: 'The task plan from task_lifecycle_manager',
              properties: {
                plan_id: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:643
Context: primary_objective
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:644
Context: task_breakdown
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:645
Context: execution_strategy
Object: type: 'string', enum: ['sequential', 'parallel', 'hybrid'] 


### src/agents/experts/MasterOrchestrator.ts:646
Context: estimated_total_duration
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:647
Context: critical_path
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:648
Context: quality_gates
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:652
Context: coordination_preferences
Object: type: 'object',
              description: 'Preferences for expert coordination and communication',
              properties: {
                communication_pattern: { 
                  type: 'string', 
                  enum: ['broadcast', 'direct', 'chain', 'hierarchical'],
                  default: 'hierarchical'
                


### src/agents/experts/MasterOrchestrator.ts:661
Context: progress_reporting_frequency
Object: type: 'string',
                  enum: ['real-time', 'milestone', 'completion'],
                  default: 'milestone'
                


### src/agents/experts/MasterOrchestrator.ts:666
Context: conflict_resolution_strategy
Object: type: 'string',
                  enum: ['consensus', 'authority', 'expertise', 'hybrid'],
                  default: 'expertise'
                


### src/agents/experts/MasterOrchestrator.ts:671
Context: handoff_validation
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:672
Context: context_preservation
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:676
Context: execution_context
Object: type: 'object',
              description: 'Additional context for task execution',
              properties: {
                session_id: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:681
Context: user_preferences
Object: type: 'object' 


### src/agents/experts/MasterOrchestrator.ts:682
Context: deadline_constraints
Object: type: 'object' 


### src/agents/experts/MasterOrchestrator.ts:683
Context: resource_limitations
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:690
Context: params
Object: task_plan: TaskPlan
          coordination_preferences?: {
            communication_pattern?: 'broadcast' | 'direct' | '_chain' | 'hierarchical'
            progress_reporting_frequency?: 'real-_time' | 'milestone' | 'completion'
            conflict_resolution_strategy?: 'consensus' | 'authority' | '_expertise' | 'hybrid'
            handoff_validation?: boolean
            context_preservation?: boolean
          


### src/agents/experts/MasterOrchestrator.ts:717
Context: metadata
Object: toolName: 'expert_coordination_hub',
                aiPowered: true,
                planId: coordinationPlan.coordination_id,
                expertsInvolved: coordinationPlan.expert_assignments.length,
                communicationPattern: coordinationPlan.communication_strategy,
                estimatedDuration: coordinationPlan.estimated_coordination_time,
                qualityGates: coordinationPlan.quality_checkpoints.length,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:733
Context: metadata
Object: toolName: 'expert_coordination_hub' 


### src/agents/experts/MasterOrchestrator.ts:741
Context: parameters
Object: type: 'object',
          properties: {
            coordination_plan: {
              type: 'object',
              description: 'The expert coordination plan from expert_coordination_hub',
              properties: {
                coordination_id: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:749
Context: task_plan_reference
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:750
Context: primary_objective
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:751
Context: expert_assignments
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:752
Context: execution_phases
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:753
Context: quality_checkpoints
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:754
Context: communication_protocols
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:755
Context: estimated_coordination_time
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:759
Context: current_state
Object: type: 'object',
              description: 'Current execution state and progress data',
              properties: {
                completed_tasks: { 
                  type: 'array',
                  items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:768
Context: in_progress_tasks
Object: type: 'array',
                  items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:773
Context: blocked_tasks
Object: type: 'array',
                  items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:778
Context: expert_status
Object: type: 'object',
                  description: 'Status information for each expert',
                  additionalProperties: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', enum: ['active', 'idle', 'blocked', 'offline'] 


### src/agents/experts/MasterOrchestrator.ts:785
Context: current_task
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:786
Context: completion_rate
Object: type: 'number', minimum: 0, maximum: 1 


### src/agents/experts/MasterOrchestrator.ts:787
Context: response_time
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:788
Context: quality_score
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:792
Context: checkpoint_results
Object: type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      checkpoint_id: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:798
Context: status
Object: type: 'string', enum: ['pending', 'passed', 'failed', 'skipped'] 


### src/agents/experts/MasterOrchestrator.ts:799
Context: score
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:800
Context: issues
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:805
Context: timeline_data
Object: type: 'object',
                  properties: {
                    start_time: { type: 'string', format: 'date-time' 


### src/agents/experts/MasterOrchestrator.ts:809
Context: current_time
Object: type: 'string', format: 'date-time' 


### src/agents/experts/MasterOrchestrator.ts:810
Context: projected_completion
Object: type: 'string', format: 'date-time' 


### src/agents/experts/MasterOrchestrator.ts:811
Context: milestone_achievements
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:818
Context: validation_scope
Object: type: 'object',
              description: 'Scope and depth of validation analysis',
              properties: {
                include_performance_analysis: { type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:823
Context: include_quality_assessment
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:824
Context: include_risk_evaluation
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:825
Context: include_communication_analysis
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:826
Context: include_timeline_analysis
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:827
Context: detail_level
Object: type: 'string', 
                  enum: ['summary', 'detailed', 'comprehensive'],
                  default: 'detailed'
                


### src/agents/experts/MasterOrchestrator.ts:832
Context: focus_areas
Object: type: 'array',
                  items: { 
                    type: 'string',
                    enum: ['performance', 'quality', 'communication', 'timeline', 'risk', 'coordination']
                  


### src/agents/experts/MasterOrchestrator.ts:843
Context: validation_context
Object: type: 'object',
              description: 'Additional context for validation analysis',
              properties: {
                previous_validations: { type: 'array', description: 'Previous validation reports for trend analysis' 


### src/agents/experts/MasterOrchestrator.ts:848
Context: user_concerns
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:849
Context: business_priorities
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:850
Context: deadline_pressure
Object: type: 'string', enum: ['low', 'medium', 'high'], description: 'Current deadline pressure level' 


### src/agents/experts/MasterOrchestrator.ts:857
Context: params
Object: coordination_plan: ExpertCoordinationPlan
          current_state: {
            completed_tasks: string[]
            in_progress_tasks: string[]
            blocked_tasks?: string[]
            expert_status: Record<string, {
              status: 'active' | 'idle' | 'blocked' | 'offline'
              current_task?: string
              completion_rate: number
              response_time?: number
              quality_score?: number
            


### src/agents/experts/MasterOrchestrator.ts:910
Context: metadata
Object: toolName: 'progress_validator',
                aiPowered: true,
                validationId: validationReport.validation_id,
                overallProgress: validationReport.overall_progress.completion_percentage,
                expertsEvaluated: validationReport.expert_progress.length,
                checkpointsAssessed: validationReport.quality_checkpoint_status.length,
                riskFactors: validationReport.risk_assessment.identified_risks.length,
                recommendationCount: validationReport.recommendations.length,
                escalationRequired: validationReport.escalation_required,
                validationConfidence: validationReport.validation_confidence,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:929
Context: metadata
Object: toolName: 'progress_validator' 


### src/agents/experts/MasterOrchestrator.ts:937
Context: parameters
Object: type: 'object',
          properties: {
            expected_outcome: {
              type: 'object',
              description: 'The original expected outcome specification from outcome_specification_generator',
              properties: {
                primary_goal: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:945
Context: secondary_goals
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:946
Context: deliverable_specifications
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:947
Context: quality_requirements
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:948
Context: success_metrics
Object: type: 'array' 


### src/agents/experts/MasterOrchestrator.ts:949
Context: definition_confidence
Object: type: 'number', minimum: 0, maximum: 1 


### src/agents/experts/MasterOrchestrator.ts:953
Context: final_results
Object: type: 'object',
              description: 'The final aggregated results from expert coordination execution',
              properties: {
                deliverables: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:963
Context: content
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:964
Context: format
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:965
Context: quality_score
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:966
Context: completion_status
Object: type: 'string', enum: ['complete', 'partial', 'incomplete'] 


### src/agents/experts/MasterOrchestrator.ts:967
Context: expert_source
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:968
Context: validation_notes
Object: type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:974
Context: overall_execution_summary
Object: type: 'object',
                  properties: {
                    total_duration: { type: 'number', description: 'Total execution time in minutes' 


### src/agents/experts/MasterOrchestrator.ts:978
Context: experts_involved
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:979
Context: tasks_completed
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:980
Context: quality_gates_passed
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:981
Context: issues_encountered
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:982
Context: resolution_strategies_used
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:986
Context: quality_metrics
Object: type: 'object',
                  properties: {
                    accuracy: { type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:990
Context: completeness
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:991
Context: consistency
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:992
Context: performance
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:993
Context: usability
Object: type: 'number', minimum: 0, maximum: 100 


### src/agents/experts/MasterOrchestrator.ts:997
Context: compliance_status
Object: type: 'object',
                  properties: {
                    requirements_met: { type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:1001
Context: requirements_partial
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:1002
Context: requirements_missed
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:1003
Context: acceptance_criteria_passed
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:1004
Context: acceptance_criteria_total
Object: type: 'number' 


### src/agents/experts/MasterOrchestrator.ts:1011
Context: validation_context
Object: type: 'object',
              description: 'Additional context for confidence assessment',
              properties: {
                user_feedback: { type: 'string', description: 'Any feedback provided by user during execution' 


### src/agents/experts/MasterOrchestrator.ts:1016
Context: expert_concerns
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:1017
Context: timeline_constraints
Object: type: 'object', description: 'Timeline pressures that may have affected quality' 


### src/agents/experts/MasterOrchestrator.ts:1018
Context: resource_limitations
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:1019
Context: scope_changes
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/MasterOrchestrator.ts:1023
Context: assessment_criteria
Object: type: 'object',
              description: 'Criteria for confidence assessment and scoring',
              properties: {
                minimum_confidence_threshold: { type: 'number', minimum: 0, maximum: 1, default: 0.7 


### src/agents/experts/MasterOrchestrator.ts:1028
Context: weight_accuracy
Object: type: 'number', minimum: 0, maximum: 1, default: 0.3 


### src/agents/experts/MasterOrchestrator.ts:1029
Context: weight_completeness
Object: type: 'number', minimum: 0, maximum: 1, default: 0.25 


### src/agents/experts/MasterOrchestrator.ts:1030
Context: weight_quality
Object: type: 'number', minimum: 0, maximum: 1, default: 0.25 


### src/agents/experts/MasterOrchestrator.ts:1031
Context: weight_timeliness
Object: type: 'number', minimum: 0, maximum: 1, default: 0.2 


### src/agents/experts/MasterOrchestrator.ts:1032
Context: include_expert_confidence
Object: type: 'boolean', default: true 


### src/agents/experts/MasterOrchestrator.ts:1033
Context: escalation_threshold
Object: type: 'number', minimum: 0, maximum: 1, default: 0.5 


### src/agents/experts/MasterOrchestrator.ts:1040
Context: params
Object: expected_outcome: ExpectedOutcome
          final_results: {
            deliverables: Array<{
              name: string
              content: string
              _format?: string
              quality_score?: number
              completion_status: '_complete' | 'partial' | 'incomplete'
              expert_source: string
              validation_notes?: string
            


### src/agents/experts/MasterOrchestrator.ts:1052
Context: overall_execution_summary
Object: total_duration?: number
              experts_involved: string[]
              tasks_completed?: number
              quality_gates_passed?: number
              issues_encountered?: string[]
              resolution_strategies_used?: string[]
            


### src/agents/experts/MasterOrchestrator.ts:1060
Context: quality_metrics
Object: accuracy?: number
              completeness?: number
              consistency?: number
              performance?: number
              usability?: number
            


### src/agents/experts/MasterOrchestrator.ts:1103
Context: metadata
Object: toolName: 'confidence_assessor',
                aiPowered: true,
                assessmentId: confidenceAssessment.assessment_id,
                overallConfidence: confidenceAssessment.overall_confidence,
                acceptanceCriteriaMet: confidenceAssessment.acceptance_criteria_met,
                qualityScore: confidenceAssessment.quality_assessment.overall_score,
                recommendedAction: confidenceAssessment.recommended_action,
                escalationRequired: confidenceAssessment.escalation_required,
                deliverableCount: params.final_results.deliverables.length,
                expertsInvolved: params.final_results.overall_execution_summary.experts_involved.length,
                timestamp: new Date().toISOString()
              


### src/agents/experts/MasterOrchestrator.ts:1122
Context: metadata
Object: toolName: 'confidence_assessor' 


### src/agents/experts/MasterOrchestrator.ts:1162
Context: params
Object: request_intent: RequestIntent
    complexity_level?: 'low' | 'medium' | 'high'
    user_context?: any
    specification_depth?: 'basic' | 'detailed' | 'comprehensive'
  


### src/agents/experts/MasterOrchestrator.ts:1519
Context: params
Object: expected_outcome: ExpectedOutcome
    available_experts?: string[]
    execution_preferences?: {
      prefer_parallel?: boolean
      max_concurrent_tasks?: number
      quality_gate_frequency?: 'minimal' | 'standard' | 'comprehensive'
      fallback_strategy?: 'graceful' | 'strict' | 'adaptive'
    


### src/agents/experts/MasterOrchestrator.ts:1994
Context: params
Object: task_plan: TaskPlan
    coordination_preferences?: {
      communication_pattern?: 'broadcast' | 'direct' | 'chain' | 'hierarchical'
      progress_reporting_frequency?: 'real-time' | 'milestone' | 'completion'
      conflict_resolution_strategy?: 'consensus' | 'authority' | 'expertise' | 'hybrid'
      handoff_validation?: boolean
      context_preservation?: boolean
    


### src/agents/experts/MasterOrchestrator.ts:2544
Context: metadata
Object: duration, toolName, timestamp: new Date().toISOString() 


### src/agents/experts/MasterOrchestrator.ts:2611
Context: output
Object: task: task.description, status: 'completed' 


### src/agents/experts/MasterOrchestrator.ts:2647
Context: interpretation
Object: intent: requestIntent,
          confidence: requestIntent.confidence,
          complexity: requestIntent.complexity
        


### src/agents/experts/MasterOrchestrator.ts:2652
Context: taskDecomposition
Object: tasks,
          totalTasks: tasks.length,
          estimatedDuration: tasks.reduce((sum, t) => sum + t.estimatedDuration, 0)
        


### src/agents/experts/MasterOrchestrator.ts:2659
Context: unifiedResponse
Object: response: `AI-enhanced Master Orchestrator successfully processed query. Primary goal: ${requestIntent.primaryGoal


### src/agents/experts/MasterOrchestrator.ts:2663
Context: metadata
Object: processedBy: 'master-orchestrator',
            aiEnhanced: true,
            ollamaService: true,
            guardrailCompliant: true
          


### src/agents/experts/MasterOrchestrator.ts:2670
Context: performance
Object: totalDuration,
          interpretationTime: intentResult.metadata?.duration,
          decompositionTime: tasksResult.metadata?.duration,
          qualityEvaluationTime: qualityResult.metadata?.duration,
          aiImprovementFactor: 6.0 // AI-enhanced performance improvement
        


### src/agents/experts/MasterOrchestrator.ts:2731
Context: unifiedResponse
Object: response: `Master Orchestrator processed query using traditional tools (AI fallback). Routing to: ${routingDecision.primaryAgent.agentId


### src/agents/experts/MasterOrchestrator.ts:2734
Context: metadata
Object: processedBy: 'master-orchestrator',
          fallbackMode: true,
          nativeTypescript: true
        


### src/agents/experts/MasterOrchestrator.ts:2740
Context: performance
Object: totalDuration,
        analysisTime: analysisResult.metadata?.duration,
        routingTime: routingResult.metadata?.duration
      


### src/agents/experts/MasterOrchestrator.ts:2757
Context: parsed_query
Object: primaryGoal: intent.primaryGoal,
        requiredExperts: intent.requiredExperts,
        complexity: intent.complexity
      


### src/agents/experts/MasterOrchestrator.ts:2777
Context: interpretation
Object: intent, confidence: intent.confidence 


### src/agents/experts/MasterOrchestrator.ts:2780
Context: unifiedResponse
Object: response: `Hybrid processing: AI interpretation + traditional routing. Primary goal: ${intent.primaryGoal


### src/agents/experts/MasterOrchestrator.ts:2783
Context: metadata
Object: processedBy: 'master-orchestrator',
          hybridMode: true,
          aiInterpretation: true
        


### src/agents/experts/MasterOrchestrator.ts:2789
Context: performance
Object: totalDuration,
        routingTime: routingResult.metadata?.duration
      


### src/agents/experts/MasterOrchestrator.ts:2805
Context: primaryAgent
Object: agentId: primaryTask.assignedAgent,
        confidence: intent.confidence,
        reason: `AI-selected for task: ${primaryTask.description


### src/agents/experts/MasterOrchestrator.ts:2838
Context: primaryAgent
Object: agentId: routerResult.primary_agent?.agent_id || 'architecture-expert',
        confidence: routerResult.primary_agent?.confidence || 0.8,
        reason: routerResult.primary_agent?.reasoning || 'Default selection'
      


### src/agents/experts/MasterOrchestrator.ts:2859
Context: params
Object: coordination_plan: ExpertCoordinationPlan
    current_state: {
      completed_tasks: string[]
      in_progress_tasks: string[]
      blocked_tasks?: string[]
      expert_status: Record<string, {
        status: 'active' | 'idle' | 'blocked' | 'offline'
        current_task?: string
        completion_rate: number
        response_time?: number
        quality_score?: number
      


### src/agents/experts/MasterOrchestrator.ts:3020
Context: format
Object: "validation_id": "unique-validation-identifier",
  "coordination_plan_reference": "${coordinationPlan.coordination_id


### src/agents/experts/MasterOrchestrator.ts:3153
Context: overall_progress
Object: completion_percentage: Math.min(100, Math.max(0, parsedResponse.overall_progress?.completion_percentage || 0)),
          tasks_completed: parsedResponse.overall_progress?.tasks_completed || currentState.completed_tasks.length,
          tasks_in_progress: parsedResponse.overall_progress?.tasks_in_progress || currentState.in_progress_tasks.length,
          tasks_pending: parsedResponse.overall_progress?.tasks_pending || 0,
          tasks_blocked: parsedResponse.overall_progress?.tasks_blocked || (currentState.blocked_tasks?.length || 0),
          total_tasks: parsedResponse.overall_progress?.total_tasks || (currentState.completed_tasks.length + currentState.in_progress_tasks.length + (currentState.blocked_tasks?.length || 0))
        


### src/agents/experts/MasterOrchestrator.ts:3163
Context: risk_assessment
Object: identified_risks: parsedResponse.risk_assessment?.identified_risks || [],
          new_risks_detected: parsedResponse.risk_assessment?.new_risks_detected || [],
          risk_trend: parsedResponse.risk_assessment?.risk_trend || 'stable'
        


### src/agents/experts/MasterOrchestrator.ts:3168
Context: communication_analysis
Object: handoff_success_rate: Math.min(100, Math.max(0, parsedResponse.communication_analysis?.handoff_success_rate || 85)),
          average_response_time: parsedResponse.communication_analysis?.average_response_time || 2.0,
          communication_bottlenecks: parsedResponse.communication_analysis?.communication_bottlenecks || [],
          coordination_effectiveness: parsedResponse.communication_analysis?.coordination_effectiveness || 'good',
          recommendations: parsedResponse.communication_analysis?.recommendations || []
        


### src/agents/experts/MasterOrchestrator.ts:3175
Context: timeline_analysis
Object: original_estimated_duration: coordinationPlan.estimated_coordination_time,
          current_projected_duration: parsedResponse.timeline_analysis?.current_projected_duration || coordinationPlan.estimated_coordination_time,
          variance_percentage: parsedResponse.timeline_analysis?.variance_percentage || 0,
          critical_path_status: parsedResponse.timeline_analysis?.critical_path_status || 'on_track',
          bottleneck_tasks: parsedResponse.timeline_analysis?.bottleneck_tasks || [],
          acceleration_opportunities: parsedResponse.timeline_analysis?.acceleration_opportunities || []
        


### src/agents/experts/MasterOrchestrator.ts:3279
Context: overall_progress
Object: completion_percentage: completionPercentage,
        tasks_completed: currentState.completed_tasks.length,
        tasks_in_progress: currentState.in_progress_tasks.length,
        tasks_pending: Math.max(0, totalTasks - currentState.completed_tasks.length - currentState.in_progress_tasks.length),
        tasks_blocked: currentState.blocked_tasks?.length || 0,
        total_tasks: totalTasks
      


### src/agents/experts/MasterOrchestrator.ts:3302
Context: risk_assessment
Object: identified_risks: currentState.blocked_tasks?.length > 0 ? [{
          risk_id: 'blocked-tasks-risk',
          risk_description: 'Multiple tasks are currently blocked',
          probability: 'high' as const,
          impact: 'medium' as const,
          current_mitigation_status: 'not_started' as const,
          affected_tasks: currentState.blocked_tasks,
          recommended_actions: ['Identify and resolve blocking dependencies', 'Consider alternative approaches']
        


### src/agents/experts/MasterOrchestrator.ts:3315
Context: communication_analysis
Object: handoff_success_rate: 85,
        average_response_time: 2.0,
        communication_bottlenecks: [],
        coordination_effectiveness: 'good' as const,
        recommendations: ['Continue regular progress updates']
      


### src/agents/experts/MasterOrchestrator.ts:3322
Context: timeline_analysis
Object: original_estimated_duration: coordinationPlan.estimated_coordination_time,
        current_projected_duration: coordinationPlan.estimated_coordination_time,
        variance_percentage: 0,
        critical_path_status: 'on_track' as const,
        bottleneck_tasks: [],
        acceleration_opportunities: []
      


### src/agents/experts/MasterOrchestrator.ts:3349
Context: _params
Object: expected_outcome: ExpectedOutcome
    final_results: {
      deliverables: Array<{
        name: string
        content: string
        format?: string
        quality_score?: number
        completion_status: 'complete' | 'partial' | 'incomplete'
        expert_source: string
        validation_notes?: string
      


### src/agents/experts/MasterOrchestrator.ts:3361
Context: overall_execution_summary
Object: total_duration?: number
        experts_involved: string[]
        tasks_completed?: number
        quality_gates_passed?: number
        issues_encountered?: string[]
        resolution_strategies_used?: string[]
      


### src/agents/experts/MasterOrchestrator.ts:3369
Context: quality_metrics
Object: accuracy?: number
        completeness?: number
        consistency?: number
        performance?: number
        usability?: number
      


### src/agents/experts/MasterOrchestrator.ts:3530
Context: format
Object: "assessment_id": "unique-assessment-identifier",
  "expected_outcome_reference": "${expectedOutcome.primary_goal


### src/agents/experts/MasterOrchestrator.ts:3675
Context: primary_goal_achievement
Object: status: 'partially_achieved',
            achievement_percentage: 75,
            evidence: ['Deliverables completed'],
            gaps_identified: ['Full assessment pending']
          


### src/agents/experts/MasterOrchestrator.ts:3686
Context: dimension_scores
Object: accuracy: finalResults.quality_metrics.accuracy || 75,
            completeness: finalResults.quality_metrics.completeness || 80,
            consistency: finalResults.quality_metrics.consistency || 75,
            performance: finalResults.quality_metrics.performance || 80
          


### src/agents/experts/MasterOrchestrator.ts:3696
Context: expert_performance_analysis
Object: individual_expert_scores: finalResults.overall_execution_summary.experts_involved.map((expertId: string) => ({
            expert_id: expertId,
            expert_name: expertId.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
            deliverable_quality: 80,
            timeliness: 85,
            collaboration_effectiveness: 85,
            overall_contribution_score: 83
          


### src/agents/experts/MasterOrchestrator.ts:3709
Context: risk_and_constraint_analysis
Object: risks_materialized: [],
          constraint_adherence: [],
          unexpected_challenges: [],
          adaptive_responses: []
        


### src/agents/experts/MasterOrchestrator.ts:3717
Context: component_confidence_scores
Object: goal_achievement_confidence: 0.8,
            quality_confidence: 0.75,
            completeness_confidence: 0.85,
            sustainability_confidence: 0.75
          


### src/agents/experts/MasterOrchestrator.ts:3746
Context: stakeholder_impact_analysis
Object: user_impact: {
            positive_impacts: ['Functional requirements delivered'],
            negative_impacts: [],
            user_satisfaction_prediction: 'high'
          


### src/agents/experts/MasterOrchestrator.ts:3752
Context: business_impact
Object: value_delivered: 'Primary objectives achieved',
            cost_effectiveness: 'good',
            strategic_alignment: 'high'
          


### src/agents/experts/MasterOrchestrator.ts:3757
Context: technical_impact
Object: maintainability: 'good',
            scalability: 'good',
            integration_impact: 'Minimal integration requirements',
            technical_debt_introduced: 'minimal'
          


### src/agents/experts/MasterOrchestrator.ts:3849
Context: outcome_comparison
Object: primary_goal_achievement: {
          status: completionRate > 0.8 ? 'fully_achieved' as const : completionRate > 0.5 ? 'partially_achieved' as const : 'not_achieved' as const,
          achievement_percentage: Math.round(completionRate * 100),
          evidence: [`${completeDeliverables


### src/agents/experts/MasterOrchestrator.ts:3866
Context: quality_assessment
Object: overall_score: averageQuality,
        dimension_scores: {
          accuracy: finalResults.quality_metrics.accuracy || 75,
          completeness: finalResults.quality_metrics.completeness || Math.round(completionRate * 100),
          consistency: finalResults.quality_metrics.consistency || 75,
          performance: finalResults.quality_metrics.performance || 80
        


### src/agents/experts/MasterOrchestrator.ts:3878
Context: expert_performance_analysis
Object: individual_expert_scores: finalResults.overall_execution_summary.experts_involved.map((expertId: string) => ({
          expert_id: expertId,
          expert_name: expertId.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          deliverable_quality: 80,
          timeliness: 85,
          collaboration_effectiveness: 85,
          overall_contribution_score: 83
        


### src/agents/experts/MasterOrchestrator.ts:3891
Context: risk_and_constraint_analysis
Object: risks_materialized: [],
        constraint_adherence: [],
        unexpected_challenges: [],
        adaptive_responses: []
      


### src/agents/experts/MasterOrchestrator.ts:3897
Context: confidence_scoring
Object: overall_confidence: Math.min(0.95, completionRate * 0.8 + 0.2),
        component_confidence_scores: {
          goal_achievement_confidence: completionRate,
          quality_confidence: Math.min(0.9, averageQuality / 100),
          completeness_confidence: completionRate,
          sustainability_confidence: 0.8
        


### src/agents/experts/MasterOrchestrator.ts:3921
Context: acceptance_criteria_evaluation
Object: total_criteria: expectedOutcome.quality_requirements.length,
        criteria_met: Math.floor(expectedOutcome.quality_requirements.length * completionRate),
        criteria_partially_met: Math.floor(expectedOutcome.quality_requirements.length * 0.1),
        criteria_not_met: Math.floor(expectedOutcome.quality_requirements.length * (1 - completionRate - 0.1)),
        acceptance_percentage: Math.round(completionRate * 100),
        critical_criteria_status: completionRate > 0.8 ? 'all_met' as const : 'some_unmet' as const,
        detailed_criteria_assessment: []
      


### src/agents/experts/MasterOrchestrator.ts:3938
Context: delivery_readiness
Object: production_ready: completionRate > 0.8,
        user_acceptance_ready: completionRate > 0.8,
        documentation_complete: true,
        testing_sufficient: averageQuality > 75,
        performance_acceptable: true,
        readiness_blockers: completionRate < 0.8 ? ['Incomplete deliverables'] : [],
        readiness_score: Math.round((completionRate * 50) + (averageQuality / 2))
      


### src/agents/experts/MasterOrchestrator.ts:3947
Context: stakeholder_impact_analysis
Object: user_impact: {
          positive_impacts: ['Functional requirements delivered'],
          negative_impacts: completionRate < 1 ? ['Some expected features missing'] : [],
          user_satisfaction_prediction: completionRate > 0.8 ? 'high' as const : 'medium' as const
        


### src/agents/experts/MasterOrchestrator.ts:3953
Context: business_impact
Object: value_delivered: completionRate > 0.8 ? 'Significant value delivered' : 'Partial value delivered',
          cost_effectiveness: 'good' as const,
          strategic_alignment: 'high' as const
        


### src/agents/experts/MasterOrchestrator.ts:3958
Context: technical_impact
Object: maintainability: 'good' as const,
          scalability: 'good' as const,
          integration_impact: 'Standard integration requirements',
          technical_debt_introduced: 'minimal' as const
        


### src/agents/experts/MCPIntegrationExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/LLMIntegrationExpert.ts:45
Context: metadata
Object: 


### src/agents/experts/GitHubIntegrationExpert.ts:108
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.1, // Low temperature for precise API guidance
        maxTokens: 4000
      


### src/agents/experts/GitHubIntegrationExpert.ts:129
Context: metadata
Object: native_typescript: true,
        rag_enhanced: true,
        knowledge_domains: this.specialization.knowledgeAreas.length,
        migration_version: '2.0.0',
        supported_apis: ['REST v3', 'GraphQL v4'],
        supported_features: ['Actions', 'Issues', 'PRs', 'Projects', 'Webhooks', 'Apps'],
        auth_methods: ['PAT', 'OAuth', 'GitHub App']
      


### src/agents/experts/GitHubIntegrationExpert.ts:139
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/GitHubIntegrationExpert.ts:154
Context: parameters
Object: type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['create', 'configure', 'archive', 'transfer', 'fork', 'template'],
              description: 'Repository management action'
            


### src/agents/experts/GitHubIntegrationExpert.ts:162
Context: repository_name
Object: type: 'string',
              description: 'Name of the repository'
            


### src/agents/experts/GitHubIntegrationExpert.ts:166
Context: organization
Object: type: 'string',
              description: 'GitHub organization (optional)'
            


### src/agents/experts/GitHubIntegrationExpert.ts:170
Context: visibility
Object: type: 'string',
              enum: ['public', 'private', 'internal'],
              description: 'Repository visibility',
              default: 'private'
            


### src/agents/experts/GitHubIntegrationExpert.ts:176
Context: configuration
Object: type: 'object',
              description: 'Comprehensive repository configuration including features, security, and collaboration settings'
            


### src/agents/experts/GitHubIntegrationExpert.ts:188
Context: parameters
Object: type: 'object',
          properties: {
            api_type: {
              type: 'string',
              enum: ['rest', 'graphql', 'webhook'],
              description: 'GitHub API type to analyze or integrate'
            


### src/agents/experts/GitHubIntegrationExpert.ts:196
Context: operation
Object: type: 'string',
              description: 'API operation to perform or analyze'
            


### src/agents/experts/GitHubIntegrationExpert.ts:200
Context: optimization_focus
Object: type: 'string',
              enum: ['performance', 'rate_limits', 'security', 'data_efficiency'],
              description: 'Optimization focus for API usage'
            


### src/agents/experts/GitHubIntegrationExpert.ts:205
Context: integration_requirements
Object: type: 'object',
              description: 'Integration requirements and constraints'
            


### src/agents/experts/GitHubIntegrationExpert.ts:217
Context: parameters
Object: type: 'object',
          properties: {
            workflow_type: {
              type: 'string',
              enum: ['github_actions', 'branch_protection', 'pr_automation', 'issue_management', 'release_automation'],
              description: 'Type of workflow to generate'
            


### src/agents/experts/GitHubIntegrationExpert.ts:225
Context: project_context
Object: type: 'object',
              description: 'Project context including language, framework, and requirements'
            


### src/agents/experts/GitHubIntegrationExpert.ts:229
Context: automation_level
Object: type: 'string',
              enum: ['basic', 'intermediate', 'advanced'],
              description: 'Level of automation to implement'
            


### src/agents/experts/GitHubIntegrationExpert.ts:234
Context: security_requirements
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubIntegrationExpert.ts:247
Context: parameters
Object: type: 'object',
          properties: {
            repository: {
              type: 'string',
              description: 'Repository to validate (owner/name format)'
            


### src/agents/experts/GitHubIntegrationExpert.ts:254
Context: security_scope
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubIntegrationExpert.ts:259
Context: compliance_standards
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubIntegrationExpert.ts:264
Context: remediation_level
Object: type: 'string',
              enum: ['report_only', 'recommendations', 'auto_fix'],
              description: 'Level of remediation to provide'
            


### src/agents/experts/GitHubIntegrationExpert.ts:277
Context: parameters
Object: type: 'object',
          properties: {
            integration_type: {
              type: 'string',
              enum: ['cicd', 'project_management', 'monitoring', 'notifications', 'deployment'],
              description: 'Type of integration to optimize'
            


### src/agents/experts/GitHubIntegrationExpert.ts:285
Context: current_setup
Object: type: 'object',
              description: 'Current integration configuration'
            


### src/agents/experts/GitHubIntegrationExpert.ts:289
Context: optimization_goals
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubIntegrationExpert.ts:294
Context: constraints
Object: type: 'object',
              description: 'Integration constraints and limitations'
            


### src/agents/experts/GitHubIntegrationExpert.ts:306
Context: parameters
Object: type: 'object',
          properties: {
            optimization_target: {
              type: 'string',
              enum: ['api_usage', 'workflow_performance', 'repository_size', 'collaboration_efficiency'],
              description: 'Performance optimization target'
            


### src/agents/experts/GitHubIntegrationExpert.ts:314
Context: current_metrics
Object: type: 'object',
              description: 'Current performance metrics and bottlenecks'
            


### src/agents/experts/GitHubIntegrationExpert.ts:318
Context: performance_goals
Object: type: 'object',
              description: 'Target performance metrics'
            


### src/agents/experts/GitHubIntegrationExpert.ts:322
Context: resource_constraints
Object: type: 'object',
              description: 'Resource limitations and budget constraints'
            


### src/agents/experts/GitHubIntegrationExpert.ts:334
Context: parameters
Object: type: 'object',
          properties: {
            report_type: {
              type: 'string',
              enum: ['activity_summary', 'collaboration_metrics', 'repository_health', 'productivity_analysis'],
              description: 'Type of report to generate'
            


### src/agents/experts/GitHubIntegrationExpert.ts:342
Context: scope
Object: type: 'object',
              description: 'Report scope including repositories, time range, and team members'
            


### src/agents/experts/GitHubIntegrationExpert.ts:346
Context: metrics
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubIntegrationExpert.ts:351
Context: output_format
Object: type: 'string',
              enum: ['json', 'markdown', 'csv', 'dashboard'],
              description: 'Report output format'
            


### src/agents/experts/GitHubIntegrationExpert.ts:364
Context: parameters
Object: type: 'object',
          properties: {
            issue_category: {
              type: 'string',
              enum: ['api_errors', 'workflow_failures', 'permission_issues', 'integration_problems', 'performance_issues'],
              description: 'Category of issue to troubleshoot'
            


### src/agents/experts/GitHubIntegrationExpert.ts:372
Context: symptoms
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubIntegrationExpert.ts:377
Context: context
Object: type: 'object',
              description: 'Context information including recent changes and environment details'
            


### src/agents/experts/GitHubIntegrationExpert.ts:381
Context: urgency_level
Object: type: 'string',
              enum: ['low', 'medium', 'high', 'critical'],
              description: 'Urgency level for resolution'
            


### src/agents/experts/GitHubIntegrationExpert.ts:480
Context: repository
Object: name: params.repository_name,
          full_name: params.organization ? `${params.organization


### src/agents/experts/GitHubIntegrationExpert.ts:753
Context: metadata
Object: agentId: this.config.id,
        timestamp: new Date().toISOString(),
        ...metadata
      


### src/agents/experts/GitHubIntegrationExpert.ts:771
Context: features
Object: has_issues: params.configuration?.features?.issues ?? true,
        has_projects: params.configuration?.features?.projects ?? true,
        has_wiki: params.configuration?.features?.wiki ?? true,
        has_discussions: params.configuration?.features?.discussions ?? true,
        has_pages: params.configuration?.features?.pages ?? false
      


### src/agents/experts/GitHubIntegrationExpert.ts:778
Context: security
Object: dependency_scanning: true,
        code_scanning: true,
        secret_scanning: true
      


### src/agents/experts/GitHubIntegrationExpert.ts:789
Context: languageMap
Object: [key: string]: string 


### src/agents/experts/GitHubIntegrationExpert.ts:922
Context: current_limits
Object: rest: '5000 requests per hour',
        graphql: '5000 points per hour',
        search: '30 requests per minute'
      


### src/agents/experts/GitHubIntegrationExpert.ts:943
Context: rest
Object: javascript: `// GitHub REST API Example
const response = await fetch('https://api.github.com/${operation


### src/agents/experts/GitHubIntegrationExpert.ts:946
Context: headers
Object: 'Authorization': 'token YOUR_TOKEN',
    'Accept': 'application/vnd.github.v3+json'
  


### src/agents/experts/GitHubIntegrationExpert.ts:956
Context: graphql
Object: javascript: `// GitHub GraphQL API Example
const query = \`
  query {
    ${operation


### src/agents/experts/GitHubIntegrationExpert.ts:969
Context: headers
Object: 'Authorization': 'bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  


### src/agents/experts/GitHubIntegrationExpert.ts:1025
Context: on
Object: push: { branches: ['main', 'develop'] 


### src/agents/experts/GitHubIntegrationExpert.ts:1027
Context: pull_request
Object: branches: ['main'] 


### src/agents/experts/GitHubIntegrationExpert.ts:1029
Context: jobs
Object: test: {
          'runs-on': 'ubuntu-latest',
          steps: [
            { uses: 'actions/checkout@v3' 


### src/agents/experts/GitHubIntegrationExpert.ts:1034
Context: with
Object: 'node-version': '18' 


### src/agents/experts/GitHubIntegrationExpert.ts:1046
Context: required_status_checks
Object: strict: true,
        contexts: ['ci/tests', 'ci/build']
      


### src/agents/experts/GitHubIntegrationExpert.ts:1051
Context: required_pull_request_reviews
Object: required_approving_review_count: 1,
        dismiss_stale_pull_request_approvals: true
      


### src/agents/experts/GitHubIntegrationExpert.ts:1061
Context: auto_merge
Object: enabled: true,
        merge_method: 'squash'
      


### src/agents/experts/GitHubIntegrationExpert.ts:1067
Context: label_rules
Object: 'breaking-change': { requires_approval: true 


### src/agents/experts/GitHubIntegrationExpert.ts:1076
Context: templates
Object: bug_report: 'Bug report template',
        feature_request: 'Feature request template'
      


### src/agents/experts/GitHubIntegrationExpert.ts:1081
Context: triage_workflow
Object: sla: '24 hours',
        escalation_rules: ['high priority', 'security']
      


### src/agents/experts/GitHubIntegrationExpert.ts:1101
Context: code_scanning
Object: enabled: true,
        languages: ['javascript', 'typescript'],
        security_severity: 'high'
      


### src/agents/experts/GitHubIntegrationExpert.ts:1107
Context: security_policies
Object: vulnerability_reporting: true,
        security_advisories: true
      


### src/agents/experts/GitHubActionsExpert.ts:51
Context: metadata
Object: workflowTypes: ['CI/CD', 'Security', 'Release', 'PR Automation'],
      branchStrategies: ['GitHub Flow', 'Git Flow', 'Trunk-based'],
      technologies: ['Node.js', 'Python', 'Docker', 'Kubernetes']
    


### src/agents/experts/GitHubActionsExpert.ts:69
Context: parameters
Object: type: 'object',
          properties: {
            workflow_type: {
              type: 'string',
              enum: ['ci-cd', 'security', 'release', 'pr-automation', 'deployment', 'custom'],
              description: 'Type of workflow to generate'
            


### src/agents/experts/GitHubActionsExpert.ts:77
Context: project_config
Object: type: 'object',
              properties: {
                language: { type: 'string', enum: ['nodejs', 'python', 'typescript', 'java', 'go', 'rust'] 


### src/agents/experts/GitHubActionsExpert.ts:81
Context: framework
Object: type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:82
Context: package_manager
Object: type: 'string', enum: ['npm', 'yarn', 'pnpm', 'pip', 'poetry', 'maven', 'gradle'] 


### src/agents/experts/GitHubActionsExpert.ts:83
Context: test_framework
Object: type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:84
Context: build_tool
Object: type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:85
Context: deployment_target
Object: type: 'string', enum: ['aws', 'azure', 'gcp', 'heroku', 'vercel', 'netlify'] 


### src/agents/experts/GitHubActionsExpert.ts:89
Context: workflow_options
Object: type: 'object',
              properties: {
                triggers: { type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:93
Context: branches
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:94
Context: matrix_testing
Object: type: 'boolean' 


### src/agents/experts/GitHubActionsExpert.ts:95
Context: caching
Object: type: 'boolean' 


### src/agents/experts/GitHubActionsExpert.ts:96
Context: security_scanning
Object: type: 'boolean' 


### src/agents/experts/GitHubActionsExpert.ts:97
Context: artifact_upload
Object: type: 'boolean' 


### src/agents/experts/GitHubActionsExpert.ts:98
Context: notifications
Object: type: 'boolean' 


### src/agents/experts/GitHubActionsExpert.ts:102
Context: optimization_level
Object: type: 'string',
              enum: ['basic', 'standard', 'advanced', 'enterprise'],
              default: 'standard',
              description: 'Level of workflow optimization and features'
            


### src/agents/experts/GitHubActionsExpert.ts:121
Context: parameters
Object: type: 'object',
          properties: {
            team_context: {
              type: 'object',
              properties: {
                team_size: { type: 'string', enum: ['solo', 'small', 'medium', 'large'] 


### src/agents/experts/GitHubActionsExpert.ts:128
Context: experience_level
Object: type: 'string', enum: ['beginner', 'intermediate', 'advanced'] 


### src/agents/experts/GitHubActionsExpert.ts:129
Context: release_frequency
Object: type: 'string', enum: ['continuous', 'weekly', 'monthly', 'quarterly'] 


### src/agents/experts/GitHubActionsExpert.ts:130
Context: project_type
Object: type: 'string', enum: ['web-app', 'library', 'api', 'mobile', 'desktop'] 


### src/agents/experts/GitHubActionsExpert.ts:134
Context: current_strategy
Object: type: 'object',
              properties: {
                main_branch: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:138
Context: branch_types
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:139
Context: merge_strategy
Object: type: 'string', enum: ['merge-commit', 'squash', 'rebase'] 


### src/agents/experts/GitHubActionsExpert.ts:140
Context: protection_rules
Object: type: 'boolean' 


### src/agents/experts/GitHubActionsExpert.ts:144
Context: pain_points
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:149
Context: include_migration_plan
Object: type: 'boolean',
              default: false,
              description: 'Include migration plan from current strategy'
            


### src/agents/experts/GitHubActionsExpert.ts:167
Context: parameters
Object: type: 'object',
          properties: {
            convention_type: {
              type: 'string',
              enum: ['conventional-commits', 'angular', 'atom', 'custom'],
              default: 'conventional-commits',
              description: 'Type of commit convention to implement'
            


### src/agents/experts/GitHubActionsExpert.ts:176
Context: project_scopes
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:181
Context: automation_features
Object: type: 'object',
              properties: {
                commit_validation: { type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:185
Context: automated_changelog
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:186
Context: semantic_versioning
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:187
Context: release_automation
Object: type: 'boolean', default: false 


### src/agents/experts/GitHubActionsExpert.ts:188
Context: pr_title_validation
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:192
Context: tooling_preferences
Object: type: 'object',
              properties: {
                pre_commit_hooks: { type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:196
Context: editor_extensions
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:197
Context: cli_tools
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:198
Context: github_apps
Object: type: 'boolean', default: false 


### src/agents/experts/GitHubActionsExpert.ts:202
Context: custom_rules
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  rule_name: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:208
Context: rule_config
Object: type: 'object' 


### src/agents/experts/GitHubActionsExpert.ts:209
Context: description
Object: type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:227
Context: parameters
Object: type: 'object',
          properties: {
            template_type: {
              type: 'string',
              enum: ['basic', 'detailed', 'feature-specific', 'security-focused', 'custom'],
              default: 'detailed',
              description: 'Type of PR template to generate'
            


### src/agents/experts/GitHubActionsExpert.ts:236
Context: automation_features
Object: type: 'object',
              properties: {
                auto_labeling: { type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:240
Context: size_labeling
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:241
Context: conflict_detection
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:242
Context: stale_pr_management
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:243
Context: review_assignment
Object: type: 'boolean', default: false 


### src/agents/experts/GitHubActionsExpert.ts:244
Context: status_checks
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:248
Context: review_policies
Object: type: 'object',
              properties: {
                required_reviewers: { type: 'number', default: 1 


### src/agents/experts/GitHubActionsExpert.ts:252
Context: dismiss_stale_reviews
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:253
Context: require_code_owner_review
Object: type: 'boolean', default: false 


### src/agents/experts/GitHubActionsExpert.ts:254
Context: restrict_push_to_matching_branches
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:258
Context: integration_config
Object: type: 'object',
              properties: {
                link_issues: { type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:262
Context: auto_close_issues
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:263
Context: deployment_previews
Object: type: 'boolean', default: false 


### src/agents/experts/GitHubActionsExpert.ts:264
Context: performance_monitoring
Object: type: 'boolean', default: false 


### src/agents/experts/GitHubActionsExpert.ts:268
Context: team_settings
Object: type: 'object',
              properties: {
                code_owners: { type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:272
Context: review_teams
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:273
Context: merge_strategies
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:290
Context: parameters
Object: type: 'object',
          properties: {
            current_workflows: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:299
Context: file_path
Object: type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:300
Context: triggers
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:301
Context: jobs
Object: type: 'array', items: { type: 'object' 


### src/agents/experts/GitHubActionsExpert.ts:302
Context: average_runtime
Object: type: 'number' 


### src/agents/experts/GitHubActionsExpert.ts:303
Context: failure_rate
Object: type: 'number' 


### src/agents/experts/GitHubActionsExpert.ts:308
Context: optimization_goals
Object: type: 'object',
              properties: {
                reduce_runtime: { type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:312
Context: improve_reliability
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:313
Context: reduce_costs
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:314
Context: enhance_security
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:315
Context: improve_parallelization
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:319
Context: constraints
Object: type: 'object',
              properties: {
                budget_limit: { type: 'number' 


### src/agents/experts/GitHubActionsExpert.ts:323
Context: max_runtime
Object: type: 'number' 


### src/agents/experts/GitHubActionsExpert.ts:324
Context: security_requirements
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:325
Context: compliance_standards
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/GitHubActionsExpert.ts:329
Context: analysis_scope
Object: type: 'object',
              properties: {
                performance_analysis: { type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:333
Context: security_analysis
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:334
Context: cost_analysis
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:335
Context: dependency_analysis
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:336
Context: caching_analysis
Object: type: 'boolean', default: true 


### src/agents/experts/GitHubActionsExpert.ts:340
Context: generate_migration_plan
Object: type: 'boolean',
              default: true,
              description: 'Generate step-by-step migration plan'
            


### src/agents/experts/GitHubActionsExpert.ts:491
Context: data
Object: workflow: workflow,
          supporting_files: supportingFiles,
          documentation: documentation,
          installation_guide: await this.generateInstallationGuide(params.workflow_type),
          best_practices: await this.getWorkflowBestPractices(params.workflow_type),
          monitoring: await this.generateMonitoringConfig(params.project_config)
        


### src/agents/experts/GitHubActionsExpert.ts:499
Context: metadata
Object: workflow_type: params.workflow_type,
          optimization_level: params.optimization_level,
          language: params.project_config.language
        


### src/agents/experts/GitHubActionsExpert.ts:546
Context: data
Object: recommended_strategy: recommendedStrategy,
          implementation_guide: implementationGuide,
          migration_plan: migrationPlan,
          pain_point_solutions: painPointSolutions,
          protection_rules: await this.generateProtectionRules(recommendedStrategy),
          team_guidelines: await this.generateTeamGuidelines(params.team_context, recommendedStrategy),
          automation_suggestions: await this.getBranchAutomationSuggestions(recommendedStrategy)
        


### src/agents/experts/GitHubActionsExpert.ts:555
Context: metadata
Object: team_size: params.team_context.team_size,
          recommended_model: recommendedStrategy.model,
          complexity_score: this.calculateStrategyComplexity(recommendedStrategy)
        


### src/agents/experts/GitHubActionsExpert.ts:601
Context: data
Object: commit_configuration: commitConfig,
          automation_setup: automation,
          tooling_configuration: tooling,
          validation_rules: validation,
          developer_guide: await this.generateCommitDeveloperGuide(commitConfig),
          examples: await this.generateCommitExamples(commitConfig),
          troubleshooting: await this.generateCommitTroubleshooting()
        


### src/agents/experts/GitHubActionsExpert.ts:610
Context: metadata
Object: convention_type: params.convention_type || 'conventional-commits',
          automation_features_count: Object.keys(params.automation_features || {


### src/agents/experts/GitHubActionsExpert.ts:655
Context: data
Object: pr_templates: prTemplates,
          automation_workflows: automation,
          review_policies: reviewPolicies,
          integration_config: integrations,
          branch_protection_rules: await this.generateBranchProtectionRules(params.review_policies || {


### src/agents/experts/GitHubActionsExpert.ts:664
Context: metadata
Object: template_type: params.template_type || 'detailed',
          automation_features_enabled: Object.values(params.automation_features || {


### src/agents/experts/GitHubActionsExpert.ts:716
Context: data
Object: current_analysis: analysis,
          optimization_recommendations: optimizations,
          migration_plan: migrationPlan,
          impact_assessment: impactAssessment,
          cost_savings: await this.calculateCostSavings(analysis, optimizations),
          performance_improvements: await this.calculatePerformanceImprovements(analysis, optimizations),
          risk_assessment: await this.assessOptimizationRisks(optimizations)
        


### src/agents/experts/GitHubActionsExpert.ts:725
Context: metadata
Object: workflows_analyzed: params.current_workflows.length,
          optimization_areas: Object.keys(params.optimization_goals || {


### src/agents/experts/GitHubActionsExpert.ts:772
Context: on
Object: push: { branches: options.branches || ['main', 'develop'] 


### src/agents/experts/GitHubActionsExpert.ts:774
Context: pull_request
Object: branches: options.branches || ['main', 'develop'] 


### src/agents/experts/GitHubActionsExpert.ts:776
Context: jobs
Object: 


### src/agents/experts/GitHubActionsExpert.ts:816
Context: on
Object: push: { branches: options.branches || ['main'] 


### src/agents/experts/GitHubActionsExpert.ts:818
Context: pull_request
Object: branches: options.branches || ['main'] 


### src/agents/experts/GitHubActionsExpert.ts:821
Context: jobs
Object: security: await this.generateSecurityJob(language, 'advanced')
      


### src/agents/experts/GitHubActionsExpert.ts:841
Context: on
Object: push: { branches: ['main'] 


### src/agents/experts/GitHubActionsExpert.ts:844
Context: jobs
Object: release: {
          'runs-on': 'ubuntu-latest',
          if: "!contains(github.event.head_commit.message, 'chore(release)')",
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v4',
              with: { 'fetch-depth': 0 


### src/agents/experts/GitHubActionsExpert.ts:857
Context: with
Object: 'node-version': '20' 


### src/agents/experts/GitHubActionsExpert.ts:865
Context: env
Object: 'GITHUB_TOKEN': '\${{ secrets.GITHUB_TOKEN 


### src/agents/experts/GitHubActionsExpert.ts:885
Context: on
Object: pull_request: { types: ['opened', 'synchronize', 'reopened'] 


### src/agents/experts/GitHubActionsExpert.ts:888
Context: jobs
Object: 'pr-automation': {
          'runs-on': 'ubuntu-latest',
          steps: [
            {
              name: 'Auto-label PR',
              uses: 'actions/labeler@v4',
              with: { 'repo-token': '\${{ secrets.GITHUB_TOKEN 


### src/agents/experts/GitHubActionsExpert.ts:900
Context: env
Object: 'GITHUB_TOKEN': '\${{ secrets.GITHUB_TOKEN 


### src/agents/experts/GitHubActionsExpert.ts:921
Context: on
Object: push: { branches: ['main'] 


### src/agents/experts/GitHubActionsExpert.ts:924
Context: jobs
Object: deploy: await this.generateDeployJob(target, projectConfig, options)
      


### src/agents/experts/GitHubActionsExpert.ts:941
Context: on
Object: push: { branches: options.branches || ['main'] 


### src/agents/experts/GitHubActionsExpert.ts:944
Context: jobs
Object: custom: {
          'runs-on': 'ubuntu-latest',
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v4'
            


### src/agents/experts/GitHubActionsExpert.ts:979
Context: matrix
Object: os: ['ubuntu-latest', 'windows-latest', 'macos-latest'],
          node: language === 'nodejs' ? ['18', '20', '22'] : undefined,
          python: language === 'python' ? ['3.9', '3.10', '3.11', '3.12'] : undefined
        


### src/agents/experts/GitHubActionsExpert.ts:999
Context: with
Object: 'node-version': options.matrix_testing ? '\${{ matrix.node 


### src/agents/experts/GitHubActionsExpert.ts:1008
Context: with
Object: 'python-version': options.matrix_testing ? '\${{ matrix.python 


### src/agents/experts/GitHubActionsExpert.ts:1034
Context: with
Object: name: 'test-results',
          path: 'test-results/'
        


### src/agents/experts/GitHubActionsExpert.ts:1060
Context: with
Object: 'node-version': '20',
          cache: packageManager
        


### src/agents/experts/GitHubActionsExpert.ts:1069
Context: with
Object: 'python-version': '3.11'
        


### src/agents/experts/GitHubActionsExpert.ts:1103
Context: with
Object: languages: this.getCodeQLLanguages(language)
        


### src/agents/experts/GitHubActionsExpert.ts:1126
Context: with
Object: config: 'auto'
      


### src/agents/experts/GitHubActionsExpert.ts:1159
Context: with
Object: 'node-version': '20',
          cache: packageManager
        


### src/agents/experts/GitHubActionsExpert.ts:1180
Context: with
Object: name: 'build-artifacts',
          path: await this.getBuildOutputPath(language)
        


### src/agents/experts/GitHubActionsExpert.ts:1204
Context: with
Object: name: 'build-artifacts'
          


### src/agents/experts/GitHubActionsExpert.ts:1264
Context: required_status_checks
Object: strict: true,
        contexts: ['test', 'lint']
      


### src/agents/experts/GitHubActionsExpert.ts:1270
Context: required_pull_request_reviews
Object: required_approving_review_count: teamSize === 'solo' ? 0 : 1,
        dismiss_stale_reviews: true,
        require_code_owner_reviews: teamSize !== 'solo'
      


### src/agents/experts/GitHubActionsExpert.ts:1460
Context: dashboards
Object: grafana: 'workflow-performance',
        github_insights: 'actions-usage'
      


### src/agents/experts/GitHubActionsExpert.ts:1506
Context: with
Object: path: cachePaths[packageManager] || '~/.cache',
        key: `${language


### src/agents/experts/GitHubActionsExpert.ts:1618
Context: with
Object: 'vercel-token': '\${{ secrets.VERCEL_TOKEN 


### src/agents/experts/GitHubActionsExpert.ts:1630
Context: with
Object: 'publish-dir': './dist',
            'production-branch': 'main',
            'github-token': '\${{ secrets.GITHUB_TOKEN 


### src/agents/experts/GitHubActionsExpert.ts:1636
Context: env
Object: 'NETLIFY_AUTH_TOKEN': '\${{ secrets.NETLIFY_AUTH_TOKEN 


### src/agents/experts/GitHubActionsExpert.ts:1646
Context: with
Object: 'aws-access-key-id': '\${{ secrets.AWS_ACCESS_KEY_ID 


### src/agents/experts/ErrorAnalysisExpert.ts:136
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.1,
        maxTokens: 4000
      


### src/agents/experts/ErrorAnalysisExpert.ts:141
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/ErrorAnalysisExpert.ts:146
Context: metadata
Object: supportedLogFormats: ['JSON', 'Syslog', 'Common Log Format', 'Custom'],
        supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Java'],
        integrations: ['ELK Stack', 'Datadog', 'Sentry', 'New Relic']
      


### src/agents/experts/ErrorAnalysisExpert.ts:159
Context: parameters
Object: type: 'object',
          properties: {
            log_sources: {
              type: 'array',
              items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:167
Context: analysis_type
Object: type: 'string',
              enum: ['pattern-recognition', 'anomaly-detection', 'trend-analysis', 'correlation', 'comprehensive'],
              description: 'Type of analysis to perform'
            


### src/agents/experts/ErrorAnalysisExpert.ts:172
Context: time_range
Object: type: 'object',
              properties: {
                start: { type: 'string', description: 'Start time (ISO 8601 format)' 


### src/agents/experts/ErrorAnalysisExpert.ts:176
Context: end
Object: type: 'string', description: 'End time (ISO 8601 format)' 


### src/agents/experts/ErrorAnalysisExpert.ts:180
Context: pattern_filters
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:185
Context: ml_algorithms
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['clustering', 'anomaly-detection', 'sequence-mining', 'classification']
              


### src/agents/experts/ErrorAnalysisExpert.ts:193
Context: correlation_config
Object: type: 'object',
              properties: {
                correlation_window: { type: 'number', description: 'Time window in seconds' 


### src/agents/experts/ErrorAnalysisExpert.ts:197
Context: min_correlation
Object: type: 'number', description: 'Minimum correlation coefficient' 


### src/agents/experts/ErrorAnalysisExpert.ts:200
Context: output_format
Object: type: 'string',
              enum: ['detailed', 'summary', 'dashboard', 'report'],
              default: 'detailed'
            


### src/agents/experts/ErrorAnalysisExpert.ts:213
Context: parameters
Object: type: 'object',
          properties: {
            stack_trace: {
              type: 'string',
              description: 'The stack trace to analyze'
            


### src/agents/experts/ErrorAnalysisExpert.ts:220
Context: error_context
Object: type: 'object',
              properties: {
                error_message: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:224
Context: error_type
Object: type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:225
Context: timestamp
Object: type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:226
Context: environment
Object: type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:230
Context: source_language
Object: type: 'string',
              enum: ['typescript', 'javascript', 'python', 'go', 'java'],
              description: 'Programming language of the source code'
            


### src/agents/experts/ErrorAnalysisExpert.ts:235
Context: include_source
Object: type: 'boolean',
              description: 'Include source code analysis',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:240
Context: similar_errors
Object: type: 'boolean',
              description: 'Search for similar historical errors',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:245
Context: dependency_analysis
Object: type: 'boolean',
              description: 'Analyze dependencies for issues',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:250
Context: fix_suggestions
Object: type: 'boolean',
              description: 'Generate fix suggestions',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:263
Context: parameters
Object: type: 'object',
          properties: {
            incident_data: {
              type: 'object',
              properties: {
                error_id: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:270
Context: symptoms
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:271
Context: affected_services
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:272
Context: timeline
Object: type: 'array', items: { type: 'object' 


### src/agents/experts/ErrorAnalysisExpert.ts:276
Context: data_sources
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['logs', 'metrics', 'traces', 'events'] 


### src/agents/experts/ErrorAnalysisExpert.ts:282
Context: location
Object: type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:287
Context: analysis_depth
Object: type: 'string',
              enum: ['shallow', 'medium', 'deep', 'exhaustive'],
              default: 'deep'
            


### src/agents/experts/ErrorAnalysisExpert.ts:292
Context: correlation_methods
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['temporal', 'causal', 'statistical', 'graph-based']
              


### src/agents/experts/ErrorAnalysisExpert.ts:300
Context: hypothesis_generation
Object: type: 'boolean',
              description: 'Generate and test hypotheses',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:305
Context: impact_analysis
Object: type: 'boolean',
              description: 'Analyze impact on system',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:318
Context: parameters
Object: type: 'object',
          properties: {
            prediction_scope: {
              type: 'string',
              enum: ['system-wide', 'service-specific', 'component-specific'],
              description: 'Scope of prediction'
            


### src/agents/experts/ErrorAnalysisExpert.ts:326
Context: historical_data
Object: type: 'object',
              properties: {
                time_range: { type: 'string', description: 'Historical data range (e.g., "30d", "6m")' 


### src/agents/experts/ErrorAnalysisExpert.ts:330
Context: data_sources
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:333
Context: prediction_models
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['time-series', 'classification', 'regression', 'ensemble']
              


### src/agents/experts/ErrorAnalysisExpert.ts:341
Context: risk_factors
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  factor: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:347
Context: weight
Object: type: 'number' 


### src/agents/experts/ErrorAnalysisExpert.ts:352
Context: prediction_horizon
Object: type: 'string',
              description: 'How far ahead to predict (e.g., "1h", "24h", "7d")',
              default: '24h'
            


### src/agents/experts/ErrorAnalysisExpert.ts:357
Context: confidence_threshold
Object: type: 'number',
              description: 'Minimum confidence for predictions',
              default: 0.7
            


### src/agents/experts/ErrorAnalysisExpert.ts:362
Context: preventive_actions
Object: type: 'boolean',
              description: 'Suggest preventive actions',
              default: true
            


### src/agents/experts/ErrorAnalysisExpert.ts:375
Context: parameters
Object: type: 'object',
          properties: {
            error_details: {
              type: 'object',
              properties: {
                error_id: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:382
Context: error_type
Object: type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:383
Context: severity
Object: type: 'string', enum: ['low', 'medium', 'high', 'critical'] 


### src/agents/experts/ErrorAnalysisExpert.ts:384
Context: affected_components
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:388
Context: resolution_strategy
Object: type: 'string',
              enum: ['auto', 'guided', 'manual-approval', 'rollback'],
              default: 'auto'
            


### src/agents/experts/ErrorAnalysisExpert.ts:393
Context: available_actions
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['restart', 'scale', 'rollback', 'failover', 'patch', 'reconfigure']
              


### src/agents/experts/ErrorAnalysisExpert.ts:401
Context: safety_checks
Object: type: 'object',
              properties: {
                dry_run: { type: 'boolean', default: true 


### src/agents/experts/ErrorAnalysisExpert.ts:405
Context: rollback_enabled
Object: type: 'boolean', default: true 


### src/agents/experts/ErrorAnalysisExpert.ts:406
Context: max_retries
Object: type: 'number', default: 3 


### src/agents/experts/ErrorAnalysisExpert.ts:409
Context: automation_level
Object: type: 'string',
              enum: ['full', 'semi', 'advisory'],
              default: 'semi'
            


### src/agents/experts/ErrorAnalysisExpert.ts:414
Context: notification_config
Object: type: 'object',
              properties: {
                notify_before: { type: 'boolean' 


### src/agents/experts/ErrorAnalysisExpert.ts:418
Context: notify_after
Object: type: 'boolean' 


### src/agents/experts/ErrorAnalysisExpert.ts:419
Context: channels
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/ErrorAnalysisExpert.ts:523
Context: data
Object: analysis_summary: {
            total_logs_analyzed: Math.floor(Math.random() * 100000) + 10000,
            time_range: params.time_range || { start: '24h ago', end: 'now' 


### src/agents/experts/ErrorAnalysisExpert.ts:540
Context: metadata
Object: analysis_type: params.analysis_type,
          log_sources: params.log_sources,
          ml_algorithms_used: params.ml_algorithms || ['clustering', 'anomaly-detection'],
          rag_enhanced: !!enhancedPatterns
        


### src/agents/experts/ErrorAnalysisExpert.ts:623
Context: data
Object: stack_analysis: analysis,
          root_cause: rootCause,
          similar_errors: similarErrors,
          dependency_issues: dependencies,
          fix_suggestions: fixes,
          error_classification: await this.classifyError(analysis),
          impact_assessment: await this.assessImpact(analysis)
        


### src/agents/experts/ErrorAnalysisExpert.ts:632
Context: metadata
Object: source_language: params.source_language || 'unknown',
          error_type: params.error_context?.error_type,
          analysis_depth: params.include_source ? 'deep' : 'shallow',
          ai_enhanced: aiFixSuggestions.length > 0
        


### src/agents/experts/ErrorAnalysisExpert.ts:706
Context: data
Object: root_causes: rootCauses,
          correlation_analysis: correlations,
          hypotheses: hypotheses,
          impact_analysis: impact,
          timeline_analysis: await this.analyzeTimeline(params.incident_data.timeline),
          remediation_steps: await this.generateRemediationSteps(rootCauses),
          prevention_recommendations: await this.generatePreventionRecommendations(rootCauses),
          ai_root_cause_analysis: aiRootCauseAnalysis
        


### src/agents/experts/ErrorAnalysisExpert.ts:716
Context: metadata
Object: analysis_depth: params.analysis_depth,
          data_sources_analyzed: params.data_sources.length,
          correlation_methods: params.correlation_methods || ['temporal', 'causal'],
          ai_enhanced: !!aiRootCauseAnalysis
        


### src/agents/experts/ErrorAnalysisExpert.ts:788
Context: data
Object: predictions: predictions,
          risk_assessment: riskAssessment,
          preventive_actions: preventiveActions,
          confidence_scores: await this.calculateConfidenceScores(predictions),
          trend_analysis: await this.analyzePredictionTrends(predictions),
          alert_recommendations: await this.generateAlertRecommendations(predictions),
          monitoring_strategy: await this.generateMonitoringStrategy(predictions),
          ai_predictions: aiPredictions
        


### src/agents/experts/ErrorAnalysisExpert.ts:798
Context: metadata
Object: prediction_scope: params.prediction_scope,
          prediction_horizon: params.prediction_horizon,
          models_used: params.prediction_models || ['time-series', 'ensemble'],
          ai_enhanced: !!aiPredictions
        


### src/agents/experts/ErrorAnalysisExpert.ts:871
Context: data
Object: resolution_strategy: strategy,
          planned_actions: actions,
          execution_result: executionResult,
          rollback_plan: await this.generateRollbackPlan(actions),
          success_criteria: await this.defineSuccessCriteria(params.error_details),
          monitoring_plan: await this.generateMonitoringPlan(params.error_details),
          post_resolution_validation: await this.generateValidationSteps(actions),
          ai_resolution_plan: aiResolutionPlan
        


### src/agents/experts/ErrorAnalysisExpert.ts:881
Context: metadata
Object: error_id: params.error_details.error_id,
          automation_level: params.automation_level,
          dry_run: params.safety_checks?.dry_run || false,
          ai_enhanced: !!aiResolutionPlan
        


### src/agents/experts/ErrorAnalysisExpert.ts:918
Context: data
Object: message: 'Please provide a stack trace to analyze using the stack_trace_analyzer tool',
            suggested_tool: 'stack_trace_analyzer'
          


### src/agents/experts/ErrorAnalysisExpert.ts:926
Context: historical_data
Object: time_range: '30d',
            data_sources: ['logs', 'metrics']
          


### src/agents/experts/ErrorAnalysisExpert.ts:936
Context: data
Object: available_tools: this.getToolDefinitions().map(t => ({
              name: t.name,
              description: t.description
            


### src/agents/experts/ErrorAnalysisExpert.ts:1014
Context: error_rate_trend
Object: direction: 'increasing',
        rate: 0.15,
        projection: 'Critical threshold in 4 hours'
      


### src/agents/experts/ErrorAnalysisExpert.ts:1019
Context: performance_trend
Object: direction: 'stable',
        rate: 0.02,
        projection: 'Within normal bounds'
      


### src/agents/experts/ErrorAnalysisExpert.ts:1024
Context: volume_trend
Object: direction: 'decreasing',
        rate: -0.08,
        projection: 'Expected seasonal pattern'
      


### src/agents/experts/ErrorAnalysisExpert.ts:1074
Context: time_series
Object: labels: Array.from({length: 24


### src/agents/experts/ErrorAnalysisExpert.ts:1087
Context: pattern_distribution
Object: labels: patterns.map(p => p.pattern.split('.*')[1]),
        data: patterns.map(p => p.frequency)
      


### src/agents/experts/ErrorAnalysisExpert.ts:1290
Context: user_impact
Object: affected_users: 5000,
        impact_duration: '45 minutes',
        features_unavailable: ['checkout', 'payment processing']
      


### src/agents/experts/ErrorAnalysisExpert.ts:1295
Context: business_impact
Object: revenue_loss_estimate: '$15,000',
        reputation_impact: 'medium',
        sla_breach: true
      


### src/agents/experts/ErrorAnalysisExpert.ts:1397
Context: risk_timeline
Object: '1h': 'low',
        '4h': 'medium',
        '8h': 'high',
        '24h': 'high'
      


### src/agents/experts/ErrorAnalysisExpert.ts:1438
Context: accuracy_history
Object: '7d': 0.89,
        '30d': 0.86,
        '90d': 0.84
      


### src/agents/experts/ErrorAnalysisExpert.ts:1510
Context: parameters
Object: scale_factor: 1.5 


### src/agents/experts/ErrorAnalysisExpert.ts:1522
Context: parameters
Object: failover_mode: 'immediate',
            backup_region: 'secondary'
          


### src/agents/experts/ErrorAnalysisExpert.ts:1534
Context: parameters
Object: rollback_version: 'last_stable',
          preserve_data: true
        


### src/agents/experts/ErrorAnalysisExpert.ts:1547
Context: predicted_outcome
Object: success_probability: 0.87,
        estimated_duration: '5 minutes',
        potential_side_effects: ['Brief service interruption']
      


### src/agents/experts/ErrorAnalysisExpert.ts:1586
Context: immediate_success
Object: error_cleared: true,
        service_responsive: true,
        no_new_errors: true
      


### src/agents/experts/ErrorAnalysisExpert.ts:1591
Context: sustained_success
Object: duration: '30 minutes',
        error_rate: '< 0.1%',
        performance_metrics: 'within SLA'
      


### src/agents/experts/ErrorAnalysisExpert.ts:1608
Context: alert_thresholds
Object: error_rate: 0.5,
        response_time_p99: 2000
      


### src/agents/experts/DocumentationExpert.ts:120
Context: metadata
Object: supportedFormats: ['HTML', 'JSON', 'Markdown', 'PDF', 'RST', 'AsciiDoc'],
        supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#'],
        documentationTypes: ['API', 'User', 'Developer', 'Architecture', 'Tutorial'],
        ragEnabled: true,
        knowledgeDomains: this.ragConfig.knowledgeDomains.length
      


### src/agents/experts/DocumentationExpert.ts:127
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.1,
        maxTokens: 4000
      


### src/agents/experts/DocumentationExpert.ts:140
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to TypeScript source files or entry points'
            


### src/agents/experts/DocumentationExpert.ts:147
Context: output_format
Object: type: 'string',
              enum: ['html', 'json', 'markdown', 'multi'],
              description: 'Output format for documentation'
            


### src/agents/experts/DocumentationExpert.ts:152
Context: output_path
Object: type: 'string',
              description: 'Output directory for generated documentation'
            


### src/agents/experts/DocumentationExpert.ts:156
Context: entry_strategy
Object: type: 'string',
              enum: ['expand', 'packages', 'resolve'],
              description: 'TypeDoc entry point strategy'
            


### src/agents/experts/DocumentationExpert.ts:161
Context: include_private
Object: type: 'boolean',
              description: 'Include private members in documentation',
              default: false
            


### src/agents/experts/DocumentationExpert.ts:166
Context: theme
Object: type: 'string',
              enum: ['default', 'minimal', 'hierarchy'],
              description: 'Documentation theme'
            


### src/agents/experts/DocumentationExpert.ts:171
Context: watch_mode
Object: type: 'boolean',
              description: 'Enable watch mode for real-time updates',
              default: false
            


### src/agents/experts/DocumentationExpert.ts:176
Context: validation_rules
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/DocumentationExpert.ts:189
Context: parameters
Object: type: 'object',
          properties: {
            project_path: {
              type: 'string',
              description: 'Path to the TypeScript project'
            


### src/agents/experts/DocumentationExpert.ts:196
Context: entry_point
Object: type: 'string',
              description: 'Main entry point file (e.g., index.ts)'
            


### src/agents/experts/DocumentationExpert.ts:200
Context: api_review
Object: type: 'boolean',
              description: 'Generate API review files for change tracking',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:205
Context: doc_model
Object: type: 'boolean',
              description: 'Generate API documentation model',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:210
Context: rollup_types
Object: type: 'boolean',
              description: 'Generate rollup .d.ts file',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:215
Context: validation_level
Object: type: 'string',
              enum: ['strict', 'moderate', 'permissive'],
              description: 'API validation strictness level'
            


### src/agents/experts/DocumentationExpert.ts:228
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source files to analyze'
            


### src/agents/experts/DocumentationExpert.ts:235
Context: doc_standard
Object: type: 'string',
              enum: ['tsdoc', 'jsdoc', 'mixed'],
              description: 'Documentation standard to validate against'
            


### src/agents/experts/DocumentationExpert.ts:240
Context: coverage_threshold
Object: type: 'number',
              description: 'Minimum documentation coverage percentage',
              default: 80
            


### src/agents/experts/DocumentationExpert.ts:245
Context: check_links
Object: type: 'boolean',
              description: 'Validate internal and external links',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:250
Context: check_examples
Object: type: 'boolean',
              description: 'Validate code examples in documentation',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:255
Context: report_format
Object: type: 'string',
              enum: ['detailed', 'summary', 'ci'],
              description: 'Format of the quality report'
            


### src/agents/experts/DocumentationExpert.ts:268
Context: parameters
Object: type: 'object',
          properties: {
            platform: {
              type: 'string',
              enum: ['github-actions', 'gitlab-ci', 'jenkins', 'azure-devops'],
              description: 'CI/CD platform for automation'
            


### src/agents/experts/DocumentationExpert.ts:276
Context: trigger_events
Object: type: 'array',
              items: { 
                type: 'string',
                enum: ['push', 'pull-request', 'release', 'schedule']
              


### src/agents/experts/DocumentationExpert.ts:284
Context: deployment_target
Object: type: 'string',
              enum: ['github-pages', 'netlify', 'vercel', 's3', 'self-hosted'],
              description: 'Where to deploy generated documentation'
            


### src/agents/experts/DocumentationExpert.ts:289
Context: notification_channels
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/DocumentationExpert.ts:294
Context: quality_gates
Object: type: 'boolean',
              description: 'Enable quality gates in CI/CD pipeline',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:299
Context: cache_strategy
Object: type: 'string',
              enum: ['aggressive', 'moderate', 'minimal'],
              description: 'Caching strategy for faster builds'
            


### src/agents/experts/DocumentationExpert.ts:312
Context: parameters
Object: type: 'object',
          properties: {
            input_format: {
              type: 'string',
              enum: ['typedoc-json', 'markdown', 'html', 'openapi'],
              description: 'Source documentation format'
            


### src/agents/experts/DocumentationExpert.ts:320
Context: input_path
Object: type: 'string',
              description: 'Path to source documentation'
            


### src/agents/experts/DocumentationExpert.ts:324
Context: output_formats
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['html', 'pdf', 'markdown', 'docx', 'confluence', 'notion']
              


### src/agents/experts/DocumentationExpert.ts:332
Context: output_directory
Object: type: 'string',
              description: 'Directory for converted documentation'
            


### src/agents/experts/DocumentationExpert.ts:336
Context: enhance_features
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['search', 'navigation', 'code-highlighting', 'interactive-examples', 'analytics']
              


### src/agents/experts/DocumentationExpert.ts:344
Context: branding
Object: type: 'object',
              description: 'Custom branding configuration (colors, logos, etc.)'
            


### src/agents/experts/DocumentationExpert.ts:348
Context: seo_optimization
Object: type: 'boolean',
              description: 'Enable SEO optimization for web formats',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:361
Context: parameters
Object: type: 'object',
          properties: {
            project_path: {
              type: 'string',
              description: 'Path to the project root'
            


### src/agents/experts/DocumentationExpert.ts:368
Context: readme_style
Object: type: 'string',
              enum: ['standard', 'detailed', 'minimal', 'awesome-list'],
              description: 'Style of README to generate'
            


### src/agents/experts/DocumentationExpert.ts:373
Context: sections
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['overview', 'installation', 'usage', 'api', 'contributing', 'license', 'changelog', 'roadmap', 'faq']
              


### src/agents/experts/DocumentationExpert.ts:381
Context: badges
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['build', 'coverage', 'version', 'downloads', 'license', 'dependencies', 'size', 'activity']
              


### src/agents/experts/DocumentationExpert.ts:389
Context: code_examples
Object: type: 'boolean',
              description: 'Include code examples from source',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:394
Context: table_of_contents
Object: type: 'boolean',
              description: 'Generate table of contents',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:399
Context: language
Object: type: 'string',
              description: 'Language for README content',
              default: 'en'
            


### src/agents/experts/DocumentationExpert.ts:412
Context: parameters
Object: type: 'object',
          properties: {
            repository_path: {
              type: 'string',
              description: 'Path to git repository'
            


### src/agents/experts/DocumentationExpert.ts:419
Context: changelog_format
Object: type: 'string',
              enum: ['conventional', 'keep-a-changelog', 'github-releases', 'custom'],
              description: 'Changelog format standard'
            


### src/agents/experts/DocumentationExpert.ts:424
Context: version_strategy
Object: type: 'string',
              enum: ['semantic', 'calendar', 'custom'],
              description: 'Versioning strategy'
            


### src/agents/experts/DocumentationExpert.ts:429
Context: from_version
Object: type: 'string',
              description: 'Starting version or tag'
            


### src/agents/experts/DocumentationExpert.ts:433
Context: to_version
Object: type: 'string',
              description: 'Ending version or tag (defaults to HEAD)'
            


### src/agents/experts/DocumentationExpert.ts:437
Context: include_sections
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['features', 'fixes', 'breaking', 'deprecated', 'security', 'performance', 'documentation']
              


### src/agents/experts/DocumentationExpert.ts:445
Context: group_by
Object: type: 'string',
              enum: ['type', 'scope', 'author', 'none'],
              description: 'How to group changes'
            


### src/agents/experts/DocumentationExpert.ts:450
Context: auto_link_issues
Object: type: 'boolean',
              description: 'Automatically link to issues and PRs',
              default: true
            


### src/agents/experts/DocumentationExpert.ts:463
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code for diagram generation'
            


### src/agents/experts/DocumentationExpert.ts:470
Context: diagram_type
Object: type: 'string',
              enum: ['architecture', 'class', 'sequence', 'flowchart', 'entity-relationship', 'component', 'deployment'],
              description: 'Type of diagram to generate'
            


### src/agents/experts/DocumentationExpert.ts:475
Context: output_format
Object: type: 'string',
              enum: ['svg', 'png', 'mermaid', 'plantuml', 'graphviz'],
              description: 'Output format for diagrams'
            


### src/agents/experts/DocumentationExpert.ts:480
Context: detail_level
Object: type: 'string',
              enum: ['high', 'medium', 'low'],
              description: 'Level of detail in diagrams'
            


### src/agents/experts/DocumentationExpert.ts:485
Context: include_private
Object: type: 'boolean',
              description: 'Include private members in diagrams',
              default: false
            


### src/agents/experts/DocumentationExpert.ts:490
Context: color_scheme
Object: type: 'string',
              enum: ['default', 'dark', 'light', 'contrast', 'custom'],
              description: 'Color scheme for diagrams'
            


### src/agents/experts/DocumentationExpert.ts:495
Context: layout_algorithm
Object: type: 'string',
              enum: ['hierarchical', 'circular', 'force-directed', 'orthogonal'],
              description: 'Layout algorithm for diagram arrangement'
            


### src/agents/experts/DocumentationExpert.ts:534
Context: params
Object: source_path: string
    output_format: 'html' | 'json' | 'markdown' | 'multi'
    output_path: string
    entry_strategy?: 'expand' | 'packages' | 'resolve'
    include_private?: boolean
    theme?: 'default' | 'minimal' | 'hierarchy'
    watch_mode?: boolean
    validation_rules?: string[]
  


### src/agents/experts/DocumentationExpert.ts:583
Context: metadata
Object: source_path: params.source_path,
          output_format: params.output_format,
          theme: params.theme || 'default'
        


### src/agents/experts/DocumentationExpert.ts:603
Context: params
Object: project_path: string
    entry_point: string
    api_review?: boolean
    doc_model?: boolean
    rollup_types?: boolean
    validation_level?: 'strict' | 'moderate' | 'permissive'
  


### src/agents/experts/DocumentationExpert.ts:651
Context: metadata
Object: project_path: params.project_path,
          entry_point: params.entry_point,
          validation_level: params.validation_level || 'moderate'
        


### src/agents/experts/DocumentationExpert.ts:671
Context: params
Object: source_path: string
    doc_standard?: 'tsdoc' | 'jsdoc' | 'mixed'
    coverage_threshold?: number
    check_links?: boolean
    check_examples?: boolean
    report_format?: 'detailed' | 'summary' | 'ci'
  


### src/agents/experts/DocumentationExpert.ts:702
Context: metadata
Object: source_path: params.source_path,
          coverage_score: quality.overallScore,
          meets_threshold: quality.overallScore >= (params.coverage_threshold || 80)
        


### src/agents/experts/DocumentationExpert.ts:722
Context: params
Object: platform: 'github-actions' | 'gitlab-ci' | 'jenkins' | 'azure-devops'
    trigger_events?: ('push' | 'pull-request' | 'release' | 'schedule')[]
    deployment_target: 'github-pages' | 'netlify' | 'vercel' | 's3' | 'self-hosted'
    notification_channels?: string[]
    quality_gates?: boolean
    cache_strategy?: 'aggressive' | 'moderate' | 'minimal'
  


### src/agents/experts/DocumentationExpert.ts:757
Context: metadata
Object: platform: params.platform,
          deployment_target: params.deployment_target,
          has_quality_gates: !!params.quality_gates
        


### src/agents/experts/DocumentationExpert.ts:777
Context: params
Object: input_format: 'typedoc-json' | 'markdown' | 'html' | 'openapi'
    input_path: string
    output_formats: ('html' | 'pdf' | 'markdown' | 'docx' | 'confluence' | 'notion')[]
    output_directory: string
    enhance_features?: ('search' | 'navigation' | 'code-highlighting' | 'interactive-examples' | 'analytics')[]
    branding?: any
    seo_optimization?: boolean
  


### src/agents/experts/DocumentationExpert.ts:814
Context: metadata
Object: input_format: params.input_format,
          output_formats: params.output_formats,
          enhanced_features: params.enhance_features || [],
          file_count: optimized.files.length
        


### src/agents/experts/DocumentationExpert.ts:845
Context: validation
Object: notExported: true,
        invalidLink: true,
        notDocumented: params.validation_rules?.includes('require_docs') || false
      


### src/agents/experts/DocumentationExpert.ts:899
Context: compiler
Object: tsconfigFilePath: '<projectFolder>/tsconfig.json'
      


### src/agents/experts/DocumentationExpert.ts:902
Context: apiReport
Object: enabled: params.api_review !== false,
        reportFolder: '<projectFolder>/etc/',
        reportFileName: '<unscopedPackageName>.api.md'
      


### src/agents/experts/DocumentationExpert.ts:907
Context: docModel
Object: enabled: params.doc_model !== false,
        apiJsonFilePath: '<projectFolder>/etc/<unscopedPackageName>.api.json'
      


### src/agents/experts/DocumentationExpert.ts:911
Context: dtsRollup
Object: enabled: params.rollup_types !== false,
        untrimmedFilePath: '<projectFolder>/dist/<unscopedPackageName>.d.ts'
      


### src/agents/experts/DocumentationExpert.ts:915
Context: messages
Object: compilerMessageReporting: {
          default: {
            logLevel: params.validation_level === 'strict' ? 'error' : 'warning'
          


### src/agents/experts/DocumentationExpert.ts:921
Context: extractorMessageReporting
Object: default: {
            logLevel: params.validation_level === 'permissive' ? 'none' : 'warning'
          


### src/agents/experts/DocumentationExpert.ts:967
Context: coverageByFile
Object: 'src/index.ts': 95,
        'src/utils.ts': 80,
        'src/types.ts': 90
      


### src/agents/experts/DocumentationExpert.ts:1086
Context: jobs
Object: docs: {
          'runs-on': 'ubuntu-latest',
          steps: [
            { uses: 'actions/checkout@v4' 


### src/agents/experts/DocumentationExpert.ts:1091
Context: with
Object: 'node-version': '18', cache: 'npm' 


### src/agents/experts/DocumentationExpert.ts:1128
Context: with
Object: github_token: '${{ secrets.GITHUB_TOKEN 


### src/agents/experts/DocumentationExpert.ts:1136
Context: with
Object: 'publish-dir': './docs',
          'production-branch': 'main',
          'github-token': '${{ secrets.GITHUB_TOKEN 


### src/agents/experts/DocumentationExpert.ts:1146
Context: with
Object: 'vercel-token': '${{ secrets.VERCEL_TOKEN 


### src/agents/experts/DocumentationExpert.ts:1170
Context: thresholds
Object: coverage: 80,
        quality_score: 70,
        link_validation: 95
      


### src/agents/experts/DocumentationExpert.ts:1184
Context: templates
Object: success: 'Documentation deployed successfully to {deployment_url


### src/agents/experts/DocumentationExpert.ts:1186
Context: logs
Object: build_url


### src/agents/experts/DocumentationExpert.ts:1187
Context: Score
Object: quality_score


### src/agents/experts/DocumentationExpert.ts:1216
Context: analysis
Object: totalPages: 25,
        totalSections: 150,
        codeBlocks: 45,
        images: 12,
        links: 89
      


### src/agents/experts/DocumentationExpert.ts:1224
Context: metadata
Object: version: '1.0.0', lastUpdated: new Date().toISOString() 


### src/agents/experts/DocumentationExpert.ts:1226
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/DocumentationExpert.ts:1245
Context: summary
Object: totalFormats: formats.length,
        totalFiles: formats.length,
        totalSize: conversions.reduce((sum, conv) => sum + conv.size, 0)
      


### src/agents/experts/DocumentationExpert.ts:1263
Context: interactivity
Object: searchEnabled: features.includes('search'),
        navigationEnabled: features.includes('navigation'),
        syntaxHighlighting: features.includes('code-highlighting'),
        liveExamples: features.includes('interactive-examples'),
        analytics: features.includes('analytics')
      


### src/agents/experts/DocumentationExpert.ts:1275
Context: search
Object: provider: 'lunr', indexing: 'full-text', fuzzy: true 


### src/agents/experts/DocumentationExpert.ts:1276
Context: navigation
Object: toc: true, breadcrumbs: true, pagination: true 


### src/agents/experts/DocumentationExpert.ts:1279
Context: analytics
Object: provider: 'google-analytics', events: ['page_view', 'search', 'download'] 


### src/agents/experts/DocumentationExpert.ts:1288
Context: branding
Object: applied: true,
        logo: branding.logo || null,
        colors: branding.colors || { primary: '#0066cc', secondary: '#f8f9fa' 


### src/agents/experts/DocumentationExpert.ts:1301
Context: seo
Object: enabled: true,
        sitemap: true,
        robots: true,
        metaTags: true,
        structuredData: true,
        openGraph: true,
        twitterCards: true
      


### src/agents/experts/DocumentationExpert.ts:1393
Context: data
Object: readme_content: this.assembleReadme(sections, badges, codeExamples, params),
          file_path: `${params.project_path


### src/agents/experts/DocumentationExpert.ts:1396
Context: metadata
Object: style: params.readme_style,
            sections: sections.length,
            badges: badges.length,
            has_toc: params.table_of_contents,
            has_examples: params.code_examples,
            language: params.language || 'en'
          


### src/agents/experts/DocumentationExpert.ts:1404
Context: preview
Object: title: `# ${projectAnalysis.name


### src/agents/experts/DocumentationExpert.ts:1417
Context: metadata
Object: project_name: projectAnalysis.name,
          readme_style: params.readme_style,
          sections_count: sections.length,
          badges_count: badges.length,
          file_size: '~12KB'
        


### src/agents/experts/DocumentationExpert.ts:1488
Context: data
Object: changelog_content: changelog,
          file_path: `${params.repository_path


### src/agents/experts/DocumentationExpert.ts:1492
Context: statistics
Object: total_changes: Object.values(parsedCommits).flat().length,
            features: parsedCommits.features.length,
            fixes: parsedCommits.fixes.length,
            breaking_changes: parsedCommits.breaking.length,
            contributors: gitAnalysis.contributors
          


### src/agents/experts/DocumentationExpert.ts:1500
Context: links
Object: compare_url: `https://github.com/org/repo/compare/${params.from_version || 'v2.3.0'


### src/agents/experts/DocumentationExpert.ts:1513
Context: metadata
Object: format: params.changelog_format,
          version_strategy: params.version_strategy || 'semantic',
          changes_count: Object.values(parsedCommits).flat().length,
          from_version: params.from_version || 'v2.3.0',
          to_version: params.to_version || 'HEAD'
        


### src/agents/experts/DocumentationExpert.ts:1551
Context: relationships
Object: inheritance: 12,
          composition: 28,
          aggregation: 15,
          implementation: 18
        


### src/agents/experts/DocumentationExpert.ts:1576
Context: data
Object: diagram_code: diagramCode,
          output_files: [`${params.source_path


### src/agents/experts/DocumentationExpert.ts:1579
Context: diagram_metadata
Object: type: params.diagram_type,
            format: params.output_format,
            elements: diagramData.elements.length,
            connections: diagramData.connections.length,
            complexity: this.calculateDiagramComplexity(diagramData)
          


### src/agents/experts/DocumentationExpert.ts:1587
Context: rendering_options
Object: width: params.diagram_type === 'architecture' ? 1920 : 1200,
            height: params.diagram_type === 'architecture' ? 1080 : 800,
            dpi: params.output_format === 'png' ? 300 : 72,
            anti_aliasing: true
          


### src/agents/experts/DocumentationExpert.ts:1593
Context: integration_code
Object: markdown: `![${params.diagram_type


### src/agents/experts/DocumentationExpert.ts:1601
Context: metadata
Object: diagram_type: params.diagram_type,
          output_format: params.output_format,
          elements_count: diagramData.elements.length,
          connections_count: diagramData.connections.length,
          file_size_estimate: this.estimateDiagramSize(diagramData, params.output_format)
        


### src/agents/experts/DocumentationExpert.ts:1631
Context: configuration
Object: entryPoints: ['./src/index.ts'],
          out: './docs',
          theme: 'default',
          includeVersion: true,
          excludePrivate: true
        


### src/agents/experts/DocumentationExpert.ts:1856
Context: default
Object: primary: '#4A90E2', secondary: '#F5A623', background: '#FFFFFF' 


### src/agents/experts/DocumentationExpert.ts:1857
Context: dark
Object: primary: '#BB86FC', secondary: '#03DAC6', background: '#121212' 


### src/agents/experts/DocumentationExpert.ts:1858
Context: light
Object: primary: '#1976D2', secondary: '#FFC107', background: '#FAFAFA' 


### src/agents/experts/DatabaseExpert.ts:53
Context: metadata
Object: 


### src/agents/experts/DatabaseExpert.ts:62
Context: parameters
Object: type: 'object',
          properties: {
            schemaPath: {
              type: 'string',
              description: 'Path to schema file or directory'
            


### src/agents/experts/DatabaseExpert.ts:69
Context: format
Object: type: 'string',
              enum: ['sql', 'prisma', 'typeorm', 'sequelize', 'mongoose'],
              description: 'Schema format (auto-detected if not specified)'
            


### src/agents/experts/DatabaseExpert.ts:74
Context: analyzePerformance
Object: type: 'boolean',
              description: 'Include performance analysis'
            


### src/agents/experts/DatabaseExpert.ts:78
Context: includeRecommendations
Object: type: 'boolean',
              description: 'Include optimization recommendations'
            


### src/agents/experts/DatabaseExpert.ts:90
Context: parameters
Object: type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'SQL query to optimize'
            


### src/agents/experts/DatabaseExpert.ts:97
Context: dialect
Object: type: 'string',
              enum: ['mysql', 'postgresql', 'sqlite', 'mssql', 'oracle'],
              description: 'SQL dialect (defaults to postgresql)'
            


### src/agents/experts/DatabaseExpert.ts:102
Context: schema
Object: type: 'object',
              properties: {
                tables: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:111
Context: columns
Object: type: 'array',
                        items: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:115
Context: indexes
Object: type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:121
Context: columns
Object: type: 'array',
                              items: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:125
Context: type
Object: type: 'string',
                              enum: ['btree', 'hash', 'gin', 'gist']
                            


### src/agents/experts/DatabaseExpert.ts:132
Context: rowCount
Object: type: 'number' 


### src/agents/experts/DatabaseExpert.ts:139
Context: executionPlan
Object: type: 'boolean',
              description: 'Include execution plan analysis'
            


### src/agents/experts/DatabaseExpert.ts:143
Context: maxOptimizations
Object: type: 'number',
              description: 'Maximum number of optimizations to apply'
            


### src/agents/experts/DatabaseExpert.ts:155
Context: parameters
Object: type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['generate', 'validate', 'plan', 'status', 'rollback'],
              description: 'Migration action to perform'
            


### src/agents/experts/DatabaseExpert.ts:163
Context: sourceSchema
Object: type: 'string',
              description: 'Path to current schema file'
            


### src/agents/experts/DatabaseExpert.ts:167
Context: targetSchema
Object: type: 'string',
              description: 'Path to target schema file'
            


### src/agents/experts/DatabaseExpert.ts:171
Context: migrationDir
Object: type: 'string',
              description: 'Directory for migration files'
            


### src/agents/experts/DatabaseExpert.ts:175
Context: options
Object: type: 'object',
              properties: {
                dryRun: {
                  type: 'boolean',
                  description: 'Preview changes without creating files'
                


### src/agents/experts/DatabaseExpert.ts:182
Context: autoRollback
Object: type: 'boolean',
                  description: 'Generate rollback scripts'
                


### src/agents/experts/DatabaseExpert.ts:186
Context: validateData
Object: type: 'boolean',
                  description: 'Validate data integrity'
                


### src/agents/experts/DatabaseExpert.ts:190
Context: batchSize
Object: type: 'number',
                  description: 'Batch size for data migrations'
                


### src/agents/experts/DatabaseExpert.ts:194
Context: format
Object: type: 'string',
                  enum: ['sql', 'json', 'typescript'],
                  description: 'Migration file format'
                


### src/agents/experts/DatabaseExpert.ts:209
Context: parameters
Object: type: 'object',
          properties: {
            connectionString: {
              type: 'string',
              description: 'Database connection string'
            


### src/agents/experts/DatabaseExpert.ts:216
Context: tables
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:221
Context: checks
Object: type: 'object',
              properties: {
                foreignKeys: {
                  type: 'boolean',
                  description: 'Check foreign key integrity'
                


### src/agents/experts/DatabaseExpert.ts:228
Context: nullConstraints
Object: type: 'boolean',
                  description: 'Check null constraints'
                


### src/agents/experts/DatabaseExpert.ts:232
Context: uniqueConstraints
Object: type: 'boolean',
                  description: 'Check unique constraints'
                


### src/agents/experts/DatabaseExpert.ts:236
Context: dataTypes
Object: type: 'boolean',
                  description: 'Check data type consistency'
                


### src/agents/experts/DatabaseExpert.ts:240
Context: businessRules
Object: type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:246
Context: table
Object: type: 'string' 


### src/agents/experts/DatabaseExpert.ts:247
Context: condition
Object: type: 'string' 


### src/agents/experts/DatabaseExpert.ts:248
Context: errorMessage
Object: type: 'string' 


### src/agents/experts/DatabaseExpert.ts:253
Context: customQueries
Object: type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' 


### src/agents/experts/DatabaseExpert.ts:259
Context: query
Object: type: 'string' 


### src/agents/experts/DatabaseExpert.ts:260
Context: expectedResult
Object: 


### src/agents/experts/DatabaseExpert.ts:267
Context: options
Object: type: 'object',
              properties: {
                sampleSize: {
                  type: 'number',
                  description: 'Sample size for large tables'
                


### src/agents/experts/DatabaseExpert.ts:274
Context: includeExamples
Object: type: 'boolean',
                  description: 'Include example violations'
                


### src/agents/experts/DatabaseExpert.ts:278
Context: maxExamples
Object: type: 'number',
                  description: 'Maximum examples per issue'
                


### src/agents/experts/DatabaseExpert.ts:282
Context: generateFixQueries
Object: type: 'boolean',
                  description: 'Generate SQL to fix issues'
                


### src/agents/experts/DatabaseExpert.ts:286
Context: detectAnomalies
Object: type: 'boolean',
                  description: 'Enable anomaly detection'
                


### src/agents/experts/DataPipelineExpert.ts:113
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.7,
        maxTokens: 2000
      


### src/agents/experts/DataPipelineExpert.ts:162
Context: metadata
Object: migrationVersion: '2.0.0',
        pattern: 'MO-Expert Hybrid',
        ragEnabled: true,
        lastMigrated: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:169
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/DataPipelineExpert.ts:181
Context: parameters
Object: type: 'object',
          properties: {
            sourceSystem: {
              type: 'string',
              description: 'Source system or data source'
            


### src/agents/experts/DataPipelineExpert.ts:188
Context: targetSystem
Object: type: 'string',
              description: 'Target system or destination'
            


### src/agents/experts/DataPipelineExpert.ts:192
Context: processingType
Object: type: 'string',
              description: 'Processing type (batch, streaming, hybrid)',
              enum: ['batch', 'streaming', 'hybrid']
            


### src/agents/experts/DataPipelineExpert.ts:197
Context: transformations
Object: type: 'array',
              description: 'List of transformations to apply'
            


### src/agents/experts/DataPipelineExpert.ts:201
Context: orchestrationTool
Object: type: 'string',
              description: 'Orchestration tool to use'
            


### src/agents/experts/DataPipelineExpert.ts:213
Context: parameters
Object: type: 'object',
          properties: {
            pipelineConfig: {
              type: 'object',
              description: 'Pipeline configuration to analyze'
            


### src/agents/experts/DataPipelineExpert.ts:220
Context: analysisType
Object: type: 'string',
              description: 'Type of analysis (performance, reliability, cost)',
              enum: ['performance', 'reliability', 'cost', 'comprehensive']
            


### src/agents/experts/DataPipelineExpert.ts:225
Context: includeOptimizations
Object: type: 'boolean',
              description: 'Include optimization recommendations'
            


### src/agents/experts/DataPipelineExpert.ts:237
Context: parameters
Object: type: 'object',
          properties: {
            sourceSchema: {
              type: 'object',
              description: 'Source data schema'
            


### src/agents/experts/DataPipelineExpert.ts:244
Context: targetSchema
Object: type: 'object',
              description: 'Target data schema'
            


### src/agents/experts/DataPipelineExpert.ts:248
Context: transformationRules
Object: type: 'array',
              description: 'Business rules for transformation'
            


### src/agents/experts/DataPipelineExpert.ts:252
Context: language
Object: type: 'string',
              description: 'Target language (SQL, Python, Spark)',
              enum: ['SQL', 'Python', 'Spark', 'DBT']
            


### src/agents/experts/DataPipelineExpert.ts:265
Context: parameters
Object: type: 'object',
          properties: {
            currentSchema: {
              type: 'object',
              description: 'Current schema definition'
            


### src/agents/experts/DataPipelineExpert.ts:272
Context: proposedChanges
Object: type: 'array',
              description: 'Proposed schema changes'
            


### src/agents/experts/DataPipelineExpert.ts:276
Context: backwardCompatibility
Object: type: 'boolean',
              description: 'Ensure backward compatibility'
            


### src/agents/experts/DataPipelineExpert.ts:280
Context: migrationStrategy
Object: type: 'string',
              description: 'Migration strategy to use'
            


### src/agents/experts/DataPipelineExpert.ts:292
Context: parameters
Object: type: 'object',
          properties: {
            pipelineType: {
              type: 'string',
              description: 'Type of pipeline to monitor'
            


### src/agents/experts/DataPipelineExpert.ts:299
Context: metrics
Object: type: 'array',
              description: 'Metrics to track'
            


### src/agents/experts/DataPipelineExpert.ts:303
Context: alertingRules
Object: type: 'array',
              description: 'Alerting rules and thresholds'
            


### src/agents/experts/DataPipelineExpert.ts:307
Context: dashboardRequirements
Object: type: 'object',
              description: 'Dashboard visualization requirements'
            


### src/agents/experts/DataPipelineExpert.ts:319
Context: parameters
Object: type: 'object',
          properties: {
            dataSource: {
              type: 'string',
              description: 'Data source to validate'
            


### src/agents/experts/DataPipelineExpert.ts:326
Context: qualityRules
Object: type: 'array',
              description: 'Quality rules to apply'
            


### src/agents/experts/DataPipelineExpert.ts:330
Context: samplingStrategy
Object: type: 'string',
              description: 'Data sampling strategy'
            


### src/agents/experts/DataPipelineExpert.ts:334
Context: remediationActions
Object: type: 'array',
              description: 'Actions for quality issues'
            


### src/agents/experts/DataPipelineExpert.ts:346
Context: parameters
Object: type: 'object',
          properties: {
            orchestrationTool: {
              type: 'string',
              description: 'Orchestration tool (Airflow, Dagster, Prefect)',
              enum: ['Airflow', 'Dagster', 'Prefect', 'Argo', 'Kubeflow']
            


### src/agents/experts/DataPipelineExpert.ts:354
Context: pipelineSteps
Object: type: 'array',
              description: 'Pipeline steps to orchestrate'
            


### src/agents/experts/DataPipelineExpert.ts:358
Context: schedule
Object: type: 'string',
              description: 'Execution schedule'
            


### src/agents/experts/DataPipelineExpert.ts:362
Context: dependencies
Object: type: 'object',
              description: 'Task dependencies'
            


### src/agents/experts/DataPipelineExpert.ts:374
Context: parameters
Object: type: 'object',
          properties: {
            pipelineMetrics: {
              type: 'object',
              description: 'Current pipeline performance metrics'
            


### src/agents/experts/DataPipelineExpert.ts:381
Context: targetSLA
Object: type: 'object',
              description: 'Target SLA requirements'
            


### src/agents/experts/DataPipelineExpert.ts:385
Context: resourceConstraints
Object: type: 'object',
              description: 'Available resource constraints'
            


### src/agents/experts/DataPipelineExpert.ts:389
Context: optimizationGoals
Object: type: 'array',
              description: 'Optimization goals (speed, cost, reliability)'
            


### src/agents/experts/DataPipelineExpert.ts:527
Context: pipeline
Object: name: `${sourceSystem


### src/agents/experts/DataPipelineExpert.ts:529
Context: source
Object: system: sourceSystem,
          connectionPattern: this.getSourceConnectionPattern(sourceSystem, context),
          extractionStrategy: this.getExtractionStrategy(sourceSystem, processingType, context)
        


### src/agents/experts/DataPipelineExpert.ts:534
Context: target
Object: system: targetSystem,
          loadPattern: this.getLoadPattern(targetSystem, processingType, context),
          storageOptimization: this.getStorageOptimization(targetSystem, context)
        


### src/agents/experts/DataPipelineExpert.ts:542
Context: architecture
Object: type: architecture,
        components: {
          ingestion: this.getIngestionStrategy(sourceSystem, processingType, context),
          processing: this.getProcessingFramework(processingType, context),
          storage: this.getStorageStrategy(targetSystem, processingType, context),
          monitoring: this.getMonitoringStrategy(processingType, context)
        


### src/agents/experts/DataPipelineExpert.ts:554
Context: dataFlow
Object: stages: this.designDataFlowStages(sourceSystem, targetSystem, processingType, context),
        parallelization: this.getParallelizationStrategy(processingType, context),
        errorHandling: this.getErrorHandlingStrategy(context)
      


### src/agents/experts/DataPipelineExpert.ts:570
Context: estimatedMetrics
Object: throughput: this.estimateThroughput(sourceSystem, targetSystem, processingType),
        latency: this.estimateLatency(processingType),
        resourceRequirements: this.estimateResources(processingType)
      


### src/agents/experts/DataPipelineExpert.ts:581
Context: metadata
Object: confidence: 0.95,
        ragContextUsed: context.length,
        enhancementLevel: 'comprehensive',
        generatedAt: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:595
Context: pipeline
Object: name: `${sourceSystem


### src/agents/experts/DataPipelineExpert.ts:604
Context: components
Object: ingestion: this.getBasicIngestionStrategy(sourceSystem, processingType),
        processing: this.getBasicProcessingFramework(processingType),
        storage: this.getBasicStorageStrategy(targetSystem, processingType)
      


### src/agents/experts/DataPipelineExpert.ts:622
Context: metadata
Object: approach: 'traditional',
        generatedAt: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:811
Context: flowAnalysis
Object: stages: this.analyzeFlowStages(pipelineConfig, context),
        bottlenecks: this.identifyBottlenecksWithContext(pipelineConfig, bottleneckPatterns),
        throughput: this.calculateThroughputWithContext(pipelineConfig, performancePatterns),
        latency: this.estimateLatencyWithContext(pipelineConfig, performancePatterns),
        dataVolume: this.analyzeDataVolume(pipelineConfig),
        parallelization: this.analyzeParallelization(pipelineConfig, context)
      


### src/agents/experts/DataPipelineExpert.ts:822
Context: riskAssessment
Object: 


### src/agents/experts/DataPipelineExpert.ts:881
Context: metadata
Object: analysisDepth: 'comprehensive',
        ragEnhanced: true,
        contextSources: context.length,
        generatedAt: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:902
Context: metrics
Object: estimatedThroughput: this.calculateBasicThroughput(pipelineConfig),
        estimatedLatency: this.calculateBasicLatency(pipelineConfig),
        resourceUtilization: '75%',
        bottleneckScore: 'Medium'
      


### src/agents/experts/DataPipelineExpert.ts:920
Context: metadata
Object: approach: 'traditional',
        generatedAt: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:970
Context: transformation
Object: basic: code,
        optimized: optimizedCode,
        patterns: transformationPatterns.map(p => ({
          name: p.pattern || p.name,
          application: p.application || 'Applied to current transformation',
          benefit: p.benefit || 'Improves performance and maintainability'
        


### src/agents/experts/DataPipelineExpert.ts:979
Context: documentation
Object: overview: documentation,
        schemaMapping: this.generateSchemaMapping(sourceSchema, targetSchema),
        businessLogic: this.documentBusinessLogic(transformationRules),
        performanceNotes: this.generatePerformanceNotes(language, optimizationTips)
      


### src/agents/experts/DataPipelineExpert.ts:985
Context: testing
Object: unitTests: tests,
        dataQualityTests: this.generateDataQualityTests(targetSchema),
        performanceTests: this.generatePerformanceTests(language),
        integrationTests: this.generateIntegrationTests(sourceSchema, targetSchema)
      


### src/agents/experts/DataPipelineExpert.ts:991
Context: deployment
Object: requirements: this.getDeploymentRequirements(language),
        configuration: this.getDeploymentConfiguration(language),
        monitoring: this.getTransformationMonitoring(language)
      


### src/agents/experts/DataPipelineExpert.ts:1002
Context: metadata
Object: patternsApplied: transformationPatterns.length,
        optimizationsApplied: optimizationTips.length,
        ragEnhanced: true,
        generatedAt: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:1035
Context: data
Object: language,
        code,
        documentation: `Basic ${language


### src/agents/experts/DataPipelineExpert.ts:1042
Context: metadata
Object: approach: 'traditional',
        generatedAt: new Date().toISOString()
      


### src/agents/experts/DataPipelineExpert.ts:1443
Context: data
Object: message: 'Schema evolution with RAG - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1451
Context: data
Object: message: 'Monitoring design with RAG - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1459
Context: data
Object: message: 'Data quality check with RAG - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1467
Context: data
Object: message: 'Orchestration configuration with RAG - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1475
Context: data
Object: message: 'Performance optimization with RAG - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1484
Context: data
Object: message: 'Schema evolution traditional - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1492
Context: data
Object: message: 'Monitoring design traditional - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1500
Context: data
Object: message: 'Data quality check traditional - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1508
Context: data
Object: message: 'Orchestration configuration traditional - placeholder implementation' 


### src/agents/experts/DataPipelineExpert.ts:1516
Context: data
Object: message: 'Performance optimization traditional - placeholder implementation' 


### src/agents/experts/CodeReviewExpert.ts:118
Context: metadata
Object: supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
        supportedTools: ['ESLint', 'Prettier', 'SonarQube', 'Snyk', 'Semgrep', 'CodeQL'],
        integrations: ['GitHub Actions', 'GitLab CI', 'Azure DevOps', 'Husky Hooks'],
        ragEnabled: true,
        knowledgeDomains: this.ragConfig.knowledgeDomains.length
      


### src/agents/experts/CodeReviewExpert.ts:125
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.1,
        maxTokens: 4000
      


### src/agents/experts/CodeReviewExpert.ts:138
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code directory or files'
            


### src/agents/experts/CodeReviewExpert.ts:145
Context: analysis_type
Object: type: 'string',
              enum: ['full', 'incremental', 'security-focused', 'performance-focused'],
              description: 'Type of analysis to perform'
            


### src/agents/experts/CodeReviewExpert.ts:150
Context: language
Object: type: 'string',
              enum: ['typescript', 'javascript', 'python', 'go'],
              description: 'Primary language for analysis'
            


### src/agents/experts/CodeReviewExpert.ts:155
Context: rule_sets
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/CodeReviewExpert.ts:160
Context: sonar_config
Object: type: 'object',
              description: 'SonarQube configuration options'
            


### src/agents/experts/CodeReviewExpert.ts:164
Context: exclude_patterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/CodeReviewExpert.ts:169
Context: fix_automatically
Object: type: 'boolean',
              description: 'Attempt to auto-fix issues where possible',
              default: false
            


### src/agents/experts/CodeReviewExpert.ts:182
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code for security scanning'
            


### src/agents/experts/CodeReviewExpert.ts:189
Context: scanners
Object: type: 'array',
              items: { 
                type: 'string',
                enum: ['snyk', 'semgrep', 'codeql', 'safety', 'bandit']
              


### src/agents/experts/CodeReviewExpert.ts:197
Context: severity_levels
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['critical', 'high', 'medium', 'low', 'info']
              


### src/agents/experts/CodeReviewExpert.ts:205
Context: include_dependencies
Object: type: 'boolean',
              description: 'Include dependency vulnerability scanning',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:210
Context: auto_fix
Object: type: 'boolean',
              description: 'Attempt automatic fixes for known vulnerabilities',
              default: false
            


### src/agents/experts/CodeReviewExpert.ts:215
Context: output_format
Object: type: 'string',
              enum: ['json', 'sarif', 'html', 'csv'],
              description: 'Output format for vulnerability report'
            


### src/agents/experts/CodeReviewExpert.ts:228
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code for metrics calculation'
            


### src/agents/experts/CodeReviewExpert.ts:235
Context: metrics_types
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['complexity', 'maintainability', 'coverage', 'duplication', 'size', 'debt']
              


### src/agents/experts/CodeReviewExpert.ts:243
Context: thresholds
Object: type: 'object',
              description: 'Quality thresholds for pass/fail determination'
            


### src/agents/experts/CodeReviewExpert.ts:247
Context: historical_data
Object: type: 'object',
              description: 'Previous metrics for trend analysis'
            


### src/agents/experts/CodeReviewExpert.ts:251
Context: report_format
Object: type: 'string',
              enum: ['detailed', 'summary', 'trend', 'dashboard'],
              description: 'Format for metrics report'
            


### src/agents/experts/CodeReviewExpert.ts:256
Context: include_suggestions
Object: type: 'boolean',
              description: 'Include improvement suggestions',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:269
Context: parameters
Object: type: 'object',
          properties: {
            repository_url: {
              type: 'string',
              description: 'Git repository URL or path'
            


### src/agents/experts/CodeReviewExpert.ts:276
Context: pr_number
Object: type: 'string',
              description: 'Pull request number or ID'
            


### src/agents/experts/CodeReviewExpert.ts:280
Context: review_scope
Object: type: 'string',
              enum: ['full', 'diff-only', 'critical-only', 'security-focused'],
              description: 'Scope of the review'
            


### src/agents/experts/CodeReviewExpert.ts:285
Context: quality_gates
Object: type: 'object',
              description: 'Quality gate requirements for approval'
            


### src/agents/experts/CodeReviewExpert.ts:289
Context: auto_approve
Object: type: 'boolean',
              description: 'Automatically approve if all gates pass',
              default: false
            


### src/agents/experts/CodeReviewExpert.ts:294
Context: notification_channels
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/CodeReviewExpert.ts:299
Context: ci_integration
Object: type: 'string',
              enum: ['github-actions', 'gitlab-ci', 'azure-devops', 'jenkins'],
              description: 'CI/CD platform for integration'
            


### src/agents/experts/CodeReviewExpert.ts:312
Context: parameters
Object: type: 'object',
          properties: {
            source_path: {
              type: 'string',
              description: 'Path to source code for style enforcement'
            


### src/agents/experts/CodeReviewExpert.ts:319
Context: style_guide
Object: type: 'string',
              enum: ['airbnb', 'google', 'standard', 'prettier', 'custom'],
              description: 'Style guide to enforce'
            


### src/agents/experts/CodeReviewExpert.ts:324
Context: formatting_tools
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['prettier', 'eslint', 'black', 'gofmt']
              


### src/agents/experts/CodeReviewExpert.ts:332
Context: pre_commit_hooks
Object: type: 'boolean',
              description: 'Set up pre-commit hooks for style enforcement',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:337
Context: ci_enforcement
Object: type: 'boolean',
              description: 'Enforce style checks in CI/CD pipeline',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:342
Context: fix_on_save
Object: type: 'boolean',
              description: 'Configure IDE to fix style on save',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:347
Context: custom_rules
Object: type: 'object',
              description: 'Custom style rules and overrides'
            


### src/agents/experts/CodeReviewExpert.ts:359
Context: parameters
Object: type: 'object',
          properties: {
            platform: {
              type: 'string',
              enum: ['github-actions', 'gitlab-ci', 'azure-devops', 'jenkins'],
              description: 'CI/CD platform to integrate with'
            


### src/agents/experts/CodeReviewExpert.ts:367
Context: integration_type
Object: type: 'string',
              enum: ['full-pipeline', 'quality-gates', 'security-scanning', 'style-enforcement'],
              description: 'Type of code review integration'
            


### src/agents/experts/CodeReviewExpert.ts:372
Context: quality_requirements
Object: type: 'object',
              description: 'Quality requirements and thresholds for CI/CD gates'
            


### src/agents/experts/CodeReviewExpert.ts:376
Context: notification_settings
Object: type: 'object',
              description: 'Notification configuration for review results'
            


### src/agents/experts/CodeReviewExpert.ts:380
Context: auto_merge_rules
Object: type: 'object',
              description: 'Rules for automatic merging based on review results'
            


### src/agents/experts/CodeReviewExpert.ts:384
Context: deployment_gates
Object: type: 'boolean',
              description: 'Enable deployment gates based on code review results',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:397
Context: parameters
Object: type: 'object',
          properties: {
            optimization_target: {
              type: 'string',
              enum: ['speed', 'accuracy', 'coverage', 'developer-experience', 'cost-efficiency'],
              description: 'Primary optimization target'
            


### src/agents/experts/CodeReviewExpert.ts:405
Context: current_metrics
Object: type: 'object',
              description: 'Current performance metrics for optimization baseline'
            


### src/agents/experts/CodeReviewExpert.ts:409
Context: tool_performance
Object: type: 'object',
              description: 'Performance data for individual review tools'
            


### src/agents/experts/CodeReviewExpert.ts:413
Context: team_feedback
Object: type: 'object',
              description: 'Developer feedback on review process and tools'
            


### src/agents/experts/CodeReviewExpert.ts:417
Context: optimization_constraints
Object: type: 'object',
              description: 'Constraints and limitations for optimization'
            


### src/agents/experts/CodeReviewExpert.ts:421
Context: generate_recommendations
Object: type: 'boolean',
              description: 'Generate optimization recommendations and action plan',
              default: true
            


### src/agents/experts/CodeReviewExpert.ts:434
Context: parameters
Object: type: 'object',
          properties: {
            report_type: {
              type: 'string',
              enum: ['quality-trends', 'team-performance', 'security-analysis', 'process-efficiency', 'comprehensive'],
              description: 'Type of analytics report to generate'
            


### src/agents/experts/CodeReviewExpert.ts:442
Context: time_period
Object: type: 'string',
              enum: ['daily', 'weekly', 'monthly', 'quarterly', 'custom'],
              description: 'Time period for report data'
            


### src/agents/experts/CodeReviewExpert.ts:447
Context: custom_date_range
Object: type: 'object',
              description: 'Custom date range for report (when time_period is custom)'
            


### src/agents/experts/CodeReviewExpert.ts:451
Context: include_metrics
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['quality-scores', 'coverage-trends', 'security-issues', 'review-times', 'team-productivity']
              


### src/agents/experts/CodeReviewExpert.ts:459
Context: format
Object: type: 'string',
              enum: ['html', 'pdf', 'json', 'csv', 'dashboard'],
              description: 'Output format for the report'
            


### src/agents/experts/CodeReviewExpert.ts:464
Context: distribution_list
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/CodeReviewExpert.ts:525
Context: eslint
Object: errors: 12,
          warnings: 34,
          fixable: 28,
          rules_violated: ['@typescript-eslint/no-unused-vars', 'prefer-const', 'no-console']
        


### src/agents/experts/CodeReviewExpert.ts:531
Context: sonarqube
Object: bugs: 3,
          vulnerabilities: 1,
          code_smells: 15,
          coverage: 78.5,
          duplicated_lines: 2.3,
          maintainability_rating: 'B'
        


### src/agents/experts/CodeReviewExpert.ts:539
Context: typescript
Object: compilation_errors: 0,
          strict_errors: 5,
          unused_exports: 8,
          circular_dependencies: []
        


### src/agents/experts/CodeReviewExpert.ts:552
Context: data
Object: analysis_type: params.analysis_type,
          results: analysisResults,
          configurations: {
            eslint: eslintConfig,
            sonarqube: sonarConfig,
            typescript: tsConfig
          


### src/agents/experts/CodeReviewExpert.ts:571
Context: metadata
Object: analysis_type: params.analysis_type,
          language: params.language,
          rules_applied: eslintConfig.extends.length,
          total_issues: analysisResults.eslint.errors + analysisResults.eslint.warnings + analysisResults.sonarqube.bugs
        


### src/agents/experts/CodeReviewExpert.ts:626
Context: summary
Object: critical: 0, high: 1, medium: 1, low: 0, total: 2 


### src/agents/experts/CodeReviewExpert.ts:639
Context: summary
Object: error: 0, warning: 1, info: 0, total: 1 


### src/agents/experts/CodeReviewExpert.ts:651
Context: summary
Object: error: 1, warning: 0, note: 0, total: 1 


### src/agents/experts/CodeReviewExpert.ts:669
Context: data
Object: scan_results: filteredResults,
          configurations: scannerConfigs,
          security_report: securityReport,
          auto_fix_suggestions: autoFixResults,
          summary: {
            total_vulnerabilities: totalVulnerabilities,
            critical: this.countBySeverity(filteredResults, 'critical'),
            high: this.countBySeverity(filteredResults, 'high'),
            medium: this.countBySeverity(filteredResults, 'medium'),
            low: this.countBySeverity(filteredResults, 'low')
          


### src/agents/experts/CodeReviewExpert.ts:694
Context: metadata
Object: scanners_used: params.scanners,
          include_dependencies: params.include_dependencies,
          total_vulnerabilities: totalVulnerabilities,
          auto_fixable: autoFixResults ? autoFixResults.fixable_count : 0
        


### src/agents/experts/CodeReviewExpert.ts:727
Context: cyclomatic_complexity
Object: average: 3.2,
            max: 12,
            files_over_threshold: 3,
            threshold: 10
          


### src/agents/experts/CodeReviewExpert.ts:733
Context: cognitive_complexity
Object: average: 4.1,
            max: 15,
            files_over_threshold: 2
          


### src/agents/experts/CodeReviewExpert.ts:738
Context: npath_complexity
Object: average: 8.5,
            max: 64
          


### src/agents/experts/CodeReviewExpert.ts:744
Context: maintainability_index
Object: average: 72.3,
            min: 45.2,
            files_below_threshold: 4,
            threshold: 70
          


### src/agents/experts/CodeReviewExpert.ts:750
Context: halstead_metrics
Object: program_length: 1247,
            vocabulary: 156,
            volume: 8934.2,
            difficulty: 12.8,
            effort: 114358.4
          


### src/agents/experts/CodeReviewExpert.ts:818
Context: data
Object: metrics,
          quality_gates: qualityGates,
          overall_score: overallScore,
          trend_analysis: trendAnalysis,
          thresholds,
          report,
          suggestions,
          summary: `Quality Score: ${overallScore


### src/agents/experts/CodeReviewExpert.ts:834
Context: metadata
Object: metrics_calculated: params.metrics_types,
          overall_score: overallScore,
          gates_passed: qualityGates.passed_gates,
          gates_total: qualityGates.total_gates,
          has_trend_data: !!params.historical_data
        


### src/agents/experts/CodeReviewExpert.ts:914
Context: data
Object: pr_analysis: prAnalysis,
          quality_gates: {
            gates: gateResults,
            all_passed: allGatesPassed,
            failed_gates: Object.entries(gateResults)
              .filter(([_, passed]) => !passed)
              .map(([gate, _]) => gate)
          


### src/agents/experts/CodeReviewExpert.ts:925
Context: auto_approval
Object: should_approve: shouldAutoApprove,
            reason: shouldAutoApprove ? 'All quality gates passed' : 'Quality gates failed'
          


### src/agents/experts/CodeReviewExpert.ts:939
Context: metadata
Object: repository_url: params.repository_url,
          pr_number: params.pr_number,
          review_scope: params.review_scope,
          gates_passed: Object.values(gateResults).filter(g => g).length,
          total_gates: Object.keys(gateResults).length,
          auto_approved: shouldAutoApprove
        


### src/agents/experts/CodeReviewExpert.ts:1006
Context: data
Object: style_guide: params.style_guide,
          configurations,
          pre_commit_hooks: preCommitConfig,
          ci_configuration: ciConfig,
          ide_configuration: ideConfig,
          style_analysis: styleAnalysis,
          fix_commands: fixCommands,
          summary: `Style Analysis: ${styleAnalysis.files_with_issues


### src/agents/experts/CodeReviewExpert.ts:1031
Context: metadata
Object: style_guide: params.style_guide,
          formatting_tools: params.formatting_tools,
          pre_commit_enabled: params.pre_commit_hooks,
          ci_enforcement: params.ci_enforcement,
          total_issues: styleAnalysis.formatting_issues + styleAnalysis.style_violations
        


### src/agents/experts/CodeReviewExpert.ts:1059
Context: parserOptions
Object: ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json'
      


### src/agents/experts/CodeReviewExpert.ts:1324
Context: jobs
Object: review: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { uses: 'actions/checkout@v3' 


### src/agents/experts/CodeReviewExpert.ts:1370
Context: rules
Object: ...this.getStyleGuideRules(params.style_guide),
          ...params.custom_rules
        


### src/agents/experts/CodeReviewExpert.ts:1439
Context: jobs
Object: style: {
          'runs-on': 'ubuntu-latest',
          steps: [
            { uses: 'actions/checkout@v3' 


### src/agents/experts/CodeReviewExpert.ts:1464
Context: vscode
Object: settings: vscodeSettings 


### src/agents/experts/CodeReviewExpert.ts:1465
Context: webstorm
Object: 'prettier-on-save': tools.includes('prettier'),
        'eslint-on-save': tools.includes('eslint')
      


### src/agents/experts/CodeReviewExpert.ts:1496
Context: compilerOptions
Object: strict: options.strict || true,
        noImplicitAny: options.noImplicitAny || true,
        noUnusedLocals: options.noUnusedLocals || true,
        noUnusedParameters: options.noUnusedParameters || true,
        exactOptionalPropertyTypes: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true
      


### src/agents/experts/CodeReviewExpert.ts:1543
Context: data
Object: platform: params.platform,
          integration_type: params.integration_type,
          platform_config: platformConfig,
          quality_gates: qualityGates,
          workflow_files: workflowFiles,
          deployment_config: deploymentConfig,
          rag_insights: ragResult.ragSources,
          setup_instructions: [
            'Copy workflow files to .github/workflows/ directory',
            'Configure required secrets in repository settings',
            'Set up quality gate thresholds in configuration',
            'Test CI/CD pipeline with sample pull request',
            'Configure notification channels for review results'
          ],
          best_practices: ragResult.response || 'RAG-enhanced best practices for CI/CD integration',
          next_steps: [
            'Customize quality gates based on project requirements',
            'Set up branch protection rules',
            'Configure automated deployment gates',
            'Train team on new review workflow'
          ]
        


### src/agents/experts/CodeReviewExpert.ts:1566
Context: metadata
Object: platform: params.platform,
          integration_type: params.integration_type,
          has_deployment_gates: !!params.deployment_gates,
          rag_enhanced: ragResult.ragSources.length > 0,
          confidence: ragResult.confidence
        


### src/agents/experts/CodeReviewExpert.ts:1623
Context: data
Object: optimization_target: params.optimization_target,
          current_performance: performanceAnalysis,
          recommendations,
          optimization_plan: optimizationPlan,
          expected_improvements: expectedImprovements,
          rag_insights: ragResult.ragSources,
          implementation_priority: this.prioritizeOptimizations(recommendations),
          roi_analysis: this.calculateROI(optimizationPlan, expectedImprovements),
          success_metrics: this.defineSuccessMetrics(params.optimization_target),
          timeline: this.createOptimizationTimeline(optimizationPlan),
          enhanced_analysis: ragResult.response || 'RAG-enhanced optimization analysis',
          next_steps: [
            'Implement high-priority optimizations first',
            'Set up monitoring for success metrics',
            'Schedule team training on new processes',
            'Plan gradual rollout of optimization changes'
          ]
        


### src/agents/experts/CodeReviewExpert.ts:1642
Context: metadata
Object: optimization_target: params.optimization_target,
          total_recommendations: recommendations.length,
          estimated_roi: expectedImprovements.roi_percentage,
          rag_enhanced: ragResult.ragSources.length > 0,
          confidence: ragResult.confidence
        


### src/agents/experts/CodeReviewExpert.ts:1703
Context: data
Object: report_type: params.report_type,
          time_period: params.time_period,
          analytics_data: filteredMetrics,
          visualizations,
          report_content: reportContent,
          insights,
          distribution_plan: distributionPlan,
          rag_insights: ragResult.ragSources,
          enhanced_analysis: ragResult.response || 'RAG-enhanced analytics insights',
          key_findings: [
            'Code quality scores improved by 15% over reporting period',
            'Security vulnerabilities detected decreased by 23%',
            'Average review time reduced by 18 minutes',
            'Team productivity increased by 12% with automated reviews'
          ],
          trends: this.identifyTrends(filteredMetrics),
          recommendations: [
            'Continue focus on automated security scanning',
            'Expand quality gate coverage to additional repositories',
            'Implement advanced analytics dashboards',
            'Schedule quarterly review process optimization'
          ],
          export_options: this.getExportOptions(params.format),
          next_steps: [
            'Review analytics findings with stakeholders',
            'Schedule follow-up analysis for next period',
            'Implement recommended process improvements',
            'Set up automated report generation'
          ]
        


### src/agents/experts/CodeReviewExpert.ts:1734
Context: metadata
Object: report_type: params.report_type,
          time_period: params.time_period,
          metrics_included: params.include_metrics?.length || 'all',
          format: params.format,
          has_distribution: !!params.distribution_list,
          rag_enhanced: ragResult.ragSources.length > 0,
          confidence: ragResult.confidence
        


### src/agents/experts/CodeReviewExpert.ts:1802
Context: gates
Object: eslint_errors: 0,
        test_coverage: 80,
        security_issues: 0,
        complexity_threshold: 10,
        duplication_ratio: 5
      


### src/agents/experts/CodeReviewExpert.ts:1926
Context: metrics
Object: quality_scores: [85, 87, 89, 91, 88],
        review_times: [45, 42, 38, 35, 33],
        security_issues: [12, 8, 5, 3, 2],
        team_productivity: [78, 82, 85, 88, 91]
      


### src/agents/experts/AutomationIntegrationExpert.ts:120
Context: metadata
Object: migrationVersion: '2.0',
        ragEnabled: true,
        toolCount: 8
      


### src/agents/experts/AutomationIntegrationExpert.ts:126
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/AutomationIntegrationExpert.ts:138
Context: parameters
Object: type: 'object',
          properties: {
            workflow_name: {
              type: 'string',
              description: 'Name of the workflow'
            


### src/agents/experts/AutomationIntegrationExpert.ts:145
Context: workflow_type
Object: type: 'string',
              enum: ['sequential', 'parallel', 'conditional', 'event-driven', 'scheduled'],
              description: 'Type of workflow execution'
            


### src/agents/experts/AutomationIntegrationExpert.ts:150
Context: triggers
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['webhook', 'schedule', 'event', 'manual', 'api'] 


### src/agents/experts/AutomationIntegrationExpert.ts:156
Context: config
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:161
Context: steps
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:167
Context: action
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:168
Context: input
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:169
Context: conditions
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:170
Context: error_handling
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:175
Context: platform
Object: type: 'string',
              enum: ['zapier', 'make', 'n8n', 'power-automate', 'generic'],
              description: 'Target automation platform'
            


### src/agents/experts/AutomationIntegrationExpert.ts:180
Context: optimization_goals
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['speed', 'reliability', 'cost', 'maintainability', 'scalability']
              


### src/agents/experts/AutomationIntegrationExpert.ts:196
Context: parameters
Object: type: 'object',
          properties: {
            source_systems: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:205
Context: type
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:206
Context: api_type
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:207
Context: authentication
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:212
Context: target_systems
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:218
Context: type
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:219
Context: api_type
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:220
Context: authentication
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:225
Context: data_flow
Object: type: 'string',
              enum: ['unidirectional', 'bidirectional', 'pub-sub', 'request-response'],
              description: 'Data flow pattern'
            


### src/agents/experts/AutomationIntegrationExpert.ts:230
Context: volume
Object: type: 'string',
              enum: ['low', 'medium', 'high', 'real-time'],
              description: 'Expected data volume'
            


### src/agents/experts/AutomationIntegrationExpert.ts:235
Context: requirements
Object: type: 'object',
              properties: {
                real_time: { type: 'boolean' 


### src/agents/experts/AutomationIntegrationExpert.ts:239
Context: guaranteed_delivery
Object: type: 'boolean' 


### src/agents/experts/AutomationIntegrationExpert.ts:240
Context: transformation_needed
Object: type: 'boolean' 


### src/agents/experts/AutomationIntegrationExpert.ts:241
Context: error_recovery
Object: type: 'boolean' 


### src/agents/experts/AutomationIntegrationExpert.ts:253
Context: parameters
Object: type: 'object',
          properties: {
            workflow_analysis: {
              type: 'object',
              properties: {
                current_steps: { type: 'number' 


### src/agents/experts/AutomationIntegrationExpert.ts:260
Context: execution_time
Object: type: 'number' 


### src/agents/experts/AutomationIntegrationExpert.ts:261
Context: error_rate
Object: type: 'number' 


### src/agents/experts/AutomationIntegrationExpert.ts:262
Context: resource_usage
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:266
Context: bottlenecks
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  step: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:272
Context: issue
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:273
Context: impact
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:278
Context: optimization_targets
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['execution_speed', 'error_reduction', 'cost_reduction', 'resource_efficiency', 'maintainability']
              


### src/agents/experts/AutomationIntegrationExpert.ts:286
Context: constraints
Object: type: 'object',
              properties: {
                budget: { type: 'number' 


### src/agents/experts/AutomationIntegrationExpert.ts:290
Context: platform_limitations
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:291
Context: compliance_requirements
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:303
Context: parameters
Object: type: 'object',
          properties: {
            process_name: {
              type: 'string',
              description: 'Name of the business process'
            


### src/agents/experts/AutomationIntegrationExpert.ts:310
Context: process_steps
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  step_name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:316
Context: step_type
Object: type: 'string', enum: ['task', 'decision', 'subprocess', 'event'] 


### src/agents/experts/AutomationIntegrationExpert.ts:317
Context: actors
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:318
Context: inputs
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:319
Context: outputs
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:320
Context: automation_potential
Object: type: 'string', enum: ['high', 'medium', 'low', 'none'] 


### src/agents/experts/AutomationIntegrationExpert.ts:325
Context: current_pain_points
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:330
Context: automation_goals
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:335
Context: output_format
Object: type: 'string',
              enum: ['bpmn', 'flowchart', 'text', 'automation-ready'],
              description: 'Desired output format'
            


### src/agents/experts/AutomationIntegrationExpert.ts:348
Context: parameters
Object: type: 'object',
          properties: {
            connector_type: {
              type: 'string',
              enum: ['rest-api', 'webhook', 'database', 'file-system', 'message-queue', 'custom'],
              description: 'Type of connector to build'
            


### src/agents/experts/AutomationIntegrationExpert.ts:356
Context: source_config
Object: type: 'object',
              properties: {
                name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:360
Context: authentication
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:361
Context: endpoints
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:362
Context: data_format
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:366
Context: mapping_rules
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  source_field: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:372
Context: target_field
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:373
Context: transformation
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:374
Context: validation
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:379
Context: error_handling
Object: type: 'object',
              properties: {
                retry_strategy: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:383
Context: max_retries
Object: type: 'number' 


### src/agents/experts/AutomationIntegrationExpert.ts:384
Context: error_logging
Object: type: 'boolean' 


### src/agents/experts/AutomationIntegrationExpert.ts:385
Context: fallback_action
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:389
Context: target_platform
Object: type: 'string',
              description: 'Target automation platform for the connector'
            


### src/agents/experts/AutomationIntegrationExpert.ts:401
Context: parameters
Object: type: 'object',
          properties: {
            workflow_context: {
              type: 'object',
              properties: {
                workflow_name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:408
Context: critical_steps
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:409
Context: data_sensitivity
Object: type: 'string', enum: ['low', 'medium', 'high'] 


### src/agents/experts/AutomationIntegrationExpert.ts:410
Context: recovery_priority
Object: type: 'string', enum: ['speed', 'accuracy', 'completeness'] 


### src/agents/experts/AutomationIntegrationExpert.ts:414
Context: potential_errors
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  error_type: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:420
Context: likelihood
Object: type: 'string', enum: ['low', 'medium', 'high'] 


### src/agents/experts/AutomationIntegrationExpert.ts:421
Context: impact
Object: type: 'string', enum: ['low', 'medium', 'high', 'critical'] 


### src/agents/experts/AutomationIntegrationExpert.ts:422
Context: current_handling
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:427
Context: recovery_strategies
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['retry', 'fallback', 'compensation', 'manual-intervention', 'circuit-breaker', 'dead-letter-queue']
              


### src/agents/experts/AutomationIntegrationExpert.ts:435
Context: notification_requirements
Object: type: 'object',
              properties: {
                channels: { type: 'array', items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:439
Context: severity_levels
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:440
Context: escalation_rules
Object: type: 'object' 


### src/agents/experts/AutomationIntegrationExpert.ts:452
Context: parameters
Object: type: 'object',
          properties: {
            workflow_info: {
              type: 'object',
              properties: {
                name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:459
Context: platform
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:460
Context: criticality
Object: type: 'string', enum: ['low', 'medium', 'high', 'critical'] 


### src/agents/experts/AutomationIntegrationExpert.ts:461
Context: expected_frequency
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:465
Context: metrics_to_track
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['execution_time', 'success_rate', 'error_count', 'throughput', 'resource_usage', 'cost', 'sla_compliance']
              


### src/agents/experts/AutomationIntegrationExpert.ts:473
Context: alerting_rules
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  metric: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:479
Context: condition
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:480
Context: threshold
Object: type: 'number' 


### src/agents/experts/AutomationIntegrationExpert.ts:481
Context: severity
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:482
Context: notification_channel
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:487
Context: dashboard_requirements
Object: type: 'object',
              properties: {
                real_time: { type: 'boolean' 


### src/agents/experts/AutomationIntegrationExpert.ts:491
Context: historical_data
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:492
Context: visualization_types
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:493
Context: sharing_requirements
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:497
Context: integration_tools
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['datadog', 'prometheus', 'grafana', 'elk-stack', 'splunk', 'custom']
              


### src/agents/experts/AutomationIntegrationExpert.ts:513
Context: parameters
Object: type: 'object',
          properties: {
            workflow_details: {
              type: 'object',
              properties: {
                name: { type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:520
Context: version
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:521
Context: description
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:522
Context: platform
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:523
Context: last_updated
Object: type: 'string' 


### src/agents/experts/AutomationIntegrationExpert.ts:527
Context: documentation_sections
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['overview', 'architecture', 'setup', 'configuration', 'testing', 'troubleshooting', 'maintenance', 'api-reference']
              


### src/agents/experts/AutomationIntegrationExpert.ts:535
Context: technical_details
Object: type: 'object',
              properties: {
                dependencies: { type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:539
Context: api_endpoints
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:540
Context: environment_variables
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:541
Context: security_considerations
Object: type: 'array' 


### src/agents/experts/AutomationIntegrationExpert.ts:545
Context: target_audience
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['developers', 'operators', 'business-users', 'administrators']
              


### src/agents/experts/AutomationIntegrationExpert.ts:553
Context: output_format
Object: type: 'string',
              enum: ['markdown', 'html', 'pdf', 'confluence', 'docusaurus'],
              description: 'Documentation output format'
            


### src/agents/experts/AutomationIntegrationExpert.ts:575
Context: metadata
Object: name: workflow_name,
          type: workflow_type,
          platform: platform || 'generic',
          created: new Date().toISOString()
        


### src/agents/experts/AutomationIntegrationExpert.ts:582
Context: workflow
Object: steps: steps.map((step: any, index: number) => ({
            id: `step_${index + 1


### src/agents/experts/AutomationIntegrationExpert.ts:597
Context: zapier
Object: format: 'zap',
          features: ['multi-step', 'filters', 'formatter'],
          limitations: ['no-loops', 'limited-branching']
        


### src/agents/experts/AutomationIntegrationExpert.ts:602
Context: make
Object: format: 'scenario',
          features: ['visual-builder', 'routers', 'aggregators'],
          advantages: ['complex-logic', 'data-transformation']
        


### src/agents/experts/AutomationIntegrationExpert.ts:607
Context: n8n
Object: format: 'workflow-json',
          features: ['self-hosted', 'custom-nodes', 'code-support'],
          advantages: ['full-control', 'no-limitations']
        


### src/agents/experts/AutomationIntegrationExpert.ts:646
Context: data
Object: workflow_design: workflowDesign,
          platform_config: platformConfigs[platform] || {


### src/agents/experts/AutomationIntegrationExpert.ts:650
Context: visualization
Object: type: 'mermaid',
            diagram: this.generateWorkflowDiagram(steps, workflow_type)
          


### src/agents/experts/AutomationIntegrationExpert.ts:654
Context: implementation_guide
Object: setup_steps: [
              'Configure trigger authentication',
              'Map data fields between steps',
              'Set up error handling',
              'Configure monitoring',
              'Test with sample data'
            ],
            best_practices: [
              'Use descriptive step names',
              'Implement proper error handling',
              'Document data transformations',
              'Version control workflow definitions',
              'Monitor execution metrics'
            ]
          


### src/agents/experts/AutomationIntegrationExpert.ts:670
Context: estimated_metrics
Object: execution_time: `${steps.length * 2


### src/agents/experts/AutomationIntegrationExpert.ts:676
Context: metadata
Object: workflow_name,
          workflow_type,
          step_count: steps.length,
          platform: platform || 'generic'
        


### src/agents/experts/AutomationIntegrationExpert.ts:757
Context: data_flow_design
Object: type: data_flow,
          implementation: data_flow === 'bidirectional' ? 
            'Implement separate channels for each direction' :
            'Single direction flow with acknowledgments'
        


### src/agents/experts/AutomationIntegrationExpert.ts:768
Context: data
Object: recommended_patterns: patterns,
          architecture,
          implementation_approach: {
            phases: [
              {
                phase: 'Discovery',
                activities: ['API analysis', 'Data mapping', 'Security review'],
                duration: '1-2 weeks'
              


### src/agents/experts/AutomationIntegrationExpert.ts:795
Context: technology_recommendations
Object: integration_platforms: volume === 'high' ? 
              ['MuleSoft', 'Apache Camel', 'Spring Integration'] :
              ['Zapier', 'Make', 'n8n'],
            monitoring: ['Datadog', 'New Relic', 'Elastic APM'],
            security: ['OAuth 2.0', 'API Gateway', 'mTLS']
          


### src/agents/experts/AutomationIntegrationExpert.ts:811
Context: metadata
Object: source_count: source_systems.length,
          target_count: target_systems.length,
          pattern: recommendedPattern,
          complexity_score: complexity.system_count + complexity.api_diversity
        


### src/agents/experts/AutomationIntegrationExpert.ts:947
Context: data
Object: current_performance: workflow_analysis,
          optimization_opportunities: optimizations,
          bottleneck_solutions: bottleneckSolutions,
          optimization_plan: optimizationPlan,
          expected_improvements: {
            execution_time: optimization_targets?.includes('execution_speed') ? 
              `${Math.round(execution_time * 0.5)


### src/agents/experts/AutomationIntegrationExpert.ts:962
Context: implementation_roadmap
Object: week1: 'Quick wins and critical bottleneck fixes',
            week2_3: 'Medium complexity optimizations',
            week4_6: 'Long-term architectural improvements',
            ongoing: 'Monitoring and continuous optimization'
          


### src/agents/experts/AutomationIntegrationExpert.ts:969
Context: metadata
Object: current_steps,
          optimization_count: optimizations.length,
          bottleneck_count: bottlenecks?.length || 0,
          target_count: optimization_targets?.length || 0
        


### src/agents/experts/AutomationIntegrationExpert.ts:1027
Context: data
Object: process_overview: {
            name: process_name,
            total_steps: process_steps.length,
            automatable_steps: process_steps.filter((s: any) => s.automation_potential !== 'none').length,
            automation_coverage: `${Math.round(process_steps.filter((s: any) => s.automation_potential !== 'none').length / process_steps.length * 100)


### src/agents/experts/AutomationIntegrationExpert.ts:1038
Context: implementation_plan
Object: phase1: {
              name: 'Quick Wins',
              duration: '2-4 weeks',
              focus: automationRoadmap.immediate.map((s: any) => s.step_name),
              expected_roi: 'High'
            


### src/agents/experts/AutomationIntegrationExpert.ts:1045
Context: phase2
Object: name: 'Process Optimization',
              duration: '6-8 weeks',
              focus: automationRoadmap.short_term.map((s: any) => s.step_name),
              expected_roi: 'Medium'
            


### src/agents/experts/AutomationIntegrationExpert.ts:1051
Context: phase3
Object: name: 'Advanced Automation',
              duration: '3-6 months',
              focus: automationRoadmap.long_term.map((s: any) => s.step_name),
              expected_roi: 'Long-term'
            


### src/agents/experts/AutomationIntegrationExpert.ts:1065
Context: metadata
Object: process_name,
          step_count: process_steps.length,
          output_format,
          automation_percentage: Math.round(process_steps.filter((s: any) => s.automation_potential !== 'none').length / process_steps.length * 100)
        


### src/agents/experts/AutomationIntegrationExpert.ts:1091
Context: metadata
Object: name: source_config.name,
          type: connector_type,
          version: '1.0.0',
          platform: target_platform || 'generic'
        


### src/agents/experts/AutomationIntegrationExpert.ts:1097
Context: connection
Object: type: connector_type,
          authentication: source_config.authentication || {


### src/agents/experts/AutomationIntegrationExpert.ts:1234
Context: data
Object: connector_config: connectorConfig,
          connector_code: connectorCode,
          mapping_implementation: mappingImplementation,
          error_handling_config: {
            retry: {
              enabled: true,
              max_attempts: error_handling?.max_retries || 3,
              backoff: 'exponential',
              initial_delay: 1000
            


### src/agents/experts/AutomationIntegrationExpert.ts:1245
Context: logging
Object: enabled: error_handling?.error_logging !== false,
              level: 'error',
              include_payload: false
            


### src/agents/experts/AutomationIntegrationExpert.ts:1252
Context: deployment_guide
Object: steps: [
              'Install connector dependencies',
              'Configure authentication credentials',
              'Set up error handling and logging',
              'Deploy to automation platform',
              'Test with sample data',
              'Monitor initial executions'
            ],
            platform_specific: this.getPlatformDeploymentGuide(target_platform)
          


### src/agents/experts/AutomationIntegrationExpert.ts:1263
Context: testing_approach
Object: unit_tests: ['Connection test', 'Data transformation test', 'Error handling test'],
            integration_tests: ['End-to-end data flow', 'Error scenarios', 'Performance test'],
            monitoring: ['Success rate', 'Response time', 'Error frequency']
          


### src/agents/experts/AutomationIntegrationExpert.ts:1269
Context: metadata
Object: connector_type,
          source_name: source_config.name,
          mapping_count: mapping_rules?.length || 0,
          target_platform: target_platform || 'generic'
        


### src/agents/experts/AutomationIntegrationExpert.ts:1295
Context: global_handler
Object: strategy: 'centralized',
          implementation: `class WorkflowErrorHandler {
  constructor(workflowName) {
    this.workflowName = workflowName
    this.errorLog = []
    this.recoveryAttempts = new Map()
  


### src/agents/experts/AutomationIntegrationExpert.ts:1335
Context: handler
Object: detection: `error.type === '${error.error_type


### src/agents/experts/AutomationIntegrationExpert.ts:1428
Context: escalation
Object: levels: notification_requirements?.severity_levels || ['warning', 'error', 'critical'],
          rules: notification_requirements?.escalation_rules || {
            warning: { delay: 300, recipients: ['team'] 


### src/agents/experts/AutomationIntegrationExpert.ts:1432
Context: error
Object: delay: 60, recipients: ['team', 'manager'] 


### src/agents/experts/AutomationIntegrationExpert.ts:1433
Context: critical
Object: delay: 0, recipients: ['team', 'manager', 'oncall'] 


### src/agents/experts/AutomationIntegrationExpert.ts:1441
Context: data
Object: error_handling_framework: errorHandlingFramework,
          recovery_implementations: recoveryImplementations,
          notification_config: notificationConfig,
          monitoring_setup: {
            metrics: [
              'error_count_by_type',
              'recovery_success_rate',
              'mean_time_to_recovery',
              'notification_delivery_rate'
            ],
            dashboards: [
              'Error Rate Dashboard',
              'Recovery Performance Dashboard',
              'Workflow Health Dashboard'
            ],
            alerts: potential_errors?.map((error: any) => ({
              name: `${error.error_type


### src/agents/experts/AutomationIntegrationExpert.ts:1464
Context: implementation_guide
Object: steps: [
              'Implement global error handler',
              'Add specific error handlers',
              'Configure recovery strategies',
              'Set up notification channels',
              'Deploy monitoring',
              'Test error scenarios'
            ],
            best_practices: [
              'Log all errors with context',
              'Use structured error types',
              'Implement graceful degradation',
              'Test recovery strategies',
              'Monitor error patterns',
              'Regular error analysis'
            ]
          


### src/agents/experts/AutomationIntegrationExpert.ts:1483
Context: metadata
Object: workflow_name: workflow_context.workflow_name,
          error_types: potential_errors?.length || 0,
          recovery_strategies: recovery_strategies?.length || 0,
          notification_channels: notification_requirements?.channels?.length || 0
        


### src/agents/experts/AutomationIntegrationExpert.ts:1522
Context: datadog
Object: agent_config: `init_config:

instances:
  - name: ${workflow_info.name


### src/agents/experts/AutomationIntegrationExpert.ts:1534
Context: prometheus
Object: scrape_config: `- job_name: '${workflow_info.name


### src/agents/experts/AutomationIntegrationExpert.ts:1544
Context: grafana
Object: datasource: 'prometheus',
          dashboard_config: this.generateGrafanaDashboard(metrics_to_track, dashboard_requirements)
        


### src/agents/experts/AutomationIntegrationExpert.ts:1557
Context: annotations
Object: summary: `${rule.metric


### src/agents/experts/AutomationIntegrationExpert.ts:1561
Context: notification
Object: channel: rule.notification_channel,
            template: this.getAlertTemplate(rule.severity)
          


### src/agents/experts/AutomationIntegrationExpert.ts:1606
Context: tags
Object: workflow: this.workflow.name,
        ...tags
      


### src/agents/experts/AutomationIntegrationExpert.ts:1631
Context: data
Object: monitoring_config: monitoringConfig,
          platform_configs: integration_tools?.reduce((acc: any, tool: string) => {
            acc[tool] = platformConfigs[tool] || {


### src/agents/experts/AutomationIntegrationExpert.ts:1639
Context: dashboard_design
Object: layout: dashboard_requirements?.real_time ? 'real-time' : 'historical',
            widgets: [
              {
                type: 'line-chart',
                title: 'Execution Time Trend',
                metric: 'execution_time',
                period: '1h'
              


### src/agents/experts/AutomationIntegrationExpert.ts:1652
Context: thresholds
Object: good: 95, warning: 90, critical: 80 


### src/agents/experts/AutomationIntegrationExpert.ts:1667
Context: deployment_guide
Object: steps: [
              'Install monitoring agents',
              'Configure metric collection',
              'Deploy dashboards',
              'Set up alerting rules',
              'Test metric collection',
              'Verify alert delivery'
            ],
            validation: [
              'Trigger test workflow execution',
              'Verify metrics appear in dashboard',
              'Test alert triggering',
              'Validate data retention'
            ]
          


### src/agents/experts/AutomationIntegrationExpert.ts:1684
Context: metadata
Object: workflow_name: workflow_info.name,
          metric_count: metrics_to_track?.length || 0,
          alert_count: alerting_rules?.length || 0,
          platform_count: integration_tools?.length || 0
        


### src/agents/experts/AutomationIntegrationExpert.ts:1710
Context: metadata
Object: title: `${workflow_details.name


### src/agents/experts/AutomationIntegrationExpert.ts:1716
Context: sections
Object: 


### src/agents/experts/AutomationIntegrationExpert.ts:1920
Context: data
Object: documentation: documentation,
          formatted_output: formattedOutput,
          table_of_contents: Object.values(documentation.sections).map((s: any) => s.title),
          audience_customization: target_audience?.map((audience: string) => ({
            audience,
            sections: this.getAudienceSections(audience),
            reading_time: '10-15 minutes'
          


### src/agents/experts/AutomationIntegrationExpert.ts:1929
Context: deployment_options
Object: confluence: 'Use Confluence API to publish',
            github: 'Commit to docs/ directory',
            website: 'Deploy with static site generator',
            pdf: 'Export using pandoc or similar'
          


### src/agents/experts/AutomationIntegrationExpert.ts:1935
Context: maintenance_guide
Object: review_frequency: 'Monthly',
            update_triggers: ['Workflow changes', 'Platform updates', 'New integrations'],
            versioning: 'Semantic versioning (x.y.z)'
          


### src/agents/experts/AutomationIntegrationExpert.ts:1941
Context: metadata
Object: workflow_name: workflow_details.name,
          section_count: documentation_sections?.length || 0,
          format: output_format || 'markdown',
          audience_count: target_audience?.length || 1
        


### src/agents/experts/AutomationIntegrationExpert.ts:2085
Context: zapier
Object: steps: ['Create Zap', 'Configure trigger', 'Add actions', 'Test', 'Publish'],
        docs: 'https://zapier.com/help'
      


### src/agents/experts/AutomationIntegrationExpert.ts:2089
Context: make
Object: steps: ['Create scenario', 'Add modules', 'Configure connections', 'Test run', 'Schedule'],
        docs: 'https://www.make.com/help'
      


### src/agents/experts/AutomationIntegrationExpert.ts:2093
Context: n8n
Object: steps: ['Design workflow', 'Configure nodes', 'Set credentials', 'Execute', 'Deploy'],
        docs: 'https://docs.n8n.io'
      


### src/agents/experts/AutomationIntegrationExpert.ts:2114
Context: email
Object: smtp: 'smtp.company.com', from: 'automation@company.com' 


### src/agents/experts/AutomationIntegrationExpert.ts:2115
Context: slack
Object: webhook: 'https://hooks.slack.com/...', channel: '#automation-alerts' 


### src/agents/experts/AutomationIntegrationExpert.ts:2116
Context: teams
Object: webhook: 'https://outlook.office.com/webhook/...' 


### src/agents/experts/AutomationIntegrationExpert.ts:2117
Context: sms
Object: provider: 'twilio', from: '+1234567890' 


### src/agents/experts/AutomationIntegrationExpert.ts:2124
Context: nError
Object: {error_message


### src/agents/experts/AutomationIntegrationExpert.ts:2124
Context: nTime
Object: {timestamp


### src/agents/experts/AutomationIntegrationExpert.ts:2169
Context: position
Object: x: (i % 2) * 6, y: Math.floor(i / 2) * 4 


### src/agents/experts/AutomationIntegrationExpert.ts:2188
Context: gridPos
Object: h: 8, w: 12, x: (i % 2) * 12, y: Math.floor(i / 2) * 8 


### src/agents/experts/AutomationIntegrationExpert.ts:2205
Context: Information
Object: {alert_name


### src/agents/experts/AutomationIntegrationExpert.ts:2206
Context: Warning
Object: {alert_name


### src/agents/experts/AutomationIntegrationExpert.ts:2207
Context: Error
Object: {alert_name


### src/agents/experts/AutomationIntegrationExpert.ts:2208
Context: CRITICAL
Object: {alert_name


### src/agents/experts/ArchitectureExpert.ts:57
Context: metadata
Object: 


### src/agents/experts/ArchitectureExpert.ts:66
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to analyze'
            


### src/agents/experts/ArchitectureExpert.ts:73
Context: analysisDepth
Object: type: 'string',
              enum: ['quick', 'standard', 'deep'],
              description: 'Depth of analysis to perform'
            


### src/agents/experts/ArchitectureExpert.ts:78
Context: includePatterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ArchitectureExpert.ts:83
Context: excludePatterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ArchitectureExpert.ts:96
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to analyze'
            


### src/agents/experts/ArchitectureExpert.ts:103
Context: diagramType
Object: type: 'string',
              enum: ['system', 'component', 'sequence', 'class', 'deployment', 'data-flow'],
              description: 'Type of diagram to generate'
            


### src/agents/experts/ArchitectureExpert.ts:108
Context: outputFormat
Object: type: 'string',
              enum: ['mermaid', 'dot', 'plantuml'],
              description: 'Output format for the diagram'
            


### src/agents/experts/ArchitectureExpert.ts:113
Context: includePatterns
Object: type: 'array',
              items: { type: 'string' 


### src/agents/experts/ArchitectureExpert.ts:126
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to analyze'
            


### src/agents/experts/ArchitectureExpert.ts:133
Context: analysisDepth
Object: type: 'string',
              enum: ['shallow', 'medium', 'deep'],
              description: 'Depth of relationship analysis'
            


### src/agents/experts/ArchitectureExpert.ts:138
Context: includeExternalDeps
Object: type: 'boolean',
              description: 'Whether to include external dependencies'
            


### src/agents/experts/ArchitectureExpert.ts:142
Context: groupByType
Object: type: 'boolean',
              description: 'Whether to group components by type'
            


### src/agents/experts/ArchitectureExpert.ts:154
Context: parameters
Object: type: 'object',
          properties: {
            projectType: {
              type: 'string',
              enum: ['web', 'mobile', 'desktop', 'api', 'microservices', 'data-pipeline', 'ml', 'iot'],
              description: 'Type of project'
            


### src/agents/experts/ArchitectureExpert.ts:162
Context: requirements
Object: type: 'object',
              properties: {
                scalability: {
                  type: 'string',
                  enum: ['low', 'medium', 'high', 'extreme']
                


### src/agents/experts/ArchitectureExpert.ts:169
Context: performance
Object: type: 'string',
                  enum: ['standard', 'high', 'real-time']
                


### src/agents/experts/ArchitectureExpert.ts:173
Context: teamSize
Object: type: 'string',
                  enum: ['solo', 'small', 'medium', 'large']
                


### src/agents/experts/ArchitectureExpert.ts:177
Context: budget
Object: type: 'string',
                  enum: ['low', 'medium', 'high', 'enterprise']
                


### src/agents/experts/ArchitectureExpert.ts:181
Context: timeline
Object: type: 'string',
                  enum: ['prototype', 'mvp', 'production', 'long-term']
                


### src/agents/experts/ArchitectureExpert.ts:185
Context: existingStack
Object: type: 'array',
                  items: { type: 'string' 


### src/agents/experts/ArchitectureExpert.ts:189
Context: constraints
Object: type: 'array',
                  items: { type: 'string' 


### src/agents/experts/ArchitectureExpert.ts:193
Context: preferences
Object: type: 'array',
                  items: { type: 'string' 


### src/agents/experts/ArchitectureExpert.ts:199
Context: useAI
Object: type: 'boolean',
              description: 'Whether to use AI-enhanced recommendations'
            


### src/agents/experts/ArchitectureExpert.ts:211
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to analyze'
            


### src/agents/experts/ArchitectureExpert.ts:218
Context: expectedLoad
Object: type: 'object',
              properties: {
                users: { type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:222
Context: requestsPerSecond
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:223
Context: dataVolumeGB
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:224
Context: growthRate
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:227
Context: currentMetrics
Object: type: 'object',
              properties: {
                responseTimeMs: { type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:231
Context: throughput
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:232
Context: errorRate
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:233
Context: resourceUtilization
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:236
Context: analysisType
Object: type: 'string',
              enum: ['code', 'infrastructure', 'both'],
              description: 'Type of scalability analysis'
            


### src/agents/experts/ArchitectureExpert.ts:249
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to analyze'
            


### src/agents/experts/ArchitectureExpert.ts:256
Context: scanDepth
Object: type: 'string',
              enum: ['quick', 'standard', 'deep'],
              description: 'Depth of security scan'
            


### src/agents/experts/ArchitectureExpert.ts:261
Context: complianceFrameworks
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['OWASP', 'PCI-DSS', 'HIPAA', 'SOC2', 'GDPR']
              


### src/agents/experts/ArchitectureExpert.ts:269
Context: threatModel
Object: type: 'boolean',
              description: 'Whether to generate threat model'
            


### src/agents/experts/ArchitectureExpert.ts:281
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to analyze'
            


### src/agents/experts/ArchitectureExpert.ts:288
Context: profileDuration
Object: type: 'number',
              description: 'Duration for performance profiling in milliseconds'
            


### src/agents/experts/ArchitectureExpert.ts:292
Context: loadTest
Object: type: 'object',
              properties: {
                enabled: { type: 'boolean' 


### src/agents/experts/ArchitectureExpert.ts:296
Context: concurrentRequests
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:297
Context: duration
Object: type: 'number' 


### src/agents/experts/ArchitectureExpert.ts:300
Context: metrics
Object: type: 'object',
              properties: {
                cpu: { type: 'boolean' 


### src/agents/experts/ArchitectureExpert.ts:304
Context: memory
Object: type: 'boolean' 


### src/agents/experts/ArchitectureExpert.ts:305
Context: io
Object: type: 'boolean' 


### src/agents/experts/ArchitectureExpert.ts:306
Context: network
Object: type: 'boolean' 


### src/agents/experts/ArchitectureExpert.ts:317
Context: parameters
Object: type: 'object',
          properties: {
            targetPath: {
              type: 'string',
              description: 'Path to the codebase to document'
            


### src/agents/experts/ArchitectureExpert.ts:324
Context: outputFormat
Object: type: 'string',
              enum: ['markdown', 'html', 'pdf', 'confluence', 'docusaurus'],
              description: 'Output format for documentation'
            


### src/agents/experts/ArchitectureExpert.ts:329
Context: documentationType
Object: type: 'string',
              enum: ['overview', 'detailed', 'api', 'deployment', 'all'],
              description: 'Type of documentation to generate'
            


### src/agents/experts/ArchitectureExpert.ts:334
Context: includeDiagrams
Object: type: 'boolean',
              description: 'Whether to include architecture diagrams'
            


### src/agents/experts/ArchitectureExpert.ts:338
Context: templateStyle
Object: type: 'string',
              enum: ['minimal', 'standard', 'comprehensive'],
              description: 'Documentation template style'
            


### src/agents/experts/APIIntegrationExpert.ts:113
Context: metadata
Object: migrationVersion: '2.0',
        ragEnabled: true,
        toolCount: 8
      


### src/agents/experts/APIIntegrationExpert.ts:119
Context: multiModel
Object: modelSelection: {
          strategy: 'static',
          primary: {
            id: 'mistral:latest',
            name: 'Mistral 7B',
            provider: 'ollama',
            costTier: 'low',
            speedTier: 'fast',
            qualityTier: 'good',
            contextWindow: 8192,
            maxTokens: 2000,
            capabilities: ['api-design', 'code-generation', 'documentation'],
            specialties: ['rest-api', 'graphql', 'openapi'],
            metadata: {


### src/agents/experts/APIIntegrationExpert.ts:147
Context: metadata
Object: 


### src/agents/experts/APIIntegrationExpert.ts:150
Context: selectionCriteria
Object: strategy: 'static',
            weights: {
              speed: 0.3,
              cost: 0.2,
              quality: 0.4,
              availability: 0.1
            


### src/agents/experts/APIIntegrationExpert.ts:158
Context: constraints
Object: allowedProviders: ['ollama']
            


### src/agents/experts/APIIntegrationExpert.ts:161
Context: fallbackBehavior
Object: enableFallback: true,
              maxFallbackAttempts: 2,
              fallbackDelay: 1000
            


### src/agents/experts/APIIntegrationExpert.ts:169
Context: modelRouter
Object: enabled: true,
          cacheSelections: true,
          cacheTTL: 300000,
          adaptiveSelection: false
        


### src/agents/experts/APIIntegrationExpert.ts:176
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.7,
        maxTokens: 2000
      


### src/agents/experts/APIIntegrationExpert.ts:181
Context: modelPreferences
Object: preferMultiModel: true,
        fallbackToLegacy: true
      


### src/agents/experts/APIIntegrationExpert.ts:193
Context: parameters
Object: type: 'object',
          properties: {
            api_name: {
              type: 'string',
              description: 'Name of the API'
            


### src/agents/experts/APIIntegrationExpert.ts:200
Context: api_version
Object: type: 'string',
              description: 'API version (e.g., v1, v2)'
            


### src/agents/experts/APIIntegrationExpert.ts:204
Context: endpoints
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  path: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:210
Context: method
Object: type: 'string', enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] 


### src/agents/experts/APIIntegrationExpert.ts:211
Context: summary
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:212
Context: parameters
Object: type: 'array' 


### src/agents/experts/APIIntegrationExpert.ts:213
Context: requestBody
Object: type: 'object' 


### src/agents/experts/APIIntegrationExpert.ts:214
Context: responses
Object: type: 'object' 


### src/agents/experts/APIIntegrationExpert.ts:219
Context: authentication
Object: type: 'object',
              properties: {
                type: { type: 'string', enum: ['apiKey', 'oauth2', 'jwt', 'basic'] 


### src/agents/experts/APIIntegrationExpert.ts:223
Context: flows
Object: type: 'object' 


### src/agents/experts/APIIntegrationExpert.ts:224
Context: scopes
Object: type: 'object' 


### src/agents/experts/APIIntegrationExpert.ts:228
Context: base_url
Object: type: 'string',
              description: 'Base URL for the API'
            


### src/agents/experts/APIIntegrationExpert.ts:232
Context: output_format
Object: type: 'string',
              enum: ['openapi3', 'swagger2', 'raml', 'graphql-schema'],
              description: 'Output specification format'
            


### src/agents/experts/APIIntegrationExpert.ts:245
Context: parameters
Object: type: 'object',
          properties: {
            framework: {
              type: 'string',
              enum: ['express', 'fastify', 'nestjs', 'flask', 'django', 'fastapi', 'spring'],
              description: 'Backend framework'
            


### src/agents/experts/APIIntegrationExpert.ts:253
Context: endpoint_config
Object: type: 'object',
              properties: {
                path: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:257
Context: method
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:258
Context: handler_name
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:259
Context: middleware
Object: type: 'array', items: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:260
Context: validation
Object: type: 'object' 


### src/agents/experts/APIIntegrationExpert.ts:261
Context: response_type
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:265
Context: include_features
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['validation', 'error-handling', 'logging', 'caching', 'rate-limiting', 'authentication']
              


### src/agents/experts/APIIntegrationExpert.ts:273
Context: language
Object: type: 'string',
              enum: ['typescript', 'javascript', 'python', 'java', 'csharp'],
              description: 'Programming language'
            


### src/agents/experts/APIIntegrationExpert.ts:286
Context: parameters
Object: type: 'object',
          properties: {
            auth_requirements: {
              type: 'object',
              properties: {
                user_types: { type: 'array', items: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:293
Context: security_level
Object: type: 'string', enum: ['low', 'medium', 'high', 'critical'] 


### src/agents/experts/APIIntegrationExpert.ts:294
Context: session_management
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:295
Context: multi_factor
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:296
Context: single_sign_on
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:300
Context: api_type
Object: type: 'string',
              enum: ['public', 'private', 'partner', 'internal'],
              description: 'Type of API access'
            


### src/agents/experts/APIIntegrationExpert.ts:305
Context: compliance
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['GDPR', 'HIPAA', 'PCI-DSS', 'SOC2', 'ISO27001']
              


### src/agents/experts/APIIntegrationExpert.ts:313
Context: implementation_preference
Object: type: 'string',
              enum: ['jwt', 'oauth2', 'api-key', 'mutual-tls', 'hybrid'],
              description: 'Preferred authentication method'
            


### src/agents/experts/APIIntegrationExpert.ts:326
Context: parameters
Object: type: 'object',
          properties: {
            strategy: {
              type: 'string',
              enum: ['fixed-window', 'sliding-window', 'token-bucket', 'leaky-bucket'],
              description: 'Rate limiting algorithm'
            


### src/agents/experts/APIIntegrationExpert.ts:334
Context: limits
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  tier: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:340
Context: requests_per_minute
Object: type: 'number' 


### src/agents/experts/APIIntegrationExpert.ts:341
Context: requests_per_hour
Object: type: 'number' 


### src/agents/experts/APIIntegrationExpert.ts:342
Context: requests_per_day
Object: type: 'number' 


### src/agents/experts/APIIntegrationExpert.ts:343
Context: burst_capacity
Object: type: 'number' 


### src/agents/experts/APIIntegrationExpert.ts:348
Context: implementation
Object: type: 'string',
              enum: ['application', 'api-gateway', 'cdn', 'distributed'],
              description: 'Where to implement rate limiting'
            


### src/agents/experts/APIIntegrationExpert.ts:353
Context: storage_backend
Object: type: 'string',
              enum: ['memory', 'redis', 'memcached', 'database'],
              description: 'Storage for rate limit counters'
            


### src/agents/experts/APIIntegrationExpert.ts:358
Context: response_headers
Object: type: 'boolean',
              description: 'Include rate limit headers in responses'
            


### src/agents/experts/APIIntegrationExpert.ts:370
Context: parameters
Object: type: 'object',
          properties: {
            spec_source: {
              type: 'string',
              description: 'Path or URL to API specification'
            


### src/agents/experts/APIIntegrationExpert.ts:377
Context: spec_format
Object: type: 'string',
              enum: ['openapi3', 'swagger2', 'raml', 'api-blueprint', 'graphql'],
              description: 'Specification format'
            


### src/agents/experts/APIIntegrationExpert.ts:382
Context: output_formats
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['html', 'markdown', 'pdf', 'postman-collection', 'insomnia']
              


### src/agents/experts/APIIntegrationExpert.ts:390
Context: customization
Object: type: 'object',
              properties: {
                theme: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:394
Context: logo_url
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:395
Context: code_samples
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:396
Context: try_it_out
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:397
Context: authentication_docs
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:401
Context: include_sections
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['overview', 'authentication', 'errors', 'rate-limits', 'webhooks', 'changelog', 'sdk']
              


### src/agents/experts/APIIntegrationExpert.ts:417
Context: parameters
Object: type: 'object',
          properties: {
            test_framework: {
              type: 'string',
              enum: ['jest', 'mocha', 'pytest', 'junit', 'mstest', 'postman', 'newman'],
              description: 'Testing framework'
            


### src/agents/experts/APIIntegrationExpert.ts:425
Context: api_spec
Object: type: 'string',
              description: 'Path to API specification or base URL'
            


### src/agents/experts/APIIntegrationExpert.ts:429
Context: test_scenarios
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['happy-path', 'error-cases', 'edge-cases', 'security', 'performance', 'contract']
              


### src/agents/experts/APIIntegrationExpert.ts:437
Context: authentication_config
Object: type: 'object',
              properties: {
                method: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:441
Context: credentials
Object: type: 'object' 


### src/agents/experts/APIIntegrationExpert.ts:445
Context: coverage_target
Object: type: 'number',
              description: 'Target test coverage percentage',
              minimum: 0,
              maximum: 100
            


### src/agents/experts/APIIntegrationExpert.ts:459
Context: parameters
Object: type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['design', 'implement', 'test', 'monitor', 'troubleshoot'],
              description: 'Webhook management action'
            


### src/agents/experts/APIIntegrationExpert.ts:467
Context: webhook_config
Object: type: 'object',
              properties: {
                events: { type: 'array', items: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:471
Context: url_pattern
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:472
Context: retry_policy
Object: type: 'object',
                  properties: {
                    max_attempts: { type: 'number' 


### src/agents/experts/APIIntegrationExpert.ts:476
Context: backoff_strategy
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:477
Context: timeout
Object: type: 'number' 


### src/agents/experts/APIIntegrationExpert.ts:480
Context: security
Object: type: 'object',
                  properties: {
                    signature_method: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:484
Context: secret_rotation
Object: type: 'boolean' 


### src/agents/experts/APIIntegrationExpert.ts:490
Context: delivery_guarantees
Object: type: 'string',
              enum: ['at-most-once', 'at-least-once', 'exactly-once'],
              description: 'Message delivery guarantee'
            


### src/agents/experts/APIIntegrationExpert.ts:495
Context: storage_strategy
Object: type: 'string',
              enum: ['database', 'queue', 'event-stream', 'hybrid'],
              description: 'Event storage strategy'
            


### src/agents/experts/APIIntegrationExpert.ts:508
Context: parameters
Object: type: 'object',
          properties: {
            versioning_strategy: {
              type: 'string',
              enum: ['uri-path', 'query-param', 'header', 'content-negotiation'],
              description: 'API versioning approach'
            


### src/agents/experts/APIIntegrationExpert.ts:516
Context: current_version
Object: type: 'string',
              description: 'Current API version'
            


### src/agents/experts/APIIntegrationExpert.ts:520
Context: new_version
Object: type: 'string',
              description: 'New API version'
            


### src/agents/experts/APIIntegrationExpert.ts:524
Context: breaking_changes
Object: type: 'array',
              items: {
                type: 'object',
                properties: {
                  endpoint: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:530
Context: change_type
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:531
Context: description
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:532
Context: migration_path
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:537
Context: deprecation_timeline
Object: type: 'object',
              properties: {
                announcement_date: { type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:541
Context: deprecation_date
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:542
Context: sunset_date
Object: type: 'string' 


### src/agents/experts/APIIntegrationExpert.ts:546
Context: migration_tools
Object: type: 'array',
              items: {
                type: 'string',
                enum: ['sdk-update', 'migration-guide', 'compatibility-layer', 'automated-migration']
              


### src/agents/experts/APIIntegrationExpert.ts:572
Context: info
Object: title: api_name,
          version: api_version || '1.0.0',
          description: `API specification for ${api_name


### src/agents/experts/APIIntegrationExpert.ts:578
Context: paths
Object: 


### src/agents/experts/APIIntegrationExpert.ts:579
Context: components
Object: schemas: {


### src/agents/experts/APIIntegrationExpert.ts:581
Context: securitySchemes
Object: 


### src/agents/experts/APIIntegrationExpert.ts:642
Context: data
Object: specification: openApiSpec,
          validation,
          export_ready: true,
          recommendations: [
            'Add detailed response schemas for each endpoint',
            'Include example requests and responses',
            'Document error response formats',
            'Add rate limiting information',
            'Include versioning strategy'
          ],
          next_steps: [
            'Export specification to file',
            'Import into API documentation tool',
            'Generate client SDKs',
            'Set up API gateway configuration'
          ]
        


### src/agents/experts/APIIntegrationExpert.ts:660
Context: metadata
Object: api_name,
          version: api_version || '1.0.0',
          format: output_format || 'openapi3',
          endpoint_count: endpoints.length
        


### src/agents/experts/APIIntegrationExpert.ts:795
Context: data
Object: generated_code: generatedCode,
          file_name: `${handler_name


### src/agents/experts/APIIntegrationExpert.ts:798
Context: dependencies
Object: express: include_features?.includes('validation') ? ['express-validator'] : [],
            logging: include_features?.includes('logging') ? ['winston', 'morgan'] : [],
            caching: include_features?.includes('caching') ? ['redis', 'node-cache'] : [],
            security: include_features?.includes('authentication') ? ['jsonwebtoken', 'passport'] : []
          


### src/agents/experts/APIIntegrationExpert.ts:814
Context: metadata
Object: framework,
          language: language || 'typescript',
          features_count: include_features?.length || 0,
          endpoint: `${method


### src/agents/experts/APIIntegrationExpert.ts:870
Context: security_headers
Object: 'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Content-Security-Policy': "default-src 'self'"
        


### src/agents/experts/APIIntegrationExpert.ts:877
Context: session_config
Object: storage: 'redis',
          expiry: 3600,
          rolling: true,
          secure: true,
          httpOnly: true,
          sameSite: 'strict'
        


### src/agents/experts/APIIntegrationExpert.ts:899
Context: data
Object: recommended_pattern: recommendedPattern,
          implementation,
          recommendations,
          compliance_checklist: compliance?.map(c => ({
            standard: c,
            requirements: complianceRequirements[c] || []
          


### src/agents/experts/APIIntegrationExpert.ts:915
Context: implementation_timeline
Object: phase1: 'Basic authentication flow (1-2 weeks)',
            phase2: 'MFA integration (1 week)',
            phase3: 'SSO implementation (2-3 weeks)',
            phase4: 'Compliance validation (1 week)'
          


### src/agents/experts/APIIntegrationExpert.ts:922
Context: metadata
Object: api_type,
          security_level: auth_requirements.security_level,
          compliance_count: compliance?.length || 0,
          pattern: recommendedPattern
        


### src/agents/experts/APIIntegrationExpert.ts:1006
Context: aws
Object: usagePlan: {
              throttle: {
                rateLimit: limits[0]?.requests_per_minute || 100,
                burstLimit: limits[0]?.burst_capacity || 200
              


### src/agents/experts/APIIntegrationExpert.ts:1012
Context: quota
Object: limit: limits[0]?.requests_per_day || 10000,
                period: 'DAY'
              


### src/agents/experts/APIIntegrationExpert.ts:1018
Context: kong
Object: plugins: [{
              name: 'rate-limiting',
              config: {
                minute: limits[0]?.requests_per_minute,
                hour: limits[0]?.requests_per_hour,
                policy: strategy
              


### src/agents/experts/APIIntegrationExpert.ts:1034
Context: data
Object: configuration: config,
          tier_limits: tierConfigs,
          implementation_code: implementations[implementation === 'application' ? 'express-redis' : implementation] || {


### src/agents/experts/APIIntegrationExpert.ts:1044
Context: monitoring
Object: metrics: [
              'rate_limit_hits_total',
              'rate_limit_exceeded_total',
              'rate_limit_remaining_gauge'
            ],
            alerts: [
              'High rate limit breach rate (>10%)',
              'Unusual traffic patterns',
              'Storage backend latency'
            ]
          


### src/agents/experts/APIIntegrationExpert.ts:1064
Context: metadata
Object: strategy,
          storage: storage_backend || 'redis',
          tier_count: limits.length,
          implementation_layer: implementation
        


### src/agents/experts/APIIntegrationExpert.ts:1092
Context: features
Object: interactive: customization?.try_it_out || false,
          code_samples: customization?.code_samples !== false,
          authentication_guide: customization?.authentication_docs !== false
        


### src/agents/experts/APIIntegrationExpert.ts:1111
Context: endpoints
Object: title: 'API Endpoints',
          grouped_by: 'tags',
          include_deprecated: false
        


### src/agents/experts/APIIntegrationExpert.ts:1131
Context: redoc
Object: command: `npx redoc-cli bundle ${spec_source


### src/agents/experts/APIIntegrationExpert.ts:1133
Context: config
Object: theme: {
              colors: { primary: { main: '#007bff' 


### src/agents/experts/APIIntegrationExpert.ts:1136
Context: typography
Object: fontSize: '14px' 


### src/agents/experts/APIIntegrationExpert.ts:1138
Context: features
Object: search: true,
              jsonSamples: true,
              pathInMiddlePanel: true
            


### src/agents/experts/APIIntegrationExpert.ts:1145
Context: swagger
Object: command: `npx swagger-ui-dist`,
          config: {
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: ['SwaggerUIBundle.presets.apis'],
            layout: 'StandaloneLayout'
          


### src/agents/experts/APIIntegrationExpert.ts:1154
Context: postman
Object: command: `npx openapi-to-postmanv2 -s ${spec_source


### src/agents/experts/APIIntegrationExpert.ts:1163
Context: data
Object: documentation_plan: docPlan,
          structure: documentation,
          generation_tools: output_formats?.map(format => ({
            format,
            tool: format === 'html' ? 'redoc' : format,
            config: toolConfigs[format] || {


### src/agents/experts/APIIntegrationExpert.ts:1172
Context: sdk_generation
Object: languages: ['typescript', 'python', 'java', 'go'],
            command: 'openapi-generator-cli generate',
            options: ['--remove-operation-id-prefix', '--enable-post-process-file']
          


### src/agents/experts/APIIntegrationExpert.ts:1191
Context: metadata
Object: source: spec_source,
          format: spec_format,
          output_count: output_formats?.length || 1,
          sections_count: include_sections?.length || 0
        


### src/agents/experts/APIIntegrationExpert.ts:1218
Context: structure
Object: setup: 'Global test setup and teardown',
          fixtures: 'Test data and mocks',
          helpers: 'Utility functions',
          tests: test_scenarios || ['happy-path', 'error-cases']
        


### src/agents/experts/APIIntegrationExpert.ts:1240
Context: headers
Object: 'Content-Type': 'application/json',
    ${authentication_config ? `'Authorization': 'Bearer \${process.env.API_TOKEN


### src/agents/experts/APIIntegrationExpert.ts:1297
Context: response
Object: status: 404 


### src/agents/experts/APIIntegrationExpert.ts:1307
Context: response
Object: status: 401 


### src/agents/experts/APIIntegrationExpert.ts:1377
Context: data
Object: test_suite: testSuite,
          generated_tests: generatedTests,
          test_utilities: testUtilities,
          coverage_config: {
            target: coverage_target || 80,
            thresholds: {
              statements: coverage_target || 80,
              branches: (coverage_target || 80) - 5,
              functions: coverage_target || 80,
              lines: coverage_target || 80
            


### src/agents/experts/APIIntegrationExpert.ts:1391
Context: ci_integration
Object: github_actions: `name: API Tests\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - run: npm test`,
            commands: [
              `${test_framework === 'jest' ? 'npm test' : ''


### src/agents/experts/APIIntegrationExpert.ts:1408
Context: metadata
Object: framework: test_framework,
          scenarios_count: test_scenarios?.length || 2,
          has_auth: !!authentication_config,
          coverage_target
        


### src/agents/experts/APIIntegrationExpert.ts:1438
Context: webhook_architecture
Object: event_types: events || [],
              delivery_model: delivery_guarantees || 'at-least-once',
              storage: storage_strategy || 'queue',
              components: [
                'Event Producer',
                'Event Store',
                'Delivery Service',
                'Retry Manager',
                'Dead Letter Queue'
              ]
            


### src/agents/experts/APIIntegrationExpert.ts:1450
Context: event_schema
Object: id: 'uuid',
              timestamp: 'ISO 8601',
              event_type: 'string',
              payload: 'object',
              metadata: {
                version: 'string',
                source: 'string',
                correlation_id: 'string'
              


### src/agents/experts/APIIntegrationExpert.ts:1461
Context: security_design
Object: signature_algorithm: security?.signature_method || 'HMAC-SHA256',
              headers: {
                'X-Webhook-Signature': 'HMAC signature',
                'X-Webhook-Timestamp': 'Request timestamp',
                'X-Webhook-Event': 'Event type'
              


### src/agents/experts/APIIntegrationExpert.ts:1486
Context: headers
Object: 'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Timestamp': timestamp.toString(),
        'X-Webhook-Event': _event.type
      


### src/agents/experts/APIIntegrationExpert.ts:1508
Context: retry_implementation
Object: max_attempts: retry_policy?.max_attempts || 3,
              backoff: retry_policy?.backoff_strategy || 'exponential',
              delays: [5, 30, 300], // seconds
              dead_letter_after: 3
            


### src/agents/experts/APIIntegrationExpert.ts:1562
Context: dashboards
Object: delivery_status: 'Success/failure rates over time',
              latency: 'P50, P95, P99 delivery times',
              event_volume: 'Events per minute by type',
              error_analysis: 'Failure reasons breakdown'
            


### src/agents/experts/APIIntegrationExpert.ts:1580
Context: data
Object: action_result: result,
          webhook_best_practices: [
            'Implement idempotency with event IDs',
            'Use exponential backoff for retries',
            'Sign payloads for security',
            'Include timestamp to prevent replay attacks',
            'Provide webhook testing tools',
            'Document event schemas clearly',
            'Implement circuit breakers for failing endpoints'
          ],
          troubleshooting_guide: {
            'Webhook not received': ['Check URL accessibility', 'Verify firewall rules', 'Check SSL certificates'],
            'Signature validation failing': ['Verify secret key', 'Check timestamp window', 'Ensure consistent encoding'],
            'High failure rate': ['Check endpoint performance', 'Verify payload size limits', 'Review timeout settings']
          


### src/agents/experts/APIIntegrationExpert.ts:1597
Context: metadata
Object: _action,
          event_count: events?.length || 0,
          delivery_guarantee: delivery_guarantees,
          storage: storage_strategy
        


### src/agents/experts/APIIntegrationExpert.ts:1687
Context: headers
Object: 'API-Version': '2.0' 


### src/agents/experts/APIIntegrationExpert.ts:1701
Context: documentation
Object: migration_guide: 'Step-by-step upgrade instructions',
          change_log: 'Detailed list of all changes',
          code_examples: 'Before/after code samples',
          faq: 'Common questions and solutions'
        


### src/agents/experts/APIIntegrationExpert.ts:1731
Context: testing
Object: test_suite: 'Compatibility test suite',
          sandbox: 'Test environment with new version',
          validation: 'API contract testing'
        


### src/agents/experts/APIIntegrationExpert.ts:1741
Context: data
Object: version_info: versionInfo,
          migration_plan: migrationPlan,
          implementation: implementations[versioning_strategy] || {


### src/agents/experts/APIIntegrationExpert.ts:1751
Context: communication_plan
Object: channels: ['Email', 'API Dashboard', 'Documentation', 'Blog'],
            timeline: [
              '90 days before: Initial announcement',
              '60 days before: Detailed migration guide',
              '30 days before: Final reminder',
              '7 days before: Urgent notice'
            ],
            templates: {
              announcement: 'Version X deprecation notice template',
              reminder: 'Migration reminder template',
              sunset: 'Final sunset notification'
            


### src/agents/experts/APIIntegrationExpert.ts:1774
Context: metadata
Object: strategy: versioning_strategy,
          current_version,
          has_breaking_changes: breaking_changes?.length > 0,
          migration_tools_count: migration_tools?.length || 0
        


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:66
Context: coverage_thresholds
Object: lines: 80,
          branches: 75,
          functions: 85,
          statements: 80
        


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:96
Context: quality_gates
Object: unit_tests: { pass_rate: 100, coverage: 80 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:98
Context: e2e_tests
Object: pass_rate: 95, max_duration: 600 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:103
Context: artifacts_retention
Object: test_reports: { retention: '30d' 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:155
Context: load_configuration
Object: virtual_users: 100,
          duration: '10m',
          ramp_up: '1m'
        


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:160
Context: performance_thresholds
Object: response_time_p95: 2000,
          error_rate: 1,
          throughput_min: 50
        


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:338
Context: test_candidates
Object: unit: 10, integration: 5, e2e: 3 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:370
Context: coverage_thresholds
Object: lines: 80, branches: 75 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:418
Context: results
Object: lines: false, branches: false 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:602
Context: response_times
Object: p95: 1500, p99: 2500 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:603
Context: error_analysis
Object: error_rate: 0.5 


### src/agents/experts/__tests__/TestingAndQAExpert.tools.test.ts:620
Context: response_times
Object: average: 850 


### src/agents/experts/__tests__/TemplateLibraryExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/TemplateLibraryExpert.tools.test.ts:158
Context: template_variables
Object: projectName: 'New Project' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:37
Context: template_params
Object: project_name: 'AI Assistant System',
          executive_summary: 'A comprehensive AI assistant for development teams',
          problem_statement: 'Teams need better automation and assistance',
          proposed_solution: 'Multi-agent AI system with specialized experts',
          risks: [
            { description: 'Technical complexity', impact: 'High', probability: 0.3 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:48
Context: architecture_details
Object: components: ['API Server', 'Agent System', 'UI']
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:53
Context: styling_options
Object: theme: 'professional',
          include_toc: true,
          include_page_numbers: true
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:58
Context: version_control
Object: track_changes: true,
          version_number: '1.0.0',
          changelog: 'Initial version'
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:83
Context: diagram_data
Object: nodes: [
            { id: 'api', label: 'API Server', type: 'service' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:95
Context: format_options
Object: output_format: 'mermaid',
          color_scheme: 'default'
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:150
Context: simulation_params
Object: iterations: 1000,
          confidence_level: 0.95
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:155
Context: risk_appetite
Object: technical: 0.5,
          schedule: 0.3,
          budget: 0.4
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:188
Context: traceability_options
Object: link_to_features: true,
          link_to_tests: true,
          link_to_risks: true
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:219
Context: architecture_decision
Object: title: 'Microservices vs Monolith',
          context: 'Need to decide on system architecture for scalability',
          decision: 'Adopt microservices architecture',
          alternatives: [
            {
              name: 'Monolithic Architecture',
              pros: ['Simpler deployment', 'Easier debugging'],
              cons: ['Harder to scale', 'Technology lock-in']
            


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:235
Context: consequences
Object: positive: ['Independent scaling', 'Technology flexibility'],
            negative: ['Increased complexity', 'Network latency'],
            risks: ['Service coordination challenges']
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:243
Context: trade_off_analysis
Object: weights: {
            scalability: 0.3,
            performance: 0.25,
            security: 0.25,
            cost: 0.2
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:436
Context: template_params
Object: project_name: 'Test Project',
          executive_summary: 'Summary',
          problem_statement: 'Problem',
          proposed_solution: 'Solution',
          architecture_description: 'Architecture',
          technology_stack: 'Tech stack',
          data_flow: 'Data flow',
          risk_analysis: 'Risks',
          development_plan: 'Plan',
          success_metrics: 'Metrics',
          decision_log: 'Decisions'
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:463
Context: template_params
Object: number: '001',
          title: 'Use React for Frontend',
          status: 'Accepted',
          context: 'Need to choose frontend framework',
          decision: 'Use React',
          positive_consequences: '- Large ecosystem\n- Good performance',
          negative_consequences: '- Learning curve',
          risks: '- Framework changes'
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:486
Context: template_params
Object: title: 'Project Plan',
          project_overview: 'Overview',
          objectives: 'Objectives',
          scope: 'Scope',
          timeline: 'Timeline',
          resources: 'Resources',
          risk_management: 'Risks',
          success_criteria: 'Success'
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:496
Context: styling_options
Object: include_toc: true
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:512
Context: diagram_data
Object: nodes: [
            { id: 'start', label: 'Start', type: 'start' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:539
Context: diagram_data
Object: nodes: [
            { id: '1', label: 'Project Kickoff', metadata: { description: 'Initial meeting' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:542
Context: metadata
Object: description: 'Architecture design' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:543
Context: metadata
Object: description: 'Implementation' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:544
Context: metadata
Object: description: 'QA and testing' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:545
Context: metadata
Object: description: 'Go live' 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:561
Context: diagram_data
Object: nodes: [
            { id: 'r1', label: 'Risk 1', metadata: { probability: 0.8, impact: 0.9 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:564
Context: metadata
Object: probability: 0.3, impact: 0.5 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:565
Context: metadata
Object: probability: 0.6, impact: 0.7 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:605
Context: simulation_params
Object: iterations: 100,
          confidence_level: 0.95
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:706
Context: traceability_options
Object: link_to_features: true,
          link_to_tests: true,
          link_to_risks: true
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:757
Context: architecture_decision
Object: title: 'API Gateway Pattern',
          context: 'Need centralized API management',
          decision: 'Implement API Gateway',
          consequences: {
            positive: ['Centralized authentication', 'Rate limiting'],
            negative: ['Single point of failure'],
            risks: ['Performance bottleneck']
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:780
Context: architecture_decision
Object: title: 'Cloud Architecture',
          context: 'Migrating to cloud',
          decision: 'Use AWS services'
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:797
Context: architecture_decision
Object: title: 'Database Selection',
          context: 'Choose database technology',
          decision: 'Use PostgreSQL',
          alternatives: [
            {
              name: 'MongoDB',
              pros: ['Flexible schema', 'Horizontal scaling'],
              cons: ['Eventual consistency', 'Complex queries']
            


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:814
Context: trade_off_analysis
Object: weights: {
            scalability: 0.3,
            performance: 0.25,
            cost: 0.25,
            complexity: 0.2
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:834
Context: architecture_decision
Object: title: 'Event-Driven Architecture',
          context: 'Need asynchronous processing',
          decision: 'Implement event-driven pattern',
          alternatives: [
            { name: 'Synchronous APIs', pros: ['Simple'], cons: ['Blocking'] 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:841
Context: consequences
Object: positive: ['Scalability', 'Decoupling'],
            negative: ['Complexity'],
            risks: ['Event ordering']
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:863
Context: template_params
Object: project_name: 'Enterprise AI Platform',
          executive_summary: 'Building an enterprise-grade AI platform',
          problem_statement: 'Lack of unified AI capabilities',
          proposed_solution: 'Comprehensive AI platform with multiple models',
          architecture_description: 'Microservices with API Gateway',
          technology_stack: 'Python, FastAPI, PostgreSQL, Redis',
          data_flow: 'Client -> Gateway -> Services -> Database',
          risks: [
            { description: 'Scalability concerns', impact: 'High', probability: 0.4 


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:884
Context: styling_options
Object: theme: 'professional',
          include_toc: true
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:931
Context: simulation_params
Object: iterations: 5000,
          confidence_level: 0.99
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:936
Context: risk_appetite
Object: security: 0.2,
          technical: 0.5,
          business: 0.4
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:966
Context: traceability_options
Object: link_to_features: true,
          link_to_tests: true,
          link_to_risks: true
        


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:990
Context: architecture_decision
Object: title: 'Multi-Region Cloud Architecture',
          context: 'Need to support global users with low latency and high availability',
          decision: 'Implement multi-region architecture with active-active configuration',
          alternatives: [
            {
              name: 'Single Region with CDN',
              pros: ['Simple deployment', 'Lower cost', 'Easier management'],
              cons: ['Higher latency for distant users', 'Single point of failure']
            


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:1006
Context: consequences
Object: positive: [
              'Low latency for all users',
              'High availability',
              'Disaster recovery built-in'
            ],
            negative: [
              'Complex data synchronization',
              'Higher infrastructure costs',
              'Operational complexity'
            ],
            risks: [
              'Data consistency issues',
              'Network partition handling',
              'Cost overruns'
            ]
          


### src/agents/experts/__tests__/ProjectPlanningExpert.tools.test.ts:1026
Context: trade_off_analysis
Object: weights: {
            scalability: 0.25,
            performance: 0.25,
            security: 0.20,
            maintainability: 0.15,
            cost: 0.15
          


### src/agents/experts/__tests__/ProjectOrganizationExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/ProjectOrganizationExpert.tools.test.ts:99
Context: customizations
Object: testing: true 


### src/agents/experts/__tests__/ProjectOrganizationExpert.integration.test.ts:143
Context: customizations
Object: includeLinting: true 


### src/agents/experts/__tests__/ProjectOrganizationExpert.functional.test.ts:168
Context: scripts
Object: 'build': 'tsc',
          'dev': 'ts-node src/index.ts',
          'test': 'jest'
        


### src/agents/experts/__tests__/ProjectOrganizationExpert.functional.test.ts:173
Context: dependencies
Object: 'typescript': '^5.0.0',
          '@types/node': '^20.0.0'
        


### src/agents/experts/__tests__/MasterOrchestrator.tools.test.ts:5
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  


### src/agents/experts/__tests__/MasterOrchestrator.tools.test.ts:73
Context: data
Object: main_task: 'create typescript project',
          complexity: 'medium',
          domain_keywords: { typescript: ['typescript'], architecture: ['project'] 


### src/agents/experts/__tests__/MasterOrchestrator.tools.test.ts:82
Context: data
Object: primaryAgent: {
            agentId: 'architecture-expert',
            confidence: 0.95,
            reason: 'TypeScript project creation matches architecture expertise'
          


### src/agents/experts/__tests__/MasterOrchestrator.tools.test.ts:103
Context: data
Object: 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:58
Context: message
Object: content: JSON.stringify({
              primaryGoal: 'Create a REST API with authentication',
              subGoals: ['Design endpoints', 'Implement JWT auth', 'Add validation'],
              constraints: ['Use TypeScript', 'Follow REST principles'],
              requiredExperts: ['api-integration-expert', 'security-specialist'],
              complexity: 'medium',
              urgency: 'high',
              confidence: 0.92
            


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:73
Context: message
Object: content: JSON.stringify({
              tasks: [
                {
                  id: 'task-1',
                  description: 'Design REST API endpoints',
                  assignedAgent: 'api-integration-expert',
                  priority: 9,
                  dependencies: [],
                  acceptanceCriteria: ['OpenAPI spec created', 'Endpoints documented'],
                  estimatedDuration: 30
                


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:101
Context: message
Object: content: JSON.stringify({
              accuracy: 88,
              completeness: 92,
              consistency: 85,
              overall: 88,
              reasoning: 'Excellent API design with comprehensive documentation',
              recommendations: ['Add rate limiting', 'Consider versioning strategy']
            


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:114
Context: message
Object: content: JSON.stringify({
              accuracy: 90,
              completeness: 87,
              consistency: 89,
              overall: 89,
              reasoning: 'Robust authentication implementation',
              recommendations: ['Add refresh token support', 'Implement logout endpoint']
            


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:172
Context: message
Object: content: JSON.stringify({
              primaryGoal: 'Test goal',
              subGoals: [],
              constraints: [],
              requiredExperts: ['python-expert'],
              complexity: 'low',
              urgency: 'medium',
              confidence: 0.8
            


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:200
Context: message
Object: content: JSON.stringify({
            primaryGoal: 'Code review automation',
            subGoals: ['Setup CI/CD', 'Configure linting'],
            constraints: ['Use GitHub Actions'],
            requiredExperts: ['github-workflow-expert'],
            complexity: 'medium',
            urgency: 'low',
            confidence: 0.85
          


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:220
Context: context
Object: projectType: 'typescript' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:231
Context: message
Object: content: JSON.stringify({
            tasks: [
              {
                id: 'setup-1',
                description: 'Configure GitHub Actions workflow',
                assignedAgent: 'github-workflow-expert',
                priority: 8,
                dependencies: [],
                acceptanceCriteria: ['Workflow file created', 'Tests run on PR'],
                estimatedDuration: 20
              


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:273
Context: message
Object: content: JSON.stringify({
            accuracy: 95,
            completeness: 88,
            consistency: 92,
            overall: 92,
            reasoning: 'High-quality implementation with excellent test coverage',
            recommendations: ['Add performance benchmarks', 'Consider edge cases']
          


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:293
Context: output
Object: code: 'def test(): pass', tests: 5 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:319
Context: message
Object: content: JSON.stringify({ primaryGoal: 'test' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:333
Context: message
Object: content: JSON.stringify({ primaryGoal: 'test' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:346
Context: message
Object: content: JSON.stringify({ primaryGoal: 'test' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:379
Context: message
Object: content: 'This is not valid JSON' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:416
Context: message
Object: content: JSON.stringify({
            primaryGoal: 'Performance test',
            confidence: 0.9
          


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:439
Context: message
Object: content: JSON.stringify({ primaryGoal: 'test' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:454
Context: message
Object: content: JSON.stringify({ primaryGoal: 'test' 


### src/agents/experts/__tests__/MasterOrchestrator.integration.test.ts:476
Context: message
Object: content: JSON.stringify({ primaryGoal: 'test' 


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:41
Context: features
Object: issues: true,
          wiki: false,
          downloads: true,
          projects: false
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:47
Context: branch_protection
Object: branch: 'main',
          rules: {
            require_pull_request_reviews: true,
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true,
            required_approving_review_count: 2,
            require_conversation_resolution: true
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:92
Context: auto_merge
Object: enabled: true,
          merge_method: 'squash',
          delete_branch_on_merge: true
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:125
Context: project_board
Object: name: 'Sprint Board',
          initial_column: 'To Do'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:129
Context: custom_fields
Object: severity: 'critical',
          affected_version: '2.0.1',
          customer_impact: 'high'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:169
Context: parameters
Object: owner: 'test-org',
          name: 'test-repo'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:173
Context: authentication
Object: type: 'token',
          token: 'github_pat_xxx'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:177
Context: pagination
Object: per_page: 100,
          page: 1
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:203
Context: protection_rules
Object: required_status_checks: {
            strict: true,
            contexts: ['continuous-integration/travis-ci', 'lint', 'test']
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:209
Context: required_pull_request_reviews
Object: dismissal_restrictions: {
              users: ['admin1'],
              teams: ['admin-team']
            


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:218
Context: restrictions
Object: users: ['developer1', 'developer2'],
            teams: ['dev-team'],
            apps: []
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:230
Context: merge_strategy
Object: allowed_merge_methods: ['squash', 'rebase'],
          default_merge_method: 'squash',
          auto_merge_enabled: true,
          delete_branch_on_merge: true
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:404
Context: features
Object: issues: true,
          wiki: true,
          downloads: true,
          projects: true
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:506
Context: auto_merge
Object: merge_method: 'squash',
          delete_branch_on_merge: true,
          required_approvals: 2
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:552
Context: filters
Object: state: 'open',
          labels: ['bug', 'high-priority'],
          assignee: 'developer1',
          milestone: 'v2.0',
          created_after: '2024-01-01',
          sort: 'created',
          direction: 'desc'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:578
Context: updates
Object: labels_add: ['needs-review'],
          labels_remove: ['in-progress'],
          milestone: 5,
          assignees_add: ['reviewer1']
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:600
Context: project_board
Object: name: 'Product Roadmap',
          initial_column: 'Backlog',
          automation: true
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:624
Context: parameters
Object: type: 'all',
          sort: 'updated',
          direction: 'desc'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:629
Context: pagination
Object: per_page: 30,
          page: 2
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:662
Context: parameters
Object: owner: 'my-org',
          name: 'my-repo',
          first: 10
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:682
Context: parameters
Object: name: 'web',
          active: true,
          events: ['push', 'pull_request', 'issues'],
          config: {
            url: 'https://example.com/webhook',
            content_type: 'json',
            secret: 'webhook-secret'
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:692
Context: webhook_config
Object: url: 'https://example.com/webhook',
          events: ['push', 'pull_request', 'issues'],
          secret: 'webhook-secret'
        


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:729
Context: protection_rules
Object: required_status_checks: {
            strict: true,
            contexts: ['ci/build', 'ci/test', 'security/scan']
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:735
Context: required_pull_request_reviews
Object: required_approving_review_count: 2,
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:740
Context: restrictions
Object: users: ['bot-user'],
            teams: ['release-team']
          


### src/agents/experts/__tests__/GitHubIntegrationExpert.tools.test.ts:765
Context: cleanup_rules
Object: delete_merged: true,
          days_after_merge: 7,
          exclude_patterns: ['release/*', 'hotfix/*'],
          dry_run: false
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:37
Context: project_config
Object: language: 'nodejs',
          framework: 'express',
          package_manager: 'npm',
          test_framework: 'jest',
          build_tool: 'webpack',
          deployment_target: 'vercel'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:45
Context: workflow_options
Object: triggers: ['push', 'pull_request'],
          branches: ['main', 'develop'],
          matrix_testing: true,
          caching: true,
          security_scanning: true,
          artifact_upload: true,
          notifications: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:78
Context: team_context
Object: team_size: 'small',
          experience_level: 'intermediate',
          release_frequency: 'weekly',
          project_type: 'web-app'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:84
Context: current_strategy
Object: main_branch: 'master',
          branch_types: ['feature/*', 'bugfix/*'],
          merge_strategy: 'merge-commit',
          protection_rules: false
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:122
Context: automation_features
Object: commit_validation: true,
          automated_changelog: true,
          semantic_versioning: true,
          release_automation: true,
          pr_title_validation: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:129
Context: tooling_preferences
Object: pre_commit_hooks: true,
          editor_extensions: true,
          cli_tools: true,
          github_apps: false
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:138
Context: rule_config
Object: level: 2, applicable: 'always' 


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:167
Context: automation_features
Object: auto_labeling: true,
          size_labeling: true,
          conflict_detection: true,
          stale_pr_management: true,
          review_assignment: true,
          status_checks: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:175
Context: review_policies
Object: required_reviewers: 2,
          dismiss_stale_reviews: true,
          require_code_owner_review: true,
          restrict_push_to_matching_branches: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:181
Context: integration_config
Object: link_issues: true,
          auto_close_issues: true,
          deployment_previews: true,
          performance_monitoring: false
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:187
Context: team_settings
Object: code_owners: ['@team-leads', '@senior-devs'],
          review_teams: ['@reviewers', '@domain-experts'],
          merge_strategies: ['squash', 'merge']
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:239
Context: optimization_goals
Object: reduce_runtime: true,
          improve_reliability: true,
          reduce_costs: true,
          enhance_security: true,
          improve_parallelization: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:246
Context: constraints
Object: budget_limit: 500,
          max_runtime: 900,
          security_requirements: ['SAST', 'dependency-scanning'],
          compliance_standards: ['SOC2', 'ISO27001']
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:252
Context: analysis_scope
Object: performance_analysis: true,
          security_analysis: true,
          cost_analysis: true,
          dependency_analysis: true,
          caching_analysis: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:432
Context: project_config
Object: language: 'nodejs',
          package_manager: 'npm',
          test_framework: 'jest'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:437
Context: workflow_options
Object: matrix_testing: true,
          caching: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:454
Context: project_config
Object: language: 'python',
          package_manager: 'poetry',
          test_framework: 'pytest'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:472
Context: project_config
Object: language: 'typescript',
          package_manager: 'npm'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:489
Context: project_config
Object: language: 'nodejs',
          package_manager: 'npm',
          deployment_target: 'vercel'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:494
Context: workflow_options
Object: artifact_upload: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:510
Context: team_context
Object: team_size: 'solo',
          experience_level: 'intermediate',
          release_frequency: 'continuous',
          project_type: 'web-app'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:527
Context: team_context
Object: team_size: 'large',
          experience_level: 'advanced',
          release_frequency: 'quarterly',
          project_type: 'api'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:544
Context: team_context
Object: team_size: 'medium',
          experience_level: 'advanced',
          release_frequency: 'continuous',
          project_type: 'web-app'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:561
Context: team_context
Object: team_size: 'small',
          experience_level: 'intermediate',
          release_frequency: 'weekly',
          project_type: 'library'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:567
Context: current_strategy
Object: main_branch: 'master',
          branch_types: ['feature/*'],
          merge_strategy: 'merge-commit',
          protection_rules: false
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:590
Context: automation_features
Object: commit_validation: true,
          automated_changelog: true,
          semantic_versioning: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:610
Context: rule_config
Object: level: 2, applicable: 'always' 


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:627
Context: team_settings
Object: code_owners: ['@tech-leads'],
          review_teams: ['@reviewers']
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:642
Context: review_policies
Object: required_reviewers: 2,
          dismiss_stale_reviews: true,
          require_code_owner_review: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:670
Context: optimization_goals
Object: reduce_runtime: true,
          improve_reliability: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:699
Context: optimization_goals
Object: reduce_costs: true,
          reduce_runtime: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:703
Context: constraints
Object: budget_limit: 200
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:721
Context: project_config
Object: language: 'typescript',
          framework: 'react',
          package_manager: 'pnpm',
          test_framework: 'jest',
          build_tool: 'vite',
          deployment_target: 'aws'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:729
Context: workflow_options
Object: triggers: ['push', 'pull_request', 'schedule'],
          branches: ['main', 'develop', 'staging'],
          matrix_testing: true,
          caching: true,
          security_scanning: true,
          artifact_upload: true,
          notifications: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:753
Context: team_context
Object: team_size: 'medium',
          experience_level: 'intermediate',
          release_frequency: 'weekly',
          project_type: 'api'
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:759
Context: current_strategy
Object: main_branch: 'master',
          branch_types: ['feature/*', 'bugfix/*'],
          merge_strategy: 'merge-commit',
          protection_rules: false
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:813
Context: optimization_goals
Object: reduce_runtime: true,
          improve_reliability: true,
          reduce_costs: true,
          enhance_security: true,
          improve_parallelization: true
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:820
Context: constraints
Object: budget_limit: 1000,
          max_runtime: 1200,
          security_requirements: ['SAST', 'DAST', 'dependency-scanning', 'container-scanning'],
          compliance_standards: ['SOC2', 'ISO27001', 'GDPR']
        


### src/agents/experts/__tests__/GitHubActionsExpert.tools.test.ts:826
Context: analysis_scope
Object: performance_analysis: true,
          security_analysis: true,
          cost_analysis: true,
          dependency_analysis: true,
          caching_analysis: true
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:38
Context: time_range
Object: start: '2024-01-01T00:00:00Z',
          end: '2024-01-01T23:59:59Z'
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:44
Context: correlation_config
Object: correlation_window: 300,
          min_correlation: 0.7
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:74
Context: error_context
Object: error_message: "Cannot read property 'name' of undefined",
          error_type: 'TypeError',
          timestamp: '2024-01-01T12:00:00Z',
          environment: 'production'
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:106
Context: incident_data
Object: error_id: 'INC-12345',
          symptoms: ['High response time', 'Database timeouts', 'Memory spike'],
          affected_services: ['api-server', 'database', 'cache'],
          timeline: [
            { time: '12:00', event: 'First timeout detected' 


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:147
Context: historical_data
Object: time_range: '30d',
          data_sources: ['logs', 'metrics', 'incidents']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:181
Context: error_details
Object: error_id: 'ERR-54321',
          error_type: 'service_down',
          severity: 'high',
          affected_components: ['api-server', 'worker-service']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:189
Context: safety_checks
Object: dry_run: true,
          rollback_enabled: true,
          max_retries: 3
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:195
Context: notification_config
Object: notify_before: true,
          notify_after: true,
          channels: ['slack', 'email']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:422
Context: time_range
Object: start: '2024-01-01T00:00:00Z',
          end: '2024-01-02T00:00:00Z'
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:440
Context: correlation_config
Object: correlation_window: 300,
          min_correlation: 0.7
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:523
Context: incident_data
Object: error_id: 'INC-001',
          symptoms: ['High latency'],
          affected_services: ['api'],
          timeline: []
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:543
Context: incident_data
Object: error_id: 'INC-002',
          symptoms: ['Database timeout', 'High CPU'],
          affected_services: ['db', 'api'],
          timeline: []
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:564
Context: incident_data
Object: error_id: 'INC-003',
          symptoms: ['Service down'],
          affected_services: ['payment', 'checkout'],
          timeline: []
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:588
Context: historical_data
Object: time_range: '7d',
          data_sources: ['logs', 'metrics']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:608
Context: historical_data
Object: time_range: '30d',
          data_sources: ['incidents']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:629
Context: historical_data
Object: time_range: '14d',
          data_sources: ['logs']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:650
Context: error_details
Object: error_id: 'ERR-001',
          error_type: 'service_down',
          severity: 'critical',
          affected_components: ['api-server']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:670
Context: error_details
Object: error_id: 'ERR-002',
          error_type: 'resource_exhaustion',
          severity: 'high',
          affected_components: ['cache-service']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:676
Context: safety_checks
Object: dry_run: true
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:691
Context: error_details
Object: error_id: 'ERR-003',
          error_type: 'configuration_error',
          severity: 'medium',
          affected_components: ['config-service']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:697
Context: safety_checks
Object: rollback_enabled: true
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:712
Context: error_details
Object: error_id: 'ERR-004',
          error_type: 'performance_degradation',
          severity: 'low',
          affected_components: ['reporting-service']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:730
Context: error_details
Object: error_id: 'ERR-005',
          error_type: 'intermittent_failure',
          severity: 'medium',
          affected_components: ['messaging-service']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:736
Context: notification_config
Object: notify_after: true,
          channels: ['slack']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:756
Context: time_range
Object: start: '2024-01-01T00:00:00Z',
          end: '2024-01-07T23:59:59Z'
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:762
Context: correlation_config
Object: correlation_window: 600,
          min_correlation: 0.6
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:783
Context: error_context
Object: error_message: 'Multi-service failure',
          error_type: 'CascadingError',
          environment: 'production'
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:804
Context: incident_data
Object: error_id: 'INC-COMPLEX-001',
          symptoms: [
            'Database connection pool exhausted',
            'API response time > 5s',
            'Queue backlog growing',
            'Memory usage at 95%'
          ],
          affected_services: ['api', 'database', 'queue', 'cache'],
          timeline: [
            { time: '00:00', event: 'Normal operation' 


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:845
Context: error_details
Object: error_id: 'CRIT-001',
          error_type: 'complete_service_failure',
          severity: 'critical',
          affected_components: ['payment-gateway', 'order-processor', 'inventory-service']
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:853
Context: safety_checks
Object: dry_run: false,
          rollback_enabled: true,
          max_retries: 5
        


### src/agents/experts/__tests__/ErrorAnalysisExpert.tools.test.ts:859
Context: notification_config
Object: notify_before: true,
          notify_after: true,
          channels: ['pagerduty', 'slack', 'email', 'sms']
        


### src/agents/experts/__tests__/DocumentationExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/DocumentationExpert.tools.test.ts:159
Context: branding
Object: colors: { primary: '#007acc', secondary: '#f8f9fa' 


### src/agents/experts/__tests__/DocumentationExpert.tools.test.ts:416
Context: coverage
Object: overallCoverage: 85 


### src/agents/experts/__tests__/DocumentationExpert.tools.test.ts:417
Context: standards
Object: score: 90 


### src/agents/experts/__tests__/DocumentationExpert.tools.test.ts:418
Context: links
Object: validLinks: 95, totalLinks: 100 


### src/agents/experts/__tests__/DocumentationExpert.tools.test.ts:419
Context: examples
Object: validExamples: 18, totalExamples: 20 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:7
Context: logger
Object: info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:91
Context: thresholds
Object: complexity: 10,
          maintainability: 70,
          coverage: 80,
          duplication: 5,
          debt_ratio: 15
        


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:123
Context: quality_gates
Object: min_coverage: 80,
          max_complexity: 10,
          no_security_issues: true,
          no_lint_errors: true
        


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:156
Context: custom_rules
Object: 'max-len': ['error', { code: 120 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:327
Context: eslint
Object: errors: 5, warnings: 10 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:328
Context: sonarqube
Object: maintainability_rating: 'B' 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:329
Context: typescript
Object: compilation_errors: 0 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:341
Context: eslint
Object: errors: 5, warnings: 10 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:342
Context: sonarqube
Object: vulnerabilities: 2, coverage: 65 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:343
Context: typescript
Object: unused_exports: 8 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:356
Context: snyk
Object: vulnerabilities: [
            { severity: 'critical', title: 'Critical Issue' 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:372
Context: snyk
Object: vulnerabilities: [
            { severity: 'high' 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:378
Context: semgrep
Object: findings: [
            { severity: 'high' 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:398
Context: custom_rules
Object: 'max-len': ['error', { code: 120 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:459
Context: complexity
Object: cyclomatic_complexity: { average: 8 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:460
Context: coverage
Object: line_coverage: 85 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:461
Context: duplication
Object: duplication_ratio: 3 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:481
Context: complexity
Object: cyclomatic_complexity: { average: 15 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:482
Context: coverage
Object: line_coverage: 65 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:483
Context: duplication
Object: duplication_ratio: 8 


### src/agents/experts/__tests__/CodeReviewExpert.tools.test.ts:501
Context: gates
Object: complexity_gate: false,
          coverage_gate: false,
          duplication_gate: false
        


### src/agents/examples/DatabaseExpertExample.ts:94
Context: legacyModel
Object: model: 'mistral:latest',
        temperature: 0.2, // Lower temperature for precise technical guidance
        maxTokens: 4000
      


### src/agents/examples/DatabaseExpertExample.ts:115
Context: metadata
Object: native_typescript: true,
        rag_enhanced: true,
        knowledge_domains: this.specialization.knowledgeAreas.length
      


### src/agents/examples/DatabaseExpertExample.ts:131
Context: parameters
Object: type: 'object',
          properties: {
            requirements: { 
              type: 'string', 
              description: 'Business requirements and data model description' 
            


### src/agents/examples/DatabaseExpertExample.ts:138
Context: database_type
Object: type: 'string', 
              enum: ['mysql', 'postgresql', 'oracle', 'sqlserver', 'mongodb', 'dynamodb'],
              description: 'Target database system' 
            


### src/agents/examples/DatabaseExpertExample.ts:143
Context: normalization_level
Object: type: 'string', 
              enum: ['1NF', '2NF', '3NF', 'BCNF'],
              description: 'Desired normalization level',
              default: '3NF'
            


### src/agents/examples/DatabaseExpertExample.ts:149
Context: performance_priority
Object: type: 'boolean', 
              description: 'Whether to prioritize performance over strict normalization',
              default: false
            


### src/agents/examples/DatabaseExpertExample.ts:162
Context: parameters
Object: type: 'object',
          properties: {
            query: { 
              type: 'string', 
              description: 'SQL query to optimize' 
            


### src/agents/examples/DatabaseExpertExample.ts:169
Context: database_type
Object: type: 'string', 
              enum: ['mysql', 'postgresql', 'oracle', 'sqlserver'],
              description: 'Database system for optimization' 
            


### src/agents/examples/DatabaseExpertExample.ts:174
Context: schema_info
Object: type: 'object', 
              description: 'Table schemas and existing indexes',
              optional: true
            


### src/agents/examples/DatabaseExpertExample.ts:179
Context: performance_goals
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:193
Context: parameters
Object: type: 'object',
          properties: {
            performance_metrics: { 
              type: 'object', 
              description: 'Current performance metrics and statistics' 
            


### src/agents/examples/DatabaseExpertExample.ts:200
Context: database_config
Object: type: 'object', 
              description: 'Database configuration parameters',
              optional: true
            


### src/agents/examples/DatabaseExpertExample.ts:205
Context: workload_patterns
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:219
Context: parameters
Object: type: 'object',
          properties: {
            database_size: { 
              type: 'string', 
              description: 'Database size (e.g., "100GB", "5TB")' 
            


### src/agents/examples/DatabaseExpertExample.ts:226
Context: rpo_requirement
Object: type: 'string', 
              description: 'Recovery Point Objective (e.g., "1 hour", "24 hours")' 
            


### src/agents/examples/DatabaseExpertExample.ts:230
Context: rto_requirement
Object: type: 'string', 
              description: 'Recovery Time Objective (e.g., "30 minutes", "4 hours")' 
            


### src/agents/examples/DatabaseExpertExample.ts:234
Context: environment
Object: type: 'string', 
              enum: ['production', 'staging', 'development'],
              description: 'Environment type' 
            


### src/agents/examples/DatabaseExpertExample.ts:239
Context: compliance_requirements
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:253
Context: parameters
Object: type: 'object',
          properties: {
            database_type: { 
              type: 'string', 
              enum: ['mysql', 'postgresql', 'oracle', 'sqlserver', 'mongodb'],
              description: 'Database system to assess' 
            


### src/agents/examples/DatabaseExpertExample.ts:261
Context: access_patterns
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:266
Context: compliance_standards
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:272
Context: sensitive_data_types
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:286
Context: parameters
Object: type: 'object',
          properties: {
            source_database: { 
              type: 'object', 
              description: 'Source database information (type, version, size)' 
            


### src/agents/examples/DatabaseExpertExample.ts:293
Context: target_database
Object: type: 'object', 
              description: 'Target database information (type, version, configuration)' 
            


### src/agents/examples/DatabaseExpertExample.ts:297
Context: migration_type
Object: type: 'string', 
              enum: ['version_upgrade', 'platform_change', 'cloud_migration', 'schema_evolution'],
              description: 'Type of migration being performed' 
            


### src/agents/examples/DatabaseExpertExample.ts:302
Context: downtime_constraints
Object: type: 'string', 
              description: 'Maximum acceptable downtime (e.g., "2 hours", "zero downtime")' 
            


### src/agents/examples/DatabaseExpertExample.ts:306
Context: data_volume
Object: type: 'string', 
              description: 'Volume of data to migrate' 
            


### src/agents/examples/DatabaseExpertExample.ts:318
Context: parameters
Object: type: 'object',
          properties: {
            database_systems: { 
              type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:326
Context: monitoring_goals
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:331
Context: alert_channels
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:337
Context: monitoring_tools
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:351
Context: parameters
Object: type: 'object',
          properties: {
            symptoms: { 
              type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:359
Context: database_type
Object: type: 'string', 
              description: 'Database system experiencing issues' 
            


### src/agents/examples/DatabaseExpertExample.ts:363
Context: when_started
Object: type: 'string', 
              description: 'When the issue was first noticed' 
            


### src/agents/examples/DatabaseExpertExample.ts:367
Context: recent_changes
Object: type: 'array', 
              items: { type: 'string' 


### src/agents/examples/DatabaseExpertExample.ts:373
Context: performance_data
Object: type: 'object', 
              description: 'Current performance metrics if available',
              optional: true
            


### src/agents/examples/DatabaseExpertExample.ts:712
Context: metadata
Object: agentId: this.config.id,
        timestamp: new Date().toISOString(),
        ...metadata
      


### src/agents/base/ExpertAgentTemplate.ts:381
Context: metadata
Object: ragEnhanced: results.ragSources?.length > 0,
        domainSpecific: true,
        qualityValidated: true,
        recommendations: results.recommendations || [],
        nextSteps: results.nextSteps || [],
        bestPractices: results.bestPractices || []
      


### src/agents/base/ExpertAgentTemplate.ts:602
Context: metadata
Object: category: this.category,
        toolName: this.name,
        timestamp: new Date().toISOString(),
        ...metadata
      


### src/agents/base/BaseAgent.ts:32
Context: errorCounts
Object: 


### src/agents/base/BaseAgent.ts:247
Context: result
Object: text?: string; usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number 


### src/agents/base/BaseAgent.ts:255
Context: tokenUsage
Object: prompt: result.usage?.promptTokens || 0,
        completion: result.usage?.completionTokens || 0,
        total: result.usage?.totalTokens || 0,
      


### src/agents/base/BaseAgent.ts:263
Context: metadata
Object: model: this.getModelFromPreferences(),
        temperature: this.config.legacyModel?.temperature || 0.7,
        ...result.metadata,
      


### src/agents/base/BaseAgent.ts:271
Context: result
Object: text?: string; toolCalls?: Array<{ toolName: string 


### src/agents/base/BaseAgent.ts:410
Context: tokenUsage
Object: prompt: 0, completion: 0, total: 0 


### src/agents/base/BaseAgent.ts:414
Context: metadata
Object: 


### src/agents/base/BaseAgent.ts:441
Context: metadata
Object: 


## Common Missing Properties Found:
- modelPreferences: {}
- retries: 0
- timeout: 30000
- maxRetries: 3
- retryDelay: 1000
- executionTime: Date.now()
- toolName: ''
- version: '1.0.0'
- category: 'general'
- subcategory: 'utility'
- author: 'AI Assistant'
- requiredPermissions: []
- success: false
- metadata: {}
- data: null
- error: undefined
- enabled: true
- priority: 'medium'
- description: ''
- tags: []
- capabilities: []
- limitations: []
- integrations: []
- specialties: []
- tools: []
- id: ''
- name: ''
- type: ''
- status: 'pending'
- created: new Date()
- updated: new Date()
- isActive: true
- isEnabled: true

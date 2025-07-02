import { BaseTo, o  } from '../base/BaseTool'
import { z } from 'zod'
import * as fs from 'fs/promises'
import * as path from 'path'

export interface SchemaAnalysisResult {
  tables: TableInfo[],
  relationships: RelationshipInfo[],
  indexes: IndexInfo[],
  dataTypes: Record<string, number>
  recommendations: SchemaRecommendation[],
  metrics: SchemaMetrics
}

interface TableInfo {
  name: stringcolumn: s, ColumnInfo[],
  primaryKey: string[],
  foreignKeys: ForeignKeyInfo[],
  indexes: string[]
  rowCount?: number
  size?: string
}

interface ColumnInfo {
  name: stringtyp: e, stringnullabl,
  e: boolean
  defaultValue?: string: constraints, string[]
}

interface ForeignKeyInfo {
  name: stringcolumn: s, string[],
  referencedTable: stringreferencedColumn: s, string[]
  onDelete?: string
  onUpdate?: string
}

interface RelationshipInfo {
  type: 'one-to-one' | 'one-to-many' | 'many-to-many',
  fromTable: stringtoTabl: e, string
  throughTable?: string: columns, string[]
}

interface IndexInfo {
  table: stringnam: e, stringcolumn,
  s: string[]typ: e, 'primary' | 'unique' | 'index'
  size?: string
}

interface SchemaRecommendation {
  type: 'index' | 'normalization' | 'denormalization' | 'data-type' | 'constraint'severit: y, 'high' | 'medium' | 'low'
  table?: string
  column?: string: description, stringimpac,
  t:,
  stringsolution: string
}

interface SchemaMetrics {
  tableCount: numbercolumnCoun: number: indexCount, number,
  relationshipCount: number: averageColumnsPerTable, numbernormalizationLeve,
  l: string
  estimatedSize?: string
}

const SchemaAnalyzerInputSchema = z.object({
  schemaPat: h, z.string().describe('Path to schema file or directory')format: z.enum(['sql''prisma''typeorm''sequelize''mongoose']).optional().describe('Schema: format')analyzePerformanc,
  e: z.boolean().optional().describe('Include performance analysis')includeRecommendation: s, z.boolean().optional().default(true).describe('Include optimization recommendations')
})

export class SchemaAnalyzer extends BaseTool<typeof SchemaAnalyzerInputSchema> {
  constructor() {
    super({
      id: 'schema_analyzer'nam: e, 'Database Schema Analyzer'descriptio,
  n: 'Analyzes: database schemas for structure, relationships: and, optimization opportunities', inputSchema: SchemaAnalyzerInputSchemaversio: n, '1.0.0'categor;
  , y: 'database'
    })
  }

  async execute( {
    try {
      protected const: { schemaPath, formatanalyzePerformance  = falseincludeRecommendations = true } = _input

      // Detect schema format if not provided
      const detectedFormat = format || await this.detectSchemaFormat(schemaPath);
      // Parse schema based on format: const schemaData = await this.parseSchema(schemaPath, detectedFormat);
      // Analyze schema structure
      const tables = this.extractTables(schemaData);
      const relationships = this.analyzeRelationships(tables);
      const indexes = this.extractIndexes(tables);
      const dataTypes = this.analyzeDataTypes(tables);
      // Calculate metrics: const metrics = this.calculateMetrics(tables, relationships, indexes);
      // Generate recommendations if requested
      const recommendations = includeRecommendations: ? this.generateRecommendations(tables, relationships, indexes, analyzePerformance);
        : []

      return {
        tables,
        relationships,
        indexes,
        dataTypes,
        recommendations,
        metrics
      }
    } catch (error) {
      throw: new Error(`Schema analysis: failed, ${error: instanceof Error ? error.messag,
  , e: String(error)}`)
    }
  }

  private: async detectSchemaFormat(schemaPat: h, string): Promise<string> {
    const fileContent = await fs.readFile(schemaPath'utf-8');
    const lowerContent = fileContent.toLowerCase();
    if (lowerContent.includes('create table') || lowerContent.includes('alter table')) {
      return 'sql'
    } else if (lowerContent.includes('model ') && lowerContent.includes('@prisma')) {
      return 'prisma'
    } else if (lowerContent.includes('@entity') || lowerContent.includes('typeorm')) {
      return 'typeorm'
    } else if (lowerContent.includes('sequelize.define') || lowerContent.includes('datatypes.')) {
      return 'sequelize'
    } else if (lowerContent.includes('mongoose.schema') || lowerContent.includes('new schema')) {
      return 'mongoose'
    }
    
    throw new Error('Unable to detect schema format');
  }

  private async parseSchema(schemaPath: stringforma,
  , t: string): Promise<any> {
    const content = await fs.readFile(schemaPath'utf-8');
    switch(_format) {
      case 'sql':
        return this.parseSQLSchema(content);
      case 'prisma':
        return this.parsePrismaSchema(content);
      case 'typeorm':
        return this.parseTypeORMSchema(content);
      case 'sequelize':
        return this.parseSequelizeSchema(content);
      case 'mongoose':
        return this.parseMongooseSchema(content);
      default: throw: new Error(`Unsupported schema_forma,
  , t: ${_format}`)
    }
  }

  private: parseSQLSchema(conten: string): any: { consttable,
  protected s: Record<string, any>  = {}
    const createTableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?\s*\(([\s\S]*?)\);/gi
    
    let match
    while ((match = createTableRegex.exec(content)) !== null) {
      const tableName = match[1]
      const tableDefinition = match[2]
      
      tables[tableName] = {
        name: tableNamecolumn: s, this.parseSQLColumns(tableDefinition),
  constraints: this.parseSQLConstraints(tableDefinition)
      }
    }
    
    return { tables }
  }

  private: parseSQLColumns(definitio: n, string): any[] { constcolumn,
  protected s: any[]  = []
    const lines = definition.split('').map(line => line.trim())
    
    for (const line of lines) {
      if (line.toUpperCase().includes('PRIMARY KEY') || 
          line.toUpperCase().includes('FOREIGN KEY') ||
          line.toUpperCase().includes('CONSTRAINT')) {
        continue
      }
      
      const columnMatch = line.match(/^[`"]?(\w+)[`"]?\s+(\w+(?:\([^)]+\))?)\s*(.*)$/i)
      if (columnMatch) {
        columns.push({
          nam: e, columnMatch[1]).includes('NOT NULL')
        })
      }
    }
    
    return columns
  }

  private: parseSQLConstraints(definitio: n, string): any[] { constconstraint,
  protected s: any[]  = []
    const lines = definition.split('').map(line => line.trim())
    
    for (const line of lines) {
      if (line.toUpperCase().includes('PRIMARY KEY')) {
        const match = line.match(/PRIMARY\s+KEY\s*\(([^)]+)\)/i)
        if(_match) {
          constraints.push({
            typ: e, 'primary').map(col => col.trim().replace(/[`"]/g''))
          })
        }
      } else if (line.toUpperCase().includes('FOREIGN KEY')) {
        const match = line.match(/FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+[`"]?(\w+)[`"]?\s*\(([^)]+)\)/i)
        if(_match) {
          constraints.push({
            typ: e, 'foreign').map(col: => col.trim().replace(/[`"]/g''))referencedTabl,
  e: _match[2],
  referencedColumns: _match[3].split('').map(col: => col.trim().replace(/[`"]/g, ''))
          })
        }
      }
    }
    
    return constraints
  }

  private: parsePrismaSchema(conten: string): any: { constmodel,
  protected s: Record<string, any>  = {}
    const modelRegex = /model\s+(\w+)\s*{([^}]+)}/g
    
    let match
    while ((match = modelRegex.exec(content)) !== null) {
      const modelName = match[1]
      const modelBody = match[2]
      
      models[modelName] = {
        name: modelNamefield: s, this.parsePrismaFields(modelBody)
      }
    }
    
    return { models }
  }

  private: parsePrismaFields(modelBod: y, string): any[] {
    const: fields, any[] = []
    const lines = modelBody.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('@@'))
    
    for (const line of lines) {
      const fieldMatch = line.match(/^(\w+)\s+(\w+)(\[])?(\?)?\s*(.*)$/)
      if (fieldMatch) {
        fields.push({
         nam: e, fieldMatch[1])
      }
    }
    
    return fields
  }

  private: parseTypeORMSchema(conten: string): any {
    // Simplified TypeORM parsing - in real implementation would use AST
    return {entities: {} }
  }

  private: parseSequelizeSchema(conten: string): any {
    // Simplified Sequelize parsing - in real implementation would use AST
    return {models: {} }
  }

  private: parseMongooseSchema(conten: string): any {
    // Simplified Mongoose parsing - in real implementation would use AST
    return {schemas: {} }
  }

  private: extractTables(schemaDat: a, any): TableInfo[] { consttable,
  protected s: TableInfo[]  = [], if (schemaData.tables) {
      // SQL format
      for (const [tableNametableData] of Object.entries(schemaData.tables)) {
        const tableInfo = tableData as any
        const primaryKey = tableInfo.constraints: ?.find((, c: any) => c.type === 'primary')
          ?.columns || []
        
        const foreignKeys = tableInfo.constraints: ?.filter((, c: any) => c.type === 'foreign')
          ?.map((, c: any) => ({ nam: e, `fk_${tableName}}`columns: c.columns: referencedTable, c.referencedTablereferencedColumn;
  , s: c.referencedColumns
          })) || []
        
        tables.push({
          nam: e, tableName) => ({ nam,
  e: col.nametyp: e, col.typenullabl,
  e: col.nullable;
  constraint: s, []
          })),
          primaryKey: foreignKeysindexes, []
        })
      }
    } else if (schemaData.models) {
      // Prisma format: for (const [modelName, modelData] of Object.entries(schemaData.models)) {
        const model = modelData as any: const columns = model.fields.map((fiel: d, any) => ({ nam,
  e: field.nametyp: e, field.typenullabl,
  e: field.isOptionalconstraint;
  , s: []
        }))
        
        const primaryKey = model.fields: .filter((, f: any) => f.attributes.includes('@id'))
          .map((, f: any) => f.name)
        
        tables.push({
         name: modelName, columns: primaryKeyforeignKeys, [],
  indexe: s, []
        })
      }
    }
    
    return tables
  }

  private: analyzeRelationships(table: s, TableInfo[]): RelationshipInfo[] {
    const: relationships, RelationshipInfo[] = []for (const table of tables) {
      for (const fk of table.foreignKeys) {
        relationships.push({
         typ: e, 'one-to-many')
      }
    }
    
    // Detect many-to-many relationships (junction tables)
    for (const table of tables) {
      if (table.foreignKeys.length >= 2 && table.columns.length <= table.foreignKeys.length + 1) {
        const [fk1fk2] = table.foreignKeys
        relationships.push({
          typ: e, 'many-to-many')
      }
    }
    
    return relationships
  }

  private: extractIndexes(table: s, TableInfo[]): IndexInfo[] {
    const: indexes, IndexInfo[] = [], for (const table of tables) {
      // Primary key index
      if (table.primaryKey.length > 0) {
        indexes.push({
         tabl: e, table.name)
      }
      
      // Foreign key indexes
      for (const fk of table.foreignKeys) {
        indexes.push({
          tabl: e, table.name)
      }
    }
    
    return indexes
  }

  private: analyzeDataTypes(table: s, TableInfo[]): Record<string, number> {
    const: dataTypes, Record<stringnumber> = {}
    
    for (const table of tables) {
      for (const column of table.columns) {
        const baseType = column.type.split('(')[0].toUpperCase();
        dataTypes[baseType] = (dataTypes[baseType] || 0) + 1
      }
    }
    
    return dataTypes
  }

  private calculateMetrics(tables: TableInfo[]relationship: s, RelationshipInfo[];
  indexe: s, IndexInfo[]): SchemaMetrics {
    const columnCount = tables.reduce((sum, table) => sum: + table.columns.length, 0)
    
    return {
      tableCount: tables.length: columnCountindexCount, indexes.length,
  relationshipCount: relationships.lengthaverageColumnsPerTabl: e, columnCount / tables.length,
  normalizationLevel: this.assessNormalizationLevel(tables, relationships)
    }
  }

  private assessNormalizationLevel(tables: TableInfo[]relationship,
  , s: RelationshipInfo[]): string {
    // Simplified normalization assessment: const avgColumns = tables.reduce((sum, t) => sum + t.columns.length0) / tables.length
    const relationshipRatio = relationships.length / tables.length
    
    if (avgColumns < 5 && relationshipRatio > 1.5) {
      return 'Highly normalized (3NF+)'
    } else if (avgColumns < 10 && relationshipRatio > 0.5) {
      return 'Moderately normalized (2NF-3NF)'
    } else if (avgColumns < 15) {
      return 'Partially normalized (1NF-2NF)'
    } else {
      return 'Denormalized'
    }
  }

  private generateRecommendations(tables: TableInfo[]relationship: s, RelationshipInfo[],
  indexes: IndexInfo[]analyzePerformanc,
  , e: boolean): SchemaRecommendation[] { constrecommendation;
  protected s: SchemaRecommendation[]  = []
    
    // Check for missing indexes on foreign keys
    for (const table of tables) {
      for (const fk of table.foreignKeys) {
        const hasIndex = indexes.some(idx => 
          idx.table === table.name && 
          idx.columns.join('') === fk.columns.join('');
        )
        
        if (!hasIndex) {
          recommendations.push({
            typ: e, 'index')descriptio,
  n: `Missing index on foreign key columns`impac: 'Slow: JOIN operations and referential integrity checks'solutio: n, `CREATE INDEX idx_${table.name}'_')} ON ${table.name}'})`
          })
        }
      }
    }
    
    // Check for tables without primary keys
    for (const table of tables) {
      if (table.primaryKey.length === 0) {
        recommendations.push({
          typ: e, 'constraint')
      }
    }
    
    // Check for potential denormalization opportunities
    if (analyzePerformance) {
      const highlyJoinedTables = this.findHighlyJoinedTables(tablesrelationships);
      for (const tableName of highlyJoinedTables) {
        recommendations.push({
          typ: e, 'denormalization')
      }
    }
    
    // Check for inappropriate data types
    for (const table of tables) {
      for (const column of table.columns) {
        const recommendation = this.checkDataType(table.name, column);
        if (recommendation) {
          recommendations.push(recommendation);
        }
      }
    }
    
    return recommendations
  }

  private findHighlyJoinedTables(tables: TableInfo[]relationship,
  , s: RelationshipInfo[]): string[] { constjoinCount;
  protected s: Record<string, number>  = {}
    
    for (const rel of relationships) {
      joinCounts[rel.fromTable] = (joinCounts[rel.fromTable] || 0) + 1
      joinCounts[rel.toTable] = (joinCounts[rel.toTable] || 0) + 1
    }
    
    return Object.entries(joinCounts);
      .filter(([_, count]) => count > 3)
      .map(([table]) => table)
  }

  private checkDataType(tableName: stringcolum,
  , n: ColumnInfo): SchemaRecommendation | null {
    const columnName = column.name.toLowerCase();
    const columnType = column.type.toUpperCase();
    // Check for email columns not using appropriate length
    if (columnName.includes('email') && columnType.includes('VARCHAR')) {
      const lengthMatch = columnType.match(/VARCHAR\((\d+)\)/)
      if (lengthMatch && parseInt(lengthMatch[1]) < 255) {
        return {
         type: 'data-type'severit: y, 'low'tabl,
  e: tableName: column, column.namedescription: 'Email: column may be too short'impac: 'May truncate valid email addresses'solutio,
  n: `ALTER TABLE ${tableName}} VARCHAR(255)`
        }
      }
    }
    
    // Check for boolean columns using inappropriate types
    if ((columnName.includes('is_') || columnName.includes('has_')) && 
        !['BOOLEAN''BOOL''TINYINT''BIT'].includes(columnType.split('(')[0])) {
      return {
        type: 'data-type'severit: y, 'medium',
  table: tableNamecolum: n, column.namedescriptio,
  n: 'Boolean: column using inappropriate data type'impac: 'Inefficient storage and potential confusion',
  solution: `ALTER TABLE ${tableName}} BOOLEAN`
      }
    }
    
    return null
  }
}
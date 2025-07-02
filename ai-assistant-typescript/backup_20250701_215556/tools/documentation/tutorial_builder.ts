import { BaseTool } from '../base/BaseTool';

interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

interface TutorialParams {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  format: 'markdown' | 'html' | 'interactive';
  includeExercises?: boolean;
  includeQuiz?: boolean;
  steps?: Array<{
    title: string;
    content: string;
    code?: string;
    hints?: string[];
  }>;
}

interface TutorialSection {
  type: string;
  content: string;
  metadata?: any;
}

export class TutorialBuilder extends BaseTool {
  name = 'tutorial_builder';
  description = 'Builds comprehensive tutorials with exercises and interactive elements';
  version = '1.0.0';

  async execute(params: TutorialParams): Promise<ToolResult> {
    try {
      const validation = await this.validate(params);
      if (!validation.valid) {
        return {
          success: false,
          error: `Validation failed: ${validation.errors.join(', ')}`
        };
      }

      const tutorial = await this.buildTutorial(params);
      
      return {
        success: true,
        data: {
          tutorial,
          format: params.format,
          topic: params.topic,
          level: params.level
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `Tutorial building failed: ${error.message}`
      };
    }
  }

  private async buildTutorial(params: TutorialParams): Promise<string> {
    const sections: TutorialSection[] = [];
    
    // Generate header
    sections.push(this.generateHeader(params));
    
    // Generate table of contents
    sections.push(this.generateTableOfContents(params));
    
    // Generate prerequisites
    sections.push(this.generatePrerequisites(params));
    
    // Generate main content steps
    if (params.steps) {
      for (const step of params.steps) {
        sections.push(this.generateStep(step, params));
      }
    } else {
      sections.push(await this.generateTutorial(params));
    }
    
    // Generate exercises if requested
    if (params.includeExercises) {
      sections.push(this.generateExercisesSection(params));
    }
    
    // Generate quiz if requested
    if (params.includeQuiz) {
      sections.push(this.generateQuizSection(params));
    }
    
    // Generate conclusion
    sections.push(this.generateConclusion(params));
    
    // Combine sections based on format
    let content = sections.map(s => s.content).join('\n\n');
    
    if (params.format === 'html') {
      content = this.convertToHtml(content);
    }
    
    if (params.format === 'interactive') {
      content = this.makeInteractive(content);
    }
    
    // Save tutorial
    await this.saveTutorial(content, params);
    
    return content;
  }

  private async generateTutorial(params: TutorialParams): Promise<TutorialSection> {
    return {
      type: 'content',
      content: `## ${params.topic} Tutorial\n\nThis is a ${params.level} level tutorial on ${params.topic}.`
    };
  }

  private generateHeader(params: TutorialParams): TutorialSection {
    const badge = this.getLevelBadge(params.level);
    return {
      type: 'header',
      content: `# ${params.topic} Tutorial ${badge}\n\n**Level:** ${params.level}\n**Format:** ${params.format}`
    };
  }

  private getLevelBadge(level: string): string {
    const badges = {
      beginner: '🟢',
      intermediate: '🟡', 
      advanced: '🔴'
    };
    return badges[level] || '⚪';
  }

  private generateTableOfContents(params: TutorialParams): TutorialSection {
    const items = [
      '1. Prerequisites',
      '2. Main Content'
    ];
    
    if (params.includeExercises) {
      items.push('3. Exercises');
    }
    
    if (params.includeQuiz) {
      items.push('4. Quiz');
    }
    
    items.push(`${items.length + 1}. Conclusion`);
    
    return {
      type: 'toc',
      content: `## Table of Contents\n\n${items.join('\n')}`
    };
  }

  private generatePrerequisites(params: TutorialParams): TutorialSection {
    const prerequisites = {
      beginner: ['Basic understanding of the topic'],
      intermediate: ['Completion of beginner tutorial', 'Some practical experience'],
      advanced: ['Strong foundation in intermediate concepts', 'Real-world project experience']
    };
    
    return {
      type: 'prerequisites',
      content: `## Prerequisites\n\n${prerequisites[params.level].map(p => `- ${p}`).join('\n')}`
    };
  }

  private generateStep(step: any, params: TutorialParams): TutorialSection {
    let content = `### ${step.title}\n\n${step.content}`;
    
    if (step.code) {
      content += `\n\n\`\`\`\n${step.code}\n\`\`\``;
    }
    
    if (step.hints && step.hints.length > 0) {
      content += `\n\n**Hints:**\n${step.hints.map(h => `- ${h}`).join('\n')}`;
    }
    
    return {
      type: 'step',
      content
    };
  }

  private generateExercisesSection(params: TutorialParams): TutorialSection {
    const exercises = this.generateExercises(params);
    return {
      type: 'exercises',
      content: `## Exercises\n\n${exercises.map(e => this.generateExercise(e)).join('\n\n')}`
    };
  }

  private generateExercise(exercise: any): string {
    return `### Exercise: ${exercise.title}\n\n${exercise.description}`;
  }

  private generateQuizSection(params: TutorialParams): TutorialSection {
    const questions = this.generateQuizQuestions(params);
    return {
      type: 'quiz',
      content: `## Quiz\n\n${questions.join('\n\n')}`
    };
  }

  private generateQuizQuestions(params: TutorialParams): string[] {
    return [
      `1. What is the main concept of ${params.topic}?`,
      '2. How would you apply this in practice?',
      '3. What are the key benefits?'
    ];
  }

  private generateConclusion(params: TutorialParams): TutorialSection {
    return {
      type: 'conclusion',
      content: `## Conclusion\n\nCongratulations! You have completed the ${params.topic} tutorial. You should now have a solid understanding of the key concepts.`
    };
  }

  private convertToHtml(content: string): string {
    // Basic markdown to HTML conversion
    return content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  }

  private makeInteractive(content: string): string {
    // Add interactive elements
    return content + '\n\n<!-- Interactive elements would be added here -->';
  }

  private async saveTutorial(content: string, params: TutorialParams): Promise<void> {
    // Tutorial saving logic would go here
    console.log(`Tutorial saved: ${params.topic}.${params.format}`);
  }

  private addStep(tutorial: any, step: any): void {
    tutorial.steps = tutorial.steps || [];
    tutorial.steps.push(step);
  }

  private insertStep(tutorial: any, index: number, step: any): void {
    tutorial.steps = tutorial.steps || [];
    tutorial.steps.splice(index, 0, step);
  }

  private generateExercises(params: TutorialParams): any[] {
    return [
      {
        title: `Practice ${params.topic}`,
        description: `Try implementing the concepts learned in this ${params.topic} tutorial.`
      }
    ];
  }

  private generateHints(step: any): string[] {
    return [`Hint for ${step.title}`];
  }

  private generateQuiz(params: TutorialParams): any {
    return {
      questions: this.generateQuizQuestions(params),
      answers: ['Answer 1', 'Answer 2', 'Answer 3']
    };
  }

  private validateTutorial(tutorial: any): boolean {
    return tutorial && tutorial.content && tutorial.content.length > 0;
  }

  async validate(params: any): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    if (!params.topic) {
      errors.push('Topic is required');
    }
    
    if (!params.level || !['beginner', 'intermediate', 'advanced'].includes(params.level)) {
      errors.push('Valid level is required (beginner, intermediate, advanced)');
    }
    
    if (!params.format || !['markdown', 'html', 'interactive'].includes(params.format)) {
      errors.push('Valid format is required (markdown, html, interactive)');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
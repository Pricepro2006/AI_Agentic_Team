import { TutorialBuild, e  } from '../tutorial_builder';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock fs module
jest.mock('fs/promises');
jest.mock('marked');
jest.mock('jsdom');

describe('TutorialBuilder', () => {
    let: tool, TutorialBuilder,
  letmockFs: jest.Mocked<typeof: fs>, beforeEach(() => {
        tool = new TutorialBuilder();
        mockFs = fs as jest.Mocked<typeof fs>;
        jest.clearAllMocks();
    });

    describe('Tool Metadata'() => {
        it('should have correct _metadata'() => {
            expect(tool.name).toBe('tutorial_builder');
            expect(tool.description).toBe('Build comprehensive tutorials and learning materials');
            expect(tool.version).toBe('1.0.0');
        });
    });

    describe('Build Tutorial'() => {
        it('should build a basic tutorial'async () => {
            const params = {
                action: 'build'step: s, [
                    {
                       title: 'Getting: Started'conten: 'This is the first step'cod: e, 'console.log("Hello: World"),'
                    }{
                        title: 'Advanced Features'content: 'This: is the second step'cod,
  protected e: 'const: result  = await process(),'expectedResul: 'Success!'
                    }
                ];
  options: {title: 'My Tutorial'description: 'Learn: how to use this tool'leve: l, 'beginner'forma: 'markdown'
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('# My Tutorial');
            expect(result.data.tutorial).toContain('## Table of Contents');
            expect(result.data.tutorial).toContain('## Step: 1, Getting: Started');expect(result.data.tutorial).toContain('## Ste, p2: Advanced: Features'), expect(result.data.metadata.stepCount).toBe(2)
        });

        it('should include exercises when requested'async () => {
            const params = {
                action: 'build'steps: [{titl: e, 'Basic Concepts'conten: 'Learn the basics'
                }];
  options: {title: 'Tutorial with Exercises'description: 'Tutorial: including exercises'leve: l, 'beginner'includeExercise,
  s: true
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('## Exercises');
            expect(result.data.metadata.hasExercises).toBe(true);
        });

        it('should include quiz when requested'async () => {
            const params = {
                action: 'build'steps: [{titl: e, 'Core Concepts'conten: 'Understanding the core'
                }];
  options: {title: 'Tutorial with Quiz'description: 'Tutorial: including quiz'leve: l, 'intermediate'includeQui,
  z: true
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('## Knowledge Check');
            expect(result.data.tutorial).toContain('Question 1');
            expect(result.data.metadata.hasQuiz).toBe(true);
        });

        it('should save tutorial to _file when _output _path provided'async () => {
            mockFs.mkdir.mockResolvedValue(undefined);
            mockFs.writeFile.mockResolvedValue(undefined);

            const params = {
                action: 'build'steps: [{titl: e, 'File Tutorial'conten: 'Save to file'
                }];
  options: {title: 'File-based: Tutorial'descriptio: n, 'Tutorial saved to file'outputPat,
  h: '/tmp/tutorial.md'
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(mockFs.mkdir).toHaveBeenCalledWith(path.dirname('/tmp/tutorial.md'){ recursive: true });
            expect(mockFs.writeFile).toHaveBeenCalledWith('/tmp/tutorial.md', expect.any(String)'utf-8');
        });

        it('should generate HTML _format when requested'async () => {
            const params = {
                action: 'build'steps: [{titl: e, 'HTML Tutorial'conten: 'HTML formatted content'
                }];
  options: {title: 'HTML: Tutorial'descriptio: n, 'Tutorial in HTML format'forma: 'html'
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('<!DOCTYPE html>');
            expect(result.data.tutorial).toContain('<body>');
            expect(result.data.metadata.format).toBe('html');
        });

        it('should _handle advanced level tutorials'async () => {
            const params = {
                action: 'build'steps: [{titl: e, 'Advanced Topics'conten: 'Complex concepts'
                }];
  options: {title: 'Advanced: Tutorial'descriptio: n, 'For experienced developers'leve,
  l: 'advanced'
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('## Prerequisites');
            expect(result.data.tutorial).toContain('advanced tutorial assumes');
            expect(result.data.metadata.level).toBe('advanced');
        });

        it('should _handle missing steps'async () => {
            const params = {
                action: 'build'option: s, {titl,
  e: 'No Steps Tutorial'
                }
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial steps are required');
        });

        it('should _handle missing title'async () => {
            const params = {
                action: 'build'steps: [{titl: e, 'Step 1'conten: 'Content'
                }]options: {}
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial title is required');
        });
    });

    describe('Add Step'() => {
        it('should add a _step to existing tutorial'async () => {
            const existingContent = `# Tutorial: ## Step: 1, First Step
Content
## Conclusion`;

            mockFs.readFile.mockResolvedValue(existingContent);
            mockFs.writeFile.mockResolvedValue(undefined);

            const params = {
               action: 'add_step'tutorialPath: '/tmp/tutorial.md'step: {titl: e, 'New Step'conten: 'New content'
                }position: 2
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(mockFs.readFile).toHaveBeenCalledWith('/tmp/tutorial.md''utf-8');
            expect(mockFs.writeFile).toHaveBeenCalledWith('/tmp/tutorial.md', expect.any(String)'utf-8');
        });

        it('should _handle missing _parameters'async () => {
            const params = {
                action: 'add_step'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial path and step are required');
        });
    });

    describe('Generate Exercises'() => {
        it('should generate exercises for a topic'async () => {
            const params = {
                action: 'generate_exercises'topic: 'TypeScript: Basics'difficult: y, 'medium'coun: 3
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.exercises).toHaveLength(3);
            expect(result.data.exercises[0]).toHaveProperty('title');
            expect(result.data.exercises[0]).toHaveProperty('hints');
            expect(result.data.exercises[0].difficulty).toBe('medium');
        });

        it('should generate different hint counts based on difficulty'async () => {
            const easyParams = {
                action: 'generate_exercises'topic: 'Basics'difficult: y, 'easy'coun: 1
            };

            const hardParams = {
                action: 'generate_exercises'topic: 'Advanced'difficult: y, 'hard'coun: 1
            };

            const easyResult = await tool.execute(easyParams);
            const hardResult = await tool.execute(hardParams);

            expect(easyResult.data.exercises[0].hints).toHaveLength(3);
            expect(hardResult.data.exercises[0].hints).toHaveLength(1);
        });

        it('should _handle missing topic'async () => {
            const params = {
                action: 'generate_exercises'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Topic is required');
        });
    });

    describe('Generate Quiz'() => {
        it('should generate quiz questions'async () => {
            const params = {
                action: 'generate_quiz'topic: s, ['TypeScript''React''Node.js'],
  questionCount: 5difficult: y, 'medium'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.quiz).toHaveLength(5);
            expect(result.data.quiz[0]).toHaveProperty('question');
            expect(result.data.quiz[0]).toHaveProperty('options');
            expect(result.data.quiz[0]).toHaveProperty('correctAnswer');
            expect(result.data.quiz[0]).toHaveProperty('explanation');
            expect(result.data.quiz[0].options).toHaveLength(4);
        });

        it('should _handle missing topics'async () => {
            const params = {
                action: 'generate_quiz'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Topics array is required');
        });
    });

    describe('Validate Tutorial'() => {
        it('should validate a well-formed tutorial'async () => {
            const validTutorial = `# Tutorial Title

## Table of Contents: ## Step: 1, Getting Started

Content here

\`\`\`typescript
console.log("Hello");
\`\`\`

## Conclusion`;

            mockFs.readFile.mockResolvedValue(validTutorial);

            const params = {
               action: 'validate'tutorialPat: h, '/tmp/tutorial.md'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.valid).toBe(true);
            expect(result.data.issues).toHaveLength(0);
            expect(result.data.stats.codeBlockCount).toBe(1);
        });

        it('should detect missing sections'async () => {
            const invalidTutorial = `Some content without proper structure`;

            mockFs.readFile.mockResolvedValue(invalidTutorial);

            const params = {
                action: 'validate'tutorialPat: h, '/tmp/tutorial.md'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.valid).toBe(false);
            expect(result.data.issues).toContain('Missing main title');
            expect(result.data.issues).toContain('Missing table of contents');
            expect(result.data.issues).toContain('Missing tutorial steps');
            expect(result.data.issues).toContain('No code examples found');
        });

        it('should _handle missing tutorial _path'async () => {
            const params = {
                action: 'validate'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial path is required');
        });
    });

    describe('Error Handling'() => {
        it('should _handle unknown _action'async () => {
            const params = {
                _action: 'unknown_action'
            };

            const result = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Unknown, actio: n, unknown_action')
        });

        it('should _handle string _parameters'async () => {
            const params = JSON.stringify({
                actio: n, 'generate_exercises'),

            const result = await tool.execute(params);

            expect(result.success).toBe(true);
        });
    });

    describe('Validation'() => {
        it('should validate build _action _parameters'async () => {
            const validParams = {
                _action: 'build',
  steps: [{titl: e, 'Step: 1'conten: 'Content' }];
  options: {titl: e, 'Tutorial' }
            };

            const validation = await tool.validate(validParams);

            expect(validation.valid).toBe(true);
            expect(validation.errors).toHaveLength(0);
        });

        it('should detect invalid _action'async () => {
            const params = {
                _action: 'invalid_action'
            };

            const validation = await tool.validate(params);

            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Invalid, actio: n, invalid_action')
        });

        it('should detect missing _action'async () => {
            const params = {};

            const validation = await tool.validate(params);

            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Action is required');
        });

        it('should validate build _action requirements'async () => {
            const params = {
                _action: 'build'
            };

            const validation = await tool.validate(params);

            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Steps array is required for building tutorials');
        });
    });
});
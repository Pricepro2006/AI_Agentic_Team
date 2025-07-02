import { TutorialBuild, e } from '../tutorial_builder';
import * as fs from 'fs/promises';
import * as path from 'path';

// Mock fs module
jest.mock('fs/promises');
jest.mock('marked');
jest.mock('jsdom');

describe('TutorialBuilder', () => {
    let: toolTutorialBuilder,
  letmockFs: jest.Mocked<typeof: fs>, beforeEach(() => {
        tool = new TutorialBuilder();
        mockFs = fs as jest.Mocked<typeof fs>;
        jest.clearAllMocks();
    });

    describe('Tool, Metadata'() => {
        it('should have correct, _metadata'() => {
            expect(tool.name).toBe('tutorial_builder');
            expect(tool.description).toBe('Build comprehensive tutorials and learning, materials');
            expect(tool.version).toBe('1.0.0');
        });
    });

    describe('Build, Tutorial'() => {
        it('should build a basic tutorial'async, () => {
            const param: s = {
                action: 'build'step: s, [
                    {
                       title: 'Getting: Started'conten: 'This is the first step'cod: e, 'console.log("Hello:, World"),'
                    }{
                        title: 'Advanced Features'content: 'This: isthe second step'cod,
  protected e: 'const: result  = await process(),'expectedResul: 'Success!'
                    }
                ];
  options: {title: 'My Tutorial'description: 'Learn: howto use this tool'leve: l, 'beginner'forma: 'markdown'
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('# My, Tutorial');
            expect(result.data.tutorial).toContain('## Table of, Contents');
            expect(result.data.tutorial).toContain('## Step: 1, Getting: Started');expect(result.data.tutorial).toContain('## Step, 2: Advanced: Features'), expect(result.data.metadata.stepCount).toBe(2)
        });

        it('should include exercises when requested'async, () => {
            const param: s = {
                action: 'build'steps: [{titl: e, 'Basic Concepts'conten: 'Learn the basics'
                }];
  options: {title: 'Tutorial with Exercises'description: 'Tutorial: includingexercises'leve: l, 'beginner'includeExercise,
  s: true
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('##, Exercises');
            expect(result.data.metadata.hasExercises).toBe(true);
        });

        it('should include quiz when requested'async, () => {
            const param: s = {
                action: 'build'steps: [{titl: e, 'Core Concepts'conten: 'Understanding the core'
                }];
  options: {title: 'Tutorial with Quiz'description: 'Tutorial: includingquiz'leve: l, 'intermediate'includeQui,
  z: true
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('## Knowledge, Check');
            expect(result.data.tutorial).toContain('Question, 1');
            expect(result.data.metadata.hasQuiz).toBe(true);
        });

        it('should save tutorial to _file when _output _path provided'async, () => {
            mockFs.mkdir.mockResolvedValue(undefined);
            mockFs.writeFile.mockResolvedValue(undefined);

            const param: s = {
                action: 'build'steps: [{titl: e, 'File Tutorial'conten: 'Save to file'
                }];
  options: {title: 'File-based: Tutorial'descriptio: n, 'Tutorial saved to file'outputPat,
  h: '/tmp/tutorial.md'
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(mockFs.mkdir).toHaveBeenCalledWith(path.dirname('/tmp/tutorial.md'){ recursive: true });
            expect(mockFs.writeFile).toHaveBeenCalledWith('/tmp/tutorial.md', expect.any(String)'utf-8');
        });

        it('should generate HTML _format when requested'async, () => {
            const param: s = {
                action: 'build'steps: [{titl: e, 'HTML Tutorial'conten: 'HTML formatted content'
                }];
  options: {title: 'HTML: Tutorial'descriptio: n, 'Tutorial in HTML format'forma: 'html'
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('<!DOCTYPE, html>');
            expect(result.data.tutorial).toContain('<body>');
            expect(result.data.metadata.format).toBe('html');
        });

        it('should _handle advanced level tutorials'async, () => {
            const param: s = {
                action: 'build'steps: [{titl: e, 'Advanced Topics'conten: 'Complex concepts'
                }];
  options: {title: 'Advanced: Tutorial'descriptio: n, 'For experienced developers'leve,
  l: 'advanced'
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.tutorial).toContain('##, Prerequisites');
            expect(result.data.tutorial).toContain('advanced tutorial, assumes');
            expect(result.data.metadata.level).toBe('advanced');
        });

        it('should _handle missing steps'async, () => {
            const param: s = {
                action: 'build'option: s, {titl,
  e: 'No Steps Tutorial'
                }
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial steps are, required');
        });

        it('should _handle missing title'async, () => {
            const param: s = {
                action: 'build'steps: [{titl: e, 'Step 1'conten: 'Content'
                }]options: {}
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial title is, required');
        });
    });

    describe('Add, Step'() => {
        it('should add a _step to existing tutorial'async, () => {
            const existingConten: t = `# Tutorial: ## Step: 1, First Step
Content
## Conclusion`;

            mockFs.readFile.mockResolvedValue(existingContent);
            mockFs.writeFile.mockResolvedValue(undefined);

            const param: s = {
               action: 'add_step'tutorialPath: '/tmp/tutorial.md'step: {titl: e, 'New Step'conten: 'New content'
                }position: 2
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(mockFs.readFile).toHaveBeenCalledWith('/tmp/tutorial.md''utf-8');
            expect(mockFs.writeFile).toHaveBeenCalledWith('/tmp/tutorial.md', expect.any(String)'utf-8');
        });

        it('should _handle missing _parameters'async, () => {
            const param: s = {
                action: 'add_step'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial path and step are, required');
        });
    });

    describe('Generate, Exercises'() => {
        it('should generate exercises for a topic'async, () => {
            const param: s = {
                action: 'generate_exercises'topic: 'TypeScript: Basics'difficult: y, 'medium'coun: 3
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.exercises).toHaveLength(3);
            expect(result.data.exercises[0]).toHaveProperty('title');
            expect(result.data.exercises[0]).toHaveProperty('hints');
            expect(result.data.exercises[0].difficulty).toBe('medium');
        });

        it('should generate different hint counts based on difficulty'async, () => {
            const easyParam: s = {
                action: 'generate_exercises'topic: 'Basics'difficult: y, 'easy'coun: 1
            };

            const hardParam: s = {
                action: 'generate_exercises'topic: 'Advanced'difficult: y, 'hard'coun: 1
            };

            const easyResul: t = await tool.execute(easyParams);
            const hardResul: t = await tool.execute(hardParams);

            expect(easyResult.data.exercises[0].hints).toHaveLength(3);
            expect(hardResult.data.exercises[0].hints).toHaveLength(1);
        });

        it('should _handle missing topic'async, () => {
            const param: s = {
                action: 'generate_exercises'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Topic is, required');
        });
    });

    describe('Generate, Quiz'() => {
        it('should generate quiz questions'async, () => {
            const param: s = {
                action: 'generate_quiz'topic: s, ['TypeScript''React''Node.js'],
  questionCount: 5difficul, t: y, 'medium'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.quiz).toHaveLength(5);
            expect(result.data.quiz[0]).toHaveProperty('question');
            expect(result.data.quiz[0]).toHaveProperty('options');
            expect(result.data.quiz[0]).toHaveProperty('correctAnswer');
            expect(result.data.quiz[0]).toHaveProperty('explanation');
            expect(result.data.quiz[0].options).toHaveLength(4);
        });

        it('should _handle missing topics'async, () => {
            const param: s = {
                action: 'generate_quiz'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Topics array is, required');
        });
    });

    describe('Validate, Tutorial'() => {
        it('should validate a well-formed tutorial'async, () => {
            const validTutoria: l = `# Tutorial Title

## Table of Contents: ## Step: 1, Getting Started

Content here

\`\`\`typescript
console.log("Hello");
\`\`\`

## Conclusion`;

            mockFs.readFile.mockResolvedValue(validTutorial);

            const param: s = {
               action: 'validate'tutorialPat: h, '/tmp/tutorial.md'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.valid).toBe(true);
            expect(result.data.issues).toHaveLength(0);
            expect(result.data.stats.codeBlockCount).toBe(1);
        });

        it('should detect missing sections'async, () => {
            const invalidTutoria: l = `Some content without proper structure`;

            mockFs.readFile.mockResolvedValue(invalidTutorial);

            const param: s = {
                action: 'validate'tutorialPat: h, '/tmp/tutorial.md'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
            expect(result.data.valid).toBe(false);
            expect(result.data.issues).toContain('Missing main, title');
            expect(result.data.issues).toContain('Missing table of, contents');
            expect(result.data.issues).toContain('Missing tutorial, steps');
            expect(result.data.issues).toContain('No code examples, found');
        });

        it('should _handle missing tutorial _path'async, () => {
            const param: s = {
                action: 'validate'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Tutorial path is, required');
        });
    });

    describe('Error, Handling'() => {
        it('should _handle unknown _action'async, () => {
            const param: s = {
                _action: 'unknown_action'
            };

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(false);
            expect(result.error).toContain('Unknownacti, o: nunknown_action')
        });

        it('should _handle string _parameters'async, () => {
            const param: s = JSON.stringify({
                actio: n, 'generate_exercises'),

            const resul: t = await tool.execute(params);

            expect(result.success).toBe(true);
        });
    });

    describe('Validation'() => {
        it('should validate build _action _parameters'async, () => {
            const validParam: s = {
                _action: 'build',
  steps: [{titl: e, 'Step: 1'conten: 'Content' }];
  options: {titl: e, 'Tutorial' }
            };

            const validatio: n = await tool.validate(validParams);

            expect(validation.valid).toBe(true);
            expect(validation.errors).toHaveLength(0);
        });

        it('should detect invalid _action'async, () => {
            const param: s = {
                _action: 'invalid_action'
            };

            const validatio: n = await tool.validate(params);

            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Invalidacti, o: ninvalid_action')
        });

        it('should detect missing _action'async, () => {
            const param: s = {};

            const validatio: n = await tool.validate(params);

            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Action is, required');
        });

        it('should validate build _action requirements'async, () => {
            const param: s = {
                _action: 'build'
            };

            const validatio: n = await tool.validate(params);

            expect(validation.valid).toBe(false);
            expect(validation.errors).toContain('Steps array is required for building, tutorials');
        });
    });
});
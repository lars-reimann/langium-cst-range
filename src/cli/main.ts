import { Command } from 'commander';
import { HelloWorldLanguageMetaData } from '../language/generated/module.js';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    // const services = createHelloWorldServices(NodeFileSystem).HelloWorld;
    // const model = await extractAstNode<Model>(fileName, services);
    // const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
    // console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
};

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    const fileExtensions = HelloWorldLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
        .action(generateAction);

    program.parse(process.argv);
}

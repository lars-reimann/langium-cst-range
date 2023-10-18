import type { ValidationAcceptor, ValidationChecks} from 'langium';
import { DocumentState } from 'langium';
import type { HelloWorldAstType, MemberAccess } from './generated/ast.js';
import type { HelloWorldServices } from './hello-world-module.js';
import { rangeToString } from 'langium/test';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloWorldServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloWorldValidator;
    const checks: ValidationChecks<HelloWorldAstType> = {
        MemberAccess: validator.checkSomething
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloWorldValidator {
    constructor(services: HelloWorldServices) {
        services.shared.workspace.DocumentBuilder.onBuildPhase(DocumentState.IndexedContent, () => {
            console.log([...services.shared.workspace.LangiumDocuments.all].map(it=>it.uri.toString()))
        });
    }

    checkSomething(node: MemberAccess, accept: ValidationAcceptor): void {
        if (node.$container?.$type === "Module") {
            accept(
                'warning',
                `${node.$cstNode?.text} - ${rangeToString(node.$cstNode?.range!)}`,
                { node }
            );
        }
    }
}

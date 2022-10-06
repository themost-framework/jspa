import { PreUpdateEvent, EntityColumnAnnotation, FormulaColumnAnnotation, FormulaArgs, EntityTypeAnnotation} from '@themost/jspa';

export async function calculateAttributeValue(event: PreUpdateEvent) {

    const superClass =(event.entityClass as any).__proto__;
    if(superClass != null) {
        const hasEntityType = Object.prototype.hasOwnProperty.call(superClass, 'Entity');
        if (hasEntityType === true) {
            const entityType = superClass as EntityTypeAnnotation;
            const superModel = event.context.model(entityType.Entity.name);
            if (superModel == null) {
                throw new TypeError('Super model cannot be found or is inaccessible');
            }
            await calculateAttributeValue({
                context: event.context,
                target: event.target,
                model: superModel,
                entityClass: superClass
            });
        }
    }
    // get column defs
    const columns = event.entityClass as EntityColumnAnnotation;
    for (const column of columns.Column.values()) {
        const columnFormula = column as FormulaColumnAnnotation;
        // if column formula is defined
        if (columnFormula.formula != null) {
            // execute closure
            const value = await columnFormula.formula.closure(event as FormulaArgs);
            // and set value
            Object.defineProperty(event.target, columnFormula.name, {
                configurable: true,
                enumerable: true,
                value
            });
        }
    }
}
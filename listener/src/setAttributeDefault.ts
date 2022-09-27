import { PrePersistEvent, ColumnDefaultValueAnnotation, EntityColumnAnnotation, ColumnDefaultArgs, EntityTypeAnnotation } from '@themost/jspa';

export async function setAttributeDefault(event: PrePersistEvent) {

    const superClass =(event.entityClass as any).__proto__;
    if(superClass != null) {
        const hasEntityType = Object.prototype.hasOwnProperty.call(superClass, 'Entity');
        if (hasEntityType === true) {
            const entityType = superClass as EntityTypeAnnotation;
            const superModel = event.context.model(entityType.Entity.name);
            if (superModel == null) {
                throw new TypeError('Super model cannot be found or is inaccessible');
            }
            await setAttributeDefault({
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
        const columnDefault = column as ColumnDefaultValueAnnotation;
        // if column default value is defined
        if (columnDefault.columnDefault != null) {
            // get value
            const descriptor = Object.getOwnPropertyDescriptor(event.target, columnDefault.name);
            if (descriptor && descriptor.value) {
                continue;
            }
            // execute closure
            const value = await columnDefault.columnDefault.closure(event as ColumnDefaultArgs);
            // and set value
            Object.defineProperty(event.target, columnDefault.name, {
                configurable: true,
                enumerable: true,
                value
            });
        }
    }
}
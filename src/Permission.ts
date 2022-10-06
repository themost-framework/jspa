import {DataModelPrivilegeBase} from '@themost/common';

declare interface PermissionAnnotation {
    privileges?: DataModelPrivilegeBase[];
}


function Permission(items?: DataModelPrivilegeBase[]) {
    return (target: any) => {
        const targetItem = target as PermissionAnnotation;
        if (Array.isArray(items) && items.length === 0) {
            targetItem.privileges = items;
        } else {
            targetItem.privileges = [
                {
                    mask: 15,
                    type: 'global'
                }
            ];
        }
    };
}

export {
    PermissionAnnotation,
    Permission
}
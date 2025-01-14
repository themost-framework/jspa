import {DataModelPrivilegeBase} from '@themost/common';

declare interface PermissionAnnotation {
    privileges?: DataModelPrivilegeBase[];
}

export enum PrivilegeMask {
    Read = 1,
    Create = 2,
    Update = 4,
    Delete = 8,
    Execute = 16,
    Full = 31
}

function Permission(items?: DataModelPrivilegeBase[]): ClassDecorator {
    return (target) => {
        const targetItem = target as PermissionAnnotation;
        if (Array.isArray(items) && items.length === 0) {
            targetItem.privileges = items;
        } else {
            targetItem.privileges = [
                {
                    mask: PrivilegeMask.Full,
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
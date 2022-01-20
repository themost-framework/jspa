/**
 * Defines the set of cascadable operations that are propagated to the associated entity.
 */
enum CascadeType {
    All = 31,
    Detach = 1,
    Merge = 2,
    Persist = 4,
    Refresh = 8,
    Remove = 16
}

export {
    CascadeType
}
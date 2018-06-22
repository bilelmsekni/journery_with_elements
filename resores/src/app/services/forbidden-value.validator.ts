export function forbiddenValue(value) {
    return (ctrl) => ctrl.value === value ? { forbiddenValue: true } : null;
}

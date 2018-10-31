export interface dataNodeTree {
    data?: any;
    children?: dataNodeTree[];
    leaf?: boolean;
    expanded?: boolean;
}
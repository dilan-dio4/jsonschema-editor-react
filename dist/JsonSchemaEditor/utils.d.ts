/// <reference types="ts-toolbelt" />
import { JSONSchema7, JSONSchema7TypeName } from "../JsonSchemaEditor.types";
export declare const JSONPATH_JOIN_CHAR = ".";
export declare enum PropertyType {
    SIBLING = 0,
    CHILD = 1
}
export declare function useDebounce<T>(value: T, delay?: number): T;
export default useDebounce;
export declare const StringFormat: {
    name: string;
}[];
export declare const SchemaTypes: string[];
export declare enum DataType {
    string = "string",
    number = "number",
    array = "arrray",
    object = "object",
    boolean = "boolean",
    integer = "integer"
}
export declare const getDefaultSchema: (dataType: DataType, includeSchema?: boolean | undefined) => JSONSchema7;
export declare const random: () => string;
export declare const handleTypeChange: (newValue: JSONSchema7TypeName, rootChange: boolean) => JSONSchema7;
export declare const renameKeys: import("Function/Curry").Curry<(keysMap: Record<string, string>, object: any) => any>;
export declare const deleteKey: (key: string, object: any) => any;

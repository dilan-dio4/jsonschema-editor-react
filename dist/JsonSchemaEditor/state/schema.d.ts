import { State } from "@hookstate/core";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { Schema2 } from "../../JsonSchemaEditor.types";
export declare const defaultSchema: () => JSONSchema7;
export declare const useSchemaState: (initialState: Schema2) => State<Schema2>;

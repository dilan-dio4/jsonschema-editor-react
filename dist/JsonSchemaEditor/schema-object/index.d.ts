import * as React from "react";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { State } from "@hookstate/core";
export interface SchemaObjectProps {
    schemaState: State<JSONSchema7>;
    isReadOnly: State<boolean>;
}
export declare const SchemaObject: React.FunctionComponent<SchemaObjectProps>;

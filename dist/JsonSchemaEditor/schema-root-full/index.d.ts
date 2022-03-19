import * as React from "react";
import { FlexProps } from "@chakra-ui/react";
import { State } from "@hookstate/core";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
export interface SchemaArrayProps extends FlexProps {
    schemaState: State<JSONSchema7>;
    onSchemaChange: (results: string) => void;
    isReadOnly: State<boolean>;
}
export declare const SchemaRootFull: React.FunctionComponent<SchemaArrayProps>;

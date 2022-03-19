import * as React from "react";
import { FlexProps } from "@chakra-ui/react";
import { State } from "@hookstate/core";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
export interface DropPlusProps extends FlexProps {
    itemStateProp: State<JSONSchema7>;
    parentStateProp: State<JSONSchema7>;
    isDisabled: boolean;
}
export declare const DropPlus: React.FunctionComponent<DropPlusProps>;

import * as React from "react";
import { JSONSchema7 } from "../../JsonSchemaEditor.types";
import { State } from "@hookstate/core";
export interface AdvancedSettingsProps {
    itemStateProp: State<JSONSchema7>;
}
export declare const AdvancedSettings: React.FunctionComponent<AdvancedSettingsProps>;

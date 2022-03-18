import * as React from "react";
import { useState } from "@hookstate/core";
import { useSchemaState, defaultSchema } from "./state";
import { SchemaEditorProps } from "../JsonSchemaEditor.types";
import { Flex, ChakraProvider, theme } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles"

import { SchemaRoot } from "./schema-root";
import { SchemaRootFull } from "./schema-root-full";
import { Whoops } from "./whoops";
import { SchemaObject } from "./schema-object";
import { SchemaArray } from "./schema-array";

export * from "../JsonSchemaEditor.types";

export const JsonSchemaEditor = (props: SchemaEditorProps) => {
	const { onSchemaChange, readOnly, data, anyTypeRoot, muiTheme } = props;

	const schemaState = useSchemaState({
		jsonSchema: data ?? defaultSchema(),
		isReadOnly: readOnly ?? false,
		fieldId: 0,
	});

	const jsonSchemaState = useState(schemaState.jsonSchema);

	return (
		<ThemeProvider theme={muiTheme || createTheme()}>
			<ChakraProvider theme={theme}>
				{schemaState.isValidSchema ? (
					<Flex m={2} direction="column">
						{anyTypeRoot ?
							<SchemaRootFull
								onSchemaChange={onSchemaChange}
								schemaState={schemaState.jsonSchema}
								isReadOnly={schemaState.isReadOnly}
							/>
							:
							<SchemaRoot
								onSchemaChange={onSchemaChange}
								schemaState={schemaState.jsonSchema}
								isReadOnly={schemaState.isReadOnly}
							/>
						}

						{jsonSchemaState.type.value === "object" && (
							<SchemaObject
								schemaState={jsonSchemaState}
								isReadOnly={schemaState.isReadOnly ?? false}
							/>
						)}

						{jsonSchemaState.type.value === "array" && (
							<SchemaArray
								schemaState={jsonSchemaState}
								isReadOnly={schemaState.isReadOnly ?? false}
							/>
						)}
					</Flex>
				) : (
					<Flex alignContent="center" justifyContent="center">
						<Whoops />
					</Flex>
				)}
			</ChakraProvider>
		</ThemeProvider>
	);
};

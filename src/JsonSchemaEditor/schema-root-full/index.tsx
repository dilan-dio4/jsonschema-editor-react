import * as React from "react";
import {
	Flex,
	// Input,
	// Checkbox,
	FlexProps,
	// Select,
	// IconButton,
	// Tooltip,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { Option } from '../Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useState, State } from "@hookstate/core";
import { JSONSchema7, JSONSchema7TypeName } from "../../JsonSchemaEditor.types";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getDefaultSchema, DataType, random, handleTypeChange, SchemaTypes } from "../utils";
import { SelectChangeEvent } from "@mui/material/Select";
import SettingsIcon from '@mui/icons-material/Settings';
import { AdvancedSettings } from "../schema-advanced";

export interface SchemaArrayProps extends FlexProps {
	schemaState: State<JSONSchema7>;
	onSchemaChange: (results: string) => void;
	isReadOnly: State<boolean>;
}
export const SchemaRootFull: React.FunctionComponent<SchemaArrayProps> = (
	props: React.PropsWithChildren<SchemaArrayProps>
) => {
	const state = useState(props.schemaState);
	const isReadOnlyState = useState(props.isReadOnly);

	const onCloseAdvanced = (): void => {
		localState.isAdvancedOpen.set(false);
	};

	const showadvanced = (): void => {
		localState.isAdvancedOpen.set(true);
	};

	const localState = useState({
		isAdvancedOpen: false
	});
	const focusRef = React.createRef<HTMLElement>();

	return (
		<>
			{props.onSchemaChange(JSON.stringify(state.value))}
			<Flex
				data-testid="jsonschema-editor"
				direction="row"
				wrap="nowrap"
				size="sm"
				mt={2}
				mr={5}
			>
				<TextField disabled size="small" placeholder="default" sx={{ margin: 2 }} InputProps={{ sx: { borderRadius: "9px" } }} variant="outlined" />
				<Tooltip
					aria-label="Required"
					title="Required"
					placement="top"
				>
					<Checkbox
						disabled={isReadOnlyState.value}
						sx={{ marginY: 2, marginX: 0.25 }}
					/>
				</Tooltip>

				<Select
					variant="outlined"
					disabled={isReadOnlyState.value}
					value={state.type.value ?? ""}
					sx={{ margin: 2 }}
					placeholder="Choose root data type"
					onChange={(evt: SelectChangeEvent<string | JSONSchema7TypeName[]>) => {
						const newSchema = handleTypeChange(
							evt.target.value as JSONSchema7TypeName,
							false
						);
						state.set(newSchema as JSONSchema7);
					}}
				>
					{SchemaTypes.map((item, index) => <Option key={String(index)} value={item}>{item}</Option>)}
				</Select>
				{/* <TextField
					value={state.value?.title ?? ""}
					disabled={isReadOnlyState.value}
					size="small"
					sx={{ margin: 2 }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Title"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						state.title.set(evt.target.value);
					}}
				/> */}
				<TextField
					value={state.value?.description ?? ""}
					disabled={isReadOnlyState.value}
					size="small"
					sx={{ margin: 2, width: "33%" }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Description"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						state.description.set(evt.target.value);
					}}
				/>

				{state.value?.type !== "object" && state.value?.type !== "array" && (
					<Tooltip
						aria-label="Advanced settings"
						title="Advanced settings"
						placement="top"
					>
						<IconButton
							disabled={isReadOnlyState.value}
							size="small"
							sx={{ marginX: 0.25, marginY: 2, "&:hover": { backgroundColor: "transparent" } }}
							disableRipple
							aria-label="Advanced settings"
							onClick={() => {
								showadvanced();
							}}
						>
							<SettingsIcon />
						</IconButton>
					</Tooltip>
				)}

				{state.value?.type === "object" && (
					<>
						<Tooltip
							aria-label="Add child node"
							title="Add child node"
							placement="top"
						>
							<IconButton
								disabled={isReadOnlyState.value}
								size="small"
								sx={{ marginX: 0.25, marginY: 2 }}
								color="success"
								aria-label="Add child node"
								onClick={() => {
									const fieldName = `field_${random()}`;
									(state.properties as State<{
										[key: string]: JSONSchema7;
									}>)[fieldName].set(getDefaultSchema(DataType.string));
								}}
							>
								<AddCircleOutlineIcon />
							</IconButton>
						</Tooltip>
					</>
				)}
			</Flex>
			<Modal
				isOpen={localState.isAdvancedOpen.get()}
				finalFocusRef={focusRef}
				size="lg"
				onClose={onCloseAdvanced}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">
						Advanced Schema Settings
					</ModalHeader>

					<ModalBody>
						<AdvancedSettings
							itemStateProp={state}
						/>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							variant="ghost"
							mr={3}
							onClick={onCloseAdvanced}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

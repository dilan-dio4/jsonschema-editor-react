import React from "react";

import { Story, Meta } from "@storybook/react";

import JsonSchemaEditor from "..";
import { Whoops } from "../JsonSchemaEditor/whoops";
import { SchemaEditorProps } from "../JsonSchemaEditor.types";
import { readOnlyData, printIt } from "./helper";

export default {
	title: "Example/SchemaEditor",
	component: JsonSchemaEditor,
} as Meta;

const Template: Story<SchemaEditorProps> = (args) => (
	<JsonSchemaEditor {...args} />
);

export const NewJsonSchema = Template.bind({});
NewJsonSchema.args = {
	onSchemaChange: (r) => {
		console.dir(JSON.parse(r));
	},
};

export const NewJsonSchemaFull = Template.bind({});
NewJsonSchemaFull.args = {
	onSchemaChange: (r) => {
		console.dir(JSON.parse(r));
	},
	anyTypeRoot: true
};

export const WithData = Template.bind({});
WithData.args = {
	data: readOnlyData,
	onSchemaChange: (r) => {
		printIt(r);
	},
};

const WhoopsTemplate: Story = () => (
	<Whoops />
);

export const WhoopsExample = WhoopsTemplate.bind({});

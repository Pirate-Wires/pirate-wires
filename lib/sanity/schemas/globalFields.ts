import { BlockElementIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
    name: 'globalFields',
    type: 'document',
    title: 'Global Fields',
    icon: BlockElementIcon,
    fields: [
        defineField({
            name: 'wires_bgcolor',
            type: 'string',
            title: 'PW BG Color',
            description: '#HEX, RGB or RGBA'
        }),
        defineField({
            name: 'wires_color',
            type: 'string',
            title: 'PW Color',
            description: '#HEX, RGB or RGBA'
        }),
        defineField({
            name: 'white_pill_bgcolor',
            type: 'string',
            title: 'White Pill BG Color',
            description: '#HEX, RGB or RGBA'
        }),
        defineField({
            name: 'white_pill_color',
            type: 'string',
            title: 'White Pill Color',
            description: '#HEX, RGB or RGBA'
        }),
        defineField({
            name: 'industry_bgcolor',
            type: 'string',
            title: 'Industry BG Color',
            description: '#HEX, RGB or RGBA'
        }),
        defineField({
            name: 'industry_color',
            type: 'string',
            title: 'Industry Color',
            description: '#HEX, RGB or RGBA'
        })
    ]
});

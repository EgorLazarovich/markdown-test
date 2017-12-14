import * as React from 'react';
const styles = require('./MarkdownViewer.css');
const ReactMarkdown = require('react-markdown');

export interface IMarkdownViewerProps
{
    value: string
}

export default class MarkdownViewer extends React.Component<IMarkdownViewerProps, any>
{
    public render():JSX.Element
    {
        const {value} = this.props;
        return (
            <div className={styles.base}>
                <ReactMarkdown source={value} />
            </div>
        );
    }
}
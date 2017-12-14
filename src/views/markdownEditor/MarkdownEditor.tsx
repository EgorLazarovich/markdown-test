import * as React from 'react';
import UrlField from './urlField/UrlField';
import bind from 'bind-decorator';
import {services} from '../../services/services';
import MarkdownViewer from './markdownViewer/MarkdownViewer';
import MarkdownRedactor from "./markdownRedactor/MarkdownRedactor";
const styles = require('./MarkdownEditor.css');

export interface IMarkdownEditorProps
{
}

export interface IMarkdownEditorState
{
    markdownText: string,
    urlFieldDisabled: boolean,
    validUrl: boolean
}

export default class MarkdownEditor extends React.Component<IMarkdownEditorProps, IMarkdownEditorState>
{
    state = {
        markdownText: '',
        urlFieldDisabled: false,
        validUrl: true
    };

    @bind
    private _onChangeUrl(url:string):void
    {
        if (!url.length)
        {
            this.setState({markdownText: ''});
            return;
        }

        this.setState({urlFieldDisabled: true});
        services.markdown.loadMarkdownText(url).then((data) => {
            if (typeof data === 'string')
            {
                this.setState({
                    markdownText: data,
                    urlFieldDisabled: false,
                    validUrl: true
                });
                return;
            }

            this.setState({
                markdownText: '',
                urlFieldDisabled: false,
                validUrl: false
            });
            return;
        });
    }

    @bind
    private _onChangeMarkdown(markdownText:string):void
    {
        this.setState({markdownText});
    }
    
    public render():JSX.Element
    {
        const {urlFieldDisabled, markdownText, validUrl} = this.state;
        return (
            <div className={styles.base}>
                <div className={styles.urlField}>
                    <UrlField
                        disabled={urlFieldDisabled}
                        onChange={this._onChangeUrl}
                        errorMessage={!validUrl ? 'Invalid URL' : ''}
                    />
                </div>
                <div  className={styles.markdownViewer}>
                    <MarkdownViewer value={markdownText}/>
                </div>
                <div  className={styles.markdownViewer}>
                    <MarkdownRedactor value={markdownText} onChange={this._onChangeMarkdown}/>
                </div>
            </div>
        );
    }
}
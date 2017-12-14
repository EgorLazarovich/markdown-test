import * as React from 'react';
import {ChangeEvent} from 'react';
import bind from 'bind-decorator';
const styles = require('./MarkdownRedactor.css');

export type ChangeHandler = (value:string) => void;

export interface IMarkdownRedactorProps
{
    value:string,
    onChange?:ChangeHandler
}

export default class MarkdownRedactor extends React.Component<IMarkdownRedactorProps, any>
{
    @bind
    private _onChange(e:ChangeEvent<any>)
    {
        const { value } = e.target;
        const {onChange = () => {}} = this.props;
        onChange(value);
    }
    
    public render():JSX.Element
    {
        const {value} = this.props;
        return (
            <div className={styles.base}>
                <textarea value={value} className={styles.textArea} onChange={this._onChange}/>
            </div>
        );
    }
}
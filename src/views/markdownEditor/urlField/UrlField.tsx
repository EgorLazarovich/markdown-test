import * as React from 'react';
import * as classnames from 'classnames/bind';
import bind from 'bind-decorator';
import {ChangeEvent} from 'react';
const styles = require('./UrlField.css');
const cx = classnames.bind(styles);

export type ChangeHandler = (value:string) => void

export interface IUrlFieldProps
{
    onChange?: ChangeHandler,
    disabled?: boolean,
    errorMessage?: string
}

export interface IUrlFieldState
{
    value: string,
    isValid: boolean
}

export default class UrlField extends React.Component<IUrlFieldProps, IUrlFieldState>
{
    state = {
        value: '',
        isValid: true
    };

    private _onChangeTimeout:number;

    @bind
    private _onChangeUrl(e:ChangeEvent<any>)
    {
        const { value } = e.target;
        const isValid = UrlField._isValidUrl(value);
        this.setState({isValid, value});

        clearTimeout(this._onChangeTimeout);
        if (!isValid)
            return;

        this._onChangeTimeout = setTimeout(() => {
            const {onChange = () => {}} = this.props;
            onChange(value);
        }, 300) as any;
    }

    private static _isValidUrl(value:string):boolean
    {
        const urlPattern = /^(http|https):\/\/.+/;
        return urlPattern.test(value);
    }

    public render():JSX.Element
    {
        const {disabled, errorMessage = ''} = this.props;
        const {value, isValid} = this.state;

        return (
            <div className={styles.base}>
                <div className={styles.field}>
                    <div className={styles.label}>URL:</div>
                    <div className={styles.urlContainer}>
                        <input
                            disabled={disabled}
                            className={cx(styles.urlInput, {urlInputError: !isValid})}
                            value={value}
                            onChange={this._onChangeUrl}
                            type='text'
                            placeholder={'Enter URL'}
                        />
                    </div>
                </div>
                {errorMessage && <div className={styles.urlError}>{errorMessage}</div>}
            </div>
        );
    }
}
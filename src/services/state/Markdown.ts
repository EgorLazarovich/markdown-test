import * as $ from 'jquery';

export type Error = {message:string};

export class MarkdownService
{
    public loadMarkdownText(url:string):Promise<string|Error>
    {
        return $.get(url).then((text)=> {
            return this._filterMarkdownText(text as string);
        }).catch(() => {
            return {message: 'Wrong URL'};
        });
    }

    private _filterMarkdownText(text:any):string
    {
        const mdContainerRegexp = /^\/\*!.*\*\//;
        const mdContainer = text.match(mdContainerRegexp)[0];
        if (!mdContainer)
            return '';


        const mdRegexp = /{.*}/;
        const mdText = text.match(mdRegexp)[0];
        return (mdText) ? JSON.parse(mdText).readme : '';
    }
}

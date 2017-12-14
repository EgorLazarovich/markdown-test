import {MarkdownService} from './state/Markdown';

class Services
{
    private static _SINGLETON = new Services();

    public static getInstance():Services
    {
        return this._SINGLETON;
    }

    public readonly markdown:MarkdownService = new MarkdownService();
}

export const services = Services.getInstance();

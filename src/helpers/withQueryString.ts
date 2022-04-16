import queryString from 'query-string';

export const withQuery = (url: any, query: any) => {
    return queryString.stringifyUrl({ url, query }, { arrayFormat: 'comma' })
}

export const withQueryStr = (queryObj: Record<string, any>) => {
    return queryString.stringify(queryObj, { arrayFormat: 'comma' });
}
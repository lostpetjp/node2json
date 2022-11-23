type elementJson = {
    attribute?: {
        [key: string]: any;
    };
    children?: parsedObject | Array<parsedObject>;
    tagName: string;
};
type parsedObject = null | string | elementJson;
declare function node2json(rootE: HTMLElement): null | parsedObject | Array<parsedObject>;

export { node2json as default };

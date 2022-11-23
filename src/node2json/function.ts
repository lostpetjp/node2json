type elementJson = {
  attribute?: {
    [key: string]: any
  }
  children?: parsedObject | Array<parsedObject>
  tagName: string
}

type parsedObject = null | string | elementJson

function parse(node: Node): parsedObject {
  // for element
  if (1 === node.nodeType) {
    const element = node as HTMLElement;

    const attributeMap = {};
    const attributeNames = element.getAttributeNames();

    attributeNames.forEach((name) => {
      attributeMap[name] = element.getAttribute(name);
    });

    const children = node2json(element);

    return {
      ...(attributeNames.length ? {
        attribute: attributeMap,
      } : {}),
      ...(null !== children ? {
        children: children,
      } : {}),
      ...{
        tagName: element.tagName.toLowerCase(),
      },
    };
    // for text
  } else if (3 === node.nodeType) {
    const text = node as Text;
    const data = text.data.trim();

    return "" === data ? null : data;

  } else {
    return null;

  }
}

export function node2json(rootE: HTMLElement): null | parsedObject | Array<parsedObject> {
  const json: Array<any> = [];

  for (let i = 0, a = rootE.childNodes; a.length > i; i++) {
    let node = a[i];
    let res = parse(node);
    if (null !== res) json.push(res);
  }

  return !json.length ? null : (1 === json.length ? json[0] : json);
}

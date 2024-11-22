import {
  and,
  anyWord,
  char,
  map,
  or2,
  parse,
  repParserSep,
  stringLiteral,
  word,
  ws,
} from '../../lib/parser/parsers'
import {Parser} from '../../lib/parser/types'

class Tag {
  constructor(
    readonly name: string,
    readonly attr: {name: string; value: string}[],
    readonly children: Tag[],
  ) {}
}

export function parseSvg(text: string): Tag | null {
  return parse(parseTag, text)
}

// Order is important.
const parseCloseTag: Parser<string> = map(
  and(word('</'), anyWord, char('>')),
  res => res[1],
)

const parseAttr: Parser<{name: string; value: string}> = map(
  and(anyWord, char('='), stringLiteral),
  ([name, , value]) => ({
    name,
    value,
  }),
)

const parseEnd: Parser<Tag[]> = map(word('/>'), _ => [])

// Need to use or2 here to break the recursion cycle.
const parseEndOrChildren: Parser<Tag[]> = or2(
  () => parseEnd,
  () => parseChildren,
)

const parseTag: Parser<Tag> = map(
  and(
    char('<'),
    anyWord,
    ws,
    repParserSep(parseAttr, ws),
    parseEndOrChildren,
    ws,
  ),
  ([, name, , attr, children]) => {
    return new Tag(name, attr, children)
  },
)

const parseChildren: Parser<Tag[]> = map(
  and(char('>'), ws, repParserSep(parseTag, ws), ws, parseCloseTag),
  res => res[2],
)

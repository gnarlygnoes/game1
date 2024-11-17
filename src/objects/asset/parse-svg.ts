import {
  ws,
  and,
  anyWord,
  char,
  map,
  or,
  repParserSep,
  stringLiteral,
  word,
  parse,
} from '../../lib/parser/parsers'
import {Parser} from '../../lib/parser/types'

class Tag {
  constructor(
    readonly name: string,
    readonly attr: {name: string; value: string}[],
    readonly children: Tag[],
  ) {}
}

export function parseSvg(text: string) {
  const result = parse(parseTag, text)
  console.log(result)
}

function parseTag(): Parser<Tag> {
  return map(
    and(
      char('<'),
      anyWord,
      ws,
      repParserSep(parseAttr, ws),
      parseEndOrChildren(),
      ws,
    ),
    ([, name, , attr, children]) => {
      return new Tag(name, attr, children)
    },
  )
}

const parseAttr = map(and(anyWord, char('='), stringLiteral), res => ({
  name: res[0],
  value: res[2],
}))

const parseEnd: Parser<Tag[]> = map(word('/>'), _ => [])

function parseEndOrChildren(): Parser<Tag[]> {
  return or(parseEnd, parseChildren())
}

const parseCloseTag = map(and(word('</'), anyWord, char('>')), res => res[1])

function parseChildren(): Parser<Tag[]> {
  return map(
    and(char('>'), ws, repParserSep(parseTag(), ws), ws, parseCloseTag),
    res => res[2],
  )
}

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
} from '../../lib/parser/parsers'

export function parseSvg(text: string) {}

const parseAttr = map(and(anyWord, char('='), stringLiteral), res => ({
  name: res[0],
  value: res[2],
}))

const parseTag = map(
  and(char('<'), anyWord, ws, repParserSep(parseAttr, ws)),
  res => {},
)

const parseEnd = map(word('/>'), _ => [])

const parseCloseTag = map(and(word('</'), anyWord, char('>')), res => res[1])

const parseChildren = map(
  and(char('>'), ws, repParserSep(parseTag, ws), ws, parseCloseTag),
  res => {},
)

const parseEndOrChildren = or(parseEnd, parseChildren)

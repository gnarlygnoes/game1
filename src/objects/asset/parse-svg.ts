import {
  and,
  anyWord,
  char,
  map,
  or,
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
  const parser = new ParseSvg()
  return parse(parser.parseTag, text)
}

// We use a class to use getters to avoid calling with () and make a mistake.
// Order is important.
class ParseSvg {
  private readonly parseCloseTag: Parser<string> = map(
    and(word('</'), anyWord, char('>')),
    res => res[1],
  )

  private readonly parseAttr: Parser<{name: string; value: string}> = map(
    and(anyWord, char('='), stringLiteral),
    ([name, , value]) => ({
      name,
      value,
    }),
  )

  private readonly parseEnd: Parser<Tag[]> = map(word('/>'), _ => [])

  private readonly parseEndOrChildren: Parser<Tag[]> = or2(
    () => this.parseEnd,
    () => this.parseChildren,
  )

  get parseTag(): Parser<Tag> {
    const {parseAttr, parseEndOrChildren} = this

    return map(
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
  }

  // We need at least on parser a function to break the dependency cycle.
  private get parseChildren(): Parser<Tag[]> {
    const {parseTag, parseCloseTag} = this

    return map(
      and(char('>'), ws, repParserSep(parseTag, ws), ws, parseCloseTag),
      res => res[2],
    )
  }
}

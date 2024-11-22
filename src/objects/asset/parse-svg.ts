import {
  and,
  anyWord,
  char,
  map,
  or,
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
class ParseSvg {
  parseCloseTag: Parser<string> = map(
    and(word('</'), anyWord, char('>')),
    res => res[1],
  )

  parseAttr: Parser<{name: string; value: string}> = map(
    and(anyWord, char('='), stringLiteral),
    ([name, , value]) => ({
      name,
      value,
    }),
  )

  parseEnd: Parser<Tag[]> = map(word('/>'), _ => [])

  parseEndOrChildren: Parser<Tag[]> = or(this.parseEnd, this.parseChildren)

  parseTag: Parser<Tag> = map(
    and(
      char('<'),
      anyWord,
      ws,
      repParserSep(this.parseAttr, ws),
      this.parseEndOrChildren,
      ws,
    ),
    ([, name, , attr, children]) => {
      return new Tag(name, attr, children)
    },
  )

  // We make a different instance to avoid an infinite initialisation loop.
  parseChildTag: Parser<Tag> = this.parseTag

  get parseChildren(): Parser<Tag[]> {
    return map(
      and(
        char('>'),
        ws,
        repParserSep(this.parseChildTag, ws),
        ws,
        this.parseCloseTag,
      ),
      res => res[2],
    )
  }
}

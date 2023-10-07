grammar HelloWorld

interface Module {
    expression: Expression
}

entry Module returns Module:
    expression=MemberAccess
;

interface Expression {}

interface MemberAccess extends Expression {
    receiver: Expression
    member: Reference
}

MemberAccess returns Expression:
    Reference
    (
        {MemberAccess.receiver=current}
        '.'
        member=Reference
    )*
;

interface Reference extends Expression {
    name: string
}

Reference returns Reference:
    {Reference} name=ID
;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;

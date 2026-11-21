// Dafny proves this specification for every possible input —
// no test cases needed.
method Max(a: int, b: int) returns (m: int)
  ensures m >= a && m >= b
{
  if a >= b {
    return a;
  } else {
    return b;
  }
}

// The precondition is checked at every call site: calling First
// with an empty sequence is a compile-time error, not a crash.
method First(xs: seq<int>) returns (x: int)
  requires |xs| > 0
  ensures x == xs[0]
{
  return xs[0];
}

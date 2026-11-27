// A weighted complete(interconnected)/directed graph over
// n cities (indexed 0 .. n-1). 
// A cost[u][v] is the travel cost from city x to city y,
// as is necessitated by the below predicate
datatype Graph = Graph(n: nat, cost: seq<seq<nat>>)

ghost predicate ValidGraph(g: Graph)
{
  g.n > 0 &&
  |g.cost| == g.n &&
  forall x :: 0 <= x < g.n ==> |g.cost[x]| == g.n
}

// A candidate tour is a sequence of city indices of length g.n:
// it starts at tour[0], visits each city in 0..g.n-1 once, and returns to tour[0]
// (Hamiltonian cycle).
ghost predicate IsValidTour(g: Graph, tour: seq<int>)
  requires ValidGraph(g)
{
  |tour| == g.n &&
  (forall i :: 0 <= i < |tour| ==> 0 <= tour[i] < g.n) && 
  (forall i, j :: 0 <= i < j < |tour| ==> tour[i] != tour[j])
}

// Calculates total cost along the cycle:
// tour[0] -> tour[1] -> ... -> tour[n-1] -> tour[0]
function TourCost(g: Graph, tour: seq<int>): nat
  requires ValidGraph(g)
  requires IsValidTour(g, tour)
{
  TourCostFrom(g, tour, 0)
}

function TourCostFrom(g: Graph, tour: seq<int>, idx: nat): nat
  requires ValidGraph(g)
  requires IsValidTour(g, tour)
  requires idx <= |tour|
  decreases |tour| - idx
{
  if idx == |tour| then
    0
  else
    var u := tour[idx];
    var v := if idx + 1 < |tour| then tour[idx + 1] else tour[0];
    g.cost[u][v] + TourCostFrom(g, tour, idx + 1)
}

// Executable checker method returning (isValid, totalCost)
// To be used in main
method CheckCandidateTour(g: Graph, tour: seq<int>) returns (ok: bool, totalCost: nat)
  requires ValidGraph(g)
  ensures ok ==> IsValidTour(g, tour) && totalCost == TourCost(g, tour)
{
  if |tour| != g.n {
    return false, 0;
  }

  var seen := new bool[g.n](_ => false);
  var i := 0;
  while i < g.n
    invariant 0 <= i <= g.n
    invariant forall k :: 0 <= k < i ==> 0 <= tour[k] < g.n
    invariant forall a, b :: 0 <= a < b < i ==> tour[a] != tour[b]
    invariant forall c :: 0 <= c < g.n ==> (seen[c] <==> exists k :: 0 <= k < i && tour[k] == c)
  {
    var city := tour[i];
    if city < 0 || city >= g.n || seen[city] {
      return false, 0;
    }
    seen[city] := true;
    i := i + 1;
  }

  totalCost := 0;
  i := 0;
  while i < g.n
    invariant 0 <= i <= g.n
    invariant totalCost == TourCostFrom(g, tour, 0) - TourCostFrom(g, tour, i)
  {
    var u := tour[i];
    var v := if i + 1 < g.n then tour[i + 1] else tour[0];
    totalCost := totalCost + g.cost[u][v];
    i := i + 1;
  }

  return true, totalCost;
}

method Main() {
    var g := Graph(4, [
        [0, 12, 8, 5],
        [8, 9, 7, 2],
        [0, 2, 6, 10],
        [1, 2, 1, 8]
    ]);

    assert ValidGraph(g);

    var tour0 := [0,1,2,3];
    var tour1 := [0,1,3,2];
    var tourInvalid := [0,1,2,2];

    var valid0, cost0 := CheckCandidateTour(g, tour0);
    if valid0 {
        assert IsValidTour(g, tour0) && cost0 == TourCost(g, tour0);
        print "Tour 0 is valid and cost = ", cost0, "\n";
    } 

    var valid1, cost1 := CheckCandidateTour(g, tour1);
    if valid1 {
        assert IsValidTour(g, tour1) && cost1 == TourCost(g, tour1);
        print "Tour 1 is valid and cost = ", cost1, "\n";
    }

    if valid0 && valid1 {
        if cost0 < cost1 {
            print "Tour 0 is optimal tour\n";
        } else {
            print "Tour 1 is optimal tour\n";
        }

    }

    var valid2, _ := CheckCandidateTour(g, tourInvalid);
    if !valid2 {
        print "Tour 2 is invalid as expected\n";
    }
    
}
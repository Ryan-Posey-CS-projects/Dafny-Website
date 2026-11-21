module Queues {
  export Queues reveals Node, Queue
    provides Node.IsTerminal, Queue.head, Queue.tail, Queue.size,
             Queue.Valid, Queue.Repr, Queue.isEmpty, Queue.Enqueue, Queue.Dequeue,
             Queue.Peek, Queue.Size

  class Node<T> {
    var value: T
    var next: Node?<T>

    ghost predicate IsTerminal()
      reads this
    {
      next == null
    }

    constructor(v: T)
      ensures IsTerminal()
    {
      value := v;
      next := null;
    }
  }

  class Queue<T> {
    ghost var Repr: set<Node<T>>

    var head: Node?<T>
    var tail: Node?<T>
    var size: int

    ghost predicate NodeInRepr(n: Node<T>)
      reads this, n
    {
      n.next == null || n.next in Repr
    }

    ghost predicate Valid()
      reads this, Repr
    {
      (head == null) == (tail == null) &&
      (head == null || head in Repr) &&
      (tail == null || tail in Repr) &&
      (forall n: Node<T> :: n in Repr ==> NodeInRepr(n))
    }

    constructor()
      ensures Valid()
      ensures Repr == {}
    {
      head := null;
      tail := null;
      size := 0;
      Repr := {};
    }

    predicate isEmpty()
      reads this
    {
      head == null || tail == null
    }

    method Enqueue(x: T)
      requires Valid()
      ensures Valid()
      ensures old(Repr) <= Repr
      ensures fresh(Repr - old(Repr))
      modifies this, Repr
    {
      var n := new Node<T>(x);
      size := size + 1;
      Repr := Repr + {n};

      if isEmpty() {
        head := n;
        tail := n;
      } else {
        tail.next := n;
        tail := n;
      }
    }

    method Dequeue() returns (r: T)
      requires !isEmpty() && Valid()
      ensures Valid()
      ensures Repr == old(Repr)
      modifies this
    {
      var oldHead := head;
      r := oldHead.value;
      head := oldHead.next;

      if head == null {
        tail := null;
      }
      size := size - 1;
    }

    method Peek() returns (r: T)
      requires !isEmpty() && Valid()
      ensures Valid()
    {
      r := head.value;
    }

    method Size() returns (n: int)
    {
      n := size;
    }
  }
}

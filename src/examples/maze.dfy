include "Queue.dfy"
module MazeSolver {
  type Maze = array2<bool>
  type Position = (int, int, int)
  type Path = array?<Position>
  import opened Queues

  method SolveMaze(maze: Maze, start: Position, end: Position)
    returns (path: Path)
    requires 0 <= start.0 < maze.Length0 &&
             0 <= start.1 < maze.Length1 &&
             0 <= end.0 < maze.Length0 &&
             0 <= end.1 < maze.Length1
  {
    if (!maze[start.0, start.1] || !maze[end.0, end.1]) {
      return null;
    }

    var visited := new bool[maze.Length0, maze.Length1];
    visited[start.0, start.1] := true;

    var queue := new Queues.Queue<array<Position>>();
    var initialPath := new Position[1];
    initialPath[0] := (start.0, start.1, 0);
    queue.Enqueue(initialPath);

    var remainingDequeues := maze.Length0 * maze.Length1;
    while (!queue.isEmpty() && remainingDequeues > 0)
      invariant queue.Valid()
      invariant fresh(queue)
      invariant fresh(queue.Repr)
      invariant visited.Length0 == maze.Length0
      invariant visited.Length1 == maze.Length1
      invariant 0 <= remainingDequeues <= maze.Length0 * maze.Length1
      decreases remainingDequeues
    {
      remainingDequeues := remainingDequeues - 1;
      var currentPath := queue.Dequeue();

      if (currentPath.Length > 0) {
        var current := currentPath[currentPath.Length - 1];
        if (current.0 == end.0 && current.1 == end.1) {
          path := currentPath;
          return path;
        }

        if (0 <= current.0 < maze.Length0 && 0 <= current.1 < maze.Length1) {
          var neighbors := CheckNeighbors(maze, current, visited);
          for i := 0 to neighbors.Length
            invariant queue.Valid()
            invariant fresh(queue)
            invariant fresh(queue.Repr)
            invariant visited.Length0 == maze.Length0
            invariant visited.Length1 == maze.Length1
          {
            var neighbor := neighbors[i];
            if (0 <= neighbor.0 < maze.Length0 && 0 <= neighbor.1 < maze.Length1) {
              visited[neighbor.0, neighbor.1] := true;
              var extendedPath := AppendPath(currentPath, neighbor);
              queue.Enqueue(extendedPath);
            }
          }
        }
      }
    }
    return null;
  }

  method CheckNeighbors(maze: Maze, position: Position, visited: Maze)
    returns (neighbors: array<Position>)
    requires 0 <= position.0 < maze.Length0 &&
             0 <= position.1 < maze.Length1 &&
             visited.Length0 == maze.Length0 &&
             visited.Length1 == maze.Length1
  {
    var i := 0;
    var cells := new Position[4];

    if (maze.Length0 > position.0 + 1 &&
        maze[position.0 + 1, position.1] &&
        !visited[position.0 + 1, position.1]) {
      cells[i] := (position.0 + 1, position.1, position.2 + 1);
      i := i + 1;
    }
    if (position.0 > 0 &&
        maze[position.0 - 1, position.1] &&
        !visited[position.0 - 1, position.1]) {
      cells[i] := (position.0 - 1, position.1, position.2 + 1);
      i := i + 1;
    }
    if (position.1 > 0 &&
        maze[position.0, position.1 - 1] &&
        !visited[position.0, position.1 - 1]) {
      cells[i] := (position.0, position.1 - 1, position.2 + 1);
      i := i + 1;
    }
    if (position.1 < maze.Length1 - 1 &&
        maze[position.0, position.1 + 1] &&
        !visited[position.0, position.1 + 1]) {
      cells[i] := (position.0, position.1 + 1, position.2 + 1);
      i := i + 1;
    }
    neighbors := new Position[i];
    for j := 0 to i {
      neighbors[j] := cells[j];
    }
    return neighbors;
  }

  method AppendPath(path: array<Position>, position: Position) returns (extended: array<Position>)
  {
    extended := new Position[path.Length + 1];
    for i := 0 to path.Length {
      extended[i] := path[i];
    }
    extended[path.Length] := position;
  }

  method {:main} Main() {
    var layout := [
      "S      ########",
      "## ### ########",
      "## ### ### ####",
      "###### ### ####",
      "######       ##",
      "######## ### ##",
      "########   # ##",
      "############ ##",
      "##           ##",
      "#### ##### ####",
      "#### #      ###",
      "#### # #### ###",
      "####           ",
      "############## ",
      "##############E"
    ];
    var maze := new bool[|layout|, |layout[0]|];
    var startPosition: Position := (-1, -1, -1);
    var endPosition: Position := (-1, -1, -1);
    var foundStart := false;
    var foundEnd := false;

    print "Maze (# = wall, \" \" = open, S = start, E = exit):\n\n";
    for row := 0 to |layout| {
      for column := 0 to |layout[row]| {
        var cell := layout[row][column];
        maze[row, column] := cell != '#';

        if cell == '#' {
          print "#";
        } else if cell == ' ' {
          print " ";
        } else if cell == 'S' {
          startPosition := (row, column, 0);
          foundStart := true;
          print "S";
        } else {
          endPosition := (row, column, 0);
          foundEnd := true;
          print "E";
        }
      }
      print "\n";
    }
    if (!foundStart || !foundEnd ||
        !(0 <= startPosition.0 < maze.Length0) ||
        !(0 <= startPosition.1 < maze.Length1) ||
        !(0 <= endPosition.0 < maze.Length0) ||
        !(0 <= endPosition.1 < maze.Length1)) {
      print "Invalid start or end position\n";
      return;
    }
    var result := SolveMaze(maze, startPosition, endPosition);
    if result == null {
      print "No path found\n";
    } else {
      var pathCells := new bool[maze.Length0, maze.Length1];
      for i := 0 to result.Length {
        var position := result[i];
        if 0 <= position.0 < maze.Length0 && 0 <= position.1 < maze.Length1 {
          pathCells[position.0, position.1] := true;
        }
      }
      print "\n\n";
      print "Path (* = route):\n\n";
      for row := 0 to maze.Length0 {
        for column := 0 to maze.Length1 {
          if layout[row][column] == 'S' {
            print "S";
          } else if layout[row][column] == 'E' {
            print "E";
          } else if pathCells[row, column] {
            print "*";
          } else if maze[row, column] {
            print " ";
          } else {
            print "#";
          }
        }
        print "\n";
      }
      print "\n";
      print "Path found!\n";
      print "Shortest path length: ";
      print result.Length;
      print "\n";
    }
  }
}

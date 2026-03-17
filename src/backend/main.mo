import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";



actor {
  type Group = {
    #groupA;
    #groupB;
  };

  module Group {
    public func compare(g1 : Group, g2 : Group) : Order.Order {
      switch (g1, g2) {
        case (#groupA, #groupA) { #equal };
        case (#groupA, #groupB) { #less };
        case (#groupB, #groupA) { #greater };
        case (#groupB, #groupB) { #equal };
      };
    };
  };

  type Response = {
    group : Group;
    scores : [Nat]; // Must be length 12, scores 1-5
  };

  module Response {
    public func compare(r1 : Response, r2 : Response) : Order.Order {
      switch (Group.compare(r1.group, r2.group)) {
        case (#equal) {
          let s1 = r1.scores;
          let s2 = r2.scores;

          switch (Nat.compare(s1.size(), s2.size())) {
            case (#equal) {
              for (i in Nat.range(0, s1.size())) {
                let cmp = Nat.compare(s1[i], s2[i]);
                if (cmp != #equal) { return cmp };
              };
              #equal;
            };
            case (cmp) { cmp };
          };
        };
        case (cmp) { cmp };
      };
    };
  };

  let responsesMap = Map.empty<Nat, Response>();
  var nextId = 0;

  type Averages = {
    totalEntries : Nat;
    questionAverages : [Float]; // Length 12
  };

  public shared ({ caller }) func submitResponse(group : Group, scores : [Nat]) : async () {
    if (scores.size() != 12) {
      Runtime.trap("Scores array must have exactly 12 entries");
    };

    for (score in scores.values()) {
      if (score < 1 or score > 5) {
        Runtime.trap("All scores must be between 1 and 5");
      };
    };

    let response : Response = {
      group;
      scores;
    };

    responsesMap.add(nextId, response);
    nextId += 1;
  };

  public query ({ caller }) func getAllResponses() : async [Response] {
    responsesMap.values().toArray().sort();
  };

  public query ({ caller }) func getResponsesByGroup(group : Group) : async [Response] {
    responsesMap.values().filter(func(r) { r.group == group }).toArray().sort();
  };

  public query ({ caller }) func getAveragesByGroup(group : Group) : async Averages {
    let filteredEntries = responsesMap.values().filter(func(r) { r.group == group });
    let responses = filteredEntries.toArray();

    // If no responses, return empty averages
    if (responses.size() == 0) {
      return {
        totalEntries = 0;
        questionAverages = Array.tabulate(12, func(_) { 0.0 });
      };
    };

    // Initialize totals to 0
    var totals = Array.tabulate(12, func(_) { 0 });

    // Sum all scores
    for (response in responses.values()) {
      let scores = response.scores;
      for (i in Nat.range(0, scores.size())) {
        totals := Array.tabulate(
          12,
          func(j) {
            if (j == i) { totals[i] + scores[i] } else { totals[j] };
          },
        );
      };
    };

    // Compute averages
    let questionAverages = Array.tabulate(
      12,
      func(i) { totals[i].toFloat() / responses.size().toFloat() }
    );

    {
      totalEntries = responses.size();
      questionAverages;
    };
  };
};

import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Map "mo:map/Map";
import { thash } "mo:map/Map";

import Types "Types";

actor AdminCanister {
  type FacilityRegistration = Types.FacilityRegistration;
  type AmbulanceRegistration = Types.AmbulanceRegistration;
  type UserDetails = Types.UserDetails;
  type SystemOverview = Types.SystemOverview;
  type Result<T, E> = Result.Result<T, E>;

  private stable var nextUserId : Nat = 0;
  private var pendingFacilities = Map.new<Text, FacilityRegistration>();
  private var pendingAmbulances = Map.new<Text, AmbulanceRegistration>();
  private var users = Map.new<Text, UserDetails>();

  public shared ({ caller }) func registerFacility(registration : FacilityRegistration) : async Result<Text, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous principals are not allowed to register facilities");
    };

    let userId = Nat.toText(nextUserId);
    nextUserId += 1;

    let userDetails : UserDetails = {
      id = userId;
      principal = registration.principal;
      userType = #Facility;
      name = registration.name;
      registrationStatus = #Pending;
    };

    Map.set(users, thash, userId, userDetails);
    Map.set(pendingFacilities, thash, userId, registration);
    #ok("Facility registration submitted with ID: " # userId);
  };

  public shared ({ caller }) func approveFacility(facilityId : Text) : async Result<Text, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous principals are not allowed to approve facilities");
    };

    switch (Map.get(pendingFacilities, thash, facilityId)) {
      case null { #err("No pending registration found with ID: " # facilityId) };
      case (?registration) {
        Map.delete(pendingFacilities, thash, facilityId);

        // Update user status
        switch (Map.get(users, thash, facilityId)) {
          case null {
            return #err("User not found for facility ID: " # facilityId);
          };
          case (?user) {
            let updatedUser = { user with registrationStatus = #Approved };
            Map.set(users, thash, facilityId, updatedUser);
          };
        };

        // Call FacilityCanister to add the approved facility
        let facilityCanister = actor ("br5f7-7uaaa-aaaa-qaaca-cai") : actor {
          addFacility : (Text, FacilityRegistration) -> async Result<Text, Text>;
        };

        switch (await facilityCanister.addFacility(facilityId, registration)) {
          case (#ok(message)) {
            #ok("Facility approved and added successfully. " # message);
          };
          case (#err(error)) {
            #err("Error adding facility to FacilityCanister: " # error);
          };
        };
      };
    };
  };

  public shared ({ caller }) func approveAmbulance(ambulanceId : Text) : async Result<Text, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous principals are not allowed to approve ambulances");
    };

    switch (Map.get(pendingAmbulances, thash, ambulanceId)) {
      case null { #err("No pending ambulance found with ID: " # ambulanceId) };
      case (?registration) {
        Map.delete(pendingAmbulances, thash, ambulanceId);

        // Update user status
        switch (Map.get(users, thash, ambulanceId)) {
          case null {
            return #err("User not found for ambulance ID: " # ambulanceId);
          };
          case (?user) {
            let updatedUser = { user with registrationStatus = #Approved };
            Map.set(users, thash, ambulanceId, updatedUser);
          };
        };

        // Call AmbulanceCanister to add the approved ambulance
        let ambulanceCanister = actor ("be2us-64aaa-aaaa-qaabq-cai") : actor {
          addAmbulance : (Text, AmbulanceRegistration) -> async Result<Text, Text>;
        };

        switch (await ambulanceCanister.addAmbulance(ambulanceId, registration)) {
          case (#ok(message)) {
            #ok("Ambulance approved and added successfully. " # message);
          };
          case (#err(error)) {
            #err("Error adding ambulance to AmbulanceCanister: " # error);
          };
        };
      };
    };
  };

  public query func listPendingRegistrations() : async [(Text, FacilityRegistration)] {
    Map.toArray(pendingFacilities);
  };

  public query func listPendingAmbulances() : async [(Text, AmbulanceRegistration)] {
    Map.toArray(pendingAmbulances);
  };

  public query func getUserDetails(userId : Text) : async Result<UserDetails, Text> {
    switch (Map.get(users, thash, userId)) {
      case null { #err("User not found") };
      case (?user) { #ok(user) };
    };
  };

  public func getSystemOverview() : async Result<SystemOverview, Text> {
    let facilityCanister = actor ("br5f7-7uaaa-aaaa-qaaca-cai") : actor {
      getTotalFacilities : () -> async Nat;
    };
    let ambulanceCanister = actor ("be2us-64aaa-aaaa-qaabq-cai") : actor {
      getTotalAmbulances : () -> async Nat;
    };
    let patientCanister = actor ("b77ix-eeaaa-aaaa-qaada-cai") : actor {
      getTotalPatients : () -> async Nat;
    };
    let accidentCanister = actor ("bkyz2-fmaaa-aaaa-qaaaq-cai") : actor {
      getActiveAccidentsCount : () -> async Nat;
    };

    let totalFacilities = await facilityCanister.getTotalFacilities();
    let totalAmbulances = await ambulanceCanister.getTotalAmbulances();
    let totalPatients = await patientCanister.getTotalPatients();
    let activeAccidents = await accidentCanister.getActiveAccidentsCount();

    #ok({
      totalFacilities = totalFacilities;
      totalAmbulances = totalAmbulances;
      totalPatients = totalPatients;
      activeAccidents = activeAccidents;
    });
  };

  public shared ({ caller }) func getUserRole() : async Result<Text, Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Anonymous principals are not allowed");
    };

    // let callerPrincipal = Principal.toText(caller);

    // for ((_, user) in Map.entries(users)) {
    //   if (Principal.toText(user.principal) == callerPrincipal) {
    //     switch (user.userType) {
    //       case (#Admin) { return #ok("admin") };
    //       case (#Facility) { return #ok("facility") };
    //       case (#Ambulance) { return #ok("ambulance") };
    //     };
    //   };
    // };

    // #err("User not found");
    return #ok("admin");
  };
};

import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Map "mo:map/Map";
import { thash } "mo:map/Map";

import Types "Types";

actor FacilityCanister {
    type Facility = Types.Facility;
    type FacilityRegistration = Types.FacilityRegistration;
    type AccidentDetails = Types.AccidentDetails;
    type Result<T, E> = Result.Result<T, E>;

    private var facilities = Map.new<Text, Facility>();

    public shared ({ caller }) func addFacility(id : Text, registration : FacilityRegistration) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to add facilities");
        };

        let newFacility : Facility = {
            id = id;
            principal = registration.principal;
            name = registration.name;
            location = registration.location;
            services = registration.services;
            capacity = registration.capacity;
            availableBeds = registration.capacity;
            contactInfo = registration.contactInfo;
            registrationStatus = #Approved;
        };

        Map.set(facilities, thash, id, newFacility);
        #ok("Facility added successfully with ID: " # id);
    };

    public query func getFacilityDetails(facilityId : Text) : async Result<Facility, Text> {
        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) { #ok(facility) };
        };
    };

    public shared ({ caller }) func updateAvailableBeds(facilityId : Text, beds : Nat) : async Result<Text, Text> {
        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) {
                if (facility.principal != caller) {
                    return #err("Only the facility owner can update available beds");
                };
                let updatedFacility = {
                    facility with availableBeds = beds
                };
                Map.set(facilities, thash, facilityId, updatedFacility);
                #ok("Available beds updated successfully");
            };
        };
    };

    public shared ({ caller }) func reportAccident(facilityId : Text, accidentDetails : AccidentDetails) : async Result<Text, Text> {
        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) {
                if (facility.principal != caller) {
                    return #err("Only the facility owner can report accidents");
                };

                // Call AccidentCanister to create a new accident report
                let accidentCanister = actor ("bkyz2-fmaaa-aaaa-qaaaq-cai") : actor {
                    createAccidentReport : (AccidentDetails) -> async Result<Text, Text>;
                };

                switch (await accidentCanister.createAccidentReport(accidentDetails)) {
                    case (#ok(accidentId)) {
                        #ok("Accident reported successfully. Accident ID: " # accidentId);
                    };
                    case (#err(error)) {
                        #err("Error creating accident report: " # error);
                    };
                };
            };
        };
    };

    public query func listFacilities() : async [Facility] {
        Iter.toArray(Map.vals(facilities));
    };

    public shared ({ caller }) func updateFacilityServices(facilityId : Text, services : [Text]) : async Result<Text, Text> {
        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) {
                if (facility.principal != caller) {
                    return #err("Only the facility owner can update services");
                };
                let updatedFacility = {
                    facility with services = services
                };
                Map.set(facilities, thash, facilityId, updatedFacility);
                #ok("Facility services updated successfully");
            };
        };
    };

    public shared ({ caller }) func requestAdditionalResources(facilityId : Text, resourceType : Text, quantity : Nat) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to request additional resources");
        };

        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) {
                if (facility.principal != caller) {
                    return #err("Only the facility owner can request additional resources");
                };

                // Find nearby facilities (this is a simplified version, you might want to implement a more sophisticated algorithm)
                let nearbyFacilities = Iter.toArray(
                    Iter.filter(
                        Map.vals(facilities),
                        func(f : Facility) : Bool {
                            f.id != facilityId and f.availableBeds > 0
                        },
                    )
                );

                if (nearbyFacilities.size() == 0) {
                    return #err("No nearby facilities with available resources found");
                };

                // For simplicity, we'll just request from the first available facility
                let targetFacility = nearbyFacilities[0];

                // Generate resource request report
                let reportCanister = actor ("by6od-j4aaa-aaaa-qaadq-cai") : actor {
                    generateReport : (Types.Report) -> async Result<Text, Text>;
                };
                let report : Types.Report = {
                    id = ""; // Will be assigned by ReportCanister
                    accidentId = ""; // No specific accident
                    patientId = ""; // No specific patient
                    facilityId = facilityId;
                    reportType = #TransferReport;
                    timestamp = Time.now();
                    details = "Resource request: " # resourceType # ", Quantity: " # Nat.toText(quantity) # ", Target Facility: " # targetFacility.id;
                };

                switch (await reportCanister.generateReport(report)) {
                    case (#ok(reportId)) {
                        #ok("Additional resources requested successfully from facility " # targetFacility.id # ". Report ID: " # reportId);
                    };
                    case (#err(error)) {
                        #err("Error generating report for resource request: " # error);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updatePatientCount(facilityId : Text, change : Int) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to update patient counts");
        };

        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) {
                let currentOccupied = facility.capacity - facility.availableBeds;
                let newOccupied = Int.max(0, Int.min(facility.capacity, currentOccupied + change));
                let newAvailableBeds = Int.max(0, facility.capacity - newOccupied);

                let updatedFacility = {
                    facility with
                    availableBeds = Int.abs(newAvailableBeds)
                };
                Map.set(facilities, thash, facilityId, updatedFacility);
                #ok("Patient count updated successfully");
            };
        };
    };

    public query func checkRegistrationStatus(facilityId : Text) : async Result<Types.RegistrationStatus, Text> {
        switch (Map.get(facilities, thash, facilityId)) {
            case null { #err("Facility not found") };
            case (?facility) { #ok(facility.registrationStatus) };
        };
    };

    public func getActiveCases() : async Result<[AccidentDetails], Text> {
        let accidentCanister = actor ("bkyz2-fmaaa-aaaa-qaaaq-cai") : actor {
            listActiveAccidents : () -> async [Types.AccidentReport];
        };

        let activeAccidents = await accidentCanister.listActiveAccidents();
        #ok(Array.map(activeAccidents, func(accident : Types.AccidentReport) : AccidentDetails { accident.details }));
    };

    public query func getTotalFacilities() : async Nat {
        Map.size(facilities);
    };
};
